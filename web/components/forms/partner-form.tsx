'use client'
import React, { useState } from 'react'
import { useToast } from 'components/ui/use-toast'
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { Textarea } from 'components/ui/textarea';
import { Button } from 'components/ui/button';

function PartnerForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    location: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/v1/partner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Application submitted!",
          description: result.message,
        });

        // Reset form on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          propertyType: '',
          location: '',
          message: ''
        });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Partnership application error:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter your full name"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="Enter 10-digit phone number"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="propertyType">Property Type</Label>
        <Input
          id="propertyType"
          placeholder="e.g., Men's PG, Women's PG, Co-living"
          value={formData.propertyType}
          onChange={(e) => handleChange('propertyType', e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="location">Property Location *</Label>
        <Input
          id="location"
          placeholder="e.g., Koramangala, Bangalore"
          value={formData.location}
          onChange={(e) => handleChange('location', e.target.value)}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="message">Additional Information</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your property, number of rooms, amenities, etc."
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          rows={4}
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-cool text-white hover:opacity-90" 
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Start Partnership'}
      </Button>
    </form>
  )
}

export default PartnerForm