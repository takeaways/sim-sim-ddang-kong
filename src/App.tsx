import { useState, useEffect } from "react";

import SingleCard from "components/SingleCard/SingleCard";

import { createCardAndShuffledCard } from "utils/card";

import { Card } from "types";

import "./App.css";

const cardImages = [
  { src: "img/helmet-1.png", matched: false },
  { src: "img/potion-1.png", matched: false },
  { src: "img/ring-1.png", matched: false },
  { src: "img/scroll-1.png", matched: false },
  { src: "img/shield-1.png", matched: false },
  { src: "img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [disabled, setDisabeld] = useState(false);
  const [turns, setTurns] = useState(0);

  const handleStartGame = () => {
    resetChoices();
    setTurns(0);
    setCards(createCardAndShuffledCard(cardImages));
  };

  const handleChoice = (card: Card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetChoices = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabeld(false);
    setTurns((turns) => turns + 1);
  };

  useEffect(() => {
    if (!choiceOne || !choiceTwo) return;
    setDisabeld(true);
    if (choiceOne.src === choiceTwo.src) {
      setCards((prevCards) => {
        return prevCards.map((card) => {
          if (card.src === choiceOne.src) {
            card.matched = true;
          }
          return { ...card };
        });
      });
    }
    setTimeout(resetChoices, 400);
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    handleStartGame();
  }, []);

  const isFlipped = (card: Card) => {
    return card === choiceOne || card === choiceTwo || card.matched;
  };
  return (
    <div className="App">
      <h1>심심함, 땅콩임</h1>
      <p>Turns: {turns}</p>
      <button onClick={handleStartGame}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            onChoice={handleChoice}
            flipped={isFlipped(card)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
