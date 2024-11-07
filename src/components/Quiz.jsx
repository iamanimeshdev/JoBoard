import React, { useState, useEffect } from 'react';
import questions from '../questions';
import './Quiz.css';

const Quiz = ({ onComplete }) => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  // Function to randomly select 10 questions
  const selectRandomQuestions = () => {
    // Shuffle the questions array and pick the first 10 elements
    const shuffledQuestions = [...questions].sort(() => 0.5 - Math.random());
    return shuffledQuestions.slice(0, 10);
  };

  // Set selectedQuestions when the component mounts
  useEffect(() => {
    setSelectedQuestions(selectRandomQuestions());
  }, []);

  const handleAnswerChange = (questionIndex, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer,
    });
  };

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    selectedQuestions.forEach((question, index) => {
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
      <h2 className="quiz-title">Zeroth round</h2>
      
      {selectedQuestions.map((question, index) => (
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
