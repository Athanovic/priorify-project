import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import TaskForm from "../../components/TaskForm";

// Mock Notification API
beforeAll(() => {
  global.Notification = class {
    constructor(title) {
      this.title = title;
    }
    static permission = "granted";
    static requestPermission = vi.fn(() => Promise.resolve("granted"));
  };
});

describe("TaskForm Component", () => {
  let user;
  let mockOnSubmit;
  let mockOnCancel;

  beforeEach(() => {
    user = userEvent.setup();
    mockOnSubmit = vi.fn();
    mockOnCancel = vi.fn();
  });

  it("renders all input fields correctly", () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByLabelText(/Task Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Due Date/i)).toBeInTheDocument();

    const addButton = screen.getByRole("button", { name: /Add Task/i });
    const cancelButton = screen.getByRole("button", { name: /Cancel/i });

    expect(addButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it("should add a new task and reset form", async () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const titleInput = screen.getByLabelText(/Task Title/i);
    const descInput = screen.getByLabelText(/Description/i);
    const prioritySelect = screen.getByLabelText(/Priority/i);
    const dueDateInput = screen.getByLabelText(/Due Date/i);
    const submitButton = screen.getByTestId("add-task-button");

    await user.type(titleInput, "New Task");
    await user.type(descInput, "Task description");
    await user.selectOptions(prioritySelect, "high");
    await user.type(dueDateInput, "2026-02-02");

    fireEvent.click(submitButton);

    // Check that onSubmit was called with correct data
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "New Task",
        description: "Task description",
        priority: "high",
        dueDate: "2026-02-02",
      })
    );

    // After submit, form should reset
    expect(titleInput.value).toBe("");
    expect(descInput.value).toBe("");
    expect(prioritySelect.value).toBe("medium"); // default
    expect(dueDateInput.value).toBe("");
  });

  it("should generate unique ID for new tasks", async () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const titleInput = screen.getByLabelText(/Task Title/i);
    const submitButton = screen.getByTestId("add-task-button");

    await user.type(titleInput, "Task with ID");
    fireEvent.click(submitButton);

    // Check that the task was submitted with an ID
    expect(mockOnSubmit).toHaveBeenCalled();
    const submittedTask = mockOnSubmit.mock.calls[0][0];
    expect(submittedTask.id).toBeDefined();
    expect(typeof submittedTask.id).toBe("number");
  });

  it("should preserve ID when editing existing task", async () => {
    // Mock existing task
    const existingTask = {
      id: 42,
      title: "Existing Task",
      description: "Existing Description",
      priority: "low",
      dueDate: "2026-02-05",
    };

    render(
      <TaskForm
        initialData={existingTask}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    const titleInput = screen.getByLabelText(/Task Title/i);
    const submitButton = screen.getByRole("button", { name: /Update Task/i });

    expect(titleInput.value).toBe("Existing Task");

    await user.clear(titleInput);
    await user.type(titleInput, "Updated Task 42");
    fireEvent.click(submitButton);

    // Check that onSubmit was called with the same ID
    expect(mockOnSubmit).toHaveBeenCalled();
    const updatedTask = mockOnSubmit.mock.calls[0][0];
    expect(updatedTask.id).toBe(existingTask.id);
    expect(updatedTask.title).toBe("Updated Task 42");
  });

  it("Cancel button should close form or reset", async () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const titleInput = screen.getByLabelText(/Task Title/i);
    const cancelButton = screen.getByRole("button", { name: /Cancel/i });

    await user.type(titleInput, "Temporary Task");
    fireEvent.click(cancelButton);

    // Form should reset
    expect(titleInput.value).toBe("");
    // onCancel should be called
    expect(mockOnCancel).toHaveBeenCalled();
  });
});