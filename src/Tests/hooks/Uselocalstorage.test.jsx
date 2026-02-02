import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../../hooks/useLocalStorage';

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with default value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));
    expect(result.current[0]).toBe('defaultValue');
  });

  it('should initialize with value from localStorage if it exists', () => {
    localStorage.setItem('testKey', JSON.stringify('storedValue'));
    
    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));
    expect(result.current[0]).toBe('storedValue');
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));
    
    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(JSON.parse(localStorage.getItem('testKey'))).toBe('updated');
  });

  it('should handle objects correctly', () => {
    const initialObject = { name: 'Test', count: 0 };
    const { result } = renderHook(() => useLocalStorage('objectKey', initialObject));
    
    expect(result.current[0]).toEqual(initialObject);

    const updatedObject = { name: 'Updated', count: 5 };
    
    act(() => {
      result.current[1](updatedObject);
    });

    expect(result.current[0]).toEqual(updatedObject);
    expect(JSON.parse(localStorage.getItem('objectKey'))).toEqual(updatedObject);
  });

  it('should handle arrays correctly', () => {
    const initialArray = [1, 2, 3];
    const { result } = renderHook(() => useLocalStorage('arrayKey', initialArray));
    
    expect(result.current[0]).toEqual(initialArray);

    const updatedArray = [4, 5, 6];
    
    act(() => {
      result.current[1](updatedArray);
    });

    expect(result.current[0]).toEqual(updatedArray);
    expect(JSON.parse(localStorage.getItem('arrayKey'))).toEqual(updatedArray);
  });

  it('should handle boolean values', () => {
    const { result } = renderHook(() => useLocalStorage('boolKey', false));
    
    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
    expect(JSON.parse(localStorage.getItem('boolKey'))).toBe(true);
  });

  it('should handle number values', () => {
    const { result } = renderHook(() => useLocalStorage('numberKey', 42));
    
    expect(result.current[0]).toBe(42);

    act(() => {
      result.current[1](100);
    });

    expect(result.current[0]).toBe(100);
    expect(JSON.parse(localStorage.getItem('numberKey'))).toBe(100);
  });

  it('should support functional updates', () => {
    const { result } = renderHook(() => useLocalStorage('counter', 0));
    
    act(() => {
      result.current[1](prev => prev + 1);
    });

    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1](prev => prev + 5);
    });

    expect(result.current[0]).toBe(6);
  });

  it('should handle corrupt localStorage data gracefully', () => {
    localStorage.setItem('corruptKey', 'not valid JSON');
    
    const { result } = renderHook(() => useLocalStorage('corruptKey', 'fallback'));
    
    // Should fall back to default value when parsing fails
    expect(result.current[0]).toBe('fallback');
  });

  it('should handle null values', () => {
    const { result } = renderHook(() => useLocalStorage('nullKey', null));
    
    expect(result.current[0]).toBe(null);

    act(() => {
      result.current[1]('not null');
    });

    expect(result.current[0]).toBe('not null');
  });
});