import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CreditCard, Wallet, Building, CheckCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { orderService, OrderData } from '../services/orderService';
import axios from 'axios';
import { FaWhatsapp } from 'react-icons/fa';

interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
  slip?: FileList;
}

const Checkout: React.FC = () => {
  const { state, dispatch } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues
  } = useForm<CheckoutFormData>();

  const selectedPaymentMethod = watch('paymentMethod');
  const [slipFile, setSlipFile] = useState<File | null>(null);

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    // Removed UPI and Net Banking
    { id: 'bank_transfer', name: 'Bank Transfer', icon: Wallet }
  ];

  const onSubmit = async (data: CheckoutFormData, skipFormSubmit = false) => {
    // Validate required fields before sending
    if (!data.fullName || !data.email || !data.phone || !data.address || !selectedPaymentMethod) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!state.items || !Array.isArray(state.items) || state.items.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    setLoading(true);
    try {
      let response;
      if (selectedPaymentMethod === 'bank_transfer') {
        // Use FormData for bank transfer, slip is optional
        const formData = new FormData();
        formData.append('customer[name]', data.fullName);
        formData.append('customer[email]', data.email);
        formData.append('customer[phone]', data.phone || 'N/A');
        formData.append('shippingAddress[street]', data.address);
        formData.append('shippingAddress[city]', data.city || '');
        formData.append('shippingAddress[state]', data.state || '');
        formData.append('shippingAddress[zip]', data.zip || '');
        formData.append('shippingAddress[country]', data.country || '');
        formData.append('paymentMethod', data.paymentMethod);
        formData.append('items', JSON.stringify(state.items.map(item => ({
          product: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1
        }))));
        if (slipFile) {
          formData.append('paymentSlip', slipFile);
        }
        response = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/orders`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        ).then(res => res.data);
      } else {
        // Use JSON for normal orders
        const orderData = {
          customer: {
            name: data.fullName,
            email: data.email,
            phone: data.phone || 'N/A',
          },
          items: state.items.map(item => ({
            product: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1
          })),
          shippingAddress: {
            street: data.address,
            city: data.city || '',
            state: data.state || '',
            zip: data.zip || '',
            country: data.country || '',
          },
          paymentMethod: data.paymentMethod,
        };
        response = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/orders`,
          orderData
        ).then(res => res.data);
      }
      if (response.success) {
        // Support both { data: order } and { orderId } responses
        if (response.data) {
          setOrderNumber(response.data.orderNumber || '');
          setOrderDate(response.data.createdAt ? new Date(response.data.createdAt).toLocaleString() : '');
          setOrderId(response.data._id || response.data.orderId || '');
        } else {
          setOrderId(response.orderId || '');
        }
        setOrderComplete(true);
        dispatch({ type: 'CLEAR_CART' });
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      if (error.response && error.response.data) {
        alert(error.response.data.message || 'Something went wrong. Please try again.');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBankTransferAndWhatsApp = async (data: CheckoutFormData) => {
    // Place the order first
    await onSubmit(data, true); // true = skip default form submit
    // Open WhatsApp chat with order details
    const message = `Hi, I have placed an order via bank transfer.\nName: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone}\nOrder for: ${state.items.map(i => i.name).join(', ')}\nTotal: Rs ${state.total}`;
    window.open(`https://wa.me/94776309128?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (state.items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Add some products to your cart before checkout.
            </p>
            <Link
              to="/products"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center transition-colors duration-200">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Thank you for your purchase.</p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              <span className="font-semibold">Order Code:</span> {orderNumber || orderId}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              <span className="font-semibold">Order Date:</span> {orderDate}
            </p>
            <div className="space-y-4">
              <Link
                to="/products"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
              >
                Continue Shopping
              </Link>
              <Link
                to="/"
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block ml-4"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Billing Information</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  {...register('fullName', { required: 'Full name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="text"
                  {...register('phone', { required: 'Phone number is required' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  {...register('address', { required: 'Address is required' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Payment Method *
                </label>
                <div className="space-y-3">
                  {/* Credit/Debit Card option */}
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer transition-colors">
                    <input
                      type="radio"
                      value="card"
                      {...register('paymentMethod', { required: 'Payment method is required' })}
                      className="sr-only"
                    />
                    <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-3" />
                    <span className="font-medium text-gray-900 dark:text-white ml-2">Credit/Debit Card</span>
                  </label>
                  {/* Bank Transfer option */}
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer transition-colors">
                    <input
                      type="radio"
                      value="bank_transfer"
                      {...register('paymentMethod', { required: 'Payment method is required' })}
                      className="sr-only"
                    />
                    <Wallet className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-3" />
                    <span className="font-medium text-gray-900 dark:text-white ml-2">Bank Transfer</span>
                  </label>
                </div>
                {errors.paymentMethod && (
                  <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>
                )}
              </div>
              {selectedPaymentMethod === 'bank_transfer' && (
                <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                  <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">Bank Account Details</h3>
                  <div className="mb-4 text-gray-700 dark:text-gray-200">
                    <div><span className="font-medium">Account Name:</span> Your Company Name</div>
                    <div><span className="font-medium">Account Number:</span> 1234567890</div>
                    <div><span className="font-medium">Bank Name:</span> Example Bank</div>
                    <div><span className="font-medium">IFSC Code:</span> EXAMP0012345</div>
                    <div><span className="font-medium">Branch:</span> Main Branch</div>
                  </div>
                  <div className="mb-2 font-medium text-gray-900 dark:text-white">Upload Payment Slip <span className='font-normal'>(optional)</span></div>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors mt-2"
                    onClick={() => handleBankTransferAndWhatsApp(getValues())}
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    Send Payment Slip & Order via WhatsApp
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                {loading ? 'Processing...' : `Place Order - Rs ${state.total.toLocaleString()}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    Rs{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="font-semibold text-gray-900 dark:text-white">Rs{state.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                <span className="font-semibold text-gray-900 dark:text-white">Rs0</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    Rs{state.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;