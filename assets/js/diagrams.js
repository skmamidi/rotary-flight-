// Rotary Flight App - diagrams.js
// Diagram interactions, hotspots, sliders, animations

const Diagrams = {
  initRotorSpeedSlider(containerId, outputId) {
    const container = document.getElementById(containerId);
    const output = document.getElementById(outputId);
    if (!container || !output) return;
    container.addEventListener('input', (e) => {
      const val = e.target.value;
      let text = 'Low lift';
      if (val > 30) text = 'Increasing lift';
      if (val > 60) text = 'Strong lift';
      if (val > 85) text = 'High drag warning!';
      output.innerHTML = `<strong>${text}</strong> (${val}% speed)`;
      // Animate any rotor SVG in the page
      document.querySelectorAll('.rotor-svg, .rotor-svg-slow').forEach(el => {
        el.style.animationDuration = `${3 - (val / 50)}s`;
      });
    });
  },

  initAngleOfAttackSlider(containerId, outputId) {
    const container = document.getElementById(containerId);
    const output = document.getElementById(outputId);
    if (!container || !output) return;
    container.addEventListener('input', (e) => {
      const val = e.target.value;
      let text = 'Low angle - gentle lift';
      if (val > 8) text = 'Good angle - strong lift';
      if (val > 14) text = 'High angle - more drag';
      if (val > 18) text = 'Warning - approaching stall!';
      output.innerHTML = `<strong>${text}</strong> (${val}°)`;
    });
  },

  initTiltrotorSlider(containerId) {
    const slider = document.getElementById(containerId);
    if (!slider) return;
    slider.addEventListener('input', (e) => {
      const val = e.target.value;
      document.querySelectorAll('.tilt-nacelle').forEach(el => {
        el.style.transform = `rotate(${val}deg)`;
      });
      const label = document.getElementById('tilt-label');
      if (label) {
        if (val < 30) label.textContent = 'Vertical (Helicopter mode)';
        else if (val > 60) label.textContent = 'Horizontal (Airplane mode)';
        else label.textContent = 'Transition mode';
      }
    });
  },

  initHotspots(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.querySelectorAll('.hotspot').forEach(spot => {
      spot.addEventListener('click', () => {
        const term = spot.dataset.term;
        if (term && window.Glossary) Glossary.showPopup(term);
      });
    });
  },

  initTorqueDemo(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <div style="text-align:center;padding:var(--space-5)">
        <div id="torque-body" style="font-size:4rem;display:inline-block;transition:transform 0.5s">🚁</div>
        <div class="mt-3">
          <button class="btn btn-primary" id="spin-main">Spin Main Rotor</button>
          <button class="btn btn-teal hidden" id="apply-tail">Apply Tail Rotor</button>
          <button class="btn btn-secondary" id="reset-torque">Reset</button>
        </div>
        <p class="mt-3" id="torque-status">Press "Spin Main Rotor" to see torque in action.</p>
      </div>
    `;
    let spinning = false;
    const body = document.getElementById('torque-body');
    document.getElementById('spin-main').addEventListener('click', () => {
      spinning = true;
      body.style.transform = 'rotate(-45deg)';
      document.getElementById('torque-status').textContent = 'The body spins opposite to the rotor (Newton\'s 3rd Law)!';
      document.getElementById('apply-tail').classList.remove('hidden');
    });
    document.getElementById('apply-tail').addEventListener('click', () => {
      body.style.transform = 'rotate(0deg)';
      document.getElementById('torque-status').textContent = 'Tail rotor force counters torque. The body is steady!';
      App.addXP(10);
    });
    document.getElementById('reset-torque').addEventListener('click', () => {
      spinning = false;
      body.style.transform = 'rotate(0deg)';
      document.getElementById('torque-status').textContent = 'Press "Spin Main Rotor" to see torque in action.';
      document.getElementById('apply-tail').classList.add('hidden');
    });
  },

  initAutorotationDemo(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <div style="text-align:center;padding:var(--space-5)">
        <div style="position:relative;height:200px">
          <div id="auto-heli" style="position:absolute;left:50%;top:10%;transform:translateX(-50%);font-size:3rem;transition:top 2s">🚁</div>
          <div style="position:absolute;left:20%;top:50%;font-size:1.5rem;opacity:0.5">↑ Airflow</div>
        </div>
        <div class="mt-3">
          <button class="btn btn-primary" id="start-auto">Engine Off</button>
          <button class="btn btn-teal" id="pull-collective">Pull Collective</button>
        </div>
        <p class="mt-3" id="auto-status">Press "Engine Off" to start autorotation.</p>
      </div>
    `;
    document.getElementById('start-auto').addEventListener('click', () => {
      document.getElementById('auto-heli').style.top = '70%';
      document.getElementById('auto-status').textContent = 'Rotor spins from upward airflow. You are descending safely.';
    });
    document.getElementById('pull-collective').addEventListener('click', () => {
      document.getElementById('auto-heli').style.top = '50%';
      document.getElementById('auto-status').textContent = 'Pulling collective increases rotor speed for a soft landing!';
      App.addXP(10);
    });
  }
};
