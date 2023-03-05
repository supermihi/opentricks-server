import { FrenchCard } from "../decks/french.mjs";
import { Seat } from "./index.js";

interface ActionInterface {
  index: number;
  actionType: ActionType;
}

interface HumanActionInterface extends ActionInterface {
  timestamp: Date;
  seat: Seat;
}

export type GameAction = RankSeatsAction | StartGameAction;

export enum ActionType {
  RankSeats,
  StartGame,
}

export interface RankSeatsAction extends ActionInterface {
  actionType: ActionType.RankSeats;
  rank: Seat[];
}

export interface StartGameAction extends ActionInterface {
  actionType: ActionType.StartGame;
  shuffledCards: FrenchCard[];
}

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ActionError";
  }
}
export type HumanAction = never;

export type Action = GameAction | HumanAction;

export function isHumanAction(action: Action): action is HumanAction {
  return "seat" in Object.getOwnPropertyNames(action);
}
