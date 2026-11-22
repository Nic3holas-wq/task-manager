
import { useState } from 'react';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

import type { Task } from './types/task';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Add a new task
  function handleAddTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTasks((previousTasks) => [
      ...previousTasks,
      newTask,
    ]);
  }

  // Toggle task completion
  function handleToggleTask(id: number) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  // Delete a task
  function handleDeleteTask(id: number) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  }

  return (
    <main>
      <h1 className='text-emerald-600'>Task Manager</h1>

      <TaskForm onAddTask={handleAddTask} />

      <TaskList
        tasks={tasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />
    </main>
  );
}

export default App;
