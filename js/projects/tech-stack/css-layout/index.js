import { basicQs } from './css-layout-basic.js';
import { mediumQs } from './css-layout-medium.js';
import { advancedQs } from './css-layout-advanced.js';

export const cssLayout = {
  id: "css-layout",
  title: "CSS & Layout",
  description: "Flexbox, Grid, and styling fundamentals for UI interviews.",
  tech: ["CSS", "Flexbox", "Grid"],
  qas: [
    ...basicQs,
    ...mediumQs,
    ...advancedQs
  ]
};
