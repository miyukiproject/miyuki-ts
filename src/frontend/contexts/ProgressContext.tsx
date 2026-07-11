import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from "react";
import { StoredBookProgress, loadBookProgress, onProgressInfoUpdated } from "../helpers/progressStorage";

interface ProgressContextType {
  bookProgress: StoredBookProgress | null;
  updateProgress: (progress: StoredBookProgress | null) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ bookId: number; children: ReactNode }> = ({ bookId, children }) => {
  const [bookProgress, setBookProgress] = useState<StoredBookProgress | null>(null);
  const loadRequestId = useRef(0);

  useEffect(() => {
    let active = true;

    const reloadProgress = () => {
      const requestId = ++loadRequestId.current;
      void loadBookProgress(bookId)
        .then((savedProgress) => {
          if (active && requestId === loadRequestId.current) {
            console.log("[ProgressProvider] Loaded progress from disk");
            setBookProgress(savedProgress);
          }
        })
        .catch((error) => {
          console.error("[ProgressProvider] Failed to load:", error);
          if (active && requestId === loadRequestId.current) {
            setBookProgress(null);
          }
        });
    };

    reloadProgress();
    const dispose = onProgressInfoUpdated(() => {
      reloadProgress();
    });

    return () => {
      active = false;
      dispose();
    };
  }, [bookId]);

  const updateProgress = useCallback((progress: StoredBookProgress | null) => {
    console.log("[ProgressProvider] Updating context with new progress");
    setBookProgress(progress);
  }, []);

  return (
    <ProgressContext.Provider value={{ bookProgress, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};
