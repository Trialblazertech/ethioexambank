import React, { useState, useEffect } from "react";
import "../css/examPage.css";

const ExamPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 1,
    minutes: 30,
    seconds: 0,
  }); // Initial timer (e.g., 30 minutes)

  // Function to handle countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const { hours, minutes, seconds } = prevTime;

        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer); // Stop countdown when it reaches 0
          alert("Time is up!");
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        // Decrement logic
        if (seconds > 0) return { ...prevTime, seconds: seconds - 1 };
        if (minutes > 0)
          return { ...prevTime, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };

        return prevTime; // Default return to prevent breaking
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  // Format time to display double digits
  const formatTime = (unit) => String(unit).padStart(2, "0");

  return (
    <div className="exam-page-container">
      <header className="exam-header">
        <button className="collapse-button"></button>
        <div className="timer-container">
          <span className="time-segment">{formatTime(timeLeft.hours)} H</span>
          <span className="time-segment">{formatTime(timeLeft.minutes)} M</span>
          <span className="time-segment">{formatTime(timeLeft.seconds)} S</span>
        </div>
      </header>

      <main className="exam-content">
        <div className="question-box">
          <div className="question-header">
            <p>Question 1</p>
            <span className="mark-info">MARK 1 OUT OF 1</span>
            <button className="dropdown-arrow">▶</button>
          </div>
          <div className="options-container">
            <label className="option">
              <input type="radio" name="option" />
              Option 1
            </label>
            <label className="option">
              <input type="radio" name="option" />
              Option 2
            </label>
            <label className="option">
              <input type="radio" name="option" />
              Option 3
            </label>
            <label className="option">
              <input type="radio" name="option" />
              Option 4
            </label>
          </div>
        </div>
        <div className="navigation-buttons">
          <button className="nav-button">❮ Previous</button>
          <button className="nav-button">Next ❯</button>
        </div>
        <button className="quit-button">Quit</button>
        <div className="warning-box">
          <p>If you close or quit the exam, you will lose the progress.</p>
        </div>
      </main>
    </div>
  );
};

export default ExamPage;
