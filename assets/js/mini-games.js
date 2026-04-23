// Rotary Flight App - mini-games.js
// Hover balance, rotor builder, timeline race, aircraft matcher, torque trouble, control lab

const MiniGames = {
  init(gameType, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    switch(gameType) {
      case 'hover-balance': this.hoverBalance(container); break;
      case 'rotor-builder': this.rotorBuilder(container); break;
      case 'aircraft-matcher': this.aircraftMatcher(container); break;
      case 'torque-trouble': this.torqueTrouble(container); break;
      case 'control-lab': this.controlLab(container); break;
    }
  },

  hoverBalance(container) {
    container.innerHTML = `
      <div class="mini-game">
        <h3>Hover Balance Challenge</h3>
        <p>Keep the helicopter steady! Use the slider to balance lift.</p>
        <div class="game-canvas" id="hover-canvas">
          <div id="heli" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:3rem;transition:top 0.2s">🚁</div>
          <div style="position:absolute;bottom:10px;left:10px;color:white;background:rgba(0,0,0,0.5);padding:4px 8px;border-radius:4px">Wind: <span id="wind-val">0</span></div>
        </div>
        <label>Lift Power</label>
        <input type="range" min="0" max="100" value="50" class="slider-control" id="lift-slider">
        <div class="slider-labels"><span>Low</span><span>Balanced</span><span>High</span></div>
        <div class="game-score mt-3">Score: <span id="hover-score">0</span></div>
        <button class="btn btn-primary mt-3" id="start-hover">Start</button>
      </div>
    `;
    let score = 0, running = false, wind = 0, target = 50;
    const heli = document.getElementById('heli');
    const slider = document.getElementById('lift-slider');
    const scoreEl = document.getElementById('hover-score');
    const windEl = document.getElementById('wind-val');

    document.getElementById('start-hover').addEventListener('click', function() {
      if (running) { running = false; this.textContent = 'Start'; return; }
      running = true; this.textContent = 'Stop'; score = 0;
      const interval = setInterval(() => {
        if (!running) { clearInterval(interval); return; }
        wind = Math.sin(Date.now() / 1000) * 20 + (Math.random() - 0.5) * 10;
        target = 50 + wind;
        const diff = Math.abs(parseInt(slider.value) - target);
        const y = 50 + diff * 1.5;
        heli.style.top = `${Math.min(90, Math.max(10, y))}%`;
        if (diff < 10) score += 1;
        scoreEl.textContent = score;
        windEl.textContent = Math.round(wind);
      }, 200);
    });
  },

  rotorBuilder(container) {
    container.innerHTML = `
      <div class="mini-game">
        <h3>Rotor Builder</h3>
        <p>Drag parts to build a helicopter rotor system.</p>
        <div class="row mt-4">
          <div class="col-4">
            <div class="drop-zone" id="parts-bin">
              <div class="draggable-item" draggable="true" data-part="mast">Mast</div>
              <div class="draggable-item" draggable="true" data-part="hub">Hub</div>
              <div class="draggable-item" draggable="true" data-part="blade">Blade</div>
              <div class="draggable-item" draggable="true" data-part="blade">Blade</div>
            </div>
          </div>
          <div class="col-8">
            <div style="min-height:200px;background:var(--soft-background);border-radius:var(--radius-md);padding:var(--space-4);position:relative" id="build-area">
              <div style="text-align:center;color:var(--steel-gray)">Build area: place Mast → Hub → Blades</div>
              <div id="build-result" style="margin-top:var(--space-3);text-align:center;font-size:2rem"></div>
            </div>
          </div>
        </div>
        <button class="btn btn-primary mt-3" id="check-build">Check Build</button>
      </div>
    `;
    // Simple drag and drop logic could be expanded; for now, clickable placement
    let build = [];
    container.querySelectorAll('.draggable-item').forEach(item => {
      item.addEventListener('click', () => {
        build.push(item.dataset.part);
        document.getElementById('build-result').innerHTML += item.textContent + ' ';
      });
    });
    document.getElementById('check-build').addEventListener('click', () => {
      const expected = ['mast','hub','blade','blade'];
      const match = JSON.stringify(build) === JSON.stringify(expected);
      App.showToast(match ? 'Perfect build! +15 XP' : 'Keep trying! Order: Mast, Hub, Blade, Blade', match ? 'success' : 'info');
      if (match) App.addXP(15);
    });
  },

  aircraftMatcher(container) {
    const scenarios = [
      { text: 'Mountain rescue in tight valley', answer: 'helicopter', reason: 'Needs hover and maneuverability.' },
      { text: 'Heavy cargo between ships', answer: 'tandem', reason: 'Tandem rotor helicopters lift heavy loads.' },
      { text: 'Fast transport from city to airport', answer: 'tiltrotor', reason: 'Tiltrotors fly fast like airplanes.' },
      { text: 'Recreational flying with low cost', answer: 'autogyro', reason: 'Autogyros are simpler and economical.' }
    ];
    let idx = 0, score = 0;
    const render = () => {
      if (idx >= scenarios.length) {
        container.innerHTML = `<div class="mini-game"><h3>Mission Complete!</h3><p>Score: ${score}/${scenarios.length}</p><button class="btn btn-primary" onclick="location.reload()">Replay</button></div>`;
        return;
      }
      const s = scenarios[idx];
      container.innerHTML = `
        <div class="mini-game">
          <h3>Aircraft Matcher</h3>
          <p><strong>Mission:</strong> ${s.text}</p>
          <div class="row gap-3 mt-3">
            <button class="btn btn-secondary match-btn" data-type="helicopter">Helicopter</button>
            <button class="btn btn-secondary match-btn" data-type="tandem">Tandem Rotor</button>
            <button class="btn btn-secondary match-btn" data-type="tiltrotor">Tiltrotor</button>
            <button class="btn btn-secondary match-btn" data-type="autogyro">Autogyro</button>
          </div>
          <div id="match-feedback" class="mt-3"></div>
        </div>
      `;
      container.querySelectorAll('.match-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const chosen = btn.dataset.type;
          const correct = chosen === s.answer;
          if (correct) score++;
          document.getElementById('match-feedback').innerHTML = `
            <div class="callout ${correct ? 'callout-mission' : 'callout-warning'}">
              <div class="callout-icon">${correct ? '✅' : '❌'}</div>
              <div>${correct ? 'Correct!' : 'Not quite.'} ${s.reason}</div>
            </div>
            <button class="btn btn-primary mt-3" id="next-match">Next</button>
          `;
          document.getElementById('next-match').addEventListener('click', () => { idx++; render(); });
        });
      });
    };
    render();
  },

  torqueTrouble(container) {
    container.innerHTML = `
      <div class="mini-game">
        <h3>Torque Trouble</h3>
        <p>The helicopter body is spinning! Choose the right fix.</p>
        <div style="font-size:4rem;text-align:center;margin:var(--space-4) 0" id="spin-body" class="animate-spin">🚁</div>
        <div class="row gap-3 justify-center">
          <button class="btn btn-secondary fix-btn" data-fix="tail">Add Tail Rotor</button>
          <button class="btn btn-secondary fix-btn" data-fix="bigger">Bigger Main Rotor</button>
          <button class="btn btn-secondary fix-btn" data-fix="weight">Add Weight</button>
        </div>
        <div id="torque-feedback" class="mt-3"></div>
      </div>
    `;
    container.querySelectorAll('.fix-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const fix = btn.dataset.fix;
        const correct = fix === 'tail';
        document.getElementById('torque-feedback').innerHTML = `
          <div class="callout ${correct ? 'callout-mission' : 'callout-warning'}">
            <div class="callout-icon">${correct ? '✅' : '❌'}</div>
            <div>${correct ? 'Correct! The tail rotor counters torque.' : 'That would not stop the spin. Try the tail rotor.'}</div>
          </div>
        `;
        if (correct) {
          document.getElementById('spin-body').classList.remove('animate-spin');
          App.addXP(15);
        }
      });
    });
  },

  controlLab(container) {
    container.innerHTML = `
      <div class="mini-game">
        <h3>Control Lab</h3>
        <p>Use Cyclic and Collective to move the helicopter.</p>
        <div class="game-canvas" id="control-canvas">
          <div id="lab-heli" style="position:absolute;left:50%;top:60%;transform:translate(-50%,-50%);font-size:2.5rem;transition:all 0.5s">🚁</div>
        </div>
        <div class="row gap-4 mt-3">
          <div class="col">
            <label>Cyclic (Direction)</label>
            <div class="flex gap-2 justify-center mt-2">
              <button class="btn btn-sm btn-secondary" id="cyc-left">←</button>
              <button class="btn btn-sm btn-secondary" id="cyc-forward">↑</button>
              <button class="btn btn-sm btn-secondary" id="cyc-back">↓</button>
              <button class="btn btn-sm btn-secondary" id="cyc-right">→</button>
            </div>
          </div>
          <div class="col">
            <label>Collective (Lift)</label>
            <input type="range" min="0" max="100" value="50" class="slider-control" id="lab-collective">
          </div>
        </div>
      </div>
    `;
    const heli = document.getElementById('lab-heli');
    let x = 50, y = 60;
    document.getElementById('cyc-left').addEventListener('click', () => { x = Math.max(10, x - 15); update(); });
    document.getElementById('cyc-right').addEventListener('click', () => { x = Math.min(90, x + 15); update(); });
    document.getElementById('cyc-forward').addEventListener('click', () => { y = Math.max(10, y - 15); update(); });
    document.getElementById('cyc-back').addEventListener('click', () => { y = Math.min(90, y + 15); update(); });
    document.getElementById('lab-collective').addEventListener('input', (e) => {
      const val = e.target.value;
      heli.style.transform = `translate(-50%, -50%) scale(${0.8 + val/200})`;
    });
    function update() {
      heli.style.left = x + '%';
      heli.style.top = y + '%';
    }
  }
};
