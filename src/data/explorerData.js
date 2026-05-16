export const mockDetails = {
  repository: 'backend',
  defaultBranch: 'main',
  totalBranches: 18,
  totalCommits: '1,248',
  contributors: 3,
  firstCommit: 'Jan 05, 2024',
  lastCommit: 'Apr 30, 2024',
  language: 'TypeScript'
};

export const mockCommits = [
  { message: 'chore: update redis dependency', author: 'l0m1n2o', date: 'Apr 02, 2024' },
  { message: 'fix: handle redis connection leak', author: 'p3q4r5s', date: 'Apr 01, 2024' },
  { message: 'feat: add redis health check', author: 't6u7v8w', date: 'Mar 29, 2024' },
  { message: 'refactor: redis client abstraction', author: 'x9y0z1a', date: 'Mar 27, 2024' }
];

export const mockFiles = [
  { path: 'src/config/redis.ts', date: 'Modified Mar 03, 2024' },
  { path: 'src/services/session/redisStore.ts', date: 'Modified Mar 05, 2024' },
  { path: 'docker/redis/Dockerfile', date: 'Modified Apr 02, 2024' },
  { path: 'src/middleware/redisClient.ts', date: 'Modified Mar 12, 2024' }
];

export const mockGraphNodes = [
  { id: '1', position: { x: 50, y: 100 }, data: { label: 'Initial Setup' }, style: { backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '10px', padding: '4px 8px' } },
  { id: '2', position: { x: 300, y: 100 }, data: { label: 'Auth Refactor' }, style: { backgroundColor: '#f59e0b', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '10px', padding: '4px 8px' } },
  { id: '3', position: { x: 550, y: 100 }, data: { label: 'Redis Integration' }, style: { backgroundColor: '#f59e0b', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '10px', padding: '4px 8px' } },
  { id: '4', position: { x: 800, y: 100 }, data: { label: 'OAuth Migration' }, style: { backgroundColor: '#f59e0b', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '10px', padding: '4px 8px' } },
  
  // Main Branch Nodes
  { id: 'm1', position: { x: 50, y: 150 }, data: { label: 'main' }, style: { backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '12px', padding: '2px 8px', fontSize: '12px' } },
  { id: 'm2', position: { x: 150, y: 150 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-blue-500 border-none' },
  { id: 'm3', position: { x: 250, y: 150 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-blue-500 border-none' },
  { id: 'm4', position: { x: 350, y: 150 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-blue-500 border-none' },
  { id: 'm5', position: { x: 450, y: 150 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-blue-500 border-none' },
  { id: 'm6', position: { x: 550, y: 150 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-blue-500 border-none' },
  { id: 'm7', position: { x: 650, y: 150 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-blue-500 border-none' },
  { id: 'm8', position: { x: 750, y: 150 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-blue-500 border-none' },
  { id: 'm9', position: { x: 850, y: 150 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-blue-500 border-none' },
  { id: 'm10', position: { x: 950, y: 150 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-blue-500 border-none' },

  // Feature Branch 1 (auth-rewrite)
  { id: 'f1_start', position: { x: 50, y: 220 }, data: { label: 'auth-rewrite' }, style: { backgroundColor: '#2d1b4e', color: '#a78bfa', border: '1px solid #8b5cf6', borderRadius: '12px', padding: '2px 8px', fontSize: '12px' } },
  { id: 'f1_1', position: { x: 200, y: 220 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-purple-500 border-none' },
  { id: 'f1_2', position: { x: 300, y: 220 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-purple-500 border-none' },
  { id: 'f1_3', position: { x: 400, y: 220 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-gray-400 border-none' }, // Merge
  { id: 'f1_4', position: { x: 500, y: 220 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-purple-500 border-none' },
  
  // High risk
  { id: 'hr_1', position: { x: 600, y: 220 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-red-500 border-none shadow-[0_0_15px_rgba(239,68,68,0.8)]' },
  { id: 'hr_2', position: { x: 650, y: 220 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-red-500 border-none shadow-[0_0_15px_rgba(239,68,68,0.8)]' },
  
  { id: 'f1_5', position: { x: 750, y: 220 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-gray-400 border-none' },

  // Feature Branch 2 (payment-fix)
  { id: 'f2_start', position: { x: 50, y: 280 }, data: { label: 'payment-fix' }, style: { backgroundColor: '#2d1b4e', color: '#a78bfa', border: '1px solid #8b5cf6', borderRadius: '12px', padding: '2px 8px', fontSize: '12px' } },
  { id: 'f2_1', position: { x: 150, y: 280 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-purple-500 border-none' },
  { id: 'f2_2', position: { x: 350, y: 280 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-purple-500 border-none' },
  { id: 'f2_3', position: { x: 450, y: 280 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-purple-500 border-none' },
  { id: 'f2_4', position: { x: 550, y: 280 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-purple-500 border-none' },
  { id: 'f2_5', position: { x: 700, y: 280 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-purple-500 border-none' },

  // Feature Branch 3 (performance)
  { id: 'f3_start', position: { x: 50, y: 340 }, data: { label: 'performance' }, style: { backgroundColor: '#2d1b4e', color: '#a78bfa', border: '1px solid #8b5cf6', borderRadius: '12px', padding: '2px 8px', fontSize: '12px' } },
  { id: 'f3_1', position: { x: 250, y: 340 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-purple-500 border-none' },
  { id: 'f3_2', position: { x: 550, y: 340 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-purple-500 border-none' },
];

export const mockGraphEdges = [
  // Events
  { id: 'e_m2', source: '1', target: 'm2', type: 'straight', style: { stroke: '#10b981', strokeDasharray: '2,2' } },
  { id: 'e_m4', source: '2', target: 'm4', type: 'straight', style: { stroke: '#f59e0b', strokeDasharray: '2,2' } },
  { id: 'e_m6', source: '3', target: 'm6', type: 'straight', style: { stroke: '#f59e0b', strokeDasharray: '2,2' } },
  { id: 'e_m9', source: '4', target: 'm9', type: 'straight', style: { stroke: '#f59e0b', strokeDasharray: '2,2' } },

  // Main line
  { id: 'em1', source: 'm1', target: 'm2', style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'em2', source: 'm2', target: 'm3', style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'em3', source: 'm3', target: 'm4', style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'em4', source: 'm4', target: 'm5', style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'em5', source: 'm5', target: 'm6', style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'em6', source: 'm6', target: 'm7', style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'em7', source: 'm7', target: 'm8', style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'em8', source: 'm8', target: 'm9', style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'em9', source: 'm9', target: 'm10', style: { stroke: '#3b82f6', strokeWidth: 2 } },

  // Feature 1
  { id: 'ef1_1', source: 'f1_start', target: 'f1_1', style: { stroke: '#a78bfa', strokeWidth: 2 } },
  { id: 'ef1_2', source: 'f1_1', target: 'f1_2', style: { stroke: '#a78bfa', strokeWidth: 2 } },
  { id: 'ef1_3', source: 'f1_2', target: 'f1_3', style: { stroke: '#a78bfa', strokeWidth: 2 } },
  { id: 'ef1_4', source: 'f1_3', target: 'f1_4', style: { stroke: '#a78bfa', strokeWidth: 2 } },
  { id: 'ef1_5', source: 'f1_4', target: 'hr_1', style: { stroke: '#a78bfa', strokeWidth: 2 } },
  { id: 'ef1_6', source: 'hr_1', target: 'hr_2', style: { stroke: '#ef4444', strokeWidth: 2 } },
  { id: 'ef1_7', source: 'hr_2', target: 'f1_5', style: { stroke: '#a78bfa', strokeWidth: 2 } },

  // Feature 2
  { id: 'ef2_1', source: 'f2_start', target: 'f2_1', style: { stroke: '#a78bfa', strokeWidth: 2 } },
  { id: 'ef2_2', source: 'f2_1', target: 'f2_2', style: { stroke: '#a78bfa', strokeWidth: 2 } },
  { id: 'ef2_3', source: 'f2_2', target: 'f2_3', style: { stroke: '#a78bfa', strokeWidth: 2 } },
  { id: 'ef2_4', source: 'f2_3', target: 'f2_4', style: { stroke: '#a78bfa', strokeWidth: 2 } },
  { id: 'ef2_5', source: 'f2_4', target: 'f2_5', style: { stroke: '#a78bfa', strokeWidth: 2 } },

  // Feature 3
  { id: 'ef3_1', source: 'f3_start', target: 'f3_1', style: { stroke: '#a78bfa', strokeWidth: 2 } },
  { id: 'ef3_2', source: 'f3_1', target: 'f3_2', style: { stroke: '#a78bfa', strokeWidth: 2 } },

  // Merges
  { id: 'em_1', source: 'm3', target: 'f1_3', type: 'smoothstep', style: { stroke: '#9ca3af', strokeWidth: 1.5, strokeDasharray: '4,4' } },
  { id: 'em_2', source: 'm5', target: 'f2_4', type: 'smoothstep', style: { stroke: '#9ca3af', strokeWidth: 1.5, strokeDasharray: '4,4' } },
  { id: 'em_3', source: 'f1_5', target: 'm8', type: 'smoothstep', style: { stroke: '#9ca3af', strokeWidth: 1.5, strokeDasharray: '4,4' } },
];
