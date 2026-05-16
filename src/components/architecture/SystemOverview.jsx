import React, { useMemo } from 'react';
import ReactFlow, { Background, MarkerType, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import { Monitor, Smartphone, Globe, Shield, Users, CreditCard, Bell, BarChart2, FileText, Database, HardDrive, Server } from 'lucide-react';
import { cn } from '../../utils/cn';

// Custom Node Component
const CustomNode = ({ data }) => {
  const Icon = data.icon;
  return (
    <div className={cn("px-4 py-3 rounded-lg border border-border/50 bg-panel flex items-center gap-3 w-[160px] shadow-sm backdrop-blur-md hover:border-gray-500 transition-colors cursor-pointer", data.className)}>
      <Handle type="target" position={Position.Left} className="w-1 h-1 bg-transparent border-none opacity-0" />
      {Icon && <div className={cn("p-1.5 rounded-md", data.iconBg)}><Icon className={cn("w-4 h-4", data.iconColor)} /></div>}
      <div>
        <div className="text-sm font-semibold text-gray-200 leading-tight">{data.label}</div>
        {data.sublabel && <div className="text-[10px] text-gray-500 mt-0.5">{data.sublabel}</div>}
      </div>
      <Handle type="source" position={Position.Right} className="w-1 h-1 bg-transparent border-none opacity-0" />
    </div>
  );
};

// Custom Group Node
const GroupNode = ({ data }) => {
  return (
    <div className={cn("border rounded-xl bg-transparent w-full h-full relative", data.borderColor)}>
      <div className={cn("absolute -top-3 left-1/2 -translate-x-1/2 px-2 bg-background text-xs font-semibold tracking-wide uppercase", data.textColor)}>
        {data.label}
      </div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
  groupNode: GroupNode
};

const initialNodes = [
  // Groups
  { id: 'g1', type: 'groupNode', position: { x: 0, y: 0 }, data: { label: 'Clients', borderColor: 'border-safe/30', textColor: 'text-safe' }, style: { width: 200, height: 280 } },
  { id: 'g2', type: 'groupNode', position: { x: 260, y: 0 }, data: { label: 'API Layer', borderColor: 'border-primary/30', textColor: 'text-primary' }, style: { width: 200, height: 280 } },
  { id: 'g3', type: 'groupNode', position: { x: 520, y: -40 }, data: { label: 'Services', borderColor: 'border-secondary/30', textColor: 'text-secondary' }, style: { width: 200, height: 360 } },
  { id: 'g4', type: 'groupNode', position: { x: 780, y: -40 }, data: { label: 'Data Layer', borderColor: 'border-accent/30', textColor: 'text-accent' }, style: { width: 200, height: 280 } },

  // Clients
  { id: 'c1', type: 'custom', parentNode: 'g1', extent: 'parent', position: { x: 20, y: 30 }, data: { label: 'Web App', sublabel: 'Next.js', icon: Globe, iconColor: 'text-blue-400', iconBg: 'bg-blue-400/10' } },
  { id: 'c2', type: 'custom', parentNode: 'g1', extent: 'parent', position: { x: 20, y: 110 }, data: { label: 'Mobile App', sublabel: 'React Native', icon: Smartphone, iconColor: 'text-gray-300', iconBg: 'bg-gray-500/10' } },
  { id: 'c3', type: 'custom', parentNode: 'g1', extent: 'parent', position: { x: 20, y: 190 }, data: { label: 'Admin Panel', sublabel: 'Next.js', icon: Monitor, iconColor: 'text-green-400', iconBg: 'bg-green-400/10' } },

  // API Layer
  { id: 'a1', type: 'custom', parentNode: 'g2', extent: 'parent', position: { x: 20, y: 30 }, data: { label: 'API Gateway', sublabel: 'Kong', icon: Server, iconColor: 'text-gray-200', iconBg: 'bg-gray-500/10' } },
  { id: 'a2', type: 'custom', parentNode: 'g2', extent: 'parent', position: { x: 20, y: 110 }, data: { label: 'Auth Service', sublabel: 'Node.js', icon: Shield, iconColor: 'text-gray-200', iconBg: 'bg-gray-500/10' } },
  { id: 'a3', type: 'custom', parentNode: 'g2', extent: 'parent', position: { x: 20, y: 190 }, data: { label: 'User Service', sublabel: 'Node.js', icon: Users, iconColor: 'text-gray-200', iconBg: 'bg-gray-500/10' } },

  // Services
  { id: 's1', type: 'custom', parentNode: 'g3', extent: 'parent', position: { x: 20, y: 30 }, data: { label: 'Payment Service', sublabel: 'Node.js', icon: CreditCard, iconColor: 'text-gray-200', iconBg: 'bg-gray-500/10' } },
  { id: 's2', type: 'custom', parentNode: 'g3', extent: 'parent', position: { x: 20, y: 110 }, data: { label: 'Notification Service', sublabel: 'Node.js', icon: Bell, iconColor: 'text-gray-200', iconBg: 'bg-gray-500/10' } },
  { id: 's3', type: 'custom', parentNode: 'g3', extent: 'parent', position: { x: 20, y: 190 }, data: { label: 'Reporting Service', sublabel: 'Node.js', icon: BarChart2, iconColor: 'text-gray-200', iconBg: 'bg-gray-500/10' } },
  { id: 's4', type: 'custom', parentNode: 'g3', extent: 'parent', position: { x: 20, y: 270 }, data: { label: 'File Service', sublabel: 'Node.js', icon: FileText, iconColor: 'text-gray-200', iconBg: 'bg-gray-500/10' } },

  // Data Layer
  { id: 'd1', type: 'custom', parentNode: 'g4', extent: 'parent', position: { x: 20, y: 30 }, data: { label: 'PostgreSQL', sublabel: 'Primary DB', icon: Database, iconColor: 'text-safe', iconBg: 'bg-safe/10' } },
  { id: 'd2', type: 'custom', parentNode: 'g4', extent: 'parent', position: { x: 20, y: 110 }, data: { label: 'Redis', sublabel: 'Cache', icon: HardDrive, iconColor: 'text-safe', iconBg: 'bg-safe/10' } },
  { id: 'd3', type: 'custom', parentNode: 'g4', extent: 'parent', position: { x: 20, y: 190 }, data: { label: 'S3 Bucket', sublabel: 'File Storage', icon: Server, iconColor: 'text-accent', iconBg: 'bg-accent/10' } },
];

const initialEdges = [
  // Clients to API Gateway
  { id: 'e-c1-a1', source: 'c1', target: 'a1', type: 'smoothstep', style: { stroke: '#10b981', strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' } },
  { id: 'e-c2-a1', source: 'c2', target: 'a1', type: 'smoothstep', style: { stroke: '#10b981', strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' } },
  { id: 'e-c3-a1', source: 'c3', target: 'a1', type: 'smoothstep', style: { stroke: '#10b981', strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' } },

  // API Gateway to internal services
  { id: 'e-a1-a2', source: 'a1', target: 'a2', type: 'smoothstep', style: { stroke: '#8b5cf6', strokeWidth: 1.5, strokeDasharray: '4 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' } },
  { id: 'e-a1-s1', source: 'a1', target: 's1', type: 'smoothstep', style: { stroke: '#8b5cf6', strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' } },
  { id: 'e-a1-s2', source: 'a1', target: 's2', type: 'smoothstep', style: { stroke: '#a78bfa', strokeWidth: 1.5, strokeDasharray: '4 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#a78bfa' } },
  { id: 'e-a1-a3', source: 'a1', target: 'a3', type: 'smoothstep', style: { stroke: '#8b5cf6', strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' } },
  
  // Internal to DBs
  { id: 'e-a2-d1', source: 'a2', target: 'd1', type: 'smoothstep', style: { stroke: '#f59e0b', strokeWidth: 1.5, strokeDasharray: '4 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' } },
  { id: 'e-a2-d2', source: 'a2', target: 'd2', type: 'smoothstep', style: { stroke: '#f59e0b', strokeWidth: 1.5, strokeDasharray: '4 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' } },
  
  { id: 'e-s1-d1', source: 's1', target: 'd1', type: 'smoothstep', style: { stroke: '#f59e0b', strokeWidth: 1.5, strokeDasharray: '4 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' } },
  { id: 'e-s3-d1', source: 's3', target: 'd1', type: 'smoothstep', style: { stroke: '#f59e0b', strokeWidth: 1.5, strokeDasharray: '4 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' } },
  { id: 'e-s4-d3', source: 's4', target: 'd3', type: 'smoothstep', style: { stroke: '#f59e0b', strokeWidth: 1.5, strokeDasharray: '4 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' } },
];

export default function SystemOverview() {
  const nodes = useMemo(() => initialNodes, []);
  const edges = useMemo(() => initialEdges, []);

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        className="bg-transparent"
        minZoom={0.5}
        maxZoom={1.5}
        panOnScroll={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        nodesDraggable={false}
      >
        <Background color="#ffffff" gap={20} size={1} opacity={0.03} />
      </ReactFlow>

      {/* Legend */}
      <div className="absolute bottom-0 left-0 flex gap-6 text-[10px] text-gray-400 font-medium z-10 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-6 h-[2px] bg-safe"></div>
          Synchronous Call
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-[2px] bg-primary border-dashed border-b-2"></div>
          Asynchronous Call
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-[2px] bg-accent border-dashed border-b-2"></div>
          Data Flow
        </div>
      </div>
    </div>
  );
}
