import React, { useState, useEffect } from 'react';
import EvolutionGraph from '../components/explorer/EvolutionGraph';
import GlassCard from '../components/shared/GlassCard';
import { GitBranch, GitCommit, GitPullRequest, FileCode } from 'lucide-react';
import { cn } from '../utils/cn';
import { getTimelineEvents } from '../services/api';

const mockEvents = [
  {
    id: 1,
    date: "Apr 18, 2024",
    title: "OAuth Migration",
    description: "Introduced OAuth2 integration and removed legacy token system.",
    type: "Important Event",
    badge: "Important",
    color: "bg-accent",
    branch: "main",
    commitsCount: 8,
    prsCount: 2,
    prs: ["#142", "#143"],
    filesCount: 12,
    files: ["src/auth/oauth.ts", "src/middleware/auth.ts", "src/config/oauth.config.ts"],
    summary: "This change modernized the authentication flow by introducing OAuth2. The legacy token-based system was deprecated."
  },
  {
    id: 2,
    date: "Apr 05, 2024",
    title: "Merge pull request #156",
    description: "Merged auth-rewrite into main",
    type: "Merge",
    badge: "Merge",
    color: "bg-primary",
    branch: "main",
    commitsCount: 14,
    prsCount: 1,
    prs: ["#156"],
    filesCount: 24,
    files: ["src/auth/index.ts", "src/controllers/auth.ts"],
    summary: "Merged the comprehensive auth-rewrite feature branch which fixes several security vulnerabilities."
  },
  {
    id: 3,
    date: "Mar 28, 2024",
    title: "Fix: handle token refresh failure",
    description: "Resolved edge case in token refresh logic",
    type: "Commit",
    badge: "Commit",
    color: "bg-safe",
    branch: "auth-rewrite",
    commitsCount: 1,
    prsCount: 0,
    prs: [],
    filesCount: 2,
    files: ["src/services/token.ts", "tests/token.test.ts"],
    summary: "Fixed a bug where token refresh would fail under high load, causing users to be logged out unexpectedly."
  },
  {
    id: 4,
    date: "Mar 15, 2024",
    title: "Rollback Spike",
    description: "7 rollback commits detected between Mar 10 - Mar 15",
    type: "High Risk",
    badge: "High Risk",
    color: "bg-risk",
    branch: "auth-rewrite",
    commitsCount: 7,
    prsCount: 0,
    prs: [],
    filesCount: 5,
    files: ["src/config/redis.ts", "docker-compose.yml"],
    summary: "Multiple rollbacks occurred due to unstable Redis connection logic introduced in the redis-integration branch."
  },
  {
    id: 5,
    date: "Mar 03, 2024",
    title: "Redis Integration",
    description: "Integrated Redis for session storage and caching",
    type: "Important Event",
    badge: "Important",
    color: "bg-accent",
    branch: "redis-integration",
    commitsCount: 12,
    prsCount: 1,
    prs: ["#112"],
    filesCount: 8,
    files: ["src/services/session/redisStore.ts", "src/config/redis.ts"],
    summary: "Initial integration of Redis to replace the in-memory session store, improving scalability across instances."
  }
];

const Timeline = ({ searchQuery }) => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsRes = await getTimelineEvents();
        setEvents(eventsRes);
        if (eventsRes.length > 0) setSelectedEventId(eventsRes[0].id);
      } catch (err) {
        console.warn("Backend not connected, using mock data in Timeline");
        setEvents(mockEvents);
        if (mockEvents.length > 0) setSelectedEventId(mockEvents[0].id);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredEvents = events.filter(ev => {
    if (activeTab === 'all') return true;
    if (activeTab === 'commits') return ev.badge === 'Commit' || ev.badge === 'High Risk' || ev.badge === 'Important';
    if (activeTab === 'prs') return ev.badge === 'Merge';
    return true;
  });

  const selectedEvent = events.find(e => e.id === selectedEventId);

  return (
    <div className="p-6 max-w-7xl mx-auto pb-32">
      <EvolutionGraph isSearchActive={searchQuery.length > 0} />

      <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-xl font-semibold text-white mb-4">Timeline Events</h2>
        
        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-border pb-2 mb-6 text-sm">
          <button 
            className={cn("pb-2 font-medium transition-colors", activeTab === 'all' ? "text-primary border-b-2 border-primary" : "text-gray-400 hover:text-gray-200")}
            onClick={() => { setActiveTab('all'); if (events.length > 0) setSelectedEventId(events[0].id); }}
          >
            All Events ({events.length})
          </button>
          <button 
            className={cn("pb-2 font-medium transition-colors", activeTab === 'commits' ? "text-primary border-b-2 border-primary" : "text-gray-400 hover:text-gray-200")}
            onClick={() => { setActiveTab('commits'); }}
          >
            Commits
          </button>
          <button 
            className={cn("pb-2 font-medium transition-colors", activeTab === 'prs' ? "text-primary border-b-2 border-primary" : "text-gray-400 hover:text-gray-200")}
            onClick={() => { setActiveTab('prs'); }}
          >
            Pull Requests
          </button>
        </div>

        <div className="flex gap-6 h-[500px]">
          {/* Left Column: Event List */}
          <GlassCard className="flex-1 overflow-y-auto hide-scrollbar p-0 border-border/50 flex flex-col">
             {loading ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
             ) : (
             <div className="flex flex-col flex-1">
                {filteredEvents.map((ev, index) => {
                  const isActive = ev.id === selectedEventId;
                  const isLast = index === filteredEvents.length - 1;

                  return (
                    <div 
                      key={ev.id} 
                      className={cn(
                        "flex cursor-pointer transition-colors hover:bg-white/5",
                        isActive ? "bg-white/5 relative" : ""
                      )}
                      onClick={() => setSelectedEventId(ev.id)}
                    >
                      {isActive && <div className="absolute left-0 top-0 w-1 h-full bg-primary shadow-neon"></div>}
                      
                      {/* Timeline Line & Dot */}
                      <div className="flex flex-col items-center w-12 pt-5 relative">
                        <div className={cn("w-2.5 h-2.5 rounded-full z-10 shadow-neon", ev.color)}></div>
                        {!isLast && <div className="w-[1px] bg-border flex-1 mt-2"></div>}
                      </div>
                      
                      {/* Event Content */}
                      <div className="flex-1 py-4 pr-4 border-b border-border/30">
                        <div className="flex justify-between items-start mb-1">
                           <div className="flex gap-4 items-center text-sm">
                             <span className={cn("font-mono text-xs", isActive ? "text-primary" : "text-gray-400")}>{ev.date}</span>
                             <span className={cn("font-medium", isActive ? "text-white" : "text-gray-200")}>{ev.title}</span>
                           </div>
                           <span className={cn(
                             "text-[10px] px-2 py-0.5 rounded border uppercase tracking-wider font-semibold",
                             ev.badge === 'Important' ? "text-accent border-accent/30 bg-accent/10" :
                             ev.badge === 'Merge' ? "text-primary border-primary/30 bg-primary/10" :
                             ev.badge === 'High Risk' ? "text-risk border-risk/30 bg-risk/10" :
                             "text-safe border-safe/30 bg-safe/10"
                           )}>
                             {ev.badge}
                           </span>
                        </div>
                        <p className="text-xs text-gray-500 pl-[85px]">{ev.description}</p>
                      </div>
                    </div>
                  );
                })}
             </div>
             )}
             <div className="p-4 border-t border-border/30 mt-auto">
                <span className="text-primary text-sm hover:underline cursor-pointer flex items-center gap-1">View all events &rarr;</span>
             </div>
          </GlassCard>

          {/* Right Column: Event Details */}
          <GlassCard className="flex-[1.2] flex flex-col gap-6 overflow-y-auto hide-scrollbar border-border/50 p-6">
             {loading ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
             ) : selectedEvent ? (
                <div key={selectedEvent.id} className="animate-in fade-in duration-300">
                   <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                           <div className={cn("w-2.5 h-2.5 rounded-full shadow-neon", selectedEvent.color)}></div>
                           <h3 className="text-lg font-semibold text-white">{selectedEvent.title}</h3>
                           <span className={cn(
                             "text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-semibold flex items-center gap-1",
                             selectedEvent.badge === 'Important' ? "text-accent" :
                             selectedEvent.badge === 'Merge' ? "text-primary" :
                             selectedEvent.badge === 'High Risk' ? "text-risk" :
                             "text-safe"
                           )}>
                             ✦ {selectedEvent.type}
                           </span>
                        </div>
                        <p className="text-sm text-gray-400">{selectedEvent.description}</p>
                      </div>
                      <span className="text-xs text-gray-500 font-mono flex items-center gap-1">{selectedEvent.date} &nearr;</span>
                   </div>

                   <div className="grid grid-cols-4 gap-4 mt-6 border-y border-border/50 py-4">
                      <div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mb-1"><GitBranch className="w-3 h-3"/> Branch</div>
                        <div className="text-sm text-gray-200 bg-primary/20 text-primary px-2 py-0.5 rounded w-max font-medium">{selectedEvent.branch}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mb-1"><GitCommit className="w-3 h-3"/> Commits</div>
                        <div className="text-sm text-gray-200">{selectedEvent.commitsCount} commits</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mb-1"><GitPullRequest className="w-3 h-3"/> Pull Requests</div>
                        <div className="text-sm text-gray-200">{selectedEvent.prs.length > 0 ? selectedEvent.prs.join(", ") : "None"}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mb-1"><FileCode className="w-3 h-3"/> Files Changed</div>
                        <div className="text-sm text-gray-200">{selectedEvent.filesCount} files</div>
                      </div>
                   </div>

                   <div className="mt-6">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Summary</h4>
                      <div className="bg-panel border border-border/50 rounded-lg p-4 text-sm text-gray-400 leading-relaxed">
                         {selectedEvent.summary}
                      </div>
                   </div>

                   <div className="mt-6">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Files Changed ({selectedEvent.filesCount})</h4>
                      <div className="flex flex-wrap gap-2">
                         {(selectedEvent.files || []).map(file => (
                            <span key={file} className="bg-panel border border-border rounded px-3 py-1.5 text-xs text-gray-400 hover:text-gray-200 transition-colors cursor-pointer flex items-center gap-2 group">
                               <FileCode className="w-3 h-3 group-hover:text-primary transition-colors" /> {file}
                            </span>
                         ))}
                         {selectedEvent.filesCount > (selectedEvent.files || []).length && (
                            <span className="text-xs text-gray-500 flex items-center px-2">+ {selectedEvent.filesCount - selectedEvent.files.length} more</span>
                         )}
                      </div>
                   </div>

                   {selectedEvent.prs.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-sm font-semibold text-gray-300 mb-2">Related Pull Requests ({selectedEvent.prsCount})</h4>
                        <div className="flex gap-2">
                           {selectedEvent.prs.map(pr => (
                              <span key={pr} className="bg-panel border border-border rounded px-3 py-1.5 text-xs text-gray-400 hover:text-gray-200 transition-colors cursor-pointer flex items-center gap-2 group">
                                 <GitPullRequest className="w-3 h-3 group-hover:text-primary transition-colors" /> {pr} Update integration
                              </span>
                           ))}
                        </div>
                      </div>
                   )}
                </div>
             ) : null}
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
