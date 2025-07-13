export interface Property {
  id: string;
  title: string;
  location: string;
  description: string;
  price_single: number;
  price_double: number;
  price_triple: number;
  images: string[];
  genderPreference: 'men' | 'women' | 'co-living';
  propertyType: string;
  amenities: string[];
  virtualTour?: string;
  hostName: string;
  hostId: string;
  hostAvatar?: string;
  hostPhone?: string;
  hostEmail?: string;
  rating?: number;
  views: number;
  reviewCount?: number;
  availabilityStatus: 'available' | 'limited' | 'full';
  houseRules: string[];
  createdAt: string;
  updatedAt: string;
  move_in: string;
}

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Co-living Space in Koramangala',
    location: 'Koramangala 5th Block, Bangalore',
    description: 'A modern co-living space designed for working professionals. Located in the heart of Koramangala with easy access to IT parks, restaurants, and shopping centers.',
    price_single: 20000,
    price_double: 18000,
    price_triple: 16000,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
    ],
    genderPreference: 'co-living',
    propertyType: 'Shared',
    amenities: ['WiFi', 'AC', 'Meals', 'Parking', 'Security', 'Gym', 'Laundry', 'Housekeeping'],
    virtualTour: 'https://example-tour.com',
    hostName: 'Rajesh Kumar',
    hostId: 'host-1',
    hostAvatar: 'https://unsplash.com/photos/blurred-silhouette-of-a-woman-in-purple-light-ey98sd6FkcU',
    hostPhone: '+91 98765 43210',
    hostEmail: 'rajesh@example.com',
    rating: 4.8,
    views: 1250,
    reviewCount: 124,
    availabilityStatus: 'available',
    houseRules: ['No smoking', 'No loud music after 10 PM', 'Keep common areas clean', 'Guest policy applies'],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T15:45:00Z',
    move_in: '2024-02-01'
  },
  {
    id: '2',
    title: 'Premium Ladies PG with Meals',
    location: 'Indiranagar, Bangalore',
    description: 'Safe and secure accommodation for working women with homely meals and all modern amenities.',
    price_single: 18000,
    price_double: 16000,
    price_triple: 14000,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
    ],
    genderPreference: 'women',
    propertyType: 'Shared',
    amenities: ['WiFi', 'AC', 'Meals', 'Security', 'Laundry', 'Common Area', 'Power Backup'],
    hostName: 'Priya Sharma',
    hostId: 'host-2',
    hostAvatar: '/avatars/priya.jpg',
    hostPhone: '+91 87654 32109',
    hostEmail: 'priya@example.com',
    rating: 4.6,
    views: 890,
    reviewCount: 89,
    availabilityStatus: 'limited',
    houseRules: ['No male visitors', 'Meal timings to be followed', 'Curfew at 11 PM', 'No pets allowed'],
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-18T11:20:00Z',
    move_in: '2024-01-25'
  },
  {
    id: '3',
    title: 'Executive Boys Hostel',
    location: 'Whitefield, Bangalore',
    description: 'Modern hostel facility for working professionals in the IT hub of Whitefield.',
    price_single: 22000,
    price_double: 18000,
    price_triple: 15000,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
    ],
    genderPreference: 'men',
    propertyType: 'Shared',
    amenities: ['WiFi', 'AC', 'Parking', 'Security', 'Gym', 'Study Room', 'Refrigerator'],
    virtualTour: 'https://example-tour-2.com',
    hostName: 'Amit Patel',
    hostId: 'host-3',
    hostAvatar: '/avatars/amit.jpg',
    hostPhone: '+91 76543 21098',
    hostEmail: 'amit@example.com',
    rating: 4.2,
    views: 675,
    reviewCount: 67,
    availabilityStatus: 'available',
    houseRules: ['No smoking in rooms', 'Gym timings: 6 AM - 10 PM', 'Visitors allowed till 9 PM', 'Keep noise levels low'],
    createdAt: '2024-01-08T14:22:00Z',
    updatedAt: '2024-01-16T16:30:00Z',
    move_in: '2024-01-30'
  },
  {
    id: '4',
    title: 'Cozy Single Room PG',
    location: 'BTM Layout, Bangalore',
    description: 'A cozy and affordable single room PG in the bustling area of BTM Layout.',
    price_single: 12000,
    price_double: 10000,
    price_triple: 8000,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
    ],
    genderPreference: 'co-living',
    propertyType: 'Single',
    amenities: ['WiFi', 'AC', 'Meals', 'Security', 'Laundry'],
    hostName: 'Sneha Reddy',
    hostId: 'host-4',
    hostAvatar: '/avatars/sneha.jpg',
    hostPhone: '+91 99887 76655',
    hostEmail: 'sneha@example.com',
    rating: 4.5,
    views: 920,
    reviewCount: 92,
    availabilityStatus: 'full',
    houseRules: ['No outside food allowed', 'Maintain silence during study hours', 'Report any issues to management', 'Lock doors when leaving'],
    createdAt: '2024-01-05T08:45:00Z',
    updatedAt: '2024-01-14T12:15:00Z',
    move_in: '2024-02-15'
  },
  {
    id: '5',
    title: 'Luxury PG for Gents',
    location: 'HSR Layout, Bangalore',
    description: 'Experience luxury living in this premium PG designed exclusively for men in HSR Layout.',
    price_single: 25000,
    price_double: 20000,
    price_triple: 18000,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
    ],
    genderPreference: 'men',
    propertyType: 'Shared',
    amenities: ['WiFi', 'AC', 'Meals', 'Parking', 'Security', 'Gym', 'Laundry', 'Housekeeping', 'Power Backup'],
    hostName: 'Mahesh Kumar',
    hostId: 'host-5',
    hostAvatar: '/avatars/mahesh.jpg',
    hostPhone: '+91 88776 65544',
    hostEmail: 'mahesh@example.com',
    rating: 4.9,
    views: 1550,
    reviewCount: 155,
    availabilityStatus: 'available',
    houseRules: ['Strictly no alcohol', 'No pets', 'Respect fellow residents', 'Adhere to all PG policies'],
    createdAt: '2024-01-01T07:30:00Z',
    updatedAt: '2024-01-12T10:45:00Z',
    move_in: '2024-01-20'
  },
  {
    id: '6',
    title: 'Comfortable PG for Working Women',
    location: 'Electronic City, Bangalore',
    description: 'A comfortable and secure PG option for working women in the IT hub of Electronic City.',
    price_single: 16000,
    price_double: 13000,
    price_triple: 11000,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
    ],
    genderPreference: 'women',
    propertyType: 'Shared',
    amenities: ['WiFi', 'AC', 'Meals', 'Security', 'Laundry', 'Common Area'],
    hostName: 'Divya Gowda',
    hostId: 'host-6',
    hostAvatar: '/avatars/divya.jpg',
    hostPhone: '+91 77665 54433',
    hostEmail: 'divya@example.com',
    rating: 4.4,
    views: 780,
    reviewCount: 78,
    availabilityStatus: 'limited',
    houseRules: ['No smoking', 'Maintain cleanliness', 'Inform management of late arrivals', 'Follow all safety guidelines'],
    createdAt: '2023-12-28T13:10:00Z',
    updatedAt: '2024-01-08T17:25:00Z',
    move_in: '2024-02-10'
  },
  {
    id: '7',
    title: 'Affordable Co-living Space',
    location: 'Marathahalli, Bangalore',
    description: 'An affordable and well-maintained co-living space in the heart of Marathahalli.',
    price_single: 14000,
    price_double: 11000,
    price_triple: 9000,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
    ],
    genderPreference: 'co-living',
    propertyType: 'Shared',
    amenities: ['WiFi', 'AC', 'Meals', 'Security', 'Laundry', 'Housekeeping'],
    hostName: 'Ravi Kumar',
    hostId: 'host-7',
    hostAvatar: '/avatars/ravi.jpg',
    hostPhone: '+91 66554 43322',
    hostEmail: 'ravi@example.com',
    rating: 4.3,
    views: 650,
    reviewCount: 65,
    availabilityStatus: 'available',
    houseRules: ['No illegal activities', 'Respect privacy of others', 'Conserve water and electricity', 'Adhere to all community rules'],
    createdAt: '2023-12-25T11:30:00Z',
    updatedAt: '2024-01-05T14:40:00Z',
    move_in: '2024-01-28'
  },
  {
    id: '8',
    title: 'Spacious Single Room for Rent',
    location: 'JP Nagar, Bangalore',
    description: 'A spacious and well-lit single room available for rent in the prime location of JP Nagar.',
    price_single: 15000,
    price_double: 13000,
    price_triple: 11000,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
    ],
    genderPreference: 'co-living',
    propertyType: 'Single',
    amenities: ['WiFi', 'AC', 'Parking', 'Security', 'Balcony'],
    hostName: 'Shalini Gupta',
    hostId: 'host-8',
    hostAvatar: '/avatars/shalini.jpg',
    hostPhone: '+91 55443 32211',
    hostEmail: 'shalini@example.com',
    rating: 4.7,
    views: 1100,
    reviewCount: 110,
    availabilityStatus: 'available',
    houseRules: ['No loud parties', 'Keep the room clean', 'Inform management of any damages', 'Follow all building rules'],
    createdAt: '2023-12-20T16:20:00Z',
    updatedAt: '2024-01-03T09:55:00Z',
    move_in: '2024-02-05'
  },
  {
    id: '9',
    title: 'Deluxe PG Accommodation',
    location: 'Sarjapur Road, Bangalore',
    description: 'Experience deluxe living in this premium PG accommodation located on Sarjapur Road.',
    price_single: 23000,
    price_double: 17000,
    price_triple: 15000,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
    ],
    genderPreference: 'co-living',
    propertyType: 'Shared',
    amenities: ['WiFi', 'AC', 'Meals', 'Parking', 'Security', 'Gym', 'Laundry', 'Housekeeping', 'Refrigerator'],
    hostName: 'Vikram Singh',
    hostId: 'host-9',
    hostAvatar: '/avatars/vikram.jpg',
    hostPhone: '+91 44332 21100',
    hostEmail: 'vikram@example.com',
    rating: 4.6,
    views: 1020,
    reviewCount: 102,
    availabilityStatus: 'limited',
    houseRules: ['No smoking indoors', 'Maintain decorum', 'Respect fellow residents', 'Adhere to all PG policies'],
    createdAt: '2023-12-15T12:45:00Z',
    updatedAt: '2023-12-30T18:10:00Z',
    move_in: '2024-01-22'
  },
  {
    id: '10',
    title: 'Budget-Friendly PG for Students',
    location: 'RR Nagar, Bangalore',
    description: 'A budget-friendly PG option for students located in the vicinity of RR Nagar.',
    price_single: 11000,
    price_double: 9000,
    price_triple: 7000,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
    ],
    genderPreference: 'co-living',
    propertyType: 'Shared',
    amenities: ['WiFi', 'Meals', 'Security', 'Study Room'],
    hostName: 'Deepika Sharma',
    hostId: 'host-10',
    hostAvatar: '/avatars/deepika.jpg',
    hostPhone: '+91 33221 10099',
    hostEmail: 'deepika@example.com',
    rating: 4.1,
    views: 550,
    reviewCount: 55,
    availabilityStatus: 'available',
    houseRules: ['No alcohol', 'Maintain silence during study hours', 'Respect fellow residents', 'Follow all hostel rules'],
    createdAt: '2023-12-10T15:30:00Z',
    updatedAt: '2023-12-28T13:25:00Z',
    move_in: '2024-01-15'
  }
];

// Export featured and trending properties for the Index page
export const featuredProperties = mockProperties.slice(0, 3);
export const trendingProperties = mockProperties.slice(3, 6);
