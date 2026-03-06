import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, Shield, LayoutDashboard, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = user ? [
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    ] : [
        { name: 'Sign In', path: '/login' },
    ];

    return (
        /* Use fixed to ensure it stays at the top, and w-full to prevent shrinkage */
        <header className="fixed top-0 left-0 right-0 z-[100] w-full bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo Section */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-6 transition-all duration-300 shadow-indigo-100 shadow-lg">
                                <Shield className="text-white" size={20} />
                            </div>
                            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                                Secure Tasks
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {user ? (
                            <>
                                <div className="flex items-center space-x-6">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className={`flex items-center gap-2 text-sm font-semibold transition-all ${location.pathname === link.path
                                                    ? 'text-indigo-600 translate-y-[-1px]'
                                                    : 'text-slate-500 hover:text-indigo-600'
                                                }`}
                                        >
                                            {link.icon}
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>

                                <div className="h-6 w-px bg-slate-200 mx-2" />

                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm font-bold text-slate-900">{user.name}</span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 bg-indigo-50 px-1.5 rounded">
                                            {user.role}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        title="Logout"
                                        className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 border border-transparent hover:border-red-100"
                                    >
                                        <LogOut size={18} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-indigo-600">
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-md active:scale-95"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-xl text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-xl animate-in slide-in-from-top-4 duration-300">
                    <div className="px-4 py-6 space-y-4">
                        {user && (
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl mb-2">
                                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                                    <UserIcon size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">{user.name}</p>
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-tighter">{user.role} Account</p>
                                </div>
                            </div>
                        )}

                        <div className="space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                                >
                                    {link.icon}
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {!user ? (
                            <Link
                                to="/register"
                                className="block w-full text-center py-4 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-100"
                            >
                                Create Free Account
                            </Link>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 font-bold hover:bg-red-50 transition-all"
                            >
                                <LogOut size={20} />
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;