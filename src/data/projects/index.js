import { safeIronProject } from './safeiron-ai/project.js';
import { safeIronJournal } from './safeiron-ai/journal.js';
import { safeIronDecisions } from './safeiron-ai/decisions.js';
import { safeIronIssues } from './safeiron-ai/issues.js';
import { safeIronTests } from './safeiron-ai/tests.js';
import { safeIronRoadmap } from './safeiron-ai/roadmap.js';

import { jetbotProject } from './jetbot-simulation/project.js';
import { jetbotJournal } from './jetbot-simulation/journal.js';
import { jetbotDecisions } from './jetbot-simulation/decisions.js';
import { jetbotIssues } from './jetbot-simulation/issues.js';
import { jetbotTests } from './jetbot-simulation/tests.js';
import { jetbotRoadmap } from './jetbot-simulation/roadmap.js';

import { dsaProject } from './dsa-cp-toolkit/project.js';
import { dsaJournal } from './dsa-cp-toolkit/journal.js';
import { dsaDecisions } from './dsa-cp-toolkit/decisions.js';
import { dsaIssues } from './dsa-cp-toolkit/issues.js';
import { dsaTests } from './dsa-cp-toolkit/tests.js';
import { dsaRoadmap } from './dsa-cp-toolkit/roadmap.js';

import { vli10Project } from './vli10-lab/project.js';
import { vli10Journal } from './vli10-lab/journal.js';
import { vli10Decisions } from './vli10-lab/decisions.js';
import { vli10Issues } from './vli10-lab/issues.js';
import { vli10Tests } from './vli10-lab/tests.js';
import { vli10Roadmap } from './vli10-lab/roadmap.js';

export const ALL_PROJECTS = [
  {
    ...safeIronProject,
    journal: safeIronJournal,
    decisions: safeIronDecisions,
    issues: safeIronIssues,
    tests: safeIronTests,
    roadmap: safeIronRoadmap
  },
  {
    ...jetbotProject,
    journal: jetbotJournal,
    decisions: jetbotDecisions,
    issues: jetbotIssues,
    tests: jetbotTests,
    roadmap: jetbotRoadmap
  },
  {
    ...dsaProject,
    journal: dsaJournal,
    decisions: dsaDecisions,
    issues: dsaIssues,
    tests: dsaTests,
    roadmap: dsaRoadmap
  },
  {
    ...vli10Project,
    journal: vli10Journal,
    decisions: vli10Decisions,
    issues: vli10Issues,
    tests: vli10Tests,
    roadmap: vli10Roadmap
  }
];

export const PROJECT_CATEGORIES = [
  "All",
  "AI & Embedded IoT",
  "Robotics & Web3D",
  "Algorithms & C++ DSA",
  "STEM & Interactive Simulation"
];
