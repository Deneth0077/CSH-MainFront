import React from 'react';
import { Shield, Award, Users, Clock } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Trusted',
      description: 'All our software licenses are genuine and verified. We ensure 100% authenticity for every product.'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We offer only the highest quality software from trusted publishers and developers worldwide.'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Our dedicated support team is available 24/7 to help you with any questions or issues.'
    },
    {
      icon: Clock,
      title: 'Instant Delivery',
      description: 'Get your software keys and licenses delivered instantly to your email after purchase.'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Software industry veteran with 15+ years of experience in technology solutions.'
    },
    {
      name: 'Priya Sharma',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Expert in software development and digital product management.'
    },
    {
      name: 'Amit Patel',
      role: 'Head of Sales',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Passionate about connecting customers with the right software solutions.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About SoftwareHub
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Your trusted partner for premium software solutions. We've been helping 
              businesses and individuals get the software they need at affordable prices.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              To make premium software accessible to everyone by providing genuine licenses 
              at competitive prices with exceptional customer service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all duration-200">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our experienced team is dedicated to providing you with the best software solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center hover:shadow-md transition-all duration-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose SoftwareHub?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 flex-shrink-0">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    100% Genuine Products
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    All our software licenses are sourced directly from authorized distributors and publishers.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2 flex-shrink-0">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Competitive Pricing
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We offer the best prices in the market without compromising on quality or authenticity.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-2 flex-shrink-0">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Excellent Customer Service
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our support team is available round the clock to assist you with any queries or issues.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-200">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Happy Customers</p>
                
                <div className="text-4xl font-bold text-green-600 mb-2">5000+</div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Products Sold</p>
                
                <div className="text-4xl font-bold text-purple-600 mb-2">99.9%</div>
                <p className="text-gray-600 dark:text-gray-400">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;