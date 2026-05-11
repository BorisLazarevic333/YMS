import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function GuestRestricted() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <motion.div
        className="glass-dark p-12 max-w-2xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-6xl font-bold mb-6">Access Restricted</h1>

        <p className="text-gray-400 text-xl mb-10">
          You must be logged into an account to access ingate operations.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/home"
            className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition"
          >
            Go Back
          </Link>

          <Link
            to="/"
            className="border border-white/20 px-8 py-4 rounded-2xl hover:bg-white/10 transition"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("guest");
              window.location.href = "/";
            }}
          >
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default GuestRestricted;
