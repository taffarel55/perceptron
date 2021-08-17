const { vetorAleatorio, sinal, saoIguais, subtrair } = require("./generate");

class Neurônio {
  constructor(n, amostras, saidas, entradas) {
    if (amostras && saidas) {
      amostras.forEach((a) => a.unshift(-1));
      this.n = n ?? 0.2;
      this.amostras = amostras;
      this.saidas = saidas;
      this.entradas = entradas ?? [0, 0, 0];
      this.pesos = vetorAleatorio(amostras[0].length, 0, 0.5);
    }
  }

  treinar() {
    let epoca = 0;
    let erro = true;
    let u = [];
    let y = [];

    console.log("Neuro abaixo será treinado:");
    console.log("Amostras:", this.amostras);
    console.log("Saídas:", this.saidas);
    console.log("Pesos sinápticos:", this.pesos);
    console.log("Taxa de aprendizado:", this.n);

    console.log("Iniciando o treinamento do Neuro...");
    while (erro) {
      let j = 0;
      let acumulo;
      amostras.forEach((amostra) => {
        acumulo = 0;
        for (let i = 0; i < amostra.length; i++) {
          acumulo += amostra[i] * this.pesos[i];
        }
        u[j++] = acumulo;
      });
      y = sinal(u);

      console.log(`\nÉpoca ${epoca}:`);
      console.log(`Saídas esperadas:`, this.saidas);
      console.log(`Saídas obtidas  :`, y);
      console.log(`Pesos atuais: `, this.pesos);

      if (!saoIguais(y, saidas)) {
        const diferenca = subtrair(saidas, y);
        let inc = [];
        for (let i = 0; i < diferenca.length; i++) {
          inc[i] = this.amostras[i].map((x) => x * diferenca[i]);
        }
        let novo = [];
        inc[0].map((x) => novo.push(0));
        for (let i = 0; i < inc.length; i++) {
          for (let j = 0; j < inc[i].length; j++) {
            novo[j] += inc[i][j];
          }
        }

        for (let i = 0; i < novo.length; i++) {
          this.pesos[i] += novo[i];
        }
      } else {
        erro = false;
      }

      epoca++;
      if (!erro) break;
    }
  }
}

module.exports = { Neurônio };
