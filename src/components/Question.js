const Question = (props) => {

    return (
        <>
            <article className="question">
                <h2>{props.question.question}</h2>
                <section className="choice-container">
                    {props.question.answers.map(answer => (
                        <button
                            className={`button choice-button ${answer.isSelected ? 'selected' : answer.isRight ? 'correct' : answer.guessedWrong ? 'wrong' : ''}`}
                            key={answer.id}
                            onClick={() => props.selectAnswer(props.question.id, answer.id)}
                            disabled={props.isGameOver}
                        >
                            {answer.answer}
                        </button>
                    ))}
                </section>
            </article>
            <hr />
        </>

    )
}

export default Question