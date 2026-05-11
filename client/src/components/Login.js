import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        form,
      );

      localStorage.setItem("token", res.data.token);
      window.location.href = "/home";
    } catch (err) {
      setError("Greška pri loginu");
    }

    setLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleLogin}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-2xl shadow-2xl w-80 flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold text-center">Login</h2>

      {/* USERNAME */}
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        className={`border p-2 rounded focus:outline-none focus:ring-2 ${
          error ? "border-red-500" : "focus:ring-black"
        }`}
      />

      {/* PASSWORD */}
      <div className="relative">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={handleChange}
          className={`border p-2 rounded w-full focus:outline-none focus:ring-2 ${
            error ? "border-red-500" : "focus:ring-black"
          }`}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-2 text-sm text-gray-500"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {/* ERROR */}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {/* BUTTON */}
      <button
        disabled={loading}
        className={`py-2 rounded text-white transition delay-10 duration-300 ease-in-out ${
          loading ? "bg-gray-400" : "bg-black hover:bg-gray-700"
        }`}
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </motion.form>
  );
}

export default Login;
