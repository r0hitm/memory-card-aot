import { useState } from "react";
import "./App.css";

function App() {
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    function updateScore() {
        setCurrentScore(currentScore + 1);
        if (currentScore + 1 > bestScore) {
            setBestScore(currentScore + 1);
        }
    }

    return (
        <div className="App">
            <h1>
                進撃の巨人
                <br />
                Memory Card Game
            </h1>
            <p>
                <button class="help">How to Play?</button>
            </p>
            <div class="score-board">
                <div class="current">
                    <strong>Current Score</strong>: <span>{currentScore}</span>
                </div>
                <div class="best">
                    <strong>Best Score</strong>: <span>{bestScore}</span>
                </div>
            </div>
            <div class="cards"></div>
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

export default App;
