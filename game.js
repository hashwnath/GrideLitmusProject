// data
var easy = [
  {
    question: "Select a muliple of three.",
    sampleAnswer: 3,
    answer: (e) => {
      if (e % 3 == 0) {
        return true;
      }
      return false;
    },
  },
  {
    question:"What is the sum of roots of equation: x(x-8)+4=0 ?",
    sampleAnswer: 8,
    answer: (e) => {
      if (e  == 8) {
        return true;
      }
      return false;
    },
  },
  {
    question: "Select a factor of 99. ",
    sampleAnswer: 11,
    answer: (e) => {
      if (99 % e == 0) {
        return true;
      }
      return false;
    },
  },
  {
    question: "Find HCF/GCD of 8 and 5.",
    sampleAnswer: 1,
    answer: (e) => {
      if (e  == 1) {
        return true;
      }
      return false;
    },
  },
];
var medium = [
  {
    question: "Select a prime number between 20 and 30 (both included).",
    sampleAnswer: 23,
    answer: (e) => {
      if (e  == 23 || e==29) {
        return true;
      }
      return false;
    },
  },
  {
    question: "What is the digit in units place of number obtained by product, 984694*94979087",
    sampleAnswer: 8,
    answer: (e) => {
      if (e  == 8) {
        return true;
      }
      return false;
    },
  },
  {
    question: "Identify the next number in the series: 1, 2, 4, 8",
    sampleAnswer: 16,
    answer: (e) => {
      if (e == 16) {
        return true;
      }
      return false;
    },
  },
];
var hard = [
  {
    question: "What is the remainder when 2^20+3^20+4^40+5^50+11^7 divided by 7:",
    sampleAnswer: 3,
    answer: (e) => {
      if (e  == 3) {
        return true;
      }
      return false;
    },
  },
  {
    question: "Hibonacci, a hypothetical variation of fibonacci series, where first three digits are 0, 1 and 1 and further, a digit in the series is equal to sum of last three digits. Find the 8th digit in Hibonacci series",
    sampleAnswer: 24,
    answer: (e) => {
      if (e  == 24) {
        return true;
      }
      return false;
    },
  },
  {
    question: "What is the total number of divisors for Ramanujan Number:",
    sampleAnswer: 8,
    answer: (e) => {
      if (e == 8) {
        return true;
      }
      return false;
    },
  },
];

//  logic

// Global declarations
var selectedQuestion;
var difficulty;
var correctToast = Toastify({
  text: "Correct Answer",
  duration: 2000,
});

var wrongToast = Toastify({
  text: "OOPS try again",
  duration: 2000,
});
function checkGameOver() {
  let wins = window.localStorage.getItem("wins");
  wins = parseInt(window.localStorage.getItem("wins"), 10);
  if (hard.length == 0 || wins >=10) { //chane this if Qns are increased
    document.getElementById("congo").style.display = "block";
    document.getElementById("grid-container").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("startBtn").style.display = "none";
    startConfetti();
  }
}

window.onload = function () {
  checkGameOver();
};

function displayQuestion() {
  let wins = window.localStorage.getItem("wins");
  wins = parseInt(window.localStorage.getItem("wins"), 10);

  checkGameOver();
  let question = document.getElementById("question");
  if (wins == null || wins == undefined || isNaN(wins) ) {
    window.localStorage.setItem("wins", 0);
    wins = 0;
  }

  if (wins < 4) {
    let index = Math.floor(Math.random(1, easy.length));
    selectedQuestion = easy[index];
    easy.splice(index, 1);
    difficulty = "easy";
  }

  if (wins >= 4 && wins < 7) {
    let index = Math.floor(Math.random(1, medium.length));
    selectedQuestion = medium[index];
    medium.splice(index, 1);
    difficulty = "medium";
  }
  if (wins >= 7) {
    let index = Math.floor(Math.random(1, hard.length));
    selectedQuestion = hard[index];
    hard.splice(index, 1);
    difficulty = "hard";
  }

  question = document.getElementById("question");
  question.innerHTML = selectedQuestion.question;
  grid();
}

function grid() {
  let gridContainer = document.getElementById("grid-container");
  let size = 3;
  if (difficulty == "hard") {
    size = 7;
    gridContainer.style.gridTemplateColumns =
      "auto auto auto auto auto auto auto";
  }
  if (difficulty == "medium") {
    size = 5;
    gridContainer.style.gridTemplateColumns = "auto auto auto auto auto";
  }

  gridContainer.innerHTML = "";
  let randomLocation = Math.floor(Math.random() * (size * size));
  console.log(randomLocation);
  for (let i = 0; i < size * size; i += 1) {
    let value = Math.floor(Math.random() * (size * size));
    //  set a random cell with sample answer to make sure there is atleast one answer
    if (i == randomLocation) {
      value = selectedQuestion.sampleAnswer;
    }

    gridContainer.innerHTML += `<div class= " cell ${
      i % 2 == 0 ? "black" : "white"
    } " onClick= "cellClicked(${value})"  id = "cell-${i}"> ${value} </div>`;
  }
}

function start() {
  displayQuestion();
  
  let button = document.getElementById("startBtn");
  button.style.display = "none";
  
let no = document.getElementById("note");
  no.style.display = "none";  
}

function cellClicked(n) {
  let result = selectedQuestion.answer(n);
  console.log(result, "n is", n);
  if (result) {
    correctToast.showToast();
    let wins = parseInt(window.localStorage.getItem("wins", 10)) + 1;
    window.localStorage.setItem("wins", wins);
    startConfetti();
    setTimeout(stopConfetti, 1000);
    displayQuestion();
  } else {
    wrongToast.showToast();
  }
}

function startAgain() {
  window.localStorage.setItem("wins", 0);
  location.reload();
  // displayQuestion();
  // let button = document.getElementById("startBtn");
  // button.style.display = "none";
}
