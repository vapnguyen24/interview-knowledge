export const basicQs = [

    {
      id: "js-var-let-const",
      question: {
        en: "What are the differences between var, let, and const?",
        vi: "Sự khác biệt giữa var, let và const là gì?",
      },
      answer: {
        en: `## var vs let vs const

| Feature | var | let | const |
|---------|-----|-----|-------|
| Scope | Function | Block | Block |
| Hoisting | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Re-declare | Yes | No | No |
| Re-assign | Yes | Yes | No |

### var

\`\`\`javascript
var x = 1;
if (true) { var x = 2; } // same variable
console.log(x); // 2
\`\`\`

### let

\`\`\`javascript
let x = 1;
if (true) { let x = 2; } // different variable
console.log(x); // 1
\`\`\`

### const

\`\`\`javascript
const obj = { a: 1 };
obj.a = 2;      // allowed — mutating the object
obj = {};       // TypeError — re-assignment not allowed
\`\`\`

**Best practice:** prefer \`const\` by default, use \`let\` when re-assignment is needed, avoid \`var\`.`,

        vi: `## var vs let vs const

| Đặc điểm | var | let | const |
|----------|-----|-----|-------|
| Scope | Function | Block | Block |
| Hoisting | Có (undefined) | Có (TDZ) | Có (TDZ) |
| Khai báo lại | Có | Không | Không |
| Gán lại | Có | Có | Không |

### var

\`\`\`javascript
var x = 1;
if (true) { var x = 2; } // cùng một biến
console.log(x); // 2
\`\`\`

### let

\`\`\`javascript
let x = 1;
if (true) { let x = 2; } // biến khác nhau
console.log(x); // 1
\`\`\`

### const

\`\`\`javascript
const obj = { a: 1 };
obj.a = 2;      // được phép — thay đổi nội dung object
obj = {};       // TypeError — không được gán lại
\`\`\`

**Best practice:** ưu tiên dùng \`const\`, dùng \`let\` khi cần gán lại, tránh \`var\`.`,
      },
      level: "basic",
      tags: ["variables", "scope", "hoisting"],
    }
];
