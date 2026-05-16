import React from 'react';
import { Bell, Moon, User, ChevronDown, Activity } from 'lucide-react';
import NeonButton from '../shared/NeonButton';
import GithubIcon from '../shared/GithubIcon';

const Navbar = () => {
  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-6 z-10 w-full">
      <div className="flex items-center flex-1">
        {/* Placeholder for symmetry */}
      </div>

      {/* Center Repository Selector */}
      <div className="flex-1 flex justify-center">
        <div className="flex items-center gap-2 bg-panel border border-border hover:border-gray-500 rounded-lg px-4 py-2 cursor-pointer transition-colors group">
          <GithubIcon className="w-4 h-4 text-gray-400 group-hover:text-white" />
          <span className="text-sm font-medium text-gray-200">github.com/company/backend</span>
          <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center justify-end gap-4 flex-1">
        <NeonButton icon={Activity} variant="primary">
          Generate Report
        </NeonButton>
        
        <div className="flex items-center gap-3 border-l border-border pl-4 ml-2">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Moon className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-panel border border-border flex items-center justify-center text-gray-400 cursor-pointer hover:border-gray-400 transition-colors">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
