import Layout from "../components/Layout";
import { motion } from "framer-motion";

function About() {
  return (
    <Layout>
      <motion.div
        className="flex flex-col gap-10"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* HERO */}
        <div className="glass p-10 relative overflow-hidden">
          <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-white/10 blur-3xl rounded-full"></div>

          <div className="relative z-10">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
              About YMS
            </h1>

            <p className="text-gray-600 max-w-3xl text-lg">
              Yard Management System (YMS) is a modern logistics platform
              designed to optimize trailer, truck and container movement inside
              logistics yards in real-time.
            </p>
          </div>
        </div>

        {/* MISSION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-3">Real-Time Tracking</h2>

            <p className="text-gray-600">
              Monitor active trailers and containers across the yard instantly.
            </p>
          </div>

          <div className="glass p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-3">Fast Operations</h2>

            <p className="text-gray-600">
              Simplify ingate and outgate procedures with one-click workflows.
            </p>
          </div>

          <div className="glass p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-3">Analytics & Insights</h2>

            <p className="text-gray-600">
              Gain operational visibility through dashboards and reporting.
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="glass p-4 md:p-6 text-center">
            <h2 className="text-4xl font-bold mb-2 text-green-500">24/7</h2>

            <p className="text-gray-500">Monitoring</p>
          </div>

          <div className="glass p-4 md:p-6 text-center">
            <h2 className="text-4xl font-bold mb-2 text-blue-500">99%</h2>

            <p className="text-gray-500">Efficiency</p>
          </div>

          <div className="glass p-4 md:p-6 text-center">
            <h2 className="text-4xl font-bold mb-2 text-red-500">10K+</h2>

            <p className="text-gray-500">Operations</p>
          </div>

          <div className="glass p-4 md:p-6 text-center">
            <h2 className="text-4xl font-bold mb-2 text-purple-500">100+</h2>

            <p className="text-gray-500">Companies</p>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="glass p-8">
          <h2 className="text-3xl font-bold mb-8">Platform Workflow</h2>

          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-4 h-4 bg-green-500 rounded-full mt-2"></div>

              <div>
                <h3 className="font-bold text-lg">Driver Arrival</h3>

                <p className="text-gray-600">
                  Truck arrives at gate and driver details are verified.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-4 h-4 bg-blue-500 rounded-full mt-2"></div>

              <div>
                <h3 className="font-bold text-lg">Ingate Registration</h3>

                <p className="text-gray-600">
                  Trailer or container is added into the yard system.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-4 h-4 bg-red-500 rounded-full mt-2"></div>

              <div>
                <h3 className="font-bold text-lg">Outgate Process</h3>

                <p className="text-gray-600">
                  Trailer leaves the yard and history is automatically updated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}

export default About;
