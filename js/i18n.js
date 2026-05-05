const translations = {
  en: {
    appTitle:        "Interview KB",
    projects:        "Projects",
    selectProject:   "Select a project",
    searchPlaceholder: "Search questions & answers…",
    allLevels:       "All levels",
    basic:           "Basic",
    intermediate:    "Intermediate",
    advanced:        "Advanced",
    favourites:      "★ Favourites",
    toggleDark:      "Toggle dark mode",
    noResults:       "No questions match the current filters.",
    qaCount:         n => `${n} question${n !== 1 ? "s" : ""}`,
  },
  vi: {
    appTitle:        "Interview KB",
    projects:        "Dự án",
    selectProject:   "Chọn một dự án",
    searchPlaceholder: "Tìm kiếm câu hỏi & câu trả lời…",
    allLevels:       "Tất cả cấp độ",
    basic:           "Cơ bản",
    intermediate:    "Trung cấp",
    advanced:        "Nâng cao",
    favourites:      "★ Yêu thích",
    toggleDark:      "Chuyển chế độ tối",
    noResults:       "Không có câu hỏi nào phù hợp với bộ lọc hiện tại.",
    qaCount:         n => `${n} câu hỏi`,
  },
};

let current = localStorage.getItem("lang") || "en";

export function t(key, arg) {
  const val = translations[current][key] ?? translations.en[key];
  return typeof val === "function" ? val(arg) : val;
}

export function getLang() { return current; }

export function setLang(lang) {
  current = lang;
  localStorage.setItem("lang", lang);
  applyStaticTranslations();
}

export function applyStaticTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    const attr = el.dataset.i18nAttr;
    const val = t(key);
    if (attr) el.setAttribute(attr, val);
    else el.textContent = val;
  });
}
