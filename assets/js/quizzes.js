// Rotary Flight App - quizzes.js
// Quiz engine for all quiz types with randomization

const QuizEngine = {
  currentQuiz: [],
  currentIndex: 0,
  score: 0,
  answers: [],
  containerId: 'quiz-container',

  init(containerId = 'quiz-container') {
    this.containerId = containerId;
  },

  // Fisher-Yates shuffle
  shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  // Randomize a single question's answer options (for multiple choice)
  randomizeQuestion(q) {
    const copy = JSON.parse(JSON.stringify(q));
    if (copy.type === 'multiple_choice' && copy.options && copy.options.length > 1) {
      const correctText = copy.options[copy.correct];
      copy.options = this.shuffleArray(copy.options);
      copy.correct = copy.options.indexOf(correctText);
    }
    return copy;
  },

  loadQuiz(questions) {
    // Deep copy, randomize answer order for each question, then shuffle question order
    let processed = questions.map(q => this.randomizeQuestion(q));
    processed = this.shuffleArray(processed);
    this.currentQuiz = processed;
    this.currentIndex = 0;
    this.score = 0;
    this.answers = [];
    this.renderQuestion();
  },

  renderQuestion() {
    const container = document.getElementById(this.containerId);
    if (!container) return;
    const q = this.currentQuiz[this.currentIndex];
    const progressPct = ((this.currentIndex) / this.currentQuiz.length) * 100;

    let html = `
      <div class="quiz-header">
        <div class="quiz-progress">
          <span>Question ${this.currentIndex + 1} of ${this.currentQuiz.length}</span>
          <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${progressPct}%"></div></div>
        </div>
      </div>
      <div class="question-card">
        <div class="question-text"><span class="question-number">${this.currentIndex + 1}</span>${q.question}</div>
    `;

    if (q.type === 'multiple_choice') {
      html += `<div class="answer-options">`;
      q.options.forEach((opt, i) => {
        html += `
          <label class="answer-option" data-index="${i}">
            <input type="radio" name="q${this.currentIndex}" value="${i}">
            <span>${opt}</span>
          </label>
        `;
      });
      html += `</div>`;
    } else if (q.type === 'true_false') {
      // Randomize true/false button order
      const tfOrder = this.shuffleArray([{val:'true',label:'True'},{val:'false',label:'False'}]);
      html += `<div class="tf-buttons">`;
      tfOrder.forEach(item => {
        html += `<button class="tf-btn" data-value="${item.val}">${item.label}</button>`;
      });
      html += `</div>`;
    } else if (q.type === 'matching') {
      html += `<div class="matching-pairs">`;
      q.pairs.forEach((pair, i) => {
        html += `<div class="match-item" data-side="left" data-index="${i}">${pair.left}</div>`;
      });
      q.pairs.forEach((pair, i) => {
        html += `<div class="match-item" data-side="right" data-index="${i}">${pair.right}</div>`;
      });
      html += `</div>`;
    }

    html += `
      <div class="feedback-box" id="feedback-box"></div>
      <div class="mt-4">
        <button class="btn btn-primary" id="quiz-submit" ${q.type === 'multiple_choice' ? '' : 'disabled'}>Submit Answer</button>
        <button class="btn btn-secondary hidden" id="quiz-next">Next →</button>
      </div>
      </div>
    `;

    container.innerHTML = html;
    this.bindEvents(q);
  },

  bindEvents(q) {
    const container = document.getElementById(this.containerId);

    if (q.type === 'multiple_choice') {
      container.querySelectorAll('.answer-option').forEach(opt => {
        opt.addEventListener('click', () => {
          container.querySelectorAll('.answer-option').forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
          opt.querySelector('input').checked = true;
        });
      });
    } else if (q.type === 'true_false') {
      container.querySelectorAll('.tf-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          container.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          document.getElementById('quiz-submit').disabled = false;
        });
      });
    }

    document.getElementById('quiz-submit').addEventListener('click', () => this.checkAnswer(q));
    document.getElementById('quiz-next').addEventListener('click', () => this.nextQuestion());
  },

  checkAnswer(q) {
    let selected;
    if (q.type === 'multiple_choice') {
      const sel = document.querySelector('.answer-option.selected input');
      selected = sel ? parseInt(sel.value) : -1;
    } else if (q.type === 'true_false') {
      const sel = document.querySelector('.tf-btn.selected');
      selected = sel ? sel.dataset.value === 'true' : null;
    }

    const isCorrect = selected === q.correct;
    if (isCorrect) this.score++;
    this.answers.push({ question: q.question, correct: isCorrect, selected, answer: q.correct });

    const fb = document.getElementById('feedback-box');
    fb.className = `feedback-box show ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
    fb.innerHTML = `
      <div style="font-size:1.5rem">${isCorrect ? '✅' : '❌'}</div>
      <div>
        <strong>${isCorrect ? 'Correct!' : 'Not quite.'}</strong>
        ${q.explanation ? `<p class="mt-2">${q.explanation}</p>` : ''}
      </div>
    `;

    // Highlight options
    if (q.type === 'multiple_choice') {
      document.querySelectorAll('.answer-option').forEach((opt, i) => {
        if (i === q.correct) opt.classList.add('correct');
        else if (i === selected && !isCorrect) opt.classList.add('incorrect');
      });
    } else if (q.type === 'true_false') {
      document.querySelectorAll('.tf-btn').forEach(btn => {
        const val = btn.dataset.value === 'true';
        if (val === q.correct) btn.classList.add('correct');
        else if (btn.classList.contains('selected') && !isCorrect) btn.classList.add('incorrect');
      });
    }

    document.getElementById('quiz-submit').classList.add('hidden');
    document.getElementById('quiz-next').classList.remove('hidden');
  },

  nextQuestion() {
    this.currentIndex++;
    if (this.currentIndex < this.currentQuiz.length) {
      this.renderQuestion();
    } else {
      this.showResults();
    }
  },

  getStudyPathHref() {
    // Determine relative path to study-path.html based on current location
    const path = window.location.pathname;
    if (path.includes('/topics/') || path.includes('\\topics\\')) return '../../study-path.html';
    if (path.includes('/printable/') || path.includes('\\printable\\')) return '../study-path.html';
    return 'study-path.html';
  },

  showResults() {
    const container = document.getElementById(this.containerId);
    const pct = Math.round((this.score / this.currentQuiz.length) * 100);
    const deg = (pct / 100) * 360;
    let message = 'Keep practicing!';
    if (pct === 100) message = 'Perfect score! Outstanding!';
    else if (pct >= 80) message = 'Great job! Almost there!';
    else if (pct >= 60) message = 'Good effort! Review the tricky ones.';

    container.innerHTML = `
      <div class="score-summary">
        <h2>Quiz Complete!</h2>
        <div class="score-circle" style="--score-deg:${deg}deg">
          <div class="score-text">${pct}%</div>
        </div>
        <div class="score-message">${message}</div>
        <p>You got <strong>${this.score}</strong> out of <strong>${this.currentQuiz.length}</strong> correct.</p>
        <div class="flex justify-center gap-3 mt-4">
          <button class="btn btn-primary" onclick="location.reload()">Try Again</button>
          <a href="${this.getStudyPathHref()}" class="btn btn-secondary">Back to Study Path</a>
        </div>
      </div>
    `;

    // Save score
    const data = App.getData();
    const quizId = document.getElementById(this.containerId).dataset.quizId || 'default';
    data.quizScores[quizId] = pct;
    App.setData(data);
    App.checkBadges();
    if (pct === 100) App.addXP(25);
    else if (pct >= 80) App.addXP(15);
    else App.addXP(5);
  },

  // Quick Check mini quiz — one question at a time with randomization
  renderQuickCheck(containerId, questions) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Randomize each question's answer choices and shuffle question order
    let qs = questions.map(q => this.randomizeQuestion(q));
    qs = this.shuffleArray(qs);

    const state = {
      questions: qs,
      index: 0,
      score: 0,
      container: container
    };

    const render = () => {
      if (state.index >= state.questions.length) {
        container.innerHTML = `
          <div class="quick-check">
            <div class="quick-check-title">🎉 Quick Check Complete</div>
            <div class="text-center mt-4">
              <p style="font-size:1.25rem;font-weight:700">Score: ${state.score} / ${state.questions.length}</p>
              <button class="btn btn-primary mt-3" onclick="location.reload()">Try Again</button>
            </div>
          </div>
        `;
        if (state.score === state.questions.length) App.addXP(10);
        return;
      }

      const q = state.questions[state.index];
      const progressPct = ((state.index) / state.questions.length) * 100;

      container.innerHTML = `
        <div class="quick-check">
          <div class="quick-check-title">🧠 Quick Check</div>
          <div class="quiz-header">
            <div class="quiz-progress">
              <span>Question ${state.index + 1} of ${state.questions.length}</span>
              <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${progressPct}%"></div></div>
            </div>
          </div>
          <div class="question-text mt-3"><span class="question-number">${state.index + 1}</span>${q.question}</div>
          <div class="answer-options mt-3">
            ${q.options.map((opt, i) => `
              <label class="answer-option" data-index="${i}">
                <input type="radio" name="qc-opt" value="${i}">
                <span>${opt}</span>
              </label>
            `).join('')}
          </div>
          <div class="feedback-box" id="qc-feedback"></div>
          <div class="flex gap-3 mt-4">
            <button class="btn btn-primary" id="qc-submit">Submit Answer</button>
            <button class="btn btn-secondary hidden" id="qc-next">Next →</button>
          </div>
        </div>
      `;

      container.querySelectorAll('.answer-option').forEach(opt => {
        opt.addEventListener('click', () => {
          container.querySelectorAll('.answer-option').forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
          opt.querySelector('input').checked = true;
        });
      });

      container.querySelector('#qc-submit').addEventListener('click', () => {
        const sel = container.querySelector('.answer-option.selected input');
        const selected = sel ? parseInt(sel.value) : -1;
        const isCorrect = selected === q.correct;
        if (isCorrect) state.score++;

        const fb = container.querySelector('#qc-feedback');
        fb.className = `feedback-box show ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
        fb.innerHTML = `
          <div style="font-size:1.5rem">${isCorrect ? '✅' : '❌'}</div>
          <div>
            <strong>${isCorrect ? 'Correct!' : 'Not quite.'}</strong>
            ${q.explanation ? `<p class="mt-2">${q.explanation}</p>` : ''}
            ${!isCorrect ? `<p class="mt-2">The correct answer is: <strong>${q.options[q.correct]}</strong></p>` : ''}
          </div>
        `;

        container.querySelectorAll('.answer-option').forEach((opt, i) => {
          if (i === q.correct) opt.classList.add('correct');
          else if (i === selected && !isCorrect) opt.classList.add('incorrect');
          opt.style.pointerEvents = 'none';
        });

        container.querySelector('#qc-submit').classList.add('hidden');
        container.querySelector('#qc-next').classList.remove('hidden');
      });

      container.querySelector('#qc-next').addEventListener('click', () => {
        state.index++;
        render();
      });
    };

    render();
  }
};
