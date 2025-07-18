'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';

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
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState(initialState);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm(prev => ({
      ...prev,
      [name]: newValue,
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
    // ...image upload logic...
    setImageUrls(urls);
    setForm(prev => ({ ...prev, images: urls }));
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    // ...submit logic...
    setLoading(false);
    router.push('/admin/properties');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-16 px-2">
      <div className="max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-xl p-8 md:p-12">
        <h1 className="text-4xl font-bold text-center text-charcoa mb-2">Add New Property</h1>
        <p className="text-center text-gray-500 mb-8">Fill in the details to list your property</p>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Property Details */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">Property Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                required
                className="Input"
              />
              <Input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
                required
                className="Input"
              />
              <Input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Base Price"
                type="number"
                required
                className="Input"
              />
              <Input
                name="virtual_tour"
                value={form.virtual_tour}
                onChange={handleChange}
                placeholder="Virtual Tour Link"
                className="Input"
              />
            </div>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              required
              className="Input mt-4"
              rows={3}
            />
          </section>

          {/* Sharing Prices */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">Sharing Prices</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['sharing_single', 'sharing_double', 'sharing_triple'].map(field => (
                <Input
                  key={field}
                  name={field}
                  value={form[field as keyof typeof form] as string}
                  onChange={handleChange}
                  placeholder={field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' Price'}
                  type="number"
                  required
                  className="Input"
                />
              ))}
            </div>
          </section>

          {/* Image Upload */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-4">Images</h2>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="Input bg-gray-50"
            />
            {imageUrls.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {imageUrls.map((url, idx) => (
                  <img key={idx} src={url} alt="Property" className="w-20 h-20 object-cover rounded-lg border" />
                ))}
              </div>
            )}
          </section>

          {/* Select Inputs */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender Preference</label>
              <select
                name="gender_preference"
                value={form.gender_preference}
                onChange={handleChange}
                className="Input"
              >
                {['men', 'women', 'co-living'].map(opt => (
                  <option key={opt} value={opt}>{opt[0].toUpperCase() + opt.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
              <select
                name="property_type"
                value={form.property_type}
                onChange={handleChange}
                className="Input"
              >
                {['single', 'shared', 'private'].map(opt => (
                  <option key={opt} value={opt}>{opt[0].toUpperCase() + opt.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability Status</label>
              <select
                name="availability_status"
                value={form.availability_status}
                onChange={handleChange}
                className="Input"
              >
                {['available', 'limited', 'full'].map(opt => (
                  <option key={opt} value={opt}>{opt[0].toUpperCase() + opt.slice(1)}</option>
                ))}
              </select>
            </div>
          </section>

          {/* Available Checkbox */}
          <section>
            <label className="inline-flex items-center space-x-2">
              <Input
                type="checkbox"
                name="available"
                checked={form.available}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700">Currently Available</span>
            </label>
          </section>

          {/* Amenities */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">Amenities</h2>
            <div className="flex flex-wrap gap-3">
              {amenitiesList.map(a => (
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

          {/* House Rules */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">House Rules</h2>
            <div className="flex flex-wrap gap-3">
              {houseRulesList.map(r => (
                <label key={r} className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-lg">
                  <Input
                    type="checkbox"
                    checked={form.house_rules.includes(r)}
                    onChange={() => handleMultiSelect('house_rules', r)}
                    className="form-checkbox text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{r}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Host Details */}

          {/* Submit Button & Message */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-cool text-white py-3 px-4 rounded-lg font-semibold text-lg shadow hover:bg-primary transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Property'}
            </button>
            {message && <p className="text-center text-sm text-red-500 mt-2">{message}</p>}
          </div>
        </form>
      </div>

      {/* Tailwind utility for Input */}
      <style jsx global>{`
        .Input {
          @apply w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/60 bg-white;
        }
      `}</style>
    </div>
  );
}
