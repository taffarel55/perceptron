N = 50 # Número total de pontos de cada classe

verde_x = runif(N, min = 0.4, max = 1)
verde_y = runif(N, min = 0.4, max = 1)

vermelho_x = runif(N, min = 0, max = 0.6)
vermelho_y = runif(N, min = 0, max = 0.6)

amostras_x = c(verde_x, vermelho_x)
amostras_y = c(verde_y, vermelho_y)
amostrasSaidas = c(rep(-1,N), rep(1,N))

par(pty="s")
plot(amostras_x, amostras_y, main='Amostras iniciais', 
     type='n', xlab='X', ylab='Y')
points(verde_x, verde_y, col='green')
points(vermelho_x, vermelho_y, col='red')

w0 = 0.1          # Limiar de ativação
w1 = 0.2          # Peso x inicial
w2 = 0.3          # Peso y inicial

M = 50            # Numero de épocas
eta = 0.1         # Taxa de aprendizagem da rede
ac = 0.93         # Acurácia para parar
temErro = F       # Flag para imprimir respostas 

for (i in 1:M){
  print(paste('Época: ', i))

  index = 1:(2*N)
  index = sample(index) # Embaralhar amostras

  for (j in index){
    u_j = w0 + w1*amostras_x[j] + w2*amostras_y[j]
    if (u_j >= 0){
      y_j = 1
    } else {
      y_j = -1}

    w0 = w0 + eta*(amostrasSaidas[j] - y_j)*1.0
    w1 = w1 + eta*(amostrasSaidas[j] - y_j)*amostras_x[j]
    w2 = w2 + eta*(amostrasSaidas[j] - y_j)*amostras_y[j]

    if (temErro == T){
      print(paste('  -> Atualizando ', j, ' : '))
      print(paste('     -> w0: ' ,w0))
      print(paste('     -> w0: ' ,w1))
      print(paste('     -> w0: ' ,w2))
    }
  }
  y_all = w0 + w1*amostras_x + w2*amostras_y
  y_pred = y_all
  y_pred[y_all >= 0] = 1
  y_pred[y_all< 0] = -1

  acc = sum(y_pred == amostrasSaidas)/length(amostrasSaidas)
  print(paste('Final da época: ', i, ' com: ', acc, '% de acurácia'))
  if (acc >= ac){
    break
  }
}

y_all = w0 + w1*amostras_x + w2*amostras_y
y_pred = y_all
y_pred[y_all >= 0] = 1
y_pred[y_all< 0] = -1

acc = sum(y_pred == amostrasSaidas)/length(amostrasSaidas)

plot(main='Reta de classificação obtida', amostras_x, amostras_y, 
     type='n', xlab='X', ylab='Y')
points(verde_x, verde_y, col='green')
points(vermelho_x, vermelho_y, col='red')
abline(a = -1.0*w0/w2, b = -1.0*w1/w2, col='purple', lwd=3, lty=2)
legend(0,1,legend = acc, col='purple', lwd=3, lty=2)
print (acc)
