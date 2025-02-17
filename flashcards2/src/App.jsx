import { useState } from 'react';
import './App.css';

const initialFacts = [
  { question: 'What is the largest planet in our solar system?', answer: 'Jupiter', difficulty: 'Easy', subject: 'Earth Science' },
  { question: 'What galaxy do we live in?', answer: 'Milky Way', difficulty: 'Medium', subject: 'Astronomy' },
  { question: 'What is the hottest planet in our solar system?', answer: 'Venus', difficulty: 'Medium', subject: 'Earth Science' },
  { question: 'What is the speed of light in vacuum (in km/s)?', answer: '300000', difficulty: 'Hard', subject: 'Physics' },
  { question: 'Which planet is known as the Red Planet?', answer: 'Mars', difficulty: 'Easy', subject: 'Earth Science' },
  { question: 'Which Apollo mission was the first to land humans on the Moon?', answer: 'Apollo 11', difficulty: 'Medium', subject: 'Space Exploration' },
  { question: 'What was the name of the spacecraft that carried astronauts to the Moon during Apollo 11?', answer: 'Eagle', difficulty: 'Medium', subject: 'Space Exploration' },
  { question: 'What is the goal of NASA’s Artemis program?', answer: 'To return humans to the Moon and establish a sustainable presence', difficulty: 'Medium', subject: 'Space Exploration' },
  { question: 'Which rocket will launch the Artemis missions?', answer: 'Space Launch System (SLS)', difficulty: 'Hard', subject: 'Space Technology' }
];

function App() {
  const [facts, setFacts] = useState([...initialFacts]);
  const [current, setCurrent] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [mastered, setMastered] = useState([]);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % facts.length);
    resetState();
  };

  const handleBack = () => {
    setCurrent((prev) => (prev - 1 + facts.length) % facts.length);
    resetState();
  };

  const handleRandom = () => {
    setCurrent(Math.floor(Math.random() * facts.length));
    resetState();
  };

  const handleShuffle = () => {
    setFacts([...facts].sort(() => Math.random() - 0.5));
    setCurrent(0);
    resetState();
  };

  const fuzzyMatch = (input, target) => {
    const normalize = (str) => str.trim().toLowerCase();
    return normalize(input) === normalize(target) || normalize(input).includes(normalize(target)) || normalize(target).includes(normalize(input));
  };

  const handleCheck = () => {
    if (fuzzyMatch(userAnswer, facts[current].answer)) {
      setFeedback('✅ Correct!');
      setCurrentStreak((prev) => prev + 1);
      setLongestStreak((prev) => Math.max(prev, currentStreak + 1));
    } else {
      setFeedback(`❌ Incorrect! The correct answer is ${facts[current].answer}.`);
      setCurrentStreak(0);
    }
    setShowAnswer(true);
  };

  const handleMaster = () => {
    const masteredCard = facts[current];
    setMastered([...mastered, masteredCard]);
    const newFacts = facts.filter((_, index) => index !== current);
    if (newFacts.length === 0) {
      setFacts([...initialFacts]);
    } else {
      setFacts(newFacts);
    }
    setCurrent(0);
    resetState();
  };

  const resetState = () => {
    setUserAnswer('');
    setFeedback('');
    setShowAnswer(false);
  };

  return (
    <div className="app">
      <h1>Universe Facts Quiz</h1>
      <div className="streak">
        <p>🔥 Streak: {currentStreak}</p>
        <p>🏆 Longest Streak: {longestStreak}</p>
      </div>
      <div className="info">
        <h2>Category: {facts[current].subject}</h2>
        <p>Difficulty: {facts[current].difficulty}</p>
      </div>
      <div className={`quiz-card ${facts[current].difficulty.toLowerCase()}`}>
        <p>{facts[current].question}</p>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Your answer"
        />
        <div className="buttons">
          <button onClick={handleCheck}>Check Answer</button>
        </div>
        {showAnswer && <p className="feedback">{feedback}</p>}
      </div>
      <div className="nav-buttons">
        <button onClick={handleBack}>⬅ Back</button>
        <button onClick={handleNext}>Next ➡</button>
        <button onClick={handleRandom}>🔀 Random</button>
        <button onClick={handleShuffle}>🔄 Shuffle</button>
        <button onClick={handleMaster}>🎓 Mastered</button>
      </div>
      <div className="mastered-section">
        <h2>🎯 Mastered Cards</h2>
        <ul>
          {mastered.map((card, index) => (
            <li key={index}>{card.question} - {card.answer}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
