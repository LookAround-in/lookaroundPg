import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, Users, Star, TrendingUp, CheckCircle, Calendar, Camera, Eye, Crown, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Partner = () => {
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

  const benefits = [
    {
      icon: Users,
      title: 'Wide Reach',
      description: 'Access to thousands of potential tenants across India'
    },
    {
      icon: Star,
      title: 'Verified Listings',
      description: 'Get your property verified and build trust with tenants'
    },
    {
      icon: TrendingUp,
      title: 'Higher Occupancy',
      description: 'Increase your property occupancy rates significantly'
    },
    {
      icon: CheckCircle,
      title: 'Easy Management',
      description: 'Simple tools to manage inquiries and bookings'
    }
  ];

  const features = [
    'Free property listing',
    'Professional photography support',
    'Dedicated account manager',
    'Real-time inquiry notifications',
    'Analytics and insights dashboard',
    'Marketing support and promotion'
  ];

  const roadmapSteps = [
    {
      step: 1,
      title: 'Submit Application',
      description: 'Fill out the partnership form with your property details',
      duration: '5 minutes'
    },
    {
      step: 2,
      title: 'Verification Process',
      description: 'Our team verifies your property and documentation',
      duration: '24-48 hours'
    },
    {
      step: 3,
      title: 'Property Photography',
      description: 'Professional photos and virtual tour creation',
      duration: '2-3 days'
    },
    {
      step: 4,
      title: 'Listing Creation',
      description: 'Your property goes live on our platform',
      duration: '1 day'
    },
    {
      step: 5,
      title: 'Start Receiving Inquiries',
      description: 'Connect with potential tenants and grow your business',
      duration: 'Immediate'
    }
  ];

  const tourPlans = [
    {
      name: 'Standard Virtual Tour',
      price: 'Free',
      features: [
        '360° room photography',
        'Basic virtual walkthrough',
        'Mobile-friendly viewing',
        'Social media sharing',
        'Standard image quality'
      ],
      recommended: false
    },
    {
      name: 'Premium Virtual Tour',
      price: '₹2,999',
      features: [
        'Professional 4K 360° photography',
        'Interactive virtual walkthrough',
        'Floor plan integration',
        'Custom branding',
        'Advanced analytics',
        'Priority listing placement',
        'Marketing material creation'
      ],
      recommended: true
    }
  ];

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
    <div className="min-h-screen bg-light-gray dark:bg-gray-900">
      {/* Enhanced Hero Section */}
      <section className="bg-gradient-cool relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fadeInUp">
            Partner with FindMyPG
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            Transform your property into a thriving business. Join thousands of successful hosts and maximize your rental income with our premium platform.
          </p>
          
          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-scaleIn" style={{animationDelay: '0.4s'}}>
            <div className="glass-effect rounded-xl p-6">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-white/80 text-sm">Active Users</div>
            </div>
            <div className="glass-effect rounded-xl p-6">
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-white/80 text-sm">Occupancy Rate</div>
            </div>
            <div className="glass-effect rounded-xl p-6">
              <div className="text-3xl font-bold text-white mb-2">₹25K</div>
              <div className="text-white/80 text-sm">Avg. Monthly Revenue</div>
            </div>
            <div className="glass-effect rounded-xl p-6">
              <div className="text-3xl font-bold text-white mb-2">2hrs</div>
              <div className="text-white/80 text-sm">Response Time</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Partnership Roadmap */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-charcoal dark:text-white mb-4">
              Your Journey to Success
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From application to earning, we'll guide you every step of the way
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {roadmapSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <Card className="h-full gradient-border dark:bg-gray-800">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-cool rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-lg mb-2 dark:text-white">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{step.description}</p>
                    <Badge variant="outline" className="text-xs bg-gradient-cool-light">
                      {step.duration}
                    </Badge>
                  </CardContent>
                </Card>
                {index < roadmapSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-cool"></div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Virtual Tour Plans */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-charcoal dark:text-white mb-4">
              Virtual Tour Options
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Showcase your property with stunning virtual tours
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tourPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.recommended ? 'gradient-border' : ''} dark:bg-gray-800`}>
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-cool text-white px-4 py-1">
                      <Crown className="h-3 w-3 mr-1" />
                      Recommended
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl dark:text-white">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-gradient-cool">{plan.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                        <span className="dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.recommended ? 'bg-gradient-cool text-white hover:opacity-90' : ''}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    Choose {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Enhanced Benefits Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-charcoal dark:text-white mb-6">
                Why Choose FindMyPG?
              </h2>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-cool-light dark:bg-gray-800">
                    <div className="w-12 h-12 bg-gradient-cool rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal dark:text-white mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Home className="h-5 w-5" />
                  <span>What You Get</span>
                </CardTitle>
                <CardDescription>
                  Everything you need to succeed as a partner
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Testimonial */}
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-700 italic mb-2">
                      "Since partnering with FindMyPG, our occupancy rate increased from 70% to 95%. 
                      The platform brings quality tenants and the support team is excellent."
                    </p>
                    <div className="text-sm">
                      <span className="font-semibold">Rajesh Kumar</span>
                      <span className="text-gray-600"> - Property Owner, Bangalore</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Application Form */}
          <div>
            <Card className="sticky top-8 gradient-border dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-gradient-cool">Start Your Partnership Journey</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Join thousands of successful property owners earning with FindMyPG
                </CardDescription>
              </CardHeader>
              <CardContent>
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

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Questions? We're here to help!
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-white">
                      <Camera className="h-4 w-4 mr-2" />
                      Schedule Demo
                    </Button>
                    <a href="tel:+919876543210">
                      <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-white">
                        Call Us
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;
