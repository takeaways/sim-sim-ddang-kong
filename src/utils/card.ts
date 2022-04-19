import { Card } from "types";

export const createCardAndShuffledCard = (cards: Array<Omit<Card, "id">>) => {
  return [...cards, ...cards]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }));
};
