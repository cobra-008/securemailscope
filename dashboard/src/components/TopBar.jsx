export default function TopBar({ source, sessionCount }) {
  const isLive = source === 'live';
  
  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0 w-full">
      
      {/* Left Area: File Selector */}
      <div className="flex items-center text-sm font-medium text-slate-600">
        <span className="text-slate-400 mr-2">Analysis:</span>
        <button className="flex items-center gap-1.5 hover:text-slate-900 focus:outline-none">
          {isLive ? 'live_traffic.pcap' : 'enterprise_mail_traffic.pcap'}
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative flex items-center">
          <svg className="w-4 h-4 absolute left-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search IPs, domains, certs, findings..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-14 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
          />
          <div className="absolute right-2 flex items-center justify-center bg-slate-100 border border-slate-200 rounded text-[10px] font-mono text-slate-500 px-1.5 py-0.5">
            Ctrl K
          </div>
        </div>
      </div>

      {/* Right Area: Status and Profile */}
      <div className="flex items-center gap-6">
        
        {/* Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-900 rounded-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[10px] font-bold tracking-wider text-emerald-100">PASSIVE ANALYSIS</span>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-3">
          <button className="text-slate-400 hover:text-slate-600 relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-sky-500 border border-white"></span>
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 border-l border-slate-200 pl-6 cursor-pointer hover:opacity-80">
          <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <span className="text-sm font-semibold text-slate-700">SOC Analyst</span>
        </div>

      </div>
    </header>
  );
}
