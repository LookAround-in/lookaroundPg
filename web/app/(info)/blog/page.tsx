'use client'
import React from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Things to Consider When Choosing a PG",
      excerpt: "Finding the perfect paying guest accommodation can be challenging. Here are the essential factors you should consider before making your decision.",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      image: "/placeholder.svg",
      category: "Guide",
      featured: true
    },
    {
      id: 2,
      title: "Safety Tips for PG Living",
      excerpt: "Your safety is our priority. Learn about the essential safety measures and tips for a secure PG living experience.",
      author: "Mike Chen",
      date: "2024-01-12",
      readTime: "3 min read",
      image: "/placeholder.svg",
      category: "Safety"
    },
    {
      id: 3,
      title: "How to Make Friends in Your New PG",
      excerpt: "Moving to a new place can be lonely. Discover effective ways to build meaningful connections with your PG mates.",
      author: "Priya Sharma",
      date: "2024-01-10",
      readTime: "4 min read",
      image: "/placeholder.svg",
      category: "Lifestyle"
    },
    {
      id: 4,
      title: "Budget-Friendly PG Living Tips",
      excerpt: "Learn how to make the most of your PG experience without breaking the bank. Smart tips for budget-conscious students and professionals.",
      author: "David Kumar",
      date: "2024-01-08",
      readTime: "6 min read",
      image: "/placeholder.svg",
      category: "Finance"
    },
    {
      id: 5,
      title: "Virtual Tours: The Future of PG Hunting",
      excerpt: "Explore how virtual tours are revolutionizing the way people find and choose their ideal PG accommodations.",
      author: "Emily Zhang",
      date: "2024-01-05",
      readTime: "4 min read",
      image: "/placeholder.svg",
      category: "Technology"
    },
    {
      id: 6,
      title: "Understanding PG Agreements and Contracts",
      excerpt: "A comprehensive guide to understanding your PG agreement, what to look for, and how to protect your interests.",
      author: "Legal Team",
      date: "2024-01-03",
      readTime: "7 min read",
      image: "/placeholder.svg",
      category: "Legal"
    }
  ];

  const categories = ["All", "Guide", "Safety", "Lifestyle", "Finance", "Technology", "Legal"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-gradient-cool relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp">
            PG Living Blog
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            Tips, guides, and insights for the perfect PG experience
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="px-4 py-2 cursor-pointer hover:bg-gradient-cool hover:text-white transition-all duration-200"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Post */}
        {blogPosts.find(post => post.featured) && (
          <div className="mb-12">
            <div className="gradient-border p-8 rounded-2xl">
              <Badge className="bg-gradient-cool text-white mb-4">Featured</Badge>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-charcoal mb-4">
                    {blogPosts.find(post => post.featured)?.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {blogPosts.find(post => post.featured)?.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <User className="h-4 w-4 mr-2" />
                    <span className="mr-4">{blogPosts.find(post => post.featured)?.author}</span>
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="mr-4">{blogPosts.find(post => post.featured)?.date}</span>
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{blogPosts.find(post => post.featured)?.readTime}</span>
                  </div>
                  <Button className="bg-gradient-cool text-white hover:opacity-90">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
                <div>
                  <img
                    src={blogPosts.find(post => post.featured)?.image}
                    alt="Featured post"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.filter(post => !post.featured).map((post, index) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 animate-fadeInUp"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <Badge variant="outline" className="mb-3">
                  {post.category}
                </Badge>
                <h3 className="text-xl font-semibold text-charcoal mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <User className="h-4 w-4 mr-2" />
                  <span className="mr-4">{post.author}</span>
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{post.readTime}</span>
                </div>
                <Link href={`/blog/${post.id}`} className="text-gradient-cool hover:text-primary font-medium flex items-center">
                  Read More
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-cool-light rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-charcoal mb-4">
            Stay Updated
          </h3>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter for the latest tips and insights about PG living.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="bg-gradient-cool text-white hover:opacity-90">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
