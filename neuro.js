class Neurônio {
  constructor(w1, w2) {
    (this.w1 = w1 ?? numeroAleatorio(0, 1)),
      (this.w2 = w2 ?? numeroAleatorio(0, 1));
  }
}

function numeroAleatorio(min, max) {
  return Math.random() * (max - min) + min;
}

const n = new Neurônio();

console.log(n);
