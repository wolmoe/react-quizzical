import { useState } from 'react'
import { nanoid } from 'nanoid'
import { decode } from 'html-entities';
import './App.css';
import Quiz from './components/Quiz';
import SplashScreen from './components/SplashScreen';

const App = () => {
  const [splashScreen, setSplashScreen] = useState(true)
  const [questions, setQuestions] = useState([])
  const [isGameOver, setIsGameOver] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)

  const getQuestions = async () => {
    const res = await fetch(`https://opentdb.com/api.php?amount=5&type=multiple`)
    const data = await res.json()
    setQuestions(data.results.map(item => ({
      category: decode(item.category),
      type: decode(item.type),
      question: decode(item.question),
      answers: [decode(item.correct_answer), ...item.incorrect_answers.map(answer => decode(answer))].sort(() => Math.random() - 0.5).map(answer => ({
        id: nanoid(),
        isSelected: false,
        isRight: false,
        guessedWrong: false,
        answer
      })),
      correct_answer: decode(item.correct_answer),
      id: nanoid(),
    })))
  }

  const startGame = () => {
    setSplashScreen(false)
    setIsGameOver(false)
    setCorrectAnswers(0)
    getQuestions()
  }

  const selectAnswer = (questionId, answerId) => {
    const currentQuestionId = questions.find(el => el.id === questionId).id
    setQuestions(prevQuestions => prevQuestions.map(question => (
      question.id === currentQuestionId
        ? {
          ...question,
          answers: question.answers.map(answer => ({
            ...answer,
            isSelected: answerId === answer.id ? true : false
          }))
        }
        : question
    )))
  }

  const checkAnswers = () => {
    if (isGameOver) {
      startGame()
    } else {
      setIsGameOver(true)

      questions.forEach(question => {
        const chosenAnswerId = question.answers.find(el => el.isSelected).id
        const correctAnswerId = question.answers.find(el => el.answer === question.correct_answer).id
        if (chosenAnswerId === correctAnswerId) {
          setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1)
        }
      })

      setQuestions(prevQuestions => prevQuestions.map(question => {
        const correctAnswerId = question.answers.find(el => el.answer === question.correct_answer).id
        const currentQuestion = { ...question }
        currentQuestion.answers.forEach(answer => {
          if (answer.id === correctAnswerId) {
            answer.isRight = true
          } else if (answer.isSelected && answer.id !== correctAnswerId) {
            answer.guessedWrong = true
          }
          answer.isSelected = false
        })
        return currentQuestion
      }))
    }
  }

  return (
    <main>
      {splashScreen
        ? <SplashScreen
          startGame={startGame} />
        : <Quiz
          questions={questions}
          isGameOver={isGameOver}
          selectAnswer={selectAnswer}
          checkAnswers={checkAnswers}
          correctAnswers={correctAnswers}
        />}
    </main>
  );
}

export default App;