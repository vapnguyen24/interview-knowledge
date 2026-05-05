import { basicQs } from './flutter-basic.js';
import { mediumQs } from './flutter-medium.js';
import { advancedQs } from './flutter-advanced.js';

export const flutter = {
  id: "flutter",
  title: "Flutter",
  tech: ["Flutter", "Dart"],
  qas: [
    ...basicQs,
    ...mediumQs,
    ...advancedQs
  ]
};
