import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://csh-backend-chi.vercel.app/api';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  features: string[];
  systemRequirements: string[];
  isFeatured: boolean;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get('/products');
      return Array.isArray(response.data.data) ? response.data.data : [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      const response = await api.get(`/products?category=${encodeURIComponent(category)}`);
      return Array.isArray(response.data.data) ? response.data.data : [];
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      const response = await api.get(`/products?search=${encodeURIComponent(query)}`);
      return Array.isArray(response.data.data) ? response.data.data : [];
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  },

  getProductById: async (id: string): Promise<Product | null> => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data.data || null;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return null;
    }
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get('/products?featured=true');
      return Array.isArray(response.data.data) ? response.data.data : [];
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }
  }
};
