'use client'
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, User, Star, Phone, Mail, MapPin, Home, Calendar, TrendingUp, Users, Shield, Award } from 'lucide-react';
import { mockProperties } from 'app/data/mockData';

const HostProperties = () => {
  const { hostId } = useParams();
  const router = useRouter();
  
  // Find host properties (in real app, this would be an API call)
  const hostProperties = mockProperties.filter(p => p.hostId === hostId);
  const hostInfo = hostProperties[0]; // Get host info from first property
  
  if (!hostInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Card className="text-center p-8 dark:bg-gray-800">
          <CardContent>
            <div className="w-20 h-20 bg-gradient-cool-light rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <User className="h-10 w-10 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-4 dark:text-white">Host not found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">The host you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => router.push('/explore')} className="bg-gradient-cool text-white hover:opacity-90">
              Explore Properties
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const hostStats = {
    totalProperties: hostProperties.length,
    averageRating: 4.8,
    totalReviews: 127,
    responseRate: 98,
    responseTime: '2 hours',
    yearsHosting: 5,
    occupancyRate: 92,
    repeatGuests: 78
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Back button */}
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-6 dark:text-white dark:hover:bg-gray-800 font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Previous Page
        </Button>

        {/* Enhanced Host Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {/* Main Profile Card */}
          <Card className="lg:col-span-2 dark:bg-gray-800 dark:border-gray-700 gradient-border">
            <CardContent className="p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-6 sm:space-y-0 sm:space-x-6">
                {/* Host Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-cool rounded-full flex items-center justify-center flex-shrink-0 p-1">
                    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                      {hostInfo.hostAvatar ? (
                        <img 
                          src={hostInfo.hostAvatar} 
                          alt={hostInfo.hostName} 
                          className="w-20 h-20 rounded-full object-cover" 
                        />
                      ) : (
                        <User className="h-10 w-10 text-gradient-cool" />
                      )}
                    </div>
                  </div>
                  <Badge className="absolute -bottom-2 -right-2 bg-green-500 text-white border-2 border-white dark:border-gray-800">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>

                {/* Host Info */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-bold text-charcoal dark:text-white mb-2 tracking-tight">
                        {hostInfo.hostName}
                      </h1>
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge variant="outline" className="bg-gradient-cool-light text-gradient-cool font-medium">
                          <Award className="h-3 w-3 mr-1" />
                          Superhost
                        </Badge>
                        <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                          Property Host
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Home className="h-4 w-4 mr-1" />
                          <span className="font-medium">{hostStats.totalProperties} Properties</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>Bangalore, Karnataka</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{hostStats.yearsHosting} years hosting</span>
                        </div>
                      </div>
                    </div>
                    
                    {hostInfo.rating && (
                      <div className="flex items-center space-x-2 mt-4 sm:mt-0 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 rounded-lg">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="text-lg font-bold dark:text-white">{hostStats.averageRating}</span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          ({hostStats.totalReviews} reviews)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-gradient-cool text-white hover:opacity-90 font-medium">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Host
                    </Button>
                    <Button variant="outline" className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 font-medium">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button className="bg-green-500 text-white hover:bg-green-600 border-green-500 font-medium">
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gradient-cool flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Host Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Response Rate</span>
                  <span className="text-sm font-bold text-green-600">{hostStats.responseRate}%</span>
                </div>
                <Progress value={hostStats.responseRate} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Occupancy Rate</span>
                  <span className="text-sm font-bold text-blue-600">{hostStats.occupancyRate}%</span>
                </div>
                <Progress value={hostStats.occupancyRate} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Repeat Guests</span>
                  <span className="text-sm font-bold text-purple-600">{hostStats.repeatGuests}%</span>
                </div>
                <Progress value={hostStats.repeatGuests} className="h-2" />
              </div>
              <div className="pt-2 border-t dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Response Time</span>
                  <span className="text-sm font-bold text-gradient-cool">{hostStats.responseTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs Section */}
        <Tabs defaultValue="properties" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 lg:mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            <TabsTrigger value="properties" className="font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
              All Properties ({hostStats.totalProperties})
            </TabsTrigger>
            <TabsTrigger value="reviews" className="font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
              Reviews ({hostStats.totalReviews})
            </TabsTrigger>
            <TabsTrigger value="about" className="font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
              About Host
            </TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-charcoal dark:text-white mb-2 tracking-tight">
                  All Properties by {hostInfo.hostName}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {hostProperties.length} properties available for booking
                </p>
              </div>
              <Badge variant="outline" className="text-gradient-cool border-2 font-semibold">
                <Users className="h-4 w-4 mr-1" />
                Active Host
              </Badge>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {hostProperties.map((property, index) => (
                <div 
                  key={property.id}
                  className="animate-fadeInUp"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <PropertyCard property={property} className="h-full" />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card className="dark:bg-gray-800">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-cool-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-gradient-cool" />
                </div>
                <h3 className="text-xl font-bold text-charcoal dark:text-white mb-2">Reviews Coming Soon</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Guest reviews and ratings will be displayed here once available.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Card className="dark:bg-gray-800">
              <CardContent className="p-6 lg:p-8">
                <h3 className="text-xl font-bold text-charcoal dark:text-white mb-4">About {hostInfo.hostName}</h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Welcome! I'm {hostInfo.hostName}, a dedicated property host with over {hostStats.yearsHosting} years of experience 
                    in providing comfortable and safe accommodations in Bangalore. I take pride in maintaining high-quality 
                    properties and ensuring all my guests have a pleasant stay.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    My properties are carefully selected and maintained to provide the best living experience for students 
                    and working professionals. I believe in creating a home-like environment where guests can focus on 
                    their goals while enjoying comfortable amenities.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-gradient-cool-light dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-semibold text-gradient-cool dark:text-white mb-2">Languages</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">English, Hindi, Kannada</p>
                    </div>
                    <div className="bg-gradient-cool-light dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-semibold text-gradient-cool dark:text-white mb-2">Response Time</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Usually within {hostStats.responseTime}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HostProperties;