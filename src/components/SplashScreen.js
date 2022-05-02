const SplashScreen = (props) => {
    return (
        <section className="splash">
            <h1>Quizzical</h1>
            <p>Test your knowledge in this little quiz game!</p>
            <button className="button start-game"
                onClick={props.startGame}
            >Start game</button>
        </section>
    )
}

export default SplashScreen