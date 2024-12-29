import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebase'; // Firebase setup
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

const ManageQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const navigate = useNavigate();

  // Fetch quizzes and unique departments and courses
  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzesCollection = collection(db, 'quizzes');
      const quizSnapshot = await getDocs(quizzesCollection);
      const quizData = quizSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setQuizzes(quizData);
      const uniqueDepartments = [...new Set(quizData.map(q => q.department))];
      setDepartments(uniqueDepartments);
      const uniqueCourses = [...new Set(quizData.map(q => q.course))];
      setCourses(uniqueCourses);

      setFilteredQuizzes(quizData); // Initially show all quizzes
    };

    fetchQuizzes();
  }, []);

  // Filter quizzes based on selected department and course
  useEffect(() => {
    let filtered = quizzes;
    if (selectedDepartment) {
      filtered = filtered.filter(quiz => quiz.department === selectedDepartment);
    }
    if (selectedCourse) {
      filtered = filtered.filter(quiz => quiz.course === selectedCourse);
    }
    setFilteredQuizzes(filtered);
  }, [selectedDepartment, selectedCourse, quizzes]);

  // Delete a specific question
  const handleDeleteQuestion = async (quizId, questionIndex) => {
    const quizToEdit = quizzes.find(quiz => quiz.id === quizId);
    const updatedQuestions = quizToEdit.questions.filter((_, index) => index !== questionIndex);

    const quizDoc = doc(db, 'quizzes', quizId);
    await deleteDoc(quizDoc);

    setQuizzes(quizzes.map(quiz => (quiz.id === quizId ? { ...quiz, questions: updatedQuestions } : quiz)));
    setFilteredQuizzes(filteredQuizzes.map(quiz => (quiz.id === quizId ? { ...quiz, questions: updatedQuestions } : quiz))); // Update the filtered quizzes as well
  };

  // Navigate to the Edit Question page
  const handleEditQuestion = (quizId, questionIndex) => {
    navigate(`/admin/edit-quiz/${quizId}/${questionIndex}`);
  };

  return (
    <div>
      <h1>Manage Quizzes</h1>

      {/* Filter Section */}
      <div style={{ marginBottom: '20px' }}>
        <label>
          Department:
          <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
            <option value="">All Departments</option>
            {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
          </select>
        </label>

        <label style={{ marginLeft: '20px' }}>
          Course:
          <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
            <option value="">All Courses</option>
            {courses.map(course => <option key={course} value={course}>{course}</option>)}
          </select>
        </label>
      </div>

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Question No.</th>
            <th>Question</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuizzes.map((quiz, quizIndex) => (
            quiz.questions.map((q, questionIndex) => (
              <tr key={`${quiz.id}-${questionIndex}`}>
                <td>{questionIndex + 1}</td>
                <td>{q.question}</td>
                <td>
                  <button onClick={() => handleEditQuestion(quiz.id, questionIndex)}>Edit</button>
                  <button onClick={() => handleDeleteQuestion(quiz.id, questionIndex)}>Delete</button>
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageQuiz;
