const question = document.getElementById('question');
const choice = Array.from(document.getElementsByClassName('choice-text'));
console.log(choice);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questionsList = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice: [ 
        '<script>',
        '<javascript>',
        '<js>',
        '<scripting>'],
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice: [
         "<script href='xxx.js'>",
         "<script name='xxx.js'>",
         "<script src='xxx.js'>",
         "<script file='xxx.js'>"],
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice: [
        "msgBox('Hello World');",
        "alertBox('Hello World');",
        "msg('Hello World');",
        "alert('Hello World');"],
        answer: 4,
    },
];

console.log(questionsList);

let currentQuestionIndex = 0;
function displayRandomQuestion() {
    currentQuestionIndex = Math.floor(Math.random() * questionsList.length);
    let question = questionsList[currentQuestionIndex].question;
    let choices = questionsList[currentQuestionIndex].choice;

    document.getElementById("question").innerHTML = question;
    let choiceElements = document.getElementsByClassName("choice-text");
    for (let i = 0; i < choiceElements.length; i++) {
      choiceElements[i].innerHTML = choices[i];
    }
  }

  


displayRandomQuestion();

let nextButton = document.getElementById("next-button");
nextButton.addEventListener("click", displayRandomQuestion);

//CONSTANTS
// const CORRECT_BONUS = 10;
// const MAX_QUESTIONS = 3;

// startGame = () => {
//     questionCounter = 0;
//     score = 0;
//     availableQuesions = [...questionsList];
//     getNewQuestion();
// };

// getNewQuestion = () => {
//     if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
//         //go to the end page
//         return window.location.assign('/end.html');
//     }
//     questionCounter++;
//     const questionIndex = Math.floor(Math.random() * availableQuesions.length);
//     currentQuestion = availableQuesions[questionIndex];
//     question.innerText = currentQuestion.question;

//     choices.forEach((choice) => {
//         const number = choice.dataset['number'];
//         choice.innerText = currentQuestion['choice' + number];
//     });

//     availableQuesions.splice(questionIndex, 1);
//     acceptingAnswers = true;
// };

// choices.forEach((choice) => {
//     choice.addEventListener('click', (e) => {
//         if (!acceptingAnswers) return;

//         acceptingAnswers = false;
//         const selectedChoice = e.target;
//         const selectedAnswer = selectedChoice.dataset['number'];
//         getNewQuestion();
//     });
// });

// startGame();