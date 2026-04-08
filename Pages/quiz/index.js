const questions = [
  {
    text: "Quem é o rei dos deuses do Olimpo, senhor dos raios?",
    options: ["Poseidon", "Zeus", "Hades", "Apolo"],
    correct: 1,
  },
  {
    text: "Qual deus governa os mares e oceanos com seu tridente?",
    options: ["Zeus", "Ares", "Poseidon", "Hefesto"],
    correct: 2,
  },
  {
    text: "Quem reina no submundo, o reino dos mortos?",
    options: ["Tânatos", "Hades", "Érebos", "Caronte"],
    correct: 1,
  },
  {
    text: "De qual parte do corpo de Zeus nasceu a deusa Atena?",
    options: ["Do coração", "Do ombro", "Da cabeça", "Da mão"],
    correct: 2,
  },
  {
    text: "Quais foram os três grandes deuses que derrotaram Cronos?",
    options: [
      "Do Sol, do vinho e da terra",
      "Da guerra, sabedoria e céu",
      "Zeus, Poseidon e Hades",
      "Do mar, dos mortos e do ar",
    ],
    correct: 2,
  },
  {
    text: "Qual herói realizou os famosos Doze Trabalhos?",
    options: ["Aquiles", "Teseu", "Perseu", "Héracles"],
    correct: 3,
  },
  {
    text: "Medusa foi morta por qual herói usando um escudo como espelho?",
    options: ["Teseu", "Perseu", "Belerofonte", "Odisseu"],
    correct: 1,
  },
  {
    text: "Qual jovem voou perto demais do Sol com asas de cera?",
    options: ["Dédalo", "Narciso", "Ícaro", "Fáeton"],
    correct: 2,
  },
  {
    text: "Qual músico desceu ao submundo para resgatar Eurídice?",
    options: ["Apolo", "Orfeu", "Pan", "Hermes"],
    correct: 1,
  },
  {
    text: "O Cavalo de Troia foi ideia de qual herói grego astuto?",
    options: ["Aquiles", "Agamêmnon", "Odisseu", "Ájax"],
    correct: 2,
  },
];

let questionAtual = 0;
let pontuacao = 0;
let lives = 3;
let time = 15;
let timerInterval = null;
let answered = false;

const templateQuiz = `
  <section class="screen" id="pageQuiz">
    <div class="topbar">
      <div class="tb-item"><span id="q-counter">1/10</span></div>
      <div class="tb-item">
        <span>⏰</span>
        <span id="timer-val">00:15</span>
      </div>
      <div class="tb-item"><span id="lives-disp">3 ❤️</span></div>
    </div>
    <div class="quiz-body">
      <div class="question-box"><p id="questionText">...</p></div>
      <div class="options-list" id="opts"></div>
      <div class="next-wrap" id="next-wrap" style="display:none">
        <button class="btn" id="next-btn">Próxima →</button>
      </div>
    </div>
  </section>
`;

function startTimer(timerEl, onTimeout) {
  clearInterval(timerInterval);
  time = 15;
  timerEl.textContent = "00:15";

  timerInterval = setInterval(() => {
    time--;
    const mins = String(Math.floor(time / 60)).padStart(2, "0");
    const secs = String(time % 60).padStart(2, "0");
    timerEl.textContent = `${mins}:${secs}`;

    if (time <= 0) {
      clearInterval(timerInterval);
      onTimeout();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function renderOptions(opts, question, nextWrap) {
  opts.innerHTML = "";

  question.options.forEach((optText, i) => {
    const btn = document.createElement("button");
    btn.className = "btn-option";
    btn.textContent = optText;

    btn.addEventListener("click", () => {
      if (answered) return;
      answered = true;
      stopTimer();

      opts.querySelectorAll(".btn-option").forEach((b, j) => {
        b.disabled = true;
        if (j === question.correct) b.classList.add("correct");
      });

      if (i === question.correct) {
        pontuacao++;
      } else {
        btn.classList.add("wrong");
        lives--;
      }

      nextWrap.style.display = "block";
    });

    opts.appendChild(btn);
  });
}

export function showQuestion(containerQuiz) {
  answered = false;

  const questionText = containerQuiz.querySelector("#questionText");
  const opts = containerQuiz.querySelector("#opts");
  const nextBtn = containerQuiz.querySelector("#next-btn");
  const nextWrap = containerQuiz.querySelector("#next-wrap");
  const timerEl = containerQuiz.querySelector("#timer-val");
  const qCounter = containerQuiz.querySelector("#q-counter");
  const livesDisp = containerQuiz.querySelector("#lives-disp");

  qCounter.textContent = `${questionAtual + 1}/${questions.length}`;
  livesDisp.textContent = `${lives} ❤️`;
  nextWrap.style.display = "none";

  const question = questions[questionAtual];
  questionText.textContent = question.text;
  renderOptions(opts, question, nextWrap);
  startTimer(timerEl, () => {
    lives--;
    livesDisp.textContent = `${lives} ❤️`;
    nextWrap.style.display = "block";
  });

  nextBtn.onclick = () => {
    questionAtual++;
    if (questionAtual < questions.length && lives > 0) {
      showQuestion(containerQuiz);
    } else {
      window.location.hash = "#result";
    }
  };
}

export default function initQuiz() {
  questionAtual = 0;
  pontuacao = 0;
  lives = 3;
  answered = false;

  const containerQuiz = document.createElement("div");
  containerQuiz.innerHTML = templateQuiz;

  showQuestion(containerQuiz);
  return containerQuiz;
}
