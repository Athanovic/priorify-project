import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";
import useTasks from "../../hooks/useTasks";

// Mock the useToast hook
vi.mock("../../hooks/useToast", () => ({
  default: () => ({
    notify: vi.fn(),
  }),
}));

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

describe("useTasks hook", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it("should initialize with empty task list", () => {
    const { result } = renderHook(() => useTasks());
    expect(result.current.tasks).toEqual([]);
  });

  it("should add a new task", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask({
        id: Date.now(), // ADD ID HERE - your addTask might not generate it automatically
        title: "New Task",
        description: "Test Description",
        priority: "medium",
        dueDate: "2026-02-02",
      });
    });

    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0]).toMatchObject({
      title: "New Task",
      description: "Test Description",
      priority: "medium",
      dueDate: "2026-02-02",
    });
    expect(result.current.tasks[0].id).toBeDefined();
  });

  it("should update an existing task", () => {
    const { result } = renderHook(() => useTasks());

    // Add initial task with ID
    act(() => {
      result.current.addTask({ 
        id: Date.now(),
        title: "Old Task", 
        description: "", 
        priority: "medium" 
      });
    });

    const taskId = result.current.tasks[0].id;

    // Update task
    act(() => {
      result.current.updateTask(taskId, { title: "Updated Task" });
    });

    expect(result.current.tasks[0].title).toBe("Updated Task");
    expect(result.current.tasks[0].id).toBe(taskId); // ID remains the same
  });

  it("should delete a task", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask({ 
        id: Date.now(),
        title: "Task to delete", 
        description: "", 
        priority: "medium" 
      });
    });

    const taskId = result.current.tasks[0].id;

    act(() => {
      result.current.deleteTask(taskId);
    });

    expect(result.current.tasks.length).toBe(0);
  });

  it("should toggle task completion", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask({ 
        id: Date.now(),
        title: "Task to toggle", 
        description: "", 
        priority: "medium" 
      });
    });

    const taskId = result.current.tasks[0].id;

    act(() => {
      result.current.toggleComplete(taskId);
    });

    expect(result.current.tasks[0].completed).toBe(true);

    act(() => {
      result.current.toggleComplete(taskId);
    });

    expect(result.current.tasks[0].completed).toBe(false);
  });
});