import { Card } from "../game.js";

export enum Suit {
  Diamonds,
  Hearts,
  Spades,
  Clubs,
}

export enum Rank {
  Seven,
  Eight,
  Nine,
  Jack,
  Queen,
  King,
  Ten,
  Ace,
}
const suits: Suit[] = [Suit.Diamonds, Suit.Hearts, Suit.Spades, Suit.Clubs];

export interface FrenchCard extends Card {
  suit: Suit;
  rank: Rank;
}

const ranks: Rank[] = [
  Rank.Seven,
  Rank.Eight,
  Rank.Nine,
  Rank.Jack,
  Rank.Queen,
  Rank.King,
  Rank.Ten,
  Rank.Ace,
];

export const frenchDeck: FrenchCard[] = suits.flatMap((suit) =>
  ranks.map((rank) => ({
    rank,
    suit,
    id: `${suit}${rank}`,
  }))
);
