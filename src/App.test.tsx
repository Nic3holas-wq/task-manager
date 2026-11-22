import { describe, it, expect } from 'vitest';

describe('My first test', () => {

  it('should verify that 2 + 2 equals 4', () => {

    expect(2 + 2).toBe(4);

  });
  it('should verify that a task is not completed initially', () => {

  const task = {
    title: 'Learn React Testing',
    completed: false
  };

  expect(task.completed).toBe(false);

});

});