/**
 * Minimal Markdown → HTML parser.
 * Supports: headings, bold, inline code, code blocks, unordered lists,
 * horizontal rules, and paragraphs.
 */

export function parseMarkdown(md) {
  const lines = md.split("\n");
  const html = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.trimStart().startsWith("```")) {
      const lang = line.replace(/^```/, "").trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
        codeLines.push(escapeHtml(lines[i]));
        i++;
      }
      const langClass = lang ? ` class="language-${lang}"` : "";
      html.push(`<pre><code${langClass}>${codeLines.join("\n")}</code></pre>`);
      i++;
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      html.push(`<h${level}>${inlineParse(headingMatch[2])}</h${level}>`);
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      html.push("<hr>");
      i++;
      continue;
    }

    // Unordered list
    if (/^[-*+]\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*+]\s/.test(lines[i])) {
        items.push(`<li>${inlineParse(lines[i].replace(/^[-*+]\s/, ""))}</li>`);
        i++;
      }
      html.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    // Table (simple — requires header separator row)
    if (line.includes("|") && lines[i + 1] && /^\|?[\s\-|]+\|?$/.test(lines[i + 1])) {
      const tableRows = [];
      const headers = parseCells(line);
      tableRows.push(
        `<thead><tr>${headers.map(h => `<th>${inlineParse(h)}</th>`).join("")}</tr></thead>`
      );
      i += 2; // skip separator
      const bodyRows = [];
      while (i < lines.length && lines[i].includes("|")) {
        const cells = parseCells(lines[i]);
        bodyRows.push(`<tr>${cells.map(c => `<td>${inlineParse(c)}</td>`).join("")}</tr>`);
        i++;
      }
      if (bodyRows.length) tableRows.push(`<tbody>${bodyRows.join("")}</tbody>`);
      html.push(`<table>${tableRows.join("")}</table>`);
      continue;
    }

    // Blank line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph
    const paraLines = [];
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].match(/^#{1,6}\s/) && !/^[-*+]\s/.test(lines[i]) && !lines[i].trimStart().startsWith("```")) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length) {
      html.push(`<p>${inlineParse(paraLines.join(" "))}</p>`);
    }
  }

  return html.join("\n");
}

function inlineParse(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Inline code
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Link
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function parseCells(row) {
  return row
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map(c => c.trim());
}

export function highlightKeyword(html, keyword) {
  if (!keyword) return html;
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${escaped})`, "gi");
  return html.replace(re, '<mark>$1</mark>');
}
