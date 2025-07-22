'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  PropertyType, 
  FurnishingType, 
  MoveInStatus, 
  FurnitureType, 
  AmenityType,
  SharingType 
} from '@/interfaces/pg';

interface SharingTypeForm {
  type: SharingType;
  description: string;
  price: string;
  pricePerMonth: string;
  deposit: string;
  refundableAmount: string;
  availability: string;
}

interface PropertyForm {
  title: string;
  hostId: string;
  description: string;
  propertyType: PropertyType;
  foodIncluded: boolean;
  furnishing: FurnishingType;
  address: string;
  latitude: string;
  longitude: string;
  furnitures: FurnitureType[];
  amenities: AmenityType[];
  sharingTypes: SharingTypeForm[];
  pgRules: string;
  moveInStatus: MoveInStatus;
  virtualTourUrl: string;
  rating: string;
  reviews: string[];
  images: File[];
}

const initialFormState: PropertyForm = {
  title: '',
  hostId: 'hostprofile-002', // Default host ID - you can change this or make it dynamic
  description: '',
  propertyType: PropertyType.COLIVE,
  foodIncluded: false,
  furnishing: FurnishingType.FURNISHED,
  address: '',
  latitude: '',
  longitude: '',
  furnitures: [],
  amenities: [],
  sharingTypes: [],
  pgRules: '',
  moveInStatus: MoveInStatus.IMMEDIATE,
  virtualTourUrl: '',
  rating: '',
  reviews: [],
  images: []
};

const initialSharingTypeState: SharingTypeForm = {
  type: SharingType.SINGLE,
  description: '',
  price: '',
  pricePerMonth: '',
  deposit: '',
  refundableAmount: '',
  availability: ''
};

// API function to create property
const createProperty = async (formData: FormData): Promise<any> => {
  const response = await fetch('/api/v1/pg', {
    method: 'POST',
    body: formData, // Send FormData directly
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create property: ${response.status} ${errorText}`);
  }

  return response.json();
};

export default function AddProperty() {
  const [form, setForm] = useState<PropertyForm>(initialFormState);
  const [sharingTypeForm, setSharingTypeForm] = useState<SharingTypeForm>(initialSharingTypeState);
  const [message, setMessage] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const router = useRouter();
  const queryClient = useQueryClient();

  // TanStack Query mutation
  const createPropertyMutation = useMutation({
    mutationFn: createProperty,
    onSuccess: (data) => {
      setMessage('Property created successfully!');
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      setTimeout(() => {
        router.push('/admin/properties');
      }, 2000);
    },
    onError: (error: Error) => {
      console.error('Mutation error:', error);
      setMessage('Error creating property: ' + error.message);
    },
  });

  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle multi-select for arrays (amenities, furnitures)
  const handleMultiSelect = (name: 'furnitures' | 'amenities', value: FurnitureType | AmenityType) => {
    setForm(prev => {
      const currentArray = prev[name];
      const updatedArray = currentArray.includes(value as any)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value as any];
      
      return { ...prev, [name]: updatedArray };
    });
  };

  // Handle sharing type form changes
  const handleSharingTypeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSharingTypeForm(prev => ({ ...prev, [name]: value }));
  };

  // Add sharing type to the main form
  const addSharingType = () => {
    if (!sharingTypeForm.description.trim() || !sharingTypeForm.availability || Number(sharingTypeForm.availability) <= 0) {
      setMessage('Please fill in description and valid availability for sharing type');
      return;
    }

    setForm(prev => ({
      ...prev,
      sharingTypes: [...prev.sharingTypes, { ...sharingTypeForm }]
    }));

    setSharingTypeForm(initialSharingTypeState);
    setMessage('Sharing type added successfully!');
    setTimeout(() => setMessage(''), 2000);
  };

  // Remove sharing type
  const removeSharingType = (index: number) => {
    setForm(prev => ({
      ...prev,
      sharingTypes: prev.sharingTypes.filter((_, i) => i !== index)
    }));
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImageFiles(files);
      setForm(prev => ({ ...prev, images: files }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    // Validation
    if (!form.title.trim() || !form.description.trim() || !form.address.trim()) {
      setMessage('Please fill in all required fields');
      return;
    }

    if (form.sharingTypes.length === 0) {
      setMessage('Please add at least one sharing type');
      return;
    }

    try {
      // Create FormData to match backend expectations
      const formData = new FormData();

      // Add basic fields
      formData.append('title', form.title);
      formData.append('hostId', form.hostId);
      formData.append('description', form.description);
      formData.append('propertyType', form.propertyType);
      formData.append('foodIncluded', form.foodIncluded.toString());
      formData.append('furnishing', form.furnishing);
      formData.append('address', form.address);
      formData.append('latitude', form.latitude || '0');
      formData.append('longitude', form.longitude || '0');
      formData.append('pgRules', form.pgRules);
      formData.append('moveInStatus', form.moveInStatus);
      formData.append('virtualTourUrl', form.virtualTourUrl);
      formData.append('rating', form.rating || '0');

      // Add JSON arrays
      formData.append('furnitures', JSON.stringify(form.furnitures));
      formData.append('amenities', JSON.stringify(form.amenities));
      formData.append('reviews', JSON.stringify(form.reviews));

      // Transform sharing types to match backend structure
      const sharingTypesForBackend = form.sharingTypes.map(st => ({
        type: st.type,
        description: st.description,
        price: Number(st.price) || 0,
        pricePerMonth: Number(st.pricePerMonth) || 0,
        deposit: Number(st.deposit) || 0,
        refundableAmount: Number(st.refundableAmount) || 0,
        availability: Number(st.availability) || 0
      }));
      formData.append('sharingTypes', JSON.stringify(sharingTypesForBackend));

      // Add image files
      imageFiles.forEach(file => {
        formData.append('images', file);
      });

      // Submit using mutation
      createPropertyMutation.mutate(formData);

    } catch (error) {
      console.error('Form submission error:', error);
      setMessage('Error preparing form data');
    }
  };

  const getDisplayValue = (enumValue: string) => {
    return enumValue.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const isLoading = createPropertyMutation.isPending;

  return (
    <div className="max-w-4xl mx-auto p-6 m-10 bg-gray-100 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Property</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Property Title *</label>
              <input
                name="title"
                value={form.title}
                onChange={handleInputChange}
                placeholder="Enter property title"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Host ID *</label>
              <input
                name="hostId"
                value={form.hostId}
                onChange={handleInputChange}
                placeholder="Host ID"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleInputChange}
              placeholder="Enter property description"
              required
              rows={3}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Property Details */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Property Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Property Type *</label>
              <select
                name="propertyType"
                value={form.propertyType}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.values(PropertyType).map(type => (
                  <option key={type} value={type}>
                    {type === 'COLIVE' ? 'Co-Living' : getDisplayValue(type)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Furnishing *</label>
              <select
                name="furnishing"
                value={form.furnishing}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.values(FurnishingType).map(type => (
                  <option key={type} value={type}>{getDisplayValue(type)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Move-in Status *</label>
              <select
                name="moveInStatus"
                value={form.moveInStatus}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.values(MoveInStatus).map(status => (
                  <option key={status} value={status}>{getDisplayValue(status)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="foodIncluded"
                checked={form.foodIncluded}
                onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="text-sm font-medium">Food Included</span>
            </label>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <label className="block text-sm font-medium mb-1">Address *</label>
              <input
                name="address"
                value={form.address}
                onChange={handleInputChange}
                placeholder="Enter full address"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Latitude</label>
              <input
                name="latitude"
                type="number"
                step="any"
                value={form.latitude}
                onChange={handleInputChange}
                placeholder="Latitude"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Longitude</label>
              <input
                name="longitude"
                type="number"
                step="any"
                value={form.longitude}
                onChange={handleInputChange}
                placeholder="Longitude"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rating</label>
              <input
                name="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={form.rating}
                onChange={handleInputChange}
                placeholder="Rating (0-5)"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Sharing Types */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Sharing Types *</h2>
          
          {/* Add Sharing Type Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
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
              <label className="block text-sm font-medium mb-1">Description *</label>
              <input
                name="description"
                value={sharingTypeForm.description}
                onChange={handleSharingTypeChange}
                placeholder="Room description"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price per Month</label>
              <input
                name="pricePerMonth"
                type="number"
                min="0"
                value={sharingTypeForm.pricePerMonth}
                onChange={handleSharingTypeChange}
                placeholder="Monthly rent"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Deposit</label>
              <input
                name="deposit"
                type="number"
                min="0"
                value={sharingTypeForm.deposit}
                onChange={handleSharingTypeChange}
                placeholder="Security deposit"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Availability *</label>
              <input
                name="availability"
                type="number"
                min="1"
                value={sharingTypeForm.availability}
                onChange={handleSharingTypeChange}
                placeholder="Available rooms"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={addSharingType}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add Sharing Type
              </button>
            </div>
          </div>

          {/* Display Added Sharing Types */}
          {form.sharingTypes.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-md font-semibold">Added Sharing Types:</h3>
              {form.sharingTypes.map((sharingType, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
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
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.values(AmenityType).map(amenity => (
              <label key={amenity} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.amenities.includes(amenity)}
                  onChange={() => handleMultiSelect('amenities', amenity)}
                  className="form-checkbox text-blue-600"
                />
                <span className="text-sm">{getDisplayValue(amenity)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Furnitures */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Furnitures</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.values(FurnitureType).map(furniture => (
              <label key={furniture} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.furnitures.includes(furniture)}
                  onChange={() => handleMultiSelect('furnitures', furniture)}
                  className="form-checkbox text-blue-600"
                />
                <span className="text-sm">{getDisplayValue(furniture)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">PG Rules</label>
              <textarea
                name="pgRules"
                value={form.pgRules}
                onChange={handleInputChange}
                placeholder="Enter PG rules and regulations"
                rows={3}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Virtual Tour URL</label>
              <input
                name="virtualTourUrl"
                value={form.virtualTourUrl}
                onChange={handleInputChange}
                placeholder="Virtual tour link"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Property Images</h2>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-3 py-2 border rounded-md bg-gray-50"
          />
          {imageFiles.length > 0 && (
            <p className="text-green-600 text-sm mt-2">
              {imageFiles.length} image(s) selected
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating Property...' : 'Create Property'}
        </button>

        {/* Message Display */}
        {message && (
          <div className={`text-center p-3 rounded-md ${
            message.includes('Error') || message.includes('fill') 
              ? 'bg-red-100 text-red-700 border border-red-300' 
              : 'bg-green-100 text-green-700 border border-green-300'
          }`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}