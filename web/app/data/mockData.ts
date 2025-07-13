export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  sharingOptions: {
    single: number;
    double: number;
    triple: number;
  };
  images: string[];
  genderPreference: 'men' | 'women' | 'co-living';
  propertyType: 'single' | 'shared' | 'private';
  amenities: string[];
  virtualTour?: string;
  hostName: string;
  hostId: string;
  hostAvatar?: string;
  hostPhone?: string;
  hostEmail?: string;
  rating?: number;
  reviewCount?: number;
  availabilityStatus: 'available' | 'limited' | 'full';
  description: string;
  houseRules: string[];
  createdAt: string;
}

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Co-living Space in Koramangala',
    location: 'Koramangala 5th Block, Bangalore',
    price: 16000,
    sharingOptions: {
      single: 20000,
      double: 18000,
      triple: 16000
    },
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    genderPreference: 'co-living',
    propertyType: 'shared',
    amenities: ['WiFi', 'AC', 'Meals', 'Parking', 'Security', 'Gym', 'Laundry', 'Housekeeping'],
    virtualTour: 'https://example-tour.com',
    hostName: 'Rajesh Kumar',
    hostId: 'host-1',
    hostPhone: '+91 98765 43210',
    hostEmail: 'rajesh@example.com',
    rating: 4.8,
    reviewCount: 124,
    availabilityStatus: 'available',
    description: 'A modern co-living space designed for working professionals. Located in the heart of Koramangala with easy access to IT parks, restaurants, and shopping centers.',
    houseRules: ['No smoking', 'No loud music after 10 PM', 'Keep common areas clean', 'Guest policy applies'],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Premium Ladies PG with Meals',
    location: 'Indiranagar, Bangalore',
    price: 14000,
    sharingOptions: {
      single: 18000,
      double: 16000,
      triple: 14000
    },
    images: ['/placeholder.svg', '/placeholder.svg'],
    genderPreference: 'women',
    propertyType: 'shared',
    amenities: ['WiFi', 'AC', 'Meals', 'Security', 'Laundry', 'Common Area', 'Power Backup'],
    hostName: 'Priya Sharma',
    hostId: 'host-2',
    hostPhone: '+91 87654 32109',
    hostEmail: 'priya@example.com',
    rating: 4.6,
    reviewCount: 89,
    availabilityStatus: 'limited',
    description: 'Safe and secure accommodation for working women with homely meals and all modern amenities.',
    houseRules: ['No male visitors', 'Meal timings to be followed', 'Curfew at 11 PM', 'No pets allowed'],
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'Executive Boys Hostel',
    location: 'Whitefield, Bangalore',
    price: 15000,
    sharingOptions: {
      single: 22000,
      double: 18000,
      triple: 15000
    },
    images: ['/placeholder.svg'],
    genderPreference: 'men',
    propertyType: 'shared',
    amenities: ['WiFi', 'AC', 'Parking', 'Security', 'Gym', 'Study Room', 'Refrigerator'],
    virtualTour: 'https://example-tour-2.com',
    hostName: 'Amit Patel',
    hostId: 'host-3',
    hostPhone: '+91 76543 21098',
    hostEmail: 'amit@example.com',
    rating: 4.2,
    reviewCount: 67,
    availabilityStatus: 'available',
    description: 'Modern hostel facility for working professionals in the IT hub of Whitefield.',
    houseRules: ['No smoking in rooms', 'Gym timings: 6 AM - 10 PM', 'Visitors allowed till 9 PM', 'Keep noise levels low'],
    createdAt: '2024-01-08'
  },
  {
    id: '4',
    title: 'Cozy Single Room PG',
    location: 'BTM Layout, Bangalore',
    price: 12000,
    sharingOptions: {
      single: 12000,
      double: 10000,
      triple: 8000
    },
    images: ['/placeholder.svg'],
    genderPreference: 'co-living',
    propertyType: 'single',
    amenities: ['WiFi', 'AC', 'Meals', 'Security', 'Laundry'],
    hostName: 'Sneha Reddy',
    hostId: 'host-4',
    hostPhone: '+91 99887 76655',
    hostEmail: 'sneha@example.com',
    rating: 4.5,
    reviewCount: 92,
    availabilityStatus: 'full',
    description: 'A cozy and affordable single room PG in the bustling area of BTM Layout.',
    houseRules: ['No outside food allowed', 'Maintain silence during study hours', 'Report any issues to management', 'Lock doors when leaving'],
    createdAt: '2024-01-05'
  },
  {
    id: '5',
    title: 'Luxury PG for Gents',
    location: 'HSR Layout, Bangalore',
    price: 18000,
    sharingOptions: {
      single: 25000,
      double: 20000,
      triple: 18000
    },
    images: ['/placeholder.svg'],
    genderPreference: 'men',
    propertyType: 'shared',
    amenities: ['WiFi', 'AC', 'Meals', 'Parking', 'Security', 'Gym', 'Laundry', 'Housekeeping', 'Power Backup'],
    hostName: 'Mahesh Kumar',
    hostId: 'host-5',
    hostPhone: '+91 88776 65544',
    hostEmail: 'mahesh@example.com',
    rating: 4.9,
    reviewCount: 155,
    availabilityStatus: 'available',
    description: 'Experience luxury living in this premium PG designed exclusively for men in HSR Layout.',
    houseRules: ['Strictly no alcohol', 'No pets', 'Respect fellow residents', 'Adhere to all PG policies'],
    createdAt: '2024-01-01'
  },
  {
    id: '6',
    title: 'Comfortable PG for Working Women',
    location: 'Electronic City, Bangalore',
    price: 13000,
    sharingOptions: {
      single: 16000,
      double: 13000,
      triple: 11000
    },
    images: ['/placeholder.svg'],
    genderPreference: 'women',
    propertyType: 'shared',
    amenities: ['WiFi', 'AC', 'Meals', 'Security', 'Laundry', 'Common Area'],
    hostName: 'Divya Gowda',
    hostId: 'host-6',
    hostPhone: '+91 77665 54433',
    hostEmail: 'divya@example.com',
    rating: 4.4,
    reviewCount: 78,
    availabilityStatus: 'limited',
    description: 'A comfortable and secure PG option for working women in the IT hub of Electronic City.',
    houseRules: ['No smoking', 'Maintain cleanliness', 'Inform management of late arrivals', 'Follow all safety guidelines'],
    createdAt: '2023-12-28'
  },
  {
    id: '7',
    title: 'Affordable Co-living Space',
    location: 'Marathahalli, Bangalore',
    price: 11000,
    sharingOptions: {
      single: 14000,
      double: 11000,
      triple: 9000
    },
    images: ['/placeholder.svg'],
    genderPreference: 'co-living',
    propertyType: 'shared',
    amenities: ['WiFi', 'AC', 'Meals', 'Security', 'Laundry', 'Housekeeping'],
    hostName: 'Ravi Kumar',
    hostId: 'host-7',
    hostPhone: '+91 66554 43322',
    hostEmail: 'ravi@example.com',
    rating: 4.3,
    reviewCount: 65,
    availabilityStatus: 'available',
    description: 'An affordable and well-maintained co-living space in the heart of Marathahalli.',
    houseRules: ['No illegal activities', 'Respect privacy of others', 'Conserve water and electricity', 'Adhere to all community rules'],
    createdAt: '2023-12-25'
  },
  {
    id: '8',
    title: 'Spacious Single Room for Rent',
    location: 'JP Nagar, Bangalore',
    price: 15000,
    sharingOptions: {
      single: 15000,
      double: 13000,
      triple: 11000
    },
    images: ['/placeholder.svg'],
    genderPreference: 'co-living',
    propertyType: 'single',
    amenities: ['WiFi', 'AC', 'Parking', 'Security', 'Balcony'],
    hostName: 'Shalini Gupta',
    hostId: 'host-8',
    hostPhone: '+91 55443 32211',
    hostEmail: 'shalini@example.com',
    rating: 4.7,
    reviewCount: 110,
    availabilityStatus: 'available',
    description: 'A spacious and well-lit single room available for rent in the prime location of JP Nagar.',
    houseRules: ['No loud parties', 'Keep the room clean', 'Inform management of any damages', 'Follow all building rules'],
    createdAt: '2023-12-20'
  },
  {
    id: '9',
    title: 'Deluxe PG Accommodation',
    location: 'Sarjapur Road, Bangalore',
    price: 17000,
    sharingOptions: {
      single: 23000,
      double: 17000,
      triple: 15000
    },
    images: ['/placeholder.svg'],
    genderPreference: 'co-living',
    propertyType: 'shared',
    amenities: ['WiFi', 'AC', 'Meals', 'Parking', 'Security', 'Gym', 'Laundry', 'Housekeeping', 'Refrigerator'],
    hostName: 'Vikram Singh',
    hostId: 'host-9',
    hostPhone: '+91 44332 21100',
    hostEmail: 'vikram@example.com',
    rating: 4.6,
    reviewCount: 102,
    availabilityStatus: 'limited',
    description: 'Experience deluxe living in this premium PG accommodation located on Sarjapur Road.',
    houseRules: ['No smoking indoors', 'Maintain decorum', 'Respect fellow residents', 'Adhere to all PG policies'],
    createdAt: '2023-12-15'
  },
  {
    id: '10',
    title: 'Budget-Friendly PG for Students',
    location: 'RR Nagar, Bangalore',
    price: 9000,
    sharingOptions: {
      single: 11000,
      double: 9000,
      triple: 7000
    },
    images: ['/placeholder.svg'],
    genderPreference: 'co-living',
    propertyType: 'shared',
    amenities: ['WiFi', 'Meals', 'Security', 'Study Room'],
    hostName: 'Deepika Sharma',
    hostId: 'host-10',
    hostPhone: '+91 33221 10099',
    hostEmail: 'deepika@example.com',
    rating: 4.1,
    reviewCount: 55,
    availabilityStatus: 'available',
    description: 'A budget-friendly PG option for students located in the vicinity of RR Nagar.',
    houseRules: ['No alcohol', 'Maintain silence during study hours', 'Respect fellow residents', 'Follow all hostel rules'],
    createdAt: '2023-12-10'
  }
];

// Export featured and trending properties for the Index page
export const featuredProperties = mockProperties.slice(0, 3);
export const trendingProperties = mockProperties.slice(3, 6);
