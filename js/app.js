import { workspaces } from "./data.js";
import { parseMarkdown, highlightKeyword } from "./markdown.js";
import { t, getLang, setLang, applyStaticTranslations } from "./i18n.js";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function langText(field) {
  if (field && typeof field === "object") return field[getLang()] ?? field.en;
  return field ?? "";
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── State ───────────────────────────────────────────────────────────────────

const state = {
  activeWorkspaceId: null,
  activeStackId: null,
  searchQuery: "",
  activeLevel: "all",
  activeTags: new Set(),
  expandedIds: new Set(),
  favoriteIds: new Set(JSON.parse(localStorage.getItem("favorites") || "[]")),
  showFavoritesOnly: false,
};

// ─── DOM refs ─────────────────────────────────────────────────────────────────

const projectListEl  = document.getElementById("project-list");
const stackTabsEl    = document.getElementById("stack-tabs");
const qaListEl       = document.getElementById("qa-list");
const searchEl       = document.getElementById("search-input");
const levelFilterEl  = document.getElementById("level-filter");
const tagFilterEl    = document.getElementById("tag-filter");
const projectTitleEl = document.getElementById("project-title");
const projectDescEl  = document.getElementById("project-desc");
const favToggleEl    = document.getElementById("fav-toggle");
const qaCountEl      = document.getElementById("qa-count");
const themeToggleEl  = document.getElementById("theme-toggle");
const langToggleEl   = document.getElementById("lang-toggle");

// ─── Init ─────────────────────────────────────────────────────────────────────

function init() {
  loadTheme();
  applyStaticTranslations();
  langToggleEl.textContent = getLang().toUpperCase();

  renderWorkspaceList();

  const savedWorkspace = localStorage.getItem("lastWorkspace");
  const savedStack     = localStorage.getItem("lastStack");
  const initial = workspaces.find(w => w.id === savedWorkspace) ?? workspaces[0];
  if (initial) loadWorkspace(initial.id, savedStack);

  searchEl.addEventListener("input", () => {
    state.searchQuery = searchEl.value.trim();
    renderQaList();
  });

  levelFilterEl.addEventListener("change", () => {
    state.activeLevel = levelFilterEl.value;
    renderQaList();
  });

  favToggleEl.addEventListener("click", () => {
    state.showFavoritesOnly = !state.showFavoritesOnly;
    favToggleEl.classList.toggle("active", state.showFavoritesOnly);
    renderQaList();
  });

  themeToggleEl.addEventListener("click", toggleTheme);
  langToggleEl.addEventListener("click", toggleLang);
}

// ─── Language ─────────────────────────────────────────────────────────────────

function toggleLang() {
  const next = getLang() === "en" ? "vi" : "en";
  setLang(next);
  langToggleEl.textContent = next.toUpperCase();
  document.documentElement.setAttribute("lang", next);
  if (state.activeWorkspaceId) renderQaList();
  else projectTitleEl.textContent = t("selectProject");
}

// ─── Workspace (sidebar) ──────────────────────────────────────────────────────

function renderWorkspaceList() {
  projectListEl.innerHTML = "";
  workspaces.forEach(ws => {
    const li = document.createElement("li");
    li.className = "project-item";
    li.dataset.id = ws.id;

    const typeIcon = ws.type === "company" ? "🏢" : "👤";
    li.innerHTML = `
      <div class="project-item-inner">
        <span class="project-type-icon">${typeIcon}</span>
        <span class="project-name">${escapeHtml(ws.title)}</span>
      </div>
      <span class="project-count">${ws.stacks.length}</span>
    `;
    li.addEventListener("click", () => loadWorkspace(ws.id));
    projectListEl.appendChild(li);
  });
}

function loadWorkspace(workspaceId, preferredStackId = null) {
  state.activeWorkspaceId = workspaceId;
  localStorage.setItem("lastWorkspace", workspaceId);

  document.querySelectorAll(".project-item").forEach(el => {
    el.classList.toggle("active", el.dataset.id === workspaceId);
  });

  const ws = workspaces.find(w => w.id === workspaceId);
  if (!ws) return;

  projectTitleEl.textContent = ws.title;
  projectDescEl.textContent  = ws.description;

  renderStackTabs(ws, preferredStackId);
}

// ─── Stack tabs ───────────────────────────────────────────────────────────────

function renderStackTabs(ws, preferredStackId = null) {
  stackTabsEl.innerHTML = "";

  const targetStack = ws.stacks.find(s => s.id === preferredStackId) ?? ws.stacks[0];

  ws.stacks.forEach(stack => {
    const btn = document.createElement("button");
    btn.className = "stack-tab";
    btn.role = "tab";
    btn.dataset.id = stack.id;
    btn.textContent = stack.title;
    if (stack.id === targetStack.id) btn.classList.add("active");
    btn.addEventListener("click", () => loadStack(ws, stack.id));
    stackTabsEl.appendChild(btn);
  });

  loadStack(ws, targetStack.id);
}

function loadStack(ws, stackId) {
  state.activeStackId = stackId;
  state.searchQuery   = "";
  state.activeLevel   = "all";
  state.activeTags.clear();
  state.expandedIds.clear();
  searchEl.value       = "";
  levelFilterEl.value  = "all";
  localStorage.setItem("lastStack", stackId);

  stackTabsEl.querySelectorAll(".stack-tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.id === stackId);
  });

  const stack = ws.stacks.find(s => s.id === stackId);
  if (!stack) return;

  renderTagFilter(stack);
  renderQaList();
}

// ─── Tag filter ───────────────────────────────────────────────────────────────

function renderTagFilter(stack) {
  const allTags = [...new Set(stack.qas.flatMap(qa => qa.tags))].sort();
  tagFilterEl.innerHTML = "";
  state.activeTags.clear();

  allTags.forEach(tag => {
    const btn = document.createElement("button");
    btn.className = "tag-btn";
    btn.textContent = tag;
    btn.addEventListener("click", () => {
      state.activeTags.has(tag) ? state.activeTags.delete(tag) : state.activeTags.add(tag);
      btn.classList.toggle("active", state.activeTags.has(tag));
      renderQaList();
    });
    tagFilterEl.appendChild(btn);
  });
}

// ─── Q&A list ─────────────────────────────────────────────────────────────────

function renderQaList() {
  const ws = workspaces.find(w => w.id === state.activeWorkspaceId);
  if (!ws) return;
  const stack = ws.stacks.find(s => s.id === state.activeStackId);
  if (!stack) return;

  const query = state.searchQuery.toLowerCase();
  const filtered = stack.qas.filter(qa => {
    if (state.showFavoritesOnly && !state.favoriteIds.has(qa.id)) return false;
    if (state.activeLevel !== "all" && qa.level !== state.activeLevel) return false;
    if (state.activeTags.size > 0 && !qa.tags.some(tag => state.activeTags.has(tag))) return false;
    if (query) {
      return (
        langText(qa.question).toLowerCase().includes(query) ||
        langText(qa.answer).toLowerCase().includes(query)
      );
    }
    return true;
  });

  qaCountEl.textContent = t("qaCount", filtered.length);
  qaListEl.innerHTML = "";

  if (filtered.length === 0) {
    qaListEl.innerHTML = `<p class="empty-state">${t("noResults")}</p>`;
    return;
  }

  filtered.forEach(qa => {
    const isExpanded = state.expandedIds.has(qa.id);
    const isFav      = state.favoriteIds.has(qa.id);
    const card = document.createElement("div");
    card.className = "qa-card";
    card.dataset.id = qa.id;

    const rawHtml = parseMarkdown(langText(qa.answer));
    const answerHtml = query ? highlightKeyword(rawHtml, state.searchQuery) : rawHtml;
    const questionDisplay = query
      ? highlightKeyword(escapeHtml(langText(qa.question)), state.searchQuery)
      : escapeHtml(langText(qa.question));

    card.innerHTML = `
      <div class="qa-header" role="button" aria-expanded="${isExpanded}" tabindex="0">
        <div class="qa-meta">
          <span class="level-badge level-${qa.level}">${t(qa.level)}</span>
          <div class="qa-tags">${qa.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
        </div>
        <div class="qa-title-row">
          <h3 class="qa-question">${questionDisplay}</h3>
          <div class="qa-actions">
            <button class="fav-btn${isFav ? " active" : ""}" aria-label="Favourite" title="Save to favourites">
              ${isFav ? "★" : "☆"}
            </button>
            <span class="toggle-icon">${isExpanded ? "−" : "+"}</span>
          </div>
        </div>
      </div>
      <div class="qa-answer${isExpanded ? " expanded" : ""}">
        <div class="qa-answer-body">${answerHtml}</div>
      </div>
    `;

    card.querySelector(".qa-header").addEventListener("click", e => {
      if (e.target.closest(".fav-btn")) return;
      toggleExpand(qa.id);
    });

    card.querySelector(".qa-header").addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleExpand(qa.id);
      }
    });

    card.querySelector(".fav-btn").addEventListener("click", e => {
      e.stopPropagation();
      toggleFavorite(qa.id);
    });

    qaListEl.appendChild(card);
  });
}

function toggleExpand(id) {
  state.expandedIds.has(id) ? state.expandedIds.delete(id) : state.expandedIds.add(id);
  const card = qaListEl.querySelector(`[data-id="${id}"]`);
  if (!card) return;
  const isExpanded = state.expandedIds.has(id);
  card.querySelector(".qa-header").setAttribute("aria-expanded", isExpanded);
  card.querySelector(".qa-answer").classList.toggle("expanded", isExpanded);
  card.querySelector(".toggle-icon").textContent = isExpanded ? "−" : "+";
}

function toggleFavorite(id) {
  state.favoriteIds.has(id) ? state.favoriteIds.delete(id) : state.favoriteIds.add(id);
  localStorage.setItem("favorites", JSON.stringify([...state.favoriteIds]));
  const card = qaListEl.querySelector(`[data-id="${id}"]`);
  if (!card) return;
  const btn  = card.querySelector(".fav-btn");
  const isFav = state.favoriteIds.has(id);
  btn.classList.toggle("active", isFav);
  btn.textContent = isFav ? "★" : "☆";
  if (state.showFavoritesOnly && !isFav) renderQaList();
}

// ─── Theme ────────────────────────────────────────────────────────────────────

function loadTheme() {
  const saved = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  themeToggleEl.textContent = saved === "dark" ? "☀" : "☾";
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  themeToggleEl.textContent = next === "dark" ? "☀" : "☾";
}

// ─── Bootstrap ────────────────────────────────────────────────────────────────

init();
