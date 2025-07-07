import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronDown, ChevronRight, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Getting Started', 'Property Search', 'Booking', 'Payments', 'Safety', 'Account', 'Technical'];

  const faqs = [
    {
      id: 1,
      category: 'Getting Started',
      question: "How do I create an account on FindMyPG?",
      answer: "To create an account, click on the 'Sign Up' button in the top right corner of our website. You'll need to provide your email address, create a password, and verify your email. Once verified, you can start browsing and saving properties to your wishlist."
    },
    {
      id: 2,
      category: 'Getting Started',
      question: "Is it free to use FindMyPG?",
      answer: "Yes, creating an account and browsing properties on FindMyPG is completely free. We don't charge users any fees for searching or contacting property owners. Our revenue comes from partnerships with verified property owners."
    },
    {
      id: 3,
      category: 'Property Search',
      question: "How do I search for PG accommodations?",
      answer: "You can search for PG accommodations using our search bar on the homepage. Enter your preferred location, and use our filters to narrow down results based on price range, gender preference, amenities, and more. You can also sort results by price, rating, or newest listings."
    },
    {
      id: 4,
      category: 'Property Search',
      question: "What does 'Virtual Tour Available' mean?",
      answer: "Properties with virtual tours offer 360-degree video tours or interactive walkthroughs that let you explore the property remotely. This feature helps you get a better sense of the space before scheduling an in-person visit."
    },
    {
      id: 5,
      category: 'Property Search',
      question: "How are properties verified?",
      answer: "All properties on our platform undergo a verification process that includes document verification, photo verification, and quality assessments. We check property ownership documents, visit the property, and ensure all amenities mentioned are available."
    },
    {
      id: 6,
      category: 'Booking',
      question: "How do I contact a property owner?",
      answer: "To contact a property owner, you need to be logged into your account. Visit the property details page and click 'Reveal Host Info' to see the owner's contact information including phone number and email address."
    },
    {
      id: 7,
      category: 'Booking',
      question: "Can I visit the property before booking?",
      answer: "Absolutely! We highly recommend visiting any property in person before making a booking decision. Contact the property owner to schedule a visit. Most owners are happy to accommodate property viewings."
    },
    {
      id: 8,
      category: 'Booking',
      question: "What should I bring when visiting a property?",
      answer: "When visiting a property, bring a valid ID, a list of questions about the property and rules, and if possible, have a friend accompany you. Also, take note of the neighborhood safety and transportation options."
    },
    {
      id: 9,
      category: 'Payments',
      question: "How do I make payments?",
      answer: "Payment methods and terms vary by property owner. Most owners accept bank transfers, UPI payments, or cash. Payment terms (advance, security deposit, monthly rent) are typically discussed directly with the property owner."
    },
    {
      id: 10,
      category: 'Payments',
      question: "What about security deposits?",
      answer: "Security deposits are common and usually range from 1-3 months' rent. The amount and terms are set by individual property owners. Make sure to get a receipt for any deposits paid and understand the refund policy."
    },
    {
      id: 11,
      category: 'Safety',
      question: "How do you ensure the safety of listed properties?",
      answer: "We verify all properties and conduct background checks on property owners. We also encourage users to report any safety concerns. Properties with security features like CCTV, security guards, and secure access are highlighted in listings."
    },
    {
      id: 12,
      category: 'Safety',
      question: "What should I do if I feel unsafe?",
      answer: "Your safety is our priority. If you feel unsafe, immediately contact local authorities if there's immediate danger. For non-emergency safety concerns, contact our 24/7 support team at +91 98765 43210 or email safety@findmypg.com."
    },
    {
      id: 13,
      category: 'Account',
      question: "How do I add properties to my wishlist?",
      answer: "To add properties to your wishlist, you need to be logged in. Click the heart icon on any property card or property details page. You can view all your saved properties in the 'Wishlist' section of your account."
    },
    {
      id: 14,
      category: 'Account',
      question: "How do I update my profile information?",
      answer: "Go to your profile page by clicking on your name in the top right corner after logging in. From there, you can update your personal information, change your password, and manage your account settings."
    },
    {
      id: 15,
      category: 'Account',
      question: "Can I delete my account?",
      answer: "Yes, you can delete your account by going to your profile settings and selecting 'Delete Account'. Please note that this action is irreversible and will remove all your saved properties and account data."
    },
    {
      id: 16,
      category: 'Technical',
      question: "The website is not loading properly. What should I do?",
      answer: "Try refreshing the page, clearing your browser cache, or using a different browser. If the problem persists, check your internet connection or contact our technical support team."
    },
    {
      id: 17,
      category: 'Technical',
      question: "Is there a mobile app available?",
      answer: "Currently, we offer a mobile-optimized website that works seamlessly on all devices. A dedicated mobile app is in development and will be available on both iOS and Android platforms soon."
    },
    {
      id: 18,
      category: 'Technical',
      question: "How do I report a bug or technical issue?",
      answer: "You can report technical issues by contacting our support team at support@findmypg.com or using the 'Contact Us' form. Please include details about the issue, your device/browser information, and steps to reproduce the problem."
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            Find quick answers to common questions about FindMyPG
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto glass-effect rounded-2xl p-6 animate-scaleIn" style={{animationDelay: '0.4s'}}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-white/90 dark:bg-gray-800/90 border-0 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-charcoal dark:text-white mb-4 text-center">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`px-4 py-2 cursor-pointer hover:bg-gradient-cool hover:text-white transition-all duration-200 ${
                  selectedCategory === category ? 'bg-gradient-cool text-white' : 'dark:border-gray-600 dark:text-gray-300 dark:hover:text-white'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div
                key={faq.id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 animate-fadeInUp"
                style={{animationDelay: `${index * 0.05}s`}}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-xl"
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center mb-2">
                      <Badge variant="outline" className="mr-3 text-xs dark:border-gray-600 dark:text-gray-300">
                        {faq.category}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-medium text-charcoal dark:text-white">
                      {faq.question}
                    </h3>
                  </div>
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
            ))
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-gray-300 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">
                No FAQs found
              </h3>
              <p className="text-gray-400 dark:text-gray-500">
                Try adjusting your search terms or category filter
              </p>
            </div>
          )}
        </div>

        {/* Still Need Help */}
        <div className="mt-16 bg-gradient-cool-light dark:bg-gray-800 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-gradient-cool text-white rounded-lg hover:opacity-90 transition-opacity">
              Contact Support
            </button>
            <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
              Submit a Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
