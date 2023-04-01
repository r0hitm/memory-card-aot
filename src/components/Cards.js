import { useCallback, useState } from "react";

const images = require.context("../img", true);
const imagePaths = images.keys().map(path => images(path));

/**
 * Shuffles the cards using the Fisher-Yates shuffle algorithm
 * @param {Array} cardsCopy copy of the cards array of objects from the Cards component state
 * @returns {Array} shuffled copy of the cards array of objects from the Cards component state
 */
function shuffleCards(cardsCopy) {
    // Fisher-Yates shuffle
    for (let i = cardsCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardsCopy[i], cardsCopy[j]] = [cardsCopy[j], cardsCopy[i]];
    }
    return cardsCopy;
}

/**
 * Component that renders the cards
 * @param {{updateScore: Function, resetScore: Function}} props props passed to the component from the parent component
 * @returns {JSX.Element} JSX element
 */
export default function Cards({ updateScore, resetScore }) {
    // Array of objects with a clicked property and an imgPathIndex property
    const [cards, setCards] = useState(
        imagePaths.map((_, i) => ({
            clicked: false,
            imgPathIndex: i,
        }))
    );

    const handleClick = useCallback(
        i => {
            const cardsCopy = [...cards];
            if (cards[i].clicked) {
                // console.log("You clicked on a card that was already clicked!");  // DEBUG
                resetScore();
                cardsCopy.forEach(card => (card.clicked = false));
                setCards(cardsCopy);

                console.assert(cards.every(card => !card.clicked)); // Failsafe just in case
            } else {
                // console.log("You clicked on a new card!");   // DEBUG
                updateScore();
                cardsCopy[i].clicked = true;
                setCards(cardsCopy);

                console.assert(cards[i].clicked); // Failsafe just in case
            }

            setCards(shuffleCards(cardsCopy));
        },
        [cards, updateScore, resetScore]
    );

    return (
        <div className="cards">
            {cards.map((_, i) => (
                <Card
                    key={i}
                    onClick={() => handleClick(i)}
                    cardImg={imagePaths[cards[i].imgPathIndex]}
                />
            ))}
        </div>
    );
}

/**
 * Component that renders a single card
 * @param {{onClick: Function, cardImg: string}} props props passed to the component from the parent component
 * @returns {JSX.Element} JSX element
 */
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
