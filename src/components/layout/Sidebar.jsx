import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  GitMerge, 
  GitCommit, 
  LayoutTemplate, 
  LineChart, 
  Bot, 
  FileText, 
  Search, 
  CheckCircle2,
  Calendar,
  ChevronDown
} from 'lucide-react';
import GlassCard from '../shared/GlassCard';

const navItems = [
  { name: 'Explorer', path: '/explorer', icon: GitMerge },
  { name: 'Timeline', path: '/timeline', icon: GitCommit },
  { name: 'Architecture', path: '/architecture', icon: LayoutTemplate },
  { name: 'Insights', path: '/insights', icon: LineChart },
  { name: 'Agents', path: '/agents', icon: Bot },
  { name: 'Reports', path: '/reports', icon: FileText },
];

const searchSuggestions = [
  "Find commits about redis",
  "Branches with auth changes",
  "PRs mentioning timeout",
  "Files modified in auth-rewrite",
  "Rollback related commits"
];

const Sidebar = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.includes('redis') ? 'redis' : 'auth');
    navigate('/explorer');
  };

  return (
    <div className="w-72 h-screen border-r border-border bg-background/50 backdrop-blur-md flex flex-col pt-6 pb-4 px-4 flex-shrink-0 z-10">
      {/* Branding */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50 shadow-neon">
          <Bot className="text-primary w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-white leading-tight">Code Archaeology</h1>
          <p className="text-xs text-gray-400">AI Repository Intelligence</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-8">
        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300
                ${isActive 
                  ? 'bg-panel border border-primary/30 text-primary shadow-neon font-medium' 
                  : 'text-gray-400 hover:text-gray-200 hover:bg-panel/50 border border-transparent'}
              `}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Repository Filters */}
        <div className="flex flex-col gap-3 px-1">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Repository</h3>
          
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Branch Filter</label>
            <div className="flex items-center justify-between bg-panel border border-border rounded-lg px-3 py-2 text-sm text-gray-300 cursor-pointer hover:border-gray-500 transition-colors">
              <span>All Branches</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>

          <div className="space-y-1 mt-2">
            <label className="text-xs text-gray-400">Time Range</label>
            <div className="flex items-center justify-between bg-panel border border-border rounded-lg px-3 py-2 text-sm text-gray-300 cursor-pointer hover:border-gray-500 transition-colors">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="truncate text-xs">Jan 01, 2024 - Apr 30, 2024</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="flex flex-col gap-3 px-1">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Search</h3>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate('/explorer');
                }
              }}
              className="w-full bg-panel border border-border rounded-lg pl-9 pr-10 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-primary/50 focus:shadow-neon transition-all"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center border border-border rounded bg-background px-1.5 py-0.5">
              <span className="text-[10px] text-gray-400 font-mono">⌘K</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <span className="text-xs text-gray-500">Search suggestions</span>
            {searchSuggestions.map((suggestion, i) => (
              <div 
                key={i} 
                onClick={() => handleSearchSuggestionClick(suggestion)}
                className="flex items-center gap-2 text-xs text-gray-400 hover:text-primary cursor-pointer transition-colors group"
              >
                <Search className="w-3 h-3 group-hover:text-primary" />
                <span className="truncate">{suggestion}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Card */}
      <GlassCard className="mt-4 flex flex-col gap-1 border-safe/20 bg-safe/5">
        <div className="flex items-center gap-2 text-safe">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-sm font-medium">Analysis completed</span>
        </div>
        <span className="text-xs text-gray-500 ml-6">30 Apr 2024, 11:42 AM</span>
      </GlassCard>
    </div>
  );
};

export default Sidebar;
