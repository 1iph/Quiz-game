// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
  {
    question: "What term is given to the scientific study of all aspects of the life of fungi?",
    answers: [
      { text: "Fungology", correct: false },
      { text: "Fungism", correct: false },
      { text: "Etymology", correct: false },
      { text: "Mycology", correct: true },
    ],
  },
  {
    question: "What was the profession of Einstein's first wife, Mileva Maric?",
    answers: [
      { text: "Psycologist", correct: false },
      { text: "Physicist", correct: true },
      { text: "Chiropractor", correct: false },
      { text: "Biologist", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Swift", correct: false },
      { text: "Python", correct: false },
      { text: "Apple", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for iron?",
    answers: [
      { text: "Ir", correct: false },
      { text: "Fa", correct: false },
      { text: "Fe", correct: true },
      { text: "In", correct: false },
    ],
  },
  {
    question: "What is the hardest natural substance on Earth?",
    answers: [
      { text: "Obsidian", correct: false },
      { text: "Cast Iron", correct: false },
      { text: "Steel", correct: false },
      { text: "Diamond", correct: true },
    ],
  },
   {
    question: "Who wrote The Odyssey?",
    answers: [
      { text: "William Shakespear", correct: false },
      { text: "Charles Dickens", correct: false },
      { text: "Dr. Seuss", correct: false },
      { text: "Homer", correct: true },
    ],
  },
   {
    question: "What is the term for a word that is similar in meaning to another word?",
    answers: [
      { text: "Cinnamon", correct: false },
      { text: "Synonym", correct: true },
      { text: "Ananyms", correct: false },
      { text: "Homonyms", correct: false },
    ],
  },
   {
    question: "What year was the first iPhone released?",
    answers: [
      { text: "2004", correct: false },
      { text: "2000", correct: false },
      { text: "2007", correct: true },
      { text: "2008", correct: false },
    ],
  },
  {
    question: "What is the most spoken language in the world?",
    answers: [
      { text: "English", correct: false },
      { text: "Spanish", correct: false },
      { text: "Mandarin Chinese", correct: true },
      { text: "Hindi", correct: false },
    ],
  },
  {
    question: "What is the most spoken language in the world?",
    answers: [
      { text: "English", correct: false },
      { text: "Spanish", correct: false },
      { text: "Mandarin Chinese", correct: true },
      { text: "Hindi", correct: false },
    ],
  },
  {
    question: "What is the smallest bone in the human body?",
    answers: [
      { text: "incus", correct: false },
      { text: "Xiphoid process", correct: false },
      { text: "Stapes", correct: true },
      { text: "Coccyx", correct: false },
    ],
  },
];

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;
  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Oof... Keep studying! You’ll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
