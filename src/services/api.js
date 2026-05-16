import { mockAgentsData, mockAgentActivity } from '../data/agentsData';
import { mockDetails, mockCommits, mockFiles, mockGraphNodes, mockGraphEdges } from '../data/explorerData';
import { mockEvents } from '../data/timelineData';
import { mockMetrics, mockStack } from '../data/architectureData';
import { mockActivityData, mockDistributionData, mockCommitData } from '../data/insightsData';
import { mockReportSummary } from '../data/reportsData';

// Simulated Network Delay
const FAKE_DELAY_MS = 800;

const simulateApiCall = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, FAKE_DELAY_MS);
  });
};

// Agents Module
export const getAgents = async () => {
  return simulateApiCall(mockAgentsData);
};

export const getAgentActivity = async () => {
  return simulateApiCall(mockAgentActivity);
};

// Explorer Module
export const getRepositoryDetails = async () => {
  return simulateApiCall(mockDetails);
};

export const getRepositoryCommits = async () => {
  return simulateApiCall(mockCommits);
};

export const getRepositoryFiles = async () => {
  return simulateApiCall(mockFiles);
};

export const getRepositoryGraph = async () => {
  return simulateApiCall({ nodes: mockGraphNodes, edges: mockGraphEdges });
};

// Timeline Module
export const getTimelineEvents = async () => {
  return simulateApiCall(mockEvents);
};

// Architecture Module
export const getArchitectureMetrics = async () => {
  return simulateApiCall(mockMetrics);
};

export const getArchitectureStack = async () => {
  return simulateApiCall(mockStack);
};

// Insights Module
export const getInsightsActivity = async () => {
  return simulateApiCall(mockActivityData);
};

export const getInsightsDistribution = async () => {
  return simulateApiCall(mockDistributionData);
};

export const getInsightsHotspots = async () => {
  // Not currently mocked in UI, returning empty
  return simulateApiCall([]);
};

export const getImpactfulCommits = async () => {
  return simulateApiCall(mockCommitData);
};

// Reports Module
export const getReportsSummary = async () => {
  return simulateApiCall(mockReportSummary);
};

