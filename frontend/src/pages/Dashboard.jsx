import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import TaskModal from "../components/TaskModal";
import TaskCard from "../components/TaskCard";
import { Plus, Layout, AlertCircle, Inbox, Sparkles } from "lucide-react";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data.data);
      } catch {
        setError("Unable to sync workspace.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      const res = await api.post("/tasks", taskData);

      const newTask = {
        ...res.data.data,
        createdBy: res.data.data.createdBy?.name
          ? res.data.data.createdBy
          : user,
      };

      setTasks((prev) => [newTask, ...prev]);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const res = await api.put(`/tasks/${id}`, taskData);

      const updatedTask = {
        ...res.data.data,
        createdBy: res.data.data.createdBy?.name
          ? res.data.data.createdBy
          : user,
      };

      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task))
      );

      setIsModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch {
      setError("Delete operation failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">

      <main className="max-w-6xl mx-auto px-6 py-16">

        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mb-14">

          <div>
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <Layout size={18} strokeWidth={2.5} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">
                Workspace
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Hello, {user?.name?.split(" ")[0]}
            </h1>

            <p className="text-slate-500 mt-1 font-medium">
              You have{" "}
              <span className="font-semibold text-slate-800">
                {tasks.length}
              </span>{" "}
              tasks to review today.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200 active:scale-[0.97]"
          >
            <Plus size={18} />
            New Task
          </button>

        </header>


        {/* Error */}
        {error && (
          <div className="mb-10 flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-xl shadow-sm">

            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle size={18} />
              <span className="text-sm font-semibold">{error}</span>
            </div>

            <button
              onClick={() => setError("")}
              className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700"
            >
              Dismiss
            </button>

          </div>
        )}


        {/* Content */}
        {loading ? (

          <div className="flex flex-col items-center justify-center py-32 space-y-4">

            <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>

            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Loading workspace...
            </span>

          </div>

        ) : tasks.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-slate-200 shadow-sm">

            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <Inbox className="text-slate-400" size={32} />
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              Everything's clear
            </h2>

            <p className="text-slate-500 mt-2 mb-8 text-center max-w-xs font-medium">
              Enjoy your empty inbox, or create a new task to get ahead.
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition"
            >
              <Sparkles size={18} />
              Add Task
            </button>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={() => {
                  setEditingTask(task);
                  setIsModalOpen(true);
                }}
                onDelete={() => handleDeleteTask(task._id)}
                isAdmin={user?.role === "admin"}
              />
            ))}

          </div>

        )}

      </main>


      {/* Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={
          editingTask
            ? (data) => handleUpdateTask(editingTask._id, data)
            : handleCreateTask
        }
        editingTask={editingTask}
      />

    </div>
  );
};

export default Dashboard;