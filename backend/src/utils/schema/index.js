export const Task = {
  statusBar: [
    "pending",
    "inprogress",
    "reviewing",
    "completed",
    "rejected",
    "onhold",
    "blocked",
  ],
  categoryBar: [
    "development",
    "design",
    "support",
    "marketing",
    "qa",
    "documentation",
    "other",
  ],
  priorityBar: ["low", "medium", "high", "urgent"],
  phaseBar: ["planning", "implementation", "review", "done"],
};

export const COOKIESSCHEMA = {
  ACCESSTOKEN: "accessToken",
  REFRESHTOKEN: "refreshToken",
  MAXAGE: {
    ACCESSTOKEN: 15 * 60 * 1000,
    REFRESHTOKEN: 7 * 24 * 60 * 60 * 1000,
  },
  PRODUCTION: "production",
};
