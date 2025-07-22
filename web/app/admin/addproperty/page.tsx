'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FurnishingType } from '@/interfaces/pg';
import { PropertyType } from '@/interfaces/pg';
import { MoveInStatus } from '@/interfaces/pg';
import { FurnitureType } from '@/interfaces/pg';
import { AmenityType } from '@/interfaces/pg';
import { SharingTypeDetails } from '@/interfaces/pg';
import { SharingType } from '@/interfaces/pg';
import { validateCreatePgData } from '@/schemas/property.schema';

interface Property {
  title: string;
  description: string;
  propertyType: PropertyType;
  foodIncluded: boolean;
  furnishing: FurnishingType;
  address: string;
  latitude: number;
  longitude: number;
  furnitures: FurnitureType[];
  amenities: AmenityType[];
  sharingTypes: SharingTypeDetails[];
  pgRules: string;
  moveInStatus: MoveInStatus;
  virtualTourUrl: string;
  images: string[];
  hostName: string;
  hostContact: string;
  rating: number;
  reviews: string[];
}

const initialState: Property = {
  title: '',
  description: '',
  propertyType: PropertyType.COLIVE,
  foodIncluded: false,
  furnishing: FurnishingType.FURNISHED,
  address: '',
  latitude: 0,
  longitude: 0,
  furnitures: [],
  amenities: [],
  sharingTypes: [],
  pgRules: '',
  moveInStatus: MoveInStatus.IMMEDIATE,
  virtualTourUrl: '',
  images: [],
  hostName: '',
  hostContact: '',
  rating: 0.0,
  reviews: []
};

const createProperty = async (propertyData: Property) => {
  console.log('Sending property data:', propertyData);
  const validationResult = validateCreatePgData(propertyData)
  if (!validationResult.success) {
    console.error('Validation failed:', validationResult.error);
    throw new Error('Validation failed: ' + validationResult.error.message);
  }
  const data = validationResult.data;
  
  const response = await fetch('/api/v1/pg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error:', errorText);
    throw new Error(`Failed to create property: ${response.status} ${errorText}`);
  }
  
  return response.json();
};

//MOCK as of now, as a string url is required
const uploadImages = async (files: File[]) => {
  const urls = files.map(file => URL.createObjectURL(file));
  return Promise.resolve(urls);
};

export default function AddProperty() {
  const [form, setForm] = useState<Property>(initialState);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [sharingTypeForm, setSharingTypeForm] = useState({
    type: SharingType.SINGLE,
    description: '',
    price: '',
    pricePerMonth: '',
    deposit: '',
    refundableAmount: '',
    availability: '' 
  });
  const[locationForm, setLocationForm] = useState({
    latitude: '',
    longitude: '',
    rating: ''
  })
  
  const router = useRouter();
  const queryClient = useQueryClient();

  const createPropertyMutation = useMutation({
    mutationFn: createProperty,
    onSuccess: (data) => {
      setMessage('Property Created Successfully!');
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      setTimeout(() => {
        router.push('/admin/properties');
      }, 1500);
    },
    onError: (error: Error) => {
      console.error('Mutation error:', error);
      setMessage('Error creating property: ' + error.message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    // Handle numeric fields
    if (name === 'latitude' || name === 'longitude' || name === 'rating') {
      setLocationForm(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Convert to number for the main form, but keep as 0 if empty
      const numericValue = value === '' ? 0 : parseFloat(value);
      setForm(prev => ({
        ...prev,
        [name]: numericValue
      }));
      return;
    }
    
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMultiSelect = (name: keyof Property, value: string | FurnitureType | AmenityType) => {
    setForm(prev => {
      const arr = prev[name] as (string | FurnitureType | AmenityType)[];
      return arr.includes(value)
        ? { ...prev, [name]: arr.filter(v => v !== value) }
        : { ...prev, [name]: [...arr, value] };
    });
  };

  const handleSharingTypeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSharingTypeForm(prev => ({
      ...prev,
      [name]: name === 'description' ? value : (name === 'type' ? value as SharingType : value)
    }));
  };

  const addSharingType = () => {
    console.log('Current sharingTypeForm:', sharingTypeForm); // Debug log
    console.log('Description:', sharingTypeForm.description);
    console.log('Availability:', sharingTypeForm.availability);
    console.log('Availability as number:', Number(sharingTypeForm.availability));
    
    // Only validate if user is trying to add a new sharing type with some data
    if (sharingTypeForm.description.trim() && Number(sharingTypeForm.availability) > 0) {
      const newSharingType: SharingTypeDetails = {
        type: sharingTypeForm.type as SharingType,
        description: sharingTypeForm.description.trim(),
        price: Number(sharingTypeForm.price) || 0,
        pricePerMonth: Number(sharingTypeForm.pricePerMonth) || 0,
        deposit: Number(sharingTypeForm.deposit) || 0,
        refundableAmount: Number(sharingTypeForm.refundableAmount) || 0,
        availability: Number(sharingTypeForm.availability) || 0
      };
      
      console.log('Adding new sharing type:', newSharingType); // Debug log
      
      setForm(prev => {
        const updatedForm = {
          ...prev,
          sharingTypes: [...prev.sharingTypes, newSharingType]
        };
        console.log('Updated form sharingTypes:', updatedForm.sharingTypes); // Debug log
        return updatedForm;
      });
      
      setSharingTypeForm({
        type: SharingType.SINGLE,
        description: '',
        price: '',
        pricePerMonth: '',
        deposit: '',
        refundableAmount: '',
        availability: ''
      });
      
      setMessage('Sharing type added successfully!');
      
      // Clear the success message after 2 seconds
      setTimeout(() => {
        setMessage('');
      }, 2000);
    } else {
      // Only show validation error if user actually tried to add something
      if (sharingTypeForm.description.trim() || sharingTypeForm.availability) {
        console.log('Validation failed - Description:', sharingTypeForm.description.trim(), 'Availability:', Number(sharingTypeForm.availability));
        setMessage('Please fill in the description and ensure availability is greater than 0');
      } else {
        setMessage('Please fill in the sharing type details before adding');
      }
    }
  };

  const removeSharingType = (index: number) => {
    setForm(prev => ({
      ...prev,
      sharingTypes: prev.sharingTypes.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const files = Array.from(e.target.files);
    try {
      const urls = await uploadImages(files);
      setImageUrls(urls);
      setForm(prev => ({ ...prev, images: urls }));
    } catch (error) {
      setMessage('Image upload failed: ' + (error as Error).message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    console.log('=== FORM SUBMISSION DEBUG START ===');
    console.log('Form state on submit:', JSON.stringify(form, null, 2));
    console.log('Sharing types count:', form.sharingTypes.length);

    // Additional debugging to catch the real issue
    console.log('🔍 Checking what is causing the focus/scroll issue...');
    
    // Check if there are any invalid form elements
    const formElement = e.target as HTMLFormElement;
    const invalidElements = formElement.querySelectorAll(':invalid');
    console.log('Invalid form elements found:', invalidElements);
    
    if (invalidElements.length > 0) {
      invalidElements.forEach((element, index) => {
        console.log(`Invalid element ${index}:`, {
          name: (element as HTMLInputElement).name,
          value: (element as HTMLInputElement).value,
          validationMessage: (element as HTMLInputElement).validationMessage,
          required: (element as HTMLInputElement).required
        });
      });
    }

    // Step 1: Validate required fields
    const fieldChecks = {
      title: { value: form.title, valid: !!form.title?.trim() },
      description: { value: form.description, valid: !!form.description?.trim() },
      address: { value: form.address, valid: !!form.address?.trim() },
      hostName: { value: form.hostName, valid: !!form.hostName?.trim() },
      hostContact: { value: form.hostContact, valid: !!form.hostContact?.trim() }
    };

    const invalidFields = Object.entries(fieldChecks)
      .filter(([_, fieldInfo]) => !fieldInfo.valid)
      .map(([fieldName]) => fieldName);

    if (invalidFields.length > 0) {
      console.log('❌ VALIDATION FAILED - Required fields missing:', invalidFields);
      setMessage(`Please fill in all required fields: ${invalidFields.join(', ')}`);
      return;
    }

    console.log('✅ Required fields validation PASSED');

    // Step 2: Validate sharing types
    if (!Array.isArray(form.sharingTypes) || form.sharingTypes.length === 0) {
      console.log('❌ VALIDATION FAILED - No sharing types');
      setMessage('Please add at least one sharing type');
      return;
    }

    console.log('✅ Sharing types validation PASSED');

    // Step 3: Validate sharing types availability
    const invalidSharingTypes = form.sharingTypes.filter(st => 
      typeof st.availability !== 'number' || st.availability <= 0
    );
    
    if (invalidSharingTypes.length > 0) {
      console.log('❌ VALIDATION FAILED - Invalid sharing types availability');
      setMessage('All sharing types must have availability greater than 0');
      return;
    }

    console.log('✅ Sharing types availability validation PASSED');

    const propertyData = {
      ...form,
      images: imageUrls,
      // Ensure all required fields are properly set
      title: form.title.trim(),
      description: form.description.trim(),
      address: form.address.trim(),
      hostName: form.hostName.trim(),
      hostContact: form.hostContact.trim(),
      // Ensure numeric fields are numbers
      latitude: Number(form.latitude) || 0,
      longitude: Number(form.longitude) || 0,
      rating: Number(form.rating) || 0
    };
    
    console.log('🎉 ALL VALIDATIONS PASSED - SUBMITTING DATA');
    console.log('Final property data:', JSON.stringify(propertyData, null, 2));
    
    try {
      createPropertyMutation.mutate(propertyData);
      console.log('✅ Mutation called successfully');
    } catch (error) {
      console.error('❌ Error during mutation call:', error);
      setMessage('Error during submission: ' + (error as Error).message);
    }
  };

  const isLoading = createPropertyMutation.isPending;

  // Helper function to display enum values in a user-friendly way
  const getDisplayValue = (enumValue: string) => {
    return enumValue.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="max-w-4xl mx-auto p-6 m-10 bg-gray-100 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Property</h1>
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold mb-2">Property Title *</h3>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Property Title"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* <div>
            <h3 className="text-sm font-semibold mb-2">Host ID *</h3>
            <input
              name="hostId"
              value={form.hostId}
              onChange={handleChange}
              placeholder="Host ID"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Host Name *</h3>
            <input
              name="hostName"
              value={form.hostName}
              onChange={handleChange}
              placeholder="Host Name"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2">Host Contact *</h3>
            <input
              name="hostContact"
              value={form.hostContact}
              onChange={handleChange}
              placeholder="Host Contact"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">Property Description *</h3>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Property Description"
            required
            rows={4}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm font-semibold mb-2">Address *</h3>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2">Latitude</h3>
            <input
              name="latitude"
              type="number"
              step="any"
              value={locationForm.latitude}
              onChange={handleChange}
              placeholder="Latitude"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2">Longitude</h3>
            <input
              name="longitude"
              type="number"
              step="any"
              value={locationForm.longitude}
              onChange={handleChange}
              placeholder="Longitude"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm font-semibold mb-2">Property Type *</h3>
            <select
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.values(PropertyType).map(type => (
                <option key={type} value={type}>
                  {type === 'COLIVE' ? 'Co-Living' : getDisplayValue(type)}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-2">Furnishing *</h3>
            <select
              name="furnishing"
              value={form.furnishing}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.values(FurnishingType).map(type => (
                <option key={type} value={type}>{getDisplayValue(type)}</option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Move-in Status *</h3>
            <select
              name="moveInStatus"
              value={form.moveInStatus}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.values(MoveInStatus).map(status => (
                <option key={status} value={status}>{getDisplayValue(status)}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">Virtual Tour URL</h3>
          <input
            name="virtualTourUrl"
            value={form.virtualTourUrl}
            onChange={handleChange}
            placeholder="Virtual Tour URL"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Food Included Checkbox */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Food Included</h3>
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              name="foodIncluded"
              checked={form.foodIncluded}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">Food Included</span>
          </label>
        </div>

        {/* Sharing Types */}
        <div className="bg-white p-4 rounded-md border">
          <h3 className="text-lg font-semibold mb-4">Sharing Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">Type</h3>
              <select
                name="type"
                value={sharingTypeForm.type}
                onChange={handleSharingTypeChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                {Object.values(SharingType).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Description *</h3>
              <input
                name="description"
                value={sharingTypeForm.description}
                onChange={handleSharingTypeChange}
                placeholder="Description"
                className="w-full px-3 py-2 border rounded-md"
                // Remove required attribute - this is only for adding new sharing types
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Price</h3>
              <input
                name="price"
                type="number"
                min="0"
                value={sharingTypeForm.price}
                onChange={handleSharingTypeChange}
                placeholder="Price"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Price Per Month</h3>
              <input
                name="pricePerMonth"
                type="number"
                min="0"
                value={sharingTypeForm.pricePerMonth}
                onChange={handleSharingTypeChange}
                placeholder="Price Per Month"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Deposit</h3>
              <input
                name="deposit"
                type="number"
                min="0"
                value={sharingTypeForm.deposit}
                onChange={handleSharingTypeChange}
                placeholder="Deposit"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Refundable Amount</h3>
              <input
                name="refundableAmount"
                type="number"
                min="0"
                value={sharingTypeForm.refundableAmount}
                onChange={handleSharingTypeChange}
                placeholder="Refundable Amount"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Availability *</h3>
              <input
                name="availability"
                type="number"
                min="1"
                value={sharingTypeForm.availability}
                onChange={handleSharingTypeChange}
                placeholder="Availability (minimum 1)"
                className="w-full px-3 py-2 border rounded-md"
                // Remove required attribute - this is only for adding new sharing types
              />
            </div>
          </div>
          <button
            type="button"
            onClick={addSharingType}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Sharing Type
          </button>
          
          {/* Display Added Sharing Types */}
          {form.sharingTypes.length > 0 && (
            <div className="mt-4">
              <h4 className="text-md font-semibold mb-2">Added Sharing Types:</h4>
              {form.sharingTypes.map((sharingType, index) => (
                <div key={index} className="mt-2 p-3 bg-gray-50 rounded-md flex justify-between items-center">
                  <span>
                    <strong>{sharingType.type}</strong> - {sharingType.description} - 
                    ₹{sharingType.pricePerMonth}/month - Available: {sharingType.availability}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeSharingType(index)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

          {/* Amenities */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">Amenities</h2>
            <div className="flex flex-wrap gap-3">
              {Object.values(AmenityType).map(a => (
                <label key={a} className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-lg">
                  <Input
                    type="checkbox"
                    checked={form.amenities.includes(a)}
                    onChange={() => handleMultiSelect('amenities', a)}
                    className="form-checkbox text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{a}</span>
                </label>
              ))}
            </div>
          </section>
        {/* Amenities */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.values(AmenityType).map(amenity => (
              <label key={amenity} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.amenities.includes(amenity)}
                  onChange={() => handleMultiSelect('amenities', amenity)}
                  className="form-checkbox text-blue-600"
                />
                <span className="text-sm text-gray-700">{getDisplayValue(amenity)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Furnitures */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Furnitures</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.values(FurnitureType).map(furniture => (
              <label key={furniture} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.furnitures.includes(furniture)}
                  onChange={() => handleMultiSelect('furnitures', furniture)}
                  className="form-checkbox text-blue-600"
                />
                <span className="text-sm text-gray-700">{getDisplayValue(furniture)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* PG Rules */}
        <div>
          <h3 className="text-sm font-semibold mb-2">PG Rules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* {[
              'No smoking', 'No pets', 'No loud music after 10 PM', 'Keep common areas clean', 
              'Guest policy applies', 'No alcohol', 'Maintain cleanliness', 'Respect others'
            ].map(rule => (
              <label key={rule} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.pgRules.includes(rule)}
                  onChange={() => handleMultiSelect('pgRules', rule)}
                  className="form-checkbox text-blue-600"
                />
                <span className="text-sm text-gray-700">{rule}</span>
              </label>
            ))} */}
              <input
                name="pgRules"
                value={form.pgRules}
                onChange={handleChange}
                placeholder="PG Rules"
                className="w-full px-3 py-2 border rounded-md"
              />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Property Images</h3>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-2 border rounded-md bg-gray-50"
          />
          {imageUrls.length > 0 && (
            <p className="text-green-500 text-sm mt-2">{imageUrls.length} images uploaded</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? 'Creating Property...' : 'Create Property'}
        </button>

        {/* Message - Enhanced to show more specific feedback */}
        {message && (
          <div className={`text-center p-3 rounded-md mt-2 ${
            message.includes('Error') ? 'bg-red-100 text-red-700 border border-red-300' : 
            message.includes('successfully') ? 'bg-green-100 text-green-700 border border-green-300' :
            'bg-yellow-100 text-yellow-700 border border-yellow-300'
          }`}>
            {message}
          </div>
        )}

        {/* Enhanced Debug Info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-gray-100 p-4 rounded-md text-xs border-2 border-gray-300">
            <h4 className="font-semibold mb-2 text-lg">🐛 Debug Info:</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Required Fields Status:</p>
                <ul className="ml-4 space-y-1">
                  <li className={form.title?.trim() ? 'text-green-600' : 'text-red-600'}>
                    Title: {form.title?.trim() ? '✓' : '✗'} "{form.title}"
                  </li>
                  <li className={form.hostId?.trim() ? 'text-green-600' : 'text-red-600'}>
                    Host ID: {form.hostId?.trim() ? '✓' : '✗'} "{form.hostId}"
                  </li>
                  <li className={form.description?.trim() ? 'text-green-600' : 'text-red-600'}>
                    Description: {form.description?.trim() ? '✓' : '✗'} "{form.description?.substring(0, 30)}..."
                  </li>
                  <li className={form.address?.trim() ? 'text-green-600' : 'text-red-600'}>
                    Address: {form.address?.trim() ? '✓' : '✗'} "{form.address}"
                  </li>
                  <li className={form.hostName?.trim() ? 'text-green-600' : 'text-red-600'}>
                    Host Name: {form.hostName?.trim() ? '✓' : '✗'} "{form.hostName}"
                  </li>
                  <li className={form.hostContact?.trim() ? 'text-green-600' : 'text-red-600'}>
                    Host Contact: {form.hostContact?.trim() ? '✓' : '✗'} "{form.hostContact}"
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Sharing Types Status:</p>
                <p className={form.sharingTypes.length > 0 ? 'text-green-600' : 'text-red-600'}>
                  Main Form Count: {form.sharingTypes.length} {form.sharingTypes.length > 0 ? '✓' : '✗'}
                </p>
                <p className="text-blue-600 text-xs mt-1">
                  Input Form: Description="{sharingTypeForm.description}", Availability="{sharingTypeForm.availability}"
                </p>
                {form.sharingTypes.length > 0 && (
                  <ul className="ml-4 mt-2 space-y-1">
                    {form.sharingTypes.map((st, i) => (
                      <li key={i} className="text-green-600">
                        {st.type} - "{st.description}" (Available: {st.availability})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => {
                console.log('=== MANUAL VALIDATION CHECK ===');
                console.log('Current main form state:', form);
                console.log('Current input form state:', sharingTypeForm);
                const allFieldsFilled = form.title?.trim() && form.hostId?.trim() && 
                  form.description?.trim() && form.address?.trim() && 
                  form.hostName?.trim() && form.hostContact?.trim();
                const hasSharingTypes = form.sharingTypes.length > 0;
                console.log('All fields filled:', allFieldsFilled);
                console.log('Has sharing types in main form:', hasSharingTypes);
                console.log('Should be able to submit:', allFieldsFilled && hasSharingTypes);
              }}
              className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-md text-sm"
            >
              🔍 Manual Validation Check
            </button>
          </div>
        )}

        {/* Enhanced Debug Panel with Real-time Status */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-300 mb-6">
            <h4 className="font-bold mb-4 text-xl text-yellow-800">🔍 REAL-TIME FORM DEBUG PANEL</h4>
            
            {/* Overall Status */}
            <div className="mb-6 p-4 bg-white rounded-lg border">
              <h5 className="font-bold text-lg mb-3">📊 Form Validation Status</h5>
              
              {(() => {
                const requiredFieldsValid = !!(
                  form.title?.trim() && 
                  form.hostId?.trim() && 
                  form.description?.trim() && 
                  form.address?.trim() && 
                  form.hostName?.trim() && 
                  form.hostContact?.trim()
                );
                const sharingTypesValid = Array.isArray(form.sharingTypes) && form.sharingTypes.length > 0;
                const allSharingTypesHaveAvailability = form.sharingTypes.every(st => 
                  typeof st.availability === 'number' && st.availability > 0
                );
                const canSubmit = requiredFieldsValid && sharingTypesValid && allSharingTypesHaveAvailability;
                
                return (
                  <div className="space-y-3">
                    <div className={`p-3 rounded ${requiredFieldsValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      <strong>Required Fields:</strong> {requiredFieldsValid ? '✅ All Valid' : '❌ Missing Fields'}
                    </div>
                    <div className={`p-3 rounded ${sharingTypesValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      <strong>Sharing Types Count:</strong> {sharingTypesValid ? `✅ ${form.sharingTypes.length} Added` : '❌ None Added'}
                    </div>
                    <div className={`p-3 rounded ${allSharingTypesHaveAvailability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      <strong>Sharing Types Availability:</strong> {allSharingTypesHaveAvailability ? '✅ All Valid' : '❌ Invalid Availability'}
                    </div>
                    <div className={`p-4 rounded font-bold text-lg ${canSubmit ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'}`}>
                      <strong>OVERALL STATUS:</strong> {canSubmit ? '🎉 READY TO SUBMIT!' : '⚠️ NOT READY'}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Detailed Field Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Required Fields */}
              <div className="bg-white p-4 rounded-lg border">
                <h6 className="font-bold mb-3 text-gray-800">📝 Required Fields Detail</h6>
                <div className="space-y-2 text-sm">
                  <ul>
                    {Object.entries({
                      title: form.title,
                      hostId: form.hostId,
                      description: form.description,
                      address: form.address,
                      hostName: form.hostName,
                      hostContact: form.hostContact
                    }).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sharing Types Status */}
              <div className="bg-white p-4 rounded-lg border">
                <h6 className="font-bold mb-3 text-gray-800">🏠 Sharing Types Detail</h6>
                <div className="text-sm">
                  <div className="mb-3 p-2 bg-blue-50 rounded">
                    <strong>Count:</strong> {form.sharingTypes.length} 
                    {form.sharingTypes.length > 0 ? ' ✅' : ' ❌'}
                  </div>
                  
                  {form.sharingTypes.length > 0 ? (
                    <div className="space-y-2">
                      {form.sharingTypes.map((st, i) => (
                        <div key={i} className="p-2 bg-gray-50 rounded text-xs">
                          <div><strong>#{i + 1}: {st.type}</strong></div>
                          <div>Desc: "{st.description}"</div>
                          <div>Available: {st.availability} {typeof st.availability === 'number' && st.availability > 0 ? '✅' : '❌'}</div>
                          <div>Monthly: ₹{st.pricePerMonth}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-red-600 text-center p-4 bg-red-50 rounded">
                      No sharing types added yet
                    </div>
                  )}

                  <div className="mt-3 p-2 bg-yellow-50 rounded text-xs">
                    <strong>Current Input Form:</strong><br/>
                    Desc: "{sharingTypeForm.description}"<br/>
                    Avail: "{sharingTypeForm.availability}"
                  </div>
                </div>
              </div>
            </div>
            
            {/* Debug Actions */}
            <div className="mt-6 flex gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  console.log('\n🔍 === MANUAL DEBUG TRIGGERED ===');
                  console.log('Complete form state:', form);
                  console.log('Sharing types array:', form.sharingTypes);
                  console.log('Form validation check:');
                  
                  const checks = {
                    title: !!form.title?.trim(),
                    hostId: !!form.hostId?.trim(),
                    description: !!form.description?.trim(),
                    address: !!form.address?.trim(),
                    hostName: !!form.hostName?.trim(),
                    hostContact: !!form.hostContact?.trim(),
                    sharingTypesCount: form.sharingTypes.length,
                    sharingTypesValid: form.sharingTypes.every(st => st.availability > 0)
                  };
                  
                  console.log('Validation checks:', checks);
                  console.log('Should be submittable:', Object.values(checks).every(Boolean));
                }}
                className="bg-purple-600 text-white px-4 py-2 rounded font-medium text-sm"
              >
                🔍 Run Debug Check
              </button>
              
              <button
                type="button"
                onClick={() => {
                  console.log('\n📋 === FORM DATA EXPORT ===');
                  console.log('Copy this data for debugging:');
                  console.log(JSON.stringify({
                    formState: form,
                    sharingTypeInputForm: sharingTypeForm,
                    imageUrls: imageUrls,
                    timestamp: new Date().toISOString()
                  }, null, 2));
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded font-medium text-sm"
              >
                📋 Export Form Data
              </button>
              
              <button
                type="button"
                onClick={() => {
                  console.log('\n🧪 === MOCK SUBMISSION TEST ===');
                  const mockEvent = { preventDefault: () => {} } as React.FormEvent;
                  console.log('Triggering form submission validation...');
                  handleSubmit(mockEvent);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded font-medium text-sm"
              >
                🧪 Test Submission
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
