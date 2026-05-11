import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import IngateForm from "./components/IngateForm";
import TrailerTable from "./components/TrailerTable";
import History from "./components/History";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Background from "./components/Background";
import About from "./pages/About";
import Contact from "./pages/Contact";
import GuestRestricted from "./pages/GuestRestricted";

function App() {
  return (
    <Router>
      <Background />
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<Auth />} />

        {/* PROTECTED */}

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ingate"
          element={
            localStorage.getItem("guest") ? (
              <GuestRestricted />
            ) : (
              <ProtectedRoute>
                <IngateForm />
              </ProtectedRoute>
            )
          }
        />

        <Route
          path="/pool"
          element={
            <ProtectedRoute>
              <TrailerTable />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
