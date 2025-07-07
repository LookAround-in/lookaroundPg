
import React from 'react';
import { Shield, Eye, Phone, AlertTriangle, Users, CheckCircle, Lock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SafetyInformation = () => {
  const safetyFeatures = [
    {
      icon: Shield,
      title: 'Verified Properties',
      description: 'All properties undergo thorough verification including document checks and on-site inspections.'
    },
    {
      icon: Eye,
      title: 'Background Checks',
      description: 'Property owners and managers are verified through comprehensive background screening.'
    },
    {
      icon: Phone,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for any safety concerns or emergencies.'
    },
    {
      icon: Users,
      title: 'Community Reviews',
      description: 'Authentic reviews from verified tenants help you make informed decisions.'
    }
  ];

  const safetyTips = [
    {
      category: 'Before Moving In',
      tips: [
        'Always visit the property in person before making any payments',
        'Verify the property owner\'s identity and legal documents',
        'Check for proper safety equipment like fire extinguishers and smoke detectors',
        'Ensure the property has adequate lighting and secure entry points',
        'Meet other tenants or neighbors to get their perspective'
      ]
    },
    {
      category: 'During Your Stay',
      tips: [
        'Keep your personal belongings secure and don\'t leave valuables unattended',
        'Be aware of your surroundings, especially when returning late at night',
        'Maintain good relationships with fellow tenants and property management',
        'Report any suspicious activities or safety concerns immediately',
        'Keep emergency contact numbers easily accessible'
      ]
    },
    {
      category: 'Personal Safety',
      tips: [
        'Share your accommodation details with family or trusted friends',
        'Trust your instincts - if something feels wrong, don\'t ignore it',
        'Keep your phone charged and carry a backup power bank',
        'Learn the local emergency numbers and nearby hospital locations',
        'Avoid sharing personal financial information with strangers'
      ]
    }
  ];

  const emergencyContacts = [
    { service: 'Police', number: '100', available: '24/7' },
    { service: 'Fire Department', number: '101', available: '24/7' },
    { service: 'Ambulance', number: '102', available: '24/7' },
    { service: 'Women Helpline', number: '181', available: '24/7' },
    { service: 'FindMyPG Safety', number: '+91 98765 43210', available: '24/7' }
  ];

  const reportingSteps = [
    {
      step: 1,
      title: 'Document the Issue',
      description: 'Take photos or notes about the safety concern or incident'
    },
    {
      step: 2,
      title: 'Contact Support',
      description: 'Reach out to our safety team immediately via phone or chat'
    },
    {
      step: 3,
      title: 'Follow Up',
      description: 'We will investigate and provide updates on the resolution'
    },
    {
      step: 4,
      title: 'Prevention',
      description: 'We implement measures to prevent similar issues in the future'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Shield className="h-16 w-16 text-white mx-auto mb-6 animate-fadeInUp" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp">
            Your Safety is Our Priority
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            Comprehensive safety measures and guidelines for a secure PG living experience
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Safety Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal dark:text-white mb-4">
              Our Safety Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Multiple layers of security and verification to ensure your peace of mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, index) => (
              <Card key={index} className="text-center h-full dark:bg-gray-800 dark:border-gray-700 animate-fadeInUp" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal dark:text-white mb-4">
              Safety Guidelines
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Essential tips to ensure your safety throughout your PG journey
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {safetyTips.map((section, index) => (
              <Card key={index} className="h-full dark:bg-gray-800 dark:border-gray-700 animate-fadeInUp" style={{animationDelay: `${index * 0.2}s`}}>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-charcoal dark:text-white flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-charcoal dark:text-white mb-6">
              Emergency Contacts
            </h2>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 animate-fadeInUp"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-red-500 mr-3" />
                    <div>
                      <div className="font-semibold text-charcoal dark:text-white">
                        {contact.service}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Available {contact.available}
                      </div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-red-500">
                    {contact.number}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-charcoal dark:text-white mb-6">
              How to Report Safety Issues
            </h2>
            <div className="space-y-4">
              {reportingSteps.map((item, index) => (
                <div key={index} className="flex items-start animate-fadeInUp" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Safety Resources */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-4">
            Need Immediate Help?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            If you're facing an emergency or immediate safety concern, don't hesitate to contact us or local authorities.
            Your safety is our top priority.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              <Phone className="h-4 w-4 mr-2" />
              Call Safety Hotline
            </Button>
            <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Report an Issue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyInformation;
