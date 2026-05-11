import React, { useState } from "react";
import axios from "axios";
import Layout from "./Layout";
import { motion } from "framer-motion";

function IngateForm() {
  const [form, setForm] = useState({
    driverName: "",
    truckNumber: "",
    trailerNumber: "",
    company: "",
    type: "",
  });

  const [noTrailer, setNoTrailer] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // VALIDACIJA
  const isFormValid = () => {
    if (noTrailer) {
      return (
        form.driverName.trim() !== "" &&
        form.truckNumber.trim() !== "" &&
        form.company.trim() !== ""
      );
    }

    return Object.values(form).every((v) => v.trim() !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError("Popuni sva potrebna polja");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/trailers/ingate`,
        {
          ...form,
          trailerNumber: noTrailer ? null : form.trailerNumber,
          type: noTrailer ? null : form.type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // alert("Uspešan ingate!");
      window.location.reload();
    } catch (err) {
      setError("Greška pri ingate-u");
    }
  };

  return (
    <Layout>
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* LEFT SIDE */}
        <div className="col-span-2 glass p-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            Ingate Workspace
          </h1>

          <p className="text-gray-500 mb-8">
            Register incoming trucks, trailers and containers.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* DRIVER */}
            <input
              name="driverName"
              value={form.driverName}
              onChange={handleChange}
              placeholder="Driver Name"
              className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* TRUCK */}
            <input
              name="truckNumber"
              value={form.truckNumber}
              onChange={handleChange}
              placeholder="Truck Number"
              className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* COMPANY */}
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Company"
              className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* CHECKBOX */}
            <label className="flex items-center gap-3 text-sm font-medium">
              <input
                type="checkbox"
                checked={noTrailer}
                onChange={() => setNoTrailer(!noTrailer)}
                className="w-5 h-5"
              />
              No trailer attached
            </label>

            {/* CONDITIONAL */}
            {!noTrailer && (
              <>
                <input
                  name="trailerNumber"
                  value={form.trailerNumber}
                  onChange={handleChange}
                  placeholder="Trailer Number"
                  className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Select Type</option>
                  <option value="Trailer">Trailer</option>
                  <option value="Container">Container</option>
                </select>
              </>
            )}

            {/* ERROR */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* BUTTON */}
            <button
              disabled={!isFormValid()}
              className={`py-4 rounded-xl text-white text-lg font-semibold transition ${
                isFormValid()
                  ? "bg-gradient-to-br from-black to-gray-800 hover:scale-[1.01]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Ingate Vehicle
            </button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-6">
          {/* GATE STATUS */}
          <div className="glass p-6">
            <h2 className="text-xl font-bold mb-4">Gate Status</h2>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>

              <p className="font-medium">Gate Operational</p>
            </div>

            <p className="text-sm text-gray-500 mt-2">
              All systems running normally
            </p>
          </div>

          {/* QUICK INFO */}
          <div className="glass p-6">
            <h2 className="text-xl font-bold mb-4">Operator Checklist</h2>

            <ul className="flex flex-col gap-3 text-sm text-gray-600">
              <li>✓ Verify driver identity</li>
              <li>✓ Check trailer condition</li>
              <li>✓ Confirm documentation</li>
              <li>✓ Verify truck plates</li>
            </ul>
          </div>

          {/* QUICK ACTIONS */}
          <div className="glass p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
              >
                Print Gate Pass
              </button>

              <button
                type="button"
                className="bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
              >
                Scan Documents
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}

export default IngateForm;
