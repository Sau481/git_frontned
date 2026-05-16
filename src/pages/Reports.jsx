import React, { useState, useEffect } from 'react';
import { 
  FileText, Download, Code, FileJson, Clock, Bot,
  GitCommit, Users, GitPullRequest, Rocket, ShieldAlert,
  ArrowUpRight, ArrowDownRight, GitBranch, Check, Box, Database, Server, Activity, SearchCode, CheckCircle, Lightbulb, ChevronRight
} from 'lucide-react';
import GithubIcon from '../components/shared/GithubIcon';
import GlassCard from '../components/shared/GlassCard';
import { cn } from '../utils/cn';
import { getReportsSummary } from '../services/api';

const mockReportSummary = {
  metrics: [
    { title: "Total Commits", value: "1,246", change: "18.4%", isPositive: true, icon: GitCommit, colorClass: "text-primary" },
    { title: "Active Developers", value: "14", change: "7.7%", isPositive: true, icon: Users, colorClass: "text-blue-400" },
    { title: "PRs Merged", value: "198", change: "23.1%", isPositive: true, icon: GitPullRequest, colorClass: "text-safe" },
    { title: "Deployments", value: "36", change: "20.0%", isPositive: true, icon: Rocket, colorClass: "text-accent" },
    { title: "Failure Rate", value: "5.6%", change: "2.1%", isPositive: false, icon: ShieldAlert, colorClass: "text-risk" }
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

// Subcomponents for the Report
const SectionHeader = ({ number, title }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/50 text-primary flex items-center justify-center text-xs font-bold font-mono shadow-neon">
      {number}
    </div>
    <h3 className="text-lg font-bold text-white">{title}</h3>
  </div>
);

const MetricBlock = ({ title, value, change, isPositive, icon: Icon, colorClass }) => (
  <div className="flex-1 bg-panel/30 border border-border/50 rounded-lg p-3 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-2">
      <div className={cn("p-1.5 rounded-md bg-white/5", colorClass)}>
        <Icon className="w-3.5 h-3.5" />
      </div>
      <span className="text-[20px] font-bold text-white leading-none">{value}</span>
    </div>
    <h4 className="text-[10px] text-gray-500 font-semibold mb-1 uppercase tracking-wider">{title}</h4>
    <div className={cn("text-[10px] flex items-center gap-1", isPositive ? "text-safe" : "text-risk")}>
      {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
      {change} vs previous period
    </div>
  </div>
);

const TimelineItem = ({ date, badge, badgeColor, desc }) => (
  <div className="relative pl-6 pb-6 last:pb-0">
    <div className="absolute left-1.5 top-1.5 w-1.5 h-1.5 rounded-full bg-primary shadow-neon z-10"></div>
    <div className="absolute left-2 top-2 bottom-0 w-px bg-border -z-0 last:bg-transparent"></div>
    <div className="flex items-start gap-4">
      <span className="text-xs text-gray-400 font-mono w-28 flex-shrink-0 pt-0.5">{date}</span>
      <span className={cn("px-2 py-0.5 rounded text-[10px] font-medium border whitespace-nowrap", badgeColor)}>{badge}</span>
      <p className="text-xs text-gray-300 leading-relaxed pt-0.5">{desc}</p>
    </div>
  </div>
);

export default function Reports() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getReportsSummary();
        setReportData(res);
      } catch (err) {
        console.warn("Backend not connected, using mock data in Reports");
        setReportData(mockReportSummary);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !reportData) {
    return (
      <div className="p-6 flex items-center justify-center h-[calc(100vh-100px)]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      
      {/* Action Bar (simulated as top-right but placed in page header for now) */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Reports</h2>
          <p className="text-sm text-gray-400">View and export generated repository intelligence reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-primary/20 border border-primary/50 text-primary rounded hover:bg-primary/30 transition-colors text-xs font-medium shadow-neon">
            <FileText className="w-3.5 h-3.5" /> Generate New Report
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-panel border border-border text-gray-300 rounded hover:text-white transition-colors text-xs">
            <Download className="w-3.5 h-3.5" /> Export PDF
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-panel border border-border text-gray-300 rounded hover:text-white transition-colors text-xs">
            <Code className="w-3.5 h-3.5" /> Export Markdown
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-panel border border-border text-gray-300 rounded hover:text-white transition-colors text-xs">
            <FileJson className="w-3.5 h-3.5" /> Export JSON
          </button>
        </div>
      </div>

      {/* Main Report Document Container */}
      <GlassCard className="max-w-6xl mx-auto bg-[#0a0a0f] border-border/60 shadow-2xl relative overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-safe"></div>
        
        <div className="p-10 space-y-12">
          
          {/* Report Header */}
          <div className="space-y-4 pb-8 border-b border-border/50">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-white tracking-tight">AI Repository Intelligence Report</h1>
              <span className="px-2 py-0.5 rounded text-xs font-mono bg-panel border border-border text-gray-400">v1.0</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Repository: <a href="#" className="text-blue-400 hover:underline">github.com/company/backend</a></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Generated on: <span className="text-gray-300">30 Apr 2024, 11:42 AM</span></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5" />
                <span>Generated by: <span className="text-primary font-medium">Code Archaeology AI</span></span>
              </div>
            </div>
            
            <p className="text-sm text-gray-300 leading-relaxed max-w-4xl pt-2">
              Comprehensive analysis of your repository's evolution, architecture, key insights, and development activity between Jan 01, 2024 and Apr 30, 2024.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            {/* Section 1: Executive Summary */}
            <div>
              <SectionHeader number="1" title="Executive Summary" />
              <p className="text-xs text-gray-300 leading-relaxed mb-6">
                This repository has undergone significant evolution over the analyzed period, transitioning from a more monolithic structure to a modular, service-oriented architecture. Key improvements were made in authentication, session management, and system reliability. Code quality and test coverage have improved, though some high-risk areas require attention.
              </p>
              <div className="flex gap-3">
                {reportData.metrics.map((metric, i) => (
                  <MetricBlock key={i} title={metric.title} value={metric.value} change={metric.change} isPositive={metric.isPositive} icon={metric.icon} colorClass={metric.colorClass} />
                ))}
              </div>
            </div>

            {/* Section 2: Repository Evolution Timeline */}
            <div>
              <SectionHeader number="2" title="Repository Evolution Timeline" />
              <div className="mt-4">
                <TimelineItem date="Jan 01 - Jan 15, 2024" badge="Initial Phase" badgeColor="bg-gray-500/10 text-gray-400 border-gray-600" desc="Baseline period with stable monolith architecture." />
                <TimelineItem date="Jan 16 - Feb 10, 2024" badge="Redis Integration" badgeColor="bg-blue-400/10 text-blue-400 border-blue-400/30" desc="Redis introduced for session storage and caching." />
                <TimelineItem date="Feb 11 - Mar 08, 2024" badge="OAuth Migration" badgeColor="bg-primary/10 text-primary border-primary/30" desc="OAuth migration spike with significant code changes and rollback commits." />
                <TimelineItem date="Mar 09 - Mar 28, 2024" badge="Stability Improvements" badgeColor="bg-safe/10 text-safe border-safe/30" desc="Performance optimizations and reduction in rollback rate." />
                <TimelineItem date="Mar 29 - Apr 30, 2024" badge="Modularization" badgeColor="bg-accent/10 text-accent border-accent/30" desc="Services extracted (notifications, payments). Architecture becoming modular." />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            {/* Section 3: Architecture Overview */}
            <div>
              <SectionHeader number="3" title="Architecture Overview" />
              <div className="bg-[#0f0f13] border border-border/50 rounded-xl p-6 h-64 flex flex-col justify-center relative mt-4">
                {/* Simplified static diagram using absolute positioning/flex */}
                <div className="flex items-center justify-between w-full">
                  <div className="w-24 h-16 bg-panel border border-border rounded flex flex-col items-center justify-center text-[10px] text-gray-300">
                    <Box className="w-4 h-4 mb-1 text-primary" /> Web (Frontend)
                  </div>
                  <div className="w-8 h-[1px] bg-border relative"><ChevronRight className="absolute -right-2 -top-2 w-4 h-4 text-gray-500" /></div>
                  <div className="w-24 h-16 bg-panel border border-border rounded flex flex-col items-center justify-center text-[10px] text-gray-300">
                    <Server className="w-4 h-4 mb-1 text-blue-400" /> API Gateway
                  </div>
                  <div className="w-8 h-[1px] bg-border relative"><ChevronRight className="absolute -right-2 -top-2 w-4 h-4 text-gray-500" /></div>
                  <div className="w-32 bg-primary/5 border border-primary/20 rounded p-2 flex flex-col gap-1.5">
                    <div className="text-[9px] text-primary font-semibold text-center mb-1 uppercase tracking-wider">Core Services</div>
                    {['Auth Service', 'User Service', 'Payment Service', 'Notification Service'].map(s => (
                       <div key={s} className="bg-panel border border-border/50 rounded text-[9px] text-center py-1 text-gray-300">{s}</div>
                    ))}
                  </div>
                  <div className="w-8 h-[1px] bg-border relative"><ChevronRight className="absolute -right-2 -top-2 w-4 h-4 text-gray-500" /></div>
                  <div className="w-24 flex flex-col gap-2">
                    <div className="text-[9px] text-safe font-semibold text-center mb-1 uppercase tracking-wider">Data Stores</div>
                    {['PostgreSQL', 'Redis', 'S3 / Blob Storage'].map(s => (
                       <div key={s} className="bg-panel border border-border/50 rounded text-[9px] text-center py-1.5 text-gray-300 flex items-center justify-center gap-1">
                         <Database className="w-2.5 h-2.5 text-gray-500" /> {s}
                       </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Key Insights & Risks */}
            <div>
              <SectionHeader number="4" title="Key Insights & Risks" />
              <div className="grid grid-cols-2 gap-4 mt-4 h-64">
                {[
                  { title: "OAuth Migration Impact", badge: "High Impact", color: "text-primary border-primary/30 bg-primary/10", desc: "Introduced 17 files across 6 services. Spike in rollback commits and error rate between Mar 01 - Mar 08.", icon: SearchCode },
                  { title: "Redis Integration Boost", badge: "Positive", color: "text-blue-400 border-blue-400/30 bg-blue-400/10", desc: "Improved session management performance. Response time improved by 23%.", icon: Users },
                  { title: "Architecture Evolution", badge: "Structural", color: "text-safe border-safe/30 bg-safe/10", desc: "System evolved from monolith to modular services with clear boundaries.", icon: CheckCircle },
                  { title: "Testing Gap Detected", badge: "Medium Risk", color: "text-accent border-accent/30 bg-accent/10", desc: "High-impact changes merged with low test coverage. Add tests for critical services.", icon: ShieldAlert }
                ].map((insight, i) => (
                  <div key={i} className="bg-panel/40 border border-border/50 rounded-lg p-4 flex flex-col h-full">
                     <div className="flex justify-between items-start mb-2">
                       <insight.icon className={cn("w-4 h-4", insight.color.split(' ')[0])} />
                       <span className={cn("px-2 py-0.5 rounded text-[9px] font-medium border", insight.color)}>{insight.badge}</span>
                     </div>
                     <h4 className="text-xs font-semibold text-gray-200 mb-1">{insight.title}</h4>
                     <p className="text-[10px] text-gray-500 leading-relaxed">{insight.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            {/* Section 5: Important Branches & Commits */}
            <div>
              <SectionHeader number="5" title="Important Branches & Commits" />
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 mb-3 border-b border-border/50 pb-2">Top Branches</h4>
                  <div className="space-y-3">
                    {reportData.branches.map(b => (
                      <div key={b.name} className="flex justify-between items-center text-[10px]">
                        <span className="font-mono text-gray-300 truncate w-32">{b.name}</span>
                        <span className="text-gray-500 w-12">{b.type}</span>
                        <div className="flex items-center gap-1 w-12 justify-end">
                          <div className={cn("w-1.5 h-1.5 rounded-full", b.color.replace('text-', 'bg-'))}></div>
                          <span className={b.color}>{b.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 mb-3 border-b border-border/50 pb-2">Top Impactful Commits</h4>
                  <div className="space-y-3">
                    {reportData.commits.map(c => (
                      <div key={c.hash} className="flex justify-between items-center text-[10px]">
                        <span className="font-mono text-gray-400">{c.hash}</span>
                        <span className="text-gray-300 truncate w-24">{c.msg}</span>
                        <span className={cn("px-1.5 py-0.5 rounded text-[8px] font-medium", c.color)}>{c.impact}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-2 border-t border-border/50">
                     <span className="text-primary text-[10px] hover:underline cursor-pointer">View all impactful commits &rarr;</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6: Agent Investigation Findings */}
            <div>
              <SectionHeader number="6" title="Agent Investigation Findings" />
              <div className="space-y-4 mt-4">
                {[
                  { name: 'Code Archaeologist (Historian)', icon: Bot, color: 'text-primary', bg: 'bg-primary/10', desc: 'Analyzed commit history and identified key evolution phases including migration spikes and refactors.' },
                  { name: 'Anomaly Detective', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-400/10', desc: 'Detected rollback and error rate anomalies during OAuth migration window.' },
                  { name: 'Security Sentinel', icon: ShieldAlert, color: 'text-safe', bg: 'bg-safe/10', desc: 'Scanned for vulnerabilities and risky dependencies. No critical vulnerabilities found.' },
                  { name: 'Insight Synthesizer (Narrator)', icon: Lightbulb, color: 'text-accent', bg: 'bg-accent/10', desc: 'Synthesized insights from all agents and generated this comprehensive report.' }
                ].map(agent => (
                  <div key={agent.name} className="flex gap-3 items-start">
                    <div className={cn("p-2 rounded-lg mt-0.5", agent.bg)}>
                      <agent.icon className={cn("w-4 h-4", agent.color)} />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white mb-0.5">{agent.name}</h4>
                      <p className="text-[10px] text-gray-400 leading-relaxed">{agent.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 7: Conclusions & Recommendations */}
          <div className="border-t border-border/50 pt-8 mt-8">
            <SectionHeader number="7" title="Conclusions & Recommendations" />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mt-4">
              <div>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  The repository is moving in a positive direction towards modularization and scalability. Continued focus on test coverage, refactoring high-churn modules, and monitoring deployment stability will ensure long-term maintainability.
                </p>
                <p className="text-[10px] text-gray-500 italic">
                  This report is AI-generated and based on repository data from Jan 01, 2024 to Apr 30, 2024.
                </p>
              </div>
              <div className="bg-[#0f0f13] border border-border/50 rounded-xl p-5">
                <h4 className="text-xs font-semibold text-white mb-3">Top Recommendations</h4>
                <div className="space-y-2.5">
                  {[
                    "Increase test coverage for critical services",
                    "Reduce coupling between Auth and Session services",
                    "Monitor performance of Notification Service",
                    "Continue modularization of remaining components"
                  ].map((rec, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-safe mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-300 leading-tight">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </GlassCard>

    </div>
  );
}
