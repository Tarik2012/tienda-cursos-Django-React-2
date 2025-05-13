// src/pages/Cart.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
                🛒 Tu carrito
            </h1>

            {cartItems.length === 0 ? (
                <div className="text-center text-gray-600">
                    <p className="mb-4">Tu carrito está vacío.</p>
                    <Link
                        to="/courses"
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Ver cursos
                    </Link>
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col md:flex-row justify-between items-start md:items-center border rounded-lg p-4 shadow-sm"
                            >
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {item.title}
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        Precio: {item.price} € x {item.quantity}
                                    </p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="mt-3 md:mt-0 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-xl font-bold text-gray-800">
                            Total: {total.toFixed(2)} €
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={clearCart}
                                className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
                            >
                                Vaciar carrito
                            </button>
                            <Link
                                to="/checkout"
                                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                            >
                                Proceder al pago
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
