import React, { useState, useEffect } from 'react';
import { getAgents, getAgentActivity } from '../services/api';
import AgentCard from '../components/agents/AgentCard';
import AgentOrchestration from '../components/agents/AgentOrchestration';
import AgentActivityTable from '../components/agents/AgentActivityTable';
import AgentDetails from '../components/agents/AgentDetails';

export default function Agents() {
  const [agentsData, setAgentsData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [agentsRes, activityRes] = await Promise.all([
          getAgents(),
          getAgentActivity()
        ]);
        setAgentsData(agentsRes);
        setActivityData(activityRes);
        if (agentsRes.length > 0) setSelectedAgent(agentsRes[0]);
      } catch (err) {
        console.error("Failed to fetch agent data:", err);
        setError("Unable to load agents. Please check your simulated API connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-[calc(100vh-100px)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-gray-400 animate-pulse">Initializing Multi-Agent System...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center h-[calc(100vh-100px)]">
        <div className="bg-risk/10 border border-risk/30 rounded-lg p-6 max-w-md text-center">
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
        <h2 className="text-2xl font-bold text-white mb-1">Agents</h2>
        <p className="text-sm text-gray-400">AI agents working together to analyze, understand, and surface intelligence from your repository.</p>
      </div>

      {/* Active Agents Horizontal Scroll */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-white">Active Agents</h3>
          <span className="text-xs text-primary cursor-pointer hover:underline">View all agents &rarr;</span>
        </div>
        {agentsData.length === 0 ? (
          <div className="text-sm text-gray-500 py-8 text-center bg-panel/30 border border-border/50 rounded-lg">
            No agents currently available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
            {agentsData.map((agent) => (
              <AgentCard 
                key={agent.id}
                agent={agent}
                isSelected={selectedAgent?.id === agent.id}
                onClick={() => setSelectedAgent(agent)}
              />
            ))}
          </div>
        )}
      </div>

      <AgentOrchestration />
      
      <AgentActivityTable activityData={activityData} agentsData={agentsData} />
      
      <AgentDetails 
        agentsData={agentsData} 
        selectedAgent={selectedAgent} 
        setSelectedAgent={setSelectedAgent} 
      />

    </div>
  );
}
