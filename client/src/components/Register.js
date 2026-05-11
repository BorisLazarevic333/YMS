import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        form,
      );

      setSuccess("Uspešno registrovan! Sada se uloguj.");
      setForm({ username: "", password: "" });
    } catch (err) {
      setError("Korisnicko ime već postoji");
    }

    setLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleRegister}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-2xl shadow-lg w-80 flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold text-center">Register</h2>

      {/* USERNAME */}
      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        className={`border p-2 rounded focus:outline-none focus:ring-2 ${
          error ? "border-red-500" : "focus:ring-black"
        }`}
      />

      {/* PASSWORD */}
      <div className="relative">
        <input
          name="password"
          value={form.password}
          type={showPassword ? "text" : "password"}
          onChange={handleChange}
          placeholder="Password"
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

      {/* SUCCESS */}
      {success && (
        <p className="text-green-500 text-sm text-center">{success}</p>
      )}

      {/* BUTTON */}
      <button
        disabled={loading}
        className={`py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
        }`}
      >
        {loading ? "Loading..." : "Register"}
      </button>
    </motion.form>
  );
}

export default Register;
