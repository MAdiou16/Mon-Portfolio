const questions = [
  {
    question: "Quel est le plus grand océan du monde ?",
    answers: [
      { text: "Océan Atlantique", correct: false },
      { text: "Océan Pacifique", correct: true },
      { text: "Océan Indien", correct: false },
      { text: "Océan Arctique", correct: false }
    ]
  },
  {
    question: "Qui a écrit Les Misérables ?",
    answers: [
      { text: "Émile Zola", correct: false },
      { text: "Victor Hugo", correct: true },
      { text: "Molière", correct: false },
      { text: "Albert Camus", correct: false }
    ]
  },
  {
    question: "Quel est l’élément chimique dont le symbole est ‘O’ ?",
    answers: [
      { text: "Or", correct: false },
      { text: "Oxygène", correct: true },
      { text: "Osmium", correct: false },
      { text: "Ozone", correct: false }
    ]
  },
  {
    question: "Combien de continents existe-t-il sur Terre ?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: true },
      { text: "8", correct: false }
    ]
  },
  {
    question: "Quelle est la capitale du Japon ?",
    answers: [
      { text: "Pékin", correct: false },
      { text: "Séoul", correct: false },
      { text: "Tokyo", correct: true },
      { text: "Bangkok", correct: false }
    ]
  }
];

const soundCorrect = new Audio('Sound/correct.wav');
const soundIncorrect = new Audio('Sound/incorrect.flac');
soundCorrect.volume = 0.5;
soundIncorrect.volume = 0.5;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");


let timer;
let timeLeft = 15; // 15 secondes par question
let score = 0;
let currentQuestionIndex = 0;

function startTimer() {
  timeLeft = 15;
  document.getElementById("timer").textContent = `Temps restant : ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Temps restant : ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timer);

      Array.from(answersElement.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
        }
      });

      nextButton.style.display = "block";
    }
  }, 1000);
}


// Affiche la question actuelle
function showQuestion() {
  resetState(); // vide les anciennes réponses

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = "true";
    }
    button.addEventListener("click", selectAnswer);
    answersElement.appendChild(button);
  });


  startTimer();
}

// Réinitialise les réponses
function resetState() {
  clearInterval(timer);
  nextButton.style.display = "none";
  answersElement.innerHTML = "";
}


// Gère le clic sur une réponse
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    score++;
    selectedBtn.classList.add("correct");
    soundCorrect.play();
  } else {
    selectedBtn.classList.add("incorrect");
    soundIncorrect.play();
  }
   clearInterval(timer);
  Array.from(answersElement.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });

  nextButton.style.display = "block";
}

// Passe à la question suivante
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

// Affiche le score final
function showScore() {
  resetState();
  questionElement.textContent = `Quiz terminé ! 🎉`;
  answersElement.innerHTML = `<p>Ton score est ${score} / ${questions.length} ! 🎉</p>`;
  nextButton.textContent = "Rejouer";
  nextButton.style.display = "block";
  nextButton.addEventListener("click", () => {
    location.reload(); // recharge la page
  });
}

// Démarre le quiz
showQuestion();
