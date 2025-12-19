
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Participant } from '../types';

interface LiveSessionProps {
  setIsFullScreen: (val: boolean) => void;
  sessionMode: 'audio' | 'video';
  user: Participant;
}

const LiveSession: React.FC<LiveSessionProps> = ({ setIsFullScreen, sessionMode, user }) => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'ACTIONS' | 'OUTLINE'>('OVERVIEW');

  // Start timer on mount
  useEffect(() => {
    // Note: We no longer set isFullScreen to true to keep the Sidebar visible
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndSession = () => {
    const confirmed = window.confirm("Are you sure you want to end this recording? The recap will be saved to your library.");
    if (confirmed) {
      navigate('/');
    }
  };

  return (
    <div id="record-view" className="flex-1 flex bg-white overflow-hidden font-sans select-none animate-in fade-in duration-500 relative h-full">
      
      {/* LEFT MAIN COLUMN (70% width) */}
      <div className="w-[70%] flex flex-col h-full border-r border-slate-100">
        
        {/* TOP AREA: Visualizer */}
        <div className="flex-grow p-6 flex flex-col relative bg-slate-50/30">
          <div className="flex-grow bg-white rounded-[2.5rem] shadow-sm border border-slate-200/60 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 -mr-48 -mt-48 rounded-full blur-3xl"></div>
            
            <div className="absolute top-12 text-center">
              <h1 className="text-8xl font-thin text-slate-900 tabular-nums tracking-tighter">
                {formatTime(timer)}
              </h1>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-2">Active Session</p>
            </div>

            <div className="flex items-center gap-4 h-24 my-8">
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i} 
                  className="wave-bar w-4 rounded-full bg-gradient-to-t from-primary to-primary/30"
                ></div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-slate-400 font-bold text-sm flex items-center gap-3">
                <span className="size-2 bg-red-600 rounded-full rec-dot-active"></span>
                Recording in progress...
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM AREA: Intelligence Tabs */}
        <div className="h-[35%] p-6 flex flex-col">
          <div className="flex items-center gap-8 px-4 mb-4">
            {(['OVERVIEW', 'ACTIONS', 'OUTLINE'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-3 text-[11px] font-black uppercase tracking-[0.2em] transition-all ${
                  activeTab === tab ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full animate-in slide-in-from-left-2 duration-300"></div>
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 bg-white rounded-3xl border border-slate-200/60 p-6 overflow-y-auto scrollbar-hide shadow-sm">
            {activeTab === 'OVERVIEW' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <span className="material-symbols-outlined text-[18px] filled-icon">auto_awesome</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">Live Summary</span>
                </div>
                <p className="text-sm font-semibold text-slate-600 leading-relaxed italic">
                  "The team is currently reviewing the technical feasibility of the new sync module. Sarah has raised a concern about latency, while Devin suggested WebSockets."
                </p>
              </div>
            )}
            {activeTab === 'ACTIONS' && (
              <div className="space-y-3 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="material-symbols-outlined text-slate-400">check_box_outline_blank</span>
                  <span className="text-sm font-bold text-slate-700">Sarah to review UX prototypes by Friday</span>
                </div>
              </div>
            )}
            {activeTab === 'OUTLINE' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="border-l-2 border-slate-200 pl-4 py-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">00:00 - 05:20</p>
                  <p className="text-sm font-bold text-slate-800">Introduction & Project Goals</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN (30% width) */}
      <div className="w-[30%] flex flex-col h-full bg-slate-50/20 shadow-2xl z-10">
        <header className="px-8 py-8 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined filled-icon">graphic_eq</span>
            </div>
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">Live Transcript</h2>
          </div>
          <div className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1.5 rounded-full border border-red-100/50">
            <div className="size-1.5 bg-red-600 rounded-full rec-dot-active"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">Live</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
          <div className="space-y-6">
            <div className="animate-in slide-in-from-right-4 duration-500">
              <span className="text-[10px] font-black uppercase tracking-tight text-orange-600 block mb-1">Sarah (Designer)</span>
              <div className="p-4 bg-white border border-slate-200 rounded-2xl rounded-tl-none text-xs font-semibold leading-relaxed text-slate-700 shadow-sm">
                From a design perspective, we need to ensure the latency doesn't break the UX flow.
              </div>
            </div>
            <div className="animate-in slide-in-from-right-4 duration-500 delay-150">
              <span className="text-[10px] font-black uppercase tracking-tight text-green-600 block mb-1">Devin (Eng Lead)</span>
              <div className="p-4 bg-white border border-slate-200 rounded-2xl rounded-tl-none text-xs font-semibold leading-relaxed text-slate-700 shadow-sm">
                The engineering team is looking at WebSockets for this.
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-slate-100 bg-white">
           <div className="flex items-center justify-between text-[10px] font-black text-slate-300 uppercase tracking-widest">
              <span>REC_ID: 884-X2</span>
              <span>Syncing Live</span>
           </div>
        </div>
      </div>

      {/* FLOATING CONTROLS (Bottom Center relative to container) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2000] flex items-center gap-5 animate-in slide-in-from-bottom-10 duration-700">
         <button className="size-14 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-xl hover:scale-110 active:scale-95">
            <span className="material-symbols-outlined text-[24px]">pause</span>
         </button>
         
         <button 
           id="btn-end-meeting"
           onClick={handleEndSession}
           className="h-16 px-12 bg-red-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm flex items-center gap-3 hover:bg-red-700 active:scale-95 transition-all btn-floating-shadow"
         >
           <span className="material-symbols-outlined filled-icon">call_end</span>
           End Meeting
         </button>
         
         <button className="size-14 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-xl hover:scale-110 active:scale-95">
            <span className="material-symbols-outlined text-[24px]">mic_off</span>
         </button>
      </div>

    </div>
  );
};

export default LiveSession;
