
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Meeting, Participant } from '../types';

const ImportModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onFileSelected: (file: File) => void;
}> = ({ isOpen, onClose, onFileSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelected(file);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-[500px] rounded-3xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100 dark:border-slate-800 p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Transcribe audio and video</h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl p-10 flex flex-col items-center gap-6 text-center group hover:border-primary/50 transition-colors bg-slate-50/50 dark:bg-slate-800/30">
          <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-4xl filled-icon">audio_file</span>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Drag & Drop files here</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed px-4">
              Upload AAC, MP3, M4A, WAV, MP4, MOV, or WMV files (up to <span className="font-bold text-slate-700 dark:text-white">250MB</span>).
            </p>
          </div>

          <button 
            onClick={handleBrowseClick}
            className="mt-2 px-8 py-2.5 border-2 border-primary text-primary rounded-full text-sm font-bold hover:bg-primary hover:text-white transition-all shadow-sm"
          >
            Browse files
          </button>
          
          <input 
            type="file" 
            id="hidden-file-input" 
            ref={fileInputRef}
            className="hidden" 
            accept=".aac,.mp3,.m4a,.wav,.mp4,.mov,.wmv"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

const WorkflowModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (meeting: Meeting) => void;
  initialType: 'record' | 'import' | 'url';
  user: Participant;
}> = ({ isOpen, onClose, onSave, initialType, user }) => {
  const [step, setStep] = useState<'processing' | 'save'>('processing');
  const [processingText, setProcessingText] = useState('Uploading...');
  const [selectedFolder, setSelectedFolder] = useState('Product Team');
  
  const folders = ["Unsorted", "Product Team", "Client Interviews", "Q3 Planning", "Engineering Syncs"];

  useEffect(() => {
    if (isOpen) {
      setStep('processing');
      setProcessingText('Uploading...');
      
      const sequence = [
        { text: 'Transcribing audio...', delay: 1000 },
        { text: 'Generating AI Summary...', delay: 2000 },
        { text: 'Success', delay: 3000 }
      ];

      sequence.forEach((item, index) => {
        setTimeout(() => {
          if (item.text === 'Success') {
            setStep('save');
          } else {
            setProcessingText(item.text);
          }
        }, item.delay);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const newMeeting: Meeting = {
      id: `m-new-${Date.now()}`,
      title: `New ${initialType.charAt(0).toUpperCase() + initialType.slice(1)} [${new Date().toLocaleDateString()}]`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      duration: '0 min',
      status: 'PROCESSED',
      participants: [user],
      folder: selectedFolder,
      summary: 'This is an automatically generated summary for your new recording. Key decisions and topics have been identified and organized for your review.',
      transcript: [
        { 
          speaker: user.name, 
          avatar: user.avatar, 
          time: '00:01', 
          text: "Starting the meeting now to discuss our recent updates and the next steps for the project." 
        }
      ],
      actionItems: []
    };
    onSave(newMeeting);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100 dark:border-slate-800">
        {step === 'processing' ? (
          <div className="p-12 flex flex-col items-center text-center">
            <div className="relative mb-8">
              <div className="size-20 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
              <div className="absolute inset-0 size-20 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl filled-icon">auto_awesome</span>
              </div>
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">{processingText}</h2>
            <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">Please wait while ClerkBot handles your recording.</p>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-green-500 filled-icon">check_circle</span>
                Processed Successfully
              </h2>
              <button onClick={onClose} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-8">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5 mb-8 border border-slate-100 dark:border-slate-700">
                <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">AI Summary Preview</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic">
                  "Discussed project scope, key milestones for Q4, and resource allocation. Identified three critical action items..."
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Save to Folder</label>
                  <div className="relative">
                    <select 
                      value={selectedFolder}
                      onChange={(e) => setSelectedFolder(e.target.value)}
                      className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/5 focus:border-primary text-sm font-bold appearance-none outline-none"
                    >
                      {folders.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
                  </div>
                </div>

                <button 
                  onClick={handleSave}
                  className="w-full h-14 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/30 hover:bg-primary-hover transition-all flex items-center justify-center gap-3"
                >
                  <span className="material-symbols-outlined text-[20px]">save</span>
                  Save & View Meeting
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Dashboard: React.FC<{ 
  setSessionMode: (mode: 'audio' | 'video') => void;
  onMeetingAdded: (meeting: Meeting) => void;
  meetings: Meeting[];
  user: Participant;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}> = ({ setSessionMode, onMeetingAdded, meetings, user, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [meetingUrl, setMeetingUrl] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  
  const [workflowActive, setWorkflowActive] = useState(false);
  const [workflowType, setWorkflowType] = useState<'record' | 'import' | 'url'>('import');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const triggerWorkflow = (type: 'record' | 'import' | 'url') => {
    if (type === 'import') {
      setIsImportModalOpen(true);
    } else if (type === 'url') {
      setShowUrlInput(true);
    } else if (type === 'record') {
      setSessionMode('audio');
      navigate('/live');
    } else {
      setWorkflowType(type);
      setWorkflowActive(true);
    }
  };

  const handleFileImported = (file: File) => {
    setIsImportModalOpen(false);
    setWorkflowType('import');
    setWorkflowActive(true);
  };

  const handleUrlSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!meetingUrl.trim()) return;
    
    setIsConnecting(true);
    setTimeout(() => {
      setSessionMode('video');
      navigate('/live');
      setIsConnecting(false);
      setShowUrlInput(false);
      setMeetingUrl('');
    }, 1500);
  };

  const handleSaveMeeting = (newMeeting: Meeting) => {
    onMeetingAdded(newMeeting);
    setWorkflowActive(false);
    navigate('/meeting/detail', { 
      state: { 
        from: 'home', 
        meetingTitle: newMeeting.title 
      } 
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getFormattedDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleMeetingClick = (meeting: Meeting) => {
    navigate('/meeting/detail', { 
      state: { 
        from: 'home', 
        meetingTitle: meeting.title 
      } 
    });
  };

  const filteredMeetings = meetings.filter(m => {
    const terms = `${m.title} ${m.date}`.toLowerCase();
    return terms.includes(searchQuery.toLowerCase());
  });

  return (
    <div id="dashboard-view" className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 relative transition-all duration-300 ease-in-out">
      {isConnecting && (
        <div className="fixed inset-0 z-[110] bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="size-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Connecting to meeting...</p>
        </div>
      )}
      
      <header className="sticky top-0 z-40 h-[72px] bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-8 flex items-center justify-between shrink-0">
        <div className="relative w-[480px]">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-[20px]">search</span>
          <input 
            id="global-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 bg-slate-100/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-violet-100 dark:focus:ring-violet-900/30 focus:border-primary transition-all rounded-full pl-11 pr-4 text-sm dark:text-white outline-none" 
            placeholder="Ask or search your meetings..." 
            type="text"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button id="btn-paste-url" onClick={() => setShowUrlInput(!showUrlInput)} className={`flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${showUrlInput ? 'bg-slate-100 dark:bg-slate-800' : ''}`}>
              <span className="material-symbols-outlined text-[20px]">link</span>Paste URL
            </button>
            {showUrlInput && (
              <div className="absolute top-full mt-2 right-0 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl rounded-full px-4 py-2 flex items-center gap-3 w-[400px] animate-in slide-in-from-top-2 duration-200">
                <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-[20px]">videocam</span>
                <form onSubmit={handleUrlSubmit} className="flex-1">
                  <input 
                    id="input-paste-url" 
                    autoFocus 
                    value={meetingUrl} 
                    onChange={(e) => setMeetingUrl(e.target.value)} 
                    className="w-full bg-transparent outline-none text-sm text-slate-700 dark:text-white placeholder:text-slate-400" 
                    placeholder="Paste meeting URL and hit Enter" 
                    type="text"
                  />
                </form>
                <button onClick={() => handleUrlSubmit()} disabled={!meetingUrl.trim()} className="text-slate-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>
            )}
          </div>
          <button id="btn-import" onClick={() => triggerWorkflow('import')} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg px-4 py-2 text-sm font-semibold transition-colors">
            <span className="material-symbols-outlined text-[20px]">cloud_upload</span>Import
          </button>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
          <button id="btn-record" onClick={() => triggerWorkflow('record')} className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-full text-sm font-bold shadow-sm shadow-primary/20 transition-all">
            <span className="material-symbols-outlined text-[20px] filled-icon">mic</span>Record
          </button>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-8 scroll-smooth">
        <div className="max-w-6xl mx-auto space-y-8">
          <section className="bg-white dark:bg-slate-900 rounded-2xl px-8 py-5 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1 text-orange-500">
                <span className="material-symbols-outlined text-[16px] filled-icon">wb_sunny</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em]">Today</span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {getGreeting()}, {user.name.split(' ')[0]}
              </h1>
              <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mt-0.5">
                {getFormattedDate()}
              </p>
            </div>
          </section>
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Meetings</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMeetings.map(meeting => (
                <div 
                  key={meeting.id} 
                  onClick={() => handleMeetingClick(meeting)} 
                  className="searchable-item group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer shadow-sm"
                >
                  <div className="flex justify-between items-start mb-5">
                    <div className="h-11 w-11 flex items-center justify-center rounded-xl transition-colors bg-primary/5 dark:bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white">
                      <span className="material-symbols-outlined text-[24px]">event_note</span>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wide border bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700">{meeting.status}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">{meeting.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 mb-6 font-medium"><span>{meeting.date}</span><span className="text-slate-200 dark:text-slate-800">•</span><span>{meeting.duration}</span></div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex items-center -space-x-2">
                      {meeting.participants.slice(0, 3).map((p, i) => (<img key={i} src={p.avatar} className="h-7 w-7 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" alt={p.name} />))}
                    </div>
                    <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 group-hover:text-primary transition-colors">arrow_forward_ios</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <ImportModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} onFileSelected={handleFileImported} />
      <WorkflowModal isOpen={workflowActive} onClose={() => setWorkflowActive(false)} onSave={handleSaveMeeting} initialType={workflowType} user={user} />
    </div>
  );
};

export default Dashboard;
