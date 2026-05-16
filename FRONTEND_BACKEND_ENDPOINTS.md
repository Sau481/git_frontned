# Code Archaeology API Endpoints Contract

This document outlines the required backend REST API endpoints needed to support the dynamic frontend of the Code Archaeology platform. All endpoints should return standard JSON responses and are designed to be consumed by the frontend application.

## Base URL
`http://localhost:8000/api`

---

## 1. Agents Module

### 1.1. Get All Agents
- **Endpoint:** `GET /agents`
- **Description:** Retrieves the current list of active and idle AI agents orchestrating repository analysis.
- **Response Format:**
  ```json
  [
    {
      "id": "ag-core-1",
      "name": "Codebase Mapper",
      "type": "Analyzer",
      "status": "Active",
      "uptime": "14h 22m",
      "tasksCompleted": 124,
      "currentTask": "Parsing src/auth/oauth.ts AST",
      "icon": "Box",
      "color": "text-blue-400"
    }
  ]
  ```

### 1.2. Get Agent Activity Log
- **Endpoint:** `GET /agents/activity`
- **Description:** Retrieves the recent task activity logs for all agents.
- **Response Format:**
  ```json
  [
    {
      "id": 1,
      "agent": "Codebase Mapper",
      "task": "Analyzed src/auth/oauth.ts",
      "status": "Success",
      "duration": "1.2s",
      "time": "2 mins ago"
    }
  ]
  ```

---

## 2. Explorer Module

### 2.1. Get Repository Details
- **Endpoint:** `GET /repository/details`
- **Description:** Retrieves high-level metadata about the repository.
- **Response Format:**
  ```json
  {
    "repository": "backend",
    "defaultBranch": "main",
    "totalBranches": 18,
    "totalCommits": "1,248",
    "contributors": 3,
    "firstCommit": "Jan 05, 2024",
    "lastCommit": "Apr 30, 2024",
    "language": "TypeScript"
  }
  ```

### 2.2. Get Recent Commits
- **Endpoint:** `GET /repository/commits`
- **Description:** Retrieves the list of recent commits for the repository.
- **Response Format:**
  ```json
  [
    {
      "message": "chore: update redis dependency",
      "author": "l0m1n2o",
      "date": "Apr 02, 2024"
    }
  ]
  ```

### 2.3. Get Changed Files
- **Endpoint:** `GET /repository/files`
- **Description:** Retrieves the list of recently modified files.
- **Response Format:**
  ```json
  [
    {
      "path": "src/config/redis.ts",
      "date": "Modified Mar 03, 2024"
    }
  ]
  ```

### 2.4. Get Evolution Graph
- **Endpoint:** `GET /repository/graph`
- **Description:** Retrieves nodes and edges for rendering the repository evolution graph (React Flow).
- **Response Format:**
  ```json
  {
    "nodes": [
      {
        "id": "1",
        "position": { "x": 50, "y": 100 },
        "data": { "label": "Initial Setup" },
        "style": { "backgroundColor": "#10b981", "color": "#fff", "border": "none", "borderRadius": "4px", "fontSize": "10px", "padding": "4px 8px" }
      }
    ],
    "edges": [
      {
        "id": "e_m2",
        "source": "1",
        "target": "m2",
        "type": "straight",
        "style": { "stroke": "#10b981", "strokeDasharray": "2,2" }
      }
    ]
  }
  ```

---

## 3. Timeline Module

### 3.1. Get Timeline Events
- **Endpoint:** `GET /timeline/events`
- **Description:** Retrieves chronological events indicating significant changes, PR merges, and commits.
- **Response Format:**
  ```json
  [
    {
      "id": 1,
      "date": "Apr 18, 2024",
      "title": "OAuth Migration",
      "description": "Introduced OAuth2 integration and removed legacy token system.",
      "type": "Important Event",
      "badge": "Important",
      "color": "bg-accent",
      "branch": "main",
      "commitsCount": 8,
      "prsCount": 2,
      "prs": ["#142", "#143"],
      "filesCount": 12,
      "files": ["src/auth/oauth.ts", "src/middleware/auth.ts"],
      "summary": "This change modernized the authentication flow by introducing OAuth2."
    }
  ]
  ```

---

## 4. Architecture Module

### 4.1. Get Architecture Metrics
- **Endpoint:** `GET /architecture/metrics`
- **Description:** Retrieves summarized metrics about the system architecture.
- **Response Format:**
  ```json
  {
    "services": 6,
    "modules": 24,
    "files": "1,248",
    "dependencies": 92
  }
  ```

### 4.2. Get Technology Stack
- **Endpoint:** `GET /architecture/stack`
- **Description:** Retrieves language and framework distribution percentages.
- **Response Format:**
  ```json
  [
    {
      "name": "TypeScript",
      "short": "TS",
      "iconClass": "bg-blue-500/20 text-blue-400",
      "barClass": "bg-blue-500",
      "value": 68.7
    }
  ]
  ```

---

## 5. Insights Module

### 5.1. Get Activity Distribution
- **Endpoint:** `GET /insights/activity`
- **Description:** Retrieves commit and PR activity aggregated by month.
- **Response Format:**
  ```json
  [
    {
      "name": "Jan 24",
      "commits": 65,
      "prs": 15
    }
  ]
  ```

### 5.2. Get Change Distribution
- **Endpoint:** `GET /insights/distribution`
- **Description:** Retrieves breakdown of repository changes by type (Additions, Modifications, etc.).
- **Response Format:**
  ```json
  [
    {
      "name": "Additions",
      "value": 42.1,
      "color": "#10b981"
    }
  ]
  ```

### 5.3. Get Impactful Commits
- **Endpoint:** `GET /insights/impactful-commits`
- **Description:** Retrieves a list of commits that have high architectural or systemic impact.
- **Response Format:**
  ```json
  [
    {
      "hash": "a1b2c3d",
      "msg": "feat(auth): integrate oauth with auth0",
      "author": "jane.doe",
      "impact": "High",
      "impactColor": "bg-risk/20 text-risk",
      "files": 17,
      "date": "Mar 02, 2024"
    }
  ]
  ```

---

## 6. Reports Module

### 6.1. Get Report Summary
- **Endpoint:** `GET /reports/summary`
- **Description:** Retrieves an aggregate report summarizing repository health, active branches, and recent impactful commits.
- **Response Format:**
  ```json
  {
    "metrics": [
      {
        "title": "Total Commits",
        "value": "1,246",
        "change": "18.4%",
        "isPositive": true,
        "icon": "GitCommit",
        "colorClass": "text-primary"
      }
    ],
    "branches": [
      {
        "name": "main",
        "type": "Primary",
        "status": "Active",
        "color": "text-safe"
      }
    ],
    "commits": [
      {
        "hash": "a1b2c3d",
        "msg": "feat(auth): integrate oauth",
        "impact": "High",
        "color": "bg-risk/20 text-risk"
      }
    ]
  }
  ```
