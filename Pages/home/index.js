export default () => {
  const containerHome = document.createElement("div");

  const templateHome = `
    <section class="screen" id="pageLogin">
      <img src="./imagens/logo.svg" alt="logo" />
      <h1>Trivia</h1>
      <h2>Mitologia Grega</h2>
      <button class="btn" id="btnLogin">Entrar</button>
    </section>
  `;

  containerHome.innerHTML = templateHome;

  const login = containerHome.querySelector("#btnLogin");

  login.addEventListener("click", () => {
    console.log("entrou");
  });

  return containerHome;
};
