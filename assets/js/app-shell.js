// Rotary Flight App - app-shell.js
// Shared utilities, localStorage helpers, initialization

const App = {
  version: '1.0.0',
  storageKey: 'rotaryFlightApp',

  init() {
    this.ensureData();
    this.loadFonts();
    this.initAccessibility();
    console.log('Rotary Flight App initialized');
  },

  ensureData() {
    const defaults = {
      completedPages: [],
      bookmarks: [],
      quizScores: {},
      xp: 0,
      streak: 0,
      lastVisit: new Date().toISOString().split('T')[0],
      badges: [],
      settings: {
        reduceMotion: false,
        sound: true,
        difficulty: 'normal'
      }
    };
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      localStorage.setItem(this.storageKey, JSON.stringify(defaults));
    } else {
      const data = JSON.parse(stored);
      // Merge defaults for new fields
      Object.keys(defaults).forEach(key => {
        if (data[key] === undefined) data[key] = defaults[key];
      });
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    }
  },

  getData() {
    return JSON.parse(localStorage.getItem(this.storageKey));
  },

  setData(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  },

  markPageComplete(pageId) {
    const data = this.getData();
    if (!data.completedPages.includes(pageId)) {
      data.completedPages.push(pageId);
      data.xp += 10;
      this.setData(data);
      this.checkBadges();
      this.updateStreak();
      return true;
    }
    return false;
  },

  unmarkPageComplete(pageId) {
    const data = this.getData();
    const idx = data.completedPages.indexOf(pageId);
    if (idx !== -1) {
      data.completedPages.splice(idx, 1);
      data.xp = Math.max(0, data.xp - 10);
      this.setData(data);
      return true;
    }
    return false;
  },

  isPageComplete(pageId) {
    return this.getData().completedPages.includes(pageId);
  },

  addXP(amount) {
    const data = this.getData();
    data.xp += amount;
    this.setData(data);
    this.checkBadges();
  },

  getRank() {
    const xp = this.getData().xp;
    if (xp >= 1000) return { title: 'State-Level Contender', level: 7 };
    if (xp >= 700) return { title: 'Olympiad Pilot', level: 6 };
    if (xp >= 500) return { title: 'Flight Specialist', level: 5 };
    if (xp >= 350) return { title: 'Sky Scientist', level: 4 };
    if (xp >= 200) return { title: 'Rotor Ranger', level: 3 };
    if (xp >= 100) return { title: 'Flight Explorer', level: 2 };
    return { title: 'Cadet', level: 1 };
  },

  updateStreak() {
    const data = this.getData();
    const today = new Date().toISOString().split('T')[0];
    if (data.lastVisit === today) return;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yestStr = yesterday.toISOString().split('T')[0];
    if (data.lastVisit === yestStr) {
      data.streak += 1;
    } else {
      data.streak = 1;
    }
    data.lastVisit = today;
    this.setData(data);
  },

  checkBadges() {
    const data = this.getData();
    const newBadges = [];
    const badges = [
      { id: 'rookie', name: 'Rotor Rookie', condition: () => data.completedPages.length >= 1 },
      { id: 'hover', name: 'Hover Helper', condition: () => data.completedPages.includes('hovering') },
      { id: 'history', name: 'History Detective', condition: () => data.completedPages.includes('pioneer-timeline') },
      { id: 'lift', name: 'Lift Master', condition: () => data.completedPages.includes('rotor-blade-lift') },
      { id: 'torque', name: 'Torque Tamer', condition: () => data.completedPages.includes('torque') },
      { id: 'analyst', name: 'Aircraft Analyst', condition: () => data.completedPages.includes('compare-all-types') },
      { id: 'challenger', name: 'Olympiad Challenger', condition: () => Object.keys(data.quizScores).length >= 3 },
      { id: 'ace', name: 'Mock Test Ace', condition: () => data.quizScores['state-level-mock-test'] && data.quizScores['state-level-mock-test'] >= 80 }
    ];
    badges.forEach(badge => {
      if (!data.badges.includes(badge.id) && badge.condition()) {
        data.badges.push(badge.id);
        newBadges.push(badge);
      }
    });
    if (newBadges.length) {
      this.setData(data);
      newBadges.forEach(b => App.showToast(`Badge Earned: ${b.name}!`, 'badge'));
    }
  },

  showToast(message, type = 'info') {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    const icon = type === 'badge' ? '🏅' : type === 'success' ? '✅' : 'ℹ️';
    toast.innerHTML = `<div class="toast-icon">${icon}</div><div>${message}</div>`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  },

  loadFonts() {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  },

  initAccessibility() {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const data = this.getData();
      data.settings.reduceMotion = true;
      this.setData(data);
    }
  },

  bookmarkPage(pageId) {
    const data = this.getData();
    const idx = data.bookmarks.indexOf(pageId);
    if (idx === -1) {
      data.bookmarks.push(pageId);
      this.setData(data);
      return true;
    } else {
      data.bookmarks.splice(idx, 1);
      this.setData(data);
      return false;
    }
  },

  isBookmarked(pageId) {
    return this.getData().bookmarks.includes(pageId);
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => App.init());
