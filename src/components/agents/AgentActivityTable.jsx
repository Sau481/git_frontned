import React from 'react';
import GlassCard from '../shared/GlassCard';
import { cn } from '../../utils/cn';
import { iconMap } from './iconMap';
import { ChevronRight, Bot } from 'lucide-react';

export default function AgentActivityTable({ activityData, agentsData }) {
  return (
    <GlassCard className="p-6">
      <h3 className="text-sm font-semibold text-white mb-6">Recent Agent Activity</h3>
      {activityData.length === 0 ? (
        <div className="text-sm text-gray-500 py-4 text-center">No recent activity.</div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 text-[10px] text-gray-500 uppercase tracking-wider">
                <th className="pb-3 font-medium">Agent</th>
                <th className="pb-3 font-medium">Task</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Started At</th>
                <th className="pb-3 font-medium">Duration</th>
                <th className="pb-3 font-medium">Results</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody className="text-xs text-gray-300">
              {activityData.map((activity, i) => {
                const agent = agentsData.find(a => a.id === activity.agentId);
                const Icon = agent ? (iconMap[agent.iconName] || Bot) : Bot;
                return (
                  <tr key={i} className="border-b border-border/20 last:border-0 hover:bg-white/5 transition-colors cursor-pointer group">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Icon className={cn("w-4 h-4", agent?.color || 'text-gray-400')} />
                        <span className="font-medium text-gray-200">{agent?.name || 'Unknown Agent'}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 truncate max-w-[200px]">{activity.task}</td>
                    <td className="py-3">
                      <span className={cn("px-2 py-0.5 rounded text-[10px] font-medium", activity.statusColor)}>
                        {activity.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500">{activity.start}</td>
                    <td className="py-3 text-gray-500">{activity.duration}</td>
                    <td className="py-3 text-gray-400">{activity.results}</td>
                    <td className="py-3 text-right">
                      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors ml-auto" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-4 pt-4 border-t border-border/50">
        <span className="text-primary text-xs hover:underline cursor-pointer">View full activity log &rarr;</span>
      </div>
    </GlassCard>
  );
}
