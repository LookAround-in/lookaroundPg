'use client';
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { useRouter } from 'next/navigation';

export const SearchBar = () => {
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      router.push(`/explore?location=${encodeURIComponent(location.trim())}`);
    } else {
      router.push('/explore');
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative flex items-center">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by location, area, or landmark"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 pr-20 h-12 rounded-l-full border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <Button 
          type="submit"
          className="h-12 px-6 rounded-r-full bg-gradient-cool"
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    </form>
  );
};
