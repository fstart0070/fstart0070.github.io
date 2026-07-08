import { h } from "./landing-dom.js";

const SVG_BASE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
};

function icon(...paths) {
  return () => h("svg", SVG_BASE, ...paths.map((d) => h("path", { d })));
}

function iconWith(children) {
  return () => h("svg", SVG_BASE, ...children());
}

/** 通用 / 导航 */
export const IconArrow = icon("M5 12h14", "m13 6 6 6-6 6");
export const IconCheck = icon("M20 6 9 17l-5-5");
export const IconClose = icon("M18 6 6 18", "M6 6l12 12");
export const IconMenu = icon("M3 6h18", "M3 12h18", "M3 18h18");
export const IconExternal = icon(
  "M15 3h6v6",
  "M10 14L21 3",
  "M21 14v7H3V3h7"
);
export const IconCopy = icon(
  "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2",
  "M16 4a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z",
  "M14 14H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
);
export const IconGitHub = icon(
  "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
);

/** 智能体能力图标 */
export const IconSpider = icon(
  "M12 2v4",
  "M12 18v4",
  "M2 12h4",
  "M18 12h4",
  "M4.93 4.93 7.76 7.76",
  "M16.24 16.24l2.83 2.83",
  "M16.24 7.76l2.83-2.83",
  "M4.93 19.07l2.83-2.83"
);
export const IconBraces = icon(
  "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1",
  "M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"
);
export const IconDatabase = icon(
  "M3 5c0-1.7 4-3 9-3s9 1.3 9 3v14c0 1.7-4 3-9 3s-9-1.3-9-3V5Z",
  "M3 5c0 1.7 4 3 9 3s9-1.3 9-3",
  "M3 12c0 1.7 4 3 9 3s9-1.3 9-3"
);
export const IconLayers = icon(
  "m12 2 9 5-9 5-9-5 9-5Z",
  "m3 12 9 5 9-5",
  "m3 17 9 5 9-5"
);
export const IconCube = icon(
  "M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
  "m3.3 7 8.7 5 8.7-5",
  "M12 22V12"
);
export const IconAlert = icon(
  "m21 16-9-13L3 16",
  "M12 9v4",
  "M12 17h.01"
);
export const IconDelta = icon(
  "M12 4 22 20H2L12 4Z",
  "M12 12v4",
  "M12 18.5h.01"
);
export const IconSparkles = icon(
  "m12 3-1.9 5.5L4 10l6.1 2.4L12 18l1.9-5.5L20 10l-6.1-2.4L12 3Z",
  "M5 4v3",
  "M3.5 5.5h3",
  "M19 17v3",
  "M17.5 18.5h3"
);
export const IconBrain = icon(
  "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.46A2.5 2.5 0 0 1 4 17.5a2.5 2.5 0 0 1-1.65-4.53A2.5 2.5 0 0 1 4 7.5a2.5 2.5 0 0 1 3.04-2.46A2.5 2.5 0 0 1 9.5 2Z",
  "M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.46A2.5 2.5 0 0 0 20 17.5a2.5 2.5 0 0 0 1.65-4.53A2.5 2.5 0 0 0 20 7.5a2.5 2.5 0 0 0-3.04-2.46A2.5 2.5 0 0 0 14.5 2Z"
);
export const IconRoute = icon(
  "M9 19a7 7 0 1 1 7-7",
  "M22 22a3 3 0 1 0-6 0",
  "M19 19a3 3 0 1 0 0-6",
  "M9 19a3 3 0 1 0-6 0",
  "M6 16a3 3 0 1 0 0-6"
);
export const IconCompare = icon(
  "M21 4h-7a3 3 0 0 0-3 3v14",
  "m17 12 4-4-4-4",
  "M3 20h7a3 3 0 0 0 3-3V3",
  "m7 8-4 4 4 4"
);
export const IconScale = icon(
  "m16 16 3-8 3 8c-2 1-4 1-6 0Z",
  "m2 16 3-8 3 8c-2 1-4 1-6 0Z",
  "M7 21h10",
  "M12 3v18",
  "M3 7h18"
);
export const IconStethoscope = icon(
  "M11 2v2",
  "M5 2v2",
  "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1",
  "M8 15a6 6 0 0 0 12 0v-3",
  "M20 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
);
export const IconAtom = icon(
  "M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  "M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z",
  "M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"
);
export const IconChat = icon(
  "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"
);
export const IconLock = icon(
  "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Z",
  "M7 11V7a5 5 0 0 1 10 0v4"
);
export const IconBolt = icon("m13 2-3 14h7l-3 6 8-12h-7l3-8H8z");
export const IconStack = icon(
  "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7",
  "M3 7l9-4 9 4-9 4-9-4Z",
  "M3 12l9 4 9-4"
);

export const IconPipeline = icon(
  "M5 12h2",
  "M17 12h2",
  "M9 12h6",
  "M5 6v12",
  "M19 6v12",
  "M3 6h4",
  "M17 6h4",
  "M3 18h4",
  "M17 18h4"
);

/** 合作页专用 */
export const IconMail = icon(
  "M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6Z",
  "m22 7-10 7L2 7"
);
export const IconHandshake = icon(
  "M11 17 9 19a2.83 2.83 0 1 1-4-4l3-3",
  "m18 16 1.69-1.69a2.83 2.83 0 1 0-4-4L14 12",
  "m9 11 4 4",
  "m12 8 6 6",
  "m22 12-1.5-1.5",
  "m2 12 1.5-1.5"
);
export const IconBuilding = icon(
  "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",
  "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",
  "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",
  "M10 6h4",
  "M10 10h4",
  "M10 14h4",
  "M10 18h4"
);
export const IconBriefcase = icon(
  "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
  "M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"
);
export const IconCode = icon(
  "m16 18 6-6-6-6",
  "m8 6-6 6 6 6"
);

/** 五层图标 */
export const IconAcquisition = IconSpider;
export const IconPersistence = IconDatabase;
export const IconCanonical = IconAtom;
export const IconAnalytics = IconCube;
export const IconOrchestration = IconPipeline;

/** Icon registry：根据字符串名取构造函数 */
export const ICONS = {
  spider: IconSpider,
  braces: IconBraces,
  database: IconDatabase,
  layers: IconLayers,
  cube: IconCube,
  alert: IconAlert,
  delta: IconDelta,
  sparkles: IconSparkles,
  brain: IconBrain,
  route: IconRoute,
  compare: IconCompare,
  scale: IconScale,
  stethoscope: IconStethoscope,
  atom: IconAtom,
  chat: IconChat,
  lock: IconLock,
  bolt: IconBolt,
  stack: IconStack,
  pipeline: IconPipeline,
};

export function icon_by_name(name) {
  const fn = ICONS[name] || IconSparkles;
  return fn();
}
