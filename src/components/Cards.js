import { useState } from "react";

// Get all images from the img folder
const images = require.context("../img", true);
const imagePaths = images.keys().map(path => images(path));
// console.log(imagePaths);

export default function Cards({ updateScore, resetScore }) {
    // cards list is stored as an array of booleans, where true means the card has been clicked
    const [cards, setCards] = useState(Array(imagePaths.length).fill(false));
    //console.log(cards); // DEBUG

    return (
        <div className="cards">
            {cards.map((clicked, id) => (
                <Card
                    key={id}
                    id={id + 1}
                    updateScore={_ => {
                        updateScore();
                        setCards([
                            ...cards.slice(0, id),
                            true,
                            ...cards.slice(id + 1),
                        ]);
                    }}
                    reset={_ => {
                        resetScore();
                        setCards(Array(imagePaths.length).fill(false));
                    }}
                    img={imagePaths[id]}
                    clickState={clicked}
                />
            ))}
        </div>
    );
}

function Card({ id, updateScore, reset, img, clickState }) {
    const [clicked, setClicked] = useState(clickState);

    function handleClick() {
        console.log("Card clicked"); // DEBUG
        if (clicked) {
            reset();
        } else {
            updateScore();
            setClicked(true);
        }
    }

    return (
        <div
            className="card"
            data-id={id}
            onClick={handleClick}
            style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        ></div>
    );
}
