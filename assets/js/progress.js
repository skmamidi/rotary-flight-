// Rotary Flight App - progress.js
// Progress dashboard, XP, badges display

const Progress = {
  init() {
    this.renderSnapshot();
  },

  renderSnapshot() {
    const container = document.getElementById('progress-snapshot');
    if (!container) return;
    const data = App.getData();
    const totalPages = Object.keys(Navigation.pages).filter(k => Navigation.pages[k].section).length;
    const completed = data.completedPages.length;
    const percent = Math.round((completed / totalPages) * 100);
    const rank = App.getRank();

    container.innerHTML = `
      <div class="card card-blue">
        <h3>Your Progress</h3>
        <div class="progress-bar mt-3 mb-2">
          <div class="progress-bar-fill" style="width: ${percent}%"></div>
        </div>
        <div class="flex justify-between caption mb-4">
          <span>${completed} / ${totalPages} topics</span>
          <span>${percent}%</span>
        </div>
        <div class="row gap-4 text-center">
          <div class="col">
            <div style="font-size:1.5rem;font-weight:800;color:var(--sky-blue)">${data.xp}</div>
            <div class="caption">XP</div>
          </div>
          <div class="col">
            <div style="font-size:1.5rem;font-weight:800;color:var(--sun-yellow)">${data.badges.length}</div>
            <div class="caption">Badges</div>
          </div>
          <div class="col">
            <div style="font-size:1.5rem;font-weight:800;color:var(--rotor-teal)">${data.streak}</div>
            <div class="caption">Day Streak</div>
          </div>
          <div class="col">
            <div style="font-size:1.5rem;font-weight:800;color:var(--purple-accent)">${rank.title}</div>
            <div class="caption">Rank</div>
          </div>
        </div>
      </div>
    `;
  },

  renderHeatmap() {
    const container = document.getElementById('progress-heatmap');
    if (!container) return;
    const data = App.getData();
    const sections = {
      'introduction': 'Introduction',
      'early-concepts': 'Early Concepts',
      'pioneers': 'Pioneers',
      'aircraft-types': 'Aircraft Types',
      'flight-science': 'Flight Science',
      'applications': 'Applications',
      'future': 'Future',
      'olympiad': 'Olympiad'
    };

    let html = '<div class="heatmap-grid">';
    for (const [sec, label] of Object.entries(sections)) {
      const pages = Object.entries(Navigation.pages).filter(([_, info]) => info.section === sec);
      const completed = pages.filter(([id]) => data.completedPages.includes(id)).length;
      const pct = pages.length ? Math.round((completed / pages.length) * 100) : 0;
      let cls = 'heatmap-none';
      if (pct === 100) cls = 'heatmap-strong';
      else if (pct >= 50) cls = 'heatmap-good';
      else if (pct > 0) cls = 'heatmap-weak';
      html += `<div class="heatmap-cell ${cls}">${label}<br><strong>${pct}%</strong></div>`;
    }
    html += '</div>';
    container.innerHTML = html;
  }
};

document.addEventListener('DOMContentLoaded', () => Progress.init());
