import React from 'react';
import { Pencil, Trash2, User, Clock, AlertCircle } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, isAdmin }) => {
    // Helper for priority colors
    const getPriorityStyles = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high': return 'bg-red-50 text-red-700 border-red-100';
            case 'medium': return 'bg-amber-50 text-amber-700 border-amber-100';
            default: return 'bg-emerald-50 text-emerald-700 border-emerald-100';
        }
    };

    return (
        <div className="group bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden">
            {/* Top accent bar based on priority (optional) */}
            <div className={`h-1 w-full ${task.priority === 'high' ? 'bg-red-500' : 'bg-indigo-500'}`} />
            
            <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-3">
                    {/* Priority Badge */}
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getPriorityStyles(task.priority)}`}>
                        {task.priority || 'Normal'}
                    </span>
                    
                    {/* Date/Time info */}
                    <div className="flex items-center text-slate-400 text-xs">
                        <Clock size={12} className="mr-1" />
                        <span>{new Date(task.createdAt).toLocaleDateString() || 'Today'}</span>
                    </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1" title={task.title}>
                    {task.title}
                </h3>
                
                <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                    {task.description || <span className="italic text-slate-300">No details provided for this task.</span>}
                </p>

                {isAdmin && task.createdBy?.name && (
                    <div className="mt-4 flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="h-7 w-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                            <User size={14} />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-[11px] font-semibold text-slate-700 truncate">{task.createdBy.name}</p>
                            <p className="text-[9px] text-slate-500 truncate">{task.createdBy.email}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Actions Footer */}
            <div className="px-5 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-2">
                <button
                    onClick={onEdit}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                >
                    <Pencil size={14} />
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                    <Trash2 size={14} />
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;