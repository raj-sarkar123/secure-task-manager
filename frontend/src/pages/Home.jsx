import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Shield, Users, Zap, ArrowRight } from 'lucide-react';

const Home = () => {
    const { user, loading } = useContext(AuthContext);

    // Modern Loading State
    if (loading) {
        return (
            /* Updated background to match the new theme */
            <div className="flex flex-col justify-center items-center min-h-[80vh] bg-slate-50 bg-dot-pattern">
                <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin shadow-lg"></div>
                <p className="mt-4 text-slate-500 font-medium animate-pulse">Initializing Security...</p>
            </div>
        );
    }

    return (
        /* The main container now has the texture and base tint */
        <div className="flex-grow overflow-x-hidden bg-slate-50 bg-dot-pattern text-slate-900">

            {/* Hero Section - now transparent to show the base pattern */}
            <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-36 px-4 bg-transparent">
                <div className="max-w-7xl mx-auto text-center relative z-10 animate-in fade-in duration-700">

                    {/* Release Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100/70 backdrop-blur-sm border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-8">
                        <Zap size={14} className="fill-indigo-500 text-indigo-500" />
                        Platform v1.0 is Live
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                        Manage tasks with <br className="hidden md:block" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500">
                            unrivaled security.
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-12 leading-relaxed">
                        A robust, full-stack workflow solution for professional teams. Organize projects securely with JWT authentication and dedicated Role-Based Access Control.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        {user ? (
                            <Link
                                to="/dashboard"
                                className="group flex items-center gap-2.5 px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
                            >
                                Enter Workspace
                                <ArrowRight size={19} className="group-hover:translate-x-1.5 transition-transform" />
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/register"
                                    className="w-full sm:w-auto px-10 py-4 bg-slate-950 text-white font-bold rounded-2xl shadow-lg hover:bg-slate-800 transition-all active:scale-95 text-center"
                                >
                                    Get Started for Free
                                </Link>
                                <Link
                                    to="/login"
                                    className="w-full sm:w-auto px-10 py-4 bg-white/70 backdrop-blur-sm text-slate-800 font-bold rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:text-indigo-600 hover:bg-white transition-all text-center"
                                >
                                    Access Workspace
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Background Decor - Blobs and Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none">
                    {/* Soft gradient overall */}
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-transparent to-transparent"></div>

                    {/* Blurred Blobs */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200 rounded-full blur-[140px] opacity-40 animate-pulse" />
                    <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-violet-100 rounded-full blur-[160px] opacity-50" />
                </div>
            </section>

            {/* Feature Highlights Section */}
            {/* The base tint is still Slate, but cards are white */}
            <section className="relative py-28 px-4 border-t border-slate-200/70">

                {/* Texture applies here too */}
                <div className="absolute inset-0 bg-dot-pattern opacity-60"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-18 max-w-xl mx-auto">
                        <h2 className="text-4xl font-extrabold text-slate-950 tracking-tight">Why Choose Secure Tasks?</h2>
                        <p className="text-slate-600 mt-4 text-lg font-medium leading-relaxed">
                            Built for scale, speed, and absolute data isolation using the modern MERN stack.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                        {/* Feature Cards: Keep bg-white for contrast */}
                        {[
                            { icon: Shield, color: 'indigo', title: 'JWT Authentication', desc: 'Industry-standard stateless authentication. Your session is encrypted and securely stored, preventing unauthorized access.' },
                            { icon: Users, color: 'emerald', title: 'RBAC Controls', desc: 'Built-in Role-Based Access Control allows you to distinguish between Team Leads (Admins) and Members with specific permissions.' },
                            { icon: Zap, color: 'amber', title: 'Fast & Reactive', desc: 'Powered by a modern React frontend and optimized API, ensuring rapid load times and instantly responsive actions.' }
                        ].map((feat, idx) => (
                            <div key={idx} className="bg-white p-10 rounded-3xl border border-slate-200/60 shadow-lg shadow-slate-100/70 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
                                <div className={`w-14 h-14 bg-${feat.color}-50 text-${feat.color}-600 rounded-2xl flex items-center justify-center mb-8 border border-${feat.color}-100 group-hover:scale-110 transition-transform shadow-inner shadow-${feat.color}-100/50`}>
                                    <feat.icon size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-950 mb-4 tracking-tight">{feat.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-base">
                                    {feat.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;