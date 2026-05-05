export const advancedQs = [

    {
      id: "js-event-loop",
      question: {
        en: "Explain the JavaScript event loop.",
        vi: "Giải thích event loop trong JavaScript.",
      },
      answer: {
        en: `## Event Loop

JavaScript is **single-threaded** but non-blocking thanks to the event loop.

### Components

- **Call Stack** — executes synchronous code frame by frame
- **Web APIs** — browser handles async work (timers, fetch, DOM events)
- **Task Queue (Macrotasks)** — \`setTimeout\`, \`setInterval\`, I/O callbacks
- **Microtask Queue** — \`Promise.then\`, \`queueMicrotask\`, \`MutationObserver\`

### Execution order

1. Run all synchronous code on the call stack
2. Drain the entire **microtask queue**
3. Pick one **macrotask**, run it
4. Repeat from step 2

\`\`\`javascript
console.log('1');
setTimeout(() => console.log('3'), 0);
Promise.resolve().then(() => console.log('2'));
// Output: 1, 2, 3
\`\`\``,

        vi: `## Event Loop

JavaScript là **single-threaded** nhưng không bị blocking nhờ event loop.

### Các thành phần

- **Call Stack** — thực thi code đồng bộ từng frame một
- **Web APIs** — trình duyệt xử lý các tác vụ async (timer, fetch, DOM event)
- **Task Queue (Macrotask)** — callback của \`setTimeout\`, \`setInterval\`, I/O
- **Microtask Queue** — \`Promise.then\`, \`queueMicrotask\`, \`MutationObserver\`

### Thứ tự thực thi

1. Chạy toàn bộ code đồng bộ trên call stack
2. Xử lý hết **microtask queue**
3. Lấy một **macrotask**, chạy nó
4. Lặp lại từ bước 2

\`\`\`javascript
console.log('1');
setTimeout(() => console.log('3'), 0);
Promise.resolve().then(() => console.log('2'));
// Output: 1, 2, 3
\`\`\``,
      },
      level: "advanced",
      tags: ["async", "event-loop", "promises"],
    }
];
