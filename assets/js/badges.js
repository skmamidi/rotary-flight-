// Rotary Flight App - badges.js
// Badge display and awards

const Badges = {
  definitions: {
    'rookie': { name: 'Rotor Rookie', icon: '🚁', desc: 'Complete your first topic.' },
    'hover': { name: 'Hover Helper', icon: '🎯', desc: 'Complete the Hovering topic.' },
    'history': { name: 'History Detective', icon: '🕵️', desc: 'Complete the Pioneer Timeline.' },
    'lift': { name: 'Lift Master', icon: '🪶', desc: 'Complete Rotor Blade Lift.' },
    'torque': { name: 'Torque Tamer', icon: '⚙️', desc: 'Complete the Torque topic.' },
    'analyst': { name: 'Aircraft Analyst', icon: '🔍', desc: 'Complete Compare All Types.' },
    'challenger': { name: 'Olympiad Challenger', icon: '🏆', desc: 'Complete 3 practice quizzes.' },
    'ace': { name: 'Mock Test Ace', icon: '🎖️', desc: 'Score 80%+ on the State Mock Test.' }
  },

  renderBadgeList() {
    const container = document.getElementById('badge-list');
    if (!container) return;
    const data = App.getData();
    let html = '<div class="row gap-4">';
    Object.entries(this.definitions).forEach(([id, badge]) => {
      const earned = data.badges.includes(id);
      html += `
        <div class="col-3 col-md-4 col-sm-6">
          <div class="card text-center ${earned ? '' : 'opacity-50'}">
            <div style="font-size:2.5rem">${badge.icon}</div>
            <div class="font-heading font-bold mt-2">${badge.name}</div>
            <div class="caption mt-1">${badge.desc}</div>
            <div class="mt-2">${earned ? '<span class="tag tag-starter">Earned</span>' : '<span class="tag" style="background:var(--soft-background);color:var(--steel-gray)">Locked</span>'}</div>
          </div>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  }
};
