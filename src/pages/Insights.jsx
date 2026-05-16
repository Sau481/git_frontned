import React, { useState, useEffect } from 'react';
import GlassCard from '../components/shared/GlassCard';
import { 
  GitCommit, Users, GitPullRequest, Rocket, ShieldAlert, 
  ArrowUpRight, ArrowDownRight, Search, FileText, 
  AlertTriangle, CheckCircle, SearchCode 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { cn } from '../utils/cn';
import { getInsightsActivity, getInsightsDistribution, getImpactfulCommits } from '../services/api';

const MetricCard = ({ title, value, change, isPositive, icon: Icon, sparklineColor, iconColor }) => (
  <GlassCard className="p-4 flex flex-col justify-between h-full relative overflow-hidden group">
    <div className="flex justify-between items-start mb-2 z-10">
      <h3 className="text-xs font-semibold text-gray-400">{title}</h3>
      <Icon className={cn("w-4 h-4", iconColor)} />
    </div>
    <div className="z-10">
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className={cn("text-[10px] flex items-center gap-1 font-medium", isPositive ? "text-safe" : "text-risk")}>
        {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change} vs previous period
      </div>
    </div>
    {/* Abstract sparkline curve at the bottom */}
    <div className="absolute bottom-0 left-0 w-full h-8 opacity-40 translate-y-1 group-hover:translate-y-0 transition-transform">
       <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
         <path d="M0,30 L0,20 Q10,10 20,25 T40,15 T60,25 T80,5 T100,10 L100,30 Z" fill={sparklineColor} opacity="0.1" />
         <path d="M0,20 Q10,10 20,25 T40,15 T60,25 T80,5 T100,10" fill="none" stroke={sparklineColor} strokeWidth="1.5" />
       </svg>
    </div>
  </GlassCard>
);

const InsightCard = ({ title, badgeText, badgeColor, description, icon: Icon, iconBg }) => (
  <div className="bg-panel/40 border border-border/50 rounded-lg p-4 hover:border-gray-500 transition-colors cursor-pointer flex flex-col h-full">
    <div className="flex justify-between items-start mb-3">
      <div className={cn("p-1.5 rounded-md", iconBg)}>
        <Icon className={cn("w-4 h-4", badgeColor.replace('text-', 'text-').split(' ')[1] || badgeColor.split(' ')[0])} />
      </div>
      <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium border", badgeColor)}>
        {badgeText}
      </span>
    </div>
    <h4 className="text-sm font-semibold text-gray-200 mb-2 leading-tight">{title}</h4>
    <p className="text-[11px] text-gray-500 flex-1 leading-relaxed">{description}</p>
    <div className="mt-3 text-primary text-xs flex items-center gap-1 group">
      Explore <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
    </div>
  </div>
);

export default function Insights() {
  const [activityData, setActivityData] = useState([]);
  const [distributionData, setDistributionData] = useState([]);
  const [commitData, setCommitData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [activityRes, distRes, commitsRes] = await Promise.all([
          getInsightsActivity(),
          getInsightsDistribution(),
          getImpactfulCommits()
        ]);
        setActivityData(activityRes);
        setDistributionData(distRes);
        setCommitData(commitsRes);
      } catch (err) {
        console.error("Failed to fetch insights data:", err);
        setError("Unable to load insights data. Please check your simulated API connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center h-[calc(100vh-100px)]">
        <div className="bg-risk/10 border border-risk/30 rounded-lg p-6 max-w-md text-center">
          <AlertTriangle className="w-8 h-8 text-risk mx-auto mb-3" />
          <h3 className="text-risk font-semibold mb-2">Connection Error</h3>
          <p className="text-gray-400 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-panel border border-border rounded text-sm hover:text-white transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-white mb-1">Insights</h2>
        <p className="text-sm text-gray-400">AI-powered insights uncovering patterns, anomalies, and key takeaways from your repository.</p>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-5 gap-4 h-[110px]">
        <MetricCard title="Total Commits" value="1,246" change="18.4%" isPositive={true} icon={GitCommit} iconColor="text-primary" sparklineColor="#8b5cf6" />
        <MetricCard title="Active Developers" value="14" change="7.7%" isPositive={true} icon={Users} iconColor="text-blue-400" sparklineColor="#60a5fa" />
        <MetricCard title="Pull Requests Merged" value="198" change="23.1%" isPositive={true} icon={GitPullRequest} iconColor="text-safe" sparklineColor="#10b981" />
        <MetricCard title="Deployment Frequency" value="36" change="20.0%" isPositive={true} icon={Rocket} iconColor="text-accent" sparklineColor="#f59e0b" />
        <MetricCard title="Change Failure Rate" value="5.6%" change="2.1%" isPositive={false} icon={ShieldAlert} iconColor="text-risk" sparklineColor="#ef4444" />
      </div>

      {/* Key Insights Row */}
      <GlassCard className="p-5 flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-white">Key Insights (AI Summary)</h3>
        <div className="grid grid-cols-4 gap-4">
          <InsightCard 
            title="OAuth Migration Impact" 
            badgeText="High Impact" badgeColor="text-primary border-primary/30 bg-primary/10" 
            icon={SearchCode} iconBg="bg-primary/10"
            description="The OAuth migration introduced significant changes across 17 files in 6 services. This led to a spike in rollback commits and error rate between Mar 01 - Mar 08."
          />
          <InsightCard 
            title="Redis Integration Boost" 
            badgeText="Positive" badgeColor="text-blue-400 border-blue-400/30 bg-blue-400/10" 
            icon={Users} iconBg="bg-blue-400/10"
            description="Redis integration (Mar 03) improved session management performance. Response time improved by 23% in the following weeks."
          />
          <InsightCard 
            title="Architecture Evolution" 
            badgeText="Structural" badgeColor="text-safe border-safe/30 bg-safe/10" 
            icon={CheckCircle} iconBg="bg-safe/10"
            description="System evolved from a monolith-like structure to a more modular architecture with clear service boundaries."
          />
          <InsightCard 
            title="Testing Gap Detected" 
            badgeText="Medium Risk" badgeColor="text-accent border-accent/30 bg-accent/10" 
            icon={AlertTriangle} iconBg="bg-accent/10"
            description="Several high-impact changes were merged with low test coverage. Consider adding tests for critical services."
          />
        </div>
      </GlassCard>

      <div className="grid grid-cols-3 gap-6">
        {/* Activity Over Time */}
        <GlassCard className="col-span-1 p-5 min-h-[300px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-sm font-semibold text-white">Activity Over Time</h3>
             <div className="flex gap-4 text-[10px] text-gray-400">
               <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary"></div> Commits</div>
               <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-400"></div> PRs Merged</div>
             </div>
          </div>
          <div className="flex-1 w-full h-full -ml-4">
            {loading ? (
              <div className="flex-1 flex items-center justify-center h-full">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d2d3a" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2d2d3a', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#e5e7eb' }}
                />
                <Line type="monotone" dataKey="commits" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3, fill: '#8b5cf6', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="prs" stroke="#60a5fa" strokeWidth={2} dot={{ r: 3, fill: '#60a5fa', strokeWidth: 0 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
            )}
          </div>
        </GlassCard>

        {/* Top Change Hotspots */}
        <GlassCard className="col-span-1 p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-sm font-semibold text-white">Top Change Hotspots</h3>
            <div className="w-3.5 h-3.5 rounded-full border border-gray-500 text-gray-400 flex items-center justify-center text-[8px]">?</div>
          </div>
          <div className="flex flex-col gap-4 flex-1">
            {[
              { path: 'src/services/auth', count: 642, color: 'bg-primary', pct: '80%' },
              { path: 'src/config', count: 412, color: 'bg-blue-500', pct: '50%' },
              { path: 'src/middleware', count: 287, color: 'bg-gray-400', pct: '35%' },
              { path: 'src/routes', count: 231, color: 'bg-gray-500', pct: '28%' },
              { path: 'src/utils', count: 176, color: 'bg-gray-600', pct: '20%' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500 w-3">{i+1}</span>
                <span className="text-xs text-gray-300 w-32 truncate">{item.path}</span>
                <div className="flex-1 h-1.5 bg-panel rounded-full overflow-hidden">
                  <div className={cn("h-full", item.color)} style={{ width: item.pct }}></div>
                </div>
                <span className="text-[10px] text-gray-500 w-16 text-right">{item.count} changes</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border/50">
            <span className="text-primary text-xs hover:underline cursor-pointer">View all hotspots &rarr;</span>
          </div>
        </GlassCard>

        {/* Change Type Distribution */}
        <GlassCard className="col-span-1 p-5 flex flex-col">
          <h3 className="text-sm font-semibold text-white mb-2">Change Type Distribution</h3>
          <p className="text-[10px] text-gray-500 mb-4">By lines of code</p>
          <div className="flex items-center flex-1">
             {loading ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
             ) : (
             <>
               <div className="w-1/2 h-[140px] relative">
                 <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie
                       data={distributionData}
                       cx="50%" cy="50%"
                       innerRadius={45} outerRadius={60}
                       paddingAngle={2}
                       dataKey="value"
                       stroke="none"
                     >
                       {distributionData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                     </Pie>
                   </PieChart>
                 </ResponsiveContainer>
                 {/* Center text */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                   <span className="text-sm font-bold text-white">45,231</span>
                   <span className="text-[8px] text-gray-400">Total Changes</span>
                 </div>
               </div>
               <div className="w-1/2 flex flex-col gap-2 pl-4">
                  {distributionData.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px]">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }}></div>
                        <span className="text-gray-300">{item.name}</span>
                      </div>
                      <span className="text-gray-400">{item.value}%</span>
                    </div>
                  ))}
               </div>
             </>
             )}
          </div>
          <div className="mt-4 pt-4 border-t border-border/50">
            <span className="text-primary text-xs hover:underline cursor-pointer">View detailed breakdown &rarr;</span>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Most Impactful Commits */}
        <GlassCard className="col-span-2 p-5 flex flex-col">
          <h3 className="text-sm font-semibold text-white mb-4">Most Impactful Commits</h3>
          <div className="w-full overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/50 text-[10px] text-gray-500">
                  <th className="pb-3 font-medium">Commit</th>
                  <th className="pb-3 font-medium">Message</th>
                  <th className="pb-3 font-medium">Author</th>
                  <th className="pb-3 font-medium">Impact</th>
                  <th className="pb-3 font-medium">Files Changed</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="text-xs text-gray-300">
                {loading ? (
                  <tr><td colSpan="6" className="text-center py-8"><div className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></td></tr>
                ) : (
                  commitData.map((commit, i) => (
                    <tr key={i} className="border-b border-border/20 last:border-0 hover:bg-white/5 transition-colors cursor-pointer">
                      <td className="py-3 font-mono text-gray-400">{commit.hash}</td>
                      <td className="py-3 pr-4 truncate max-w-[200px]">{commit.msg}</td>
                      <td className="py-3 flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center text-[8px] text-white">
                          {commit.author.charAt(0).toUpperCase()}
                        </div>
                        {commit.author}
                      </td>
                      <td className="py-3">
                        <span className={cn("px-2 py-0.5 rounded text-[10px] font-medium", commit.impactColor)}>
                          {commit.impact}
                        </span>
                      </td>
                      <td className="py-3">{commit.files}</td>
                      <td className="py-3 text-gray-500">{commit.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 pt-4 border-t border-border/50">
            <span className="text-primary text-xs hover:underline cursor-pointer">View all impactful commits &rarr;</span>
          </div>
        </GlassCard>

        {/* Team Activity */}
        <GlassCard className="col-span-1 p-5 flex flex-col">
          <h3 className="text-sm font-semibold text-white mb-1">Team Activity</h3>
          <p className="text-[10px] text-gray-500 mb-6">By commits</p>
          
          <div className="flex flex-col gap-4 flex-1">
            {[
              { name: 'jane.doe', count: 412, pctStr: '33%', color: 'bg-primary', pct: '100%' },
              { name: 'john.smith', count: 298, pctStr: '24%', color: 'bg-blue-400', pct: '70%' },
              { name: 'alex.wong', count: 186, pctStr: '15%', color: 'bg-safe', pct: '45%' },
              { name: 'maria.garcia', count: 142, pctStr: '11%', color: 'bg-gray-400', pct: '30%' },
              { name: 'others', count: 208, pctStr: '17%', color: 'bg-gray-600', pct: '40%' }
            ].map((member, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-gray-300 w-20 truncate">{member.name}</span>
                <div className="flex-1 h-1.5 bg-panel rounded-full overflow-hidden">
                  <div className={cn("h-full", member.color)} style={{ width: member.pct }}></div>
                </div>
                <div className="w-16 text-right flex flex-col">
                  <span className="text-xs text-gray-300">{member.count}</span>
                  <span className="text-[9px] text-gray-500">({member.pctStr})</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-border/50">
            <span className="text-primary text-xs hover:underline cursor-pointer">View all contributors &rarr;</span>
          </div>
        </GlassCard>
      </div>

    </div>
  );
}
