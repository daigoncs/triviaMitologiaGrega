import home from "./Pages/home/index.js";
import quiz from "./Pages/quiz/index.js";
import result from "./Pages/result/index.js";
import welcome from "./Pages/welcome/index.js";

const main = document.querySelector("#root");

const init = () => {
  window.addEventListener("hashchange", () => {
    main.innerHTML = "";
    switch (window.location.hash) {
      case "":
        main.appendChild(home());
        break;
      case "#welcome":
        main.appendChild(welcome());
        break;
      case "#quiz":
        main.appendChild(quiz());
        break;
      case "#result":
        main.appendChild(result());
        break;
      default:
    }
  });
};

window.addEventListener("load", () => {
  main.appendChild(home());
  init();
});
