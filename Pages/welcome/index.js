export default () => {
  const containerWelcome = document.createElement("div");

  const tamplateWelcome = `
        <section class="screen" class="hidden" id="pageWelcome">
        <img src="./imagens/logo.svg" alt="logo" />
        <p class="welcome">Seja bem-vindo ao Trivia sobre mitologia grega <span id="welcome-name">Nome do jogador</span>, está
            preparado?
        </p>
        <button class="btn" onclick="showQuestion()">Começar</button>
        </section>
    `;

  containerWelcome.innerHTML = tamplateWelcome;

  return containerWelcome;
};
