import { expect } from "chai";
import { getActivePlayers } from "./doppelkopf.js";

describe("getActivePlayersTests", () => {
  it("should return [0,1,2,3] on first 4-player game", () => {
    const result = getActivePlayers(0, 4);
    expect(result).to.deep.equal([0, 1, 2, 3]);
  });
});
