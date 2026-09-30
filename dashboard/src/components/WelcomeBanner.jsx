export default function WelcomeBanner() {
  return (
    <div className="glass-card rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 border-l-sky-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          Security Dashboard Overview
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Monitor your cryptographic posture, analyze TLS handshakes, and detect anomalies.
        </p>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-center px-5 py-2.5 rounded-2xl bg-sky-50/80 border border-sky-100">
        <div className="flex items-center gap-2 text-sky-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-sm font-semibold">System Active</span>
        </div>
      </div>
    </div>
  );
}
