
import React, { useState, useRef, useEffect } from 'react';
import { Participant } from '../types';

const ChatBot: React.FC<{ 
  user: Participant;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}> = ({ user, searchQuery, setSearchQuery }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputContainerRef.current && !inputContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const suggestions = [
    { text: "Draft a summary of the Q3 financial report PDF.", icon: "auto_awesome" },
    { text: "What are the pending deadlines for Marketing this week?", icon: "event_upcoming" },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-950 relative transition-all duration-300 ease-in-out">
      <header className="h-[72px] px-8 flex items-center justify-between shrink-0">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 h-9 bg-slate-50 dark:bg-slate-900 border-none rounded-full pl-10 pr-4 text-xs font-medium" 
            placeholder="Ask or search..." 
            type="text"
          />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
        <div className={`text-center mb-10 transition-all duration-700 ${isFocused ? 'scale-95 opacity-50 blur-[1px]' : 'scale-100'}`}>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-2">Hi, {user.name.split(' ')[0]}</h1>
          <p className="text-slate-400 font-medium">How can I help you today?</p>
        </div>

        <div ref={inputContainerRef} className="w-full max-w-2xl relative">
          <div className={`w-full bg-white dark:bg-slate-900 rounded-3xl border transition-all ${isFocused ? 'shadow-2xl border-primary/20 ring-4 ring-primary/5' : 'border-slate-100'}`}>
            <div className="flex items-center p-2">
              <input 
                onFocus={() => setIsFocused(true)}
                className="flex-1 h-14 bg-transparent border-none focus:ring-0 text-slate-700 dark:text-white px-4 font-medium" 
                placeholder="Ask ClerkBot anything..."
                type="text"
              />
              <button className="size-10 bg-primary text-white rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined">arrow_upward</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatBot;
