import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [traceability, setTraceability] = useState(null);
  const [quality, setQuality] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = '/api';

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/products`);
      setProducts(res.data.data);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (id) => {
    try {
      const res = await axios.get(`${API_BASE}/products/${id}`);
      return res.data.data;
    } catch (err) {
      setError('Failed to load product details');
      return null;
    }
  };

  const fetchTraceability = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/traceability`);
      setTraceability(res.data.data);
    } catch (err) {
      setError('Failed to load traceability data');
    } finally {
      setLoading(false);
    }
  };

  const fetchQuality = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/quality`);
      setQuality(res.data.data);
    } catch (err) {
      setError('Failed to load quality data');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    products,
    traceability,
    quality,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    fetchTraceability,
    fetchQuality,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
