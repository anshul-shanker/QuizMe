const username = document.getElementById('username');
const saveScoreButton = document.getElementById('saveScore');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
  // !username.value will return a truthy or a falsey.
  // if the value exists it will return false and disabled will be removed
  saveScoreButton.disabled = !username.value;
})

saveHighScore = e => {
  e.preventDefault();
}