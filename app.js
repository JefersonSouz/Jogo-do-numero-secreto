let listaDeNumerosSorteados = []; //lista de numeros sorteados para n sortear novamente
let numeroMaximo = 15;
let tentativas = 1;
//A variavel recebe o retorno da função gerarNumeroAleatorio
let numeroSecreto = gerarNumeroAleatorio();



//Manipular texto no hmtl
//let titulo seleção do titulo no html
//let titulo = document.querySelector('h1');
//Inserção de texto no h1 do html
//titulo.innerHTML = 'Jogo do número secreto';
//seleção do paragrafo
//let paragrafo = document.querySelector('p');
//inserção do texto no paragrafo p
//paragrafo.innerHTML = `Escolha um número entre 1 e ${numeroMaximo}`;
//aproveitamento de codigo

//Todo o código acima foi alterado para esta função  exibirTextoNaTela(função com parametro)
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

//Invocando a função exibirTextoNaTela
function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Bem vindo, ao jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximo}`);
}
exibirMensagemInicial();

//função para verificar o chute ao clicar o botão
function verificarChute(){
    let chute = document.querySelector('input').value; //pegar o valor digitado pelo chute
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1','Parabéns você acertou!');
        let palavraTentativa = tentativas >1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `O número secreto ${numeroSecreto} com ${tentativas} ${palavraTentativa}.`;
        exibirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
        } else{
            exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();

    }
   
}



//Função para gerar numero aleatorio (com retorno)
function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

   if (quantidadeDeElementosNaLista == numeroMaximo ){
    listaDeNumerosSorteados = [];
   }

   //verificar se na LISTA já tem o numero escolhido
   if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio(); //se o numero ja esta sorteado fazer recurção função chama a função novamente e verifica caso já tenha na lista ele gera um novo numero
   } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
   }
}


function limparCampo() {
    chute = document.querySelector('input');  
    chute.value = '';
  }

  function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
  }