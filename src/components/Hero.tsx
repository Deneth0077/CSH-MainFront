import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="flex overflow-hidden relative justify-center items-center h-screen">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          className="object-cover w-full h-full"
          poster="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1200"
        >
          <source
            src="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 text-center text-white sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
          Welcome to <span className="block text-blue-400">Ceylon Software Hub</span>
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed md:text-2xl">
          Discover genuine software licenses, Windows keys, MS Office, and PC games 
          with instant delivery and lifetime support.
        </p>
        <div className="flex flex-col gap-4 justify-center items-center sm:flex-row">
          <Link
            to="/products"
            className="flex items-center px-8 py-4 space-x-2 text-lg font-semibold text-white bg-blue-600 rounded-lg transition-all duration-300 transform hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 hover:scale-105"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Shop Now</span>
          </Link>
          <Link
            to="/about"
            className="flex items-center px-8 py-4 space-x-2 text-lg font-semibold text-white bg-transparent rounded-lg border-2 border-white transition-all duration-300 transform hover:bg-white hover:text-gray-900 dark:hover:text-gray-800 hover:scale-105"
          >
            <Play className="w-5 h-5" />
            <span>Learn More</span>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="flex justify-center w-6 h-10 rounded-full border-2 border-white">
            <div className="mt-2 w-1 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;