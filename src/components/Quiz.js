import Question from './Question';

const Quiz = (props) => {
    return (
        <>
            <div className="quiz-container">
                {props.questions.map(question => (
                    <Question
                        key={question.id}
                        question={question}
                        selectAnswer={props.selectAnswer}
                        isGameOver={props.isGameOver}
                    />)
                )}
            </div>
            <div className="answer-container">
                {props.isGameOver && <span>{`You scored ${props.correctAnswers}/5 correct answers`}</span>}
                <button
                    className="button check-answers"
                    onClick={props.checkAnswers}
                >
                    {!props.isGameOver ? 'Check Answers' : 'Play again'}</button>
            </div>
        </>
    )
}

export default Quiz