import React, { useState } from 'react';
import { Send, ChevronDown, Activity, X } from 'lucide-react';
import NeonButton from '../shared/NeonButton';
import GlassCard from '../shared/GlassCard';

const quickChips = [
  "Why was auth redesigned?",
  "Explain instability in March",
  "Impact of Redis integration",
  "Full repository narration"
];

const InvestigationBar = () => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState(null);
  const [isInvestigating, setIsInvestigating] = useState(false);

  const handleAsk = (text) => {
    const q = text || query;
    if (!q) return;
    setQuery(q);
    setIsInvestigating(true);
    setAnswer(null);
    
    // Simulate backend connection delay
    setTimeout(() => {
      setIsInvestigating(false);
      setAnswer({
        question: q,
        text: "Based on the repository history, the architecture was recently updated to integrate Redis for caching and the auth system was migrated to OAuth2. These changes caused a brief spike in rollbacks but ultimately improved scalability by 40%.",
        confidence: "95%"
      });
      setQuery("");
    }, 1500);
  };

  return (
    <div className="border-t border-border bg-background/90 backdrop-blur-xl p-4 flex flex-col gap-3 z-50 w-full relative">
      
      {/* Answer Panel */}
      {answer && (
        <div className="absolute bottom-full left-0 w-full p-4 pb-2">
          <GlassCard className="max-w-6xl mx-auto border-primary/30 relative shadow-neon-strong animate-in slide-in-from-bottom-4">
            <button onClick={() => setAnswer(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/50 text-primary flex-shrink-0 mt-1 shadow-neon">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Answer to: "{answer.question}"</h3>
                <p className="text-sm text-gray-200 leading-relaxed mb-2">{answer.text}</p>
                <span className="bg-primary/20 border border-primary/30 text-primary px-2 py-0.5 rounded text-[11px] uppercase tracking-wider font-bold">
                  {answer.confidence} Confidence
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      <div className="flex items-center gap-4 max-w-6xl mx-auto w-full">
        <div className="flex-1 bg-panel border border-border rounded-lg relative group focus-within:border-primary/50 focus-within:shadow-neon transition-all flex items-center pr-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Ask anything about this repository..."
            className="w-full bg-transparent outline-none text-white px-4 py-3 placeholder-gray-500"
            disabled={isInvestigating}
          />
          {isInvestigating && <Activity className="w-5 h-5 text-primary animate-pulse" />}
        </div>
        
        <div className="flex items-center gap-3">
          <NeonButton icon={Send} className="py-3 px-6" onClick={() => handleAsk()} disabled={isInvestigating}>
            {isInvestigating ? 'Thinking...' : 'Ask'}
          </NeonButton>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 max-w-6xl mx-auto w-full">
        {quickChips.map((chip, idx) => (
          <button 
            key={idx}
            onClick={() => handleAsk(chip)}
            disabled={isInvestigating}
            className="text-xs bg-panel border border-border hover:border-primary/50 hover:text-primary text-gray-400 px-3 py-1.5 rounded-full transition-all disabled:opacity-50"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InvestigationBar;
