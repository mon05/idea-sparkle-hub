import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'winecalc_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  }, []);

  const saveToStorage = useCallback((items: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }, []);

  const toggleFavorite = useCallback((calculatorId: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(calculatorId)
        ? prev.filter((id) => id !== calculatorId)
        : [...prev, calculatorId];
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const isFavorite = useCallback((calculatorId: string) => {
    return favorites.includes(calculatorId);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite };
};
