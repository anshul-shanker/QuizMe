const username = document.getElementById('username');
const saveScoreButton = document.getElementById('saveScore');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
  // !username.value will return a truthy or a falsey.
  // if the value exists it will return false and disabled will be removed
  saveScoreButton.disabled = !username.value;
})

saveHighScore = e => {
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value
  };

  highScores.push(score);
  
  // Sort array and keep only top 5 scores
  highScores.sort((a,b) => b.score - a.score)
  highScores.splice(5);

  localStorage.setItem('highScores', JSON.stringify(highScores));
  window.location.assign("");
}