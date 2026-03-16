import { useState, useEffect, useCallback } from 'react';

export interface CellarTask {
  id: string;
  title: string;
  note: string;
  dueDate: string; // ISO string
  completed: boolean;
  notified: boolean;
  createdAt: number;
}

const STORAGE_KEY = 'winecalc_cellar_tasks';

export const useCellarTasks = () => {
  const [tasks, setTasks] = useState<CellarTask[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTasks(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load cellar tasks:', error);
    }
  }, []);

  const saveToStorage = useCallback((items: CellarTask[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cellar tasks:', error);
    }
  }, []);

  const addTask = useCallback((task: Omit<CellarTask, 'id' | 'completed' | 'notified' | 'createdAt'>) => {
    const newTask: CellarTask = {
      ...task,
      id: crypto.randomUUID(),
      completed: false,
      notified: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => {
      const updated = [newTask, ...prev];
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const toggleComplete = useCallback((id: string) => {
    setTasks((prev) => {
      const updated = prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => {
      const updated = prev.filter((t) => t.id !== id);
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const markNotified = useCallback((id: string) => {
    setTasks((prev) => {
      const updated = prev.map((t) =>
        t.id === id ? { ...t, notified: true } : t
      );
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  return { tasks, addTask, toggleComplete, removeTask, markNotified };
};
