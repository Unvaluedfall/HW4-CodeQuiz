// NavBar Selectors
  // Timer Content
    var timeEl = document.querySelector("#timerContent");
  // HighScore Button
    var highScoreButton = document.querySelector("#button-HighScores")
          highScoreButton.addEventListener("click", function(e){
            e.preventDefault();
            hideStartPage();
            hideQuestionContainer();
            showHighscoreContainer();
      });
  
// Main Content
  var container = document.querySelector("#container");

// Variables for the Start Page
  // The Starting Container
    var startContainerEl = document.querySelector("#startContainer");
  // The Submit Button on the start page
    var startButton = document.querySelector("#button-start")
          startButton.addEventListener("click", generateQuiz);

// Variables for the Questions Container
  // For which question your on! 
    var  questionsIndex = 0;
  // Question Container  
    var questionsContainerEl = document.querySelector("#questionContainer");
          questionsContainerEl.addEventListener("click", checkQuiz);
  // Question Header
    var questionHeaderEl = document.querySelector("#questionHeader");
  // All The Question Buttons
    var myBtnClass = document.getElementsByClassName("myBtn");
  // Right and wrong Selectors
    var rightAndWrongEl = document.querySelector("#rightAndWrong")
    var rightOrWrongEl = document.querySelector("#rightOrWrong")    

// HighScore Container
    // HighScore Continer Element
    var HighScoreContainerEl = document.querySelector("#highScoresContainer");
    
    var HighScoreUL = document.querySelector("#highScoresUL");
    
    var HighScoreScore = 0;

    // The Go back button on the HighScores Container
    var goBackButtonEl = document.querySelector("#goBackButton")
          goBackButtonEl.addEventListener("click", function(e){
            e.preventDefault()
            showStartPage();
            hideQuestionContainer();
            hideHighScoreContainer();
            questionsIndex = 0;
        })



    var HighScoreInputEl = document.querySelector("#highScoresInput");
    var HighScoreFormEl = document.querySelector("#highScoresForms");
        HighScoreFormEl.addEventListener("submit", function(e){
            e.preventDefault()
            var inputName = HighScoreInputEl.value
            
            inputNameArray = [];
            inputScoreArray = [];

            inputNameArray.push(inputName);
            inputScoreArray.push(HighScoreScore);
            
            localStorage.setItem("theirName", JSON.stringify(inputNameArray));
            localStorage.setItem("theirScore", JSON.stringify(inputScoreArray));
            
            generateHighScores();
            HighScoreInputEl.value = " "; 
        });



// The Timer for the quiz
function setTime() {
  secondsLeft = questions.length * 15;
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.innerHTML = secondsLeft + " seconds left till Quiz Ends.";

    if(secondsLeft === 0 || secondsLeft < 0) {
      clearInterval(timerInterval);
      hideStartPage();
      hideQuestionContainer();
      showHighscoreContainer();
      timeEl.innerHTML = " ";
    }
  }, 1000);
}
// Timer for Right or Wrong
function setTimeFor() {
  var secondssLeft = 2;
  var timerInterval = setInterval(function() {
    secondssLeft--;

    if(secondssLeft === 0) {
      clearInterval(timerInterval);
      hideRAndWContainer();
    }
  }, 1000);
}

// Showing and hiding StartContainer
function hideStartPage(){
    startContainerEl.style.display = "none";
}
function showStartPage(){
    startContainerEl.style.display = "block";
}
// Showing and hiding Questions
function hideQuestionContainer(){
  questionsContainerEl.style.display = "none";
}
function showQuestionContainer(){
  questionsContainerEl.style.display = "block";
}
// Showing and Hiding HighScore Page
function hideHighScoreContainer(){
  HighScoreContainerEl.style.display = "none";
}
function showHighscoreContainer(){
  HighScoreContainerEl.style.display = "block";
}
// Hiding and Showing Wrong Or Right
function hideRAndWContainer(){
  rightAndWrongEl.style.display = "none";
}
function showRandWContainer(){
  rightAndWrongEl.style.display = "block";
}
function YourRight(){
  rightOrWrongEl.textContent = "Your Right";
}
function YourWrong(){
  rightOrWrongEl.textContent = "Your Wrong";
}

// Displays the Questions and assigns the choices to the buttons
function displayQuestion(){
  questionHeaderEl.textContent = questions[questionsIndex].title;
  for(var i = 0; i < questions[questionsIndex].choices.length ;i++){
    var buttonEl = document.getElementById(i);
    buttonEl.textContent = questions[questionsIndex].choices[i]
  }
}
// Checkes the answer compared to the button clicked
function checkQuiz(event){
  if(event.target.matches("button")){
    var buttonId = event.target.getAttribute("id")
    if(questions[questionsIndex].choices[buttonId] === questions[questionsIndex].answer){
      HighScoreScore += 5;
      showRandWContainer()
      YourRight();
      setTimeFor();
      nextQuestion();
    } else {
      HighScoreScore -= 2;
      secondsLeft -= 3;
      showRandWContainer();
      YourWrong();
      setTimeFor();
      nextQuestion();
    }
  }
}
// Increase the index of questions when ever a button is clicked
function nextQuestion(){
  questionsIndex++;
  if(questionsIndex >= questions.length){
    secondsLeft = 1;
    hideStartPage();
    hideQuestionContainer();
    showHighscoreContainer();
  } else {
    hideStartPage();
    displayQuestion();
    hideHighScoreContainer();
  }
}

// 
function generateHighScores(){
  HighScoreScore = 0;
  var inputNameArray = JSON.parse(localStorage.getItem("theirName"))
  var inputScoreArray = JSON.parse(localStorage.getItem("theirScore"))
  
  for(i = 0; i < inputScoreArray.length; i++){
    var liEl = document.createElement("li");
    liEl.textContent = inputNameArray[i] + " Your Score is: " + inputScoreArray[i];
    HighScoreUL.appendChild(liEl)
  }
}


function generateQuiz(){
  // delete everything within the container, initlize the row and col and heading, the 4 row and col and the button
hideStartPage();
showQuestionContainer();
hideHighScoreContainer();
displayQuestion();
setTime();
}










