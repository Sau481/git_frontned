import React, { useState, useEffect } from 'react';
import GlassCard from '../shared/GlassCard';
import { cn } from '../../utils/cn';
import { Database, Bot, Activity, ShieldAlert, Lightbulb, FileText, ChevronRight } from 'lucide-react';

export default function AgentOrchestration() {
  const [activeStep, setActiveStep] = useState(0);

  // Animation effect for orchestration
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GlassCard className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-sm font-semibold text-white">Agent Orchestration</h3>
          <p className="text-xs text-gray-500 mt-1">How agents collaborate to deliver intelligence</p>
        </div>
        <span className="text-xs text-primary cursor-pointer hover:underline">View workflow details &rarr;</span>
      </div>

      <div className="flex items-center justify-between relative px-4 mt-8">
         {/* Background connecting line */}
         <div className="absolute top-[28px] left-12 right-12 h-[2px] bg-border/50 -z-10"></div>
         
         {/* Animated Progress Line */}
         <div 
            className="absolute top-[28px] left-12 h-[2px] bg-primary -z-10 transition-all duration-1000 ease-in-out shadow-[0_0_8px_rgba(139,92,246,0.8)]"
            style={{ width: `calc(${(activeStep / 5) * 100}% - 96px)` }}
         ></div>
         
         {[
           { id: 'data', icon: Database, name: 'Data Collector', desc: 'Collects data from Git, CI/CD, logs, and more', color: 'text-gray-400', bg: 'bg-gray-500/10 border-gray-600' },
           { id: 'arch', icon: Bot, name: 'Code Archaeologist', desc: 'Analyzes history and code evolution', color: 'text-primary', bg: 'bg-primary/10 border-primary/50' },
           { id: 'det', icon: Activity, name: 'Anomaly Detective', desc: 'Detects anomalies and issues', color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/50' },
           { id: 'sec', icon: ShieldAlert, name: 'Security Sentinel', desc: 'Scans for security risks', color: 'text-safe', bg: 'bg-safe/10 border-safe/50' },
           { id: 'syn', icon: Lightbulb, name: 'Insight Synthesizer', desc: 'Generates insights and narratives', color: 'text-accent', bg: 'bg-accent/10 border-accent/50' },
           { id: 'ui', icon: FileText, name: 'Reports & UI', desc: 'Delivers insights to you', color: 'text-gray-400', bg: 'bg-gray-500/10 border-gray-600' }
         ].map((node, i, arr) => {
           const isActive = i === activeStep;
           const isPast = i < activeStep;
           
           return (
             <div key={node.id} className={cn("flex flex-col items-center text-center w-32 relative group transition-all duration-500", isActive ? "scale-110" : isPast ? "opacity-100" : "opacity-50")}>
                <div className={cn(
                  "w-14 h-14 rounded-full border flex items-center justify-center mb-3 bg-panel z-10 transition-all duration-500", 
                  node.bg,
                  isActive ? "shadow-[0_0_15px_rgba(139,92,246,0.5)] border-primary" : ""
                )}>
                   <node.icon className={cn("w-6 h-6", node.color, isActive ? "animate-pulse" : "")} />
                </div>
                <h4 className={cn("text-xs font-semibold mb-1", isActive ? "text-primary" : "text-gray-200")}>{node.name}</h4>
                <p className="text-[9px] text-gray-500 leading-tight px-2">{node.desc}</p>
                
                {/* Arrow overlay for connecting line */}
                {i < arr.length - 1 && (
                  <div className="absolute top-[28px] -right-16 translate-x-1/2 -translate-y-1/2 z-0">
                    <ChevronRight className={cn("w-4 h-4 transition-colors", isPast ? "text-primary" : "text-gray-600")} />
                  </div>
                )}
             </div>
           );
         })}
      </div>

      {/* Orchestration Legend */}
      <div className="flex gap-8 mt-12 px-4 border-t border-border/50 pt-4 text-[10px] text-gray-400 font-medium justify-start">
         <div className="flex items-center gap-2">
           <div className="w-8 h-[2px] bg-primary"></div>
           <span className="flex items-center gap-1"><ChevronRight className="w-3 h-3 text-primary -ml-2"/> Data Flow</span>
         </div>
         <div className="flex items-center gap-2">
           <div className="w-8 h-[2px] bg-gray-500 border-dashed border-b-[2px] border-t-0 border-l-0 border-r-0"></div>
           Agent Handoff
         </div>
         <div className="flex items-center gap-2">
           <div className="w-8 h-[2px] bg-blue-500 border-dotted border-b-[2px] border-t-0 border-l-0 border-r-0"></div>
           Feedback Loop
         </div>
      </div>
    </GlassCard>
  );
}
