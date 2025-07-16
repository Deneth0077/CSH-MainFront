import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../services/productService';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

// Accent color map for demo (could be per category or random)
const ACCENTS = [
  {
    bg: 'from-blue-800 via-blue-600 to-blue-400',
    accent: 'border-blue-500',
    price: 'bg-blue-600',
    btn: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    bg: 'from-purple-800 via-purple-600 to-pink-500',
    accent: 'border-fuchsia-500',
    price: 'bg-fuchsia-600',
    btn: 'bg-fuchsia-600 hover:bg-fuchsia-700',
  },
  {
    bg: 'from-orange-800 via-orange-600 to-yellow-400',
    accent: 'border-orange-500',
    price: 'bg-orange-500',
    btn: 'bg-orange-500 hover:bg-orange-600',
  },
];

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();
  const navigate = useNavigate();
  // Pick accent by product index or category hash for demo
  const accentIdx = product.id ? product.id.charCodeAt(0) % ACCENTS.length : 0;
  const accent = ACCENTS[accentIdx];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
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
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'CLEAR_CART' });
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
    navigate('/checkout');
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div
      className={`relative rounded-2xl shadow-xl overflow-hidden group cursor-pointer bg-gradient-to-br ${accent.bg} p-0 transition-transform duration-300 hover:-translate-y-1`}
      onClick={() => navigate(`/product/${product.id}`)}
      style={{ minHeight: 420 }}
    >
      {/* Decorative SVGs */}
      <svg className="absolute left-2 top-2 opacity-30 w-16 h-16 z-20" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" stroke="white" strokeWidth="4" /></svg>
      <svg className="absolute right-4 top-16 opacity-30 w-10 h-10 z-20" viewBox="0 0 40 40" fill="none"><path d="M5 20 Q20 0 35 20 Q20 40 5 20 Z" stroke="white" strokeWidth="2" fill="none"/></svg>
      <svg className="absolute left-8 bottom-8 opacity-20 w-12 h-12 z-20" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" stroke="white" strokeWidth="3" /></svg>

      {/* Product image full width at top */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        {/* Price badge on top right of image */}
        <div className={`absolute top-4 right-4 z-30 px-4 py-1 rounded-full text-white text-base font-bold shadow-lg ${accent.price}`}>
          Rs{product.price.toLocaleString()}
        </div>
      </div>

      {/* Card content */}
      <div className="relative z-10 bg-black/70 rounded-b-2xl px-6 pt-4 pb-6">
        <h3 className="text-xl font-bold text-white mb-1 line-clamp-1 flex items-center gap-2">
          {product.name}
        </h3>
        {/* Accent line */}
        <div className={`h-1 w-16 mb-3 rounded-full ${accent.accent} border-b-4`}></div>
        <div className="flex items-center mb-2">
          <div className="flex items-center space-x-1 mr-2">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-200">({product.rating})</span>
        </div>
        <p className="text-gray-200 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full font-medium">
            {product.category}
          </span>
          <button
            onClick={e => { e.stopPropagation(); handleAddToCart(e); }}
            className={`flex items-center gap-1 px-4 py-2 rounded-full text-white text-sm font-semibold shadow transition-all ${accent.btn}`}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;