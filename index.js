const { Neurônio } = require("./neuro.js");

amostras = [
  [0.3, 0.1],
  [0.3, 0.7],
  [0, 0.2],
  [0.4, 0.5],
  [0.6, 0.7],
  [0.4, 0],
];

saidas = [-1, 1, -1, 1, 1, -1];

const n = new Neurônio(0.2, amostras, saidas, 1);

n.treinar();
