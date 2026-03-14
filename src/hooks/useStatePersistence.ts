import { useEffect, useCallback, useRef } from 'react';

interface PersistedState {
  timestamp: number;
  activeTab: string;
  activeTopic: string | null;
  userAnswers: Record<string, string | number>;
  stepAnswers: Record<string, (string | number)[]>;
  gradedQuestions: Record<string, boolean>;
  showExplanations: Record<string, boolean>;
}

const STORAGE_KEY = 'zukei-yari-progress';
const SAVE_INTERVAL = 5000; // Save every 5 seconds

/**
 * Hook to persist and restore app state to localStorage
 * Protects against accidental exits, refreshes, and crashes
 */
export function useStatePersistence(
  activeTab: string,
  activeTopic: string | null,
  userAnswers: Record<string, string | number>,
  stepAnswers: Record<string, (string | number)[]>,
  gradedQuestions: Record<string, boolean>,
  showExplanations: Record<string, boolean>,
  onRestoreState?: (state: PersistedState) => void
) {
  const lastSaveRef = useRef<number>(0);

  // Save state to localStorage
  const saveState = useCallback(() => {
    const now = Date.now();
    // Throttle saves to avoid excessive writes
    if (now - lastSaveRef.current < 1000) return;

    const state: PersistedState = {
      timestamp: now,
      activeTab,
      activeTopic,
      userAnswers,
      stepAnswers,
      gradedQuestions,
      showExplanations,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      lastSaveRef.current = now;
    } catch (e) {
      console.warn('Failed to save state:', e);
    }
  }, [activeTab, activeTopic, userAnswers, stepAnswers, gradedQuestions, showExplanations]);

  // Restore state from localStorage
  const restoreState = useCallback((): PersistedState | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return null;

      const state: PersistedState = JSON.parse(saved);

      // Only restore if saved within last 24 hours
      const now = Date.now();
      const age = now - state.timestamp;
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours

      if (age > maxAge) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }

      return state;
    } catch (e) {
      console.warn('Failed to restore state:', e);
      return null;
    }
  }, []);

  // Check for saved state on mount
  useEffect(() => {
    const savedState = restoreState();
    if (savedState && onRestoreState) {
      onRestoreState(savedState);
    }
  }, [restoreState, onRestoreState]);

  // Auto-save at interval
  useEffect(() => {
    const interval = setInterval(saveState, SAVE_INTERVAL);
    return () => clearInterval(interval);
  }, [saveState]);

  // Save on visibility change (tab switch, minimize, etc.)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        saveState();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [saveState]);

  // Save before page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveState();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [saveState]);

  // Clear saved state
  const clearSavedState = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear state:', e);
    }
  }, []);

  return { saveState, restoreState, clearSavedState };
}

export default useStatePersistence;
