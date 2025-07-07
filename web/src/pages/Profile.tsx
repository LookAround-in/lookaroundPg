import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, Settings, Heart, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, logout, isLoading } = useAuth();
  const { wishlist } = useWishlist();
  const { toast } = useToast();
  const router = useRouter();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Debug logging
  console.log('Profile component - isLoading:', isLoading, 'user:', user);

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  // Handle authentication check
  useEffect(() => {
    if (!isLoading && !user) {
      console.log('Redirecting to login - no user found');
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Show loading state
  if (isLoading) {
    console.log('Showing loading state');
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render if no user (will redirect)
  if (!user) {
    console.log('No user, returning null');
    return null;
  }

  console.log('Rendering profile page for user:', user);

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleLogout = () => {
    logout();
    router.push('/');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="min-h-screen bg-light-gray">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-charcoal mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-white" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave}>
                        Save Changes
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Wishlist</span>
                  </div>
                  <span className="font-semibold">{wishlist.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Email</span>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Verified
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Phone</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    {user.phone ? 'Added' : 'Not Added'}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/wishlist')}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  View Wishlist
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/settings')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-600 hover:text-red-700"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
