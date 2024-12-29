import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebase'; // Firebase setup
import { doc, getDoc, updateDoc } from 'firebase/firestore';

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
    <div>
      <h1>Edit Question</h1>
      <label>
        Question:
        <input
          type="text"
          value={editedQuestion.question}
          onChange={(e) => setEditedQuestion({ ...editedQuestion, question: e.target.value })}
        />
      </label>

      <h4>Options</h4>
      {editedQuestion.options.map((option, index) => (
        <label key={index}>
          Option {String.fromCharCode(65 + index)}:
          <input
            type="text"
            value={option}
            onChange={(e) => {
              const updatedOptions = [...editedQuestion.options];
              updatedOptions[index] = e.target.value;
              setEditedQuestion({ ...editedQuestion, options: updatedOptions });
            }}
          />
        </label>
      ))}

      <label>
        Correct Answer:
        <select
          value={editedQuestion.correctAnswer}
          onChange={(e) => setEditedQuestion({ ...editedQuestion, correctAnswer: e.target.value })}
        >
          <option value="">Select Correct Option</option>
          {editedQuestion.options.map((_, index) => (
            <option key={index} value={String.fromCharCode(65 + index)}>
              Option {String.fromCharCode(65 + index)}
            </option>
          ))}
        </select>
      </label>

      <label>
        Description:
        <textarea
          value={editedQuestion.description}
          onChange={(e) => setEditedQuestion({ ...editedQuestion, description: e.target.value })}
        />
      </label>

      <button onClick={handleSave}>Save Changes</button>
      <button onClick={() => navigate('/admin/manage-quiz')}>Cancel</button>
    </div>
  );
};

export default EditQuiz;
