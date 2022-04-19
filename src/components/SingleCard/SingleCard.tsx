import { Card } from "types";

import "./SingleCard.css";

type Props = {
  card: Card;
  flipped: boolean;
  disabled: boolean;
  onChoice: (card: Card) => void;
};
const SingleCard = ({ card, onChoice, flipped, disabled }: Props) => {
  const handleClick = () => {
    !disabled && onChoice(card);
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <div className="front">
          <img src={card.src} alt="card front" />
        </div>
        <div className="back">
          <img src="/img/cover.png" onClick={handleClick} alt="card back" />
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
