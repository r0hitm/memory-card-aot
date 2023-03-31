import { useState } from "react";

// Get all images from the img folder
const images = require.context("../img", true);
const imagePaths = images.keys().map(path => images(path));
// console.log(imagePaths);

export default function Cards({ updateScore, resetScore }) {
    // Array of booleans to keep track of which cards have been clicked
    const [cards, setCards] = useState(Array(imagePaths.length).fill(false));

    function handleClick(i) {
        console.log("Card clicked"); // DEBUG
        if (cards[i]) {
            resetScore();
            setCards(Array(imagePaths.length).fill(false));
        } else {
            updateScore();
            setCards([...cards.slice(0, i), true, ...cards.slice(i + 1)]);
        }
    }

    return (
        <div className="cards">
            {cards.map((clicked, i) => (
                <Card
                    key={i}
                    onClick={() => handleClick(i)}
                    imgPath={imagePaths[i]}
                    // clickState={clicked}
                />
            ))}
        </div>
    );
}

function Card({ onClick, imgPath, clickState }) {
    // const [clicked, setClicked] = useState(clickState);
    // const [imageURL, setImageURL] = useState(img);

    return (
        <div
            className="card"
            onClick={onClick}
            style={{
                backgroundImage: `url(${imgPath})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        ></div>
    );
}
