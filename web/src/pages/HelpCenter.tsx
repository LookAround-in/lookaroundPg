import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, HelpCircle, MessageCircle, Phone, Mail, ChevronDown, ChevronRight } from 'lucide-react';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const categories = [
    {
      title: "Getting Started",
      icon: HelpCircle,
      articles: 12,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
    },
    {
      title: "Property Search",
      icon: Search,
      articles: 8,
      color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
    },
    {
      title: "Booking & Payments",
      icon: MessageCircle,
      articles: 15,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
    },
    {
      title: "Safety & Security",
      icon: HelpCircle,
      articles: 6,
      color: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "How do I search for PG accommodations?",
      answer: "You can search for PG accommodations by entering your preferred location in the search bar on our homepage. You can also use filters to narrow down results based on price, amenities, gender preference, and more."
    },
    {
      id: 2,
      question: "Do I need to create an account to browse properties?",
      answer: "No, you can browse properties without creating an account. However, to view detailed property information, contact hosts, or save properties to your wishlist, you'll need to sign up for a free account."
    },
    {
      id: 3,
      question: "How do I contact a property owner?",
      answer: "Once you're logged in, you can view the property details page and click on 'Reveal Host Info' to see the owner's contact information including phone number and email address."
    },
    {
      id: 4,
      question: "Are all properties verified?",
      answer: "Yes, we verify all properties listed on our platform. Our verification process includes checking property documents, photos, and conducting quality assessments to ensure authenticity and safety."
    },
    {
      id: 5,
      question: "What if I have issues with a property?",
      answer: "If you encounter any issues with a property, please contact our support team immediately. We have a dedicated customer service team to help resolve any problems and ensure your safety and satisfaction."
    },
    {
      id: 6,
      question: "Can I cancel my booking?",
      answer: "Cancellation policies vary depending on the property and booking terms. Please check the specific cancellation policy mentioned in your booking confirmation or contact our support team for assistance."
    },
    {
      id: 7,
      question: "How do I report inappropriate content?",
      answer: "You can report inappropriate content by clicking the 'Report' button on any property listing or by contacting our support team directly. We take all reports seriously and investigate them promptly."
    },
    {
      id: 8,
      question: "Is there a mobile app available?",
      answer: "Currently, we offer a mobile-optimized website that works seamlessly on all devices. A dedicated mobile app is in development and will be available soon."
    }
  ];

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-gradient-cool relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp">
            How can we help you?
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            Find answers to your questions and get the support you need
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto glass-effect rounded-2xl p-6 animate-scaleIn" style={{animationDelay: '0.4s'}}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-white/90 dark:bg-gray-800/90 border-0 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-charcoal dark:text-white mb-8 text-center">
            Browse by Category
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer animate-fadeInUp"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-charcoal dark:text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {category.articles} articles
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-charcoal dark:text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm animate-fadeInUp"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-xl"
                >
                  <h3 className="text-lg font-medium text-charcoal dark:text-white pr-4">
                    {faq.question}
                  </h3>
                  {expandedFaq === faq.id ? (
                    <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-600">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-cool-light dark:bg-gray-800 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-charcoal dark:text-white mb-4">
              Still need help?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our support team is here to help you with any questions or concerns
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="text-lg font-semibold text-charcoal dark:text-white mb-2">
                Live Chat
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                Chat with our support team
              </p>
              <Button variant="outline" className="w-full dark:border-gray-500 dark:text-white dark:hover:bg-gray-600">
                Start Chat
              </Button>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <h3 className="text-lg font-semibold text-charcoal dark:text-white mb-2">
                Email Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                Get help via email
              </p>
              <Button variant="outline" className="w-full dark:border-gray-500 dark:text-white dark:hover:bg-gray-600">
                Send Email
              </Button>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-purple-600 dark:text-purple-300" />
              </div>
              <h3 className="text-lg font-semibold text-charcoal dark:text-white mb-2">
                Phone Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                Call us for immediate help
              </p>
              <Button variant="outline" className="w-full dark:border-gray-500 dark:text-white dark:hover:bg-gray-600">
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
