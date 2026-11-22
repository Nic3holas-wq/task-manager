import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TaskList from './TaskList';
import type { Task } from '../types/task';

describe('TaskList', () => {
    const tasks: Task[]= [
        {
            id: 1,
            title: 'Learn React',
            completed: false
        },
        {
            id: 2,
            title: 'Learn TypeScript',
            completed: true
        }
    ];

    it('should show No tasks available when the task list is empty', () => {
        const emptyTasks: Task[] = [];
        render(
            <TaskList tasks={emptyTasks} onToggle={() => {}} onDelete={() => {}}/>
        );
        expect(
            screen.getByText('No tasks available.')
        ).toBeInTheDocument();
    });

    it('should render the list of tasks', () => {
        render(
            <TaskList tasks={tasks} onToggle={() => {}} onDelete={() => {}}/>
        );
        expect(
            screen.getByText('Learn React')
        ).toBeInTheDocument();
        expect(
            screen.getByText('Learn TypeScript')
        ).toBeInTheDocument();

    });

    it('should call onToggle with the task ID when Complete is clicked', async () => {
        const user = userEvent.setup();
        const mockToggle = vi.fn();
        
        render(
            <TaskList tasks={tasks} onToggle={mockToggle} onDelete={() => {}}/>
        );
        const completeButton = screen.getByRole('button', {name: /complete/i});
        await user.click(completeButton);
        expect(mockToggle).toHaveBeenCalledWith(tasks[0].id);
    });

    it('should call onDelete with the task ID when Delete is clicked', async () => {
        const user = userEvent.setup();
        const mockDelete = vi.fn();

        render(
            <TaskList tasks={tasks} onToggle={() => {}} onDelete={mockDelete}/>
        );
        const deleteButton = screen.getByRole('button', {name: /delete/i});
        await user.click(deleteButton);
        expect(mockDelete).toHaveBeenCalledWith(tasks[0].id);
    });
});