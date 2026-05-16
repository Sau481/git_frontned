import React, { useState, useEffect } from 'react';
import EvolutionGraph from '../components/explorer/EvolutionGraph';
import SearchResults from '../components/explorer/SearchResults';
import GlassCard from '../components/shared/GlassCard';
import { GitMerge, Users, Calendar, Code2, FileText } from 'lucide-react';
import GithubIcon from '../components/shared/GithubIcon';
import { getRepositoryDetails, getRepositoryCommits, getRepositoryFiles } from '../services/api';

const mockDetails = {
  repository: 'backend',
  defaultBranch: 'main',
  totalBranches: 18,
  totalCommits: '1,248',
  contributors: 3,
  firstCommit: 'Jan 05, 2024',
  lastCommit: 'Apr 30, 2024',
  language: 'TypeScript'
};

const mockCommits = [
  { message: 'chore: update redis dependency', author: 'l0m1n2o', date: 'Apr 02, 2024' },
  { message: 'fix: handle redis connection leak', author: 'p3q4r5s', date: 'Apr 01, 2024' },
  { message: 'feat: add redis health check', author: 't6u7v8w', date: 'Mar 29, 2024' },
  { message: 'refactor: redis client abstraction', author: 'x9y0z1a', date: 'Mar 27, 2024' }
];

const mockFiles = [
  { path: 'src/config/redis.ts', date: 'Modified Mar 03, 2024' },
  { path: 'src/services/session/redisStore.ts', date: 'Modified Mar 05, 2024' },
  { path: 'docker/redis/Dockerfile', date: 'Modified Apr 02, 2024' },
  { path: 'src/middleware/redisClient.ts', date: 'Modified Mar 12, 2024' }
];

const Explorer = ({ searchQuery }) => {
  const isSearchActive = searchQuery.length > 0;
  const [details, setDetails] = useState(null);
  const [commits, setCommits] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsRes, commitsRes, filesRes] = await Promise.all([
          getRepositoryDetails(),
          getRepositoryCommits(),
          getRepositoryFiles()
        ]);
        setDetails(detailsRes);
        setCommits(commitsRes);
        setFiles(filesRes);
      } catch (err) {
        console.warn("Backend not connected, using mock data in Explorer");
        setDetails(mockDetails);
        setCommits(mockCommits);
        setFiles(mockFiles);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
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
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-2"><GitMerge className="w-4 h-4"/> Repository</span>
                  <span className="text-gray-200">{details.repository}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-2"><GitMerge className="w-4 h-4"/> Default Branch</span>
                  <span className="text-gray-200 bg-primary/20 border border-primary/30 text-primary px-2 py-0.5 rounded text-xs font-medium">{details.defaultBranch}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-2"><GitMerge className="w-4 h-4"/> Total Branches</span>
                  <span className="text-gray-200">{details.totalBranches}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-2"><GitMerge className="w-4 h-4"/> Total Commits</span>
                  <span className="text-gray-200">{details.totalCommits}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-2"><Users className="w-4 h-4"/> Contributors</span>
                  <span className="text-gray-200">{details.contributors}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-2"><Calendar className="w-4 h-4"/> First Commit</span>
                  <span className="text-gray-200">{details.firstCommit}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-2"><Calendar className="w-4 h-4"/> Last Commit</span>
                  <span className="text-gray-200">{details.lastCommit}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-2"><Code2 className="w-4 h-4"/> Language</span>
                  <span className="text-gray-200">{details.language}</span>
                </div>
              </div>
            )}
            <a href="#" className="text-primary text-sm mt-2 flex items-center gap-1 hover:underline">View on GitHub <GithubIcon className="w-3 h-3" /></a>
          </GlassCard>

          {/* Commits Card */}
          <GlassCard className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-white">Commits</h3>
              <span className="text-xs text-primary hover:underline cursor-pointer">View all</span>
            </div>
            <div className="flex flex-col gap-4 text-sm flex-1">
              {loading ? (
                <div className="flex-1 flex items-center justify-center py-8">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                commits.map((commit, idx) => (
                  <div key={idx} className={idx < commits.length - 1 ? "flex gap-3 border-b border-border/30 pb-2" : "flex gap-3"}>
                    <div className="w-2 h-2 rounded-full bg-safe mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                    <div>
                      <p className="text-gray-200 hover:text-primary cursor-pointer transition-colors line-clamp-1">{commit.message}</p>
                      <p className="text-xs text-gray-500 mt-0.5 font-mono">{commit.author} • {commit.date}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <a href="#" className="text-primary text-sm mt-auto hover:underline">View all commits →</a>
          </GlassCard>

          {/* Files Card */}
          <GlassCard className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-white">Files</h3>
              <span className="text-xs text-primary hover:underline cursor-pointer">View all</span>
            </div>
            <div className="flex flex-col gap-4 text-sm flex-1">
              {loading ? (
                <div className="flex-1 flex items-center justify-center py-8">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                files.map((file, idx) => (
                  <div key={idx} className={idx < files.length - 1 ? "flex gap-3 border-b border-border/30 pb-2" : "flex gap-3"}>
                    <FileText className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-200 hover:text-primary cursor-pointer transition-colors line-clamp-1">{file.path}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{file.date}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <a href="#" className="text-primary text-sm mt-auto hover:underline">View all files →</a>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default Explorer;
