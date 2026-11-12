const questions = [
    {
        question: "Which language is used to structure a webpage?",
        answers: ["CSS", "HTML", "JavaScript", "Python"],
        correct: "HTML"
    },
    {
        question: "Which company developed JavaScript?",
        answers: ["Microsoft", "Google", "Netscape", "Apple"],
        correct: "Netscape"
    },
    {
        question: "What does CSS stand for?",
        answers: [
            "Computer Style Sheets",
            "Creative Style System",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: "Cascading Style Sheets"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: ["//", "##", "<!-- -->", "**"],
        correct: "//"
    },
    {
        question: "Which HTML tag is used to add an image?",
        answers: ["<picture>", "<img>", "<image>", "<src>"],
        correct: "<img>"
    }
];

const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");
const feedback = document.getElementById("feedback");

const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");

let currentQuestion = 0;
let score = 0;
let answered = false;

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    currentQuestion = 0;
    score = 0;

    welcomeScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    answered = false;

    nextBtn.classList.add("hidden");
    feedback.textContent = "";
    answerButtons.innerHTML = "";

    let current = questions[currentQuestion];

    questionElement.textContent = current.question;

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreElement.textContent = `Score: ${score}`;

    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    current.answers.forEach(answer => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.classList.add("answer-btn");

        button.addEventListener("click", () => {
            selectAnswer(button, answer);
        });

        answerButtons.appendChild(button);
    });
}

// Check selected answer
function selectAnswer(button, selectedAnswer) {
    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestion].correct;
    const allButtons = answerButtons.querySelectorAll("button");

    allButtons.forEach(btn => {
        btn.disabled = true;

        if (btn.textContent === correctAnswer) {
            btn.classList.add("correct");
        }
    });

    if (selectedAnswer === correctAnswer) {
        score++;
        feedback.textContent = "Correct! Well done!";
        feedback.style.color = "#58B786";
    } else {
        button.classList.add("wrong");
        feedback.textContent = `Incorrect! Correct answer: ${correctAnswer}`;
        feedback.style.color = "#E17B7B";
    }

    scoreElement.textContent = `Score: ${score}`;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    nextBtn.classList.remove("hidden");

    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = "View Results";
    } else {
        nextBtn.textContent = "Next Question →";
    }
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    finalScore.textContent = `${score} / ${questions.length}`;

    if (score === 5) {
        resultMessage.textContent = "Excellent! You got every answer right!";
    } else if (score >= 3) {
        resultMessage.textContent = "Good job! Keep learning and improving!";
    } else {
        resultMessage.textContent = "Keep practising! You can do better next time.";
    }
}

restartBtn.addEventListener("click", () => {
    resultScreen.classList.add("hidden");
    welcomeScreen.classList.remove("hidden");
});
