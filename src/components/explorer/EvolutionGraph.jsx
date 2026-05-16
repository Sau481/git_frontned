import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Maximize, ZoomIn, ZoomOut, AlertTriangle } from 'lucide-react';
import GlassCard from '../shared/GlassCard';
import { getRepositoryGraph } from '../../services/api';

const EvolutionGraph = ({ isSearchActive }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRepositoryGraph();
        setNodes(data.nodes || []);
        setEdges(data.edges || []);
      } catch (err) {
        console.error("Failed to fetch graph data:", err);
        setError("Unable to load repository graph.");
      } finally {
        setLoading(false);
      }
    };
    fetchGraph();
  }, [setNodes, setEdges]);

  // When search is active, highlight specific nodes
  const highlightNodes = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (!isSearchActive) {
          return { ...node, style: { ...node.style, opacity: 1, filter: 'none' } };
        }
        
        // Highlight nodes near Redis Integration and High Risk for 'redis' search
        const isMatch = node.id === '3' || node.id === 'm6' || node.id === 'hr_1' || node.id === 'hr_2' || node.id === 'f1_4';
        return {
          ...node,
          style: {
            ...node.style,
            opacity: isMatch ? 1 : 0.2,
            filter: isMatch ? 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.8))' : 'none',
          },
        };
      })
    );
    
    setEdges((eds) => 
      eds.map((edge) => {
         if (!isSearchActive) {
            return { ...edge, style: { ...edge.style, opacity: 1 } };
         }
         const isMatch = edge.target === 'm6' || edge.source === 'hr_1' || edge.target === 'hr_1' || edge.target === 'hr_2';
         return {
            ...edge,
            style: { ...edge.style, opacity: isMatch ? 1 : 0.2 }
         };
      })
    );
  }, [isSearchActive, setNodes, setEdges]);

  React.useEffect(() => {
    highlightNodes();
  }, [isSearchActive, highlightNodes]);

  return (
    <GlassCard className="w-full h-[450px] mb-6 relative overflow-hidden p-0 border-border/50">
      <div className="absolute top-4 left-6 z-10">
        <h2 className="text-xl font-semibold text-white">Repository Evolution</h2>
        <p className="text-sm text-gray-400">Visualize and explore the evolution of this repository</p>
      </div>

      <div className="absolute top-4 right-6 z-10 flex items-center gap-4">
        <div className="flex items-center gap-3 mr-4 text-xs">
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Main Branch</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div> Feature Branch</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div> Merge Commit</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div> Important Event</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> High Risk</div>
        </div>
        
        <div className="bg-panel border border-border rounded-lg flex items-center p-1">
          <div className="px-3 border-r border-border text-sm text-gray-300">Fit</div>
          <button className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-white/10 transition-colors"><ZoomOut className="w-4 h-4" /></button>
          <button className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-white/10 transition-colors"><ZoomIn className="w-4 h-4" /></button>
          <button className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-white/10 transition-colors"><Maximize className="w-4 h-4" /></button>
        </div>
      </div>

      {isSearchActive && (
         <div className="absolute top-[210px] left-[600px] z-20 bg-panel border border-border p-3 rounded-lg shadow-neon-strong max-w-xs animate-in fade-in zoom-in duration-300">
            <h4 className="text-sm font-semibold text-white mb-1">Rollback Spike Detected</h4>
            <p className="text-xs text-gray-400 mb-2">Mar 10 - Mar 15<br/>7 rollback commits</p>
            <div className="w-full h-8 flex items-end gap-1">
               {[2, 4, 3, 7, 5, 2, 6].map((h, i) => (
                  <div key={i} className="flex-1 bg-risk/50 rounded-t" style={{ height: `${h * 10}%` }}></div>
               ))}
            </div>
         </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className="bg-transparent pointer-events-auto"
        nodesConnectable={false}
        nodesDraggable={false}
        elementsSelectable={false}
        panOnDrag={true}
        zoomOnScroll={true}
      >
      </ReactFlow>

      {/* Timeline Slider Mock */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 pointer-events-none">
         <div className="flex justify-between text-[11px] text-gray-400 font-medium mb-2 px-2">
           <span>Jan 2024</span>
           <span>Feb 2024</span>
           <span>Mar 2024</span>
           <span>Apr 2024</span>
           <span>May 2024</span>
         </div>
         <div className="h-1 bg-gray-800 rounded-full relative pointer-events-auto cursor-pointer">
           <div className="absolute left-1/4 right-1/4 h-full bg-primary/50 rounded-full shadow-neon"></div>
           <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
           <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
         </div>
      </div>
    </GlassCard>
  );
};

export default EvolutionGraph;
