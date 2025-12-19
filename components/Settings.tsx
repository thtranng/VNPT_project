
import React, { useState, useRef, useEffect } from 'react';
import { Participant } from '../types';

const Settings: React.FC<{ 
  user: Participant;
  onUserUpdate: (user: Participant) => void;
}> = ({ user, onUserUpdate }) => {
  const [activeTab, setActiveTab] = useState('account');
  const [theme, setTheme] = useState('light');

  const navItems = [
    { id: 'account', label: 'My Account', icon: 'person' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'billing', label: 'Billing & Plans', icon: 'payments' },
  ];

  return (
    <div id="settings-view" className="flex-1 h-full bg-white dark:bg-slate-900 transition-all duration-300 ease-in-out overflow-y-auto">
      <div className="max-w-4xl mx-auto px-8 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Settings</h1>
        </header>

        <div className="flex gap-12">
          <aside className="w-56 shrink-0">
            <nav className="flex flex-col gap-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    activeTab === item.id ? 'bg-primary/10 text-primary' : 'text-slate-500'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          <main className="flex-1">
            <section className="space-y-6">
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 font-bold" defaultValue={user.name} />
                  </div>
               </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;
