const tela = document.querySelector(".tela");
const vermelho = document.getElementById("vermelho");
const verde = document.getElementById("verde");
const resetar = document.querySelector(".resetar");
const treinar = document.querySelector(".treinar");
const taxa = document.querySelector(".taxa");
const inserir = document.querySelector(".inserir");
const log = document.querySelector("#log");
const modal = document.querySelector('.modal');
const close = document.querySelector('.btn-close'); 

let amostras = [];
let saidas = [];

let pincel = "vazio";

let Neuronio;

vermelho.addEventListener("click", () => {
  pincel = "vermelho";
  verde.classList.remove("selected");
  vermelho.classList.add("selected");
  tela.classList.add("cruz");
});

verde.addEventListener("click", () => {
  vermelho.classList.remove("selected");
  verde.classList.add("selected");
  pincel = "verde";
  tela.classList.add("cruz");
});

tela.addEventListener("click", (event) => {
  if (pincel === "vazio") return;
  
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.left = event.layerX - 15 + "px";
  div.style.top = event.layerY - 15 + "px";
  tela.appendChild(div);

  div.addEventListener('click', (event) => {
    event.stopPropagation();
    div.parentNode.removeChild(div);
  })

  if (pincel === "verde") {
    div.classList.add("verde");
    amostras.push([event.layerX, event.layerY]);
    saidas.push(1);
  } else if (pincel === "vermelho") {
    div.classList.add("vermelho");
    amostras.push([event.layerX, event.layerY]);
    saidas.push(-1);
  } else if (pincel === "inserir") {
    if (Neuronio.operacao([-1, event.layerX, event.layerY]) === 1) {
      div.classList.add("verde", "selected");
    } else {
      div.classList.add("vermelho", "selected");
    }
  }
});

resetar.addEventListener("click", () => {
  vermelho.classList.remove("selected");
  verde.classList.remove("selected");
  pincel = "vazio";
  tela.classList.remove("cruz");
  amostras = [];
  saidas = [];
  tela.innerHTML = "";
  log.innerHTML = "";
});

treinar.addEventListener("click", (event) => {
  tela.classList.remove("cruz");
  vermelho.classList.remove("selected");
  verde.classList.remove("selected");
  event.preventDefault();
  modal.classList.remove('escondido');
  document.querySelectorAll(".tela .selected").forEach((x) => x.parentNode.removeChild(x));
  pincel = "vazio";
  const n = new Neurônio(parseFloat(taxa.value), amostras, saidas, true);
  n.treinar();
  Neuronio = n;
});

inserir.addEventListener("click", (event) => {
  tela.classList.add("cruz");
  vermelho.classList.remove("selected");
  verde.classList.remove("selected");
  pincel = "inserir";
});

close.addEventListener("click", (event) => {
  modal.classList.add("escondido");
});

(function (logger) {
  console.old = console.log;
  console.log = function () {
    var output = "",
      arg,
      i;

    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      output += '<span class="log-' + typeof arg + '">';

      if (
        typeof arg === "object" &&
        typeof JSON === "object" &&
        typeof JSON.stringify === "function"
      ) {
        output += JSON.stringify(arg);
      } else {
        output += arg;
      }

      output += "</span>&nbsp;";
    }

    log.innerHTML += output + "<br>";
    console.old.apply(undefined, arguments);
  };
})(document.getElementById("logger"));
