import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, Shield, LayoutDashboard, LogOut, User as UserIcon, ChevronRight, Home } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const handleLogout = () => {
        setIsOpen(false);
        logout();
        navigate('/');
    };

    const navLinks = [
        { name: 'Home', path: '/', icon: <Home size={20} /> },
        ...(user 
            ? [{ name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> }] 
            : [])
    ];

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-[110] w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo Section */}
                        <div className="flex-shrink-0 z-[120]">
                            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group">
                                <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-6 transition-all duration-300 shadow-indigo-100 shadow-lg">
                                    <Shield className="text-white" size={20} />
                                </div>
                                <span className="text-xl font-bold tracking-tight text-slate-900">
                                    Secure Tasks
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <div className="flex items-center space-x-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`flex items-center gap-2 text-sm font-semibold transition-all ${
                                            location.pathname === link.path
                                                ? 'text-indigo-600'
                                                : 'text-slate-500 hover:text-indigo-600'
                                        }`}
                                    >
                                        {link.icon}
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            {user ? (
                                <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm font-bold text-slate-900">{user.name}</span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">
                                            {user.role}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                    >
                                        <LogOut size={18} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 px-3">
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="px-5 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-md"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </nav>

                        {/* Mobile Menu Button */}
                        <div className="flex md:hidden z-[120]">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar Overlay */}
            <div 
                className={`fixed inset-0 z-[105] bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Mobile Sidebar Menu */}
            <aside 
                className={`fixed inset-y-0 right-0 z-[106] w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full pt-20 pb-6 px-4">
                    {/* Auth Actions at the Top for Mobile */}
                    <div className="mb-6 space-y-3">
                        {user ? (
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                                    <UserIcon size={24} />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="font-bold text-slate-900 truncate">{user.name}</p>
                                    <p className="text-xs font-medium text-slate-500 uppercase">{user.role}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center py-3 rounded-xl font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center py-3 rounded-xl bg-indigo-600 text-white font-bold shadow-md shadow-indigo-100"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    <nav className="flex-1 space-y-1">
                        <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Navigation</p>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                                    location.pathname === link.path
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-slate-700 hover:bg-slate-50'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    {link.icon}
                                    {link.name}
                                </div>
                                <ChevronRight size={16} className="opacity-50" />
                            </Link>
                        ))}
                    </nav>

                    {/* Simple Logout at bottom only if user exists */}
                    {user && (
                        <div className="mt-auto border-t border-slate-100 pt-4">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 font-bold hover:bg-red-50 transition-all"
                            >
                                <LogOut size={20} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};

export default Navbar;