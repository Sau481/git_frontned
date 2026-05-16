export const mockAgentsData = [
  {
    id: 'archaeologist',
    name: 'Code Archaeologist',
    role: 'History & Pattern Analysis',
    iconName: 'bot',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary',
    status: 'Active',
    description: 'Analyzes commit history, code evolution, and identifies patterns, anomalies, and historical insights.',
    metrics: [
      { label: 'Tasks Today', value: '128' },
      { label: 'Insights Generated', value: '24' },
      { label: 'Accuracy', value: '94%' }
    ],
    capabilities: [
      'Commit history analysis',
      'Code evolution tracking',
      'Pattern detection',
      'Impact analysis'
    ],
    dataSources: ['Git Commits', 'Pull Requests', 'Code Changes', 'Branch History']
  },
  {
    id: 'detective',
    name: 'Anomaly Detective',
    role: 'Issue & Anomaly Detection',
    iconName: 'activity',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400',
    status: 'Active',
    description: 'Detects anomalies, spikes, regressions, and unusual patterns in code and system behavior.',
    metrics: [
      { label: 'Tasks Today', value: '86' },
      { label: 'Issues Found', value: '11' },
      { label: 'Accuracy', value: '91%' }
    ]
  },
  {
    id: 'sentinel',
    name: 'Security Sentinel',
    role: 'Security Analysis',
    iconName: 'shield-alert',
    color: 'text-safe',
    bg: 'bg-safe/10',
    border: 'border-safe',
    status: 'Active',
    description: 'Scans for security issues, vulnerable dependencies, and risky code changes.',
    metrics: [
      { label: 'Tasks Today', value: '62' },
      { label: 'Vulnerabilities', value: '7' },
      { label: 'Accuracy', value: '93%' }
    ]
  },
  {
    id: 'synthesizer',
    name: 'Insight Synthesizer',
    role: 'Intelligence & Narratives',
    iconName: 'lightbulb',
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent',
    status: 'Active',
    description: 'Synthesizes findings from other agents into human-readable insights and narratives.',
    metrics: [
      { label: 'Tasks Today', value: '54' },
      { label: 'Narratives', value: '18' },
      { label: 'Accuracy', value: '95%' }
    ]
  },
  {
    id: 'analyzer',
    name: 'Dev Activity Analyzer',
    role: 'Developer Productivity',
    iconName: 'users',
    color: 'text-gray-300',
    bg: 'bg-gray-500/10',
    border: 'border-gray-500',
    status: 'Active',
    description: 'Analyzes developer activity, collaboration patterns, and productivity metrics.',
    metrics: [
      { label: 'Tasks Today', value: '73' },
      { label: 'Reports', value: '9' },
      { label: 'Accuracy', value: '92%' }
    ]
  }
];

export const mockAgentActivity = [
  { agentId: 'archaeologist', task: 'Analyze OAuth migration impact', status: 'Completed', statusColor: 'bg-safe/20 text-safe', start: '30 Apr 2024, 10:15 AM', duration: '2m 14s', results: '12 insights' },
  { agentId: 'detective', task: 'Detect performance regressions', status: 'Completed', statusColor: 'bg-safe/20 text-safe', start: '30 Apr 2024, 10:10 AM', duration: '1m 48s', results: '3 anomalies' },
  { agentId: 'sentinel', task: 'Scan for vulnerable dependencies', status: 'Completed', statusColor: 'bg-safe/20 text-safe', start: '30 Apr 2024, 10:05 AM', duration: '2m 32s', results: '2 vulnerabilities' },
  { agentId: 'synthesizer', task: 'Generate weekly summary', status: 'Completed', statusColor: 'bg-safe/20 text-safe', start: '30 Apr 2024, 09:58 AM', duration: '1m 21s', results: '1 narrative' },
  { agentId: 'analyzer', task: 'Analyze developer productivity', status: 'In Progress', statusColor: 'bg-blue-400/20 text-blue-400', start: '30 Apr 2024, 11:40 AM', duration: '—', results: '—' }
];
