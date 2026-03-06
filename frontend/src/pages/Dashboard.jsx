import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import TaskModal from '../components/TaskModal';
import TaskCard from '../components/TaskCard';
import { Plus, LayoutGrid, AlertCircle, FolderOpen, Sparkles } from 'lucide-react';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const res = await api.get('/tasks');
            setTasks(res.data.data);
        } catch (err) {
            setError('We couldn’t sync your tasks. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateTask = async (taskData) => {
        try {
            await api.post('/tasks', taskData);
            fetchTasks();
            setIsModalOpen(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create task');
        }
    };

    const handleUpdateTask = async (id, taskData) => {
        try {
            await api.put(`/tasks/${id}`, taskData);
            fetchTasks();
            setIsModalOpen(false);
            setEditingTask(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update task');
        }
    };

    const handleDeleteTask = async (id) => {
        // Using a more modern approach than window.confirm for production is better, 
        // but for now, let's keep it functional.
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.delete(`/tasks/${id}`);
                fetchTasks();
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete task');
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                            <LayoutGrid className="text-indigo-600" size={28} />
                            Your Workspace
                        </h1>
                        <p className="text-slate-500 mt-1 font-medium">
                            Welcome back, {user?.name.split(' ')[0]}! You have {tasks.length} active tasks.
                        </p>
                    </div>
                    
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center justify-center px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-95 gap-2"
                    >
                        <Plus size={20} />
                        Create New Task
                    </button>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-8 flex items-center gap-3 bg-red-50 border border-red-100 p-4 rounded-2xl text-red-700 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle size={20} />
                        <p className="text-sm font-semibold">{error}</p>
                    </div>
                )}

                {/* Main Content Area */}
                {loading ? (
                    <div className="flex flex-col justify-center items-center py-24">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                        </div>
                        <p className="mt-4 text-slate-400 font-medium text-sm animate-pulse">Syncing your data...</p>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm">
                        <div className="p-4 bg-indigo-50 rounded-full mb-4">
                            <FolderOpen className="text-indigo-400" size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">It's quiet in here</h3>
                        <p className="text-slate-500 mt-2 mb-8 text-center max-w-xs">
                            Your task list is empty. Start organizing your day by creating your first secure task.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all"
                        >
                            <Sparkles size={18} />
                            Get Started
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-500">
                        {tasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onEdit={() => {
                                    setEditingTask(task);
                                    setIsModalOpen(true);
                                }}
                                onDelete={() => handleDeleteTask(task._id)}
                                isAdmin={user?.role === 'admin'}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Modal Logic */}
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingTask(null);
                }}
                onSubmit={editingTask 
                    ? (data) => handleUpdateTask(editingTask._id, data) 
                    : handleCreateTask
                }
                editingTask={editingTask}
            />
        </div>
    );
};

export default Dashboard;