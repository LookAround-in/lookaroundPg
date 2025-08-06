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

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Application submitted!",
      description: "We'll get back to you within 24 hours to discuss partnership opportunities.",
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      propertyType: '',
      location: '',
      message: ''
    });
    setIsSubmitting(false);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="propertyType">Property Type</Label>
        <Input
          id="propertyType"
          placeholder="e.g., Men's PG, Women's PG, Co-living"
          value={formData.propertyType}
          onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
        />
      </div>
      
      <div>
        <Label htmlFor="location">Property Location *</Label>
        <Input
          id="location"
          placeholder="e.g., Koramangala, Bangalore"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="message">Additional Information</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your property, number of rooms, amenities, etc."
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
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