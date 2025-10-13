'use client';
import { CheckCircle, Clock, AlertTriangle, XCircle, Trash2 } from 'lucide-react';

const statusStyles = {
  'Not Started': 'bg-red-100 text-red-700 border-red-400',
  'In Progress': 'bg-yellow-100 text-yellow-700 border-yellow-400',
  'Completed': 'bg-green-100 text-green-700 border-green-400',
  'Overdue': 'bg-gray-100 text-gray-700 border-gray-400',
};

const icons = {
  'Not Started': <XCircle size={18} />,
  'In Progress': <Clock size={18} />,
  'Completed': <CheckCircle size={18} />,
  'Overdue': <AlertTriangle size={18} />,
};

export default function TaskCard({ task, onUpdate, onDelete }) {
  const handleStatusChange = async (newStatus) => {
    await fetch(`http://localhost:5000/tasks/${task.id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    onUpdate();
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:5000/tasks/${task.id}`, { method: 'DELETE' });
    onDelete();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 border relative">
      <h2 className="text-lg font-bold mb-1">{task.title}</h2>
      <p className="text-sm text-gray-500 mb-2">📘 {task.subject}</p>
      <p className="text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      <p className="text-sm text-gray-500 mb-3">📅 Due: {task.due_date}</p>

      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border ${statusStyles[task.status]}`}>
        {icons[task.status]} {task.status}
      </div>

      <div className="flex gap-2 mt-3">
        <button onClick={() => handleStatusChange('In Progress')} className="text-yellow-600 hover:underline text-sm">
          In Progress
        </button>
        <button onClick={() => handleStatusChange('Completed')} className="text-green-600 hover:underline text-sm">
          Completed
        </button>
        <button onClick={handleDelete} className="text-red-600 hover:underline text-sm flex items-center gap-1">
          <Trash2 size={14} /> Delete
        </button>
      </div>
    </div>
  );
}
