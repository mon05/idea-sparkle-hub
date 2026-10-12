import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "winecalc_favorites";
const CHANGE_EVENT = "winecalc:favorites-changed";

const readFavorites = (): string[] => {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved)
      ? saved.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(readFavorites);

  useEffect(() => {
    const sync = () => setFavorites(readFavorites());
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) sync();
    };
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const toggleFavorite = useCallback((calculatorId: string) => {
    const current = readFavorites();
    const updated = current.includes(calculatorId)
      ? current.filter((id) => id !== calculatorId)
      : [...current, calculatorId];

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Keep in-memory state useful even in restricted browsing modes.
    }
    setFavorites(updated);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const isFavorite = useCallback(
    (calculatorId: string) => favorites.includes(calculatorId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
};
