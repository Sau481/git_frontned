import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Maximize, ZoomIn, ZoomOut } from 'lucide-react';
import GlassCard from '../shared/GlassCard';

const initialNodes = [
  { id: '1', position: { x: 50, y: 100 }, data: { label: 'Initial Setup' }, style: { backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '10px', padding: '4px 8px' } },
  { id: '2', position: { x: 300, y: 100 }, data: { label: 'Auth Refactor' }, style: { backgroundColor: '#f59e0b', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '10px', padding: '4px 8px' } },
  { id: '3', position: { x: 550, y: 100 }, data: { label: 'Redis Integration' }, style: { backgroundColor: '#f59e0b', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '10px', padding: '4px 8px' } },
  { id: '4', position: { x: 800, y: 100 }, data: { label: 'OAuth Migration' }, style: { backgroundColor: '#f59e0b', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '10px', padding: '4px 8px' } },
  
  // Main Branch Nodes
  { id: 'm1', position: { x: 50, y: 150 }, data: { label: 'main' }, style: { backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '12px', padding: '2px 8px', fontSize: '12px' } },
  { id: 'm2', position: { x: 150, y: 150 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-blue-500 border-none' },
  { id: 'm3', position: { x: 250, y: 150 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-blue-500 border-none' },
  { id: 'm4', position: { x: 350, y: 150 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-blue-500 border-none' },
  { id: 'm5', position: { x: 450, y: 150 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-blue-500 border-none' },
  { id: 'm6', position: { x: 550, y: 150 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-blue-500 border-none' },
  { id: 'm7', position: { x: 650, y: 150 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-blue-500 border-none' },
  { id: 'm8', position: { x: 750, y: 150 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-blue-500 border-none' },
  { id: 'm9', position: { x: 850, y: 150 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-blue-500 border-none' },
  { id: 'm10', position: { x: 950, y: 150 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-blue-500 border-none' },

  // Feature Branch 1 (auth-rewrite)
  { id: 'f1_start', position: { x: 50, y: 220 }, data: { label: 'auth-rewrite' }, style: { backgroundColor: '#2d1b4e', color: '#a78bfa', border: '1px solid #8b5cf6', borderRadius: '12px', padding: '2px 8px', fontSize: '12px' } },
  { id: 'f1_1', position: { x: 200, y: 220 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-purple-500 border-none' },
  { id: 'f1_2', position: { x: 300, y: 220 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-purple-500 border-none' },
  { id: 'f1_3', position: { x: 400, y: 220 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-gray-400 border-none' }, // Merge
  { id: 'f1_4', position: { x: 500, y: 220 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-purple-500 border-none' },
  
  // High risk
  { id: 'hr_1', position: { x: 600, y: 220 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-red-500 border-none shadow-[0_0_15px_rgba(239,68,68,0.8)]' },
  { id: 'hr_2', position: { x: 650, y: 220 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-red-500 border-none shadow-[0_0_15px_rgba(239,68,68,0.8)]' },
  
  { id: 'f1_5', position: { x: 750, y: 220 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-gray-400 border-none' },

  // Feature Branch 2 (payment-fix)
  { id: 'f2_start', position: { x: 50, y: 280 }, data: { label: 'payment-fix' }, style: { backgroundColor: '#2d1b4e', color: '#a78bfa', border: '1px solid #8b5cf6', borderRadius: '12px', padding: '2px 8px', fontSize: '12px' } },
  { id: 'f2_1', position: { x: 150, y: 280 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-purple-500 border-none' },
  { id: 'f2_2', position: { x: 350, y: 280 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-purple-500 border-none' },
  { id: 'f2_3', position: { x: 450, y: 280 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-purple-500 border-none' },
  { id: 'f2_4', position: { x: 550, y: 280 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-purple-500 border-none' },
  { id: 'f2_5', position: { x: 700, y: 280 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-purple-500 border-none' },

  // Feature Branch 3 (performance)
  { id: 'f3_start', position: { x: 50, y: 340 }, data: { label: 'performance' }, style: { backgroundColor: '#2d1b4e', color: '#a78bfa', border: '1px solid #8b5cf6', borderRadius: '12px', padding: '2px 8px', fontSize: '12px' } },
  { id: 'f3_1', position: { x: 250, y: 340 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-purple-500 border-none' },
  { id: 'f3_2', position: { x: 550, y: 340 }, data: { label: '' }, className: 'rounded-full w-4 h-4 bg-purple-500 border-none' },
];

const initialEdges = [
  // Events
  { id: 'e_m2', source: '1', target: 'm2', type: 'straight', style: { stroke: '#10b981', strokeDasharray: '2,2' } },
  { id: 'e_m4', source: '2', target: 'm4', type: 'straight', style: { stroke: '#f59e0b', strokeDasharray: '2,2' } },
  { id: 'e_m6', source: '3', target: 'm6', type: 'straight', style: { stroke: '#f59e0b', strokeDasharray: '2,2' } },
  { id: 'e_m9', source: '4', target: 'm9', type: 'straight', style: { stroke: '#f59e0b', strokeDasharray: '2,2' } },

  // Main line
  { id: 'em1', source: 'm1', target: 'm2', style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'em2', source: 'm2', target: 'm3', style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'em3', source: 'm3', target: 'm4', style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'em4', source: 'm4', target: 'm5', style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'em5', source: 'm5', target: 'm6', style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'em6', source: 'm6', target: 'm7', style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'em7', source: 'm7', target: 'm8', style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'em8', source: 'm8', target: 'm9', style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'em9', source: 'm9', target: 'm10', style: { stroke: '#3b82f6', strokeWidth: 2 } },

  // Feature 1
  { id: 'ef1_1', source: 'f1_start', target: 'f1_1', style: { stroke: '#a78bfa', strokeWidth: 2 } },
  { id: 'ef1_2', source: 'f1_1', target: 'f1_2', style: { stroke: '#a78bfa', strokeWidth: 2 } },
  { id: 'ef1_3', source: 'f1_2', target: 'f1_3', style: { stroke: '#a78bfa', strokeWidth: 2 } },
  { id: 'ef1_4', source: 'f1_3', target: 'f1_4', style: { stroke: '#a78bfa', strokeWidth: 2 } },
  { id: 'ef1_5', source: 'f1_4', target: 'hr_1', style: { stroke: '#a78bfa', strokeWidth: 2 } },
  { id: 'ef1_6', source: 'hr_1', target: 'hr_2', style: { stroke: '#ef4444', strokeWidth: 2 } },
  { id: 'ef1_7', source: 'hr_2', target: 'f1_5', style: { stroke: '#a78bfa', strokeWidth: 2 } },

  // Feature 2
  { id: 'ef2_1', source: 'f2_start', target: 'f2_1', style: { stroke: '#a78bfa', strokeWidth: 2 } },
  { id: 'ef2_2', source: 'f2_1', target: 'f2_2', style: { stroke: '#a78bfa', strokeWidth: 2 } },
  { id: 'ef2_3', source: 'f2_2', target: 'f2_3', style: { stroke: '#a78bfa', strokeWidth: 2 } },
  { id: 'ef2_4', source: 'f2_3', target: 'f2_4', style: { stroke: '#a78bfa', strokeWidth: 2 } },
  { id: 'ef2_5', source: 'f2_4', target: 'f2_5', style: { stroke: '#a78bfa', strokeWidth: 2 } },

  // Feature 3
  { id: 'ef3_1', source: 'f3_start', target: 'f3_1', style: { stroke: '#a78bfa', strokeWidth: 2 } },
  { id: 'ef3_2', source: 'f3_1', target: 'f3_2', style: { stroke: '#a78bfa', strokeWidth: 2 } },

  // Merges
  { id: 'em_1', source: 'm3', target: 'f1_3', type: 'smoothstep', style: { stroke: '#9ca3af', strokeWidth: 1.5, strokeDasharray: '4,4' } },
  { id: 'em_2', source: 'm5', target: 'f2_4', type: 'smoothstep', style: { stroke: '#9ca3af', strokeWidth: 1.5, strokeDasharray: '4,4' } },
  { id: 'em_3', source: 'f1_5', target: 'm8', type: 'smoothstep', style: { stroke: '#9ca3af', strokeWidth: 1.5, strokeDasharray: '4,4' } },
];

const EvolutionGraph = ({ isSearchActive }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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
