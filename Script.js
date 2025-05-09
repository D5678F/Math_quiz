let score = 0;
let currentLevel = "school";
let correctAnswer = 0;
let currentHint = "";

const scoreDisplay = document.getElementById("score");
const questionDisplay = document.getElementById("question");
const feedbackDisplay = document.getElementById("feedback");
const hintDisplay = document.getElementById("hint");
const answerInput = document.getElementById("answer");
const levelSelect = document.getElementById("level");

document.getElementById("submit").addEventListener("click", checkAnswer);
levelSelect.addEventListener("change", () => {
  currentLevel = levelSelect.value;
  score = 0;
  updateScore();
  generateQuestion();
});

function updateScore() {
  const levelName = levelSelect.options[levelSelect.selectedIndex].text;
  scoreDisplay.textContent = `Score: ${score} | Level: ${levelName}`;
}

function generateQuestion() {
  let questionText = "";
  currentHint = "";
  let a = Math.floor(Math.random() * 10) + 1;
  let b = Math.floor(Math.random() * 10) + 1;
  let c = Math.floor(Math.random() * 10) + 1;

  if (currentLevel === "school") {
    const ops = ['+', '-', '*', '/'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    if (op === '+') {
      correctAnswer = a + b;
      questionText = `${a} + ${b}`;
    } else if (op === '-') {
      correctAnswer = a - b;
      questionText = `${a} - ${b}`;
    } else if (op === '*') {
      correctAnswer = a * b;
      questionText = `${a} × ${b}`;
    } else {
      correctAnswer = a;
      let divResult = a * b;
      questionText = `${divResult} ÷ ${b}`;
    }

  } else if (currentLevel === "college") {
    const types = [
      { question: `${a} + ${b} × ${c}`, answer: a + b * c },
      { question: `${a}x + ${b} = ${a * c + b}`, answer: c }
    ];
    const picked = types[Math.floor(Math.random() * types.length)];
    questionText = picked.question;
    correctAnswer = picked.answer;

  } else if (currentLevel === "college-advanced") {
    const adv = [
      {
        question: `If f(x) = 2x + 3, find f(${a})`,
        answer: 2 * a + 3,
        hint: "Use the formula: f(x) = 2x + 3"
      },
      {
        question: `Differentiate: d/dx (${a}x² + ${b}x)`,
        answer: `${2 * a}x + ${b}`,
        hint: "Power rule: d/dx xⁿ = n*xⁿ⁻¹"
      },
      {
        question: `Evaluate: log₂(${Math.pow(2, a)})`,
        answer: a,
        hint: "log₂(2^x) = x"
      }
    ];
    const picked = adv[Math.floor(Math.random() * adv.length)];
    questionText = picked.question;
    correctAnswer = picked.answer;
    currentHint = picked.hint;
  }

  questionDisplay.textContent = questionText;
  feedbackDisplay.textContent = "";
  hintDisplay.textContent = "";
  answerInput.value = "";
}

function checkAnswer() {
  const userAnswer = answerInput.value.trim();

  if (userAnswer === "") return;

  const isCorrect = ("" + userAnswer) === ("" + correctAnswer);

  if (isCorrect) {
    feedbackDisplay.textContent = "Correct!";
    feedbackDisplay.style.color = "green";
    score++;
  } else {
    feedbackDisplay.textContent = `Wrong! Correct Answer: ${correctAnswer}`;
    feedbackDisplay.style.color = "red";

    questionDisplay.classList.add("shake");
    setTimeout(() => questionDisplay.classList.remove("shake"), 300);

    if (currentLevel === "college-advanced") {
      hintDisplay.textContent = `Hint: ${currentHint}`;
    }
  }

  updateScore();
  setTimeout(generateQuestion, 1500);
}

generateQuestion();