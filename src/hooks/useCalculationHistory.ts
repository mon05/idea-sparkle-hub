import { useState, useEffect, useCallback } from 'react';

export interface CalculationEntry {
  id: string;
  calculatorId: string;
  calculatorName: string;
  inputs: Record<string, number>;
  result: number;
  unit: string;
  details?: string;
  timestamp: number;
}

const STORAGE_KEY = 'winecalc_history';
const MAX_ENTRIES = 50;

export const useCalculationHistory = () => {
  const [history, setHistory] = useState<CalculationEntry[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load calculation history:', error);
    }
  }, []);

  const saveToStorage = useCallback((entries: CalculationEntry[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error('Failed to save calculation history:', error);
    }
  }, []);

  const addEntry = useCallback((entry: Omit<CalculationEntry, 'id' | 'timestamp'>) => {
    const newEntry: CalculationEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    
    setHistory((prev) => {
      const updated = [newEntry, ...prev].slice(0, MAX_ENTRIES);
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const removeEntry = useCallback((id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((entry) => entry.id !== id);
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    history,
    addEntry,
    removeEntry,
    clearHistory,
  };
};
