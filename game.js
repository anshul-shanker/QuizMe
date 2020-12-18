const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

// Promises fetch 
fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
  questions = loadedQuestions.results.map( loadedQuestion => {
    const formattedQuestion = {
      question: loadedQuestion.question
    }
    // console.log(formattedQuestion.question);
    formattedQuestion.question.replace(/(&quot\;)/g,"\'");
    // formattedQuestion.question.replace(/(&#39\;)/g,"\'");
    // console.log(formattedQuestion.question);
    // debugger;
    // JSON.parse(.replace(/&quot;/g,'"'));
    const answerChoices = [...loadedQuestion.incorrect_answers];
    formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
    answerChoices.splice(formattedQuestion.answer -1,0, loadedQuestion.correct_answer);

    answerChoices.forEach((choice, index) => {
      formattedQuestion["choice" + (index + 1)] = choice;
    })
    console.log(formattedQuestion);
    return formattedQuestion;
  })

  // questions = loadedQuestions;
  startGame();
})
.catch(err => {
  console.error(err);
});

// Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

// IN the () braces the params go if any
startGame = () => {
  questionCounter = 0;
  // Not directly assigned since if one changes the other would change as well.
  // Thats why using spread operator ...
  availableQuestions = [...questions]
  getNewQuestion();
}

// When fetching the question and options
getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
    // setting value for high score
    localStorage.setItem('mostRecentScore', score);
    // Go to the end page or new category for later.
    return window.location.assign('end.html');
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  // update progressBar
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  
  question.innerText = currentQuestion.question;

  choices.forEach( choice => {
     const number = choice.dataset['number'];
     choice.innerText = currentQuestion['choice' + number];
  })

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
}

// When user selects answer
choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];
    // debugger;
    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    
    // Adds score if correct
    if(classToApply === "correct") {
      incrementScoreText(CORRECT_BONUS)
    }
    selectedChoice.parentElement.classList.add(classToApply);
    document.querySelectorAll('[data-number]')[currentQuestion.answer-1].parentElement.classList.add('correct');

    setTimeout( () => {
      document.querySelectorAll('[data-number]')[currentQuestion.answer-1].parentElement.classList.remove('correct');
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 2500)
  })
})

incrementScoreText = num => {
  score += num;
  scoreText.innerText = score;
};