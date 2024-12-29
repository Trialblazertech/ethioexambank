import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebase'; // Firebase setup
import { collection, addDoc } from 'firebase/firestore';

const AddQuiz = () => {
  const navigate = useNavigate();
 
  // Predefined options
  const points = [1, 2, 5];
  const departments = ['Computer_Science', 'IT', 'History', 'Programming'];

  // Courses mapped to departments
  const courses = {
    Computer_Science: ['Computer Programming', 'Database Systems', 'Object Oriented Programming', 'Computer organization and Architecture', 'Data Communication and Computer Networking ', 'Data Structures and Algorithms', 'Operating System', 'Software Engineering', 'Design and Analysis of Algorithms', 'Introduction to Artificial Intelligence', 'Computer Security', 'Network and System Administration', 'Automata and Complexity Theory', 'Compiler Design'],
    IT: ['Physics', 'Chemistry', 'Biology'],
    History: ['World History', 'American History', 'Ancient Civilizations'],
    Programming: ['JavaScript', 'Python', 'Java'],
  };

  // State management
  const [selectedPoints, setSelectedPoints] = useState(points[0]);
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);
  const [selectedCourse, setSelectedCourse] = useState(courses[departments[0]][0]);
  const [questions, setQuestions] = useState([
    { 
      question: '', 
      options: ['', '', '', ''], 
      correctAnswer: '', 
      description: '' 
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update the selected department and reset the selected course
  const handleDepartmentChange = (newDepartment) => {
    setSelectedDepartment(newDepartment);
    setSelectedCourse(courses[newDepartment][0]); // Set the first course of the selected department
  };

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
      points: selectedPoints,
      department: selectedDepartment,
      course: selectedCourse,
      questions,
    };

    try {
      const docRef = await addDoc(collection(db, 'quizzes'), quizData);
      alert(`Quiz saved successfully! ID: ${docRef.id}`);
    } catch (error) {
      console.error('Error saving quiz:', error);
      alert('Error saving quiz. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Add Quiz</h1>
      <form onSubmit={handleSubmit}>
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
          <select
            value={selectedDepartment}
            onChange={(e) => handleDepartmentChange(e.target.value)}
          >
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </label>

        {/* Select Course */}
        <label>
          Course:
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            {courses[selectedDepartment].map((course) => (
              <option key={course} value={course}>
                {course}
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

        {/* <button type="button" onClick={handleAddQuestion}>
          Add Another Question
        </button> */}

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving Quiz...' : 'Save Quiz'}
        </button>

        <button type="button" onClick={() => navigate('/admin/manage-quiz')}>
          View Quiz
        </button>
      </form>
    </div>
  );
};

export default AddQuiz;
