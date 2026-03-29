import React, { createContext, useContext, useState, useEffect } from 'react';
import dataCenter from '../data/dataCenter';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    if (saved) return JSON.parse(saved);
    return dataCenter.orders || [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product, selectedVariants, quantity = 1) => {
    // Generate unique ID for cart item based on product ID and selected variants
    const variantId = Object.values(selectedVariants).map(v => v.name).join('-');
    const cartItemId = `${product.id}-${variantId}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          product,
          selectedVariants,
          quantity,
          pricePerUnit: calculatePrice(product, selectedVariants)
        }
      ];
    });
  };

  const calculatePrice = (product, selectedVariants) => {
    let price = product.basePrice;
    Object.values(selectedVariants).forEach(v => {
      price += v.extra || 0;
    });
    return price;
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.cartItemId === cartItemId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((sum, item) => sum + (item.pricePerUnit * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, subtotal, orders, setOrders }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
