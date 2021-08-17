function numAleatorio(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function vetorAleatorio(n, min, max) {
  let vetor = [];
  for (let i = 0; i < n; i++) {
    vetor.push(parseFloat(numAleatorio(min, max)));
  }
  return vetor;
}

module.exports = {
  numAleatorio,
  vetorAleatorio,
};
