'use client';
import { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    fetch('http://localhost:5000/tasks')
      .then((res) => res.json())
      .then(setTasks)
      .catch(console.error);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <TaskForm onAdd={fetchTasks} />
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">🗓️ My Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onUpdate={fetchTasks} onDelete={fetchTasks} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No tasks found</p>
        )}
      </div>
    </div>
  );
}
