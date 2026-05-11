import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-300 opacity-100 flex items-center justify-center relative overflow-hidden">
      {/* BLUR BACKGROUND */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-white opacity-10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-white opacity-10 blur-3xl rounded-full"></div>

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-dark p-12 text-center max-w-lg rounded-xl"
      >
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-4">
          404
        </h1>

        <p className="text-gray-300 text-lg mb-6">
          Oops... Stranica koju tražiš ne postoji.
        </p>

        <Link
          to={localStorage.getItem("token") ? "/home" : "/"}
          className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;
