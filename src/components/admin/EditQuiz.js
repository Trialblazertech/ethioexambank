import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebase'; // Firebase setup
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { FiArrowLeft } from 'react-icons/fi'; // Importing back icon
import '../assets/admincss/EditQuiz.css'; // Importing custom CSS for styling

const EditQuiz = () => {
  const { quizId, questionIndex } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState(null);

  // Fetch the specific quiz and question
  useEffect(() => {
    const fetchQuiz = async () => {
      const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
      if (quizDoc.exists()) {
        const quizData = quizDoc.data();
        setQuiz(quizData);
        setEditedQuestion({ ...quizData.questions[questionIndex], questionIndex });
      } else {
        alert('Quiz not found!');
        navigate('/admin/manage-quiz');
      }
    };

    fetchQuiz();
  }, [quizId, questionIndex, navigate]);

  // Handle save
  const handleSave = async () => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex] = editedQuestion;

    // Update the quiz in Firebase
    const quizDoc = doc(db, 'quizzes', quizId);
    await updateDoc(quizDoc, { questions: updatedQuestions });

    alert('Question updated successfully!');
    navigate('/admin/manage-quiz');
  };

  if (!editedQuestion) return <div>Loading...</div>;

  return (
    <div className="edit-quiz-container">
      <div className="back-icon" onClick={() => navigate('/admin/')}>
        <FiArrowLeft /> Back to Admin Dashboard
      </div>
      <h1 className="form-title">Edit Question</h1>
      <div className="form-group">
        <label className="form-label">
          Question:
          <input
            type="text"
            value={editedQuestion.question}
            onChange={(e) => setEditedQuestion({ ...editedQuestion, question: e.target.value })}
            className="form-input"
          />
        </label>
      </div>

      <h4 className="options-title">Options</h4>
      {editedQuestion.options.map((option, index) => (
        <div key={index} className="form-group">
          <label className="form-label">
            Option {String.fromCharCode(65 + index)}:
            <input
              type="text"
              value={option}
              onChange={(e) => {
                const updatedOptions = [...editedQuestion.options];
                updatedOptions[index] = e.target.value;
                setEditedQuestion({ ...editedQuestion, options: updatedOptions });
              }}
              className="form-input"
            />
          </label>
        </div>
      ))}

      <div className="form-group">
        <label className="form-label">
          Correct Answer:
          <select
            value={editedQuestion.correctAnswer}
            onChange={(e) => setEditedQuestion({ ...editedQuestion, correctAnswer: e.target.value })}
            className="form-select"
          >
            <option value="">Select Correct Option</option>
            {editedQuestion.options.map((_, index) => (
              <option key={index} value={String.fromCharCode(65 + index)}>
                Option {String.fromCharCode(65 + index)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          Description:
          <textarea
            value={editedQuestion.description}
            onChange={(e) => setEditedQuestion({ ...editedQuestion, description: e.target.value })}
            className="form-textarea"
          />
        </label>
      </div>

      <div className="form-buttons">
        <button onClick={handleSave} className="btn btn-primary">
          Save Changes
        </button>
        <button onClick={() => navigate('/admin/manage-quiz')} className="btn btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditQuiz;
