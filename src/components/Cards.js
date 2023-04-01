import { useCallback, useState } from "react";

// Get all images from the img folder
const images = require.context("../img", true);
const imagePaths = images.keys().map(path => images(path));
// console.log(imagePaths);

export default function Cards({ updateScore, resetScore }) {
    // Array of objects with a clicked property and an imgPathIndex property
    const [cards, setCards] = useState(
        imagePaths.map((_, i) => ({
            clicked: false,
            imgPathIndex: i,
        }))
    );

    // function handleClick(i) {
    //     if (cards[i].clicked) {
    //         // console.log("You clicked on a card that was already clicked!");  // DEBUG
    //         resetScore();
    //         const newCards = cards;
    //         newCards.forEach(card => (card.clicked = false));
    //         console.assert(cards.every(card => !card.clicked));
    //         setCards(newCards);
    //     } else {
    //         // console.log("You clicked on a new card!");   // DEBUG
    //         updateScore();
    //         const newCards = cards;
    //         newCards[i].clicked = true;
    //         setCards(newCards);
    //         console.assert(cards[i].clicked);
    //     }

    //     shuffleCards(cards);
    // }

    const handleClick = useCallback(
        i => {
            const cardsCopy = [...cards];
            if (cards[i].clicked) {
                // console.log("You clicked on a card that was already clicked!");  // DEBUG
                resetScore();
                cardsCopy.forEach(card => (card.clicked = false));
                setCards(cardsCopy);

                console.assert(cards.every(card => !card.clicked)); // DEBUG
            } else {
                // console.log("You clicked on a new card!");   // DEBUG
                updateScore();
                cardsCopy[i].clicked = true;
                setCards(cardsCopy);

                console.assert(cards[i].clicked); // DEBUG
            }

            shuffleCards(cards);
        },
        [cards, updateScore, resetScore]
    );

    function shuffleCards(cardsCopy) {
        // Fisher-Yates shuffle
        for (let i = cardsCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardsCopy[i], cardsCopy[j]] = [cardsCopy[j], cardsCopy[i]];
        }
        setCards(cardsCopy);
    }

    return (
        <div className="cards">
            {cards.map((_, i) => (
                <Card
                    key={i}
                    onClick={() => handleClick(i)}
                    // imgPath={imagePaths[i]}
                    cardImg={imagePaths[cards[i].imgPathIndex]}
                />
            ))}
        </div>
    );
}

function Card({ onClick, cardImg }) {
    return (
        <div
            className="card"
            onClick={onClick}
            style={{
                backgroundImage: `url(${cardImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        ></div>
    );
}
