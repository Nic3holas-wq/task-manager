import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TaskItem from './TaskItem';
import type { Task } from '../types/task';

describe('TaskItem', () => {
  const task: Task = {
    id: 1,
    title: 'Learn React',
    completed: false,
  };

  it('should render the task title', async () => {
    // const user = userEvent.setup();
    render(
        <TaskItem task={task} onToggle={() => {} } onDelete={() =>{}}/>
    );
    const titleElement = screen.getByText(task.title);
    expect(titleElement).toBeInTheDocument();
  });

  it('should show Complete button when task is not completed', async () => {
    const user = userEvent.setup()
    render(
        <TaskItem task={task} onToggle={() => {} } onDelete={() =>{}}/>
    );
    const completeButton = screen.getByRole('button', {name: /complete/i});
    expect(completeButton).toBeInTheDocument();
  });
    it('should show Undo button when task is completed', async () => {
        const completedTask: Task = {
            id:2,
            title: 'Learn Testing',
            completed: true
        };
        render(
            <TaskItem task={completedTask} onToggle={() => {} } onDelete={() =>{}}/>
        );

        expect(
          screen.getByRole('button', { name: /undo/i})  
        ).toBeInTheDocument();
    
  });

  it('should call onToggle with the task ID when Complete is clicked', async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();

    render(
        <TaskItem task={task} onToggle={mockToggle} onDelete={() =>{}}/>
    );
    const completeButton = screen.getByRole('button', {name: /complete/i});
    await user.click(completeButton);
    expect(mockToggle).toHaveBeenCalledWith(task.id);
});
  it('should call onDelete with the task ID when Delete is clicked', async () => {
    const user = userEvent.setup();
    const mockDelete = vi.fn();
    
    render(
        <TaskItem task={task} onToggle={() => {} } onDelete={mockDelete}/>
    );
    const deleteButton = screen.getByRole('button', {name: /delete/i});
    await user.click(deleteButton);
    expect(mockDelete).toHaveBeenCalledWith(task.id);
});
});