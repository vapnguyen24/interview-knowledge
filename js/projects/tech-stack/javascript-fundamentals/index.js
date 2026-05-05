import { basicQs } from './javascript-fundamentals-basic.js';
import { mediumQs } from './javascript-fundamentals-medium.js';
import { advancedQs } from './javascript-fundamentals-advanced.js';

export const javascriptFundamentals = {
  id: "javascript-fundamentals",
  title: "JavaScript Fundamentals",
  description: "Core JS concepts commonly tested in frontend interviews.",
  tech: ["JavaScript", "ES6+"],
  qas: [
    ...basicQs,
    ...mediumQs,
    ...advancedQs
  ]
};
