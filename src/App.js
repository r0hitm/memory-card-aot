import { useState } from "react";
import "./App.css";
import Cards from "./components/Cards";

function App() {
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(localStorage.getItem("bestScore") || 0);

    function updateScore() {
        setCurrentScore(currentScore + 1);
        if (currentScore + 1 > bestScore) {
            setBestScore(currentScore + 1);
            localStorage.setItem("bestScore", currentScore + 1);
        }

        // User got a perfect score
        if (currentScore + 1 === 21) {
            alert("Oh my! You have a perfect memory!");
            resetScore();
        }
    }

    function resetScore() {
        setCurrentScore(0);
    }

    return (
        <div className="App">
            <h1>
                進撃の巨人
                <br />
                Memory Card Game
            </h1>
            <p>
                <button className="help" onClick={showHelp}>How to Play?</button>
            </p>
            <div className="score-board">
                <div className="current">
                    <strong>Current Score</strong>: <span>{currentScore}</span>
                </div>
                <div className="best">
                    <strong>Best Score</strong>: <span>{bestScore}</span>
                </div>
            </div>
            <Cards updateScore={updateScore} resetScore={resetScore} />
            <footer>
                <p>
                    Made by <a href="https://github.com/r0hitm">Rohit Mehta</a>
                </p>
                |
                <p>
                    View on{" "}
                    <a href="https://github.com/r0hitm/memory-card-aot">
                        GitHub
                    </a>
                </p>
            </footer>
        </div>
    );
}

function showHelp() {
    alert(
        "Click on each card to earn points, but don't click on any more than once! If you do, you lose! Good luck!"
    );
}

export default App;
