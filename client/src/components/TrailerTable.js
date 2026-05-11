import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";
import { motion } from "framer-motion";

function TrailerTable() {
  const isGuest = localStorage.getItem("guest");
  const [trailers, setTrailers] = useState([]);
  const [search, setSearch] = useState("");

  const [showTrailer, setShowTrailer] = useState(true);
  const [showContainer, setShowContainer] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 13;

  const fetchTrailers = async () => {
    const token = localStorage.getItem("token");
    if (!token && !isGuest) return;

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/trailers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setTrailers(res.data);
  };

  useEffect(() => {
    fetchTrailers();
  });

  const filteredTrailers = [...trailers]

    // NEWEST FIRST
    .sort((a, b) => {
      return new Date(b.ingateTime) - new Date(a.ingateTime);
    })

    // FILTERS
    .filter((t) => {
      const matchesSearch = `${t.driverName} ${t.trailerNumber}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesType =
        (!t.type && true) ||
        (showTrailer && t.type === "Trailer") ||
        (showContainer && t.type === "Container");

      return matchesSearch && matchesType;
    });

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredTrailers.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const totalPages = Math.ceil(filteredTrailers.length / itemsPerPage);

  const handleOutgate = async (id) => {
    const confirmAction = window.confirm("Outgate trailer?");
    if (!confirmAction) return;

    const token = localStorage.getItem("token");

    await axios.put(
      `${process.env.REACT_APP_API_URL}/api/trailers/outgate/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    window.location.reload();
  };

  return (
    <Layout>
      <motion.div
        className="relative z-10 flex flex-col h-full"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
          Trailer Pool
        </h1>

        <div className="glass p-4 mb-4 flex flex-wrap gap-6 items-center text-xs md:text-sm lg:text-base">
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search driver or trailer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-lg"
          />

          {/* TYPE FILTER */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showTrailer}
                onChange={() => setShowTrailer(!showTrailer)}
              />
              Trailer
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showContainer}
                onChange={() => setShowContainer(!showContainer)}
              />
              Container
            </label>
          </div>

          {/* RESET */}
          <button
            onClick={() => {
              setSearch("");
              setShowTrailer(true);
              setShowContainer(true);
            }}
            className="bg-black text-white px-4 py-3 rounded-lg text-xs md:text-sm lg:text-base"
          >
            Reset
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded text-xs md:text-sm lg:text-base">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 text-left">Driver</th>
                <th className="p-2 text-left">Company</th>
                <th className="p-2 text-left">Truck Number</th>
                <th className="p-2 text-left">Trailer</th>
                <th className="p-2 text-left">Type</th>
                {!isGuest && <th className="p-2 text-left">Action</th>}
              </tr>
            </thead>

            <tbody>
              {currentItems
                .filter((t) => t.trailerNumber)
                .map((t) => (
                  <tr key={t._id} className="border-t">
                    <td className="p-2">{t.driverName}</td>
                    <td className="p-2">{t.company}</td>
                    <td className="p-2">{t.truckNumber}</td>
                    <td className="p-2 font-semibold">{t.trailerNumber}</td>
                    <td className="p-2 font-semibold">{t.type}</td>
                    {!isGuest && (
                      <td className="p-2">
                        <button
                          onClick={() => handleOutgate(t._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Outgate
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-black text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </motion.div>
    </Layout>
  );
}

export default TrailerTable;
