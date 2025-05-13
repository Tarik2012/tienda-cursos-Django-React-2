// src/context/CartContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // ⏳ Recuperamos del localStorage al iniciar
    const [cartItems, setCartItems] = useState(() => {
        const stored = localStorage.getItem("cartItems");
        return stored ? JSON.parse(stored) : [];
    });

    // 🧠 Cada vez que cambie el carrito, se guarda automáticamente
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // ✅ Agregar curso con cantidad
    const addToCart = (course) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === course.id);

            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === course.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...course, quantity: 1 }];
            }
        });
    };

    // ✅ Eliminar curso completamente
    const removeFromCart = (courseId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== courseId)
        );
    };

    // ✅ Vaciar carrito y localStorage al confirmar pedido
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("cartItems");
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
