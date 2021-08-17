const tela = document.querySelector(".tela");
const vermelho = document.getElementById("vermelho");
const verde = document.getElementById("verde");
const resetar = document.querySelector(".resetar");
const treinar = document.querySelector(".treinar");
const taxa = document.querySelector(".taxa");

let amostras = [];
let saidas = [];

let pincel = "vazio";

vermelho.addEventListener("click", () => {
  pincel = "vermelho";
});

verde.addEventListener("click", () => {
  pincel = "verde";
});

tela.addEventListener("click", (event) => {
  if (pincel === "vazio") return;
  amostras.push([event.layerX, event.layerY]);

  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.left = event.layerX - 15 + "px";
  div.style.top = event.layerY - 15 + "px";
  tela.appendChild(div);

  if (pincel === "verde") {
    div.classList.add("verde");
    saidas.push(1);
  } else {
    div.classList.add("vermelho");
    saidas.push(-1);
  }
});

resetar.addEventListener("click", () => {
  pincel = "vazio";
  amostras = [];
  saidas = [];
  tela.innerHTML = "";
});

treinar.addEventListener("click", () => {
  pincel = "vazio";
  const n = new Neurônio(parseFloat(taxa.value), amostras, saidas, 1);
  n.treinar();
  console.log(n);
});
