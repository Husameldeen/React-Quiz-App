function FinishScreen({ points, totalpoints, highscore, dispatch }) {
    const percentage = (points / totalpoints) * 100
    return (
        <>
            <p className="result">
            You scored <strong>{points}</strong> out of {totalpoints} ({Math.ceil(percentage)}%) 
            </p>
            <p className="highscore">
                (Highscore: {highscore} points)
            </p>
            <button className="btn btn-ui" onClick={() => dispatch({type: 'restart'})}>Restart Quiz</button>
        </>
    )
}

export default FinishScreen
