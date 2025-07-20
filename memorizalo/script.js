const easyImages = [
  'img/delfin.jpg',
  'img/perro.jpg',
  'img/oso.jpg',
  'img/gato.jpg',
  'img/jaguar.jpg',
  'img/zebra.jpg',
  'img/raton.jpg',
  'img/panda.jpg',
];

const hardImages = [...easyImages,
  'img/elefante.jpg',
  'img/gallina.jpg',
  'img/kanguro.jpg',
  'img/jirafa.jpg',
];

let firstCard = null;
let secondCard = null;
let lock = false;
let matches = 0;
let totalPairs = 0;
let currentLevel = null;

function showLevelOptions() {
  document.getElementById('home-screen').classList.add('d-none');
  document.getElementById('win-message').classList.add('d-none');
  document.getElementById('level-screen').classList.remove('d-none');
  document.getElementById('game-container').classList.add('d-none');
}

function showHome() {
  document.getElementById('home-screen').classList.remove('d-none');
  document.getElementById('level-screen').classList.add('d-none');
  document.getElementById('win-message').classList.add('d-none');
  document.getElementById('game-container').classList.add('d-none');
}

function startGame(level) {
  currentLevel = level;

  document.getElementById('level-screen').classList.add('d-none');
  document.getElementById('game-container').classList.remove('d-none');
  document.getElementById('win-message').classList.add('d-none');

  const images = level === 'easy' ? easyImages : hardImages;
  totalPairs = images.length;
  matches = 0;

  document.getElementById('score').innerText = '0';
  document.getElementById('total').innerText = totalPairs;
  document.getElementById('level-title').innerText = level === 'easy' ? 'Nivel Fácil' : 'Nivel Difícil';

  let cards = [...images, ...images].sort(() => 0.5 - Math.random());
  const game = document.getElementById('game');
  game.innerHTML = '';

  cards.forEach((img) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front bg-secondary"></div>
        <div class="card-back" style="background-image: url('${img}');"></div>
      </div>
    `;
    card.addEventListener('click', () => flipCard(card, img));
    game.appendChild(card);
  });
}

function flipCard(card, img) {
  if (lock || card.classList.contains('flip')) return;

  card.classList.add('flip');

  if (!firstCard) {
    firstCard = { card, img };
  } else {
    secondCard = { card, img };
    lock = true;

    if (firstCard.img === secondCard.img) {
      matches++;
      document.getElementById('score').innerText = matches;
      resetTurn();

      if (matches === totalPairs) {
        setTimeout(() => {
          document.getElementById('win-sound').play();
          document.getElementById('game-container').classList.add('d-none');
          document.getElementById('win-message').classList.remove('d-none');
        }, 500);
      }
    } else {
      setTimeout(() => {
        firstCard.card.classList.remove('flip');
        secondCard.card.classList.remove('flip');
        resetTurn();
      }, 1000);
    }
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lock = false;
}
