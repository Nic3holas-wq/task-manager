import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li>
      <span>{task.title}</span>

      <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700" onClick={() => onToggle(task.id)}>
        {task.completed ? 'Undo' : 'Complete'}
      </button>

      <button className=" text-xs bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  );
}

export default TaskItem;