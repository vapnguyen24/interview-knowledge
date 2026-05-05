import { basicQs } from './react-concepts-basic.js';
import { mediumQs } from './react-concepts-medium.js';
import { advancedQs } from './react-concepts-advanced.js';

export const reactConcepts = {
  id: "react-concepts",
  title: "React Concepts",
  description: "Key React patterns and hooks asked in mid–senior interviews.",
  tech: ["React", "Hooks", "JSX"],
  qas: [
    ...basicQs,
    ...mediumQs,
    ...advancedQs
  ]
};
