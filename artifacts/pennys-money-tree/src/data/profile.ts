export type PlayerProfile = {
  name: string;
  savingsGoal: number;
  interests: string[];
  personality: string[];
  spendingStyle: string;
  temptation: string[];
  difficulty: "easy" | "medium" | "hard";
};

export const playerProfile: PlayerProfile = {
  name: "Maya",
  savingsGoal: 175,
  interests: ["sports", "gaming"],
  personality: ["leader", "creator"],
  spendingStyle: "spend",
  temptation: ["sneakers", "tech"],
  difficulty: "medium"
};
