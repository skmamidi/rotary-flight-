// Rotary Flight App - navigation.js
// Renders nav, breadcrumbs, mobile menu, side nav

const Navigation = {
  pages: {
    'index': { title: 'Home', path: 'index.html', section: null },
    'about': { title: 'About', path: 'about.html', section: null },
    'study-path': { title: 'Study Path', path: 'study-path.html', section: null },
    'coach-guide': { title: 'Coach Guide', path: 'coach-guide.html', section: null },
    'what-is-rotary-flight': { title: 'What is Rotary Flight?', path: 'topics/introduction/what-is-rotary-flight.html', section: 'introduction' },
    'rotary-vs-fixed-wing': { title: 'Rotary vs Fixed-Wing', path: 'topics/introduction/rotary-vs-fixed-wing.html', section: 'introduction' },
    'lift-in-rotary-flight': { title: 'Lift in Rotary Flight', path: 'topics/introduction/lift-in-rotary-flight.html', section: 'introduction' },
    'rotor-basics': { title: 'Rotor Basics', path: 'topics/introduction/rotor-basics.html', section: 'introduction' },
    'vtol': { title: 'VTOL', path: 'topics/introduction/vtol.html', section: 'introduction' },
    'hovering': { title: 'Hovering', path: 'topics/introduction/hovering.html', section: 'introduction' },
    'ancient-ideas': { title: 'Ancient Ideas', path: 'topics/early-concepts/ancient-ideas.html', section: 'early-concepts' },
    'flying-top': { title: 'Flying Top', path: 'topics/early-concepts/flying-top.html', section: 'early-concepts' },
    'da-vinci-aerial-screw': { title: 'Da Vinci Aerial Screw', path: 'topics/early-concepts/da-vinci-aerial-screw.html', section: 'early-concepts' },
    'early-models': { title: 'Early Models', path: 'topics/early-concepts/early-models.html', section: 'early-concepts' },
    'inventors-challenges': { title: 'Inventors Challenges', path: 'topics/early-concepts/inventors-challenges.html', section: 'early-concepts' },
    'igor-sikorsky': { title: 'Igor Sikorsky', path: 'topics/pioneers/igor-sikorsky.html', section: 'pioneers' },
    'vs-300': { title: 'VS-300', path: 'topics/pioneers/vs-300.html', section: 'pioneers' },
    'juan-de-la-cierva': { title: 'Juan de la Cierva', path: 'topics/pioneers/juan-de-la-cierva.html', section: 'pioneers' },
    'arthur-m-young': { title: 'Arthur M. Young', path: 'topics/pioneers/arthur-m-young.html', section: 'pioneers' },
    'pioneer-timeline': { title: 'Pioneer Timeline', path: 'topics/pioneers/pioneer-timeline.html', section: 'pioneers' },
    'helicopters-overview': { title: 'Helicopters Overview', path: 'topics/aircraft-types/helicopters-overview.html', section: 'aircraft-types' },
    'single-rotor': { title: 'Single Rotor', path: 'topics/aircraft-types/single-rotor.html', section: 'aircraft-types' },
    'tandem-rotor': { title: 'Tandem Rotor', path: 'topics/aircraft-types/tandem-rotor.html', section: 'aircraft-types' },
    'coaxial-rotor': { title: 'Coaxial Rotor', path: 'topics/aircraft-types/coaxial-rotor.html', section: 'aircraft-types' },
    'autogyros': { title: 'Autogyros', path: 'topics/aircraft-types/autogyros.html', section: 'aircraft-types' },
    'tiltrotors': { title: 'Tiltrotors', path: 'topics/aircraft-types/tiltrotors.html', section: 'aircraft-types' },
    'compare-all-types': { title: 'Compare All Types', path: 'topics/aircraft-types/compare-all-types.html', section: 'aircraft-types' },
    'forces-of-flight': { title: 'Forces of Flight', path: 'topics/flight-science/forces-of-flight.html', section: 'flight-science' },
    'rotor-blade-lift': { title: 'Rotor Blade Lift', path: 'topics/flight-science/rotor-blade-lift.html', section: 'flight-science' },
    'angle-of-attack': { title: 'Angle of Attack', path: 'topics/flight-science/angle-of-attack.html', section: 'flight-science' },
    'torque': { title: 'Torque', path: 'topics/flight-science/torque.html', section: 'flight-science' },
    'anti-torque-systems': { title: 'Anti-Torque Systems', path: 'topics/flight-science/anti-torque-systems.html', section: 'flight-science' },
    'cyclic-control': { title: 'Cyclic Control', path: 'topics/flight-science/cyclic-control.html', section: 'flight-science' },
    'collective-control': { title: 'Collective Control', path: 'topics/flight-science/collective-control.html', section: 'flight-science' },
    'yaw-pitch-roll': { title: 'Yaw, Pitch, Roll', path: 'topics/flight-science/yaw-pitch-roll.html', section: 'flight-science' },
    'autorotation': { title: 'Autorotation', path: 'topics/flight-science/autorotation.html', section: 'flight-science' },
    'stability-and-control': { title: 'Stability and Control', path: 'topics/flight-science/stability-and-control.html', section: 'flight-science' },
    'ems': { title: 'EMS', path: 'topics/applications/ems.html', section: 'applications' },
    'law-enforcement': { title: 'Law Enforcement', path: 'topics/applications/law-enforcement.html', section: 'applications' },
    'search-and-rescue': { title: 'Search and Rescue', path: 'topics/applications/search-and-rescue.html', section: 'applications' },
    'transportation': { title: 'Transportation', path: 'topics/applications/transportation.html', section: 'applications' },
    'tourism-and-recreation': { title: 'Tourism', path: 'topics/applications/tourism-and-recreation.html', section: 'applications' },
    'military-and-special-missions': { title: 'Military', path: 'topics/applications/military-and-special-missions.html', section: 'applications' },
    'electric-rotorcraft': { title: 'Electric Rotorcraft', path: 'topics/future/electric-rotorcraft.html', section: 'future' },
    'autonomous-flight': { title: 'Autonomous Flight', path: 'topics/future/autonomous-flight.html', section: 'future' },
    'urban-air-mobility': { title: 'Urban Air Mobility', path: 'topics/future/urban-air-mobility.html', section: 'future' },
    'personal-air-vehicles': { title: 'Personal Air Vehicles', path: 'topics/future/personal-air-vehicles.html', section: 'future' },
    'future-challenges': { title: 'Future Challenges', path: 'topics/future/future-challenges.html', section: 'future' },
    'vocabulary-drill': { title: 'Vocabulary Drill', path: 'topics/olympiad/vocabulary-drill.html', section: 'olympiad' },
    'concept-match': { title: 'Concept Match', path: 'topics/olympiad/concept-match.html', section: 'olympiad' },
    'compare-and-contrast': { title: 'Compare & Contrast', path: 'topics/olympiad/compare-and-contrast.html', section: 'olympiad' },
    'timeline-review': { title: 'Timeline Review', path: 'topics/olympiad/timeline-review.html', section: 'olympiad' },
    'diagram-labeling': { title: 'Diagram Labeling', path: 'topics/olympiad/diagram-labeling.html', section: 'olympiad' },
    'misconception-traps': { title: 'Misconception Traps', path: 'topics/olympiad/misconception-traps.html', section: 'olympiad' },
    'practice-quiz-easy': { title: 'Practice Quiz: Easy', path: 'topics/olympiad/practice-quiz-easy.html', section: 'olympiad' },
    'practice-quiz-medium': { title: 'Practice Quiz: Medium', path: 'topics/olympiad/practice-quiz-medium.html', section: 'olympiad' },
    'practice-quiz-hard': { title: 'Practice Quiz: Hard', path: 'topics/olympiad/practice-quiz-hard.html', section: 'olympiad' },
    'state-level-mock-test': { title: 'State-Level Mock Test', path: 'topics/olympiad/state-level-mock-test.html', section: 'olympiad' },
    'glossary-a-f': { title: 'Glossary A-F', path: 'topics/glossary/glossary-a-f.html', section: 'glossary' },
    'glossary-g-l': { title: 'Glossary G-L', path: 'topics/glossary/glossary-g-l.html', section: 'glossary' },
    'glossary-m-r': { title: 'Glossary M-R', path: 'topics/glossary/glossary-m-r.html', section: 'glossary' },
    'glossary-s-z': { title: 'Glossary S-Z', path: 'topics/glossary/glossary-s-z.html', section: 'glossary' }
  },

  sections: {
    'introduction': 'Introduction',
    'early-concepts': 'Early Concepts',
    'pioneers': 'Pioneers',
    'aircraft-types': 'Aircraft Types',
    'flight-science': 'Flight Science',
    'applications': 'Applications',
    'future': 'Future',
    'olympiad': 'Olympiad',
    'glossary': 'Glossary'
  },

  // Section order matching the Learn page numbering
  sectionOrder: [
    'introduction',
    'early-concepts',
    'pioneers',
    'aircraft-types',
    'flight-science',
    'applications',
    'future',
    'olympiad',
    'glossary'
  ],

  init() {
    this.renderTopNav();
    this.renderBreadcrumbs();
    this.renderSideNav();
    this.setupMobileMenu();
  },

  getCurrentPageId() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');
    // Handle root pages
    if (!filename || filename === 'index') return 'index';
    // Find matching page id by exact filename (avoid substring collisions)
    for (const [id, info] of Object.entries(this.pages)) {
      const pageFilename = info.path.split('/').pop().replace('.html', '');
      if (pageFilename === filename) return id;
    }
    return filename;
  },

  getRelativePath(targetPath) {
    const currentPath = window.location.pathname;
    // Robust path calculation for both local file:// and served http(s):// usage
    // All topic pages are at topics/<section>/<page>.html (2 levels deep)
    // Printable pages are at printable/<page>.html (1 level deep)
    // Root pages are at <page>.html (0 levels deep)
    if (currentPath.includes('/topics/') || currentPath.includes('\\topics\\')) {
      return '../../' + targetPath;
    }
    if (currentPath.includes('/printable/') || currentPath.includes('\\printable\\')) {
      return '../' + targetPath;
    }
    // Root level (index.html, about.html, study-path.html, coach-guide.html)
    return targetPath;
  },

  renderTopNav() {
    const nav = document.getElementById('top-nav');
    if (!nav) return;
    const currentId = this.getCurrentPageId();
    const isActive = (id) => {
      if (id === 'index' && currentId === 'index') return true;
      if (id === 'learn' && this.pages[currentId]?.section && this.pages[currentId].section !== 'olympiad' && this.pages[currentId].section !== 'glossary') return true;
      if (id === 'practice' && this.pages[currentId]?.section === 'olympiad') return true;
      if (id === 'glossary' && this.pages[currentId]?.section === 'glossary') return true;
      return false;
    };

    const xp = App.getData().xp;
    const rank = App.getRank();

    nav.innerHTML = `
      <div class="container">
        <a href="${this.getRelativePath('index.html')}" class="nav-brand" aria-label="Rotary Flight Mission Home">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="18" cy="18" r="3" fill="#FFD166"/>
            <path d="M18 2L20 14H16L18 2Z" fill="#4DA8FF" transform="rotate(0 18 18)" class="animate-spin-slow" style="transform-origin:center"/>
            <path d="M18 2L20 14H16L18 2Z" fill="#4DA8FF" transform="rotate(120 18 18)" class="animate-spin-slow" style="transform-origin:center"/>
            <path d="M18 2L20 14H16L18 2Z" fill="#4DA8FF" transform="rotate(240 18 18)" class="animate-spin-slow" style="transform-origin:center"/>
            <circle cx="18" cy="18" r="8" stroke="#29C7B8" stroke-width="2" fill="none" opacity="0.5"/>
          </svg>
          Rotary Flight
        </a>
        <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Open menu" aria-expanded="false">☰</button>
        <ul class="nav-links" id="nav-links">
          <li><a href="${this.getRelativePath('index.html')}" class="${isActive('index') ? 'active' : ''}">Home</a></li>
          <li><a href="${this.getRelativePath('study-path.html')}" class="${isActive('learn') ? 'active' : ''}">Learn</a></li>
          <li><a href="${this.getRelativePath('topics/olympiad/practice-quiz-easy.html')}" class="${isActive('practice') ? 'active' : ''}">Practice</a></li>
          <li><a href="${this.getRelativePath('topics/glossary/glossary-a-f.html')}" class="${isActive('glossary') ? 'active' : ''}">Glossary</a></li>
          <li><a href="${this.getRelativePath('about.html')}">About</a></li>
        </ul>
        <div class="nav-actions hide-mobile">
          <span class="badge-pill" title="Your XP">⭐ ${xp} XP</span>
          <span class="badge-pill" title="Rank" style="background:white;color:var(--deep-navy)">🎖️ ${rank.title}</span>
        </div>
      </div>
    `;
  },

  renderBreadcrumbs() {
    const bc = document.getElementById('breadcrumbs');
    if (!bc) return;
    const currentId = this.getCurrentPageId();
    const page = this.pages[currentId];
    if (!page) return;

    let html = `<div class="container"><a href="${this.getRelativePath('index.html')}">Home</a>`;
    if (page.section) {
      html += ` <span class="sep">/</span> <a href="${this.getRelativePath('study-path.html')}">${this.sections[page.section] || 'Learn'}</a>`;
    }
    html += ` <span class="sep">/</span> <span class="current">${page.title}</span></div>`;
    bc.innerHTML = html;
  },

  renderSideNav() {
    const sideNav = document.getElementById('side-nav');
    if (!sideNav) return;
    const currentId = this.getCurrentPageId();
    const currentPage = this.pages[currentId];
    if (!currentPage || !currentPage.section) return;

    const data = App.getData();

    let html = `<div class="side-nav sticky-sidebar">`;

    this.sectionOrder.forEach((sectionKey, index) => {
      const sectionLabel = this.sections[sectionKey];
      const sectionPages = Object.entries(this.pages).filter(([_, info]) => info.section === sectionKey);
      if (sectionPages.length === 0) return;

      const isActiveSection = currentPage.section === sectionKey;
      const expandedClass = isActiveSection ? 'expanded' : '';
      const toggleIcon = isActiveSection ? '▼' : '▶';
      // Number Learn sections (1-8); glossary stays unnumbered
      const sectionNumber = sectionKey === 'glossary' ? '' : `${index + 1}. `;

      html += `<div class="side-nav-section ${expandedClass}" data-section="${sectionKey}">`;
      html += `<button class="side-nav-header" type="button" onclick="Navigation.toggleSideNavSection(this)">
          <span class="side-nav-header-title">${sectionNumber}${sectionLabel}</span>
          <span class="side-nav-header-toggle">${toggleIcon}</span>
        </button>`;
      html += `<ul class="side-nav-list">`;
      sectionPages.forEach(([id, info]) => {
        const completed = data.completedPages.includes(id) ? '<span class="check">✓</span>' : '';
        const active = id === currentId ? 'active' : '';
        const path = this.getRelativePath(info.path);
        html += `<li><a href="${path}" class="${active} ${completed ? 'completed' : ''}">${info.title} ${completed}</a></li>`;
      });
      html += `</ul></div>`;
    });

    html += `</div>`;
    sideNav.innerHTML = html;
  },

  toggleSideNavSection(btn) {
    const section = btn.closest('.side-nav-section');
    const isExpanded = section.classList.toggle('expanded');
    btn.querySelector('.side-nav-header-toggle').textContent = isExpanded ? '▼' : '▶';
  },

  setupMobileMenu() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('#mobile-menu-btn');
      if (!btn) return;
      const links = document.getElementById('nav-links');
      const isOpen = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
    });
  },

  getNextPrev() {
    const currentId = this.getCurrentPageId();
    const page = this.pages[currentId];
    if (!page || !page.section) return { prev: null, next: null };
    const sectionPages = Object.entries(this.pages).filter(([_, info]) => info.section === page.section);
    const idx = sectionPages.findIndex(([id]) => id === currentId);
    return {
      prev: idx > 0 ? sectionPages[idx - 1] : null,
      next: idx < sectionPages.length - 1 ? sectionPages[idx + 1] : null
    };
  },

  renderTopicFooter(pageId) {
    const footer = document.getElementById('topic-footer');
    if (!footer) return;
    const { prev, next } = this.getNextPrev();
    const isComplete = App.isPageComplete(pageId);
    let html = '';
    if (prev) {
      html += `<a href="${this.getRelativePath(prev[1].path)}" class="nav-btn prev">
        <span>←</span>
        <div><div style="font-size:0.8rem;color:var(--steel-gray)">Previous</div><div>${prev[1].title}</div></div>
      </a>`;
    } else {
      html += `<span></span>`;
    }
    html += `<button class="btn ${isComplete ? 'btn-secondary' : 'btn-primary'} btn-sm" id="mark-complete-btn" data-page="${pageId}">
      ${isComplete ? 'Mark Incomplete' : 'Mark Complete'}
    </button>`;
    if (next) {
      html += `<a href="${this.getRelativePath(next[1].path)}" class="nav-btn next">
        <div><div style="font-size:0.8rem;color:var(--steel-gray)">Next</div><div>${next[1].title}</div></div>
        <span>→</span>
      </a>`;
    } else {
      html += `<span></span>`;
    }
    footer.innerHTML = html;

    const btn = document.getElementById('mark-complete-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        if (App.isPageComplete(pageId)) {
          App.unmarkPageComplete(pageId);
          btn.textContent = 'Mark Complete';
          btn.classList.remove('btn-secondary');
          btn.classList.add('btn-primary');
          App.showToast('Page unmarked. -10 XP', 'info');
        } else {
          App.markPageComplete(pageId);
          btn.textContent = 'Mark Incomplete';
          btn.classList.remove('btn-primary');
          btn.classList.add('btn-secondary');
          App.showToast('Page completed! +10 XP', 'success');
        }
        const marker = document.getElementById('completion-marker');
        if (marker) {
          if (App.isPageComplete(pageId)) {
            marker.innerHTML = '✓ Completed';
            marker.classList.remove('incomplete');
          } else {
            marker.innerHTML = '○ Not completed';
            marker.classList.add('incomplete');
          }
        }
        Navigation.renderSideNav();
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => Navigation.init());
