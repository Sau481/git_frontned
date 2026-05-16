import React from 'react';
import GlassCard from '../shared/GlassCard';
import { cn } from '../../utils/cn';
import { iconMap } from './iconMap';
import { Check, Database, Bot } from 'lucide-react';

export default function AgentDetails({ agentsData, selectedAgent, setSelectedAgent }) {
  if (!agentsData || agentsData.length === 0 || !selectedAgent) return null;

  const SelectedIcon = iconMap[selectedAgent.iconName] || Bot;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Agent List Section */}
      <GlassCard className="flex flex-col h-full border-border/50 col-span-1 p-5">
        <h3 className="text-sm font-semibold text-white mb-2">Agent Details</h3>
        <p className="text-[10px] text-gray-500 mb-4">Select an agent to view details</p>
        <div className="flex flex-col gap-1">
          {agentsData.map((agent) => {
            const ListIcon = iconMap[agent.iconName] || Bot;
            return (
            <div 
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              className={cn(
                "flex items-center justify-between p-2 rounded cursor-pointer transition-colors",
                selectedAgent.id === agent.id ? "bg-white/5" : "hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn("p-1.5 rounded-md", agent.bg)}>
                  <ListIcon className={cn("w-3.5 h-3.5", agent.color)} />
                </div>
                <span className="text-xs text-gray-200 font-medium">{agent.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-safe"></div>
                <span className="text-[10px] text-safe">Active</span>
              </div>
            </div>
          )})}
        </div>
      </GlassCard>

      {/* Selected Agent Details Section */}
      <GlassCard className="flex flex-col h-full border-border/50 col-span-1 lg:col-span-2 p-6 bg-panel/30">
        <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-6">Selected Agent Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-start gap-4 mb-6">
              <div className={cn("p-3 rounded-xl border", selectedAgent.bg, (selectedAgent.border || '').replace('border-', 'border-').split('-')[0] + '-' + (selectedAgent.color || '').split('-')[1] + '/30')}>
                <SelectedIcon className={cn("w-8 h-8", selectedAgent.color)} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">{selectedAgent.name}</h4>
                <p className="text-xs text-gray-400 mt-1">{selectedAgent.role}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="w-2 h-2 rounded-full bg-safe animate-pulse"></div>
                  <span className="text-xs text-safe font-medium">Active & Ready</span>
                </div>
              </div>
            </div>

            <h3 className="text-sm font-semibold text-white mb-3">Capabilities</h3>
            <div className="flex flex-col gap-3">
              {(selectedAgent.capabilities || ['Task execution', 'Data analysis', 'Pattern matching']).map((cap, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-safe flex-shrink-0" />
                  <span className="text-xs text-gray-300">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-white mb-4">Data Sources</h3>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {(selectedAgent.dataSources || ['Git Commits', 'Pull Requests', 'Code Changes', 'Branch History']).map((source, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-gray-300 bg-panel border border-border/50 p-2 rounded">
                   <Database className="w-4 h-4 text-gray-500" /> {source}
                </div>
              ))}
            </div>

            <h3 className="text-sm font-semibold text-white mb-3">Today's Performance</h3>
            <div className="flex justify-between items-end mt-auto bg-panel/50 p-4 rounded-lg border border-border/30">
               {(selectedAgent.metrics || []).map((metric, idx) => (
                 <div key={idx} className="flex flex-col items-center">
                   <span className="text-xl font-bold text-white mb-1">{metric.value}</span>
                   <span className="text-[10px] text-gray-500 uppercase tracking-wider">{metric.label}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
