function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

let secondsLeft = 90;


Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
        secondsLeft += 10;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
//
let timeEl = document.querySelector(".time");

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left till end of Spider quiz.";

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      showScores();
    }

  }, 1000);
}
//
function populate() {
    if(quiz.isEnded()) {
        showScores();
        //incorporate the name signing thing into show scores function?
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
        setTime();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
    //incorporate the score addition form (no default...)
};




// create questions here
let questions = [
    new Question("Who directed Spider-Man 2?", ["Sam Raimi", "Stanley Kubrick","Jonathan Demme", "Kathryn Bigelow"], "Sam Raimi"),
    new Question("What is Spider-Man's secret identity?", ["Cuba Gooding Jr.", "Flash Thompson", "Peter Parker", "Jerry Seinfeld"], "Peter Parker"),
    new Question("In the original comic book series, who was the first villain Spider-Man faced?", ["Stilt Man", "The Chameleon","The Vulture", "Rhino"], "The Chameleon"),
    new Question("In which New York City borough was Spider-Man born and raised? (I excluded Staten Island because, why bother?) ", ["Brooklyn", "The Bronx", "Manhattan", "Queens"], "Queens"),
    new Question("Who was the artist that originated the design and look of Spider-Man?", ["John Romita", "Jack Kirby", "Steve Ditko", "Frank Miller"], "Steve Ditko")
];

// create quiz
let quiz = new Quiz(questions);

// display quiz
populate();