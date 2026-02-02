import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useSettings from '../../hooks/useSettings';

describe('useSettings Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with default light theme', () => {
    const { result } = renderHook(() => useSettings());
    expect(result.current.theme).toBe('light');
  });

  it('should initialize with default notifications enabled', () => {
    const { result } = renderHook(() => useSettings());
    expect(result.current.notificationsEnabled).toBe(true);
  });

  it('should toggle theme from light to dark', () => {
    const { result } = renderHook(() => useSettings());
    
    expect(result.current.theme).toBe('light');

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('dark');
  });

  it('should toggle theme from dark to light', () => {
    localStorage.setItem('theme', JSON.stringify('dark'));
    
    const { result } = renderHook(() => useSettings());
    
    expect(result.current.theme).toBe('dark');

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('light');
  });

  it('should toggle notifications on and off', () => {
    const { result } = renderHook(() => useSettings());
    
    expect(result.current.notificationsEnabled).toBe(true);

    act(() => {
      result.current.toggleNotifications();
    });

    expect(result.current.notificationsEnabled).toBe(false);

    act(() => {
      result.current.toggleNotifications();
    });

    expect(result.current.notificationsEnabled).toBe(true);
  });

  it('should persist theme to localStorage', () => {
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.toggleTheme();
    });

    const storedTheme = JSON.parse(localStorage.getItem('theme'));
    expect(storedTheme).toBe('dark');
  });

  it('should persist notifications preference to localStorage', () => {
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.toggleNotifications();
    });

    const storedNotifications = JSON.parse(localStorage.getItem('notificationsEnabled'));
    expect(storedNotifications).toBe(false);
  });

  it('should load theme from localStorage on initialization', () => {
    localStorage.setItem('theme', JSON.stringify('dark'));

    const { result } = renderHook(() => useSettings());

    expect(result.current.theme).toBe('dark');
  });

  it('should load notifications preference from localStorage on initialization', () => {
    localStorage.setItem('notificationsEnabled', JSON.stringify(false));

    const { result } = renderHook(() => useSettings());

    expect(result.current.notificationsEnabled).toBe(false);
  });

  it('should reset app and clear localStorage', () => {
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.toggleTheme();
      result.current.toggleNotifications();
    });

    // Verify data is stored
    expect(localStorage.getItem('theme')).toBeTruthy();
    expect(localStorage.getItem('notificationsEnabled')).toBeTruthy();

    // Mock window.location.reload
    const reloadSpy = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadSpy },
      writable: true,
    });

    act(() => {
      result.current.resetApp();
    });

    // Verify localStorage was cleared
    expect(localStorage.getItem('theme')).toBeNull();
    expect(localStorage.getItem('notificationsEnabled')).toBeNull();
  });
});