/* eslint-disable prefer-destructuring */
/* eslint-disable no-lonely-if */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
let turn = 'X';
let board = [[], [], []];
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
//
function minhaVez(l, c) {
  let minhasChances = [];
  const posAnterior = `${l}${c}`;
  switchTurn();
  switch (posAnterior) {
    case '00':
      minhasChances = ['01', '02', '10', '20', '11', '22'];
      break;
    case '01':
      minhasChances = ['00', '02', '11', '22'];
      break;
    case '02':
      minhasChances = ['01', '02', '12', '22'];
      break;
    case '10':
      minhasChances = ['00', '20', '11', '12'];
      break;
    case '11':
      minhasChances = ['10', '12', '00', '22', '20', '02'];
      break;
    case '12':
      minhasChances = ['10', '11', '02', '22'];
      break;
    case '20':
      minhasChances = ['10', '00', '21', '22', '11', '02'];
      break;
    case '21':
      minhasChances = ['20', '22', '11', '01'];
      break;
    default:
      minhasChances = ['20', '21', '12', '02'];
  }
  for (let n = 0; n < minhasChances.length; n++) {
    const a = minhasChances[n].split('')[0];
    const b = minhasChances[n].split('')[1];
    if (board[a][b] === 'círculo' || board[a][b] === 'X') minhasChances.splice(n, 1);
  }

  const randomPos = Math.floor(Math.random() * (minhasChances.length - 1));
  const i = minhasChances[randomPos].split('')[0];
  const j = minhasChances[randomPos].split('')[1];
  document.getElementById(`${i}${j}`).querySelector('img').src = 'img/o.png';
  board[i][j] = turn;
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
        turn = 'X';
      } else minhaVez(i, j);
    }
  }
}
// reseta o jogo
function restart() {
  board = [[], [], []];
  const imgs = document.getElementsByTagName('img');
  // começar do 1 pois o elemento 0 countém a imagem que diz a vez
  for (let i = 1; i < imgs.length; i++) { imgs[i].src = ''; }
  const button = document.querySelector('input.btn');
  const result = document.querySelector('div#result');
  document.body.querySelector('section#interface').removeChild(result);
  document.body.querySelector('section#interface').removeChild(button);
}
