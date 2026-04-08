export default () => {
  const containerQuiz = document.createElement("div");

  const tamplateQuiz = `
    <section class="screen" class="hidden" id="pageQuiz">
            <div class="topbar">
                <div class="tb-item"><span id="q-counter">1/10</span></div>
                <div class="tb-item">
                    <span style="font-size:1.2rem">⏰</span>
                    <span class="timer-val" id="timer-val">00:15</span>
                </div>
                <div class="tb-item"><span id="lives-disp">3 ❤️</span></div>
            </div>
            <div class="quiz-body">
                <div class="question-box"><p id="questionText">...</p></div>
                <div class="options-list" id="opts"></div>
                <div class="next-wrap" id="next-wrap" style="display:none">
                <button class="btn" id="next-btn" onclick="nextQuestion()">Próxima →</button>
            </div>
        </div>
    </section>
`;

  containerQuiz.innerHTML = tamplateQuiz;

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

  let playerName = "",
    questionAtual = 0,
    pontuacao = 0,
    lives = 3,
    time = 15,
    timerInterval = null,
    answered = false;

  const questionText = document.getElementById("questionText");
  const opts = document.getElementById("opts");

  function showQuestion() {
    const question = questions[questionAtual];

    questionText.textContent = question.text;

    //contador de questão
    const counter = document.getElementById("q-counter");
    counter.textContent = `${questionAtual + 1}/${questions.length}`;

    opts.innerHTML = "";

    question.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("option");

      button.onclick = () => selectAnswer(button, index);

      opts.appendChild(button);
    });
  }

  function selectAnswer(button, index) {
    if (answered) return; // evita múltiplos cliques

    answered = true;

    const correctIndex = questions[questionAtual].correct;
    const buttons = opts.children;

    // percorre todos os botões
    for (let i = 0; i < buttons.length; i++) {
      if (i === correctIndex) {
        buttons[i].classList.add("correct");
      } else if (i === index) {
        buttons[i].classList.add("wrong");
      }

      buttons[i].disabled = true;
    }

    // pontuação
    if (index === correctIndex) {
      pontuacao++;
    }

    // mostrar botão próxima
    document.getElementById("next-wrap").style.display = "block";
  }

  function nextQuestion() {
    questionAtual++;
    answered = false;

    if (questionAtual < questions.length) {
      document.getElementById("next-wrap").style.display = "none";
      showQuestion();
    } else {
      showResult();
    }
  }
  /*
answered = false;
document.getElementById("next-wrap").style.display = "none";
*/

  return containerQuiz;
};
