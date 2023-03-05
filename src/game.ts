export interface RulePreset<T> {
  id: string;
  description: string;
  values: T;
}

export interface Card {
  // unique id
  id: string;
}

/*
type PlayerCards = readonly Card[];

interface Cards {
  hands: readonly PlayerCards[];
  skat: readonly Card[];
}

function dealCards({ deck, skatSize, players }: Rules): Cards {
  const shuffledCards = shuffle(deck);
  const skat = shuffledCards.splice(0, skatSize);
  const hands: PlayerCards[] = [];
  const cardsPerPlayer = (deck.length - skatSize) / players;
  for (let i = 0; i < players; i++) {
    hands.push(shuffledCards.splice(0, cardsPerPlayer));
  }
  return { skat, hands };
}
enum ActionType {
  playCard = "play",
  announce = "announce",
  dropCard = "drop",
}

interface Action {
  type: ActionType;
  value: string; // card id (play/drop), or announcement (announce)
  player: number;
}

function removeCard(cards: PlayerCards, idToRemove: string): PlayerCards {
  const index = cards.findIndex((c) => c.id === idToRemove);
  if (index === -1) {
    throw new Error("card not found");
  }
  return cards.filter((_, i) => i !== index);
}

function perform(cards: Cards, action: Action): Cards {
  switch (action.type) {
    case ActionType.announce:
      return cards;
    case ActionType.playCard:
      return {
        skat: cards.skat,
        hands: cards.hands.map((pCards, p) =>
          p == action.player ? removeCard(pCards, action.value) : pCards
        ),
      };
    case ActionType.dropCard:
      return {
        skat: [...cards.skat],
        hands: cards.hands,
      };
  }
}

namespace french {
  export enum Suit {
    clubs = "clubs",
    diamonds = "diamonds",
    hearts = "hearts",
    spades = "spades",
  }

  export enum Rank {
    seven = "seven",
    eight = "eight",
    nine = "nine",
    king = "king",
    ten = "ten",
    ace = "ace",
    jack = "jack",
    queen = "queen",
  }

  export interface FrenchCard extends Card {
    suit: Suit;
    rank: Rank;
  }

  function isFrench(card: Card): card is FrenchCard {
    return "suit" in card && "rank" in card;
  }

  export function createCard(rank: Rank, suit: Suit): FrenchCard {
    return { rank, suit, id: `${suit}-${rank}` };
  }

  export function createDeck(
    ranks: Rank[] = Object.values(Rank)
  ): Deck<FrenchCard> {
    return Object.values(Suit).flatMap((suit) =>
      ranks.map((rank) => createCard(rank, suit))
    );
  }

  const standardValue: CardValues = (card: Card) => {
    if (!isFrench(card)) {
      throw new Error("not a french card");
    }
    switch (card.rank) {
      case Rank.seven:
        return 0;
      case Rank.eight:
        return 0;
      case Rank.nine:
        return 0;
      case Rank.king:
        return 4;
      case Rank.ten:
        return 10;
      case Rank.ace:
        return 11;
      case Rank.jack:
        return 2;
      case Rank.queen:
        return 3;
    }
  };
}

namespace doko {
  import Rank = french.Rank;
  const ranks = [
    Rank.nine,
    Rank.king,
    Rank.ten,
    Rank.ace,
    Rank.jack,
    Rank.queen,
  ];
  const defaultDeck = [
    ...french.createDeck(ranks),
    ...french.createDeck(ranks),
  ];
  const deckWithoutNines = defaultDeck.filter((card) => card.rank != Rank.nine);

  const ddkvRules: Rules = {
    deck: defaultDeck,
    players: 4,
    skatSize: 0,
    play(actions) {
      return [];
    },
  };

  enum Phase {
    bidding,
    main,
  }

  interface State {
    phase: Phase;
  }

  const initialState = (): State => ({ phase: Phase.bidding });

  function playDoko(actions: readonly Action[]) {}
}

namespace skat {
  const deck = french.createDeck();

  const rules: Rules = {
    deck,
    players: 3,
    skatSize: 2,
  };
}
*/
