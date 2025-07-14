'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const initialState = {
  title: '',
  location: '',
  price: '',
  sharing_single: '',
  sharing_double: '',
  sharing_triple: '',
  images: [],
  gender_preference: 'co-living',
  property_type: 'shared',
  amenities: [],
  virtual_tour: '',
  host_name: '',
  host_id: '',
  host_avatar: '',
  host_phone: '',
  host_email: '',
  availability_status: 'available',
  available: true,
  description: '',
  house_rules: [],
};

const amenitiesList = [
  'WiFi', 'AC', 'Meals', 'Parking', 'Security', 'Gym', 'Laundry', 'Housekeeping', 'Common Area', 'Power Backup', 'Refrigerator', 'Microwave', 'Balcony', 'Study Room'
];

const houseRulesList = [
  'No smoking', 'No pets', 'No loud music after 10 PM', 'Keep common areas clean', 'Guest policy applies'
];

export default function AddProperty() {
  const [form, setForm] = useState(initialState);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
    //   [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMultiSelect = (name: string, value: string) => {
    setForm(prev => {
      const arr = prev[name as keyof typeof prev] as string[];
      return arr.includes(value)
        ? { ...prev, [name]: arr.filter(v => v !== value) }
        : { ...prev, [name]: [...arr, value] };
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setLoading(true);
    const files = Array.from(e.target.files);
    const urls: string[] = [];

    for (const file of files) {
    //   const { data, error } = 
    //   if (error) {
    //     setMessage('Image upload failed: ' + error.message);
    //   }
    }

    setImageUrls(urls);
    setForm(prev => ({ ...prev, images: urls }));
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const propertyData = {
      ...form,
      price: Number(form.price),
      sharing_single: Number(form.sharing_single),
      sharing_double: Number(form.sharing_double),
      sharing_triple: Number(form.sharing_triple),
      images: imageUrls,
    };

    setLoading(false);
    router.push('/admin/properties')
  };

  return (
    <div className="max-w-2xl mx-auto p-6 m-10 bg-gray-100 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Property</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Text Inputs */}
        {[
          { name: 'title', placeholder: 'Title' },
          { name: 'location', placeholder: 'Location' },
          { name: 'price', placeholder: 'Base Price', type: 'number' },
          { name: 'virtual_tour', placeholder: 'Virtual Tour Link' },
          { name: 'host_name', placeholder: 'Host Name' },
          { name: 'host_id', placeholder: 'Host ID' },
          { name: 'host_avatar', placeholder: 'Host Avatar URL' },
          { name: 'host_phone', placeholder: 'Host Phone' },
          { name: 'host_email', placeholder: 'Host Email' },
        ].map((field) => (
          <input
            key={field.name}
            name={field.name}
            value={form[field.name as keyof typeof form] as string}
            onChange={handleChange}
            placeholder={field.placeholder}
            type={field.type || 'text'}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-2">
          {['sharing_single', 'sharing_double', 'sharing_triple'].map(field => (
            <input
              key={field}
              name={field}
              value={form[field as keyof typeof form] as string}
              onChange={handleChange}
              placeholder={field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' Price'}
              type="number"
              required
              className="w-1/3 px-4 py-2 border rounded-md focus:outline-none"
            />
          ))}
        </div>

        {/* File Upload */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-4 py-2 border rounded-md bg-gray-50"
        />

        {/* Select Inputs */}
        {[
          { name: 'gender_preference', options: ['men', 'women', 'co-living'], label: 'Gender Preference' },
          { name: 'property_type', options: ['single', 'shared', 'private'], label: 'Property Type' },
          { name: 'availability_status', options: ['available', 'limited', 'full'], label: 'Availability Status' },
        ].map(({ name, options, label }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}:</label>
            <select
              name={name}
              value={form[name as keyof typeof form] as string}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              {options.map(opt => (
                <option key={opt} value={opt}>{opt[0].toUpperCase() + opt.slice(1)}</option>
              ))}
            </select>
          </div>
        ))}

        {/* Checkbox: Available */}
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            name="available"
            checked={form.available}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="text-gray-700">Currently Available</span>
        </label>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amenities:</label>
          <div className="flex flex-wrap gap-2">
            {amenitiesList.map(a => (
              <label key={a} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={form.amenities.includes(a)}
                  onChange={() => handleMultiSelect('amenities', a)}
                  className="form-checkbox text-blue-600"
                />
                <span className="text-sm text-gray-700">{a}</span>
              </label>
            ))}
          </div>
        </div>

        {/* House Rules */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">House Rules:</label>
          <div className="flex flex-wrap gap-2">
            {houseRulesList.map(r => (
              <label key={r} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={form.house_rules.includes(r)}
                  onChange={() => handleMultiSelect('house_rules', r)}
                  className="form-checkbox text-blue-600"
                />
                <span className="text-sm text-gray-700">{r}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button & Message */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Property'}
        </button>
        {message && <p className="text-center text-sm text-red-500 mt-2">{message}</p>}
      </form>
    </div>
  );
}
