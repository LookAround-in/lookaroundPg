import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <Image
                  src="/logo.png"
                  width={32}
                  height={32}
                  alt="LookaroundPG"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold md:text-xl text-gradient-cool">LookaroundPG</span>
            </div>
            <p className="text-gray-50">
              Your trusted platform for finding safe, comfortable, and affordable PG accommodations.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg text-gray-50 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/explore" className="text-gray-50 hover:text-primary transition-colors">
                  Find PG
                </Link>
              </li>
              <li>
                <Link href="/partner" className="text-gray-50 hover:text-primary transition-colors">
                  List Property
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-50 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-50 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-50 hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg text-gray-50 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-50 hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-50 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-50 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-gray-50 hover:text-primary transition-colors">
                  Safety Information
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg text-gray-50 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-gray-50 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-50 hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/cookie" className="text-gray-50 hover:text-primary transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Host */}
          <div>
            <h3 className="font-semibold text-lg text-gray-50 mb-4">Host</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/host/login" className="text-gray-50 hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/host/dashboard" className="text-gray-50 hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-50">
            © 2025 LookaroundPG. Made with <Heart className="inline w-4 h-4 text-red-500 mx-1" /> for better living.
          </p>
        </div>
      </div>
    </footer>
  );
};
