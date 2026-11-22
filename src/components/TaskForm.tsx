
import { useState } from 'react';

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {

  const [title, setTitle] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    onAddTask(trimmedTitle);
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task-title">Task title</label>

      <input
      className="border border-gray-300 rounded px-2 py-1 mr-2"
        id="task-title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter a task"
      />

      <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
