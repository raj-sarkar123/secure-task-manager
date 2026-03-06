import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900">
          {/* Navbar is fixed, so it stays at the top */}
          <Navbar />

          {/* The main wrapper: 
            1. pt-16 (Padding Top) pushes content down so the fixed Navbar doesn't cover it.
            2. flex-grow ensures the page fills the screen even with little content.
          */}
          <main className="flex-grow pt-16">
            <div className="animate-in fade-in duration-700">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </main>

          {/* Optional: Modern Footer (Recommended for UX) */}
          <footer className="py-8 bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-slate-400 text-sm font-medium">
                © 2026 Secure Tasks • Built with MERN Stack
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;