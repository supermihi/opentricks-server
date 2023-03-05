import { assert } from "console";
import lodash from "lodash";
import { FrenchCard, frenchDeck, Rank } from "../decks/french.mjs";
import {
  Action,
  ActionError,
  ActionType,
  GameAction,
  isHumanAction,
  RankSeatsAction,
  StartGameAction,
} from "./actions.js";
import { Seat } from "./index.js";

const { range, shuffle } = lodash;

const numberOfPlayers = 4;
function getDeck({ withoutNines }: Rules): FrenchCard[] {
  const baseDeck = frenchDeck.filter(
    (c) => c.rank !== Rank.Seven && c.rank !== Rank.Eight
  );
  return withoutNines ? baseDeck.filter((c) => c.rank !== Rank.Nine) : baseDeck;
}

class Table {
  rules: Rules;
  actions: Action[];
  numberOfSeats: number;
  games: Game[];
  rankedSeats: Seat[];

  constructor(rules: Rules, numberOfSeats: 4 | 5, history: Action[]) {
    this.rules = rules;
    this.games = [];
    this.numberOfSeats = numberOfSeats;
    for (const action of history) {
      this.perform(action);
    }
  }

  private currentGame(): Game | null {
    if (this.games.length === 0) {
      return null;
    }
    return this.games[this.games.length - 1];
  }
  /**
   * Perform the given action. Afterwards, apply and yield potentially
   * induced game actions.
   * @param action The action to perform. Must be a HumanAction.
   */
  *performAndProceed(action: Action): Generator<Action> {
    assert(isHumanAction(action));
    this.perform(action);
    for (;;) {
      const gameAction = this.getOutstandingGameAction();
      if (gameAction !== null) {
        this.performAction(gameAction);
        yield gameAction;
      } else {
        break;
      }
    }
  }

  private perform(action: Action) {
    assert(action.index == this.actions.length);
    this.performAction(action);
    this.actions.push(action);
  }
  private performAction(action: Action) {
    switch (action.actionType) {
      case ActionType.RankSeats:
        assert(this.rankSeats === null);
        this.rankedSeats = (action as RankSeatsAction).rank;
        break;
      case ActionType.StartGame:
        this.games.push(new Game());
        break;
      default:
        throw new ActionError(`unsupported game action ${action}`);
    }
  }

  private shouldStartGame(): boolean {
    return (
      this.games.length === 0 ||
      (this.games.length < this.rules.numberOfGames &&
        this.currentGame().isComplete())
    );
  }

  private getOutstandingGameAction(): GameAction | null {
    if (this.actions.length === 0) {
      return this.rankSeats();
    }
    if (this.shouldStartGame()) {
      return this.startGame();
    }
  }

  private rankSeats(): RankSeatsAction {
    const seats = range(this.numberOfSeats) as Seat[];
    const rankedSeats = shuffle(seats);
    return {
      actionType: ActionType.RankSeats,
      rank: rankedSeats,
      index: this.nextActionIndex(),
    };
  }

  private startGame(): StartGameAction {
    const shuffledCards = shuffle(getDeck(this.rules));
    return {
      actionType: ActionType.StartGame,
      shuffledCards,
      index: this.nextActionIndex(),
    };
  }

  private nextActionIndex(): number {
    return this.actions.length;
  }
}

export function getActivePlayers(
  gameNumber: number,
  numberOfSeats: number
): number[] {
  const dealerIndex = gameNumber % numberOfSeats;
  const numSkipped = numberOfSeats - numberOfPlayers;
  return range(numberOfPlayers).map(
    (i) => (dealerIndex + i + numSkipped) % numberOfSeats
  );
}

class Game {
  isComplete(): boolean {
    return false;
  }
}
