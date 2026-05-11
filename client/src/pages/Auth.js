import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex">
      {/* LEVA STRANA */}
      <div className="hidden lg:flex w-1/2 bg-black text-white flex-col justify-center items-center p-10 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black to-blue-300 opacity-70"></div>

        <div className="relative z-10">
          <h1 className="text-8xl font-bold mb-4 text-center">YMS</h1>
          <p className="text-gray-300 text-center max-w-md">
            Upravljanje trailerima u realnom vremenu
          </p>
        </div>
      </div>

      {/* DESNA STRANA */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-black to-blue-300 lg:bg-none lg:bg-gray-100 px-6">
        <div className="lg:hidden mb-12 text-center">
          <h1 className="text-5xl font-bold text-white mb-2">YMS</h1>

          <p className="text-gray-300 text-sm">
            Upravljanje trailerima u realnom vremenu
          </p>
        </div>

        {isLogin ? <Login /> : <Register />}

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-sm text-gray-100 lg:text-gray-600 underline"
        >
          {isLogin ? "Nemate nalog? Registrujte se" : "Imate nalog? Login"}
        </button>
        <button
          onClick={() => {
            localStorage.setItem("guest", "true");
            window.location.href = "/home";
          }}
          className="mt-4 text-sm text-gray-300 lg:text-gray-500 underline"
        >
          Nastavite kao Gost
        </button>
      </div>
    </div>
  );
}

export default Auth;
