import axios from 'axios';

// Base API configuration
const API_BASE_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Agents Module
export const getAgents = async () => {
  const response = await apiClient.get('/agents');
  return response.data;
};

export const getAgentActivity = async () => {
  const response = await apiClient.get('/agents/activity');
  return response.data;
};

// Explorer Module
export const getRepositoryDetails = async () => {
  const response = await apiClient.get('/repository/details');
  return response.data;
};

export const getRepositoryCommits = async () => {
  const response = await apiClient.get('/repository/commits');
  return response.data;
};

export const getRepositoryFiles = async () => {
  const response = await apiClient.get('/repository/files');
  return response.data;
};

export const getRepositoryGraph = async () => {
  const response = await apiClient.get('/repository/graph');
  return response.data;
};

// Timeline Module
export const getTimelineEvents = async () => {
  const response = await apiClient.get('/timeline/events');
  return response.data;
};

// Architecture Module
export const getArchitectureMetrics = async () => {
  const response = await apiClient.get('/architecture/metrics');
  return response.data;
};

export const getArchitectureStack = async () => {
  const response = await apiClient.get('/architecture/stack');
  return response.data;
};

// Insights Module
export const getInsightsActivity = async () => {
  const response = await apiClient.get('/insights/activity');
  return response.data;
};

export const getInsightsDistribution = async () => {
  const response = await apiClient.get('/insights/distribution');
  return response.data;
};

export const getInsightsHotspots = async () => {
  const response = await apiClient.get('/insights/hotspots');
  return response.data;
};

export const getImpactfulCommits = async () => {
  const response = await apiClient.get('/insights/impactful-commits');
  return response.data;
};

// Reports Module
export const getReportsSummary = async () => {
  const response = await apiClient.get('/reports/summary');
  return response.data;
};

