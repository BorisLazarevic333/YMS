import Layout from "../components/Layout";
import { motion } from "framer-motion";
import { useState } from "react";

function Contact() {
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setSuccess("Message sent successfully!");
  };

  return (
    <Layout>
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* LEFT SIDE */}
        <div className="col-span-1 flex flex-col gap-6">
          {/* CONTACT INFO */}
          <div className="glass p-3 md:p-6">
            <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

            <div className="flex flex-col gap-4 text-gray-600">
              <div>
                <p className="font-semibold text-black">Support Email</p>

                <p>support@yms-system.com</p>
              </div>

              <div>
                <p className="font-semibold text-black">Phone</p>

                <p>+381 60 123 4567</p>
              </div>

              <div>
                <p className="font-semibold text-black">Office</p>

                <p>Belgrade Logistics Center</p>
              </div>
            </div>
          </div>

          {/* SUPPORT STATUS */}
          <div className="glass p-3 md:p-6">
            <h2 className="text-2xl font-bold mb-4">Support Status</h2>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>

              <p className="font-medium">Online</p>
            </div>

            <p className="text-sm text-gray-500 mt-3">
              Average response time: under 15 minutes
            </p>
          </div>

          {/* BUSINESS HOURS */}
          <div className="glass p-3 md:p-6">
            <h2 className="text-2xl font-bold mb-4">Business Hours</h2>

            <div className="flex flex-col gap-2 text-gray-600">
              <p>Monday - Friday: 08:00 - 20:00</p>

              <p>Saturday: 09:00 - 17:00</p>

              <p>Sunday: Emergency support only</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-span-2 glass p-4 md:p-8">
          <h2 className="text-1xl md:text-2xl lg:text-4xl font-bold mb-2">
            Send a Message
          </h2>

          <p className="text-gray-500 mb-8">
            Have questions or need support? Contact our team.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* NAME */}
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* SUBJECT */}
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* MESSAGE */}
            <textarea
              rows="6"
              placeholder="Your Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              className="border p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* SUCCESS */}
            {success && <p className="text-green-500 font-medium">{success}</p>}

            {/* BUTTON */}
            <button className="bg-gradient-to-br from-black to-gray-800 text-white py-4 rounded-xl font-semibold hover:scale-[1.01] transition">
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </Layout>
  );
}

export default Contact;
