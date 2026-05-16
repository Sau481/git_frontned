import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import InvestigationBar from '../components/layout/InvestigationBar';

// Lazy load pages to improve initial load time
const Explorer = lazy(() => import('../pages/Explorer'));
const Timeline = lazy(() => import('../pages/Timeline'));
const Architecture = lazy(() => import('../pages/Architecture'));
const Insights = lazy(() => import('../pages/Insights'));
const Agents = lazy(() => import('../pages/Agents'));
const Reports = lazy(() => import('../pages/Reports'));

// Loading fallback for lazy routes
const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center h-full">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const AppLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-screen bg-background text-white font-sans overflow-hidden">
      <Sidebar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="flex-1 flex flex-col relative">
        <Navbar />
        <main className="flex-1 overflow-y-auto relative z-10 hide-scrollbar">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Navigate to="/explorer" replace />} />
              <Route path="/explorer" element={<Explorer searchQuery={searchQuery} />} />
              <Route path="/timeline" element={<Timeline searchQuery={searchQuery} />} />
              <Route path="/architecture" element={<Architecture searchQuery={searchQuery} />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </Suspense>
        </main>
        <div className="flex-shrink-0 relative z-50">
          <InvestigationBar />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
