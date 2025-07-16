import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface OrderData {
  fullName: string;
  email: string;
  address: string;
  paymentMethod: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  total: number;
  // Optionally add phone, city, state, zip, country if available
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const orderService = {
  createOrder: async (orderData: OrderData): Promise<{ success: boolean; orderId?: string; message: string }> => {
    try {
      // Transform frontend orderData to backend expected structure
      const payload = {
        customer: {
          name: orderData.fullName,
          email: orderData.email,
          phone: orderData.phone,
        },
        items: orderData.items.map(item => ({
          product: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity,
          image: item.image, // Optional
        })),
        shippingAddress: {
          street: orderData.address,
          city: orderData.city || '',
          state: orderData.state || '',
          zip: orderData.zip || '',
          country: orderData.country || '',
        },
        paymentMethod: orderData.paymentMethod,
        notes: orderData.notes,
      };
      const response = await api.post('/orders', payload);
      return response.data;
    } catch (error) {
      let message = 'Failed to place order. Please try again.';
      if (error.response && error.response.data) {
        if (error.response.data.message) {
          message = error.response.data.message;
        }
        if (error.response.data.errors) {
          message += '\n' + error.response.data.errors.join('\n');
        }
      }
      console.error('Error creating order:', error);
      return {
        success: false,
        message
      };
    }
  }
};