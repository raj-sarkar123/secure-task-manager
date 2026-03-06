import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShieldCheck } from 'lucide-react'; // Consistency with the navbar branding

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-slate-50/50 backdrop-blur-sm">
                <div className="relative flex items-center justify-center">
                    {/* Outer pulse rings for a "high-tech" security feel */}
                    <div className="absolute animate-ping h-20 w-20 rounded-full bg-indigo-400 opacity-20"></div>
                    <div className="absolute animate-pulse h-14 w-14 rounded-full bg-indigo-500 opacity-10"></div>
                    
                    {/* The main icon loader */}
                    <div className="relative bg-white p-4 rounded-2xl shadow-xl border border-slate-100">
                        <ShieldCheck className="text-indigo-600 animate-bounce" size={32} />
                    </div>
                </div>
                <p className="mt-6 text-slate-500 font-medium animate-pulse tracking-wide text-sm">
                    Securing your session...
                </p>
            </div>
        );
    }

    if (!user) {
        // We include state so we can redirect them back to the page they tried to visit after login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <div className="animate-in fade-in duration-500">
            {children}
        </div>
    );
};

export default ProtectedRoute;