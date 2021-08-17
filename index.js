const { Neurônio } = require("./neuro");

amostras = [
  [0.1, 0.4, 0.7],
  [0.3, 0.7, 0.2],
  [0.6, 0.9, 0.8],
  [0.5, 0.7, 0.1],
];

saidas = [[1], [-1], [-1], [1]];

const n = new Neurônio(0.2, amostras, saidas);

console.log(n);
