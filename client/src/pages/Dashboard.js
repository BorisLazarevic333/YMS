import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:5000/api/trailers/history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTrailers(res.data);
  };

  // STATtS
  const activeTrailers = trailers.filter((t) => t.status === "IN_YARD").length;

  const outTrailers = trailers.filter((t) => t.status === "OUT").length;

  const containers = trailers.filter((t) => t.type === "Container").length;

  const trailerss = trailers.filter((t) => t.type === "Trailer").length;

  // chart data
  const chartData = [
    {
      name: "In Yard",
      value: activeTrailers,
    },
    {
      name: "Out",
      value: outTrailers,
    },
    {
      name: "Containers",
      value: containers,
    },
    {
      name: "Trailers",
      value: trailerss,
    },
  ];

  return (
    <Layout>
      <motion.div
        className="relative z-10 flex flex-col gap-6"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* HEADER */}
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Analytics Dashboard
          </h1>

          <p className="text-gray-500">Real-time yard overview</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass p-4 md:p-6">
            <p className="text-gray-500">In Yard</p>

            <h2 className="text-3xl font-bold text-green-500">
              {activeTrailers}
            </h2>
          </div>

          <div className="glass p-4 md:p-6">
            <p className="text-gray-500">Outgated</p>

            <h2 className="text-3xl font-bold text-red-500">{outTrailers}</h2>
          </div>

          <div className="glass p-4 md:p-6">
            <p className="text-gray-500">Containers</p>

            <h2 className="text-3xl font-bold text-blue-500">{containers}</h2>
          </div>
          <div className="glass p-4 md:p-6">
            <p className="text-gray-500">Trailers</p>

            <h2 className="text-3xl font-bold text-blue-500">{trailerss}</h2>
          </div>
        </div>

        {/* CHART */}
        <div className="glass p-4 md:p-6 h-[350px]">
          <h2 className="text-xl font-bold mb-4">Yard Activity</h2>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="value" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="glass p-4 md:p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>

          <div className="flex flex-col gap-3">
            {trailers.slice(0, 5).map((t) => (
              <div
                key={t._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-semibold">{t.driverName}</p>

                  <p className="text-sm text-gray-500">
                    {t.trailerNumber || "Bobtail"}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    t.status === "IN_YARD" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}

export default Dashboard;
