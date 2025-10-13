CREATE DATABASE IF NOT EXISTS personal_task_db;
USE personal_task_db;

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  subject VARCHAR(100),
  description TEXT,
  due_date DATE,
  status ENUM('Not Started', 'In Progress', 'Completed', 'Overdue') DEFAULT 'Not Started'
);

INSERT INTO tasks (title, subject, description, due_date, status)
VALUES
('Math Homework', 'Mathematics', 'Complete algebra exercises', '2025-10-16', 'In Progress'),
('Science Project', 'Science', 'Build volcano model', '2025-10-20', 'Not Started'),
('Essay Writing', 'English', 'Write about renewable energy', '2025-10-18', 'Completed');
