import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Check, Monitor, ArrowLeft } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Product, productService } from '../services/productService';
import { useCart } from '../contexts/CartContext';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const productData = await productService.getProductById(id);
        setProduct(productData);
        
        if (productData) {
          const related = await productService.getProductsByCategory(productData.category);
          setRelatedProducts(related.filter(p => p.id !== productData.id).slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category
        }
      });
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-200 rounded-lg h-96"></div>
              <div className="space-y-4">
                <div className="bg-gray-200 h-8 rounded"></div>
                <div className="bg-gray-200 h-6 rounded w-3/4"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                <div className="bg-gray-200 h-10 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h1>
            <Link
              to="/products"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Products</span>
        </Link>

        {/* Product Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-200 relative">
          {/* WhatsApp Button Top Right */}
          <a
            href={`https://wa.me/94776309128?text=${encodeURIComponent('Hi, I am interested in the product: ' + product.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center px-6 py-2 space-x-2 text-base font-semibold text-white bg-green-500 rounded-bl-lg absolute top-0 right-0 m-4 z-20 transition-all duration-300 transform hover:bg-green-600 hover:scale-105 shadow-lg"
          >
            <FaWhatsapp className="w-5 h-5" />
            <span>WhatsApp</span>
          </a>
          {/* Mobile WhatsApp Button */}
          <a
            href={`https://wa.me/94776309128?text=${encodeURIComponent('Hi, I am interested in the product: ' + product.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex lg:hidden items-center justify-center px-4 py-2 space-x-2 text-base font-semibold text-white bg-green-500 rounded-lg mt-4 mb-2 w-full transition-all duration-300 transform hover:bg-green-600 hover:scale-105 shadow-lg"
          >
            <FaWhatsapp className="w-5 h-5" />
            <span>WhatsApp</span>
          </a>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="space-y-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="flex items-center space-x-2">
                <Monitor className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Instant digital delivery</span>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">{product.name}</h1>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">({product.rating} rating)</span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {product.description}
              </p>

              <div className="text-4xl font-bold text-gray-900 dark:text-white">
                Rs{product.price.toLocaleString()}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                <Link
                  to="/checkout"
                  className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* System Requirements */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">System Requirements</h3>
                <ul className="space-y-2">
                  {product.systemRequirements.map((requirement, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Monitor className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{relatedProduct.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{relatedProduct.description}</p>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    Rs{relatedProduct.price.toLocaleString()}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;