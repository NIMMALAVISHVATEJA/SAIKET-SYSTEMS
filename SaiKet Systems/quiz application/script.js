// ✅ Quiz Questions
const questions = {
  easy: [
    { q: "Which language is used to style web pages?", options: ["HTML", "CSS", "Python", "C"], a: "CSS" },
    { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tool Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"], a: "Hyper Text Markup Language" },
    { q: "Which tag is used to add a line break?", options: ["<break>", "<br>", "<lb>", "<line>"], a: "<br>" },
    { q: "Which attribute specifies an image source?", options: ["src", "href", "alt", "img"], a: "src" },
    { q: "Which symbol is used for comments in CSS?", options: ["//", "/* */", "#", "<!-- -->"], a: "/* */" },
    { q: "HTML documents are saved with which extension?", options: [".css", ".html", ".java", ".doc"], a: ".html" },
    { q: "CSS stands for?", options: ["Cascading Style Sheets", "Colorful Style Sheets", "Creative Style Syntax", "Computer Styled System"], a: "Cascading Style Sheets" },
    { q: "Which HTML tag is used to display images?", options: ["<img>", "<picture>", "<src>", "<photo>"], a: "<img>" },
    { q: "Which property changes text color in CSS?", options: ["background-color", "color", "font-color", "text-style"], a: "color" },
    { q: "HTML comments start with?", options: ["/*", "//", "<!--", "##"], a: "<!--" }
  ],

  medium: [
    { q: "Which JavaScript method is used to access HTML elements by ID?", options: ["getElementById()", "getElementsByClass()", "querySelector()", "getElement()"], a: "getElementById()" },
    { q: "Which operator is used to assign a value?", options: ["=", "==", "===", ":"], a: "=" },
    { q: "Which tag is used to define an internal style sheet?", options: ["<css>", "<style>", "<script>", "<link>"], a: "<style>" },
    { q: "Which HTML attribute is used to define inline styles?", options: ["font", "style", "class", "styles"], a: "style" },
    { q: "Inside which HTML element do we put JavaScript?", options: ["<script>", "<js>", "<scripting>", "<code>"], a: "<script>" },
    { q: "How do you write 'Hello World' in an alert box?", options: ["alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');", "msgBox('Hello World');"], a: "alert('Hello World');" },
    { q: "Which keyword declares a constant in JavaScript?", options: ["var", "let", "const", "final"], a: "const" },
    { q: "What does DOM stand for?", options: ["Document Object Model", "Display Object Management", "Digital Ordinance Model", "Document Orientation Mode"], a: "Document Object Model" },
    { q: "How to comment in JavaScript?", options: ["<!-- comment -->", "// comment", "/* comment */", "Both B and C"], a: "Both B and C" },
    { q: "Which company developed JavaScript?", options: ["Netscape", "Google", "Microsoft", "Sun Microsystems"], a: "Netscape" }
  ],

  hard: [
    { q: "Which HTML5 element defines navigation links?", options: ["<nav>", "<navigate>", "<menu>", "<link>"], a: "<nav>" },
    { q: "In CSS, which property controls the text size?", options: ["font-size", "text-size", "size", "font-style"], a: "font-size" },
    { q: "Which built-in method combines two strings?", options: ["append()", "concat()", "merge()", "attach()"], a: "concat()" },
    { q: "What does JSON stand for?", options: ["JavaScript Object Notation", "Java Syntax Oriented Notation", "Java Source Object Name", "None of these"], a: "JavaScript Object Notation" },
    { q: "Which method removes the last element from an array?", options: ["pop()", "push()", "shift()", "delete()"], a: "pop()" },
    { q: "Which HTML tag defines a table row?", options: ["<tr>", "<td>", "<table>", "<th>"], a: "<tr>" },
    { q: "Which event occurs when the user clicks an HTML element?", options: ["onchange", "onmouseclick", "onclick", "onmouseover"], a: "onclick" },
    { q: "Which CSS property makes text bold?", options: ["text-weight", "font-style", "font-weight", "text-bold"], a: "font-weight" },
    { q: "Which tag is used for a numbered list?", options: ["<ol>", "<ul>", "<li>", "<list>"], a: "<ol>" },
    { q: "Which HTML tag defines a division or a section?", options: ["<div>", "<section>", "<part>", "<group>"], a: "<div>" }
  ]
};

// ✅ DOM Elements
const startContainer = document.getElementById("start-container");
const quizContainer = document.getElementById("quiz-container");
const startBtn = document.getElementById("start-btn");
const levelSelect = document.getElementById("level-select");
const levelHeading = document.getElementById("level-heading");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");
const timerText = document.getElementById("timer-text");
const progressCircle = document.getElementById("progress-circle");
const progressFill = document.getElementById("progress-fill");

// ✅ Variables
let selectedLevel = "easy";
let quizQuestions = [];
let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let timeLeft = 300; // 5 minutes
let timer;

// ✅ Start Quiz
startBtn.addEventListener("click", () => {
  selectedLevel = levelSelect.value;
  quizQuestions = [...questions[selectedLevel]];
  shuffle(quizQuestions);
  quizQuestions = quizQuestions.slice(0, 10);

  startContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  levelHeading.textContent = `Level: ${selectedLevel.toUpperCase()}`;
  startTimer();
  loadQuestion();
});

// ✅ Shuffle Questions
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// ✅ Load Question
function loadQuestion() {
  const current = quizQuestions[currentQuestion];
  questionEl.textContent = `${currentQuestion + 1}. ${current.q}`;
  optionsEl.innerHTML = "";
  updateProgressBar();

  current.options.forEach((option) => {
    const div = document.createElement("div");
    div.textContent = option;
    div.classList.add("option");
    div.onclick = () => selectOption(div, option);
    optionsEl.appendChild(div);
  });
}

// ✅ Select Option
function selectOption(element, option) {
  document.querySelectorAll(".option").forEach((opt) =>
    opt.classList.remove("selected")
  );
  element.classList.add("selected");
  selectedOption = option;
}

// ✅ Next Button
nextBtn.addEventListener("click", () => {
  if (!selectedOption) {
    alert("⚠️ Please select an answer!");
    return;
  }

  if (selectedOption === quizQuestions[currentQuestion].a) score++;
  selectedOption = null;
  currentQuestion++;

  if (currentQuestion < quizQuestions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
});

// ✅ Progress Bar
function updateProgressBar() {
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  progressFill.style.width = `${progress}%`;
}

// ✅ Timer
function startTimer() {
  const total = timeLeft;
  timer = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerText.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

    const circleProgress = (timeLeft / total) * 175;
    progressCircle.style.strokeDashoffset = 175 - circleProgress;

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

// ✅ End Quiz
function endQuiz() {
  clearInterval(timer);
  questionEl.classList.add("hidden");
  optionsEl.classList.add("hidden");
  nextBtn.classList.add("hidden");
  resultEl.classList.remove("hidden");
  restartBtn.classList.remove("hidden");
  progressFill.style.width = "100%";
  resultEl.textContent = `🎉 You scored ${score} out of ${quizQuestions.length}`;
}

// ✅ Restart
restartBtn.addEventListener("click", () => {
  location.reload();
});
