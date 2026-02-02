import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from '../../components/TaskCard';

describe('TaskCard Component', () => {
  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    priority: 'high',
    dueDate: '2024-12-31',
    completed: false,
  };

  const mockHandlers = {
    onToggleComplete: vi.fn(),
    onEdit: vi.fn(),
    onDelete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render task title', () => {
    render(<TaskCard task={mockTask} {...mockHandlers} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('should render task description', () => {
    render(<TaskCard task={mockTask} {...mockHandlers} />);
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should render priority badge', () => {
    render(<TaskCard task={mockTask} {...mockHandlers} />);
    expect(screen.getByText('HIGH')).toBeInTheDocument();
  });

  it('should render due date', () => {
    render(<TaskCard task={mockTask} {...mockHandlers} />);
    expect(screen.getByText('12/31/2024')).toBeInTheDocument();
  });

  it('should call onToggleComplete when completion button is clicked', () => {
    render(<TaskCard task={mockTask} {...mockHandlers} />);
    
    const toggleButton = screen.getByLabelText('Mark as complete');
    fireEvent.click(toggleButton);

    expect(mockHandlers.onToggleComplete).toHaveBeenCalledWith(1);
    expect(mockHandlers.onToggleComplete).toHaveBeenCalledTimes(1);
  });

  it('should call onEdit when edit button is clicked', () => {
    render(<TaskCard task={mockTask} {...mockHandlers} />);
    
    const editButton = screen.getByLabelText('Edit task');
    fireEvent.click(editButton);

    expect(mockHandlers.onEdit).toHaveBeenCalledWith(mockTask);
    expect(mockHandlers.onEdit).toHaveBeenCalledTimes(1);
  });

  it('should call onDelete when delete button is clicked', () => {
    render(<TaskCard task={mockTask} {...mockHandlers} />);
    
    const deleteButton = screen.getByLabelText('Delete task');
    fireEvent.click(deleteButton);

    expect(mockHandlers.onDelete).toHaveBeenCalledWith(1);
    expect(mockHandlers.onDelete).toHaveBeenCalledTimes(1);
  });

  it('should render completed task with strikethrough', () => {
    const completedTask = { ...mockTask, completed: true };
    render(<TaskCard task={completedTask} {...mockHandlers} />);
    
    const title = screen.getByText('Test Task');
    expect(title).toHaveClass('line-through');
  });

  it('should show CheckCircle icon when task is completed', () => {
    const completedTask = { ...mockTask, completed: true };
    render(<TaskCard task={completedTask} {...mockHandlers} />);
    
    const toggleButton = screen.getByLabelText('Mark as incomplete');
    expect(toggleButton).toBeInTheDocument();
  });

  it('should render high priority badge with correct color', () => {
    render(<TaskCard task={mockTask} {...mockHandlers} />);
    
    const badge = screen.getByText('HIGH');
    expect(badge).toHaveClass('bg-red-100', 'text-red-700');
  });

  it('should render medium priority badge with correct color', () => {
    const mediumTask = { ...mockTask, priority: 'medium' };
    render(<TaskCard task={mediumTask} {...mockHandlers} />);
    
    const badge = screen.getByText('MEDIUM');
    expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-700');
  });

  it('should render low priority badge with correct color', () => {
    const lowTask = { ...mockTask, priority: 'low' };
    render(<TaskCard task={lowTask} {...mockHandlers} />);
    
    const badge = screen.getByText('LOW');
    expect(badge).toHaveClass('bg-gray-100', 'text-gray-700');
  });

  it('should not render description if not provided', () => {
    const taskWithoutDesc = { ...mockTask, description: '' };
    render(<TaskCard task={taskWithoutDesc} {...mockHandlers} />);
    
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });

  it('should not render priority badge if not provided', () => {
    const taskWithoutPriority = { ...mockTask, priority: '' };
    render(<TaskCard task={taskWithoutPriority} {...mockHandlers} />);
    
    expect(screen.queryByText(/HIGH|MEDIUM|LOW/)).not.toBeInTheDocument();
  });

  it('should not render due date if not provided', () => {
    const taskWithoutDate = { ...mockTask, dueDate: '' };
    render(<TaskCard task={taskWithoutDate} {...mockHandlers} />);
    
    expect(screen.queryByText(/\/\d{2}\/\d{4}/)).not.toBeInTheDocument();
  });

  it('should render dark mode classes correctly', () => {
    const { container } = render(<TaskCard task={mockTask} {...mockHandlers} />);
    
    const card = container.firstChild;
    expect(card).toHaveClass('dark:border-gray-700', 'dark:hover:border-indigo-600');
  });
});