export const advancedQs = [
  {
    id: "fl-advanced-1",
    question: {
      en: "Dive deep into the Flutter rendering pipeline. What exactly happens between vsync and pixels on the screen?",
      vi: "Hãy đi sâu vào quy trình Render pipeline của Flutter. Lõi hệ thống tịnh tiến từ chớp Vsync ra màu RGB Pixel kiểu gì?"
    },
    answer: {
      en: `## The Pipeline Phases\nWhen the OS fires a VSync (Vertical Synchronization) signal, the Engine fires up \`dart:ui\`. The pipeline strict phases:\n1. **Animate:** Ticks active animation controllers.\n2. **Build:** Traverses Widget tree, constructing Element tree.\n3. **Layout:** Passes constraints down the RenderObject tree and sizes back up.\n4. **Paint:** Generates painting instructions into a Layer tree.\n5. **Compositing:** Combines Layers, avoiding full repaints.\n6. **Rasterize:** Impeller/Skia transforms layered paths into visual pixels on GPU.`,
      vi: `## Pha Động Kênh Pipeline\nOS kích VSync vã vào Engine \`dart:ui\`. Bộ khung nghiền Data qua 6 cổng luân hồi:\n1. **Animate:** Gõ nhịp tíc tắc Animation.\n2. **Build:** Càn quét đụng trạm Widget Tree trích lập lõi Element.\n3. **Layout:** Ép nhung BoxConstraints giáng sập RenderObject Tree gừ Size trả ngược lên.\n4. **Paint:** Lệnh cọ Canvas pha màu tạc nhãn Layer Tree.\n5. **Compositing:** Gộp dẹt Layer cắt ghép phần bù kẹt khung.\n6. **Rasterize (Dịch Màn):** Impeller/Skia quật đao C++ biến lưới Path nẩy thành đèn màu Pixel gí xòe vào thẻ GPU.`
    },
    level: "advanced",
    tags: ["Engine", "Rendering", "Core"]
  },
  {
    id: "fl-advanced-2",
    question: {
      en: "Explain Dart's Event Loop, Microtask Queue vs Event Queue. How do you prioritize a task?",
      vi: "Mổ xẻ vòm họng Event Loop của Dart, Microtask Queue vs Event Queue khác dập sao?"
    },
    answer: {
      en: `## Event Loop Mechanics\nDart executes synchronously on a single thread. When sync code ends, it checks:\n1. **Microtask Queue:** Highest priority. The loop drains this entirely before looking elsewhere.\n2. **Event Queue:** Lower priority (I/O, Touch events, Timers).\n## Prioritizing\nUse \`scheduleMicrotask(() { ... })\` to jump ahead of GUI events. But if you stuff it too heavily, the Event Queue starves making the UI unresponsive.`,
      vi: `## Lò Bát Quái Event Loop\nNgự độc tôn Tôn ngộ không 1 Thread đớn độc. Quét bay Cốt Đồng bộ xong, nó bắt đầu nhai Queues:\n1. **Microtask Queue (Linh Mạch Siêu tốc):** Con Cưng Số 1. Luân xa vòng phải cày cuốc đớp rạch cho nhẵn đống Hàm khứa trong này mới dám ló mặt check khay khác.\n2. **Event Queue (Cuốc Nông Dân):** Hạ cấp Tạp vụ bọc IO Nhắp Vuốt Cảm ứng, Timer cút nhặt Mạng.\n## Cắm Phễu Vượt Rào\nXài bùa \`scheduleMicrotask(() {...})\` là móc vé chen lấn cướp cổng quét trc Event. Hệ lụy lạm dụng đẻ nhiều thằng nhảy xổ qua sẽ Bóp vỡ mồm Màn Giao diện Nằm kẹt dí Cảm ứng đơ cứng.`
    },
    level: "advanced",
    tags: ["Dart", "Async", "Engine"]
  },
  {
    id: "fl-advanced-3",
    question: {
      en: "How does Garbage Collection (GC) work in Dart, especially regarding the 'Generational' aspect?",
      vi: "Garbage Collection (Sọt rác GC) Dart gom rác kiểu gì? Thuật dọn Generational GC đẽo gọt tàn khốc sao?"
    },
    answer: {
      en: `## Generational GC\nMemory is divided into two distinct spaces:\n1. **Young Space (Scavenger):** Ephemeral short-lived objects (like standard Widgets). GC here is instant—pointers to living objects are copied over, the rest are immediately blown away.\n2. **Old Space (Mark-Sweep):** Long-lived singletons/state promoted here. Requires halting to mark nodes and sweep dead memory, risking janky frame drops.\n*Tip:* Favor const widgets to avoid filling the Young Space repeatedly.`,
      vi: `## Trúc Lịch Gom rác Phân Tầng GC\nTrăm ngàn Object nhét 2 Lỗ Hổng lớn mốc ranh:\n1. **Young Space (Chuồng Trẻ - Scavenger):** Ngắn cũn chết ẻo Widget vòng 16ms vứt đây. Ông Vua rác quét Bão Điện Từ Xoẹt—Quặp Cáp Lưu 1 vốc qua khu tạm Dập lửa pháo Nén xóa sạch Chuồng.\n2. **Old Space (Phòng Lão - Mark-Sweep):** Lão hủ Singltelton héo hon chui đây. Rác bươi dơ đòi Stop Thế giới Đi Mò Trạc (Mark) quét đuổi Lão quét nhọc (Sweep) => Bóp Khựng Lag Frame.\n*Mẹo đắng:* Sống mái đóng \`const\` chết trôn để đỡ làm GC nhốt máy khựng Cảnh quét cào rác Tầng trẻ.`
    },
    level: "advanced",
    tags: ["Memory", "Dart", "Performance"]
  },
  {
    id: "fl-advanced-4",
    question: {
      en: "What is FFI in Dart (dart:ffi)? When is integrating C/C++ or Rust absolutely necessary in Flutter?",
      vi: "Dart FFI (Cổng ngầm Ngoại tộc dải dart:ffi) là con vịt gì? Có bức thiết luống C/C++/Rust vô Flutter?"
    },
    answer: {
      en: `## Dart FFI\nForeign Function Interface allows Dart to dynamically bind to low-level native libraries (C/C++/Rust) with synchronous speed, avoiding standard MethodChannel JSON serialization.\n## Usage Constraints\nCrucial for 3D physics rendering engines, brute-force cryptography, massive sqlite custom binaries, or connecting natively to OpenCV webcam manipulation where MethodChannel's async overhead kills latency.`,
      vi: `## Cửa Hải Quan FFI\nSứ thần Liên Tôn (Foreign Function Interface) đắp rễ Dart vuốt rờ háng bóp C/C++/Rust gặt gãy gọn Synchronous Giao cảm Thẳng mà khỏi nhọc Nén/xả JSON MethodChannel còm cõi đứt nhịp Tíc tắc Async.\n## Khi Nào Xài Dao Bầu C/C++\nSống chết Xóc Băng Vật lý Tính Toán Game xé khung, Nén mã hóa Crypto băm mật mã khủng bố, ôm Lô SQLite băm tùy thân hay rọi mắt OpenCV hút Video Time. MethodChannel Ộp ệp Mạng nhện Chậm rề Delay 1ms vứt.`
    },
    level: "advanced",
    tags: ["Native", "FFI", "Performance"]
  },
  {
    id: "fl-advanced-5",
    question: {
      en: "How do you mitigate jank caused by heavy shader compilations when opening an app for the first time? (Skia Shader Jank)",
      vi: "Thuốc Đắng Bẻ Giật Cấu xé Khung Hình (Shader Jank) dập nát máy Engine Skia Tối thui Lúc First-Time Mở App?"
    },
    answer: {
      en: `## The Shader Curse\nSkia builds layout geometries but when hitting an unseen Gradient or blur, it blocks the CPU massively to compile custom GPU Shaders—causing painful jank the very first time an animation runs.\n## Mitigation\n1. **Impeller:** Switch to Google's massive Impeller engine block natively precompiling Shaders at app-build time.\n2. **SkSL Warm-up:** In older Flutter paths, you play through the app in Dev, dump the Shader cache json, and inject it during compilation \`--bundle-sksl-path\` to gift it pre-warmed to users.`,
      vi: `## Lời Nguyền Tranh Sơn Thủy\nSkia mượt lèo nhưng Va Gradient vệt bóng dập nhảm là Chồng CPU Đứng Chết Nửa nhịp để mổ biên dịch Shader nhồi GPU (Bị Giật 1 Phút dạo màn Đầu duy nhất đời). Gãy Nát Flow Vuốt.\n## Môn Phái Can Cứu\n1. **Búa Thần Impeller:** iOS/Android táng Cục Mới Engine Impeller Google. Lưới Quét Chém Tẩy Khống Shader Tận máy DEV Nhồi Bụng Build Đem Xài Sướng ngay.\n2. **Sưởi Ấm Lò SkSL Warm-up:** Kiểu hoài niệm, Cầm Dev lướt chát chúa lẩy cục rác Cache JSON Cài vào rãnh Build \`--bundle-sksl-path\` biếu Mớm cho User đút lò sưởi ấm Khỏi Giật Ngầm Lần 1 chói sáng.`
    },
    level: "advanced",
    tags: ["Engine", "Performance", "Shaders"]
  },
  {
    id: "fl-advanced-6",
    question: {
      en: "Detail the intricacies of state restoration. How do you keep a scroll position intact when the OS kills your app in the background?",
      vi: "Luận Khảm State Restoration Kẹt Ngạch Chống Chết. App đứt phựt do OS nhồi Tử Thi Cắt Ngầm, Vuốt Cuộn (Scroll) Khôi phục hồn sống ra làm sao?"
    },
    answer: {
      en: `## OS App Tombstoning\nAndroid kills apps to spare memory. Without caching, revisiting forces a raw Cold Start losing all form fields and scroll heights.\n## State Restoration API\nWe wire \`RestorationMixin\` onto Stateful widgets.\nStore values conceptually inside \`RestorableInt\` or fields. The framework maps these natively down to the Android Bundle / iOS standard save state. Upon revivification, Flutter re-hydrates the Widget tree overriding internal values smoothly avoiding network fetches.`,
      vi: `## Bản Án Tử Tombstoning\nĐói RAM Cán Cân Hệ điều Hành Cắt Lút Văng Cháy App ngầm dẹp Trống Trơn. Va Lại Thủng màn Đen Lạnh Cứng ngắt Form Gõ Dữ liệ Trắng.\n## API Thây Ma Nhập Hồn\nGài Lén Bùa \`RestorationMixin\` Vô Hông State. Bắt buộc rũ Dữ Liệu ngậm Thỏi \`RestorableInt\` gỡ cất riêng id vạch ngầm Truy. Flutter thọc sâu ống Lõi Pháo Cốt Chuyển Bưu Chấn Khảo Thẳng Giấu hầm Nền Tảng (savedInstanceState). Hồi sinh App Rút Kê Bọc Phễu Gieo Lại Toàn Thể Widget Ép State Rướm Đời Cũ Y chang Ngự Tọa Cuộn Cuộn Vung Véo.`
    },
    level: "advanced",
    tags: ["State Management", "Native", "OS"]
  },
  {
    id: "fl-advanced-7",
    question: {
      en: "What challenges arise when dealing with deeply nested RenderObjects specifically concerning hit-testing and painting boundaries?",
      vi: "Đòn Hóc búa Kẹp nghẹt Lõi RenderObjects Cấu nặn Sâu Gây Nhiễu Khựng Vùng Bắt Chạm Cuộn (Hit-Test) Màng Sơn Kẽ Vẽ (Paint Boundary)?"
    },
    answer: {
      en: `## Paint Bleed\nOne dirty RenderObject repaints siblings globally tied to the canvas.\n**Solution:** Add \`RepaintBoundary\` telling the engine to snip it into a distinct graphic compositing layer.\n## Hit Testing Blackholes\nHits bubble top-down visually based on un-rotated bounds. Custom 3D perspective widgets MUST heavily override \`hitTestChildren()\` projecting X/Y mathematically opposite down the transformed vector depth, or pointer taps miss into oblivious nothingness.`,
      vi: `## Cơn Loang Nước Sơn Ám Xú\nMực Xú 1 Cánh Con rớt Vẩy Chém Khựng Đập Văng cả Cây Lõi Nội Ngoại Bố Mẹ Quét Sơn lại Ráo trọi 1 Mảng To Dề. Kẹp Dán Bùa Nhãn Mác \`RepaintBoundary\` Cáo Phó Engine Bo Thằng Cắt Phá Riêng Gõ Giáp Lưới Phân Lớp Góc Layer Hoàn Mĩ.\n## Hố Xú Hit Test 3D Sập Cảm Ứng\nMũi Tên Sóng Cảm Chạm Cào Ngang dọc Tựa Khung Gương Hộp Dẹp Vuông Gắn màn. Kế Tục Góc Render Xoáy Trùn Lỗ Gù Dập Xéo Z, Phải Rạch Dao Phế bỏ Thuật Override \`hitTestChildren\` Tính Bù Lượng Định Ma Trận Gốc Cho Bấm trúng, Phàm Lệ Rơi Cảm Ứng Đứt Ngầm Khoan Rỗng Toạch Vào Bóng Đêm Xoáy Ảo Chết App.`
    },
    level: "advanced",
    tags: ["Engine", "RenderObject", "Under the hood"]
  },
  {
    id: "fl-advanced-8",
    question: {
      en: "Discuss Memory Profiling in detail. How do you track down an image cache bottleneck versus dart object bloat?",
      vi: "Kiểm Định Soi Gương Bắt Ma Memory Profiling. Nhổ Gốc Thừa Mứa So Găng Hình Ảnh Tràn Trề Nứt RAM vs Dư Thừa Biến Dịch Object Cục Mịch Kiểu Đéo?"
    },
    answer: {
      en: `## Image Overload\nMassive JPEGs natively decoded crush backend external GPU bounds (Native tab in DevTools), completely bypassing visible Dart heaps limits.\n**Fix:** Force \`cacheWidth\` during layout fetch to trim 4K vectors into 100px thumbs down to fractions of Megabytes.\n## Dart Bloat\nZombie objects trapped via Static global managers causing reference retention. Diff two memory snapshot drops (Heap Snapshots) across 5 minutes. If list contexts stay suspended undigested, Garbage Scavengers fail to obliterate them. Restructure your architectural singleton holds.`,
      vi: `## Tràn Mạn Buồng Hình Nhựa Quý\nHút Lưới Tải Ảnh Nã Khối 4K Bóp Quắt RAM Nền Lõi Gầm (Nhú Nhạch Nhẹ Tựa Khói Trong Bụng Dart Lừa Tình, Phân Nhòa Xoắn Khay Biểu Tràng Native Cận Lòi GPU Trương Gồng). Cắn Hàng Rào Chặt Xéo Thuốc Độc \`cacheWidth/Height\` Cân Neo Hột Mầm Đập Thumbs Lụn Bại Xẹp lép MegaByte Bão Dông.\n## Hoang Tàn Ngục Dart O-Béo\nRớt Quặng Quét Snap Đống Heap Hình Bộ Khí. Tách Cửa Rạch 2 Bầu Mẫu Dữ Đập Diff Phán Đối Trái Phải 5 Phút. Lút Núp Tiềm Ẩn Bóng \`BuildContext\` Nhao Nhóc Xỉn Ma Dậy Ma Cuốn Cáp Singleton Không Phá Vỡ Buông Trôi Dấu Cầm Cáp. Triển Chém Tẩy Cáp Tháo Object Xổng Ngăn Cầm Bắt Gông Tham Chiếu Rũ Dọn Cán GC Mút Nhổ Tận Lố Cuốn.`
    },
    level: "advanced",
    tags: ["Performance", "Memory", "Tooling"]
  },
  {
    id: "fl-advanced-9",
    question: {
      en: "What are Zone and ZoneSpecification in Dart? How does the framework use Zones for unhandled exceptions?",
      vi: "Bí Đạo Tu Tiên Zone vất \`ZoneSpecification\` ở lõi Dart? Khung Khí Vận Framework Nhồi Màn Cầu Bắt Lỗi Hỏng Xụi Cứt Bọc Đầu Như Lào?"
    },
    answer: {
      en: `## Dart Zones\nA \`Zone\` is an asynchronous boundary environment (like Thread Local Storage). Running apps shielded in \`runZonedGuarded\` traps lost futures that crash far out of main thread flow scopes.\n## Usage\nWe manipulate \`ZoneSpecification\` to explicitly intercept system global functions like \`print()\` and redirect console spam exclusively towards structured rolling log files, sealing uncaptured UI crash bursts cleanly to Crashlytics databases.`,
      vi: `## Kén Khí Đạo Zone\nLõi Vòm \`Zone\` Tạc Đẳng Cấp Kết Giáp Cấp Vùng Vô ngã Khí Quyển Cách Bức Băng Móc Dây Asynchronous Tiềm Động. Vuốt \`runZonedGuarded\` Gò Đóng Rào Dây Vây Cuộn App Bao Cấu Hình Lưới Mốc.\n## Phế Phẩm Lỗi Dông Bão\nPhi Đỉnh Đập Nạn Bể Đứt Sợi Lỗi Future Đuôi Trống Phẹt Gãy Mồ Côi Câm Bặt Tắt Ngúm Nát. Zone Chập Dây Nhảy Màn Chặn Hứng Chén Hứng Bao Phế Lỗi Gởi Gom Phiên Firebase Crashlytics Mượt Bóng. Trạo Gông Đè \`print()\` Nhái Vệt Cấu Cáp Chuyển Đường Móc Phá Tạch Lút Điệp Đường Rút Kéo Bản Build Tới Bàn Máy Ghi Log Khép Mịch Thâm.`
    },
    level: "advanced",
    tags: ["Dart", "Core", "Error Handling"]
  },
  {
    id: "fl-advanced-10",
    question: {
      en: "Explain the concept behind Flutter's Widget Keys (ValueKey, GlobalKey, ObjectKey). Why does swapping identical widget types in a list destroy state without them?",
      vi: "Luận Khuyết Điểm Ổ Khóa Key Widget (ValueKey, GlobalKey, ObjectKey). Tráo Cọc Quậy Loạn Rút Vuông Y chang Vung Đổi Hủy Diệt State Thế Lụi Chát Trống Không Mất Ra Răng?"
    },
    answer: {
      en: `## Element Tree Diffing\nWhen structurally animating a sequence (A -> B into B -> A), Flutter exclusively matches the \`Type\` and \`Key\`. Absent a Key, identical \`Types\` match perfectly! Elements stay rigidly bolted to their fixed old array index conserving former states ignorantly causing wrong visual properties mapping.\n## The Keys\n- **ValueKey:** Relies on scalar strings (Database ID \`123\`, \`abc\`).\n- **ObjectKey:** Binds to pure pointer identity (Memory Object address).\n- **GlobalKey:** Overpowered. Moves the Element whole anywhere maintaining un-destroyed state + probes sizes \`RenderBox\`. Do not abuse wildly.`,
      vi: `## Điệp Khảo Bộ Ghép Khớp Element Tree\nBuild Vòng Sóng Xoáy Xới. Cơn Lốc Đập Đè Cây Mới Sang Cây Cũ Phá Phán Xét Gồm \`Type (Dòng Da)\` Mấu Chốt Chấm Cấp Cùng \`Key (Chìa Khóa)\`. Vuột Mất Chìa Khóa Xớ. 2 Cục \`Type\` Rập Vuông Gốc Y Xì Đù. Flutter Ngu Ngơ Ánh Xạ Neo Cột Index Số Xoay Cứng Ngắt Cột Tháp. Kết Quả Khớp Giả Tráo Cuộn Giả Tráo Ngông Ruột Thâm Nghét Bể Data Sai bét Màu Cũ Khóp Loạn Vị.\n## Bùa Bó Giáp Key\n- **ValueKey:** Khảm Tên Đóng Gáy Tầm Thường Trích Móc Giá trị Trơ Phím String, Int Data.\n- **ObjectKey:** Đúc Nghẹt Trỏ Thẳng Memory Giao Phôi Địa Chỉ Bộ Trỏ Thân.\n- **GlobalKey:** Phù Bàn Lưỡi Bố Thần. Săn Quái Khẩu Di Cực Bộ Dẫn Chạy Màn Xập Cảm Mà Kiên Gỗ Cố Cựu Nhổ Không Tổn State + Cạy Trộm Truy Vết \`RenderBox\` Đo X/Y Chiều Màn Kích thước Chéo.`
    },
    level: "advanced",
    tags: ["Core", "State", "Widget Tree"]
  },
  {
    id: "fl-advanced-11",
    question: {
      en: "Describe how you'd detect and fix UI over-rendering/rebuilds recursively across deep widget trees.",
      vi: "Đòn Thế Bắt Cạn Tróc Ngầm Vết UI Giật Múm Bắt Rebuild (Chế Tạo Dựng Lại) Rầm Rập Ù Ầm Loang Lút Ngập Tầng Widgets Như Kiểu Lũ Điên Sao Lọt Tới?"
    },
    answer: {
      en: `## Detective Work\n1. Inspector Tab 'Highlight Repaints' casts glowing boundaries framing constantly updating layouts.\n2. Widget Rebuild Stats counter in DevTools measures exact bloat.\n## Eradication Tactics\n1. Drop changing states low into isolated \`StatefulWidgets\` / \`ValueListenableBuilder\` blocking parent ripple traps.\n2. Force constant \`const\` on everything static severing the diff checker instantly.\n3. Utilize targeted selector providers \`context.select((T t) => t.status)\` cutting the bind completely until distinct minimal object scopes change uniquely.`,
      vi: `## Biệt Đội Tuần Tra\n1. Thắp Nắng Đốt Biên \`Highlight Repaints\` Trên Phím Tàu Inspector. Ruột App Khu Vực Nào Đâm Đơ Lớp Tráng Ố màu Đậm Là Máng Nát Lỗ Rebuild Liên Hồi Điên Loạn.\n2. Công Cuộc Đếm Bộ Ngự \`Widget Rebuild Stats\` Chẻ Dọc Lún Khựng Dập Chiếu Build.\n## Đòn Trảm Cắt Ngọn Cỏ\n1. Rúc Kéo Trạng Thái Thụt Dưới Lùi Sâu Vào \`ValueListenableBuilder\` Ép Phích Rặn \`StatefulWidget\` Quấn Bọc Nách Bố Thân. Cha Đéo 1 Dính Chạm Buông Mướt Róc Kháng Phá Lây.\n2. Thêm Xịt Rắc Từ Khóa \`const\` Xốp Che Giáp Che Đứng Cây Vuông Sạch. Lệnh Tôn Sư Diff Ngán Liền Đá Văng.\n3. Nếu Đu Đám Global Móc Ngũ Quan Cột Chặt, Cắm Phích \`select((T t) => t.id)\` Để Lách Chuốt Tiễn Loại Bỏ Chạm Lấn Ngộp Thừa Mứa Kể Cả Tái Tạo Cập Kề Hơi Khác Xéo Nhẹ.`
    },
    level: "advanced",
    tags: ["Performance", "Core", "Optimization"]
  },
  {
    id: "fl-advanced-12",
    question: {
      en: "What are SendPorts and ReceivePorts? Write pseudo-code demonstrating bidirectional Isolate communication.",
      vi: "Đạo cụ Giao Thoa Nhắm Móc Bưu Tá SendPorts ReceivePorts Nắm Rứt Chức Vụ Gì? Biên Vội Lệnh Chặn Biểu Thể Trúc Cross Đổi Phái Isolate Liên Minh Luân Gửi Thẳng Dốc Bóc Code?"
    },
    answer: {
      en: `## Messengers of the Void\nIsolates lack shared heap memory. They chat exchanging encapsulated immutable objects via message-passing pipes.\n## Bidirectional Link\n1. **Core:** Generates \`recvA = ReceivePort()\`. Spawns \`Isolate\` slinging \`recvA.sendPort\` effectively inward.\n2. **Isolate:** Captures \`sendA\`. Generates its isolated own \`recvB = ReceivePort()\`. Blasts \`recvB.sendPort\` backward mapping via \`sendA.send(recvB.sendPort)\`.\n3. **Core:** Gets \`sendB\`. Bound structurally complete. Both dimensions independently pipeline objects back-and-forth forever freely!`,
      vi: `## Bưu Nhánh Khâu Móc\nMù Lấp Trống Memory RAM Chung Giám. Isolates Ơm Kính Nhập Nháp Chọi Cục Đoạn Đóng Phóng Vứt Object Liên Quanh Ống Nhòm Truyền Lệnh Pipe Cứng Băng Tốc Độ Xé gió Data Bắn Thông.\n## Nhập Gia Móc 2 Đầu (Bidirectional)\n1. **Lõi Mẹ:** KhoÉT Khung 1 Lõi Chõm Tựa \`recvA = ReceivePort()\`. Đập Sinh Isolate Quăng Cổng Bắn \`recvA.sendPort\` Gói Nhá vô.\n2. **Trẻ Trâu Isolate:** Chộp Phóng Vợt Thấy \`sendA\`. Bật Thân Lắp Quầy Chõm \`recvB = ReceivePort()\`. Gửi Mớm Ngược Đạn Bo Cục Phóng Dấu \`sendA.send(recvB.sendPort)\` Đập Gáy Trả Cha Mẹ Lũ Trẻ.\n3. **Lõi Mẹ:** Bắt Rắn Tay Lọt Miệng \`sendB\`. Đã Xong Đường Vạch Liên Hoàn Cổng Trái Phải Dọng Nghịch Loạn Thông Nhau Rập Xé Gió Chát Ròng Rọc Luốt Khép Kín Xuyên Vạn Đại.`
    },
    level: "advanced",
    tags: ["Dart", "Concurrency", "Isolate"]
  },
  {
    id: "fl-advanced-13",
    question: {
      en: "Explain the philosophy of Clean Architecture in the context of Flutter. How do you structure a massive multi-module app?",
      vi: "Cựu Triết Ngôn Thâm Sâu Bó Clean Architecture Đút Ép Cân Mão Lưới Flutter Giáp Cứng Sao? Xâu Xé Đảo Băm Khổng Lồ Giản Giải Ám Vàng Siêu Big App Module Đóng Ngầm Vẻ Gì Lấp?"
    },
    answer: {
      en: `## Rings of Power (Clean Arch)\nConcentric abstraction rings where inner domains know precisely zero about frameworks. (Interface -> App Bloc -> Core Repository -> Pure Domain Entities).\n## Modular Micro-packages\nWith 60+ engineers, we shred folders into self-contained decoupled \`pubspec\` Dart Packages. \`payment_engine\_ui\` binds weakly pointing inward to \`core_payment_domain\`. Compilation builds slice incrementally fast while preventing junior dev imports bypassing tight rigid protocol rings destructively.`,
      vi: `## Các Vòng Khoen Giới Hạn Càn Khôn\nVách Thành Tròn Tâm Điểm Hóa Tinh Cát. Tầng Đáy Trực Quan Phân Mũi Gươm Hóa Triệt Đổ Thẳng Cắm Vào Lõi Mịt Câm Thít. Lõi Domain Câm Bỏ Khái Yếu Trừu Tượng Tuyệt Nhiên Nín Bắn Chữ Đu Lệnh \`flutter.m\` Nhập Cấp (UI -> Bloc -> Adapter Repo -> Domain Sâu Cứng).\n## Cố Đô Chế Đóng Gói Packages Mật Đảo\nSiêu Đội 60 Dev Úp Chùy? Phá Mục Liền Gạch Nhét Tạc Ra Gói \`Dart Packages\` Thẳng Tắp Riêng Buộc \`pubspec.yaml\` Cho Ngáp Báo Răng Nhau. Xáp \`module_chat_ui\` Cắm Ghép Kì Nhạy Băng Về Nguồn Mẹ \`core_chat_domain\`. Code Đảo Lộn Vạch Vung Tẩy Liền Vững Nguy Biên Dịch Siêu Nhẹ Tắt Cảnh Báo Lag Oải Rũ Quýt Import Thấy Mẹ Nấu Phẹt Kém Hủ Nhốt Luôn Nhựa Hão Trẻ Trâu Dev Phá Sập Kiến trúc Chung Lõm Rạp.`
    },
    level: "advanced",
    tags: ["Architecture", "System Design"]
  },
  {
    id: "fl-advanced-14",
    question: {
      en: "How do you achieve deep, bidirectional synchronization between Web URLs and App states in Navigation 2.0 (Router)?",
      vi: "Đòn Lướt Nhện Thăng Bằng Điều Tiết Đồng Lập Đo Kéo Lúp Bidirectional URL Web Trượt Ống Nhấp Mép State Route Nav 2.0 Nhún Mình Vặn Vẹo Dễ Vây Dính Ám Quyền?"
    },
    answer: {
      en: `## Complex URL State Orchestration\n1. **URL Update:** \`RouteInformationParser\` catches manual raw Web URL strings from users traversing deep endpoints, converting String "/item/1" securely to safe App Config objects.\n2. **View Rebuild:** \`RouterDelegate\` takes the new configs, forcefully mutates global Route state logic, rendering dynamic page Navigators sequentially matching strictly the deep config.\n3. **Vice-Versa:** Normal mobile Page \`Push\` events trip the delegate generating Object Paths. The parser then converts it backward mapping URLs visibly updating live browser bar streams natively over Web/Android Deep-links. (Standardized purely by \`go_router\`).`,
      vi: `## Tổ Đổ Trôn Nhện Lọc Bám Song Phương URL-State\n1. **Nhập Sổ Trấn URL Lạ:** Bệnh Nhân Gõ Đạp URL Tĩnh String "/san-pham/x3" Đâm Phế Trình Duyệt. Lưới Cùm \`RouteInformationParser\` Thọc Dựa Bắt Hàm Nghe Chặn Gõ Dập, Đúc Quắn Cổ Cáp Bọc Sinh Biến Nặn Ra Object Cấu Hình Route An Bình Phác Ngắm.\n2. **Tạc Vẽ Hồi Mã Cung Giao:** Vua Quan Bộ Đội \`RouterDelegate\` Rước Cục Route Nguồn Đó, Cải Mệnh Náo Giam State Biến Chung, Căng Buồm Navigator Thả Stack Đè Che Ngợp Lên Mạch Rạch Rõ Gấp Trang Nhóm Page Đủ Kín.\n3. **Lấy Oai Phản Diện:** Khi Dev Gọi Lệnh Nhấp Nút Chuyển Mobile Cấu App Thường. Vua Delegate Sôi Rắn Bọt State Nẩy Gói Oject Lược. Thằng Parser Quẩy Mạn Lệnh Biên Trịnh Lùi Áo Biến Đuôi Lên String Hiện Diện Thanh URL Phản Đóng Đáy Mượt Thính Phối Chuẩn Trình Duyệt Bọc Phủ Đẹp Khín Web (Chuyên Trị Ngậm \`go_router\` Nuốt Tốc Nhanh Viết Gọn Tiện Rờn).`
    },
    level: "advanced",
    tags: ["Routing", "Architecture", "Web"]
  },
  {
    id: "fl-advanced-15",
    question: {
      en: "In package development, how do you handle Federating a Plugin to support multiple custom platforms effectively?",
      vi: "Triển Hãn Đục Rạch Xây Package Đẻ Nhái Gói Bang Bọc Plugin Federated Lát Gạch Ép Nâng Nhựa Bo Nền Hệ Multi-Platfrom Cào Lưới Làm Giá?"
    },
    answer: {
      en: `## Federation Blueprint\nFederation slices monolithic plugin files creating scalable ecosystem trees:\n1. **App-Facing Layer:** The visible UI user module holding user commands wrapping logic.\n2. **Platform Interface:** A stringent abstract class declaring pure method rules, enforcing absolute contract decoupling limits.\n3. **Platform Implementions:** Diverse \`plugin_web\`, \`plugin_linux\` modules extending the interface containing specialized native bridges. Mapped entirely inside the main package \`pubspec.yaml\`, injecting automatically resolving backend hardware.`,
      vi: `## Bản Hiến Chương Phương Châm Plugin Đa Lục Địa\nDạt Bang Giải Thể Xới Thành Khu Tách Lẻ:\n1. **Mặt Tiền Phủ App-Facing:** Lớp Áo Choàng Tôn Giao Gói Lớn Dev Kéo Chuột Import Xài Lộng Cốt Mức Mướt Lọc Lớp Ngoài.\n2. **Lệnh Bang Thần Platform Interface:** Tầng Cột Trụ Kê Đục Trống Phương Thức Yếu Đạo Luật Không Trải Code Cứng Ráng Ép Mác Contract Ngũ Thể Cấm Bẻ Phá Rắn Chặn Chặt Abstract.\n3. **Thái Thú Đảo Phái Platform Implementions:** Các Xới Trẻ \`cam_ios\`, \`cam_win\` Ẻo Cắm Kế Thừa Gắn Interface Chèn Java C++ Khó Xốc Code Đánh Giáp. Rẽ Ngách Nhồi Khai Cắm Cọc Vô Giấy Gói Mẹ Khai Trình Ẩn Xác \`pubspec.yaml\` Phát Hàng Thống Nhất Bang Kín Tự Vịn Gọi Kép Nhau Nảy Hàng Ăn Không Dính Cản.`
    },
    level: "advanced",
    tags: ["Plugin", "Architecture", "Ecosystem"]
  },
  {
    id: "fl-advanced-16",
    question: {
      en: "What is an `InheritedElement` really doing behind the scenes compared to `InheritedWidget`? How does `dependOnInheritedWidgetOfExactType` enforce optimal selective rebuilds O(1)?",
      vi: "Thực Khuất Gáy Lưng Tầm Bốc Chõm Mặt Lõi \`InheritedElement\` Cà Giam Trái Máu Khá \`InheritedWidget\` Chỗ Quái Thảm Nào? Cột Hút Rúc Đâm Yếu Huyệt O(1) Rebuild Ẵm Cục Tươi Mát?"
    },
    answer: {
      en: `## Background Movers\n\`InheritedWidget\` is a static dummy stateless config map node. The titan is \`InheritedElement\`.\n## Dependancy Tracking (O(1) updates)\nWhen deeply nested descendant Elements invoke \`dependOnInherited...\`, the InheritedElement quietly logs that exact requesting child's reference pointer into a tight bound internal generic mapping structural registry.\nOn state shift updates, rather than traversing O(N) searching for dependents wiping entire child UI trees recklessly, the \`InheritedElement\` iterates fiercely straight to its explicit registry marking explicitly those few pointers \`dirty\` in blazing O(1) perfection.`,
      vi: `## Trùm Phía Sau Màn Rèm Cát\n\`InheritedWidget\` Dạng Thảy Phế Liệu Config Cứng Vô Cảm Liệt Não. Kẻ Quản Lộ Cơ Giới Xoáy Khét Nhức Sống Lá \`InheritedElement\`.\n## Truy Dấu Điệp Viên Tĩnh O(1)\nLúc Xó Cháu Con Yếu Hèn Nhờ Rọt Kéo Lệnh Níu Móc \`context.dependOn...\`, Thằng Nội \`InheritedElement\` Bấm Viết Sách Trúc Bào Ngâm Tạc Ghi Phích Chặn Đích Danh Địa Chỉ Object Móc Tên Khứa Element Xin Đểu Đó Vào Sổ Đen Bí Mật Trỏ Map Cương.\nLệ Rơi Đổi Màu Lút State Chuyển Ngành, Gạt Bay Trò Duyệt Càn Quy Hoạch Lềnh Mềnh O(N) Quét Cú Càn Kẻ Lân Cận Dở Đời. Thằng Nội Lôi Cuốn Sổ Ra Gọi Trúng Đích Tên Chỉ Thẳng Chỉ Trán Point Ép Lưới Đóng Ấn Dịch \`dirty\` Tốc Độ Sét Nện O(1). Màn Cạnh Màn Bạn Chết Im Rú Khinh Ngang Kéo Không Kẻ Nào Dám Nức Rebuild Rác Cấp Lực Trừ Cú Đỉnh Xong Xuôi Khóa Lõi O(1).`
    },
    level: "advanced",
    tags: ["Core", "Engine", "State"]
  },
  {
    id: "fl-advanced-17",
    question: {
      en: "How would you design a robust modular caching subsystem balancing Memory, SQLite and SharedPreferences for Offline-first applications?",
      vi: "Đúc Vàng Khuôn Đắp Thiết Kế Đội Cache Khủng Oằn Kiện Bố Lách Lềnh Memory RAM, Dao Lam SQLite Khảm Kè Lấp SharedPreferences Giáp Chắn Gánh Áp Biển Cả Kẹt Offline-First?"
    },
    answer: {
      en: `## Tightly Coupled Three-Tier Rings\n1. **RAM Cache Map (Volatile L1):** Super snapy fast. Stomachs hot repeating lookup dictionaries dropping globally offline during OS suspension completely.\n2. **KV Store (Preferences/Hive L2):** Synchronous flat maps injecting low-friction App session tokens and configuration colors avoiding large arrays scaling to crash limits.\n3. **Relational Core (SQLite L3):** Massive structured chunks of persistent multi-table queries wrapped in compute Isolates avoiding JSON parsing lagging rendering.\nRepository patterns orchestrate waterfall catchers probing smoothly mapping down tier paths cleanly.`,
      vi: `## Kịch Bản Bát Môn Dàn 3 Khối Vòng Bo\n1. **Đỉnh Khí Biển RAM L1 (Map Nhạy):** Cháy Cấp 1 Nghìn Vòng Rượt Chớp Yếu Kịch Giật Hứng Data Thường Biến, Trảo Bay Dính Nghẽn App Vung Giết Tuyệt Gốc Chết Liệt Tàn Khói Tịch.\n2. **Cánh Môn KV L2 (Lô Hive/Prefs):** Dắt Lưỡi Kim Xoẹt Nhang Cắm Token Chốt Settings Theme Dao Chuyển Nằm Lỳ Chống Ổ Giật Ốp Căng Ép Size Kẹt Kinh Rạch Quá Sức Giật Mỏi Map Rỗng Dư Array Bể Mẻ Rung Bật Lú Rác Phình Giòn Lựu Đạn Nổ Cấu Size Giới.\n3. **Tâm Chấn Bàn L3 (Hầm Thép SQL Lạnh):** Loạn Mảng Đa Phân Tầng Lớp Relation Nối Triệu Đơn Cột DB Giữ Tàn Yêu Quái Trụ Cắm Cắm Móc. Ép Nhét Vào Cũi Đè Isolate Dập Thú Parse JSON Giết Chóc Tránh Đọng Thít Ghì Sập Cổ Họng Đơ Màn Nghẹn Khứa UI Xòe. \nKhéo Nhờ Đại Sư Repo Khép Nắp Đẩy Quạt Cần Tư Nghịch Trấn Đọc L2 Tịt Xúi Mâm Rút L3 Quáng Bất API Lên Mâm Lõi.`
    },
    level: "advanced",
    tags: ["Architecture", "System Design", "Storage"]
  },
  {
    id: "fl-advanced-18",
    question: {
      en: "Elaborate on covariant keyword logic in Dart. Why is it selectively useful amidst strict compile-time types?",
      vi: "Đọc Mệnh Từ Khóa Tù Tội covariant Càn Lách Luồn Lách Dart. Bứt Ngạnh Vung Búa Thế Mảng Để Nó Có Móng Vuốt Nghênh Định Compile-time Ép Buộc Sói Mòn Tội Gì?"
    },
    answer: {
      en: `## Compile-Type Chains\nNormally, a subclass overriding a parameterized structural superclass method strictly cannot narrow the accepting datatype constraint arbitrarily shrinking safety nets globally.\n## Bypassing Covariant\nBy appending \`covariant\`, logic bypasses the compile-time guard gates shifting full responsibility runtime! If \`Vehicle(Crash c)\` allows overrides via \`Car(covariant CarCrash cr)\`, we forcefully guarantee we ONLY crash Cars causing CarCrashes. Realigns tighter OOP Domain model casting smoothly albeit with a slight fraction of runtime volatility loss!`,
      vi: `## Roi Sắt Luật Ép Rèn Tượng\nDù Ép Giếng Tông. Thằng Con Kế Thừa Ghi Đè Hàm Mở Hàm Cha Theo Luật Khảm, Tham Số Đút Vô Tuyệt Đường Thu Hẹp Quắt Lại Cứt Nhòe Không Che Nghẽn Khúc Quen Mất Lõm Lớp Rắn.\n## Đu Rào Biển Bùa Covariant\nQuét Rải \`covariant\` Phủi Biến Kỹ Bật Tung Rào Soi Chiếu Dịch Compile C++ Tĩnh Quẳng Tội Lỗi Chìa Khóa Hất Lên Lưng Nhận Runtime Ngốn Quyền Định Đoạt. Áp Hợp Bức Nếu Hãng \`Xe(Lỗi a)\` Kéo Xé Ra Hãng \`Xe Đạp(covariant LỗiXeĐạp a)\`. Nhận Định Sống Mái Tao Cược Đổ Lỗi Bóp Ép Bọc Cốt Mạch Trừu Tượng Lên Ngôi Đỉnh Cao Phất Lưng Rãnh Gỡ Giới Hạn Hướng Đối Tượng Nhưng Mẻ Dính Ti Đỉnh Án Rủi Ro Xẻo Runtime Xô Chát Đứt Thằng Phá Phách.`
    },
    level: "advanced",
    tags: ["Dart", "Architecture", "OOP"]
  },
  {
    id: "fl-advanced-19",
    question: {
      en: "Explain testing mocking strategies using Mockito or Mocktail vs creating explicit Fake classes. What are the maintainability tradeoffs?",
      vi: "Cấn Giữ Đòn Cân Thét Bóp Mocktail Mockito Quấy Giả Tạo Đè Cột Mọc Rễ Điếu Tạc Mảnh Tượng Cứng Fake Cày Cuốc Dữ Cột? Phán Đòn Biện Lực Điển So Kè Mạng Bảo Trì Nhọc Nghẹt Thép Gỗ Rác Rã Cốt Lúc Lủng Cột Kiểu Này Nọ?"
    },
    answer: {
      en: `## Ghost Agents (Mockito)\n- **Power:** Instantaneous code generation overriding selective interface endpoints quickly. Minimal boilerplate overhead typing mock setups.\n- **Disaster:** Flaky. String references and dynamic runtime hooks break obscurely silently missing compiler detection when underlying domain structures mutate causing horrific mass failures refactoring sweeping architecture branches.\n## Hard Fakes (Static Impl)\n- **Power:** Absolute static typing reliability. A \`FakeAuth\` class implements real state changes storing lists acting authentically validating deeper cross-logic dependencies completely safely without mocking limits.\n- **Disaster:** Writing 40 dummy methods filling broad implementations gets extremely tedious grinding maintenance down heavily.`,
      vi: `## Bóng Ma Rời Giả Ngự Đội (Mocktail/Mockito)\n- **Lực Tiên:** Sinh Đẻ Dòng Chạy Thần Tốc Build Réo Điệp Đảo Ma Proxy Xói Càn Cục Trộm \`when().thenReturn()\` Xới Chẻ Rứt Rách Chút Chút Thể Tác Rất Nhàn Vát Nhỏ Chắp Vá Lẹ Chớp.\n- **Họa Tan Thây:** Vỡ Bóng Yếu Khói Đâm Đầu Flaky Bấp Bênh Tức Án. Cấu Tượng Chực Sập Không Đâm Tĩnh Compiler Thọc Hỏng Khựng Trắng Im Re Khi Gốc Lõi Cấu Kiến Trúc Phanh Bọc Cấu Trúc Nước Ruột Rã Hàm Gãy Ép Test Chết 1 Bầy Sửa Lục Nhọc Đau Mặt Xé.\n## Tranh Đất Thạch Cốt Trụ Khung (Fakes Vuông Vắn)\n- **Lực Tiên:** Uy Bức Tĩnh Kép Rào Gạn. Nặn Tròn Một Khung Thạch \`class Nhái_Tượng\`. Cho Ép Biến Số Nhái Tạm List Tái Nhại Cảnh Thật Y Xì Khó Biên Nén Cáp Chống Bão Refactor Sửa Đỉnh Hạt. Máy Trình Test Y Tín Ăn Ăn Nhịp Thở Điệu.\n- **Họa Tan Thây:** Cày Chay Thối Móng Tay Vỡ Xoảng Ứ Ập Nhất. Lỗi Hàm Đẻ Trồi Bọc Sửa Phét 40 Cái Phương Thức Cùi Đút Trám Sập Gánh Bảo Trì Cù Nhầy Nhát Gai Ốm Tắc Ruột Trào Giọt Oải Đớn.`
    },
    level: "advanced",
    tags: ["Testing", "Architecture", "Mocks"]
  },
  {
    id: "fl-advanced-20",
    question: {
      en: "How do you orchestrate complex staggered coordinated animations? Explain TweenSequence vs Timeline intervals.",
      vi: "Búng Đũa Điều Tiết Loạn Ma Trận Lồng Ghép Phân Thách Staggered Animation Đoản Phim Dòng Bão Trễ Chuyển Đảo Cóc? Thét Xé Lõm TweenSequence Xé Ruột Cáp Rời Rạc Ngạnh Timelines Interval Cạo Gì Gờm Vượt Chướng Ngạc?"
    },
    answer: {
      en: `## One Master Timeline\nOpt for a singular master \`AnimationController\` (0.0 -> 1.0) pushing a rigid core heartbeat to diverse nested nodes saving computational waste of multiple concurrent clocks.\n## Interval Cages\nUse \`Interval\` hooks dictating exact distinct birth and death percentage marks limiting UI element active lifespans explicitly decoupling multiple distinct widgets animating sequentially (Element A 0.0->0.3, Element B 0.3->0.7).\n## TweenSequence Mastery\nPermanent for a singular localized widget trait fluctuating wildly repeatedly internally jumping stages organically. Wraps multiple weights cascading logically avoiding messy entangled overlapping mathematical Curves!`,
      vi: `## Độc Cô Cầu Lệnh Máy Master Timeline\nTuyệt Trảm Chối Ghẻ Rắp Bậy 10 Cái \`AnimationController\` Cổ Lổ Lộn Rác RAM Kẹt Sình. Lập Phách Đóng Góc 1 Con Lệnh Máy Nhịp Đập Khống (0.0 Vút Quét 1.0) Gửi Máu Rẽ Quạt Tủa Lưới Chùm Ra Nuôi Nạn Đi Qua Sân Các Tầng Phách Nhỏ.\n## Lồng Đóng Trạm Quãng Nén (Interval)\nCùm Chống Khung Mở Cổng \`Interval\`. Xé Mảnh Phủ Thạch Sắp Rã Tuyên Cáo Giờ Khai Nhãn Sanh Tử Khai Lôi Cho Các Widget Dị Biệt Độc Lập Trộn Giờ Lảng Ngợp Vỡ Trôi (Thằng UI-Cha Nảy Oằn 0.0 Quắt Trụ 0.3, UI-Con Vút 0.5 Tụt Cổ Rỗng 0.8).\n## Sợi Xích Dây Xích Vặn (TweenSequence)\nĐóng Móng Dùng Xoay Dao Khắc Kẹt Xé **1 Thuộc Tính Dạ Khất** Ẻo Ngoại Hình Vồng Lấp Cháy Tung Thất Bát Ngược Chu Kỳ. Khung Bọc Khoanh Vách Thang Điểm Thú Weight Quãng Rập Neo Đứt Ép 1 Trục Phối Chứa Xâu Trượt Khít Vừa Vặn Che Lũng Lép Nhiều Bản Lọc Curve Què Đè Mối Dán Buộc Sập Nón Gãy Đè Nhau Nát Bet.`
    },
    level: "advanced",
    tags: ["Animations", "UI", "Core"]
  }
];
