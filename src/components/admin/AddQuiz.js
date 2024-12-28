import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebase'; // Firebase setup
import { collection, addDoc } from 'firebase/firestore';
// import '../assets/admincss/AddQuiz.css';


const AddQuiz = () => {
  const navigate = useNavigate();

  // Predefined options
  const totalTimes = [30, 60, 100]; // in minutes
  const points = [1, 2, 5];
  const departments = ['Math', 'Science', 'History', 'Programming'];

  // State management
  const [selectedTime, setSelectedTime] = useState(totalTimes[0]);
  const [selectedPoints, setSelectedPoints] = useState(points[0]);
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);
  const [questions, setQuestions] = useState([
    { 
      question: '', 
      options: ['', '', '', ''], 
      correctAnswer: '', 
      description: '' 
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add a new question
  const handleAddQuestion = () => {
    setQuestions([
      ...questions, 
      { question: '', options: ['', '', '', ''], correctAnswer: '', description: '' }
    ]);
  };

  // Update a specific question field
  const handleUpdateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Update an option for a question
  const handleUpdateOption = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const quizData = {
      totalTime: selectedTime,
      points: selectedPoints,
      department: selectedDepartment,
      questions,
    };

    try {
      const docRef = await addDoc(collection(db, 'quizzes'), quizData);
      alert(`Quiz created successfully! ID: ${docRef.id}`);
      navigate('/admin/manage-quiz'); // Redirect to Manage Quiz page
    } catch (error) {
      console.error('Error adding quiz:', error);
      alert('Error creating quiz. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Add Quiz</h1>
      <form onSubmit={handleSubmit}>
        {/* Select Total Time */}
        <label>
          Total Time:
          <select value={selectedTime} onChange={(e) => setSelectedTime(Number(e.target.value))}>
            {totalTimes.map((time) => (
              <option key={time} value={time}>
                {time} minutes
              </option>
            ))}
          </select>
        </label>

        {/* Select Points */}
        <label>
          Points per Question:
          <select value={selectedPoints} onChange={(e) => setSelectedPoints(Number(e.target.value))}>
            {points.map((point) => (
              <option key={point} value={point}>
                {point} points
              </option>
            ))}
          </select>
        </label>

        {/* Select Department */}
        <label>
          Department:
          <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </label>

        {/* Questions Section */}
        <h3>Questions</h3>
        {questions.map((q, index) => (
          <div key={index} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
            <label>
              Question {index + 1}:
              <input
                type="text"
                value={q.question}
                onChange={(e) => handleUpdateQuestion(index, 'question', e.target.value)}
                required
              />
            </label>

            <h4>Options</h4>
            {q.options.map((option, optIndex) => (
              <label key={optIndex}>
                Option {String.fromCharCode(65 + optIndex)}:
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleUpdateOption(index, optIndex, e.target.value)}
                  required
                />
              </label>
            ))}

            <label>
              Correct Answer:
              <select
                value={q.correctAnswer}
                onChange={(e) => handleUpdateQuestion(index, 'correctAnswer', e.target.value)}
                required
              >
                <option value="">Select Correct Option</option>
                {q.options.map((option, optIndex) => (
                  <option key={optIndex} value={String.fromCharCode(65 + optIndex)}>
                    Option {String.fromCharCode(65 + optIndex)}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Description:
              <textarea
                value={q.description}
                onChange={(e) => handleUpdateQuestion(index, 'description', e.target.value)}
                required
              />
            </label>
          </div>
        ))}

        <button type="button" onClick={handleAddQuestion}>
          Add Another Question
        </button>

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Quiz...' : 'Create Quiz'}
        </button>
      </form>
    </div>
  );
};

export default AddQuiz;
