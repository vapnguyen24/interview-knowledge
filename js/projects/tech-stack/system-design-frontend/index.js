import { basicQs } from './system-design-frontend-basic.js';
import { mediumQs } from './system-design-frontend-medium.js';
import { advancedQs } from './system-design-frontend-advanced.js';

export const systemDesignFrontend = {
  id: "system-design-frontend",
  title: "Frontend System Design",
  description: "Scalability, architecture, and design patterns for senior roles.",
  tech: ["Architecture", "Performance", "Patterns"],
  qas: [
    ...basicQs,
    ...mediumQs,
    ...advancedQs
  ]
};
