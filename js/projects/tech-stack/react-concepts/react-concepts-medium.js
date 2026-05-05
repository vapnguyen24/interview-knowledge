export const mediumQs = [

    {
      id: "react-useeffect",
      question: {
        en: "When and how should you use useEffect?",
        vi: "Khi nào và cách dùng useEffect?",
      },
      answer: {
        en: `## useEffect

\`useEffect\` lets you **synchronize a component with an external system** (DOM, API, subscription).

### Syntax

\`\`\`javascript
useEffect(() => {
  // side effect
  return () => { /* cleanup */ };
}, [dependencies]);
\`\`\`

### Dependency array rules

- **No array** — runs after every render
- **Empty array \`[]\`** — runs once on mount
- **\`[a, b]\`** — runs when \`a\` or \`b\` change

### Common patterns

\`\`\`javascript
// Fetch data
useEffect(() => {
  let cancelled = false;
  fetchUser(id).then(data => {
    if (!cancelled) setUser(data);
  });
  return () => { cancelled = true; };
}, [id]);
\`\`\`

### Pitfalls

- Missing dependencies cause stale closures
- Avoid async functions directly in useEffect — wrap internally
- Don't use for state-derived values; compute during render instead`,

        vi: `## useEffect

\`useEffect\` cho phép **đồng bộ hóa component với hệ thống bên ngoài** (DOM, API, subscription).

### Cú pháp

\`\`\`javascript
useEffect(() => {
  // side effect
  return () => { /* cleanup */ };
}, [dependencies]);
\`\`\`

### Quy tắc dependency array

- **Không có array** — chạy sau mỗi lần render
- **Array rỗng \`[]\`** — chạy một lần khi mount
- **\`[a, b]\`** — chạy khi \`a\` hoặc \`b\` thay đổi

### Pattern phổ biến

\`\`\`javascript
// Fetch data
useEffect(() => {
  let cancelled = false;
  fetchUser(id).then(data => {
    if (!cancelled) setUser(data);
  });
  return () => { cancelled = true; };
}, [id]);
\`\`\`

### Lỗi thường gặp

- Thiếu dependency dẫn đến stale closure
- Không dùng async function trực tiếp trong useEffect — bọc bên trong
- Đừng dùng cho giá trị tính từ state — tính trực tiếp khi render`,
      },
      level: "intermediate",
      tags: ["hooks", "useEffect", "side-effects"],
    },

    {
      id: "react-memo",
      question: {
        en: "When should you use React.memo, useMemo, and useCallback?",
        vi: "Khi nào nên dùng React.memo, useMemo và useCallback?",
      },
      answer: {
        en: `## Memoization in React

These APIs skip re-computation / re-renders when inputs haven't changed.

### React.memo

Prevents a **component** from re-rendering if its props are the same.

\`\`\`jsx
const Button = React.memo(({ onClick, label }) => (
  <button onClick={onClick}>{label}</button>
));
\`\`\`

### useMemo

Memoizes an **expensive computed value**.

\`\`\`javascript
const sorted = useMemo(
  () => [...items].sort(compareFn),
  [items]
);
\`\`\`

### useCallback

Memoizes a **function reference** (stable across renders).

\`\`\`javascript
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
\`\`\`

### When to reach for them

- Only after profiling confirms a real performance problem
- Not a silver bullet — memoization itself has a cost
- Most useful when passing callbacks/objects to memoized children`,

        vi: `## Memoization trong React

Các API này bỏ qua việc tính toán lại / re-render khi đầu vào không thay đổi.

### React.memo

Ngăn **component** re-render nếu props giống nhau.

\`\`\`jsx
const Button = React.memo(({ onClick, label }) => (
  <button onClick={onClick}>{label}</button>
));
\`\`\`

### useMemo

Ghi nhớ một **giá trị tính toán tốn kém**.

\`\`\`javascript
const sorted = useMemo(
  () => [...items].sort(compareFn),
  [items]
);
\`\`\`

### useCallback

Ghi nhớ **tham chiếu function** (ổn định qua các lần render).

\`\`\`javascript
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
\`\`\`

### Khi nào nên dùng

- Chỉ sau khi profiling xác nhận vấn đề hiệu năng thực sự
- Không phải giải pháp toàn năng — bản thân memoization cũng có chi phí
- Hữu ích nhất khi truyền callback/object cho component con đã được memoize`,
      },
      level: "intermediate",
      tags: ["performance", "memoization", "hooks"],
    }
];
