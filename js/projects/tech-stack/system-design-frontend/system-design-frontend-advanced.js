export const advancedQs = [

    {
      id: "fsd-virtual-list",
      question: {
        en: "How would you implement a virtual list for rendering 100k items?",
        vi: "Làm thế nào để implement virtual list cho 100k phần tử?",
      },
      answer: {
        en: `## Virtual List (Windowing)

Rendering 100k DOM nodes is slow. A virtual list only renders **visible items** — typically 20–50 at a time.

### Core idea

\`\`\`
Total height = itemCount × itemHeight
Visible items = Math.ceil(viewportHeight / itemHeight)
Start index  = Math.floor(scrollTop / itemHeight)
\`\`\`

### Implementation sketch

\`\`\`javascript
function VirtualList({ items, itemHeight, viewportHeight }) {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(viewportHeight / itemHeight);
  const visibleItems = items.slice(startIndex, startIndex + visibleCount + 1);

  return (
    <div
      style={{ height: viewportHeight, overflowY: 'auto' }}
      onScroll={e => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map((item, i) => (
          <div
            key={item.id}
            style={{ position: 'absolute', top: (startIndex + i) * itemHeight, height: itemHeight }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
\`\`\`

### Libraries

- \`react-window\` (lightweight)
- \`react-virtual\` (headless, flexible)
- \`@tanstack/virtual\` (framework-agnostic)

### Variable height items

Use a \`ResizeObserver\` to measure items dynamically and store measured heights in a cache.`,

        vi: `## Virtual List (Windowing)

Render 100k DOM node rất chậm. Virtual list chỉ render **các item hiển thị** — thường 20–50 item cùng lúc.

### Ý tưởng cốt lõi

\`\`\`
Tổng chiều cao = itemCount × itemHeight
Số item hiển thị = Math.ceil(viewportHeight / itemHeight)
Start index      = Math.floor(scrollTop / itemHeight)
\`\`\`

### Phác thảo implementation

\`\`\`javascript
function VirtualList({ items, itemHeight, viewportHeight }) {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(viewportHeight / itemHeight);
  const visibleItems = items.slice(startIndex, startIndex + visibleCount + 1);

  return (
    <div
      style={{ height: viewportHeight, overflowY: 'auto' }}
      onScroll={e => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map((item, i) => (
          <div
            key={item.id}
            style={{ position: 'absolute', top: (startIndex + i) * itemHeight, height: itemHeight }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
\`\`\`

### Thư viện

- \`react-window\` (nhẹ)
- \`react-virtual\` (headless, linh hoạt)
- \`@tanstack/virtual\` (không phụ thuộc framework)

### Item có chiều cao thay đổi

Dùng \`ResizeObserver\` để đo item động và lưu vào cache.`,
      },
      level: "advanced",
      tags: ["performance", "virtualization", "DOM", "UX"],
    },

    {
      id: "fsd-state-management",
      question: {
        en: "How do you decide which state management approach to use?",
        vi: "Làm thế nào để quyết định phương pháp quản lý state phù hợp?",
      },
      answer: {
        en: `## Choosing State Management

### Decision tree

1. **Server state** (data from an API)?
   → Use **React Query / SWR** — handles caching, refetching, loading states.

2. **UI state local to a component** (open/closed, active tab)?
   → **useState / useReducer** — keep it local.

3. **Shared UI state across a small subtree** (theme, modal)?
   → **Context + useReducer** — no extra library needed.

4. **Complex global client state** (shopping cart, auth, multi-step form)?
   → **Zustand** (simple) or **Redux Toolkit** (large teams, devtools).

### Avoid over-engineering

\`\`\`
useState → Context → Zustand → Redux
↑ start here          ↑ reach here only when needed
\`\`\`

### Colocation rule

State should live as **close to where it's used** as possible. Don't hoist to global store just because it feels "organised" — that creates unnecessary coupling.`,

        vi: `## Chọn State Management

### Decision tree

1. **Server state** (dữ liệu từ API)?
   → Dùng **React Query / SWR** — xử lý caching, refetching, trạng thái loading.

2. **UI state cục bộ trong component** (mở/đóng, tab đang chọn)?
   → **useState / useReducer** — giữ cục bộ.

3. **UI state chia sẻ trong một subtree nhỏ** (theme, modal)?
   → **Context + useReducer** — không cần thư viện thêm.

4. **Client state global phức tạp** (giỏ hàng, auth, form nhiều bước)?
   → **Zustand** (đơn giản) hoặc **Redux Toolkit** (team lớn, cần devtools).

### Tránh over-engineer

\`\`\`
useState → Context → Zustand → Redux
↑ bắt đầu ở đây     ↑ chỉ khi thực sự cần
\`\`\`

### Quy tắc đặt state

State nên nằm **gần nhất với nơi sử dụng** nó. Đừng đưa lên global store chỉ vì cảm thấy "có tổ chức" — điều đó tạo ra coupling không cần thiết.`,
      },
      level: "advanced",
      tags: ["state", "architecture", "React Query", "Redux"],
    }
];
