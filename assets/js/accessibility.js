// Rotary Flight App - accessibility.js
// Keyboard nav, focus traps, skip links, motion preferences

const Accessibility = {
  init() {
    this.addSkipLink();
    this.enhanceFocus();
    this.setupKeyboardNav();
    this.setupMotionToggle();
  },

  addSkipLink() {
    if (document.getElementById('skip-link')) return;
    const skip = document.createElement('a');
    skip.id = 'skip-link';
    skip.href = '#main-content';
    skip.textContent = 'Skip to main content';
    skip.className = 'sr-only';
    skip.style.position = 'absolute';
    skip.style.top = '8px';
    skip.style.left = '8px';
    skip.style.zIndex = '9999';
    skip.style.background = 'var(--deep-navy)';
    skip.style.color = 'white';
    skip.style.padding = '8px 16px';
    skip.style.borderRadius = '8px';
    skip.style.textDecoration = 'none';
    skip.style.fontWeight = '700';
    skip.addEventListener('focus', () => { skip.style.position = 'absolute'; });
    document.body.prepend(skip);
  },

  enhanceFocus() {
    document.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])').forEach(el => {
      el.addEventListener('focus', () => {
        el.style.outline = '3px solid var(--sky-blue)';
        el.style.outlineOffset = '2px';
      });
      el.addEventListener('blur', () => {
        el.style.outline = '';
        el.style.outlineOffset = '';
      });
    });
  },

  setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      // Escape closes modals
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
      }
      // Trap focus in modals
      const activeModal = document.querySelector('.modal-overlay.open');
      if (activeModal && e.key === 'Tab') {
        const focusable = activeModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus(); e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus(); e.preventDefault();
        }
      }
    });
  },

  setupMotionToggle() {
    const data = App.getData();
    if (data.settings.reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => Accessibility.init());
