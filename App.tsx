
import React, { useState } from 'react';
import { ViewState } from './types.ts';
import ContentGenerator from './components/ContentGenerator.tsx';
import Analytics from './components/Analytics.tsx';
import Trending from './components/Trending.tsx';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('generator');

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black border-x border-zinc-800 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <header className="p-4 border-b border-zinc-800 flex justify-between items-center bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-xs">SB</span>
          SocialBridge
        </h1>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">Live Engine</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20">
        {activeView === 'generator' && <ContentGenerator />}
        {activeView === 'analytics' && <Analytics />}
        {activeView === 'trending' && <Trending onSelectTrend={() => setActiveView('generator')} />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto border-t border-zinc-800 bg-black/90 backdrop-blur-xl px-6 py-3 flex justify-between items-center z-50">
        <NavButton 
          active={activeView === 'generator'} 
          onClick={() => setActiveView('generator')}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}
          label="Create"
        />
        <NavButton 
          active={activeView === 'trending'} 
          onClick={() => setActiveView('trending')}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
          label="Trends"
        />
        <NavButton 
          active={activeView === 'analytics'} 
          onClick={() => setActiveView('analytics')}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
          label="Stats"
        />
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center transition-all duration-300 ${active ? 'text-blue-500 scale-110' : 'text-zinc-500 hover:text-zinc-300'}`}
  >
    {icon}
    <span className="text-[10px] mt-1 font-medium">{label}</span>
  </button>
);

export default App;
