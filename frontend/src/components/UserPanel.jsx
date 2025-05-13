import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const UserPanel = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  // Obtener datos del usuario logueado
  useEffect(() => {
    axiosInstance
      .get("me/")
      .then((res) => {
        console.log(res.data); // 👈 mira qué campos llegan aquí
        setUser(res.data);
      })

      .catch((err) => console.error("Error al obtener usuario:", err));
  }, []);

  // Obtener historial de pedidos
  useEffect(() => {
    axiosInstance
      .get("orders/my-orders/")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error al obtener pedidos:", err));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Bienvenido, {user?.name || "Usuario"}
      </h1>
      {/* <p className="text-gray-600 mb-8">
        🔐 Esta es una página protegida. Solo los usuarios logueados pueden
        verla.
      </p> */}

      <div className="bg-gray-100 p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">🧾 Historial de Pedidos</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">
            No has realizado ningún pedido todavía.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm p-4 border border-gray-200"
              >
                <p className="mb-1">
                  <span className="font-semibold">📅 Fecha:</span>{" "}
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">💰 Total:</span> {order.total}
                  €
                </p>
                <p className="font-semibold mt-2">📚 Cursos:</p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.course_title} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPanel;
