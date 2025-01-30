//Declaração de variáveis que vamos manipular//

const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

//perguntas//
const questions = [
  {
    question: "PHP foi desenvolvido para qual fim?",
    answers: [
      { answer: "Back-end", correct: true },
      { answer: "Front-end", correct: false },
      { answer: "Banco de dados", correct: false },
      { answer: "DevOps", correct: false },
    ],
  },
  {
    question: "Qual linguagem é conhecida como a base para aplicações Android?",
    answers: [
      { answer: "Python", correct: false },
      { answer: "Java", correct: true },
      { answer: "C#", correct: false },
      { answer: "Ruby", correct: false },
    ],
  },
  {
    question: "Qual protocolo é usado para comunicação segura na web?",
    answers: [
      { answer: "FTP", correct: false },
      { answer: "HTTP", correct: false },
      { answer: "HTTPS", correct: true },
      { answer: "SMTP", correct: false },
    ],
  },
];

//substituição do quizz para a primeira pergunta

function init() {
  //criar a primeira pergunta
  createQuestion(0);
}

// cria uma pergunta
function createQuestion(i) {
  // limpar a questão anterior
  const oldButtons = answersBox.querySelectorAll("button");

  oldButtons.forEach(function (btn) {
    btn.remove();
  });

  //alterar o texto da pergunta
  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  //insere as alternativas
  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  questions[i].answers.forEach(function (answer, i) {
    //cria o template do botão do quizz
    const answerTemplate = document.querySelector(".answers-template").cloneNode(true);

    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answers");

    letterBtn.textContent = letters[i];
    answerText.textContent = answer["answer"];

    answerTemplate.setAttribute("correct-answer", answer["correct"]);

    //remover hide e template class
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answers-template");

    // inserir a alternativa na tela
    answersBox.appendChild(answerTemplate);

    // inserir um evento de clik no botão
    answerTemplate.addEventListener("click", function () {
      checkAnswer(this);
    });
  });

  // incrementar o numero da questão
  actualQuestion++;
}

// verificar a resposta do usúario

function checkAnswer(btn) {
  const correct = btn.getAttribute("correct-answer") === "true";

  if (correct) {
    points++; // Incrementa os pontos se a resposta estiver correta
  }
  //seleciona todos os botões
  const buttons = answersBox.querySelectorAll("button");

  //verifica se a resposta está correta e adiciona classes no botão
  buttons.forEach(function (button) {
    if (button.getAttribute("correct-answer") === "true") {
      button.classList.add("correct-answer");
    } else {
      button.classList.add("wrong-answer");
    }
  });

  nextQuestion();
}

function nextQuestion() {
  setTimeout(function () {
    if (actualQuestion >= questions.length) {
      showSucccessMessage();
      return;
    }
    createQuestion(actualQuestion);
  }, 700);
}

// exibir a tela final
function showSucccessMessage() {
  //trocar dados da tela de sucesso
  hideOrShowQuizz();
  //calcular o score

  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector("#display-score span");

  displayScore.textContent = score.toString();

  console.log(score);

  // alterar o número de pg corretas
  const correctAnswers = document.querySelector("#correct-answers");
  correctAnswers.textContent = points;

  // alterar o total de perguntas

  const totalQuestions = document.querySelector("#question-qty");
  totalQuestions.textContent = questions.length;
}

function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

// reiniciar quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function () {
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

//inicialização do quizz
init();
