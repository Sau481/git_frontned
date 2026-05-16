import React from 'react';
import GlassCard from '../shared/GlassCard';
import { cn } from '../../utils/cn';
import { iconMap } from './iconMap';
import { Bot } from 'lucide-react';

export default function AgentCard({ agent, isSelected, onClick }) {
  const Icon = iconMap[agent.iconName] || Bot;
  
  return (
    <GlassCard 
      onClick={onClick}
      className={cn(
        "p-4 flex flex-col gap-3 cursor-pointer transition-all h-full",
        isSelected ? `border-${(agent.color || 'text-primary').split('-')[1]} bg-panel` : "hover:border-gray-500"
      )}
    >
      <div className="flex gap-3 items-start">
        <div className={cn("p-2 rounded-lg", agent.bg)}>
          <Icon className={cn("w-5 h-5", agent.color)} />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-white">{agent.name}</h4>
          <p className="text-[10px] text-gray-500">{agent.role}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-1.5 mt-2">
        <div className="w-1.5 h-1.5 rounded-full bg-safe animate-pulse"></div>
        <span className="text-[10px] text-safe">Active</span>
      </div>

      <p className="text-[10px] text-gray-400 leading-relaxed min-h-[48px] mt-2">{agent.description}</p>
      
      <div className="flex justify-between mt-auto pt-3 border-t border-border/50">
        {(agent.metrics || []).map((metric, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-[9px] text-gray-500">{metric.label}</span>
            <span className="text-xs font-semibold text-gray-200">{metric.value}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
