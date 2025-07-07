import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Tech Park", "Koramangala, Bangalore", "Karnataka 560034, India"],
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 98765 43210", "+91 87654 32109", "Mon-Fri 9AM-6PM IST"],
      color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["support@findmypg.com", "hello@findmypg.com", "We'll respond within 24 hours"],
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM", "Sunday: Closed"],
      color: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-gradient-cool relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp">
            Get in Touch
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center hover:shadow-lg transition-all duration-300 animate-fadeInUp"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className={`w-12 h-12 rounded-lg ${info.color} flex items-center justify-center mx-auto mb-4`}>
                <info.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-charcoal dark:text-white mb-3">
                {info.title}
              </h3>
              <div className="space-y-1">
                {info.details.map((detail, detailIndex) => (
                  <p key={detailIndex} className="text-gray-600 dark:text-gray-300 text-sm">
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="gradient-border p-8 rounded-2xl dark:bg-gray-800">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-charcoal dark:text-white mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:border-purple-400"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    className="border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:border-purple-400"
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Category
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                    <SelectTrigger className="border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-purple-400">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                      <SelectItem value="general" className="dark:text-white dark:hover:bg-gray-600">General Inquiry</SelectItem>
                      <SelectItem value="support" className="dark:text-white dark:hover:bg-gray-600">Technical Support</SelectItem>
                      <SelectItem value="partnership" className="dark:text-white dark:hover:bg-gray-600">Partnership</SelectItem>
                      <SelectItem value="feedback" className="dark:text-white dark:hover:bg-gray-600">Feedback</SelectItem>
                      <SelectItem value="complaint" className="dark:text-white dark:hover:bg-gray-600">Complaint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Subject *
                </Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  placeholder="Enter the subject of your message"
                  required
                  className="border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:border-purple-400"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Enter your message here..."
                  rows={6}
                  required
                  className="border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:border-purple-400"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-cool text-white hover:opacity-90 h-12 text-lg font-semibold"
              >
                Send Message
                <Send className="h-5 w-5 ml-2" />
              </Button>
            </form>
          </div>

          {/* Additional Information */}
          <div className="space-y-8">
            {/* FAQ Quick Links */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-charcoal dark:text-white mb-4">
                Quick Help
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Looking for quick answers? Check out our FAQ section for common questions.
              </p>
              <Button variant="outline" className="w-full dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                Visit FAQ
              </Button>
            </div>

            {/* Live Chat */}
            <div className="bg-gradient-cool-light dark:bg-gray-700 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <MessageCircle className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
                <h3 className="text-xl font-semibold text-charcoal dark:text-white">
                  Live Chat Available
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Need immediate assistance? Our live chat support is available during business hours.
              </p>
              <Button className="bg-gradient-cool text-white hover:opacity-90 w-full">
                Start Live Chat
              </Button>
            </div>

            {/* Office Map */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-charcoal dark:text-white mb-4">
                Find Our Office
              </h3>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Interactive Map Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
