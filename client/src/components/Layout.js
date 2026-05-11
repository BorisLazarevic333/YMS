import { jwtDecode } from "jwt-decode";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Layout({ children }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");
  const isGuest = localStorage.getItem("guest");

  let username = "";

  if (token) {
    const decoded = jwtDecode(token);
    username = decoded.username;
  }

  const navItem = (path, label) => (
    <Link
      to={path}
      onClick={() => setSidebarOpen(false)}
      className={`px-4 py-3 rounded-l font-medium transition duration-200 ${
        path === "/ingate"
          ? location.pathname === path
            ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg"
            : "bg-gradient-to-r from-green-700 to-green-900 text-white shadow-lg"
          : location.pathname === path
            ? "bg-white text-black shadow-lg"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="flex h-screen bg-gray-100 ">
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-black text-white p-3 rounded-xl"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {/* SIDEBAR */}

      <div
        className={`
    fixed lg:static top-0 left-0 h-full z-40
    w-64 text-white p-5 flex flex-col
    bg-gradient-to-br from-black to-gray-800
    transition-transform duration-300

    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

    lg:translate-x-0
  `}
      >
        <h2 className="text-5xl font-bold mb-8">YMS</h2>

        {isGuest ? (
          <p className="text-sm text-yellow-400 mb-4">Guest Mode</p>
        ) : (
          <p className="text-sm text-gray-300 mb-4">
            Welcome,{" "}
            <span className="font-semibold">
              {username.charAt(0).toUpperCase() + username.slice(1)}
            </span>
          </p>
        )}

        <nav className="flex flex-col gap-2 pb-5 border-b-2 border-gray-700">
          {navItem("/home", "Home")}
          {navItem("/dashboard", "Dashboard")}
          {!isGuest && navItem("/ingate", "Ingate")}
          {navItem("/pool", "Trailer Pool")}
          {navItem("/history", "History")}
        </nav>

        <nav className="flex flex-col gap-2 mt-5">
          {navItem("/about", "About YMS")}
          {navItem("/contact", "Contact us")}
        </nav>

        <div className="mt-auto">
          <button
            type="button"
            className="w-full bg-red-800 py-2 rounded bg-black hover:bg-red-700 transition delay-10 duration-200 ease-in-out"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("guest");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </div>
      {/* MAIN */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* CONTENT */}
        <div className="p-6 overflow-auto">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
