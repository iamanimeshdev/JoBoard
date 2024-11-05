
import React, { useState } from 'react';
import questions from '../questions';
import './Quiz.css';

const Quiz = ({ onComplete }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleAnswerChange = (questionIndex, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer,
    });
  };

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        correctAnswers++;
      }
    });

    setScore(correctAnswers);

    if (correctAnswers >= 7) {
      onComplete(true);
    } else {
      alert("Sorry, you failed the test.");
      onComplete(false);
    }
  };

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">Software Engineering Quiz</h2>
      
      {questions.map((question, index) => (
        <div className="question-container" key={index}>
          <p className="question">{question.question}</p>
          
          <div className="options">
            {question.options.map((option) => (
              <label className="option-label" key={option}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={selectedAnswers[index] === option}
                  onChange={() => handleAnswerChange(index, option)}
                  className="option-input"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      
      <button onClick={handleSubmitQuiz} className="submit-quiz-btn">Submit Quiz</button>
      {score !== null && <p className="score-display">Your Score: {score}/10</p>}
    </div>
  );
};

export default Quiz;
