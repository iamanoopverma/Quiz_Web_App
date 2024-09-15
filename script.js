const listOfQuestions = [
  {
    que: "Who developed Python?",
    a: "Dennis Ritchie",
    b: "Smoolder Bravestone",
    c: "Guido Van Rossum",
    d: "Alexender",
  },
  {
    que: "Who developed C++?",
    a: "Ryan",
    b: "Michael lawery",
    c: "Bjarne Stroustrup",
    d: "Ricky Stanicky",
  },
  {
    que: "Who developed C?",
    a: "James Daniel",
    b: "Doug Harris",
    c: "James Edward",
    d: "Dennis Ritchie",
  },
  {
    que: "Who developed Javascript?",
    a: "Emily Clarke",
    b: "Doug Harris",
    c: "Brendon Eich",
    d: "Ken Thompson",
  },
  {
    que: "Who developed React?",
    a: "Dennis Ritchie",
    b: "Jordan Walke",
    c: "Brendon Eich",
    d: "Ken Thompson",
  },
  {
    que: "Who developed Django?",
    a: "Dennis Ritchie",
    b: "Jordan Walke",
    c: "Adrian Holovaty & Simon Willison",
    d: "Ken Thompson",
  },
];
let i = 0;
let correct = 0;
let incorrect = 0;
let score = 0;
let second = 60;
let takenTime = 0;
let result = Array();
let correctAnswer = [
  "Guido Van Rossum",
  "Bjarne Stroustrup",
  "Dennis Ritchie",
  "Brendon Eich",
  "Jordan Walke",
  "Adrian Holovaty & Simon Willison",
];
let intervalId = "";
const questionContainer = document.getElementById("questionContainer");
const btnContainer = document.getElementById("btnContainer");
const optionContainer = document.getElementById("optionContainer");
const resultContainer = document.getElementById("resultContainer");
const timer = document.getElementById("timer");
const restartBtn = document.getElementById("restartBtn");

function showQuestionOption(turn) {
  if (turn == "prev") {
    if (i > 0) {
      i--;
    }
    if (i <= 0) {
      i = 0;
    }
  } else if (turn == "next") {
    if (i < 6) {
      i++;
    }
    if (i >= 6) {
      i = 5;
    }
  }
  if (turn == "start") {
    i = 0;
  }
  questionContainer.textContent = `Q${i + 1}.${listOfQuestions[i]["que"]}`;
  const optionArray = Array(
    listOfQuestions[i]["a"],
    listOfQuestions[i]["b"],
    listOfQuestions[i]["c"],
    listOfQuestions[i]["d"]
  );
  let j = 0;
  const options = document.getElementsByClassName("options");
  optionArray.forEach((element) => {
    options[j].textContent = element;
    const inp = document.createElement("input");
    inp.type = "radio";
    inp.name = "option";
    inp.value = element;
    inp.addEventListener("click", () => {
      result[i] = inp.value;
    });
    options[j].insertBefore(inp, options[j].firstChild);
    j++;
  });
  if (i == 0) {
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("instruction").style.display = "none";
    document.getElementsByTagName("h1")[0].style.marginBottom = "0";
    document.getElementById("container").style.height = "290px";
  }
  btnContainer.style.visibility = "visible";
}
function calculateResult() {
  for (i = 0, incorrect = 0, correct = 0, score = 0; i < 6; i++) {
    if (result[i] == correctAnswer[i]) {
      score++;
      correct++;
    } else {
      incorrect++;
    }
  }
}
function handleSubmit() {
  calculateResult();
  handleResultLayout();
  clearInterval(intervalId);
}

function handleResultLayout() {
  questionContainer.style.display = "none";
  optionContainer.style.display = "none";
  btnContainer.style.visibility = "hidden";
  timer.style.display = "none";
  restartBtn.style.display = "block";
  if (score == 6) {
    document.getElementById("couragiousMsg").textContent =
      "Congratulations! You obtained full marks.";
  }
  document.getElementById("score").textContent = `Score: ${score}/6`;
  document.getElementById("correct").textContent = `Correct: ${correct}`;
  document.getElementById("incorrect").textContent = `Incorrect: ${incorrect}`;
  document.getElementById("spentTime").textContent = `Spent Time: ${
    60 - second
  }`;
  resultContainer.style.zIndex = 1;
}
function handleRestart() {
  startTimer();
  second = 60;
  questionContainer.style.display = "block";
  optionContainer.style.display = "flex";
  btnContainer.style.visibility = "visible";
  timer.style.display = "block";
  restartBtn.style.display = "none";
  resultContainer.style.zIndex = -1;
}
function startTimer() {
  showQuestionOption("start");
  timer.textContent = "Time: 00:60";
  intervalId = setInterval(() => {
    second--;
    timer.textContent = `Time: 00:${second}`;
  }, 1000);
  timeoutId = setTimeout(() => {
    calculateResult();
    handleResultLayout();
    clearInterval(intervalId);
  }, 60000);
}
