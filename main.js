
//#region cacheDom
const messageArea = document.getElementById("updates-area");
const optionButtons = document.getElementById("choice-buttons");
const battleHealth = document.getElementById("battle-health");
const option1 = document.getElementById("option-1");
const option2 = document.getElementById("option-2");
const option3 = document.getElementById("option-3");
const option4 = document.getElementById("option-4");
const lblDay = document.getElementById("stat-day");
const lblFloor = document.getElementById("stat-floor");
const lblPotions = document.getElementById("stat-potions");
const lblGold = document.getElementById("stat-gold");
//#endregion

//#region Classes
class Caravan {
  money = 1
  oxen = 1
  rations = 1
  clothes = 1
  repairKits = 1
  bullets = 0
  travelers = []
  graveyard = []
  milesPerDay = this.oxen * 20;

  constructor() {
    this.money = 1000
    this.repairKits = 0
    this.clothes = 5
    this.oxen = 0
    this.rations = 0

    this.travelers.push(
      new Traveler('Shamus'),
      new Traveler(' ')),
      new Traveler(' '),
      new Traveler(' '),
      new Traveler(' ')
  }

  updateMoney(amount) {
    this.money += amount
  }

  bark() {
    console.log("hello");
  }
  randomNumber(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  isAlive() {
    if (this.health > 0) {
      return true;
    }
  }
  notify(message, type) {
    messageArea.innerHTML += `<div class="update-${type}">${message}</div>`;
  }

  sendText(message) {
    return message;
  }

  attack(target) {
    var miss = new Audio("miss.mp3");
    var hit = new Audio("hit.mp3");

    let selfAttack = this.randomNumber(this.att / 2, this.att);
    let targetAttack = target.randomNumber(target.att / 2, target.att);

    let roll = this.randomNumber(1, 100);
    if (roll > this.acc) {
      miss.play();
      notify(`${this.name} missed.`, "negative");
    } else {
      target.health -= selfAttack;
      hit.play();
      notify(`${this.name} dealt ${selfAttack} damage.`);
    }
  }
}

class Traveler {
  name = ''
  health = 4

  constructor(name) {
    this.name = name
  }

  getConditionString() {
    return `${this.name} is ${this.getHealthStatus}`
  }

  getHealthStatus() {
    switch (this.health) {
      case 4:
        return 'Healthy'

      case 3:
        return 'Fine'

      case 2:
        return 'Sick'

      case 1:
        return 'Ill'

      case 0:
        return 'Dead'
    }
  }

}

class Player extends Character {
  name = "Player";
  floor = 3;
  lvl = 1;
  potions = 0;
  gold = 100;
}
class Enemy extends Character { }

class Game {
  player = new Player();

  randomNumber(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  updateDisplay() {
    lblFloor.innerHTML = this.player.floor;
    lblGold.innerHTML = this.player.gold;
    lblPotions.innerHTML = this.player.potions;
  }

  getEvent() {
    let roll = this.randomNumber(1, 3);
    if (roll === 1) {
      notify("fight");
    } else {
      notify("You trucked alone unscafed");
    }
  }

  makeProgress() {
    this.player.floor += 0.33;
    this.getEvent();
  }
}
//#endregion

//#region Functions
function notify(message, type = "neutral") {
  messageArea.innerHTML += `<div class="update-${type}">${message}</div>`;
}

function handle_input() {
  var cmd_text = lbl_input.value;

  switch (cmd_text) {
    case "butt":
      display("fart");
      break;

    case "":
      break;

    default:
      var msg = "You told me to '" + cmd_text + "' but I don't know how.";
      display(msg);
      break;
  }
  lbl_input.value = "";
}

function gameStart() {
  notify("Welcome to Tower Land!");
  game = new Game();
  game.updateDisplay();
  game.makeProgress(game.player);
}
//#endregion

gameStart();
