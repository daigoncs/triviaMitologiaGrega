export default () => {
  const containerResult = document.createElement("div");

  const tamplateResult = `
    <section class="screen" class="hidden" id="pageResult">
        <div id="medusa-result"></div>
        <div class="res-title" id="res-title"></div>
        <div class="res-sub"   id="res-sub"></div>
        <div class="res-label"></div>
        <div class="res-score" id="res-score"></div>
        <div class="res-hearts" id="res-hearts"></div>
        <button class="btn" onclick="resetQuiz()" style="margin-bottom:12px">Jogar novamente</button>
        <button class="btn btn-ghost" onclick="goToLogin()">Trocar jogador</button>
    </div>
    
    </section>
    `;

  containerResult.innerHTML = tamplateResult;

  return containerResult;
};

function showResult() {
  document.getElementById("pageQuiz").style.display = "none";
  document.getElementById("pageResult").style.display = "block";

  document.getElementById("res-score").textContent =
    pontuacao + "/" + questions.length;

  let mensagem = "";

  if (pontuacao <= 3) {
    mensagem = "Você precisa estudar mais.";
  } else if (pontuacao <= 7) {
    mensagem = "Bom desempenho!";
  } else {
    mensagem = "Parabéns ! Você domina a mitologia grega";
  }

  document.getElementById("res-sub").textContent = mensagem;
}

function resetQuiz() {
  questionAtual = 0;
  pontuacao = 0;
  answered = false;

  document.getElementById("pageResult").style.display = "none";
  document.getElementById("pageQuiz").style.display = "block";

  showQuestion();
}
