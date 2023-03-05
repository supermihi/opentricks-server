enum DullenMode {
  FirstWins,
  SecondWins,
  FirstWinsExceptInLastTrick,
}
interface Rules {
  withoutNines: boolean;
  dullen: DullenMode;
  fiveNines: boolean;
  numberOfGames: number;
  compulsorySolos: boolean;
}
export const ddkvRules: RulePreset<Rules> = {
  id: "ddkv-standard",
  description: "Turnierregeln des DDKV",
  values: {
    withoutNines: false,
    dullen: DullenMode.FirstWins,
    fiveNines: false,
    numberOfGames: 24,
    compulsorySolos: true,
  },
};
