/* eslint-disable prefer-destructuring */
/* eslint-disable no-lonely-if */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
let turn = 'X';
let board = [[], [], []];
let nivel = 0;
let movFinal = '';
// muda o turno
function switchTurn() {
  turn = (turn === 'X') ? 'círculo' : 'X';
  if (turn === 'X') {
    document.getElementById('jogador').innerHTML = "Sua vez <img id='imgturn' align='center' height='45px' src='img/x.png'></img>!";
  } else {
    document.getElementById('jogador').innerHTML = "Agora, é minha vez: <img id='imgturn' align='center' height='45px' src='img/o.png'></img>";
  }
}
// verifica se alguem ganhou
function verifyWin() {
  let win = false;
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === turn && board[i][1] === turn && board[i][2] === turn) {
      win = true;
      break;
    } else if (board[0][i] === turn && board[1][i] === turn && board[2][i] === turn) {
      win = true;
      break;
    }
  }
  // diagornal principal
  if (board[0][0] === turn && board[1][1] === turn && board[2][2] === turn) {
    win = true;
  // diagonal secundária
  } else if (board[0][2] === turn && board[1][1] === turn && board[2][0] === turn) {
    win = true;
  }
  return win;
}
// verifica se o jogo terminou, ou seja se não há mais casas jogáveis
function verifyTie() {
  let count = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === 'X' || board[i][j] === 'círculo') count++;
    }
  }
  return (count === 9);
}
// cria o texto e o botao após o término do jogo
function createTags() {
  const result = document.createElement('div');
  const button = document.createElement('input');
  button.setAttribute('onclick', 'restart()');
  button.setAttribute('type', 'button');
  button.setAttribute('value', 'resetar partida');
  button.setAttribute('class', 'btn');
  result.setAttribute('id', 'result');
  document.body.querySelector('section#interface').appendChild(result);
  document.body.querySelector('section#interface').appendChild(button);
}
// Verifica minhas chances
function verificaMinhasChances() {
  // iniciando em 00
  if (board[0][0] === 'círculo' && board[0][1] === 'círculo' && board[0][2] == null) movFinal = '02';
  else if (board[0][1] === 'círculo' && board[0][2] === 'círculo' && board[0][1] == null) movFinal = '01';
  else if (board[0][2] === 'círculo' && board[0][1] === 'círculo' && board[0][0] == null) movFinal = '00';
  else if (board[0][0] === 'círculo' && board[1][1] === 'círculo' && board[2][2] == null) movFinal = '22';
  else if (board[0][0] === 'círculo' && board[2][2] === 'círculo' && board[1][1] == null) movFinal = '11';
  else if (board[0][2] === 'círculo' && board[1][1] === 'círculo' && board[2][0] == null) movFinal = '20';
  else if (board[0][2] === 'círculo' && board[2][0] === 'círculo' && board[1][1] == null) movFinal = '11';
  else if (board[0][0] === 'círculo' && board[1][0] === 'círculo' && board[2][0] == null) movFinal = '20';
  else if (board[0][0] === 'círculo' && board[2][0] === 'círculo' && board[1][0] == null) movFinal = '10';
  // iniciando em 20
  else if (board[2][1] === 'círculo' && board[2][2] === 'círculo' && board[2][0] == null) movFinal = '20';
  else if (board[2][0] === 'círculo' && board[2][1] === 'círculo' && board[2][2] == null) movFinal = '22';
  else if (board[2][0] === 'círculo' && board[2][2] === 'círculo' && board[2][1] == null) movFinal = '21';
  // iniciando em 22
  else if (board[2][2] === 'círculo' && board[1][1] === 'círculo' && board[0][0] == null) movFinal = '00';
  else if (board[2][2] === 'círculo' && board[1][2] === 'círculo' && board[0][2] == null) movFinal = '02';
  else if (board[1][2] === 'círculo' && board[0][2] === 'círculo' && board[2][2] == null) movFinal = '22';
  // iniciando em 01
  else if (board[0][1] === 'círculo' && board[1][1] === 'círculo' && board[2][1] == null) movFinal = '21';
  else if (board[0][1] === 'círculo' && board[2][1] === 'círculo' && board[1][1] == null) movFinal = '11';
  else if (board[2][1] === 'círculo' && board[1][1] === 'círculo' && board[0][1] == null) movFinal = '01';
  // iniciando em 10
  else if (board[1][0] === 'círculo' && board[1][1] === 'círculo' && board[1][2] == null) movFinal = '12';
  else if (board[1][0] === 'círculo' && board[1][2] === 'círculo' && board[1][1] == null) movFinal = '11';
  else if (board[1][2] === 'círculo' && board[1][1] === 'círculo' && board[1][0] == null) movFinal = '10';
}
// Elimina linhas onde não há possibilidade de jogada
function eliminaPossibilidades(listaIn) {
  let lista = listaIn;
  if (lista.length > 0) {
    const a = lista[0].split('')[0];
    const b = lista[0].split('')[1];
    const c = lista[1].split('')[0];
    const d = lista[1].split('')[1];
    if (board[a][b] === 'círculo' || board[c][d] === 'círculo') {
      lista = [];
    } else if (board[a][b] === 'X') {
      lista.splice(0, 1);
      if (board[c][d] == null) movFinal = `${c}${d}`;
    } else if (board[c][d] === 'X') {
      lista.splice(1, 1);
      if (board[a][b] == null) movFinal = `${a}${b}`;
    }
  }
  return lista;
}
// Minha vez!
function minhaVez(l, c) {
  let minhasChances = [];
  let minhasChancesV = [];
  let minhasChancesH = [];
  let minhasChancesD1 = [];
  let minhasChancesD2 = [];
  let fullTest = 1;
  let linha = 0;
  let coluna = 0;
  const posAnterior = `${l}${c}`;
  switchTurn();
  if (nivel % 2 === 0) {
    if (board[1][1] == null) {
      document.getElementById('11').querySelector('img').src = 'img/o.png';
      board[1][1] = turn;
      fullTest = 0;
    }
  }
  if (fullTest) {
    switch (posAnterior) {
      case '00':
        minhasChancesH = ['01', '02'];
        minhasChancesV = ['10', '20'];
        minhasChancesD1 = ['11', '22'];
        break;
      case '01':
        minhasChancesH = ['00', '02'];
        minhasChancesV = ['11', '22'];
        break;
      case '02':
        minhasChancesH = ['00', '01'];
        minhasChancesV = ['12', '22'];
        break;
      case '10':
        minhasChancesH = ['00', '20'];
        minhasChancesV = ['11', '12'];
        break;
      case '11':
        minhasChancesH = ['10', '12'];
        minhasChancesV = ['01', '21'];
        minhasChancesD1 = ['00', '22'];
        minhasChancesD2 = ['20', '02'];
        break;
      case '12':
        minhasChancesH = ['10', '11'];
        minhasChancesV = ['02', '22'];
        break;
      case '20':
        minhasChancesH = ['10', '00'];
        minhasChancesV = ['21', '22'];
        minhasChancesD1 = ['11', '02'];
        break;
      case '21':
        minhasChancesH = ['20', '22'];
        minhasChancesV = ['11', '01'];
        break;
      default:
        minhasChancesH = ['20', '21'];
        minhasChancesV = ['12', '02'];
        minhasChancesD1 = ['00', '11'];
    }
    // Zera movimento final gerado na jogada anterior
    movFinal = '';
    // Elimina impossibilidades na horizontal
    minhasChancesH = eliminaPossibilidades(minhasChancesH);
    // Elimina impossibilidades na vertical
    minhasChancesV = eliminaPossibilidades(minhasChancesV);
    // Elimina impossibilidades na Diagonal1
    minhasChancesD1 = eliminaPossibilidades(minhasChancesD1);
    // Elimina impossibilidades na Diagonal2
    minhasChancesD2 = eliminaPossibilidades(minhasChancesD2);
    // Se não é a primeira jogada, verifica possibilidades de vitoria
    verificaMinhasChances();
    // Se existe movimento final e não é a primeira jogada, termina!
    if (nivel > 0 && movFinal.length > 0) {
      linha = movFinal.split('')[0];
      coluna = movFinal.split('')[1];
    } else {
      // Agrupa possibilidades restantes, dando peso a linha faltando apenas 1
      if (minhasChancesH.length === 1) minhasChances = [...minhasChancesH];
      if (minhasChancesV.length === 1) minhasChances = [...minhasChances, ...minhasChancesV];
      if (minhasChancesD1.length === 1) minhasChances = [...minhasChances, ...minhasChancesD1];
      if (minhasChancesD2.length === 1) minhasChances = [...minhasChances, ...minhasChancesD2];
      // Caso não tenha sobrado nada, recria matriz com todas as possibilidades
      if (minhasChances.length === 0) {
        for (linha = 0; linha < 3; linha++) {
          for (coluna = 0; coluna < 3; coluna++) {
            if (board[linha][coluna] == null) minhasChances.push(`${linha}${coluna}`);
          }
        }
      }
      const randomPos = Math.floor(Math.random() * (minhasChances.length - 1));
      linha = minhasChances[randomPos].split('')[0];
      coluna = minhasChances[randomPos].split('')[1];
    }
    document.getElementById(`${linha}${coluna}`).querySelector('img').src = 'img/o.png';
    board[linha][coluna] = turn;
  }
  const hasWon = verifyWin();
  if (hasWon || verifyTie()) {
    createTags();
    document.body.querySelector('div#result').innerHTML = (hasWon) ? `O ${turn} venceu!!` : 'O jogo empatou!!';
  } else switchTurn();
}
// realiza a jogada
function move(element) {
  if (!verifyWin()) {
    const i = element.id.split('')[0];
    const j = element.id.split('')[1];
    if (board[i][j] == null) {
      element.querySelector('img').src = (turn === 'X') ? 'img/x.png' : 'img/o.png';
      board[i][j] = turn;
      const hasWon = verifyWin();
      if (hasWon || verifyTie()) {
        createTags();
        document.body.querySelector('div#result').innerHTML = (hasWon) ? `O ${turn} venceu!!` : 'O jogo empatou!!';
      } else minhaVez(i, j);
    }
  }
}
// reseta o jogo
function restart() {
  board = [[], [], []];
  turn = 'X';
  nivel += 1;
  movFinal = '';
  const imgs = document.getElementsByTagName('img');
  // começar do 1 pois o elemento 0 countém a imagem que diz a vez
  for (let i = 1; i < imgs.length; i++) { imgs[i].src = 'img/n.png'; }
  const button = document.querySelector('input.btn');
  const result = document.querySelector('div#result');
  document.body.querySelector('section#interface').removeChild(result);
  document.body.querySelector('section#interface').removeChild(button);
  document.getElementById('jogador').innerHTML = "Sua vez <img id='imgturn' align='center' height='45px' src='img/x.png'></img>!";
}
