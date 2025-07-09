
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Star, Heart, MapPin, Search } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Every property is verified for safety and authenticity to ensure peace of mind for our users.'
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'We build communities by connecting like-minded people in safe, comfortable living spaces.'
    },
    {
      icon: Star,
      title: 'Quality Assured',
      description: 'We maintain high standards for all listed properties through regular quality checks.'
    },
    {
      icon: Heart,
      title: 'User-Centric',
      description: 'Every feature we build is designed with our users\' needs and convenience in mind.'
    }
  ];

  const team = [
    {
      name: 'Priya Sharma',
      role: 'CEO & Co-founder',
      description: 'Former product manager with 8+ years in proptech and a passion for solving housing challenges.'
    },
    {
      name: 'Arjun Patel',
      role: 'CTO & Co-founder',
      description: 'Tech enthusiast with expertise in building scalable platforms and ensuring data security.'
    },
    {
      name: 'Meera Reddy',
      role: 'Head of Operations',
      description: 'Operations expert focused on creating seamless experiences for both tenants and property owners.'
    },
    {
      name: 'Rohit Kumar',
      role: 'Head of Growth',
      description: 'Growth strategist dedicated to expanding our reach and helping more people find their perfect PG.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Tenants' },
    { number: '500+', label: 'Listed Properties' },
    { number: '50+', label: 'Cities Covered' },
    { number: '95%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <section className="bg-gradient-cool relative overflow-hidden py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fadeInUp">
            About LookaroundPG
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            We're on a mission to make finding safe, comfortable, and affordable 
            PG accommodations as easy as a few clicks. Born from the frustration 
            of endless property searches, we created a platform that puts trust, 
            transparency, and user experience first.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-charcoal dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Founded in 2024, FindMyPG was born from a simple observation: 
                  finding quality PG accommodation shouldn't be a stressful, 
                  time-consuming process filled with uncertainty and safety concerns.
                </p>
                <p>
                  Our founders, having experienced the challenges of finding 
                  reliable accommodation firsthand, decided to create a platform 
                  that would revolutionize how people discover and secure PG homes.
                </p>
                <p>
                  Today, we're proud to serve thousands of tenants and property 
                  owners across India, creating a trusted ecosystem where safety, 
                  transparency, and convenience are guaranteed.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-6 dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="p-0">
                    <div className="text-3xl font-bold text-primary dark:text-primary mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-light-gray dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These core values guide everything we do and shape how we serve our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center h-full dark:bg-gray-900 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-cool rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate individuals working together to transform the PG accommodation experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-cool rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-charcoal dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary dark:text-primary text-sm font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-16 bg-light-gray dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal dark:text-white mb-4">
              What Makes Us Different
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We've built features that address real problems faced by PG seekers and property owners
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="dark:bg-gray-900 dark:border-gray-700">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Verified Properties</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Every listing undergoes thorough verification for authenticity and safety
                </p>
              </CardContent>
            </Card>
            
            <Card className="dark:bg-gray-900 dark:border-gray-700">
              <CardContent className="p-6 text-center">
                <Search className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Smart Search</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Advanced filters help you find exactly what you're looking for
                </p>
              </CardContent>
            </Card>
            
            <Card className="dark:bg-gray-900 dark:border-gray-700">
              <CardContent className="p-6 text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Local Expertise</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Deep knowledge of local areas and neighborhoods in every city
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-cool">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect PG?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of satisfied users who found their ideal accommodation through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/explore">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Searching
              </Button>
            </Link>
            <Link href="/partner">
              <Button size="lg" variant="secondary" className="text-lg px-8 hover:text-primary">
                List Your Property
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
