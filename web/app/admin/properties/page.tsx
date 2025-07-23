'use client'
import React, { useState } from 'react';
import { PropertyCard } from 'components/properties/PropertyCard';
import { Button } from 'components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { Badge } from 'components/ui/badge';
import { Input } from 'components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/select';
import { ArrowLeft, Plus, Search, Filter, Home, Eye, Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const HostAllProperties = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // In a real app, these would be filtered by the logged-in host
  const hostProperties = [];

  const filteredProperties = hostProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ||
      (filterStatus === 'active' && property.availabilityStatus) ||
      (filterStatus === 'inactive' && !property.availabilityStatus);
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: hostProperties.length,
    active: hostProperties.filter(p => p.availabilityStatus).length,
    inactive: hostProperties.filter(p => !p.availabilityStatus).length,
    totalViews: hostProperties.reduce((sum, p) => sum + (p.views || 0), 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Header */}
        <Button
              variant="outline"
              onClick={() => router.push('/explore')}
              className="font-medium max-w-sm sm:w-auto mb-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
        </Button>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full">
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900">All Properties</h1>
              <p className="text-gray-600">Manage your property listings</p>
            </div>
          </div>
          <Link href={"/admin/addproperty"} className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-gradient-cool text-white hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Add New Property
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Properties</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Home className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Listings</p>
                  <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Inactive</p>
                  <p className="text-2xl font-bold text-gray-500">{stats.inactive}</p>
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.totalViews}</p>
                </div>
                <Eye className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="inactive">Inactive Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProperties.map((property, index) => (
            <div key={property.id} className="relative group">
              <PropertyCard property={property} />

              {/* Management Overlay */}
              <div className="absolute top-3 right-12 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" className="h-8 w-8 p-0">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Status Badge */}
              <div className="absolute top-2.5 left-24">
                <Badge variant={property.availabilityStatus ? "default" : "secondary"}>
                  {property.availabilityStatus ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== 'all'
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by adding your first property listing."}
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <Button className="bg-gradient-to-r from-[#BF67D6] to-[#DF2C2C] text-white hover:opacity-90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Property
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HostAllProperties;
