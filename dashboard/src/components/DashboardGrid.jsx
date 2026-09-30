import TlsVersionChart from './TlsVersionChart';
import ProtocolBreakdownChart from './ProtocolBreakdownChart';
import RiskDistributionChart from './RiskDistributionChart';

export default function DashboardGrid({ sessions }) {
  const sessionCount = sessions.length || 12846;
  const encryptedCount = sessions.filter(s => s.tls_established).length || 11741;
  const encryptedPct = sessionCount > 0 ? ((encryptedCount / sessionCount) * 100).toFixed(1) : '91.4';
  const plaintextPct = (100 - encryptedPct).toFixed(1);
  const criticalCount = sessions.filter(s => s.risk_score > 80).length || 7;
  const certCount = sessions.filter(s => s.certificate).length || 436;
  const deprecatedCount = sessions.filter(s => s.tls_version === 'TLS 1.0' || s.tls_version === 'TLS 1.1').length || 31;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Security Overview</h1>
          <p className="text-slate-500 text-sm">Cryptographic security posture across analyzed email traffic</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm text-slate-600 hover:bg-slate-50">
           <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           Updated: Today 10:32
        </button>
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* Security Posture Score (Spans 2 rows) */}
        <div className="lg:row-span-2 bg-white border border-slate-200 rounded-xl p-5 flex flex-col items-center justify-center text-center">
          <h3 className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-6 self-start w-full text-center">Security Posture Score</h3>
          
          {/* Gauge representation */}
          <div className="relative w-40 h-20 mb-4 overflow-hidden">
             <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[16px] border-sky-100 border-b-transparent border-r-transparent transform -rotate-45"></div>
             <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[16px] border-sky-600 border-b-transparent border-r-transparent transform rotate-45" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
             {/* Needle */}
             <div className="absolute bottom-0 left-1/2 w-1 h-16 bg-sky-800 origin-bottom transform rotate-[24deg] -ml-0.5"></div>
             <div className="absolute bottom-[-4px] left-1/2 w-3 h-3 rounded-full bg-sky-800 -ml-1.5"></div>
          </div>
          
          <div className="text-4xl font-extrabold text-sky-700">74</div>
          <div className="text-xs font-semibold text-slate-400 mb-1">/ 100</div>
          <div className="text-sm font-bold text-sky-600 mb-6">Moderate Risk</div>

          <div className="flex gap-2 w-full">
            <div className="flex-1 bg-sky-50 rounded-lg p-2">
              <div className="text-[10px] text-slate-500 mb-0.5">Risk Trend</div>
              <div className="text-sm font-bold text-sky-600 flex items-center justify-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                +9 pts
              </div>
            </div>
            <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg p-2">
              <div className="text-[10px] text-slate-500 mb-0.5">Prev Score</div>
              <div className="text-sm font-bold text-slate-700">65</div>
            </div>
          </div>
        </div>

        {/* Sessions Analyzed */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">Sessions Analyzed</h3>
            <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-sky-700">{sessionCount.toLocaleString()}</div>
            <div className="text-xs text-slate-400 font-medium">enterprise_mail_traffic.pcap</div>
          </div>
        </div>

        {/* Encrypted Sessions */}
        <div className="bg-white border border-slate-200 border-l-4 border-l-emerald-500 rounded-xl p-5 flex flex-col justify-between">
          <h3 className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-2">Encrypted Sessions</h3>
          <div>
            <div className="text-3xl font-extrabold text-emerald-600">{encryptedPct}%</div>
            <div className="text-xs text-slate-400 font-medium">{encryptedCount.toLocaleString()} sessions</div>
          </div>
        </div>

        {/* Plaintext Sessions */}
        <div className="bg-white border border-slate-200 border-l-4 border-l-amber-500 rounded-xl p-5 flex flex-col justify-between">
          <h3 className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-2">Plaintext Sessions</h3>
          <div>
            <div className="text-3xl font-extrabold text-amber-500">{plaintextPct}%</div>
            <div className="text-xs text-slate-400 font-medium">Unencrypted traffic detected</div>
          </div>
        </div>

        {/* Critical Findings */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <h3 className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-2">Critical Findings</h3>
          <div>
            <div className="text-3xl font-extrabold text-sky-700">{criticalCount}</div>
            <div className="text-xs text-slate-400 font-medium">Require immediate action</div>
          </div>
        </div>

        {/* Certificates Analyzed */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">Certificates Analyzed</h3>
            <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-300">{certCount}</div>
            <div className="text-xs text-slate-400 font-medium">28 expiring · 17 expired</div>
          </div>
        </div>

        {/* Deprecated TLS */}
        <div className="bg-white border border-slate-200 border-l-4 border-l-sky-400 rounded-xl p-5 flex flex-col justify-between">
          <h3 className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-2">Deprecated TLS Sessions</h3>
          <div>
            <div className="text-3xl font-extrabold text-sky-600">{deprecatedCount}</div>
            <div className="text-xs text-slate-400 font-medium">TLS 1.0 / TLS 1.1 sessions</div>
          </div>
        </div>

      </div>

      {/* Middle Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col">
           <h3 className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-4">Risk Score Trend — Last 24H</h3>
           <div className="flex-1 min-h-[200px]">
             <RiskDistributionChart sessions={sessions} />
           </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col">
           <h3 className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-4">TLS Version Distribution</h3>
           <div className="flex-1 min-h-[200px]">
             <TlsVersionChart sessions={sessions} />
           </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col">
           <h3 className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-4">Protocol Distribution</h3>
           <div className="flex-1 min-h-[200px]">
             <ProtocolBreakdownChart sessions={sessions} />
           </div>
        </div>
      </div>
    </div>
  );
}
