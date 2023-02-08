//fetch api url of trivia api
let apiUrl = "https://opentdb.com/api.php?amount=10&type=multiple";
const categoryNumber = localStorage.getItem("category");
let maxTime = 5*60;
let timeLeft = maxTime;

if(categoryNumber != "any")
{
    apiUrl = `${apiUrl}&category=${categoryNumber}`;
}

var questionsArray = [];
let choicesRadio;
let questionsCount = 1;
var score = 0;
var wrongedAnswers = 0

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

async function fetchQuestions(category = null) {
    const response = await fetch(apiUrl);
    const questionJson = await response.json();
    questionsArray = questionJson.results;
}
// display questions on html page
function printQuestions(questionObject) {
    const questionH2 = document.getElementById("question");
    questionH2.innerHTML = questionObject.question;

    let choices = Array.from(document.getElementsByClassName("choice-text"));
    console.log(choices);

    choicesRadio = Array.from(document.getElementsByName("choices"));

    let options = questionObject.incorrect_answers;
    options.push(questionObject.correct_answer);

    shuffle(options);

    for (let i = 0; i < options.length; i++) {
        choices[i].innerHTML = options[i];
        choicesRadio[i].value = options[i];
    }
    const questionNumber = document.getElementById("questionNumber").innerHTML = questionsCount;
}

async function start() {
    await fetchQuestions();
    // console.log(questions);
    printQuestions(questionsArray[0]);
    let nextButton = document.getElementById("next-button");
    nextButton.addEventListener("click", () => {
        try {
            let selectAnswer = choicesRadio.filter(choice => choice.checked == true)[0];
            console.log(selectAnswer.value);
            if(questionsArray[questionsCount-1].correct_answer == selectAnswer.value){
                score++
            }
            else{
                wrongedAnswers++
            }

        } catch (error) {

        }
        if(questionsCount !== 10){
            if(questionsCount == 9){
                nextButton.innerHTML = "FINISH";
            }
            questionsCount++;
            printQuestions(questionsArray[questionsCount - 1]);
        }
        else{
            localStorage.setItem("score", score);
            localStorage.setItem("wrong", wrongedAnswers);
            // alert(`correct answers: ${score}, wrong answers : ${wrongedAnswers}`);
            window.location = "result.html";
        }

    });

    
function convertToMinutesAndSeconds(timeLeft) {
    let minutes = Math.floor(timeLeft / 60);
    let remainingSeconds = timeLeft % 60;
    return `${minutes} : ${remainingSeconds}`;
  }
    setInterval(()=>{
        timeLeft--;
        const timeLeftSpan = document.getElementById("timeLeft");
        timeLeftSpan.innerHTML = convertToMinutesAndSeconds(timeLeft);
        if(timeLeft == 0){
            alert("Time out");
            localStorage.setItem("score", score);
            localStorage.setItem("wrong", wrongedAnswers);
            window.location = "result.html";
        }
    
    },1000);
}

start();

