import { Button } from 'components/ui/button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '@/components/forms/contact-from';

const ContactUs = () => {

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["#77", "Marathalli, Bangalore", "Karnataka 560034, India"],
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 93906 31008", "+91 77026 67922", "Mon-Fri 9AM-6PM IST"],
      color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info.lookaroundpg@gmail.com", "We'll respond within 24 hours"],
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-gradient-cool relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp">
            Get in Touch
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
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
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center hover:shadow-lg transition-all duration-300 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-lg ${info.color} flex items-center justify-center mx-auto mb-4`}>
                <info.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-charcoal mb-3">
                {info.title}
              </h3>
              <div className="space-y-1">
                {info.details.map((detail, detailIndex) => (
                  <p key={detailIndex} className="text-gray-600 text-sm">
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ContactForm/>

          {/* Additional Information */}
          <div className="space-y-8">
            {/* FAQ Quick Links */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-charcoal mb-4">
                Quick Help
              </h3>
              <p className="text-gray-600 mb-4">
                Looking for quick answers? Check out our FAQ section for common questions.
              </p>
              <Button variant="outline" className="w-full">
                Visit FAQ
              </Button>
            </div>

            {/* Office Map */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-charcoal mb-4">
                Find Our Office
              </h3>
              <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.google.com/maps?q=${12.953530},${77.710129}&z=15&output=embed`}
                    className='rounded-lg'
                  ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;