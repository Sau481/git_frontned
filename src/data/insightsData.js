export const mockActivityData = [
  { name: 'Jan 24', commits: 65, prs: 15 },
  { name: 'Feb 24', commits: 85, prs: 25 },
  { name: 'Mar 24', commits: 150, prs: 45 },
  { name: 'Apr 24', commits: 110, prs: 35 },
  { name: 'May 24', commits: 90, prs: 20 },
];

export const mockDistributionData = [
  { name: 'Additions', value: 42.1, color: '#10b981' },
  { name: 'Modifications', value: 34.7, color: '#3b82f6' },
  { name: 'Deletions', value: 15.9, color: '#8b5cf6' },
  { name: 'Renames', value: 4.3, color: '#f59e0b' },
  { name: 'Others', value: 3.0, color: '#6b7280' },
];

export const mockCommitData = [
  { hash: 'a1b2c3d', msg: 'feat(auth): integrate oauth with auth0', author: 'jane.doe', impact: 'High', impactColor: 'bg-risk/20 text-risk', files: 17, date: 'Mar 02, 2024' },
  { hash: 'd4e5f6g', msg: 'feat(session): add redis session store', author: 'john.smith', impact: 'High', impactColor: 'bg-risk/20 text-risk', files: 9, date: 'Mar 03, 2024' },
  { hash: 'f7e8d9c', msg: 'refactor: improve token handling', author: 'jane.doe', impact: 'Medium', impactColor: 'bg-accent/20 text-accent', files: 6, date: 'Feb 12, 2024' },
];
