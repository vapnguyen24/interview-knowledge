export const mediumQs = [

    {
      id: "js-closures",
      question: {
        en: "What is a closure and how does it work?",
        vi: "Closure là gì và hoạt động như thế nào?",
      },
      answer: {
        en: `## Closure

A closure is a function that **retains access to its outer scope** even after the outer function has returned.

### How it works

When a function is defined inside another function, it captures a reference to variables in the enclosing scope. Those variables persist as long as the inner function is alive.

\`\`\`javascript
function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
\`\`\`

### Common use cases

- Data encapsulation / private variables
- Factory functions
- Event handlers that need to reference outer state
- Memoization`,

        vi: `## Closure

Closure là một function **giữ lại quyền truy cập vào scope bên ngoài** ngay cả sau khi function bên ngoài đã trả về.

### Cách hoạt động

Khi một function được định nghĩa bên trong function khác, nó nắm giữ tham chiếu đến các biến trong scope bao ngoài. Những biến đó tồn tại chừng nào function bên trong còn tồn tại.

\`\`\`javascript
function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
\`\`\`

### Use case phổ biến

- Đóng gói dữ liệu / biến private
- Factory function
- Event handler cần tham chiếu đến state bên ngoài
- Memoization`,
      },
      level: "intermediate",
      tags: ["closure", "scope", "functions"],
    },

    {
      id: "js-prototype",
      question: {
        en: "How does prototypal inheritance work in JavaScript?",
        vi: "Prototypal inheritance hoạt động như thế nào trong JavaScript?",
      },
      answer: {
        en: `## Prototypal Inheritance

Every JavaScript object has an internal link to another object called its **prototype**. Property lookup walks up this chain.

\`\`\`javascript
const animal = {
  speak() { return \`\${this.name} makes a sound.\`; }
};

const dog = Object.create(animal);
dog.name = 'Rex';
dog.speak(); // "Rex makes a sound."
\`\`\`

### With classes (ES6 sugar over prototypes)

\`\`\`javascript
class Animal {
  constructor(name) { this.name = name; }
  speak() { return \`\${this.name} makes a sound.\`; }
}

class Dog extends Animal {
  speak() { return \`\${this.name} barks.\`; }
}
\`\`\`

### Key points

- \`__proto__\` points to the prototype object
- \`Object.prototype\` is the root of all chains
- \`hasOwnProperty\` checks only own properties, not inherited ones`,

        vi: `## Prototypal Inheritance

Mỗi object trong JavaScript có một liên kết nội bộ đến object khác gọi là **prototype**. Khi truy cập thuộc tính, JavaScript tìm kiếm dọc theo chuỗi này.

\`\`\`javascript
const animal = {
  speak() { return \`\${this.name} tạo ra một âm thanh.\`; }
};

const dog = Object.create(animal);
dog.name = 'Rex';
dog.speak(); // "Rex tạo ra một âm thanh."
\`\`\`

### Với class (ES6 — cú pháp sugar trên prototype)

\`\`\`javascript
class Animal {
  constructor(name) { this.name = name; }
  speak() { return \`\${this.name} tạo ra một âm thanh.\`; }
}

class Dog extends Animal {
  speak() { return \`\${this.name} sủa.\`; }
}
\`\`\`

### Điểm chính

- \`__proto__\` trỏ đến object prototype
- \`Object.prototype\` là gốc của mọi chuỗi prototype
- \`hasOwnProperty\` chỉ kiểm tra thuộc tính own, không kiểm tra kế thừa`,
      },
      level: "intermediate",
      tags: ["prototype", "inheritance", "OOP"],
    }
];
