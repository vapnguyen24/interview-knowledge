export const advancedQs = [
  {
    id: "fl-advanced-1",
    question: {
      en: "Dive deep into the Flutter rendering pipeline. What exactly happens between vsync and pixels on the screen?",
      vi: "Hãy đi sâu vào quy trình Render pipeline của Flutter. Điều gì xảy ra chính xác giữa tín hiệu VSync và pixel hiển thị trên màn hình?"
    },
    answer: {
      en: `## The Pipeline Phases\nWhen the OS fires a VSync (Vertical Synchronization) signal, the Engine fires up \`dart:ui\`. The pipeline strict phases:\n1. **Animate:** Ticks active animation controllers.\n2. **Build:** Traverses Widget tree, constructing Element tree.\n3. **Layout:** Passes constraints down the RenderObject tree and sizes back up.\n4. **Paint:** Generates painting instructions into a Layer tree.\n5. **Compositing:** Combines Layers, avoiding full repaints.\n6. **Rasterize:** Impeller/Skia transforms layered paths into visual pixels on GPU.`,
      vi: `## Các Pha Trong Pipeline\nKhi OS kích hoạt tín hiệu VSync, Engine kích hoạt \`dart:ui\`. Pipeline gồm 6 pha theo thứ tự:\n1. **Animate:** Gõ nhịp các animation controller đang hoạt động.\n2. **Build:** Duyệt Widget tree, xây dựng Element tree.\n3. **Layout:** Truyền constraints xuống RenderObject tree và nhận kích thước trả ngược lên.\n4. **Paint:** Tạo các lệnh vẽ thành Layer tree.\n5. **Compositing:** Gộp các Layer, tránh vẽ lại toàn bộ khi không cần thiết.\n6. **Rasterize:** Impeller/Skia chuyển đổi các Layer thành pixel hiển thị trên GPU.`
    },
    level: "advanced",
    tags: ["Engine", "Rendering", "Core"]
  },
  {
    id: "fl-advanced-2",
    question: {
      en: "Explain Dart's Event Loop, Microtask Queue vs Event Queue. How do you prioritize a task?",
      vi: "Phân tích Event Loop của Dart. Microtask Queue và Event Queue khác nhau như thế nào? Cách ưu tiên một tác vụ?"
    },
    answer: {
      en: `## Event Loop Mechanics\nDart executes synchronously on a single thread. When sync code ends, it checks:\n1. **Microtask Queue:** Highest priority. The loop drains this entirely before looking elsewhere.\n2. **Event Queue:** Lower priority (I/O, Touch events, Timers).\n## Prioritizing\nUse \`scheduleMicrotask(() { ... })\` to jump ahead of GUI events. But if you stuff it too heavily, the Event Queue starves making the UI unresponsive.`,
      vi: `## Cơ Chế Event Loop\nDart chạy đơn luồng. Khi code đồng bộ kết thúc, nó kiểm tra theo thứ tự:\n1. **Microtask Queue:** Ưu tiên cao nhất. Vòng lặp phải xử lý hết toàn bộ hàng này trước khi chuyển sang chỗ khác.\n2. **Event Queue:** Ưu tiên thấp hơn (I/O, sự kiện chạm màn hình, Timer).\n## Cách Ưu Tiên Tác Vụ\nDùng \`scheduleMicrotask(() { ... })\` để chen vào trước các sự kiện UI. Tuy nhiên nếu nhét quá nhiều vào Microtask Queue, Event Queue bị bỏ đói khiến giao diện không phản hồi.`
    },
    level: "advanced",
    tags: ["Dart", "Async", "Engine"]
  },
  {
    id: "fl-advanced-3",
    question: {
      en: "How does Garbage Collection (GC) work in Dart, especially regarding the 'Generational' aspect?",
      vi: "Garbage Collection (GC) trong Dart hoạt động như thế nào? Giải thích thuật toán GC phân thế hệ (Generational GC)."
    },
    answer: {
      en: `## Generational GC\nMemory is divided into two distinct spaces:\n1. **Young Space (Scavenger):** Ephemeral short-lived objects (like standard Widgets). GC here is instant—pointers to living objects are copied over, the rest are immediately blown away.\n2. **Old Space (Mark-Sweep):** Long-lived singletons/state promoted here. Requires halting to mark nodes and sweep dead memory, risking janky frame drops.\n*Tip:* Favor const widgets to avoid filling the Young Space repeatedly.`,
      vi: `## GC Phân Thế Hệ\nBộ nhớ được chia thành 2 vùng:\n1. **Young Space (Scavenger):** Dành cho các object ngắn hạn (như Widget thông thường). GC ở đây cực nhanh — chỉ copy các object còn sống sang khu mới, phần còn lại xóa ngay lập tức.\n2. **Old Space (Mark-Sweep):** Dành cho các singleton và state tồn tại lâu. Cần dừng hệ thống để đánh dấu (mark) các node còn sống và quét dọn (sweep) bộ nhớ chết — có nguy cơ làm rớt frame.\n*Tip:* Dùng \`const\` cho widget để tránh lấp đầy Young Space liên tục.`
    },
    level: "advanced",
    tags: ["Memory", "Dart", "Performance"]
  },
  {
    id: "fl-advanced-4",
    question: {
      en: "What is FFI in Dart (dart:ffi)? When is integrating C/C++ or Rust absolutely necessary in Flutter?",
      vi: "Dart FFI (`dart:ffi`) là gì? Khi nào tích hợp C/C++ hoặc Rust vào Flutter là thực sự cần thiết?"
    },
    answer: {
      en: `## Dart FFI\nForeign Function Interface allows Dart to dynamically bind to low-level native libraries (C/C++/Rust) with synchronous speed, avoiding standard MethodChannel JSON serialization.\n## Usage Constraints\nCrucial for 3D physics rendering engines, brute-force cryptography, massive sqlite custom binaries, or connecting natively to OpenCV webcam manipulation where MethodChannel's async overhead kills latency.`,
      vi: `## Dart FFI\nForeign Function Interface cho phép Dart gọi trực tiếp các thư viện native (C/C++/Rust) theo cơ chế đồng bộ, bỏ qua việc tuần tự hóa JSON của MethodChannel.\n## Khi Nào Cần Dùng\nBắt buộc khi làm engine vật lý 3D, mã hóa/giải mã cryptography nặng, xử lý SQLite tùy biến với file lớn, hoặc kết nối với OpenCV để xử lý ảnh/video — những tác vụ mà độ trễ async của MethodChannel là không chấp nhận được.`
    },
    level: "advanced",
    tags: ["Native", "FFI", "Performance"]
  },
  {
    id: "fl-advanced-5",
    question: {
      en: "How do you mitigate jank caused by heavy shader compilations when opening an app for the first time? (Skia Shader Jank)",
      vi: "Làm thế nào để giảm thiểu jank do biên dịch shader nặng khi mở app lần đầu (Skia Shader Jank)?"
    },
    answer: {
      en: `## The Shader Curse\nSkia builds layout geometries but when hitting an unseen Gradient or blur, it blocks the CPU massively to compile custom GPU Shaders—causing painful jank the very first time an animation runs.\n## Mitigation\n1. **Impeller:** Switch to Google's massive Impeller engine block natively precompiling Shaders at app-build time.\n2. **SkSL Warm-up:** In older Flutter paths, you play through the app in Dev, dump the Shader cache json, and inject it during compilation \`--bundle-sksl-path\` to gift it pre-warmed to users.`,
      vi: `## Lời Nguyền Shader\nSkia xây dựng hình học layout bình thường, nhưng khi gặp Gradient hay blur lạ lần đầu, CPU phải dừng lại để biên dịch Shader GPU tùy chỉnh — gây jank đau đớn ngay lần đầu animation chạy.\n## Giải Pháp\n1. **Impeller:** Chuyển sang engine Impeller của Google, vốn precompile Shader ngay tại thời điểm build app — không còn jank lần đầu.\n2. **SkSL Warm-up:** Với các path Flutter cũ, chạy app ở môi trường Dev để dump cache Shader thành JSON, sau đó inject vào lúc build bằng \`--bundle-sksl-path\` để user nhận được shader đã được làm ấm sẵn.`
    },
    level: "advanced",
    tags: ["Engine", "Performance", "Shaders"]
  },
  {
    id: "fl-advanced-6",
    question: {
      en: "Detail the intricacies of state restoration. How do you keep a scroll position intact when the OS kills your app in the background?",
      vi: "Trình bày chi tiết về State Restoration. Làm sao khôi phục vị trí cuộn khi OS kill app trong nền?"
    },
    answer: {
      en: `## OS App Tombstoning\nAndroid kills apps to spare memory. Without caching, revisiting forces a raw Cold Start losing all form fields and scroll heights.\n## State Restoration API\nWe wire \`RestorationMixin\` onto Stateful widgets.\nStore values conceptually inside \`RestorableInt\` or fields. The framework maps these natively down to the Android Bundle / iOS standard save state. Upon revivification, Flutter re-hydrates the Widget tree overriding internal values smoothly avoiding network fetches.`,
      vi: `## Tombstoning — OS Kill App Ngầm\nAndroid kill app khi thiếu RAM. Nếu không cache, lần mở lại sẽ là Cold Start hoàn toàn — mất hết dữ liệu form và vị trí cuộn.\n## State Restoration API\nGắn \`RestorationMixin\` vào StatefulWidget. Lưu các giá trị vào \`RestorableInt\` hoặc các \`RestorableProperty\` tương ứng. Framework tự ánh xạ chúng xuống Android Bundle / iOS save state. Khi app được khởi động lại, Flutter tái tạo Widget tree và khôi phục các giá trị đã lưu mà không cần gọi lại mạng.`
    },
    level: "advanced",
    tags: ["State Management", "Native", "OS"]
  },
  {
    id: "fl-advanced-7",
    question: {
      en: "What challenges arise when dealing with deeply nested RenderObjects specifically concerning hit-testing and painting boundaries?",
      vi: "Những thách thức nào xuất hiện với RenderObject lồng sâu liên quan đến hit-testing và ranh giới vẽ (paint boundary)?"
    },
    answer: {
      en: `## Paint Bleed\nOne dirty RenderObject repaints siblings globally tied to the canvas.\n**Solution:** Add \`RepaintBoundary\` telling the engine to snip it into a distinct graphic compositing layer.\n## Hit Testing Blackholes\nHits bubble top-down visually based on un-rotated bounds. Custom 3D perspective widgets MUST heavily override \`hitTestChildren()\` projecting X/Y mathematically opposite down the transformed vector depth, or pointer taps miss into oblivious nothingness.`,
      vi: `## Sơn Loang (Paint Bleed)\nMột RenderObject bị "bẩn" có thể kéo theo cả cây widget cha/anh bị vẽ lại.\n**Giải pháp:** Thêm \`RepaintBoundary\` để báo cho engine tách widget đó thành một compositing layer riêng biệt.\n## Hố Đen Hit Testing 3D\nCác cú chạm được tính dựa trên bounding box chưa bị transform. Với widget 3D có perspective transform, bắt buộc phải override \`hitTestChildren()\` để chiếu ngược tọa độ X/Y qua ma trận biến đổi, nếu không các cú tap sẽ rơi vào khoảng trống.`
    },
    level: "advanced",
    tags: ["Engine", "RenderObject", "Under the hood"]
  },
  {
    id: "fl-advanced-8",
    question: {
      en: "Discuss Memory Profiling in detail. How do you track down an image cache bottleneck versus dart object bloat?",
      vi: "Phân tích Memory Profiling chi tiết. Cách phân biệt và xử lý image cache bottleneck so với Dart object bloat?"
    },
    answer: {
      en: `## Image Overload\nMassive JPEGs natively decoded crush backend external GPU bounds (Native tab in DevTools), completely bypassing visible Dart heaps limits.\n**Fix:** Force \`cacheWidth\` during layout fetch to trim 4K vectors into 100px thumbs down to fractions of Megabytes.\n## Dart Bloat\nZombie objects trapped via Static global managers causing reference retention. Diff two memory snapshot drops (Heap Snapshots) across 5 minutes. If list contexts stay suspended undigested, Garbage Scavengers fail to obliterate them. Restructure your architectural singleton holds.`,
      vi: `## Quá Tải Ảnh\nẢnh JPEG lớn khi decode native chiếm bộ nhớ GPU (hiện trong tab Native của DevTools), hoàn toàn nằm ngoài heap Dart.\n**Cách sửa:** Truyền \`cacheWidth\` khi load ảnh để resize ảnh 4K xuống thumbnail nhỏ, tiết kiệm hàng chục MB.\n## Dart Object Bloat\nCác object zombie bị giữ lại bởi static global manager. Chụp 2 Heap Snapshot cách nhau 5 phút rồi so sánh. Nếu danh sách \`BuildContext\` cũ vẫn còn tồn tại, GC không thể thu dọn chúng — cần xem lại các singleton đang giữ tham chiếu dư thừa.`
    },
    level: "advanced",
    tags: ["Performance", "Memory", "Tooling"]
  },
  {
    id: "fl-advanced-9",
    question: {
      en: "What are Zone and ZoneSpecification in Dart? How does the framework use Zones for unhandled exceptions?",
      vi: "Zone và ZoneSpecification trong Dart là gì? Framework sử dụng Zones để bắt exception không xử lý như thế nào?"
    },
    answer: {
      en: `## Dart Zones\nA \`Zone\` is an asynchronous boundary environment (like Thread Local Storage). Running apps shielded in \`runZonedGuarded\` traps lost futures that crash far out of main thread flow scopes.\n## Usage\nWe manipulate \`ZoneSpecification\` to explicitly intercept system global functions like \`print()\` and redirect console spam exclusively towards structured rolling log files, sealing uncaptured UI crash bursts cleanly to Crashlytics databases.`,
      vi: `## Dart Zones\n\`Zone\` là một môi trường bất đồng bộ có ranh giới riêng (giống Thread Local Storage). Bọc app trong \`runZonedGuarded\` để bắt các Future bị lỗi không được xử lý, ngay cả khi chúng nằm ngoài luồng chính.\n## Ứng Dụng\nDùng \`ZoneSpecification\` để chặn các hàm hệ thống toàn cục như \`print()\` và chuyển hướng log về file cấu trúc, hoặc đẩy toàn bộ crash không bắt được vào Crashlytics một cách gọn gàng.`
    },
    level: "advanced",
    tags: ["Dart", "Core", "Error Handling"]
  },
  {
    id: "fl-advanced-10",
    question: {
      en: "Explain the concept behind Flutter's Widget Keys (ValueKey, GlobalKey, ObjectKey). Why does swapping identical widget types in a list destroy state without them?",
      vi: "Giải thích chi tiết Widget Keys (ValueKey, GlobalKey, ObjectKey). Tại sao hoán đổi các widget cùng type trong danh sách lại mất state nếu không có Key?"
    },
    answer: {
      en: `## Element Tree Diffing\nWhen structurally animating a sequence (A -> B into B -> A), Flutter exclusively matches the \`Type\` and \`Key\`. Absent a Key, identical \`Types\` match perfectly! Elements stay rigidly bolted to their fixed old array index conserving former states ignorantly causing wrong visual properties mapping.\n## The Keys\n- **ValueKey:** Relies on scalar strings (Database ID \`123\`, \`abc\`).\n- **ObjectKey:** Binds to pure pointer identity (Memory Object address).\n- **GlobalKey:** Overpowered. Moves the Element whole anywhere maintaining un-destroyed state + probes sizes \`RenderBox\`. Do not abuse wildly.`,
      vi: `## So Sánh Element Tree\nKhi cấu trúc danh sách thay đổi (A → B thành B → A), Flutter so khớp dựa trên \`Type\` và \`Key\`. Nếu không có Key, các widget cùng \`Type\` sẽ khớp với nhau theo index cũ — Element giữ nguyên State cũ gắn vào widget mới sai, gây lỗi UI.\n## Các Loại Key\n- **ValueKey:** Dựa trên giá trị scalar (ID database \`123\`, string \`"abc"\`).\n- **ObjectKey:** Dựa trên địa chỉ bộ nhớ của object (pointer identity).\n- **GlobalKey:** Cực mạnh. Di chuyển toàn bộ Element sang vị trí khác trong tree mà không mất State, đồng thời có thể truy cập \`RenderBox\` để đo kích thước. Không nên lạm dụng.`
    },
    level: "advanced",
    tags: ["Core", "State", "Widget Tree"]
  },
  {
    id: "fl-advanced-11",
    question: {
      en: "Describe how you'd detect and fix UI over-rendering/rebuilds recursively across deep widget trees.",
      vi: "Làm thế nào để phát hiện và sửa tình trạng UI over-rendering / rebuild dư thừa trên toàn widget tree?"
    },
    answer: {
      en: `## Detective Work\n1. Inspector Tab 'Highlight Repaints' casts glowing boundaries framing constantly updating layouts.\n2. Widget Rebuild Stats counter in DevTools measures exact bloat.\n## Eradication Tactics\n1. Drop changing states low into isolated \`StatefulWidgets\` / \`ValueListenableBuilder\` blocking parent ripple traps.\n2. Force constant \`const\` on everything static severing the diff checker instantly.\n3. Utilize targeted selector providers \`context.select((T t) => t.status)\` cutting the bind completely until distinct minimal object scopes change uniquely.`,
      vi: `## Phát Hiện\n1. Bật \`Highlight Repaints\` trong tab Inspector. Khu vực nào sáng lên liên tục là đang rebuild quá mức.\n2. Dùng \`Widget Rebuild Stats\` trong DevTools để đo số lần rebuild chính xác.\n## Cách Khắc Phục\n1. Đẩy state thay đổi xuống sâu vào \`StatefulWidget\` / \`ValueListenableBuilder\` cô lập, tránh để rebuild lan ra widget cha.\n2. Dùng \`const\` cho mọi widget tĩnh — trình kiểm tra diff bỏ qua chúng ngay lập tức.\n3. Dùng \`context.select((T t) => t.status)\` để chỉ rebuild khi đúng thuộc tính cần thiết thay đổi.`
    },
    level: "advanced",
    tags: ["Performance", "Core", "Optimization"]
  },
  {
    id: "fl-advanced-12",
    question: {
      en: "What are SendPorts and ReceivePorts? Write pseudo-code demonstrating bidirectional Isolate communication.",
      vi: "SendPort và ReceivePort là gì? Viết pseudo-code minh họa giao tiếp hai chiều giữa các Isolate."
    },
    answer: {
      en: `## Messengers of the Void\nIsolates lack shared heap memory. They chat exchanging encapsulated immutable objects via message-passing pipes.\n## Bidirectional Link\n1. **Core:** Generates \`recvA = ReceivePort()\`. Spawns \`Isolate\` slinging \`recvA.sendPort\` effectively inward.\n2. **Isolate:** Captures \`sendA\`. Generates its isolated own \`recvB = ReceivePort()\`. Blasts \`recvB.sendPort\` backward mapping via \`sendA.send(recvB.sendPort)\`.\n3. **Core:** Gets \`sendB\`. Bound structurally complete. Both dimensions independently pipeline objects back-and-forth forever freely!`,
      vi: `## Giao Tiếp Giữa Các Isolate\nIsolate không chia sẻ bộ nhớ. Chúng giao tiếp bằng cách truyền các object bất biến qua cặp Port.\n## Kết Nối Hai Chiều\n1. **Luồng chính:** Tạo \`recvA = ReceivePort()\`. Spawn Isolate con và truyền \`recvA.sendPort\` vào.\n2. **Isolate con:** Nhận \`sendA\`. Tạo \`recvB = ReceivePort()\` riêng của mình. Gửi ngược \`recvB.sendPort\` về luồng chính qua \`sendA.send(recvB.sendPort)\`.\n3. **Luồng chính:** Nhận được \`sendB\`. Kết nối hai chiều hoàn tất — cả hai bên đều có thể gửi/nhận tự do.`
    },
    level: "advanced",
    tags: ["Dart", "Concurrency", "Isolate"]
  },
  {
    id: "fl-advanced-13",
    question: {
      en: "Explain the philosophy of Clean Architecture in the context of Flutter. How do you structure a massive multi-module app?",
      vi: "Trình bày triết lý Clean Architecture trong Flutter. Cách cấu trúc một app lớn đa module?"
    },
    answer: {
      en: `## Rings of Power (Clean Arch)\nConcentric abstraction rings where inner domains know precisely zero about frameworks. (Interface -> App Bloc -> Core Repository -> Pure Domain Entities).\n## Modular Micro-packages\nWith 60+ engineers, we shred folders into self-contained decoupled \`pubspec\` Dart Packages. \`payment_engine\_ui\` binds weakly pointing inward to \`core_payment_domain\`. Compilation builds slice incrementally fast while preventing junior dev imports bypassing tight rigid protocol rings destructively.`,
      vi: `## Các Vòng Tách Biệt (Clean Architecture)\nCác vòng trừu tượng đồng tâm, trong đó Domain lõi không biết gì về framework bên ngoài. (UI → BLoC → Repository → Domain Entity).\n## Chia Module Thành Package\nVới đội 60+ engineer, chia codebase thành các Dart Package độc lập có \`pubspec.yaml\` riêng. Ví dụ \`payment_engine_ui\` chỉ phụ thuộc vào \`core_payment_domain\`. Build tăng dần nhanh hơn, đồng thời ngăn dev junior import vượt ranh giới kiến trúc một cách vô tình.`
    },
    level: "advanced",
    tags: ["Architecture", "System Design"]
  },
  {
    id: "fl-advanced-14",
    question: {
      en: "How do you achieve deep, bidirectional synchronization between Web URLs and App states in Navigation 2.0 (Router)?",
      vi: "Làm thế nào để đồng bộ hai chiều giữa Web URL và App state trong Navigation 2.0 (Router)?"
    },
    answer: {
      en: `## Complex URL State Orchestration\n1. **URL Update:** \`RouteInformationParser\` catches manual raw Web URL strings from users traversing deep endpoints, converting String "/item/1" securely to safe App Config objects.\n2. **View Rebuild:** \`RouterDelegate\` takes the new configs, forcefully mutates global Route state logic, rendering dynamic page Navigators sequentially matching strictly the deep config.\n3. **Vice-Versa:** Normal mobile Page \`Push\` events trip the delegate generating Object Paths. The parser then converts it backward mapping URLs visibly updating live browser bar streams natively over Web/Android Deep-links. (Standardized purely by \`go_router\`).`,
      vi: `## Đồng Bộ Hai Chiều URL — State\n1. **URL → State:** \`RouteInformationParser\` bắt chuỗi URL thô người dùng nhập (ví dụ \`"/item/1"\`), chuyển thành Config object an toàn.\n2. **Rebuild giao diện:** \`RouterDelegate\` nhận Config mới, cập nhật Route state toàn cục, render stack màn hình tương ứng.\n3. **Chiều ngược lại:** Khi app chuyển màn hình theo cách thông thường, delegate tạo ra Path object, parser chuyển ngược thành URL và cập nhật thanh địa chỉ trình duyệt (hoặc Deep Link Android/Web). (Được chuẩn hóa bởi \`go_router\`).`
    },
    level: "advanced",
    tags: ["Routing", "Architecture", "Web"]
  },
  {
    id: "fl-advanced-15",
    question: {
      en: "In package development, how do you handle Federating a Plugin to support multiple custom platforms effectively?",
      vi: "Trong phát triển package, cách xây dựng Federated Plugin để hỗ trợ nhiều platform hiệu quả?"
    },
    answer: {
      en: `## Federation Blueprint\nFederation slices monolithic plugin files creating scalable ecosystem trees:\n1. **App-Facing Layer:** The visible UI user module holding user commands wrapping logic.\n2. **Platform Interface:** A stringent abstract class declaring pure method rules, enforcing absolute contract decoupling limits.\n3. **Platform Implementions:** Diverse \`plugin_web\`, \`plugin_linux\` modules extending the interface containing specialized native bridges. Mapped entirely inside the main package \`pubspec.yaml\`, injecting automatically resolving backend hardware.`,
      vi: `## Cấu Trúc Plugin Federated\nFederation chia plugin nguyên khối thành hệ sinh thái có thể mở rộng:\n1. **App-Facing Layer:** Module mà developer import và dùng. Bọc logic lại, cung cấp API đơn giản ra bên ngoài.\n2. **Platform Interface:** Abstract class khai báo các method thuần túy, định nghĩa hợp đồng mà mọi platform phải tuân theo.\n3. **Platform Implementations:** Các module \`plugin_web\`, \`plugin_linux\` kế thừa interface và chứa native bridge riêng. Được ánh xạ trong \`pubspec.yaml\` của package chính, tự động resolve đúng implementation theo platform.`
    },
    level: "advanced",
    tags: ["Plugin", "Architecture", "Ecosystem"]
  },
  {
    id: "fl-advanced-16",
    question: {
      en: "What is an `InheritedElement` really doing behind the scenes compared to `InheritedWidget`? How does `dependOnInheritedWidgetOfExactType` enforce optimal selective rebuilds O(1)?",
      vi: "`InheritedElement` thực sự làm gì so với `InheritedWidget`? `dependOnInheritedWidgetOfExactType` đảm bảo rebuild có chọn lọc O(1) như thế nào?"
    },
    answer: {
      en: `## Background Movers\n\`InheritedWidget\` is a static dummy stateless config map node. The titan is \`InheritedElement\`.\n## Dependancy Tracking (O(1) updates)\nWhen deeply nested descendant Elements invoke \`dependOnInherited...\`, the InheritedElement quietly logs that exact requesting child's reference pointer into a tight bound internal generic mapping structural registry.\nOn state shift updates, rather than traversing O(N) searching for dependents wiping entire child UI trees recklessly, the \`InheritedElement\` iterates fiercely straight to its explicit registry marking explicitly those few pointers \`dirty\` in blazing O(1) perfection.`,
      vi: `## Hậu Trường\n\`InheritedWidget\` chỉ là một node config tĩnh bất biến. Nhân vật thực sự là \`InheritedElement\`.\n## Theo Dõi Phụ Thuộc O(1)\nKhi Element con gọi \`dependOnInheritedWidgetOfExactType\`, \`InheritedElement\` lặng lẽ lưu tham chiếu trỏ đến Element con đó vào một registry nội bộ.\nKhi state thay đổi, thay vì duyệt toàn bộ cây O(N) để tìm ai cần rebuild, \`InheritedElement\` chỉ duyệt thẳng registry của mình — đánh dấu đúng những Element đã đăng ký là \`dirty\` với độ phức tạp O(1). Các widget khác không bị ảnh hưởng.`
    },
    level: "advanced",
    tags: ["Core", "Engine", "State"]
  },
  {
    id: "fl-advanced-17",
    question: {
      en: "How would you design a robust modular caching subsystem balancing Memory, SQLite and SharedPreferences for Offline-first applications?",
      vi: "Thiết kế hệ thống cache nhiều tầng cân bằng giữa Memory, SQLite và SharedPreferences cho ứng dụng Offline-first?"
    },
    answer: {
      en: `## Tightly Coupled Three-Tier Rings\n1. **RAM Cache Map (Volatile L1):** Super snapy fast. Stomachs hot repeating lookup dictionaries dropping globally offline during OS suspension completely.\n2. **KV Store (Preferences/Hive L2):** Synchronous flat maps injecting low-friction App session tokens and configuration colors avoiding large arrays scaling to crash limits.\n3. **Relational Core (SQLite L3):** Massive structured chunks of persistent multi-table queries wrapped in compute Isolates avoiding JSON parsing lagging rendering.\nRepository patterns orchestrate waterfall catchers probing smoothly mapping down tier paths cleanly.`,
      vi: `## Ba Tầng Cache\n1. **RAM Cache L1 (nhanh nhất):** Truy xuất cực nhanh. Lưu dữ liệu nóng thường xuyên dùng. Bị xóa khi app bị OS kill hoặc suspend.\n2. **KV Store L2 (Hive/SharedPreferences):** Lưu đồng bộ các token phiên, cài đặt màu sắc. Tránh lưu mảng lớn vì không tối ưu cho structured data.\n3. **SQLite L3 (lâu dài, có cấu trúc):** Lưu các tập dữ liệu lớn đa bảng quan hệ. Đẩy vào Isolate riêng để tránh parse JSON chặn UI thread.\nRepository pattern điều phối logic đọc/ghi theo thứ tự: kiểm tra L1 → L2 → L3 → API, đảm bảo luồng dữ liệu nhất quán.`
    },
    level: "advanced",
    tags: ["Architecture", "System Design", "Storage"]
  },
  {
    id: "fl-advanced-18",
    question: {
      en: "Elaborate on covariant keyword logic in Dart. Why is it selectively useful amidst strict compile-time types?",
      vi: "Từ khóa `covariant` trong Dart có ý nghĩa gì? Tại sao nó hữu ích trong bối cảnh kiểm tra kiểu nghiêm ngặt ở compile-time?"
    },
    answer: {
      en: `## Compile-Type Chains\nNormally, a subclass overriding a parameterized structural superclass method strictly cannot narrow the accepting datatype constraint arbitrarily shrinking safety nets globally.\n## Bypassing Covariant\nBy appending \`covariant\`, logic bypasses the compile-time guard gates shifting full responsibility runtime! If \`Vehicle(Crash c)\` allows overrides via \`Car(covariant CarCrash cr)\`, we forcefully guarantee we ONLY crash Cars causing CarCrashes. Realigns tighter OOP Domain model casting smoothly albeit with a slight fraction of runtime volatility loss!`,
      vi: `## Ràng Buộc Kiểu Compile-Time\nThông thường, lớp con khi override method của lớp cha không được thu hẹp kiểu tham số — điều này đảm bảo an toàn kiểu dữ liệu.\n## Từ Khóa Covariant\nThêm \`covariant\` vào tham số sẽ bỏ qua kiểm tra này ở compile-time, chuyển trách nhiệm kiểm tra sang runtime. Nếu \`Vehicle(Crash c)\` cho phép override thành \`Car(covariant CarCrash cr)\`, ta đảm bảo rằng chỉ có Car mới nhận CarCrash. Điều này giúp model OOP chặt chẽ hơn, nhưng đổi lại có nguy cơ nhỏ về lỗi runtime nếu không cẩn thận.`
    },
    level: "advanced",
    tags: ["Dart", "Architecture", "OOP"]
  },
  {
    id: "fl-advanced-19",
    question: {
      en: "Explain testing mocking strategies using Mockito or Mocktail vs creating explicit Fake classes. What are the maintainability tradeoffs?",
      vi: "So sánh chiến lược mock bằng Mockito/Mocktail với Fake class cụ thể. Đánh đổi về khả năng bảo trì là gì?"
    },
    answer: {
      en: `## Ghost Agents (Mockito)\n- **Power:** Instantaneous code generation overriding selective interface endpoints quickly. Minimal boilerplate overhead typing mock setups.\n- **Disaster:** Flaky. String references and dynamic runtime hooks break obscurely silently missing compiler detection when underlying domain structures mutate causing horrific mass failures refactoring sweeping architecture branches.\n## Hard Fakes (Static Impl)\n- **Power:** Absolute static typing reliability. A \`FakeAuth\` class implements real state changes storing lists acting authentically validating deeper cross-logic dependencies completely safely without mocking limits.\n- **Disaster:** Writing 40 dummy methods filling broad implementations gets extremely tedious grinding maintenance down heavily.`,
      vi: `## Mockito/Mocktail (Mock Tự Động)\n- **Ưu điểm:** Sinh code nhanh, ít boilerplate. Dễ mock từng endpoint của interface một cách linh hoạt với \`when().thenReturn()\`.\n- **Nhược điểm:** Dễ bị flaky. Các tham chiếu string và dynamic hook có thể âm thầm bị bỏ qua khi kiến trúc thay đổi — gây hàng loạt test fail mà compiler không báo.\n## Fake Class (Impl Tĩnh)\n- **Ưu điểm:** Hoàn toàn type-safe. Một \`FakeAuthService\` thực sự lưu state, hành xử gần như production — phát hiện được nhiều bug phức tạp hơn. Không bị vỡ khi refactor.\n- **Nhược điểm:** Tốn công. Viết đủ 40 method dummy cho một interface rộng rất nhọc và nặng nề khi bảo trì.`
    },
    level: "advanced",
    tags: ["Testing", "Architecture", "Mocks"]
  },
  {
    id: "fl-advanced-20",
    question: {
      en: "How do you orchestrate complex staggered coordinated animations? Explain TweenSequence vs Timeline intervals.",
      vi: "Làm thế nào để điều phối các animation staggered phức tạp? Giải thích TweenSequence so với Interval."
    },
    answer: {
      en: `## One Master Timeline\nOpt for a singular master \`AnimationController\` (0.0 -> 1.0) pushing a rigid core heartbeat to diverse nested nodes saving computational waste of multiple concurrent clocks.\n## Interval Cages\nUse \`Interval\` hooks dictating exact distinct birth and death percentage marks limiting UI element active lifespans explicitly decoupling multiple distinct widgets animating sequentially (Element A 0.0->0.3, Element B 0.3->0.7).\n## TweenSequence Mastery\nPermanent for a singular localized widget trait fluctuating wildly repeatedly internally jumping stages organically. Wraps multiple weights cascading logically avoiding messy entangled overlapping mathematical Curves!`,
      vi: `## Master AnimationController Duy Nhất\nDùng một \`AnimationController\` duy nhất (0.0 → 1.0) làm nhịp đập trung tâm cho tất cả animation — tránh tốn tài nguyên vì nhiều controller chạy đồng thời.\n## Interval (Phân Vùng Thời Gian)\nDùng \`Interval\` để xác định chính xác khi nào mỗi widget bắt đầu và kết thúc animation (ví dụ: Widget A: 0.0→0.3, Widget B: 0.3→0.7). Các widget hoạt động độc lập, tạo hiệu ứng staggered gọn gàng.\n## TweenSequence\nDùng cho một thuộc tính duy nhất cần thay đổi qua nhiều giai đoạn liên tiếp (ví dụ: màu chuyển Đỏ → Xanh → Vàng). Bọc nhiều Tween có trọng số vào chuỗi logic, tránh xử lý thủ công các Curve đan xen phức tạp.`
    },
    level: "advanced",
    tags: ["Animations", "UI", "Core"]
  }
];
