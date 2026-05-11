import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 59;

const Home = () => {
  const canvasRef = useRef(null);

  const [images, setImages] = useState([]);

  // LOAD FRAMES
  useEffect(() => {
    const frameImages = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();

      img.src = `/animationFrames/${i}.webp`;

      frameImages.push(img);
    }

    setImages(frameImages);
  }, []);

  // SCROLL VIDEO
  useEffect(() => {
    if (images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const scale = window.devicePixelRatio || 1;

    canvas.width = 1920 * scale;
    canvas.height = 1080 * scale;

    context.scale(scale, scale);

    const frameState = {
      frame: 0,
    };

    const render = () => {
      const img = images[frameState.frame];

      if (!img || !img.complete) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      context.drawImage(img, 0, 0, canvas.width / scale, canvas.height / scale);
    };

    gsap.to(frameState, {
      frame: TOTAL_FRAMES - 1,
      snap: "frame",
      ease: "none",

      scrollTrigger: {
        trigger: canvas,
        start: "top top",
        end: "2000px",
        scrub: 0.5,
        pin: true,
      },

      onUpdate: render,
    });

    images[0].onload = render;

    if (images[0].complete) render();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [images]);

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* HERO */}
      <section className="min-h-[70vh] md:h-screen bg-black flex items-center justify-center mt-28 lg:mt-0">
        <motion.div
          className="relative z-10 flex flex-col gap-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Welcome To YMS
            </h1>

            <p className="text-gray-400 text-xl">Scroll To Begin</p>
          </div>
        </motion.div>
      </section>

      {/* VIDEO SECTION */}
      <section
        className="relative bg-black hidden lg:block"
        style={{
          height: "3000px",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
          }}
        />
      </section>

      {/* NAVIGATION */}
      <section className="min-h-[70vh] md:h-screen bg-black px-4 md:px-10 py-32 mt-32 lg:mt-0">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-20 text-center">
            Enter The System
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* DASHBOARD */}
            <Link
              to="/dashboard"
              className="glass-dark p-5 md:p-10 hover:scale-[1.03] transition"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Dashboard</h2>

              <p className="text-gray-400">
                View analytics and live operations.
              </p>
            </Link>

            {/* INGATE */}
            <Link
              to="/ingate"
              className="glass-dark p-5 md:p-10 hover:scale-[1.03] transition border border-green-500/30"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-400">
                Ingate
              </h2>

              <p className="text-gray-400">
                Register incoming trailers and containers.
              </p>
            </Link>

            {/* TRAILER POOL */}
            <Link
              to="/pool"
              className="glass-dark p-5 md:p-10 hover:scale-[1.03] transition"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Trailer Pool
              </h2>

              <p className="text-gray-400">
                Monitor all active trailers in real time.
              </p>
            </Link>

            {/* HISTORY */}
            <Link
              to="/history"
              className="glass-dark p-5 md:p-10 hover:scale-[1.03] transition"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">History</h2>

              <p className="text-gray-400">Review completed yard operations.</p>
            </Link>

            {/* ABOUT */}
            <Link
              to="/about"
              className="glass-dark p-5 md:p-10 hover:scale-[1.03] transition"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">About</h2>

              <p className="text-gray-400">
                Learn more about the YMS platform.
              </p>
            </Link>

            {/* CONTACT */}
            <Link
              to="/contact"
              className="glass-dark p-5 md:p-10 hover:scale-[1.03] transition"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Contact</h2>

              <p className="text-gray-400">
                Reach our support and operations team.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
