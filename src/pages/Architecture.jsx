import React, { useState, useEffect } from 'react';
import GlassCard from '../components/shared/GlassCard';
import SystemOverview from '../components/architecture/SystemOverview';
import { GitPullRequest, GitMerge, LayoutGrid, Files, GitCommit, FileText, Database, Shield, Box, AlertTriangle } from 'lucide-react';
import { cn } from '../utils/cn';
import { getArchitectureMetrics, getArchitectureStack } from '../services/api';

const ArchitectureInsights = () => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-white mb-2">Architecture Insights</h3>
      
      <div className="flex gap-4 items-start">
        <div className="mt-1"><LayoutGrid className="w-4 h-4 text-primary" /></div>
        <div>
          <h4 className="text-xs font-semibold text-gray-200">Microservices Pattern</h4>
          <p className="text-xs text-gray-500 mt-1">The repository follows a microservices architecture with API Gateway pattern.</p>
        </div>
      </div>
      
      <div className="flex gap-4 items-start">
        <div className="mt-1"><Box className="w-4 h-4 text-secondary" /></div>
        <div>
          <h4 className="text-xs font-semibold text-gray-200">Service Count</h4>
          <p className="text-xs text-gray-500 mt-1">6 services identified with clear separation of concerns.</p>
        </div>
      </div>
      
      <div className="flex gap-4 items-start">
        <div className="mt-1"><Database className="w-4 h-4 text-safe" /></div>
        <div>
          <h4 className="text-xs font-semibold text-gray-200">Data Layer</h4>
          <p className="text-xs text-gray-500 mt-1">PostgreSQL for persistent storage, Redis for caching, S3 for file storage.</p>
        </div>
      </div>

      <div className="flex gap-4 items-start">
        <div className="mt-1"><GitPullRequest className="w-4 h-4 text-accent" /></div>
        <div>
          <h4 className="text-xs font-semibold text-gray-200">Recent Changes</h4>
          <p className="text-xs text-gray-500 mt-1">OAuth2 integration added to Auth Service on Apr 18, 2024.</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border/50">
        <span className="text-primary text-xs hover:underline cursor-pointer">View all insights &rarr;</span>
      </div>
    </div>
  );
};

const TechnologyStack = ({ stack, loading }) => {
  return (
    <div className="h-full flex flex-col">
      <h3 className="text-sm font-semibold text-white mb-1">Technology Stack</h3>
      <p className="text-xs text-gray-500 mb-4">Primary technologies used in this repository.</p>
      
      <div className="flex flex-col gap-3 flex-1">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          stack.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={cn("w-4 h-4 flex items-center justify-center rounded text-[10px] font-bold", item.iconClass)}>{item.short}</div>
              <span className="text-xs text-gray-300 w-20">{item.name}</span>
              <div className="flex-1 h-1.5 bg-panel rounded-full overflow-hidden">
                <div className={cn("h-full", item.barClass)} style={{ width: `${item.value}%` }}></div>
              </div>
              <span className="text-xs text-gray-400 w-10 text-right">{item.value}%</span>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-auto pt-4">
        <span className="text-primary text-xs hover:underline cursor-pointer">View full stack &rarr;</span>
      </div>
    </div>
  );
};

const ArchitectureEvolution = () => {
  return (
    <div className="h-full flex flex-col">
      <h3 className="text-sm font-semibold text-white mb-1">Architecture Evolution</h3>
      <p className="text-xs text-gray-500 mb-4">How the architecture has evolved over time.</p>
      
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex gap-3 relative">
          <div className="w-2 h-2 rounded-full bg-safe mt-1.5 z-10 relative"></div>
          <div className="absolute left-1 top-3 w-[1px] h-full bg-border -z-0"></div>
          <div>
            <div className="flex gap-3 text-xs">
              <span className="text-gray-400 w-20">Jan 05, 2024</span>
              <span className="text-gray-200 font-medium">Initial Setup</span>
            </div>
            <div className="text-[11px] text-gray-500 mt-0.5 ml-23">Monolith architecture</div>
          </div>
        </div>
        <div className="flex gap-3 relative">
          <div className="w-2 h-2 rounded-full bg-primary mt-1.5 z-10 relative"></div>
          <div className="absolute left-1 top-3 w-[1px] h-full bg-border -z-0"></div>
          <div>
            <div className="flex gap-3 text-xs">
              <span className="text-gray-400 w-20">Feb 12, 2024</span>
              <span className="text-gray-200 font-medium">Service Decomposition</span>
            </div>
            <div className="text-[11px] text-gray-500 mt-0.5 ml-23">Extracted Auth and User services</div>
          </div>
        </div>
        <div className="flex gap-3 relative">
          <div className="w-2 h-2 rounded-full bg-secondary mt-1.5 z-10 relative"></div>
          <div className="absolute left-1 top-3 w-[1px] h-full bg-border -z-0"></div>
          <div>
            <div className="flex gap-3 text-xs">
              <span className="text-gray-400 w-20">Mar 03, 2024</span>
              <span className="text-gray-200 font-medium">Redis Integration</span>
            </div>
            <div className="text-[11px] text-gray-500 mt-0.5 ml-23">Added Redis for caching</div>
          </div>
        </div>
        <div className="flex gap-3 relative">
          <div className="w-2 h-2 rounded-full bg-accent mt-1.5 z-10 relative"></div>
          <div>
            <div className="flex gap-3 text-xs">
              <span className="text-gray-400 w-20">Apr 18, 2024</span>
              <span className="text-gray-200 font-medium">OAuth2 Migration</span>
            </div>
            <div className="text-[11px] text-gray-500 mt-0.5 ml-23">Replaced legacy auth with OAuth2</div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto pt-4">
        <span className="text-primary text-xs hover:underline cursor-pointer">View full timeline &rarr;</span>
      </div>
    </div>
  );
};

const ComponentMetrics = ({ metrics, loading }) => {
  return (
    <div className="h-full flex flex-col">
      <h3 className="text-sm font-semibold text-white mb-1">Component Metrics</h3>
      <p className="text-xs text-gray-500 mb-4">Key metrics about the architecture.</p>
      
      <div className="grid grid-cols-2 gap-3 flex-1">
        {loading || !metrics ? (
          <div className="col-span-2 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="bg-panel/50 border border-border/50 rounded-lg p-3 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-white mb-1">{metrics.services}</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Services</span>
            </div>
            <div className="bg-panel/50 border border-border/50 rounded-lg p-3 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-white mb-1">{metrics.modules}</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Modules</span>
            </div>
            <div className="bg-panel/50 border border-border/50 rounded-lg p-3 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-white mb-1">{metrics.files}</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Files</span>
            </div>
            <div className="bg-panel/50 border border-border/50 rounded-lg p-3 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-white mb-1">{metrics.dependencies}</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Dependencies</span>
            </div>
          </>
        )}
      </div>
      
      <div className="mt-auto pt-4">
        <span className="text-primary text-xs hover:underline cursor-pointer">View all metrics &rarr;</span>
      </div>
    </div>
  );
};

export default function Architecture({ searchQuery }) {
  const [metrics, setMetrics] = useState(null);
  const [stack, setStack] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [metricsRes, stackRes] = await Promise.all([
          getArchitectureMetrics(),
          getArchitectureStack()
        ]);
        setMetrics(metricsRes);
        setStack(stackRes);
      } catch (err) {
        console.error("Failed to fetch architecture data:", err);
        setError("Unable to load architecture data. Please check your simulated API connection.");
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
    <div className="p-6 max-w-7xl mx-auto pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Architecture</h2>
        <p className="text-sm text-gray-400">Understand the structural design and evolution of the codebase.</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-border pb-2 mb-6 text-sm">
        <button className="text-primary border-b-2 border-primary pb-2 font-medium">System Overview</button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Main Graph Area */}
        <GlassCard className="col-span-3 h-[450px] p-0 overflow-hidden flex flex-col border-border/50">
          <div className="flex justify-between items-center p-4 border-b border-border/50 bg-panel/30">
             <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white">System Overview</h3>
                <div className="w-4 h-4 rounded-full border border-gray-500 text-gray-400 flex items-center justify-center text-[10px]">?</div>
             </div>
             <button className="text-xs bg-panel border border-border px-3 py-1.5 rounded hover:bg-white/5 transition-colors text-gray-300">View Legend</button>
          </div>
          <div className="flex-1 relative bg-[#0a0a0f]">
             <SystemOverview />
             <div className="absolute bottom-4 left-4 text-xs text-gray-500">Architecture as of Apr 30, 2024</div>
          </div>
        </GlassCard>

        {/* Insights Panel */}
        <GlassCard className="col-span-1 p-6 border-border/50 h-[450px] overflow-y-auto hide-scrollbar">
          <ArchitectureInsights />
        </GlassCard>

        {/* Bottom Widgets */}
        <GlassCard className="col-span-1 p-6 border-border/50 min-h-[250px]">
          <TechnologyStack stack={stack} loading={loading} />
        </GlassCard>

        <GlassCard className="col-span-2 p-6 border-border/50 min-h-[250px]">
          <ArchitectureEvolution />
        </GlassCard>

        <GlassCard className="col-span-1 p-6 border-border/50 min-h-[250px]">
          <ComponentMetrics metrics={metrics} loading={loading} />
        </GlassCard>
      </div>

    </div>
  );
}
