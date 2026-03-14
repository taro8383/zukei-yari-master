import { useEffect } from 'react';

/**
 * Hook to protect against accidental navigation on tablets/mobile devices
 * - Warns when trying to leave the page with unsaved work
 * - Prevents swipe back/forward gestures
 * - Prevents pull-to-refresh
 * - Prevents hardware back button (Android tablets)
 */
export function useNavigationProtection(isActive: boolean = true) {
  useEffect(() => {
    if (!isActive) return;

    // Prevent accidental page leave/reload
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '学習の進捗が失われます。本当に移動しますか？';
      return e.returnValue;
    };

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

    // Prevent hardware back button (Android tablets)
    // Push dummy state to history so back button doesn't leave the app
    const preventBackButton = () => {
      // Push current state to history stack
      window.history.pushState({ page: 'app' }, '', window.location.href);
    };

    const handlePopState = (e: PopStateEvent) => {
      // User pressed back button - prevent navigation by pushing state again
      e.preventDefault();
      window.history.pushState({ page: 'app' }, '', window.location.href);
      // Optional: show a toast or alert that back is disabled
      console.log('Back button pressed - navigation prevented');
    };

    // Initialize history protection
    window.history.pushState({ page: 'app' }, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isActive]);
}

export default useNavigationProtection;
