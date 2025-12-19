
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { chatWithAssistant } from '../geminiService';
import { Meeting } from '../types';

const MeetingDetail: React.FC<{ 
  meetings: Meeting[];
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}> = ({ meetings, searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const fromSource = location.state?.from || 'library';
  const meetingTitle = location.state?.meetingTitle || (meetings.length > 0 ? meetings[0].title : '');
  const meeting = meetings.find(m => m.title === meetingTitle) || meetings[0];
  
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    // Assistant logic here
    setLoading(false);
  };

  if (!meeting) return <div className="flex-1 flex items-center justify-center">Meeting not found</div>;

  return (
    <div id="meeting-detail-view" className="flex-1 flex flex-col h-full bg-background dark:bg-slate-950 overflow-hidden">
      <header className="h-16 px-8 flex items-center justify-between shrink-0 bg-white border-b border-slate-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-400 hover:text-primary">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold">{meeting.title}</h1>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden p-8 gap-8">
        <div className="flex-grow flex flex-col gap-6 overflow-y-auto pr-4 scrollbar-hide">
          <div className="bg-slate-900 rounded-3xl aspect-video w-full flex items-center justify-center relative overflow-hidden shadow-2xl">
            <span className="material-symbols-outlined text-white/10 text-9xl">smart_display</span>
          </div>
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
             <h2 className="text-xs font-black uppercase tracking-widest text-primary mb-6">Transcript</h2>
             <div className="space-y-6">
                {meeting.transcript?.map((entry, idx) => (
                  <div key={idx} className="flex gap-4">
                    <img src={entry.avatar} className="size-8 rounded-full" alt="" />
                    <div>
                      <span className="text-xs font-bold block">{entry.speaker}</span>
                      <p className="text-sm text-slate-600">{entry.text}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetail;
