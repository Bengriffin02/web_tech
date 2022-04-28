
import React, { useState } from 'react';
import Countdown from "react-countdown";
import './index.css';


export default function App() {
const questions = [
    {
        questionText: 'Who holds the title for the most F1 Grand Prix races won?',
        answerOptions: [
            { answerText: 'Sebsastion Vettel', isCorrect: false },
            { answerText: 'Ayrton Senna', isCorrect: false },
            { answerText: 'Lewis Hamilton', isCorrect: true },
            { answerText: 'Michael Schumacher', isCorrect: false },
        ],
    },
    {
        questionText: 'At what age did 2021 world champion Max Verstappen make his F1 debut?',
        answerOptions: [
            { answerText: '19', isCorrect: false },
            { answerText: '17', isCorrect: true },
            { answerText: '16', isCorrect: false },
            { answerText: '21', isCorrect: false },
        ],
    },
    {
        questionText: 'What year did 7 time world champion Lewis Hamilton win his first F1 world championship?',
        answerOptions: [
            { answerText: '2008', isCorrect: true },
            { answerText: '2012', isCorrect: false },
            { answerText: '2013', isCorrect: false },
            { answerText: '2010', isCorrect: false },
        ],
    },
    {
        questionText: 'Which track did Australian driver Daniel Ricciardo win his first race for Mclaren?',
        answerOptions: [
            { answerText: 'Silverstone', isCorrect: false },
            { answerText: 'Monza', isCorrect: true },
            { answerText: 'Jeddah Corniche Circuit', isCorrect: false },
            { answerText: 'Circuit of the Americas', isCorrect: false },
        ],
    },
    {
        questionText: 'Who became the Mercedes team principal in 2013?',
        answerOptions: [
        { answerText: 'Zak Brown', isCorrect: false },
        { answerText: 'Christian Horner', isCorrect: false },
        { answerText: 'Mattia Binotto', isCorrect: false },
        { answerText: 'Toto Wolff', isCorrect: true },
        ],
    },
    {
        questionText: 'In which country was Grand Prix first used to describe a race?',
        answerOptions: [
        { answerText: 'Italy', isCorrect: false },
        { answerText: 'Belgium', isCorrect: false },
        { answerText: 'Mexico', isCorrect: false },
        { answerText: 'France', isCorrect: true },
        ],
    },
    {
        questionText: 'How many world championship titles does Michael Schumacher have?',
        answerOptions: [
        { answerText: '1', isCorrect: false },
        { answerText: '4', isCorrect: false },
        { answerText: '7', isCorrect: true },
        { answerText: '6', isCorrect: false },
        ],
    },
    {
        questionText: 'Which country is Ferrari driver Charles Leclerc from?',
        answerOptions: [
        { answerText: 'France', isCorrect: false },
        { answerText: 'Italy', isCorrect: false },
        { answerText: 'Portugal', isCorrect: false },
        { answerText: 'Monaco', isCorrect: true },
        ],
    },
];

const [currentQuestion, setCurrentQuestion] = useState(0);
const [showScore, setShowScore] = useState(false);
const [score, setScore] = useState(0);
const [showQuestions, setShowQuestions] = useState(false);

const fiftyFifty= (questions) => {
    
    // https://stackoverflow.com/questions/45175836/random-number-using-react-js
    // //https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
    const min = 0;
    const max = 2; // can only be 3 wrong items, get one random value to show and hide others
    const random = Math.floor((Math.random())*(max-min+1))+min;

    for(let i=0;i < 3;i++){
        if(i !== random){
            var element = document.getElementsByClassName(questions[i])
            element[0].className ='hidden';
        }
    }
}

const handleAnswerOptionClick= (isCorrect) => {
    
    if (isCorrect) {
        setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        
    } else {
        setShowScore(true);
    }
};

const  renderer = ({ seconds, completed }) => {
    if (completed) {
         // Render a complete state
   
    } else {
      // Render a countdown
      return (
        <span>
          You have {seconds} seconds to answer
        </span>
      );
    }
  };


function  Question(props){
   
    return (
        <div>
        <Countdown date={Date.now() + 20000}
           onComplete={() => {
               handleAnswerOptionClick(false);
            }}
          renderer={renderer} />

        
		 <div className='question-text'>{props.text}</div>
		  <div className='answer-section'>
            {props.currentQuestionObject.answerOptions.map((answerOption) => (
           <span class="questoin" key = {answerOption.answerText}>
           
           <button 
                key={answerOption.answerText} 
                className={answerOption.answerText}
                onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}
            </button></span>
           ))}
           </div>
     
        <div><button 
        onClick={() => fiftyFifty(props.currentQuestionObject.answerOptions
            .filter(v => v.isCorrect === false)
            .map(x => x.answerText))}>50/50</button></div>
            <div class='background'>
        
            </div>
        </div>
        
        
      );
}

 
  class Quiz extends React.Component {
   
    render() {
  
      return (
        <div className="quiz">
            <div className={showQuestions ? 'hidden' : undefined}>
                <h3>Formula 1 Quiz </h3> 
               
            <button onClick={() => setShowQuestions(true)}>Start F1 Quiz</button>
            </div>
            <div className={showQuestions ? undefined :'hidden' }>
                {showScore ? (
                    <div className='score-section'>
                        You scored {score} out of {questions.length}
                        <div>
                            <button onClick={() =>  window.location.reload()}>Start again</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='question-section'>
                       
                            <div className='question-count'>
                                <span>Question {currentQuestion + 1}</span>/{questions.length}
                            </div>                         
                        </div>
                        <Question   text={questions[currentQuestion].questionText}
			                        currentQuestionObject={questions[currentQuestion]}
			            />
                    </>
                )}
          </div>
        </div>
      );
    }
  }
  return (
      <div>
    <Quiz />
    </div>
      );
}
