'use client'
import React, { useState } from 'react';
import { Input } from 'components/ui/input';
import { Badge } from 'components/ui/badge';
import { Search, ChevronDown, ChevronRight, HelpCircle, Link } from 'lucide-react';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Getting Started', 'Property Search', 'Booking', 'Payments', 'Safety', 'Account', 'Technical'];

  const faqs = [
    {
      id: 1,
      category: 'Getting Started',
      question: "How do I create an account on LookAroundPG?",
      answer: "To create an account, click on the 'Sign Up' button in the top right corner of our website. You'll need to provide your email address, create a password, and verify your email. Once verified, you can start browsing and saving properties to your wishlist."
    },
    {
      id: 2,
      category: 'Getting Started',
      question: "Is it free to use LookAroundPG?",
      answer: "Yes, creating an account and browsing properties on LookAroundPG is completely free. We don't charge users any fees for searching or contacting property owners. Our revenue comes from partnerships with verified property owners."
    },
    {
      id: 3,
      category: 'Property Search',
      question: "How do I search for PG accommodations?",
      answer: "You can search for PG accommodations through our Explore page, which offers advanced filters to narrow down results by price, gender preference, amenities, and more. You can also use the search bar on the homepage to enter your preferred location. For the best experience, we recommend using the Explore page."
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
      answer: "Only premium properties on our platform undergo a thorough verification process. This includes document checks, on-site visits, photo verification, and quality assessments to ensure all listed amenities are accurate and trustworthy."
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
      answer: "When visiting a property, we recommend carrying a valid ID and reaching out to the host beforehand for visit details — as visits depend on their availability. If possible, take a friend along and observe the neighborhood’s safety, cleanliness, and transport access."
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
      answer: "Only premium properties undergo verification, including checks on ownership documents and security features. We highlight listings with added safety measures like CCTV, secure access, and security guards. Users are encouraged to contact hosts for specific safety info and report any concerns."
    },
    {
      id: 12,
      category: 'Safety',
      question: "What should I do if I feel unsafe?",
      answer: (
        <>
          Your safety is our priority. If you're in immediate danger, contact local authorities right away. <br/> <br/> For non-emergency concerns, reach out to our support. Email us at <a href="mailto:info.lookaroundpg@gmail.com" className="text-primary underline">info.lookaroundpg@gmail.com</a>. <br/> <br/> For detailed safety guidelines, visit our <Link href="/safety" className="text-primary underline">Safety Information page</Link>.
        </>
      )
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
      answer: (<>You can report technical issues by contacting our support team at <Link href="mailto:info.lookaroundpg@gmail.com" className="text-primary underline">info.lookaroundpg@gmail.com</Link> or using the <Link href="/contact" className="text-primary underline">Contact Us</Link> form. <br/> <br/> Please include details about the issue, your device/browser information, and steps to reproduce the problem.</>)
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-gradient-cool relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            Find quick answers to common questions about LookAroundPG
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto glass-effect rounded-2xl p-6 animate-scaleIn" style={{animationDelay: '0.4s'}}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-white/90 border-0 text-gray-800 placeholder-gray-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-charcoal mb-4 text-center">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`px-4 py-2 cursor-pointer hover:bg-gradient-cool hover:text-white transition-all duration-200 ${
                  selectedCategory === category ? 'bg-gradient-cool text-white' : ''
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
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 animate-fadeInUp"
                style={{animationDelay: `${index * 0.05}s`}}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors rounded-xl"
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center mb-2">
                      <Badge variant="outline" className="mr-3 text-xs ">
                        {faq.category}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-medium text-charcoal">
                      {faq.question}
                    </h3>
                  </div>
                  {expandedFaq === faq.id ? (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-gray-100 ">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">
                No FAQs found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search terms or category filter
              </p>
            </div>
          )}
        </div>

        {/* Still Need Help */}
        <div className="mt-16 bg-gradient-cool-light rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-charcoal mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-gradient-cool text-white rounded-lg hover:opacity-90 transition-opacity">
              Contact Support
            </button>
            <button className="px-6 py-3 border border-gray-300  text-gray-700 rounded-lg hover:border-gray-400 transition-colors">
              Submit a Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
