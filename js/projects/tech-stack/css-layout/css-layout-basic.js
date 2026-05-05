export const basicQs = [

    {
      id: "css-flexbox-vs-grid",
      question: {
        en: "When do you choose Flexbox over Grid, and vice versa?",
        vi: "Khi nào nên chọn Flexbox thay vì Grid và ngược lại?",
      },
      answer: {
        en: `## Flexbox vs Grid

### Flexbox — one-dimensional layout

Best for aligning items **along a single axis** (row or column).

\`\`\`css
.nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}
\`\`\`

Use when:
- Aligning items in a toolbar / navbar
- Distributing space between items in a row
- Centering an element vertically and horizontally

### Grid — two-dimensional layout

Best when you need **rows and columns simultaneously**.

\`\`\`css
.dashboard {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
\`\`\`

Use when:
- Page-level layout (sidebar + main + header)
- Card grids with consistent sizing
- Overlapping elements

### Rule of thumb

> Flex = content-driven sizing along one axis.
> Grid = layout-driven placement across two axes.`,

        vi: `## Flexbox vs Grid

### Flexbox — layout một chiều

Tốt nhất để căn chỉnh item **theo một trục duy nhất** (hàng hoặc cột).

\`\`\`css
.nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}
\`\`\`

Dùng khi:
- Căn chỉnh item trong toolbar / navbar
- Phân bổ khoảng cách giữa các item trong một hàng
- Căn giữa phần tử theo cả hai chiều

### Grid — layout hai chiều

Tốt nhất khi cần **hàng và cột đồng thời**.

\`\`\`css
.dashboard {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
\`\`\`

Dùng khi:
- Layout toàn trang (sidebar + main + header)
- Grid card với kích thước đồng đều
- Các phần tử chồng lên nhau

### Quy tắc đơn giản

> Flex = kích thước theo nội dung, một trục.
> Grid = đặt vị trí theo layout, hai trục.`,
      },
      level: "basic",
      tags: ["flexbox", "grid", "layout"],
    },

    {
      id: "css-specificity",
      question: {
        en: "How does CSS specificity work?",
        vi: "CSS specificity hoạt động như thế nào?",
      },
      answer: {
        en: `## CSS Specificity

Specificity determines which rule wins when selectors conflict.

### Specificity score (a, b, c, d)

| Selector | Score |
|----------|-------|
| Inline style | 1,0,0,0 |
| ID \`#id\` | 0,1,0,0 |
| Class, attribute, pseudo-class | 0,0,1,0 |
| Element, pseudo-element | 0,0,0,1 |

### Examples

\`\`\`css
p              { color: black; }   /* 0,0,0,1 */
.text          { color: blue; }    /* 0,0,1,0 */
#main .text    { color: green; }   /* 0,1,1,0 */
\`\`\`

The \`green\` rule wins.

### !important

Overrides everything — avoid except for utility overrides or debugging.

### Best practices

- Keep specificity low and flat
- Prefer classes over IDs for styling
- Use BEM or similar to avoid specificity wars`,

        vi: `## CSS Specificity

Specificity xác định rule nào thắng khi các selector xung đột.

### Điểm specificity (a, b, c, d)

| Selector | Điểm |
|----------|------|
| Inline style | 1,0,0,0 |
| ID \`#id\` | 0,1,0,0 |
| Class, attribute, pseudo-class | 0,0,1,0 |
| Element, pseudo-element | 0,0,0,1 |

### Ví dụ

\`\`\`css
p              { color: black; }   /* 0,0,0,1 */
.text          { color: blue; }    /* 0,0,1,0 */
#main .text    { color: green; }   /* 0,1,1,0 */
\`\`\`

Rule \`green\` thắng.

### !important

Override tất cả — tránh dùng ngoại trừ utility override hoặc debug.

### Best practice

- Giữ specificity thấp và phẳng
- Ưu tiên class thay vì ID cho styling
- Dùng BEM hoặc tương tự để tránh xung đột specificity`,
      },
      level: "basic",
      tags: ["specificity", "selectors", "cascade"],
    }
];
