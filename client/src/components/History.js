import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");

let user = null;

if (token) {
  user = jwtDecode(token);
}

const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Delete this record?");
  if (!confirmDelete) return;

  await axios.delete(`${process.env.REACT_APP_API_URL}/api/trailers${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  window.location.reload();
};

function History() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [showInyard, setShowInyard] = useState(true);
  const [showOut, setShowOut] = useState(true);

  const [showTrailer, setShowTrailer] = useState(true);
  const [showContainer, setShowContainer] = useState(true);
  const [showBobtail, setShowBobtail] = useState(true);

  const [sortOrder, setSortOrder] = useState("desc");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 13;

  const fetchHistory = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/trailers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setData(res.data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filteredData = data
    .filter((t) => {
      // SEARCH
      const matchesSearch =
        `${t.driverName} ${t.trailerNumber} ${t.company} ${t.truckNumber}`
          .toLowerCase()
          .includes(search.toLowerCase());

      // STATUS
      const matchesStatus =
        (showInyard && t.status === "IN_YARD") ||
        (showOut && t.status === "OUT");

      // TYPE
      const matchesType =
        (showBobtail && t.type === null) || // no trailer support
        (showTrailer && t.type === "Trailer") ||
        (showContainer && t.type === "Container");

      return matchesSearch && matchesStatus && matchesType;
    })

    // SORT
    .sort((a, b) => {
      const dateA = new Date(a.ingateTime);
      const dateB = new Date(b.ingateTime);

      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <Layout>
      <motion.div
        className="relative z-10 flex flex-col h-full"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
          History
        </h1>

        <div className="glass p-4 mb-4 flex flex-wrap gap-6 items-center text-xs md:text-sm lg:text-base">
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search history..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-lg"
          />

          {/* STATUS */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showInyard}
                onChange={() => setShowInyard(!showInyard)}
              />
              IN_YARD
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOut}
                onChange={() => setShowOut(!showOut)}
              />
              OUT
            </label>
          </div>

          {/* TYPE */}
          <div className="flex items-center gap-4 ">
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

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showBobtail}
                onChange={() => setShowBobtail(!showBobtail)}
              />
              Bobtail
            </label>
          </div>

          {/* SORT */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option value="desc">Newest First</option>

            <option value="asc">Oldest First</option>
          </select>

          <button
            onClick={() => {
              setSearch("");

              setShowInyard(true);
              setShowOut(true);

              setShowTrailer(true);
              setShowContainer(true);

              setSortOrder("desc");
            }}
            className="bg-black text-white px-4 py-3 rounded-lg"
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
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Ingate Time</th>
                {user?.role === "admin" && (
                  <th className="p-2 text-left">Action</th>
                )}
              </tr>
            </thead>

            <tbody>
              {currentItems.map((t) => (
                <tr key={t._id} className="border-t">
                  <td className="p-2">{t.driverName}</td>
                  <td className="p-2">{t.company}</td>
                  <td className="p-2">{t.truckNumber}</td>
                  <td className="p-2 font-semibold">
                    {t.trailerNumber ? t.trailerNumber : "/"}
                  </td>
                  <td className="p-2">{t.type ? t.type : "Bobtail"}</td>
                  <td className="p-2">
                    <span
                      className={`px-3 py-1 rounded text-white text-xs md:text-sm lg:text-base font-semibold ${
                        t.status === "IN_YARD"
                          ? "bg-green-600"
                          : t.status === "OUT"
                            ? "bg-red-600"
                            : "bg-gray-400"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>

                  <td className="p-2">
                    {new Date(t.ingateTime).toLocaleString()}
                  </td>
                  {user?.role === "admin" && (
                    <td className="p-2">
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
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

export default History;
