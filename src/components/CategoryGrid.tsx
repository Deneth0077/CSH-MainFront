import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Key, AppWindow as Window, Gamepad2, Settings } from 'lucide-react';

const CategoryGrid: React.FC = () => {
  const categories = [
    {
      name: 'Software & Apps',
      icon: Monitor,
      description: 'Professional software and applications',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      name: 'MS Office Keys',
      icon: Key,
      description: 'Microsoft Office licenses and keys',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      name: 'Windows Keys',
      icon: Window,
      description: 'Windows operating system licenses',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    },
    {
      name: 'PC Games',
      icon: Gamepad2,
      description: 'Latest PC games and gaming software',
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600'
    },
    {
      name: 'Cracked',
      icon: Settings,
      description: 'Utilities and system tools',
      color: 'bg-gray-500',
      hoverColor: 'hover:bg-gray-600'
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our wide range of software categories to find exactly what you need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.name}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className={`${category.color} ${category.hoverColor} text-white rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                <div className="flex justify-center mb-4">
                  <IconComponent className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                <p className="text-sm opacity-90">{category.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;