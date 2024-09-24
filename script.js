const questions = [
    {
        question:"What does HTML stand for?",
        answers:[
            {text:"HyperText Markup Language",correct:true},
            {text:"Home Tool Markup Language",correct:false},
            {text:"Hyperlinks Text Management Language",correct:false},
            {text:"Hyper Transfer Markup Language",correct:false},
       ]
    },
    {
        question:"What is the correct syntax to output something to the console in JavaScript?",
        answers:[
            {text:"print();",correct:false},
            {text:"console.log();",correct:true},
            {text:"echo();",correct:false},
            {text:"output();",correct:false},
       ]
    },
    {
        question:"Which property is used to change the background color in CSS?",
        answers:[
            {text:"color",correct:false},
            {text:"background-color",correct:true},
            {text:"font-color",correct:false},
            {text:"bg-color",correct:false},
       ]
    },
    {
        question:"Which event occurs when a user clicks on an HTML element in JavaScript?",
        answers:[
            {text:"onmouseover",correct:false},
            {text:"onchange",correct:false},
            {text:"onclick",correct:true},
            {text:"onhover",correct:false},
       ]
    },
    {
        question:"Which JavaScript keyword is used to declare a constant?",
        answers:[
            {text:"var",correct:false},
            {text:"let",correct:false},
            {text:"const",correct:true},
            {text:"constant",correct:false},
       ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextbutton = document.getElementById("next-btn");

let currentQuestionIndex= 0;
let score =0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextbutton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const iscorrect = selectedBtn.dataset.correct==="true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextbutton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextbutton.innerHTML="Play again";
    nextbutton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextbutton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();