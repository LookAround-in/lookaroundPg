'use client'
import React, { useState } from 'react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Textarea } from 'components/ui/textarea';
import { Label } from 'components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/select';
import { Send } from 'lucide-react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: ''
      });
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const response = await fetch('/api/v1/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.success) {
          alert('Message sent successfully! We\'ll get back to you soon.');
          // Reset form
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            category: '',
            message: ''
          });
        } else {
          alert(`Error: ${result.message}`);
        }
      } catch (error) {
        alert('Failed to send message. Please try again.');
        console.error('Contact form error:', error);
      } finally {
        setIsSubmitting(false);
      }
    };
    const handleChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };
  return (
    <>
    <div className="gradient-border p-8 rounded-2xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-charcoal mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="flex-1 px-4 py-2 rounded-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-2 rounded-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    className="flex-1 px-4 py-2 rounded-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-sm font-medium text-gray-700 mb-2 block">
                    Category
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                    <SelectTrigger className="flex-1 px-4 py-2 rounded-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general" >General Inquiry</SelectItem>
                      <SelectItem value="support" >Technical Support</SelectItem>
                      <SelectItem value="partnership" >Partnership</SelectItem>
                      <SelectItem value="feedback" >Feedback</SelectItem>
                      <SelectItem value="complaint" >Complaint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="subject" className="text-sm font-medium text-gray-700 mb-2 block">
                  Subject *
                </Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  placeholder="Enter the subject of your message"
                  required
                  className="flex-1 px-4 py-2 rounded-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2 block">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Enter your message here..."
                  rows={6}
                  required
                  className="flex-1 px-4 py-2 rounded-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-cool text-white hover:opacity-90 h-12 text-lg font-semibold disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="h-5 w-5 ml-2" />
              </Button>
            </form>
          </div>
    </>
  )
}

