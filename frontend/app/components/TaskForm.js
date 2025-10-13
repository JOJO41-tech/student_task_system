'use client';
import { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [form, setForm] = useState({
    title: '',
    subject: '',
    description: '',
    due_date: '',
    status: 'Not Started',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      onAdd();
      setForm({ title: '', subject: '', description: '', due_date: '', status: 'Not Started' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-8 border">
      <h2 className="text-xl font-semibold mb-4">➕ Add New Task</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="title" placeholder="Task Title" value={form.title} onChange={handleChange}
          className="border p-2 rounded w-full" required />
        <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange}
          className="border p-2 rounded w-full" required />
        <input type="date" name="due_date" value={form.due_date} onChange={handleChange}
          className="border p-2 rounded w-full" required />
        <select name="status" value={form.status} onChange={handleChange} className="border p-2 rounded w-full">
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange}
        className="border p-2 rounded w-full mt-4" rows={3}></textarea>
      <button type="submit" className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
        Add Task
      </button>
    </form>
  );
}
