import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Colores para los segmentos del PieChart
const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get("/orders/dashboard/");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!data) return <p className="p-6">Loading dashboard...</p>;

  return (
    <div className="px-4 sm:px-6 py-6 max-w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        📊 Dashboard
      </h1>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-gray-600">Total Pedidos</h2>
          <p className="text-3xl font-bold text-indigo-600">
            {data.total_orders}
          </p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-gray-600">Total Ventas</h2>
          <p className="text-3xl font-bold text-green-600">
            ${data.total_income}
          </p>
        </div>
      </div>

      {/* Pedidos por Mes - LineChart */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow mb-8">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">
          Pedidos por Mes
        </h2>
        <div className="h-[320px] sm:h-[260px] flex justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.monthly_orders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#6366F1"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ingresos por Mes - BarChart */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow mb-8">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">
          Ingresos por Mes
        </h2>
        <div className="h-[240px] w-full overflow-x-auto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.monthly_income}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value}`} />
              <Bar dataKey="total" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Cursos Más Vendidos - PieChart */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">
          Cursos Más Vendidos
        </h2>
        <div className="h-[300px] sm:h-[260px] flex flex-col items-center justify-center text-sm">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.top_courses}
                dataKey="sold"
                nameKey="course__title"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
              >
                {data.top_courses.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
