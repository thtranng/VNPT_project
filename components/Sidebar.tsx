
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Participant } from '../types';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  user: Participant;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle, user }) => {
  const navItems = [
    { label: 'Home', icon: 'home', path: '/' },
    { label: 'ClerkBot Chat', icon: 'chat_bubble', path: '/chat' },
    { label: 'Library', icon: 'folder_open', path: '/library' },
  ];

  return (
    <aside className={`h-full ${isCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 flex flex-col transition-all duration-300 ease-in-out flex-shrink-0 relative`}>
      <div className={`h-16 flex items-center ${isCollapsed ? 'justify-center' : 'px-6'} shrink-0 relative`}>
        <div className="flex items-center gap-3">
          <div className="bg-primary p-1.5 rounded-lg text-white shadow-sm shadow-primary/20 shrink-0">
            <span className="material-symbols-outlined text-[20px] leading-none filled-icon">smart_toy</span>
          </div>
          {!isCollapsed && (
            <span className="text-slate-900 dark:text-white text-lg font-bold tracking-tight animate-in fade-in duration-300 truncate">ClerkBot</span>
          )}
        </div>
        
        <button 
          onClick={onToggle}
          className={`absolute ${isCollapsed ? 'right-[-12px]' : 'right-4'} top-1/2 -translate-y-1/2 size-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm z-10 group`}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <span className="material-symbols-outlined text-[18px] transition-transform duration-300" style={{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            dock_to_left
          </span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide py-4 px-3">
        <nav className="space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              title={isCollapsed ? item.label : ''}
              className={({ isActive }) =>
                `flex items-center gap-3 ${isCollapsed ? 'justify-center' : 'px-3'} py-2.5 rounded-lg transition-all group ${
                  isActive 
                  ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`
              }
            >
              <span className={`material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:scale-110`}>{item.icon}</span>
              {!isCollapsed && (
                <span className="text-sm font-medium animate-in slide-in-from-left-2 duration-300 truncate">{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className={`p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm shrink-0 overflow-hidden`}>
        <nav className="space-y-1 mb-4">
          <NavLink 
            to="/settings"
            title={isCollapsed ? "Settings" : ""}
            className={({ isActive }) =>
              `flex w-full items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-3'} py-2 rounded-lg transition-colors group ${
                isActive 
                ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`
            }
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            {!isCollapsed && <span className="text-sm font-medium truncate">Settings</span>}
          </NavLink>
          <button 
            className={`flex w-full items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-3'} py-2 text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 rounded-lg transition-colors group`}
            title={isCollapsed ? "Sign Out" : ""}
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            {!isCollapsed && <span className="text-sm font-medium truncate">Sign Out</span>}
          </button>
        </nav>
        
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-3'} py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer hover:border-primary transition-colors group`}>
          <div className="relative shrink-0">
            <div 
              id="avatar-sidebar"
              className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center ring-2 ring-transparent group-hover:ring-primary/20 transition-all" 
              style={{ backgroundImage: `url("${user.avatar}")` }}
            />
            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white dark:border-slate-800"></div>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0 animate-in fade-in duration-500">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center rounded-md bg-violet-50 dark:bg-violet-900/30 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-violet-700 dark:text-violet-300 ring-1 ring-inset ring-violet-700/10">Pro</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
