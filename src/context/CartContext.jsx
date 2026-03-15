import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = sessionStorage.getItem('to_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => { sessionStorage.setItem('to_cart', JSON.stringify(items)); }, [items]);

  const addItem = useCallback((product, options = {}, qty = 1) => {
    const { size = null, scent = null } = options;
    const key = `${product.id}|${size || ''}|${scent || ''}`;
    setItems(prev => {
      const existing = prev.find(i => i.key === key);
      if (existing) return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i);
      return [...prev, {
        key, productId: product.id, name: product.name, image: product.image,
        iconName: product.iconName, iconColor: product.iconColor,
        size, scent, price: options.price || product.price, qty, slug: product.slug,
      }];
    });
  }, []);

  const removeItem = useCallback((key) => setItems(prev => prev.filter(i => i.key !== key)), []);

  const updateQty = useCallback((key, newQty) => {
    if (newQty <= 0) { setItems(prev => prev.filter(i => i.key !== key)); return; }
    setItems(prev => prev.map(i => i.key === key ? { ...i, qty: newQty } : i));
  }, []);

  const clearCart = useCallback(() => { setItems([]); sessionStorage.removeItem('to_cart'); }, []);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
