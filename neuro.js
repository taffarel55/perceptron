const generate = require("./generate");

class Neurônio {
  constructor(n, amostras, saidas, entradas) {
    if (amostras && saidas) {
      const tam = amostras[0].length;
      amostras.forEach((a) => a.unshift(-1));
      this.n = n ?? 0.5;
      this.amostras = amostras;
      this.saidas = saidas;
      this.entradas = entradas ?? [0, 0, 0];
      this.pesos = generate.vetorAleatorio(tam, 0, 1);
    }
  }

  saida() {
    return 1;
  }
}

module.exports = { Neurônio };
