import React, { useState, useEffect } from 'react';
import EvolutionGraph from '../components/explorer/EvolutionGraph';
import SearchResults from '../components/explorer/SearchResults';
import GlassCard from '../components/shared/GlassCard';
import { GitMerge, Users, Calendar, Code2, FileText, AlertTriangle, X, ExternalLink, GitCommit, Search } from 'lucide-react';
import GithubIcon from '../components/shared/GithubIcon';
import { getRepositoryDetails, getRepositoryCommits, getRepositoryFiles } from '../services/api';

// ── Extended mock data for modals ─────────────────────────────────────────
const allMockCommits = [
  { message: 'chore: update redis dependency', author: 'l0m1n2o', date: 'Apr 02, 2024', hash: 'a1b2c3d', status: 'merged' },
  { message: 'fix: handle redis connection leak', author: 'p3q4r5s', date: 'Apr 01, 2024', hash: 'b2c3d4e', status: 'merged' },
  { message: 'feat: add redis health check', author: 't6u7v8w', date: 'Mar 29, 2024', hash: 'c3d4e5f', status: 'merged' },
  { message: 'refactor: redis client abstraction', author: 'x9y0z1a', date: 'Mar 27, 2024', hash: 'd4e5f6g', status: 'merged' },
  { message: 'feat(auth): integrate oauth with auth0', author: 'jane.doe', date: 'Mar 02, 2024', hash: 'e5f6g7h', status: 'merged' },
  { message: 'feat(session): add redis session store', author: 'john.smith', date: 'Mar 03, 2024', hash: 'f6g7h8i', status: 'merged' },
  { message: 'refactor: improve token handling', author: 'jane.doe', date: 'Feb 12, 2024', hash: 'g7h8i9j', status: 'merged' },
  { message: 'fix(core): memory leak in worker pool', author: 'l0m1n2o', date: 'Feb 05, 2024', hash: 'h8i9j0k', status: 'merged' },
  { message: 'chore: bump dependencies to latest', author: 'p3q4r5s', date: 'Jan 28, 2024', hash: 'i9j0k1l', status: 'merged' },
  { message: 'feat: add notification service scaffold', author: 'john.smith', date: 'Jan 15, 2024', hash: 'j0k1l2m', status: 'merged' },
  { message: 'fix: payment webhook validation', author: 'jane.doe', date: 'Jan 10, 2024', hash: 'k1l2m3n', status: 'hotfix' },
  { message: 'docs: update API documentation', author: 't6u7v8w', date: 'Jan 05, 2024', hash: 'l2m3n4o', status: 'merged' },
];

const allMockFiles = [
  { path: 'src/config/redis.ts', date: 'Modified Apr 02, 2024', size: '3.2 KB', type: 'config' },
  { path: 'src/services/session/redisStore.ts', date: 'Modified Apr 01, 2024', size: '8.7 KB', type: 'service' },
  { path: 'docker/redis/Dockerfile', date: 'Modified Apr 02, 2024', size: '1.1 KB', type: 'docker' },
  { path: 'src/middleware/redisClient.ts', date: 'Modified Mar 12, 2024', size: '4.5 KB', type: 'middleware' },
  { path: 'src/auth/oauth.ts', date: 'Modified Mar 02, 2024', size: '12.4 KB', type: 'auth' },
  { path: 'src/middleware/auth.ts', date: 'Modified Mar 02, 2024', size: '6.1 KB', type: 'middleware' },
  { path: 'src/config/oauth.config.ts', date: 'Modified Mar 02, 2024', size: '2.3 KB', type: 'config' },
  { path: 'src/controllers/auth.ts', date: 'Modified Feb 28, 2024', size: '9.8 KB', type: 'controller' },
  { path: 'src/services/token.ts', date: 'Modified Feb 12, 2024', size: '5.2 KB', type: 'service' },
  { path: 'tests/token.test.ts', date: 'Modified Feb 12, 2024', size: '4.0 KB', type: 'test' },
  { path: 'src/services/notification.ts', date: 'Modified Jan 15, 2024', size: '7.6 KB', type: 'service' },
  { path: 'src/models/user.ts', date: 'Modified Jan 10, 2024', size: '3.9 KB', type: 'model' },
];

const GITHUB_REPO_URL = 'https://github.com/company/backend';

// ── Reusable Modal ────────────────────────────────────────────────────────
const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-[#0d0d14] border border-border rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col"
        style={{ animation: 'fadeInScale 0.18s ease' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <h3 className="font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1 rounded hover:bg-white/5">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-4">{children}</div>
      </div>
      <style>{`@keyframes fadeInScale { from { opacity:0; transform:scale(0.96);} to { opacity:1; transform:scale(1);} }`}</style>
    </div>
  );
};

// ── Explorer Page ─────────────────────────────────────────────────────────
const Explorer = ({ searchQuery }) => {
  const isSearchActive = searchQuery.length > 0;
  const [details, setDetails] = useState(null);
  const [commits, setCommits] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null); // 'github' | 'commits' | 'files'
  const [commitSearch, setCommitSearch] = useState('');
  const [fileSearch, setFileSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [detailsRes, commitsRes, filesRes] = await Promise.all([
          getRepositoryDetails(),
          getRepositoryCommits(),
          getRepositoryFiles()
        ]);
        setDetails(detailsRes);
        setCommits(commitsRes);
        setFiles(filesRes);
      } catch (err) {
        console.error('Failed to fetch repository data:', err);
        setError('Unable to load repository data. Please check your simulated API connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCommits = allMockCommits.filter(c =>
    c.message.toLowerCase().includes(commitSearch.toLowerCase()) ||
    c.author.toLowerCase().includes(commitSearch.toLowerCase()) ||
    c.hash.includes(commitSearch.toLowerCase())
  );

  const filteredFiles = allMockFiles.filter(f =>
    f.path.toLowerCase().includes(fileSearch.toLowerCase()) ||
    f.type.toLowerCase().includes(fileSearch.toLowerCase())
  );

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center h-[calc(100vh-100px)]">
        <div className="bg-risk/10 border border-risk/30 rounded-lg p-6 max-w-md text-center">
          <AlertTriangle className="w-8 h-8 text-risk mx-auto mb-3" />
          <h3 className="text-risk font-semibold mb-2">Connection Error</h3>
          <p className="text-gray-400 text-sm">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-panel border border-border rounded text-sm hover:text-white transition-colors">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* GitHub Modal */}
      <Modal isOpen={modal === 'github'} onClose={() => setModal(null)} title="Repository on GitHub">
        <div className="space-y-5">
          <div className="bg-panel/50 border border-border/50 rounded-lg p-5 flex items-start gap-4">
            <GithubIcon className="w-10 h-10 text-gray-300 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-white font-semibold text-lg">company / backend</h4>
              <p className="text-gray-400 text-sm mt-1">AI-powered backend service with OAuth2, Redis session management, and microservices architecture.</p>
              <div className="flex gap-4 mt-3 text-xs text-gray-500">
                <span>⭐ 247 stars</span>
                <span>🍴 38 forks</span>
                <span>🔒 Private</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Default Branch', value: details?.defaultBranch ?? 'main', color: 'text-primary' },
              { label: 'Language', value: details?.language ?? 'TypeScript', color: 'text-blue-400' },
              { label: 'Total Commits', value: details?.totalCommits ?? '1,248', color: 'text-white' },
              { label: 'Contributors', value: details?.contributors ?? 3, color: 'text-white' },
            ].map(item => (
              <div key={item.label} className="bg-panel/40 border border-border/50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                <p className={`font-semibold ${item.color}`}>{item.value}</p>
              </div>
            ))}
          </div>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary/20 border border-primary/50 text-primary rounded-lg hover:bg-primary/30 transition-colors text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" /> Open in GitHub
          </a>
          <p className="text-xs text-gray-600 text-center italic">Demo mode — link opens a placeholder GitHub URL.</p>
        </div>
      </Modal>

      {/* All Commits Modal */}
      <Modal isOpen={modal === 'commits'} onClose={() => setModal(null)} title={`All Commits (${allMockCommits.length})`}>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by message, author or hash..."
            value={commitSearch}
            onChange={e => setCommitSearch(e.target.value)}
            className="w-full bg-panel border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-primary/50"
          />
        </div>
        <div className="space-y-2">
          {filteredCommits.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">No commits match your search.</p>
          ) : filteredCommits.map((commit, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-panel/40 border border-border/40 rounded-lg hover:border-primary/30 transition-colors group cursor-pointer">
              <GitCommit className="w-4 h-4 text-safe mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-gray-200 text-sm group-hover:text-primary transition-colors truncate">{commit.message}</p>
                <p className="text-xs text-gray-500 mt-1 font-mono">{commit.hash} · {commit.author} · {commit.date}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border flex-shrink-0 mt-0.5 ${commit.status === 'hotfix' ? 'text-risk border-risk/30 bg-risk/10' : 'text-safe border-safe/30 bg-safe/10'}`}>
                {commit.status}
              </span>
            </div>
          ))}
        </div>
      </Modal>

      {/* All Files Modal */}
      <Modal isOpen={modal === 'files'} onClose={() => setModal(null)} title={`All Changed Files (${allMockFiles.length})`}>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by path or type..."
            value={fileSearch}
            onChange={e => setFileSearch(e.target.value)}
            className="w-full bg-panel border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-primary/50"
          />
        </div>
        <div className="space-y-2">
          {filteredFiles.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">No files match your search.</p>
          ) : filteredFiles.map((file, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-panel/40 border border-border/40 rounded-lg hover:border-primary/30 transition-colors group cursor-pointer">
              <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-gray-200 text-sm group-hover:text-primary transition-colors font-mono truncate">{file.path}</p>
                <p className="text-xs text-gray-500 mt-0.5">{file.date} · {file.size}</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded border border-border/50 text-gray-500 flex-shrink-0">{file.type}</span>
            </div>
          ))}
        </div>
      </Modal>

      {/* Main Page */}
      <div className="p-6 max-w-7xl mx-auto pb-32">
        <EvolutionGraph isSearchActive={isSearchActive} />

        {isSearchActive ? (
          <SearchResults query={searchQuery} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">

            {/* Details Card */}
            <GlassCard className="flex flex-col gap-4">
              <h3 className="font-semibold text-white mb-2">Details</h3>
              {loading ? (
                <div className="flex-1 flex items-center justify-center py-8">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex items-center justify-between"><span className="text-gray-400 flex items-center gap-2"><GitMerge className="w-4 h-4"/>Repository</span><span className="text-gray-200">{details.repository}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-400 flex items-center gap-2"><GitMerge className="w-4 h-4"/>Default Branch</span><span className="text-gray-200 bg-primary/20 border border-primary/30 text-primary px-2 py-0.5 rounded text-xs font-medium">{details.defaultBranch}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-400 flex items-center gap-2"><GitMerge className="w-4 h-4"/>Total Branches</span><span className="text-gray-200">{details.totalBranches}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-400 flex items-center gap-2"><GitMerge className="w-4 h-4"/>Total Commits</span><span className="text-gray-200">{details.totalCommits}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-400 flex items-center gap-2"><Users className="w-4 h-4"/>Contributors</span><span className="text-gray-200">{details.contributors}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-400 flex items-center gap-2"><Calendar className="w-4 h-4"/>First Commit</span><span className="text-gray-200">{details.firstCommit}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-400 flex items-center gap-2"><Calendar className="w-4 h-4"/>Last Commit</span><span className="text-gray-200">{details.lastCommit}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-400 flex items-center gap-2"><Code2 className="w-4 h-4"/>Language</span><span className="text-gray-200">{details.language}</span></div>
                </div>
              )}
              <button onClick={() => setModal('github')} className="text-primary text-sm mt-2 flex items-center gap-1 hover:underline">
                View on GitHub <GithubIcon className="w-3 h-3" />
              </button>
            </GlassCard>

            {/* Commits Card */}
            <GlassCard className="flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-white">Commits</h3>
                <button onClick={() => { setCommitSearch(''); setModal('commits'); }} className="text-xs text-primary hover:underline cursor-pointer">View all</button>
              </div>
              <div className="flex flex-col gap-4 text-sm flex-1">
                {loading ? (
                  <div className="flex-1 flex items-center justify-center py-8">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  commits.map((commit, idx) => (
                    <div key={idx} className={idx < commits.length - 1 ? 'flex gap-3 border-b border-border/30 pb-2' : 'flex gap-3'}>
                      <div className="w-2 h-2 rounded-full bg-safe mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      <div>
                        <p className="text-gray-200 hover:text-primary cursor-pointer transition-colors line-clamp-1" onClick={() => { setCommitSearch(''); setModal('commits'); }}>{commit.message}</p>
                        <p className="text-xs text-gray-500 mt-0.5 font-mono">{commit.author} • {commit.date}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <button onClick={() => { setCommitSearch(''); setModal('commits'); }} className="text-primary text-sm mt-auto hover:underline text-left">View all commits →</button>
            </GlassCard>

            {/* Files Card */}
            <GlassCard className="flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-white">Files</h3>
                <button onClick={() => { setFileSearch(''); setModal('files'); }} className="text-xs text-primary hover:underline cursor-pointer">View all</button>
              </div>
              <div className="flex flex-col gap-4 text-sm flex-1">
                {loading ? (
                  <div className="flex-1 flex items-center justify-center py-8">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  files.map((file, idx) => (
                    <div key={idx} className={idx < files.length - 1 ? 'flex gap-3 border-b border-border/30 pb-2' : 'flex gap-3'}>
                      <FileText className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-200 hover:text-primary cursor-pointer transition-colors line-clamp-1" onClick={() => { setFileSearch(''); setModal('files'); }}>{file.path}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{file.date}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <button onClick={() => { setFileSearch(''); setModal('files'); }} className="text-primary text-sm mt-auto hover:underline text-left">View all files →</button>
            </GlassCard>
          </div>
        )}
      </div>
    </>
  );
};

export default Explorer;
