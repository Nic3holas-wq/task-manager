
import { describe, it, expect, vi } from 'vitest';

import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import TaskForm from './TaskForm';

describe('TaskForm', () => {

  it('should render the task input and submit button', () => {

    render(<TaskForm onAddTask={() => {}} />);

    expect(
      screen.getByRole('textbox', { name: /task title/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /add task/i })
    ).toBeInTheDocument();

  });

  it('should allow users to enter a task', async () => {

    const user = userEvent.setup();

    render(<TaskForm onAddTask={() => {}} />);

    const input = screen.getByRole('textbox', {
      name: /task title/i
    });

    await user.type(input, 'Learn React Testing');

    expect(input).toHaveValue('Learn React Testing');

  });

  it('should call onAddTask when a task is submitted', async () => {

    const user = userEvent.setup();

    const mockAddTask = vi.fn();

    render(<TaskForm onAddTask={mockAddTask} />);

    const input = screen.getByRole('textbox', {
      name: /task title/i
    });

    await user.type(input, 'Learn Vitest');

    await user.click(
      screen.getByRole('button', { name: /add task/i })
    );

    expect(mockAddTask).toHaveBeenCalledWith('Learn Vitest');



  });

  it('should clear the input after a task is submitted', async () =>{
      const mockAddTask = vi.fn();
      const user = userEvent.setup();
      render(<TaskForm onAddTask={mockAddTask}/>);
      const input = screen.getByRole('textbox', {name: /task title/i});

    user.type(input, 'Learn React Testing');

    await user.click(
        screen.getByRole('button', { name: /add task/i})
    );

    expect(input).toHaveValue('');
  });

  
  it('should not submit an empty task', async () => {
    const user = userEvent.setup();
    const mockAddTask = vi.fn();
    render(<TaskForm onAddTask={mockAddTask}/>);
    await user.click(
        screen.getByRole('button', {name: /add task/i})
    );

    expect(mockAddTask).not.toHaveBeenCalled();
  });
it('should not submit whitespace-only tasks', async () => {
  const user = userEvent.setup();
  const mockAddTask = vi.fn();

  render(<TaskForm onAddTask={mockAddTask} />);

  const input = screen.getByRole('textbox', {
    name: /task title/i
  });

  await user.type(input, '   ');

  console.log('Actual value:', input.getAttribute('value'));
  console.log('Current value:', (input as HTMLInputElement).value);

  await user.click(
    screen.getByRole('button', { name: /add task/i })
  );

  expect(mockAddTask).not.toHaveBeenCalled();
});

});
