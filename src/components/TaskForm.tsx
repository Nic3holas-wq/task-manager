
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
        id="task-title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter a task"
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
