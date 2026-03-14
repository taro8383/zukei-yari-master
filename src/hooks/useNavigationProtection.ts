import { useEffect, useCallback } from 'react';

/**
 * Hook to protect against accidental navigation on tablets/mobile devices and PC
 * - Warns when trying to leave the page with unsaved work
 * - Prevents swipe back/forward gestures
 * - Prevents pull-to-refresh
 * - Prevents hardware back button (Android tablets)
 * - Prevents browser back button navigation (PC/Mac)
 */
export function useNavigationProtection(isActive: boolean = true, hasUnsavedWork: boolean = true) {
  // Save state before leaving and restore when returning
  const handleBeforeUnload = useCallback((e: BeforeUnloadEvent) => {
    if (!hasUnsavedWork) return;
    e.preventDefault();
    e.returnValue = '学習の進捗が失われます。本当に移動しますか？';
    return e.returnValue;
  }, [hasUnsavedWork]);

  useEffect(() => {
    if (!isActive) return;

    // Prevent swipe back/forward on touch devices
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartX || !touchStartY) return;

      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;

      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // Check if horizontal swipe (more horizontal than vertical)
      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Prevent swipe from edges (swipe back/forward)
        const screenWidth = window.innerWidth;
        const edgeThreshold = 50; // pixels from edge

        if (touchStartX < edgeThreshold || touchStartX > screenWidth - edgeThreshold) {
          e.preventDefault();
        }
      }

      // Prevent pull-to-refresh (swipe down from top)
      if (diffY < -50 && touchStartY < 100 && window.scrollY === 0) {
        e.preventDefault();
      }
    };

    // Prevent history navigation via keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Alt+Left/Right (browser back/forward)
      if (e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault();
      }
    };

    // Prevent hardware/software back button
    const handlePopState = (e: PopStateEvent) => {
      if (!hasUnsavedWork) return;

      // User pressed back button - prevent navigation
      e.preventDefault();
      // Push current state back to prevent leaving
      window.history.pushState({ page: 'app', timestamp: Date.now() }, '', window.location.href);

      // Show warning alert
      alert('学習の進捗が失われます。ページを離れる場合は、リロード後に「やめる」を選択してください。\n\nYour progress will be lost. If you want to leave, please select "Cancel" after reloading.');
    };

    // For HashRouter - prevent hash changes
    const handleHashChange = (e: HashChangeEvent) => {
      if (!hasUnsavedWork) return;

      // Prevent hash change (back/forward in hash router)
      e.preventDefault();
      // Restore the hash to current
      window.history.pushState(null, '', e.oldURL);

      alert('学習の進捗が失われます。ページを離れる場合は、リロード後に「やめる」を選択してください。\n\nYour progress will be lost. If you want to leave, please select "Cancel" after reloading.');
    };

    // Initialize history protection - push multiple states to trap back button
    for (let i = 0; i < 3; i++) {
      window.history.pushState({ page: 'app', index: i, timestamp: Date.now() }, '', window.location.href);
    }

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, hasUnsavedWork, handleBeforeUnload]);
}

export default useNavigationProtection;
