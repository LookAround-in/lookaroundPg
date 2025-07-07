import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Briefcase, Heart, Star, ArrowRight } from 'lucide-react';

const Careers = () => {
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Software Engineer",
      department: "Engineering", 
      location: "Bangalore, India",
      type: "Full-time",
      experience: "3-5 years",
      description: "Join our engineering team to build scalable solutions for the PG accommodation platform.",
      skills: ["React", "Node.js", "MongoDB", "AWS"]
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Mumbai, India", 
      type: "Full-time",
      experience: "4-6 years",
      description: "Drive product strategy and execution for our user-facing features and experiences.",
      skills: ["Product Strategy", "Analytics", "User Research", "Agile"]
    },
    {
      id: 3,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Delhi, India",
      type: "Full-time", 
      experience: "2-4 years",
      description: "Ensure our users have an exceptional experience throughout their journey with us.",
      skills: ["Communication", "CRM", "Data Analysis", "Problem Solving"]
    },
    {
      id: 4,
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      experience: "3-5 years",
      description: "Create beautiful and intuitive user experiences for our platform.",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"]
    },
    {
      id: 5,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Pune, India",
      type: "Full-time",
      experience: "2-3 years",
      description: "Drive growth through digital marketing campaigns and brand initiatives.",
      skills: ["Digital Marketing", "SEO", "Content Marketing", "Analytics"]
    },
    {
      id: 6,
      title: "Data Analyst",
      department: "Analytics",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "1-3 years",
      description: "Analyze user behavior and business metrics to drive data-driven decisions.",
      skills: ["SQL", "Python", "Tableau", "Statistics"]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs"
    },
    {
      icon: Users,
      title: "Great Team",
      description: "Work with passionate and talented individuals"
    },
    {
      icon: Star,
      title: "Growth Opportunities",
      description: "Continuous learning and career development"
    },
    {
      icon: Briefcase,
      title: "Work-Life Balance",
      description: "Flexible working hours and remote work options"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-gradient-cool relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp">
            Join Our Team
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            Help us revolutionize the PG accommodation experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scaleIn" style={{animationDelay: '0.4s'}}>
            <Button size="lg" className="bg-white text-gray-800 hover:bg-gray-100">
              View Open Positions
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-800">
              Learn About Our Culture
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Company Culture Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal dark:text-white mb-4">
              Why Work With Us?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're building the future of PG accommodations, and we want passionate individuals to join us on this journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 animate-fadeInUp"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="w-16 h-16 bg-gradient-cool-light dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-charcoal dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Job Openings Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal dark:text-white mb-4">
              Open Positions
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Find your next career opportunity with us
            </p>
          </div>

          <div className="grid gap-6">
            {jobOpenings.map((job, index) => (
              <div
                key={job.id}
                className="gradient-border p-6 rounded-xl hover:shadow-lg transition-all duration-300 animate-fadeInUp dark:bg-gray-800"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <h3 className="text-xl font-semibold text-charcoal dark:text-white">
                        {job.title}
                      </h3>
                      <Badge className="bg-gradient-cool text-white">
                        {job.department}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.experience}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <Button className="bg-gradient-cool text-white hover:opacity-90 w-full lg:w-auto">
                      Apply Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-cool-light dark:bg-gray-800 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-4">
            Don't See a Perfect Match?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. Send us your resume and tell us how you'd like to contribute to our mission.
          </p>
          <Button className="bg-gradient-cool text-white hover:opacity-90">
            Send Your Resume
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Careers;
