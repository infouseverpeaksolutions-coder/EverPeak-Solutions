/**
 * Fluxo SaaS — Main Script
 * Handles:
 * 1. 3D TubesCursor background initialization via Threejs-components CDN
 * 2. Liquid glass mobile navigation drawer toggle and interaction handling
 */

import TubesCursor from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js';

// ============================================================================
// 1. Initialize 3D TubesCursor Background
// ============================================================================
function initTubesBackground() {
  const canvas = document.getElementById('canvas');
  if (!canvas) {
    console.warn('Canvas element #canvas not found');
    return;
  }

  try {
    // Tubes configuration with static palette and intensity 50 (no random colors on click)
    const app = TubesCursor(canvas, {
      tubes: {
        colors: ['#ff008a', '#8b5cf6', '#3b82f6', '#ffffff'],
        lights: {
          intensity: 50,
          colors: ['#ff008a', '#8b5cf6', '#3b82f6', '#ffffff']
        }
      }
    });

    // Clean up on page unload if necessary
    window.addEventListener('beforeunload', () => {
      if (app && typeof app.dispose === 'function') {
        app.dispose();
      }
    });
  } catch (error) {
    console.warn('Unable to initialize WebGL 3D TubesCursor:', error);
  }
}

// ============================================================================
// 2. Liquid Glass Mobile Drawer Navigation
// ============================================================================
function initMobileNavigation() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (!hamburgerBtn || !mobileDrawer) return;

  function toggleMenu(isOpen) {
    const shouldOpen = isOpen !== undefined ? isOpen : !mobileDrawer.classList.contains('open');

    if (shouldOpen) {
      mobileDrawer.classList.add('open');
      hamburgerBtn.classList.add('active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      mobileDrawer.setAttribute('aria-hidden', 'false');
    } else {
      mobileDrawer.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      mobileDrawer.setAttribute('aria-hidden', 'true');
    }
  }

  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking any link inside the drawer
  const drawerLinks = mobileDrawer.querySelectorAll('a');
  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (event) => {
    if (
      mobileDrawer.classList.contains('open') &&
      !mobileDrawer.contains(event.target) &&
      !hamburgerBtn.contains(event.target)
    ) {
      toggleMenu(false);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      toggleMenu(false);
    }
  });
}

// ============================================================================
// Initialize on DOM Ready
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTubesBackground();
  initMobileNavigation();
});

// Fallback in case DOMContentLoaded already fired
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initTubesBackground();
  initMobileNavigation();
}
