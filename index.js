const questionsData = [
  {
    question: "Which type of JavaScript language is ___",
    options: [
      "Object-Oriented",
      "Object-Based",
      "Assembly-language",
      " High-level",
    ],
    answer: "Object-Based",
  },
  {
    question: "  In JavaScript, what is a block of statement?",
    options: [
      "Conditional block",
      " block that combines a number of statements into a single compound statement",
      "both conditional block and a single statement",
      "  block that contains a single statement",
    ],
    answer:
      "block that combines a number of statements into a single compound statement",
  },
  {
    question: "Which of the following is not a JavaScript Data Types?",
    options: ["Boolean", "Undefined", " Number", " Float"],
    answer: "Float",
  },
  {
    question: "  Which one of the following is an ternary operator:",
    options: ["?", " :    ", "-", "+"],
    answer: "?",
  },
  {
    question: " method or operator is used for identification of the array?",
    options: ["Typeof", "==   ", " ===", "isarrayType()"],
    answer: "Typeof",
  },
];

const startBtn = document.querySelector(".main-page>button");
const quiz = document.querySelector(".quiz");
let count = 0;
let timerStartCount = 60;
let score = 0;
startBtn.addEventListener("click", () => {
  document.querySelector(".main-page").remove();

  quiz.innerHTML = `<section>
<div class="questions-container">
<div class="top-info">
<div><img src="quiz-icon.png" alt=""></div>
<div><img src="sound icon.png" alt="">
    <div class="total-q-coun">
     
        <span class=currunt>2<span class=total>/5</span> </span>
        
    </div>
</div>
</div>
<div class="question-title">
<h1> </h1>
</div>
<div class="timer">
00:30
</div>
<div class="select-answer ">
<div class="options"> </div>
<button class='next-btn'> next </button> 
</div>
</div>
</section>`;
  question(count);
  timerStart();
  document.querySelector(".next-btn").addEventListener("click", () => {
    nextQ();
    debugger;
  });
});

let intervalTimerStore;
const getScore = localStorage.getItem("score") || 0;
const createP = document.createElement("h4");
createP.style.textAlign = "center";
createP.innerHTML = `your perv score :${getScore}`;
quiz.appendChild(createP);
console.log(getScore);
let allopt = [];

function question(count) {
  const QuestionsAppend = document.querySelector(".question-title");
  const selectOptions = document.querySelector(".options");
  const currunt = document.querySelector(".currunt");
  currunt.innerHTML = `${count + 1}<span class=total>/${questionsData.length
    }</span>`;
  QuestionsAppend.innerHTML = `${questionsData[count].question}`;
  questionsData[count].options.forEach((option) => {
    const div = document.createElement("div");
    div.innerHTML = `${option}`;
    allopt.push(div);
    selectOptions.appendChild(div);
  });
  selectOptions.querySelectorAll("div").forEach((option) => {
    option.addEventListener("click", function clickOptions(e) {
      if (
        e.target.innerHTML.replace(/ /g, "") ===
        questionsData[count].answer.replace(/ /g, "")
      ) {
        option.classList.add("correct");
        score = score + 10;
        selectOptions.querySelectorAll("div").forEach((op) => {
          if (!(op.className === "correct")) {
            op.classList.add("user-not");
            console.log(op);
          }
        });
      } else {
        option.classList.add("worng");

        selectOptions.querySelectorAll("div").forEach((option) => {
          if (
            option.innerHTML.replace(/ /g, "") ===
            questionsData[count].answer.replace(/ /g, "")
          ) {
            option.classList.add("correct");
          }
          option.classList.add("user-not");
        });
      }
    });
  });
}

function timer() {
  var timer = document.querySelector(".timer");
  if (timerStartCount <= 0) {
    clearTimeout(intervalTimerStore);
    timerStartCount = 60;
    nextQ();
    document
      .querySelector(".questions-container")
      .classList.remove("animation-bg");
  }

  if (timerStartCount < 10) {
    timer.innerHTML = `0${timerStartCount}`;
    document
      .querySelector(".questions-container")
      .classList.add("animation-bg");
  } else {
    timer.innerHTML = timerStartCount;
  }

  timerStartCount--;
}

function timerStart() {
  intervalTimerStore = setInterval(timer, 500);
}

function nextQ() {
  var selectOptions = document.querySelector(".options");
  clearTimeout(intervalTimerStore);
  timerStartCount = 60;

  if (questionsData.length - 1 > count) {
    count++;
    selectOptions.innerHTML = "";
    question(count);
    timerStart();
  } else {
    clearInterval(intervalTimerStore);
    debugger;
    localStorage.setItem("score", score);
    document.write(`total score :${score}/50`);
  }
}

function randomCountNumber() {
  console.log(Math.floor(Math.random() * 5));
}
