export default () => {
  const containerWelcome = document.createElement("div");

  const templateWelcome = `
    <section class="screen" id="pageWelcome">
      <img src="./imagens/logo.svg" alt="logo" />
      <p class="welcome">
        Seja bem-vindo ao Trivia sobre mitologia grega
        <span id="welcome-name">Nome do jogador</span>, está preparado?
      </p>
      <button class="btn" id="btnStart">Começar</button>
    </section>
  `;

  containerWelcome.innerHTML = templateWelcome;

  const btnStart = containerWelcome.querySelector("#btnStart");

  btnStart.addEventListener("click", () => {
    window.location.hash = "#quiz"; // ← isso dispara o hashchange no script.js
  }); //   que chama quiz() → showQuestion()

  return containerWelcome;
};
