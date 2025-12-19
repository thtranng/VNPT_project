
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Meeting } from '../types';

const Library: React.FC<{ 
  meetings: Meeting[];
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}> = ({ meetings, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const [activeFolder, setActiveFolder] = useState('All Conversations');
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('Any time');
  const [searchParticipant, setSearchParticipant] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>(['PROCESSED', 'PROCESSING', 'COMPLETED']);
  
  const filterRef = useRef<HTMLDivElement>(null);

  const folders = [
    { name: 'Product Team', icon: 'groups' },
    { name: 'Client Interviews', icon: 'forum' },
    { name: 'Q3 Planning', icon: 'event_note' },
    { name: 'Engineering Syncs', icon: 'code' },
  ];

  const mainNav = [
    { name: 'All Conversations', icon: 'all_inbox' },
    { name: 'Shared with me', icon: 'share_reviews' },
    { name: 'Trash', icon: 'delete_outline' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const resetFilters = () => {
    setSelectedDateRange('Any time');
    setSearchParticipant('');
    setSelectedStatus(['PROCESSED', 'PROCESSING', 'COMPLETED']);
    setSearchQuery('');
  };

  const toggleStatus = (status: string) => {
    setSelectedStatus(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const filteredMeetings = meetings.filter(m => {
    const terms = `${m.title} ${m.date}`.toLowerCase();
    const searchMatch = terms.includes(searchQuery.toLowerCase());

    const folderMatch = activeFolder === 'All Conversations' || activeFolder === 'Shared with me' || activeFolder === 'Trash' 
      ? true 
      : m.folder === activeFolder;

    const statusMatch = selectedStatus.includes(m.status);

    return searchMatch && folderMatch && statusMatch;
  });

  const handleMeetingClick = (meeting: Meeting) => {
    navigate('/meeting/detail', { 
      state: { 
        from: 'library', 
        folder: activeFolder,
        meetingTitle: meeting.title 
      } 
    });
  };

  return (
    <div id="library-view" className="flex-1 flex h-full bg-white dark:bg-slate-900 transition-all duration-300 ease-in-out overflow-hidden relative">
      
      <aside className="w-64 border-r border-slate-100 dark:border-slate-800 flex flex-col bg-slate-50/30 dark:bg-slate-900/50 shrink-0">
        <div className="p-6 pb-2">
          <h2 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6">Library</h2>
          <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border-2 border-primary/20 border-dashed rounded-xl text-primary font-bold text-xs hover:border-primary/40 hover:bg-primary/5 transition-all mb-8">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Folder
          </button>
          <nav className="space-y-1">
            {mainNav.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveFolder(item.name)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeFolder === item.name 
                  ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100/50'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-white dark:bg-slate-900 overflow-hidden">
        <header className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{activeFolder}</h1>
          </div>
          <div className="flex items-center gap-3 relative" ref={filterRef}>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 h-10 bg-slate-50 dark:bg-slate-800 border border-transparent focus:bg-white rounded-xl pl-10 pr-4 text-xs font-bold transition-all outline-none" 
              placeholder="Search transcripts..." 
              type="text"
            />
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="h-10 px-4 border rounded-xl flex items-center gap-2 font-bold text-xs"
            >
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Filters
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-8 py-4">
          <div className="mt-2 space-y-1">
            {filteredMeetings.map((m) => (
              <div 
                key={m.id}
                onClick={() => handleMeetingClick(m)}
                className="grid grid-cols-[auto_1fr_120px_100px_60px] gap-4 items-center px-4 py-4 rounded-xl hover:bg-slate-50/80 transition-all group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">description</span>
                </div>
                <div className="min-w-0 pr-8">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-0.5 truncate">{m.title}</h3>
                  <p className="text-xs text-slate-400 font-medium truncate italic">{m.summary}</p>
                </div>
                <div className="text-right"><span className="text-xs font-bold">{m.date}</span></div>
                <div className="text-right"><span className="text-xs font-bold">{m.duration}</span></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Library;
