import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Auto-mark overdue tasks
async function updateOverdueTasks() {
  const today = new Date().toISOString().split('T')[0];
  await pool.query(
    "UPDATE tasks SET status='Overdue' WHERE due_date < ? AND status != 'Completed'",
    [today]
  );
}

// 🧾 Get all tasks
router.get('/', async (req, res) => {
  try {
    await updateOverdueTasks();
    const [rows] = await pool.query('SELECT * FROM tasks ORDER BY due_date ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➕ Add new task
router.post('/', async (req, res) => {
  const { title, subject, description, due_date, status } = req.body;
  if (!title || !subject || !due_date)
    return res.status(400).json({ error: 'Please fill in all required fields.' });

  try {
    const [result] = await pool.query(
      'INSERT INTO tasks (title, subject, description, due_date, status) VALUES (?, ?, ?, ?, ?)',
      [title, subject, description, due_date, status || 'Not Started']
    );
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔁 Update task status
router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await pool.query('UPDATE tasks SET status = ? WHERE id = ?', [status, id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ Delete task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
