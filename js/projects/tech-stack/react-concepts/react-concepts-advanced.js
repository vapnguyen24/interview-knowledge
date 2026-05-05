export const advancedQs = [

    {
      id: "react-reconciliation",
      question: {
        en: "How does React's reconciliation algorithm work?",
        vi: "Thuật toán reconciliation của React hoạt động như thế nào?",
      },
      answer: {
        en: `## Reconciliation

React's reconciliation is the diffing algorithm that determines the **minimal set of DOM changes** needed when state updates.

### Rules

1. **Same type** — React updates props on the existing element
2. **Different type** — React tears down the old tree and builds a new one
3. **Lists** — use \`key\` prop to match old vs new items

### Keys matter

\`\`\`jsx
// Bad — index as key causes bugs on reorder/insert
{items.map((item, i) => <Item key={i} {...item} />)}

// Good — stable, unique id
{items.map(item => <Item key={item.id} {...item} />)}
\`\`\`

### Fiber

React 16+ uses **Fiber** — a linked-list tree that allows:
- Incremental rendering (split work into chunks)
- Pausing, aborting, reusing work
- Priority-based updates (transitions via \`startTransition\`)`,

        vi: `## Reconciliation

Reconciliation là thuật toán diffing của React, xác định **tập thay đổi DOM nhỏ nhất** cần thiết khi state cập nhật.

### Quy tắc

1. **Cùng type** — React cập nhật props trên element hiện có
2. **Khác type** — React phá bỏ cây cũ và xây dựng cây mới
3. **Danh sách** — dùng prop \`key\` để khớp item cũ và mới

### Key quan trọng

\`\`\`jsx
// Xấu — dùng index làm key gây lỗi khi sắp xếp/thêm
{items.map((item, i) => <Item key={i} {...item} />)}

// Tốt — id ổn định, duy nhất
{items.map(item => <Item key={item.id} {...item} />)}
\`\`\`

### Fiber

React 16+ dùng **Fiber** — cây linked-list cho phép:
- Incremental rendering (chia nhỏ công việc)
- Tạm dừng, hủy, tái sử dụng công việc
- Cập nhật theo độ ưu tiên (transition qua \`startTransition\`)`,
      },
      level: "advanced",
      tags: ["reconciliation", "virtual-dom", "fiber", "performance"],
    }
];
