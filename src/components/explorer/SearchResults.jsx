import React from 'react';
import GlassCard from '../shared/GlassCard';
import { GitCommit, FileCode, GitBranch, Activity } from 'lucide-react';

const SearchResults = ({ query }) => {
  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-500 mt-2">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Search results for "{query}"</h2>
          <p className="text-sm text-gray-400">24 semantic matches across commits, files, branches, PRs, and events</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Sort by: Relevance</span>
        </div>
      </div>

      <div className="flex items-center gap-6 border-b border-border pb-2 mb-2 text-sm mt-2">
        <button className="text-primary border-b-2 border-primary pb-2 font-medium">All (24)</button>
        <button className="text-gray-400 hover:text-gray-200 pb-2 transition-colors">Commits (12)</button>
        <button className="text-gray-400 hover:text-gray-200 pb-2 transition-colors">Files (6)</button>
        <button className="text-gray-400 hover:text-gray-200 pb-2 transition-colors">Branches (3)</button>
        <button className="text-gray-400 hover:text-gray-200 pb-2 transition-colors">PRs (2)</button>
        <button className="text-gray-400 hover:text-gray-200 pb-2 transition-colors">Events (1)</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="flex flex-col gap-4 border-primary/20 hoverEffect">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-white flex items-center gap-2"><GitCommit className="w-4 h-4 text-primary" /> Commits (12)</h3>
            <span className="text-xs text-primary cursor-pointer hover:underline">View all</span>
          </div>
          <div className="flex flex-col gap-4">
             <div className="flex items-start justify-between group cursor-pointer border-b border-border/50 pb-3">
                <div>
                   <p className="text-sm text-gray-200 group-hover:text-primary transition-colors">feat: integrate redis for session store</p>
                   <p className="text-xs text-gray-500 mt-1">a1b2c3d • Mar 03, 2024 • auth-rewrite</p>
                </div>
                <div className="text-xs font-mono"><span className="text-safe">+142</span> <span className="text-risk">-12</span></div>
             </div>
             <div className="flex items-start justify-between group cursor-pointer border-b border-border/50 pb-3">
                <div>
                   <p className="text-sm text-gray-200 group-hover:text-primary transition-colors">fix: handle redis connection leak</p>
                   <p className="text-xs text-gray-500 mt-1">p3q4r5s • Apr 01, 2024 • auth-rewrite</p>
                </div>
                <div className="text-xs font-mono"><span className="text-safe">+58</span> <span className="text-risk">-8</span></div>
             </div>
             <div className="flex items-start justify-between group cursor-pointer">
                <div>
                   <p className="text-sm text-gray-200 group-hover:text-primary transition-colors">refactor: redis client abstraction</p>
                   <p className="text-xs text-gray-500 mt-1">x9y0z1a • Mar 27, 2024 • main</p>
                </div>
                <div className="text-xs font-mono"><span className="text-safe">+23</span> <span className="text-risk">-3</span></div>
             </div>
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col gap-4 hoverEffect">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-white flex items-center gap-2"><FileCode className="w-4 h-4 text-secondary" /> Files (6)</h3>
            <span className="text-xs text-primary cursor-pointer hover:underline">View all</span>
          </div>
          <div className="flex flex-col gap-4">
             <div className="flex items-start justify-between group cursor-pointer border-b border-border/50 pb-3">
                <div className="flex gap-2">
                   <FileCode className="w-4 h-4 text-gray-400 mt-0.5" />
                   <div>
                     <p className="text-sm text-gray-200 group-hover:text-secondary transition-colors">src/config/redis.ts</p>
                     <p className="text-xs text-gray-500 mt-1">Modified Mar 03, 2024</p>
                   </div>
                </div>
             </div>
             <div className="flex items-start justify-between group cursor-pointer border-b border-border/50 pb-3">
                <div className="flex gap-2">
                   <FileCode className="w-4 h-4 text-gray-400 mt-0.5" />
                   <div>
                     <p className="text-sm text-gray-200 group-hover:text-secondary transition-colors">src/services/session/redisStore.ts</p>
                     <p className="text-xs text-gray-500 mt-1">Modified Mar 05, 2024</p>
                   </div>
                </div>
             </div>
             <div className="flex items-start justify-between group cursor-pointer">
                <div className="flex gap-2">
                   <FileCode className="w-4 h-4 text-gray-400 mt-0.5" />
                   <div>
                     <p className="text-sm text-gray-200 group-hover:text-secondary transition-colors">src/middleware/redisClient.ts</p>
                     <p className="text-xs text-gray-500 mt-1">Modified Mar 12, 2024</p>
                   </div>
                </div>
             </div>
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col gap-4 hoverEffect">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-white flex items-center gap-2"><GitBranch className="w-4 h-4 text-accent" /> Branches (3)</h3>
            <span className="text-xs text-primary cursor-pointer hover:underline">View all</span>
          </div>
          <div className="flex flex-col gap-4">
             <div className="flex items-start justify-between group cursor-pointer border-b border-border/50 pb-3">
                <div className="flex gap-2">
                   <GitBranch className="w-4 h-4 text-gray-400 mt-0.5" />
                   <div>
                     <p className="text-sm text-gray-200 group-hover:text-accent transition-colors">redis-integration</p>
                     <p className="text-xs text-gray-500 mt-1">Integrated redis for session management</p>
                   </div>
                </div>
                <span className="text-xs text-gray-500">Mar 03, 2024</span>
             </div>
             <div className="flex items-start justify-between group cursor-pointer border-b border-border/50 pb-3">
                <div className="flex gap-2">
                   <GitBranch className="w-4 h-4 text-gray-400 mt-0.5" />
                   <div>
                     <p className="text-sm text-gray-200 group-hover:text-accent transition-colors">fix/redis-timeout</p>
                     <p className="text-xs text-gray-500 mt-1">Fix timeout issues in redis client</p>
                   </div>
                </div>
                <span className="text-xs text-gray-500">Mar 10, 2024</span>
             </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="mt-2 border-primary/30 bg-primary/5 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary shadow-[0_0_10px_#8b5cf6]"></div>
        <div className="flex gap-4">
           <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/50 text-primary flex-shrink-0 mt-1 shadow-neon">
              <Activity className="w-5 h-5" />
           </div>
           <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-3">
                 AI Investigation Summary
                 <span className="bg-primary/20 border border-primary/30 text-primary px-2 py-0.5 rounded text-[11px] uppercase tracking-wider font-bold">98% Confidence</span>
              </h3>
              <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                 Redis integration strongly correlates with authentication scalability improvements and rollback spikes during March 2024. The changes primarily affected <span className="text-primary font-medium">src/config</span> and <span className="text-primary font-medium">src/services/session</span>.
              </p>
           </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default SearchResults;
