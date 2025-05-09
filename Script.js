let score = 0;
let currentLevel = "school";

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const submitBtn = document.getElementById("submit");
const feedbackEl = document.getElementById("feedback");
const hintEl = document.getElementById("hint");
const scoreEl = document.getElementById("score");
const levelSelector = document.getElementById("level");

let currentAnswer = 0;

function generateSchoolQuestion() {
  const a = Math.floor(Math.random() * 10);
  const b = Math.floor(Math.random() * 10);
  const operations = ["+", "-", "*", "/"];
  const op = operations[Math.floor(Math.random() * operations.length)];
  let question = `${a} ${op} ${b}`;
  let answer = eval(question);
  answer = Math.round(answer * 100) / 100;
  return { question, answer };
}

function generateCollegeQuestion() {
  const a = Math.floor(Math.random() * 20);
  const b = Math.floor(Math.random() * 10);
  const c = Math.floor(Math.random() * 10);
  let question = `${a} + 2 * (${b} * ${c}) - ${b}`;
  let answer = a + 2 * (b * c) - b;
  return { question, answer };
}

function generateAdvancedQuestion() {
  const x = Math.floor(Math.random() * 10) + 1;
  let question = `What is the derivative of ${x}x^2?`;
  let answer = `${2 * x}x`;
  return { question, answer, hint: "Use power rule: d/dx[x^n] = n*x^(n-1)" };
}

function generateQuestion() {
  let q;
  hintEl.innerText = ""; // clear hint

  if (currentLevel === "school") {
    q = generateSchoolQuestion();
  } else if (currentLevel === "college") {
    q = generateCollegeQuestion();
  } else {
    q = generateAdvancedQuestion();
  }

  questionEl.innerText = q.question;
  currentAnswer = q.answer;
  if (q.hint) {
    hintEl.innerText = "Hint: " + q.hint;
  }
}

submitBtn.addEventListener("click", () => {
  let userAnswer = answerEl.value.trim();

  if (userAnswer === "") return;

  if (currentLevel === "college-advanced") {
    if (userAnswer.toLowerCase() === currentAnswer.toLowerCase()) {
      score++;
      feedbackEl.innerText = "Correct!";
    } else {
      feedbackEl.innerText = `Wrong! Correct answer: ${currentAnswer}`;
    }
  } else {
    if (parseFloat(userAnswer) === currentAnswer) {
      score++;
      feedbackEl.innerText = "Correct!";
    } else {
      feedbackEl.innerText = `Wrong! Correct answer: ${currentAnswer}`;
    }
  }

  scoreEl.innerText = `Score: ${score} | Level: ${levelSelector.options[levelSelector.selectedIndex].text}`;
  answerEl.value = "";
  generateQuestion();
});

levelSelector.addEventListener("change", () => {
  currentLevel = levelSelector.value;
  score = 0;
  scoreEl.innerText = `Score: ${score} | Level: ${levelSelector.options[levelSelector.selectedIndex].text}`;
  generateQuestion();
});

// Initial question
window.onload = function () {
  generateQuestion();
};
