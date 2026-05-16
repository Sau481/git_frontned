export const mockReportSummary = {
  metrics: [
    { title: "Total Commits", value: "1,246", change: "18.4%", isPositive: true, icon: "GitCommit", colorClass: "text-primary" },
    { title: "Active Developers", value: "14", change: "7.7%", isPositive: true, icon: "Users", colorClass: "text-blue-400" },
    { title: "PRs Merged", value: "198", change: "23.1%", isPositive: true, icon: "GitPullRequest", colorClass: "text-safe" },
    { title: "Deployments", value: "36", change: "20.0%", isPositive: true, icon: "Rocket", colorClass: "text-accent" },
    { title: "Failure Rate", value: "5.6%", change: "2.1%", isPositive: false, icon: "ShieldAlert", colorClass: "text-risk" }
  ],
  branches: [
    { name: 'main', type: 'Primary', status: 'Active', color: 'text-safe' },
    { name: 'oauth-migration', type: 'Feature', status: 'High', color: 'text-risk' },
    { name: 'redis-session-refactor', type: 'Feature', status: 'Merged', color: 'text-safe' },
    { name: 'notification-service', type: 'Feature', status: 'Merged', color: 'text-safe' }
  ],
  commits: [
    { hash: 'a1b2c3d', msg: 'feat(auth): integrate oauth', impact: 'High', color: 'bg-risk/20 text-risk' },
    { hash: 'd4e5f6g', msg: 'feat(session): add redis', impact: 'High', color: 'bg-risk/20 text-risk' },
    { hash: 'f7e8d9c', msg: 'refactor: improve token', impact: 'Medium', color: 'bg-accent/20 text-accent' },
    { hash: 'e9d8c7b', msg: 'fix(core): memory leak', impact: 'High', color: 'bg-risk/20 text-risk' }
  ]
};
