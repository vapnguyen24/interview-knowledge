import { javascriptFundamentals } from "./projects/tech-stack/javascript-fundamentals/index.js";
import { reactConcepts } from "./projects/tech-stack/react-concepts/index.js";
import { cssLayout } from "./projects/tech-stack/css-layout/index.js";
import { systemDesignFrontend } from "./projects/tech-stack/system-design-frontend/index.js";
import { flutter } from "./projects/tech-stack/flutter/index.js";

import { screenCastingWebRTC } from "./projects/screen-casting/screen-casting-webrtc.js";
import { screenCastingFlutter } from "./projects/screen-casting/screen-casting-flutter.js";
import { screenCastingPerformance } from "./projects/screen-casting/screen-casting-performance.js";

export const workspaces = [
  {
    id: "screen-casting",
    title: "Screen Casting System",
    description: "Real-time P2P screen casting via WebRTC, Flutter & Wi-Fi Direct.",
    type: "company",
    stacks: [screenCastingWebRTC, screenCastingFlutter, screenCastingPerformance],
  },
  {
    id: "tech-stack",
    title: "Tech Stack",
    description: "Personal projects and learning resources to master frontend development.",
    type: "personal",
    stacks: [
      javascriptFundamentals,
      reactConcepts,
      cssLayout,
      systemDesignFrontend,
      flutter,
    ],
  },
];
