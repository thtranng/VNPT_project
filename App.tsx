
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MeetingDetail from './components/MeetingDetail';
import LiveSession from './components/LiveSession';
import ChatBot from './components/ChatBot';
import Library from './components/Library';
import Settings from './components/Settings';
import { MOCK_MEETINGS, CURRENT_USER } from './constants';
import { Meeting, Participant } from './types';

const App: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [sessionMode, setSessionMode] = useState<'audio' | 'video'>('audio');
  const [meetings, setMeetings] = useState<Meeting[]>(MOCK_MEETINGS);
  const [user] = useState<Participant>(CURRENT_USER);
  const [searchQuery, setSearchQuery] = useState('');

  const addMeeting = (newMeeting: Meeting) => {
    setMeetings(prev => [newMeeting, ...prev]);
  };

  const handleUserUpdate = () => {};

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl text-center">
            <button onClick={() => setIsAuthenticated(true)} className="w-full h-12 bg-primary text-white rounded-xl font-bold">
                Sign In to Demo
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-background font-sans overflow-hidden">
      {/* Sidebar is now always visible and part of the flex flow */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        user={user} 
      />
      
      {/* Main Content Area naturally fills the remaining space */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Routes>
          <Route path="/" element={
            <Dashboard 
              setSessionMode={setSessionMode} 
              onMeetingAdded={addMeeting} 
              meetings={meetings} 
              user={user} 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />
          } />
          <Route path="/chat" element={<ChatBot user={user} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
          <Route path="/library" element={<Library meetings={meetings} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
          <Route path="/meeting/detail" element={<MeetingDetail meetings={meetings} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
          <Route path="/live" element={
            <LiveSession 
              setIsFullScreen={setIsFullScreen} 
              sessionMode={sessionMode} 
              user={user} 
            />
          } />
          <Route path="/settings" element={<Settings user={user} onUserUpdate={handleUserUpdate} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
