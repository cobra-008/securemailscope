import { useEffect, useState } from 'react';
import { fetchSessions } from './lib/api';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import DashboardGrid from './components/DashboardGrid';
import SessionDetail from './components/SessionDetail';
import UploadPage from './pages/UploadPage';
import ComparePage from './pages/ComparePage';
import HistoryPage from './pages/HistoryPage';

export default function App() {
  const [page, setPage]             = useState('dashboard');
  const [sessions, setSessions]     = useState([]);
  const [source, setSource]         = useState(null);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);
  const [selected, setSelected]     = useState(null);
  
  // Compare Page State
  const [compareInitialData, setCompareInitialData] = useState(null);

  // Action History State (persisted in localStorage)
  const [actionHistory, setActionHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('sms_action_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('sms_action_history', JSON.stringify(actionHistory));
  }, [actionHistory]);

  const addActionToHistory = (type, files, data) => {
    setActionHistory(prev => {
      const newItem = { id: Date.now().toString(), type, files, data, timestamp: Date.now() };
      return [newItem, ...prev].slice(0, 10);
    });
  };

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const { sessions: data, source: src } = await fetchSessions();
      setSessions(data);
      setSource(src);
    } catch {
      setError('Could not load session telemetry.');
    } finally {
      setLoading(false);
    }
  }

  function handleAnalysisComplete(enrichedSessions, filename) {
    if (enrichedSessions) {
      setSessions(enrichedSessions);
      setSource('live');
      if (filename) {
        addActionToHistory('analyze', [filename], enrichedSessions);
      }
    } else {
      load();
    }
    setSelected(null);
    setPage('dashboard');
  }

  function handleCompare(filenames, datasets, readySlots) {
    if (filenames && filenames.length > 0) {
      addActionToHistory('compare', filenames, { datasets, readySlots });
    }
  }

  function handleHistoryItemClick(item) {
    if (item.type === 'analyze') {
      setSessions(item.data);
      setSource('live');
      setSelected(null);
      setPage('dashboard');
    } else if (item.type === 'compare') {
      setCompareInitialData(item.data);
      setPage('compare');
    }
  }

  function handleLoadHistoryRun(historySessions) {
    if (historySessions && historySessions.length > 0) {
      setSessions(historySessions);
      setSource('live');
      setSelected(null);
      setPage('dashboard');
    }
  }

  useEffect(() => {
    if (sessions.length === 0) {
      load();
    }
  }, []);

  return (
    <div className="flex h-screen bg-white overflow-hidden text-slate-800 font-sans">
      <Sidebar 
        activePage={page} 
        onNavigate={(p) => {
          if (p === 'dashboard' && sessions.length === 0) load();
          if (p === 'compare') setCompareInitialData(null); 
          setPage(p);
        }} 
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar source={source} sessionCount={sessions.length || 10} />
        
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6">
          {page === 'upload' && <UploadPage onComplete={handleAnalysisComplete} />}
          {page === 'history' && <HistoryPage onLoadRun={handleLoadHistoryRun} />}
          {page === 'compare' && <ComparePage onCompare={handleCompare} initialData={compareInitialData} />}
          {page === 'dashboard' && (
            <div className="max-w-[1400px] mx-auto fade-up">
              {loading && (
                <div className="py-24 flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-3 border-sky-300 border-t-sky-600 spin" />
                  <p className="text-sm font-semibold text-slate-600">Loading session telemetry…</p>
                </div>
              )}
              {error && (
                <div className="glass-card rounded-2xl p-4 border-rose-200 flex items-center justify-between gap-4">
                  <span className="text-sm text-rose-600 font-semibold">{error}</span>
                  <button onClick={load} className="px-4 py-1.5 bg-rose-500 text-white rounded-xl text-xs font-bold cursor-pointer">Retry</button>
                </div>
              )}
              {!loading && !error && <DashboardGrid sessions={sessions} />}
            </div>
          )}
        </main>
      </div>

      {selected && <SessionDetail session={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
