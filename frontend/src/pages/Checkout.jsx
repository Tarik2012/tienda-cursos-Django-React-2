// src/pages/Checkout.jsx
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handleOrderSubmit = async () => {
        if (cartItems.length === 0) {
            setMessage("Tu carrito está vacío.");
            return;
        }

        const orderData = {
            items: cartItems.map((item) => ({
                course: item.id,
                quantity: item.quantity,
            })),
        };

        try {
            setLoading(true);
            const response = await axiosInstance.post("/orders/create/", orderData);

            console.log("Pedido enviado:", response.data);

            setMessage("✅ Pedido realizado con éxito");
            clearCart();
            setTimeout(() => navigate("/"), 2000); // Redirige a Home después de 2s
        } catch (error) {
            console.error("Error al enviar pedido:", error);
            setMessage("❌ Error al enviar el pedido");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">📦 Confirmar pedido</h1>

            {cartItems.length === 0 ? (
                <p className="text-gray-600">Tu carrito está vacío.</p>
            ) : (
                <>
                    <div className="space-y-4 mb-6">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center border p-4 rounded-lg shadow"
                            >
                                <div>
                                    <h2 className="font-semibold">{item.title}</h2>
                                    <p className="text-sm text-gray-600">
                                        {item.price} € x {item.quantity}
                                    </p>
                                </div>
                                <p className="text-sm font-bold">
                                    {(item.price * item.quantity).toFixed(2)} €
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="text-xl font-bold mb-4">
                        Total a pagar: {total.toFixed(2)} €
                    </div>

                    <button
                        onClick={handleOrderSubmit}
                        disabled={loading}
                        className={`bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? "Enviando pedido..." : "Confirmar pedido"}
                    </button>

                    {message && (
                        <p className="mt-4 text-sm text-center text-blue-600 font-medium">
                            {message}
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default Checkout;
