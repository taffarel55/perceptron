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

function sinal(vetor) {
  const retorno = vetor.map((item) => {
    if (item >= 0) {
      return 1;
    } else if (item < 0) {
      return -1;
    }
  });
  return retorno;
}

function saoIguais(a, b) {
  if (a.length !== b.length) return false;
  let equal = true;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      equal = false;
      break;
    }
  }
  return equal;
}

const subtrair = (arr1, arr2) =>
  arr1.map(function (num, idx) {
    return num - arr2[idx];
  });

module.exports = {
  numAleatorio,
  vetorAleatorio,
  sinal,
  saoIguais,
  subtrair,
};
