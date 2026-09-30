import { useState } from 'react';
import ExportMenu from './ExportMenu';

const NAV_TABS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'upload',
    label: 'Analyse Capture',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
  },
  {
    id: 'history',
    label: 'History',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'compare',
    label: 'Compare',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export default function NavBar({ currentPage, source, onNavigate, onRefresh, sessions = [] }) {
  const isLive = source === 'live';
  const sessionCount = sessions.length || 10;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="glass-nav sticky top-0 z-40 border-b border-white/80">
        <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 shrink-0">
            {/* Menu Button */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-sky-50 text-slate-600 transition-colors mr-2 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* ── Brand & Tagline ── */}
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center p-0.5 bg-white border border-sky-100 shadow-sm overflow-hidden">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-slate-800 tracking-tight leading-tight">
                  SecureMailScope
                </span>
              </div>
              <p className="hidden md:block text-[10.5px] font-medium text-slate-500 tracking-tight leading-none mt-0.5">
                AI-Assisted Cryptographic Security Posture Assessment
              </p>
            </div>
          </div>

          {/* ── Right Status & Actions ── */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* PCAP Telemetry pill */}
            <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/65 border border-white/90 shadow-sm text-xs">
              <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="leading-tight">
                <p className="font-semibold text-slate-800 text-[11px]">
                  {isLive ? 'live_traffic.pcap' : 'sample_emails.pcap'}
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  {sessionCount} sessions · 2.4 MB
                </p>
              </div>
            </div>

            {/* Analysis Complete pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/65 border border-white/90 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 glow-pulse" />
              <div className="leading-tight">
                <p className="text-[11px] font-bold text-slate-700">Analysis Complete</p>
                <p className="text-[10px] text-slate-400 font-mono">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })}</p>
              </div>
            </div>

            <button
              onClick={onRefresh}
              title="Refresh Analysis Telemetry"
              className="glass-btn w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-sky-600 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <ExportMenu sessions={sessions} />
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="relative w-64 max-w-sm bg-white h-full shadow-2xl flex flex-col border-r border-sky-100 fade-up" style={{ animation: 'fadeUp 0.2s ease-out' }}>
            <div className="p-5 flex items-center justify-between border-b border-sky-50">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <img src="/logo.jpg" alt="Logo" className="w-7 h-7 rounded-lg object-cover border border-slate-100" />
                Menu
              </h2>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {NAV_TABS.map((tab) => {
                const active = currentPage === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onNavigate(tab.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      active
                        ? 'text-sky-700 bg-sky-50/80 shadow-sm border border-sky-100'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span className={active ? 'text-sky-600' : 'text-slate-400'}>
                      {tab.icon}
                    </span>
                    {tab.label}
                  </button>
                );
              })}
            </nav>
            
            <div className="p-4 border-t border-sky-50">
              <p className="text-[11px] text-center text-slate-400 font-medium">
                SecureMailScope © 2026
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
