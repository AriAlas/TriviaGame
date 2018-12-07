/*Questions Object*/

var questions = [{
    question: "What is the name of the boy who owns Buzz Lightyear in the movie Toy Story?",
    answers: ["Christopher", "Donald","Bruce","Andy"],
    correctAnswer: "Andy",
    image: "assets/images/andy.gif"
},{
    question: "What does the crocodile swallow in Peter Pan?",
    answers: ["A clock", "A hat", "A hook","A fish"],
    correctAnswer: "A clock",
    image: "assets/images/crocodile.gif"
},{
    question: "What is the name of Bambi's rabbit friend?",
    answers: ["Faline", "Thumper", "Flower", "Jumpy"],
    correctAnswer: "Thumper",
    image: "assets/images/Thumper.gif"  
},{
    question: "In Aladdin, what is the name of Jasmine’s pet tiger?",
    answers: ["Rajah", "Abu", "Flower", "Jafar"],
    correctAnswer: "Rajah",
    image: "assets/images/Rajah.gif"
},{
    question: "What was the name of the dragon (god wanna be) in Mulan?",
    answers: ["Yao", "Mushu", "Fa-Zhou", "Chi-Fu"],
    correctAnswer: "Mushu",
    image: "assets/images/Mushu.gif"
},{
    question: "What is Ariel's daughter's name??",
    answers: ["Andrina", "Aquata", "Ursula", "Melody"],
    correctAnswer: "Melody",
    image: "assets/images/Melody.gif"
},{
    question: "What is the name of the cat that belongs to Cinderella's stepmother?",
    answers: ["Gus", "Figaro", "Lucifer", "Cheshire"],
    correctAnswer: "Lucifer",
    image: "assets/images/Lucifer.gif"
},{
    question: "Who wanted to marry Belle?",
    answers: ["Flynn", "Eric", "Gaston", "Charming"],
    correctAnswer: "Gaston",
    image: "assets/images/Gaston.gif"
},{
    question: "After running in the woods, Snow White comes across a house. Who lives in it?",
    answers: ["Dwarfs", "A Witch", "A Wizard", "The Prince"],
    correctAnswer: "Dwarfs",
    image: "assets/images/Dwarfs.gif"
},{
    question: "What game are Alice and The Queen of Hearts playing with flamingos and hedgehogs?",
    answers: ["Golf", "Soccer", "Croquet", "Softball"],
    correctAnswer: "Croquet",
    image: "assets/images/Croquet.gif"
}];

/*trivia Object*/

var trivia = {
    questions: questions,
    presentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    countDown: function(){
        trivia.counter--;
        $("#theCounter").html(trivia.counter);
        if (trivia.counter === 0){
            trivia.timeUp();
        }
    },
    loadQuestion: function(){
        timer = setInterval(trivia.countDown, 1000);
        $("#content").html("<h2>" + questions[this.presentQuestion].question + "</h2>");
        for(var i = 0; i < questions[this.presentQuestion].answers.length; i++){
            $("#content").append("<button class='answer-button' id='button'" + "data-name='" + questions[this.presentQuestion].answers[i] + "'>" + questions[this.presentQuestion].answers[i] + "</button>");
        }
    },
    
    nextQuestion: function(){
        trivia.counter = 30;
        $("#theCounter").html(trivia.counter);
        trivia.presentQuestion++;
        trivia.loadQuestion();
    },
    timeUp: function(){
        clearInterval(timer);
        $("#theCounter").html(trivia.counter);

        $("#content").html("<h2>Time out!</h2>");
        $("#content").append("<h3>The correct answer was:" + questions[this.presentQuestion].correctAnswer);
        $("#content").append("<img src='" + questions[this.presentQuestion].image + "'/>");

        if (trivia.presentQuestion === questions.length - 1){
            setTimeout(trivia.results, 3000);
        } else {
            setTimeout(trivia.nextQuestion, 3000);
        }
        
    },
    results: function(){
        clearInterval(timer);
        $("#content").html("<h2>Let's see how you did!");
        $("#theCounter").html(trivia.counter);
        $("#content").append("<h3>Correct Answers:" + trivia.correct + "</h3>");
        $("#content").append("<h3>Incorrect Answers:"+ trivia.incorrect + "</h3>");
        $("#content").append("<h3>Unanswered:" + (questions.length - (trivia.incorrect + trivia.correct) + "</h3>"));
        $("#content").append("<br><button id='start-over'>Start Over</button>");

    },
    clicked: function(event){
        clearInterval(timer);

        if($(event.target).data("name") === questions[this.presentQuestion].correctAnswer){
            this.answeredCorrectly();
        } else {
            this.answeredIncorrectly();
        }
    },
    answeredIncorrectly: function(){
        trivia.incorrect++;
        clearInterval(timer);
        $("#content").html("<h2>Wrong!</h2>");
        $("#content").append("<h3>Correct answer was" + questions[this.presentQuestion].correctAnswer + "</h3>");
        $("#content").append("<img src='" + questions[this.presentQuestion].image + "'/>");

        if (trivia.presentQuestion === questions.length - 1){
            setTimeout(trivia.results, 3000);
        } else {
            setTimeout(trivia.nextQuestion, 3000);
        }
    },
    answeredCorrectly: function(){
        clearInterval(timer);
        trivia.correct++;
        $("#content").html("<h2>Correct!</h2>");
        $("#content").append("<img src='"+ questions[this.presentQuestion].image + "'/>");

        if (trivia.presentQuestion === questions.length - 1) {
            setTimeout(trivia.results, 3000);
        } else {
            setTimeout(trivia.nextQuestion, 3000);
        }
    },
    reset: function(){
        this.presentQuestion = 0;
        this.counter = 0;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
};




/* OnClick Event #1*/
$(document).on("click", "#start", function(event){
    $("#count").prepend("<h2> Time Remaining: <span id='theCounter'>30</span> Seconds</h2>");
    trivia.loadQuestion();

});

/*OnClick Event #2*/
$(document).on("click", ".answer-button", function(event){
    trivia.clicked(event);
});

/*OnClick Event #3*/
$(document).on("click", "#start-over", function(event){
    trivia.reset();
});
