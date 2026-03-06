import React, { useState } from 'react';
import { Pencil, Trash2, User, Clock, ShieldAlert, BookOpen, X, AlertTriangle } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, isAdmin, isReadOnly }) => {
    const [showReadOnly, setShowReadOnly] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const getPriorityStyles = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high': return 'bg-red-50 text-red-700 border-red-100';
            case 'medium': return 'bg-amber-50 text-amber-700 border-amber-100';
            default: return 'bg-emerald-50 text-emerald-700 border-emerald-100';
        }
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setShowDeleteConfirm(true);
    };

    const confirmDelete = (e) => {
        e.stopPropagation();
        onDelete();
        setShowDeleteConfirm(false);
    };

    return (
        <>
            <div 
                onClick={() => setShowReadOnly(true)}
                className={`group bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden cursor-pointer ${isReadOnly ? 'opacity-95' : ''}`}
            >
                <div className={`h-1.5 w-full ${task.priority === 'high' ? 'bg-red-500' : 'bg-indigo-500'}`} />
                
                <div className="p-5 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getPriorityStyles(task.priority)}`}>
                                {task.priority || 'Normal'}
                            </span>
                        </div>
                        <div className="flex items-center text-slate-400 text-xs">
                            <Clock size={12} className="mr-1" />
                            <span>{new Date(task.createdAt).toLocaleDateString() || 'Today'}</span>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {task.title}
                    </h3>
                    
                    <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed mb-4">
                        {task.description || <span className="italic text-slate-300">No details provided for this task.</span>}
                    </p>

                    {(isAdmin || isReadOnly) && task.createdBy?.name && (
                        <div className="mt-auto flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100/80">
                            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                                <User size={14} />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-[11px] font-bold text-slate-900 truncate">{task.createdBy.name}</p>
                                <p className="text-[9px] font-medium text-slate-500 uppercase">Created By {task.createdBy.role || "User"}</p>
                            </div>
                        </div>
                    )}
                </div>

                {!isReadOnly ? (
                    <div className="px-5 py-3.5 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); onEdit(); }}
                            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                        >
                            <Pencil size={14} /> Edit
                        </button>
                        <button
                            onClick={handleDeleteClick}
                            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                            <Trash2 size={14} /> Delete
                        </button>
                    </div>
                ) : (
                    <div className="px-5 py-3.5 bg-slate-50/30 border-t border-slate-100/50 flex items-center justify-center">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <ShieldAlert size={14} /> Permissions Restricted
                        </span>
                    </div>
                )}
            </div>

            {/* --- CUSTOM DELETE CONFIRMATION POPUP --- */}
            {showDeleteConfirm && (
                <div 
                    className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(false); }}
                >
                    <div 
                        className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-6 animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full text-red-600">
                            <AlertTriangle size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-center text-slate-900 mb-2">Delete Task?</h3>
                        <p className="text-sm text-center text-slate-500 mb-6">
                            Are you sure you want to delete <span className="font-bold text-slate-700">"{task.title}"</span>? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button 
                                onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(false); }}
                                className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmDelete}
                                className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200 transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- READ ONLY OVERLAY --- */}
            {showReadOnly && !showDeleteConfirm && (
                <div 
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setShowReadOnly(false)}
                >
                    <div 
                        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div className="flex items-center gap-2 text-indigo-600">
                                <BookOpen size={18} />
                                <span className="text-xs font-bold uppercase tracking-widest">Reading Mode</span>
                            </div>
                            <button onClick={() => setShowReadOnly(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-8 max-h-[70vh] overflow-y-auto">
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 leading-tight">{task.title}</h2>
                            <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap">{task.description || "No description."}</p>
                        </div>
                        <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm text-indigo-600">
                                <User size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">{task.createdBy?.name || 'System'}</p>
                                <p className="text-xs text-slate-500">Task Owner • {new Date(task.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TaskCard;