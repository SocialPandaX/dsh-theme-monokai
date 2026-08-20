// dsh-theme-monokai — browser half. Registers a Unofficial Monokai-inspired palette
// with the built-in ThemeRuntime and shadows the official Appearance row so
// Monokai appears inside Settings -> General -> 外观.

window.__ModuleLoader__.load({
id: "dsh-theme-monokai",
factory: (require) => {
var module = { exports: {} };
var exports = module.exports;
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const React = require("react");
const runtime = require("@deepseek-ai/dsh-client-runtime/client");

const inject = ["slots", "locale", "theme"];
const NS = "settings.monokai-appearance";
const STORAGE_KEY = "dsh-theme-monokai:theme";
const THEME_ID = "monokai-sublime";

const MONOKAI = {
id: THEME_ID,
colorScheme: "dark",
tokens: {
"--dsw-alias-bg-base": "#2d2a2e",
"--dsw-alias-bg-layer-1": "#373438",
"--dsw-alias-bg-layer-2": "#403e41",
"--dsw-alias-bg-layer-3": "#5b595c",
"--dsw-alias-bg-overlay": "#403e41",
"--dsw-alias-border-l1": "rgba(252, 252, 250, 0.08)",
"--dsw-alias-border-l2": "rgba(252, 252, 250, 0.16)",
"--dsw-alias-label-primary": "#fcfcfa",
"--dsw-alias-label-secondary": "#c1c0c0",
"--dsw-alias-label-tertiary": "#939293",
"--dsw-alias-brand-primary": "#ffd866",
"--dsw-alias-brand-text": "#221f22",
"--dsw-alias-button-primary-fill": "#ffd866",
"--dsw-alias-button-primary-hover": "#ffe28c",
"--dsw-alias-button-primary-dimmed": "#4a3d1c",
"--dsw-alias-button-info-fill": "#ffd866",
"--dsw-alias-button-info-hover": "#ffe28c",
"--dsw-alias-state-business-primary": "#ffd866",
"--dsw-alias-state-business-tertiary": "#4a3d1c",
"--dsw-alias-state-success-primary": "#a9dc76",
"--dsw-alias-state-warn-primary": "#fc9867",
"--dsw-alias-state-error-primary": "#ff6188",
"--dsw-alias-interactive-bg-hover": "rgba(255, 216, 102, 0.10)",
"--dsw-alias-interactive-bg-active": "rgba(255, 216, 102, 0.18)",
"--dsw-alias-markdown-code-block": "#221f22",
"--dsw-alias-markdown-inline-code": "#403e41",
"--dsw-specific-sidebar-fill": "#221f22",
"--dsw-specific-bubble": "rgba(255, 216, 102, 0.70)",
"--dsw-specific-bubble-highlight": "rgba(255, 216, 102, 0.70)",
"--dsw-specific-sidebar-nav-item-active": "#3a373a",
"--dsw-specific-sidebar-nav-item-hover": "rgba(252, 252, 250, 0.06)",
"--dsw-specific-sidebar-nav-item-active-accent": "#ffd866",
"--dsw-alias-scrollbar-bg-l1": "#403e41",
"--dsw-alias-scrollbar-bg-l2": "#5b595c",
"--dsw-alias-scrollbar-hover-l1": "#727072",
"--dsw-alias-scrollbar-hover-l2": "#939293"
},
shiki: {
"--shiki-foreground": "#fcfcfa",
"--shiki-background": "#221f22",
"--shiki-token-constant": "#ab9df2",
"--shiki-token-string": "#ffd866",
"--shiki-token-comment": "#727072",
"--shiki-token-keyword": "#ff6188",
"--shiki-token-parameter": "#fc9867",
"--shiki-token-function": "#a9dc76",
"--shiki-token-string-expression": "#ffd866",
"--shiki-token-punctuation": "#c1c0c0",
"--shiki-token-link": "#78dce8"
}
};

const CUBES = [
{ id: "light", labelKey: "appearance.light", swatch: ["#f4f4f5"] },
{ id: "dark", labelKey: "appearance.dark", swatch: ["#1c1c20"] },
{ id: "system", labelKey: "appearance.system", swatch: ["#f4f4f5", "#1c1c20"] },
{ id: THEME_ID, labelKey: "appearance.monokai", swatch: ["#2d2a2e", "#ffd866", "#fc9867", "#a9dc76", "#78dce8"] }
];

const STYLES = {
group: {
borderBottom: "1px solid var(--dsw-alias-border-l2)",
display: "flex",
flexDirection: "column",
gap: "10px",
padding: "16px 0"
},
title: {
color: "var(--dsw-alias-label-primary)",
fontSize: "14px",
lineHeight: "22px"
},
cubeRow: {
display: "flex",
flexWrap: "wrap",
gap: "10px"
},
cube: {
display: "flex",
flexDirection: "column",
alignItems: "center",
gap: "6px",
width: "76px",
padding: "3px",
borderRadius: "10px",
border: "2px solid transparent",
background: "transparent",
cursor: "pointer",
font: "inherit",
boxSizing: "border-box",
outline: "none",
boxShadow: "none",
appearance: "none"
},
cubeSelected: {
background: "var(--dsw-alias-interactive-bg-hover)"
},
cubeLabel: {
color: "var(--dsw-alias-label-secondary)",
fontSize: "12px",
lineHeight: "16px",
whiteSpace: "nowrap"
},
cubeLabelSelected: {
color: "var(--dsw-alias-label-primary)"
},
swatch: {
width: "100%",
height: "34px",
borderRadius: "7px",
boxSizing: "border-box",
overflow: "hidden",
display: "flex",
border: "1px solid var(--dsw-alias-border-l2)"
}
};

function readSavedId() {
try {
return localStorage.getItem(STORAGE_KEY) ?? THEME_ID;
} catch {
return THEME_ID;
}
}

function writeSavedId(id) {
try {
localStorage.setItem(STORAGE_KEY, id);
} catch {
// The theme still applies for the current page load.
}
}

function shikiCss() {
const entries = Object.entries(MONOKAI.shiki)
.map(([name, value]) => `${name}:${value};`)
.join("");
return `:root, body[data-ds-dark-theme] { ${entries} }
[data-composer-card] button[class*="primary"] { color: #221f22 !important; }
[class*="heroGlow"] ellipse { fill: #ffd866 !important; fill-opacity: 0.10; }
.gdEzaW_bubble { border: 1px solid rgba(255, 216, 102, 0.70); background-color: rgba(255, 216, 102, 0.70) !important; color: #221f22 !important; }
.rtSEdW_cardId, .cubgiG_itemName, .SVAs4q_label { color: #ffd866 !important; }
/* Deep Diving: keep the original animated shimmer, only recolor it. */
.Md3f7G_turnStatus {
  --dsw-static-deepseek-500: #d99a1f;
  --dsw-static-deepseek-200: #ffd866;
  background-image: linear-gradient(90deg, #d99a1f 0%, #d99a1f 32%, #fff9d0 50%, #d99a1f 68%, #d99a1f 100%);
}
.md-code-block { border: 1px solid rgba(252, 252, 250, 0.10); border-radius: 12px; overflow: hidden; }
.md-code-block pre.shiki { margin: 0; background: var(--dsw-alias-markdown-code-block) !important; }`;
}

function createStore() {
return runtime.defineStore({
init: () => ({
preference: "system",
revision: -1
}),
actions: {
sync: (d, preference, revision) => {
if (revision <= d.revision) return;
d.preference = preference;
d.revision = revision;
}
}
});
}

function Swatch({ colors }) {
return React.createElement("div", { style: STYLES.swatch },
colors.map((color) => React.createElement("div", {
key: color,
style: { flex: 1, background: color }
}))
);
}

function AppearanceRow({ t, setTheme, useStore }) {
const preference = useStore((state) => state.preference);
const [selected, setSelected] = React.useState(undefined);
const active = selected === undefined ? preference : selected;
return React.createElement("div", { style: STYLES.group },
React.createElement("div", { style: STYLES.title }, t("appearance.title")),
React.createElement("div", { style: STYLES.cubeRow },
CUBES.map(({ id, labelKey, swatch }) => React.createElement("button", {
key: id,
type: "button",
"aria-pressed": active === id,
onClick: () => {
setSelected(id);
setTheme(id);
},
style: {
...STYLES.cube,
...(active === id ? STYLES.cubeSelected : {})
}
},
React.createElement(Swatch, { colors: swatch }),
React.createElement("span", {
style: {
...STYLES.cubeLabel,
...(active === id ? STYLES.cubeLabelSelected : {})
}
}, t(labelKey))
))
)
);
}

function apply(ctx) {
let themeDisposer;
try {
themeDisposer = ctx.theme.register(MONOKAI);
} catch (error) {
console.warn(`[dsh-theme-monokai] skip theme "${MONOKAI.id}":`, error);
themeDisposer = () => {};
}

const shikiStyle = document.createElement("style");
shikiStyle.setAttribute("data-plugin", "dsh-theme-monokai");
document.head.append(shikiStyle);

const syncShiki = (snapshot) => {
shikiStyle.textContent = snapshot.active?.id === THEME_ID ? shikiCss() : "";
};
syncShiki(ctx.theme.getTheme());
ctx.on("theme/change", syncShiki);
const enforceSaved = (snapshot) => {
if (readSavedId() !== THEME_ID) return;
if (snapshot.preference !== THEME_ID) ctx.theme.setTheme(THEME_ID);
};
ctx.on("theme/change", enforceSaved);


const reassertSaved = () => {
if (readSavedId() !== THEME_ID) return;
if (ctx.theme.getTheme().preference !== THEME_ID) ctx.theme.setTheme(THEME_ID);
};
reassertSaved();
const timers = [setTimeout(reassertSaved, 0), setTimeout(reassertSaved, 120)];

const store = createStore();
let bound;
const sync = (snapshot) => {
bound?.sync(snapshot.preference, snapshot.revision);
};
ctx.on("theme/change", sync);

const injected = (actions) => {
bound = actions;
sync(ctx.theme.getTheme());
return {
setTheme(id) {
if (id === THEME_ID) writeSavedId(THEME_ID);
else writeSavedId("default");
ctx.theme.setTheme(id);
}
};
};

ctx.slots.inject("settings.general.item", () => ctx.slots.register({
name: "settings.general.item",
id: "appearance",
order: 10,
priority: -1,
store,
locale: NS,
inject: injected
}, AppearanceRow));

ctx.effect(() => ctx.locale.register(NS, {
zh: {
"appearance.title": "外观",
"appearance.light": "浅色",
"appearance.dark": "深色",
"appearance.system": "跟随系统",
"appearance.monokai": "Monokai"
},
en: {
"appearance.title": "Appearance",
"appearance.light": "Light",
"appearance.dark": "Dark",
"appearance.system": "System",
"appearance.monokai": "Monokai"
}
}), "dsh-theme-monokai: locale");

ctx.effect(() => () => {
themeDisposer();
for (const timer of timers) clearTimeout(timer);
shikiStyle.remove();
}, "dsh-theme-monokai: cleanup");
}

exports.apply = apply;
exports.inject = inject;
return module.exports;
}
});
