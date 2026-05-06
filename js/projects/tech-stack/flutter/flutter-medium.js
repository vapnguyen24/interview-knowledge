export const mediumQs = [

    {
      id: "fl-intermediate-1",
      question: {
        en: "Explain Isolates in Dart and how they differ from typical threads. When do you use compute()?",
        vi: "Giải thích Isolate trong Dart và điểm khác biệt so với thread thông thường. Khi nào dùng compute()?"
      },
      answer: {
        en: `## Isolates\nDart is single-threaded. To avoid blocking the main UI thread during heavy computations, Dart provides *Isolates*. Unlike traditional threads, Isolates **do not share memory**. Each isolate has its own memory heap and event loop. They communicate purely by passing messages via \`ReceivePort\` and \`SendPort\`.\n\n## compute()\n\`compute()\` is a helper function that spawns a background isolate, runs a single callback function, returns the result, and immediately kills the isolate. Use it for heavy tasks like JSON parsing large files or complex image processing.`,
        vi: `## Isolates\nDart là ngôn ngữ đơn luồng (single-threaded). Để không chặn luồng UI khi xử lý nặng, Dart dùng *Isolates*. Khác với thread (luồng) truyền thống của Java/C++, các Isolate **không dùng chung bộ nhớ**. Mỗi isolate có một vùng nhớ (heap) và vòng lặp sự kiện (event loop) riêng biệt. Chúng giao tiếp với nhau qua cấu trúc truyền nhận tin nhắn (Ports).\n\n## compute()\nLà một hàm bọc tiện ích giúp tự động tạo một isolate chạy ngầm, thực thi một hàm, trả về kết quả rồi tự hủy isolate đó. Rất hữu ích cho các tác vụ như tính toán thuật toán, hay parse file JSON siêu lớn.`
      },
      level: "intermediate",
      tags: ["Dart", "Concurrency"]
    },

    {
      id: "fl-intermediate-2",
      question: {
        en: "Compare Provider and Riverpod. Why was Riverpod created by the same author?",
        vi: "So sánh Provider và Riverpod. Tại sao Riverpod lại được tạo ra bởi cùng một tác giả?"
      },
      answer: {
        en: `## Provider\nRelies heavily on the widget tree (\`InheritedWidget\`). If you try to consume a Provider that isn't placed above your widget in the tree, it throws a \`ProviderNotFoundException\` at runtime. Also, combining multiple providers is tedious (\`ProxyProvider\`).\n\n## Riverpod\nRiverpod stores state **outside the widget tree**. This makes state strictly compile-time safe (no runtime exceptions for missing providers). It also natively supports multiple providers of the same type, asynchronous state (FutureProvider/StreamProvider), and extremely robust dependency combination without \`ProxyProvider\` boilerplate.`,
        vi: `## Provider\nPhụ thuộc chặt chẽ vào widget tree (dựa trên \`InheritedWidget\`). Lỗi chí mạng là nếu bạn \`context.read<T>()\` một provider chưa được khởi tạo ở nhánh cha, app sẽ crash \`ProviderNotFoundException\` ngay lúc runtime (lúc đang chạy).\n\n## Riverpod\nRiverpod lưu trữ state **bên ngoài widget tree**. Nhờ vậy, nó giải quyết triệt để lỗi runtime (bắt lỗi từ lúc gõ code). Riverpod cho phép khai báo nhiều provider cùng Type, xử lý bất đồng bộ xịn xò (FutureProvider, StreamProvider) và việc gọi các provider chéo nhau dễ dàng hơn nhiều so với sự lằng nhằng của \`ProxyProvider\`.`
      },
      level: "intermediate",
      tags: ["State Management", "Architecture"]
    },

    {
      id: "fl-intermediate-3",
      question: {
        en: "Explain the BLoC pattern (Business Logic Component). What are Events and States?",
        vi: "Giải thích pattern BLoC (Business Logic Component). Sự khác biệt giữa Events và States?"
      },
      answer: {
        en: `## BLoC Pattern\nBLoC strictly separates business logic from UI. The UI components only focus on rendering state and dispatching actions.\n\n## Events vs States\n- **Events:** Inputs from the user or system (e.g., \`FetchDataEvent\`, \`ButtonPressedEvent\`). The UI adds these events to a sink.\n- **States:** The output from the BLoC (e.g., \`LoadingState\`, \`SuccessState\`, \`ErrorState\`). The UI listens to a stream of these states and rebuilds accordingly.\n\n*Senior view:* BLoC enforces a predictable, unidirectional data flow, making testing and debugging highly reliable for massive enterprise apps.`,
        vi: `## BLoC Pattern\nBLoC tách biệt hoàn toàn Logic nghiệp vụ khỏi Giao diện. UI chỉ có nhiệm vụ hiển thị và gửi đi các hành động.\n\n## Events vs States\n- **Events (Sự kiện):** Là đầu vào (Input) từ user (ví dụ: Bấm nút, Cuộn trang...). UI sẽ bắn (add) event này vào luồng.\n- **States (Trạng thái):** Là đầu ra (Output). Dựa vào Event, BLoC xử lý API/Database xong sẽ đẩy ra State mới (\`Đang tải\`, \`Thành công\`, \`Thất bại\`). UI chỉ nằm nghe hóng (listen) State này để vẽ lại màn hình.\n\n*Senior view:* BLoC tạo ra luồng dữ liệu 1 chiều (Unidirectional) cực kỳ dễ dự đoán, là tiêu chuẩn công nghiệp cho các siêu ứng dụng vì khả năng viết Test thần sầu.`
      },
      level: "intermediate",
      tags: ["Architecture", "State Management"]
    },

    {
      id: "fl-intermediate-4",
      question: {
        en: "What is the difference between Ephemeral State and App State?",
        vi: "Sự khác biệt giữa Ephemeral State (State phù du) và App State là gì?"
      },
      answer: {
        en: `## Ephemeral State (Local State)\nState neatly contained inside a single widget. Examples: the current page in a \`PageView\`, a loading animation toggle, or text inside a \`TextField\`. Use \`StatefulWidget\` and \`setState()\` for this. Intentionally throwing a BLoC/Provider at these makes the codebase unnecessarily complex.\n\n## App State (Global State)\nState that must be shared across many parts of the application, and needs to be persisted between user sessions. Examples: User Authentication token, Shopping Cart contents, or App Theme preferences. Use robust tools like \`Riverpod\`, \`BLoC\`, or \`Redux\`.`,
        vi: `## Ephemeral State (Local State)\nLà trạng thái cục bộ chỉ có ý nghĩa lẩn quẩn bên trong 1 widget duy nhất. Ví dụ: Tab hiện tại đang chọn, Animation của một nút bấm, giá trị gõ trong \`TextField\`. Giải pháp khôn ngoan nhất ở đây là cứ dùng \`StatefulWidget\` + \`setState()\`. Việc lôi dao mổ trâu (BLoC/Riverpod) ra chém đống logic này là biểu hiện của over-engineering.\n\n## App State (Global/Shared State)\nLà trạng thái bắt buộc phải chia sẻ chéo ở nhiều màn hình khác nhau hoặc lưu xuyên suốt app. Ví dụ: Trạng thái User đã đăng nhập chưa, Giỏ hàng có gì. Bắt buộc phải dùng công cụ quản lý state mạnh (BLoC, Riverpod).`
      },
      level: "intermediate",
      tags: ["State Management"]
    },

    {
      id: "fl-intermediate-5",
      question: {
        en: "How do you implement Dependency Injection (DI) in Flutter?",
        vi: "Cách triển khai Dependency Injection (DI) trong Flutter như thế nào?"
      },
      answer: {
        en: `## Dependency Injection\nFlutter does not have built-in DI like Spring Boot or Angular. We typically use the \`get_it\` package as a Service Locator.\n\n## How it works\nYou register singletons or factories in a centralized file (e.g., \`locator.registerLazySingleton<AuthService>(() => AuthServiceImpl())\`). \nIn your UI or ViewModels, instead of instantiating the class (\`new AuthServiceImpl()\`), you just call \`locator<AuthService>()\`. This decouples implementations from interfaces, enabling easy mock swapping during Unit Testing.`,
        vi: `## Dependency Injection\nFlutter bản chất không có sẵn DI Container mạnh như Spring Boot hay Angular. Tiêu chuẩn cộng đồng là dùng package \`get_it\` đóng vai trò Service Locator.\n\n## Cách triển khai\nBạn thiết lập một file tổng đăng ký các dependency (ví dụ: \`locator.registerLazySingleton<AuthService>(() => AuthServiceImpl())\`).\nỞ tất cả UI hoặc Logic Bloc cần xài, thay vì khởi tạo chay (\`new AuthServiceImpl()\`), bạn chỉ gọi \`locator<AuthService>()\`. Code sẽ tách rời khỏi việc phụ thuộc cứng vào implementation định sẵn, và lúc viết Unit Test chỉ cần tráo (mock) implementation giả vào là chạy ngon lành.`
      },
      level: "intermediate",
      tags: ["Architecture", "Testing"]
    },

    {
      id: "fl-intermediate-6",
      question: {
        en: "Explain the RenderObject concept. How does it relate to Widgets and Elements?",
        vi: "RenderObject là gì? Mối quan hệ giữa Widget, Element và RenderObject?"
      },
      answer: {
        en: `## The Three Trees Architecture\n- **Widget Tree:** Blueprints mapping the developer's desired UI configuration. Highly ephemeral; rebuilt constantly.\n- **Element Tree:** The logical glue. It holds the state and manages the lifecycle. It maps a Widget to a RenderObject.\n- **RenderObject Tree:** The powerhouse that handles exact layout sizes, hit testing, and painting pixels to screen. It persists and only mutates what's absolutely necessary.\n\n*Senior view:* Most devs only touch Widgets. Knowing how to write a custom \`RenderBox\` is what distinguishes UI experts when heavily customizing layout protocols beyond standard flex constraints.`,
        vi: `## Cấu trúc 3 cây (Three Trees)\n- **Widget Tree:** Là bản thiết kế (blueprint) do bạn viết. Chúng rất nhẹ, được tạo ra và vứt đi liên tục từng micro giây.\n- **Element Tree:** Là xương sống logic quản lý vòng đời. Mỗi Widget đều sinh ra 1 Element. Nó đối chiếu giữ State và liên kết với khâu vẽ màn hình.\n- **RenderObject Tree:** Đây mới là trùm cuối. Nó tính toán kích thước từng pixel (layout), nhận diện thao tác chạm (hit testing) và lấy màu sơn lên màn hình (painting). Cây này rất bảo thủ, cố gắng tái sử dụng tài nguyên tối đa.\n\n*Senior view:* 99% dev chỉ cắm đầu viết Widget. Việc chạm tới \`RenderBox\` để chèn luật layout riêng là đỉnh cao của Custom UI.`
      },
      level: "intermediate",
      tags: ["Core", "Engine"]
    },

    {
      id: "fl-intermediate-7",
      question: {
        en: "How do Platform Channels (MethodChannels) work in Flutter?",
        vi: "Platform Channels (MethodChannels) hoạt động thế nào trong Flutter?"
      },
      answer: {
        en: `## MethodChannels\nMethodChannels facilitate asynchronous message passing between Dart code and Native code (Swift/Kotlin/Java/Obj-C).\n\n## Workflow\n1. Dart invokes a method on the channel with a string identifier (e.g., \`invokeMethod('getBatteryLevel')\`).\n2. The message is serialized into standard formats (like JSON) and sent over the C++ engine bridge.\n3. The Native side listens to that channel identifier, executes platform-specific SDK code, and replies back asynchronously.\n\n*Senior context:* Channels are asynchronous by design so as not to block the UI thread. Use \`EventChannel\` for continuous data streams like GPS or Bluetooth signals.`,
        vi: `## MethodChannels\nĐây là chiếc cầu nối để code Dart có thể "nhờ vả" code Native (Java/Kotlin/Swift) gọi giùm các hàm hệ thống mà Flutter không chạm tới thuần được.\n\n## Cách chạy\n1. Dart gửi một lời gọi hàm kèm 1 cái tên lên kênh (VD: \`invokeMethod('getBatteryLevel')\`).\n2. Dữ liệu được mã hóa nhị phân bay qua engine C++ dưới gầm.\n3. Lập trình viên viết sẵn 1 cục Listener ở bên Android/iOS, nhận lệnh, dùng SDK thiết bị để lấy mức pin, rồi gửi trả lại kết quả bất đồng bộ về Dart.\n\n*Senior context:* Vì tính chất bất đồng bộ, nó sẽ không làm lag UI. Nếu cần nhận dữ liệu liên tục (như tọa độ GPS, la bàn), đừng dùng \`MethodChannel\`, hãy dùng \`EventChannel\`.`
      },
      level: "intermediate",
      tags: ["Native", "Platform"]
    },

    {
      id: "fl-intermediate-8",
      question: {
        en: "What are Slivers in Flutter and when should you absolutely use them?",
        vi: "Slivers trong Flutter là gì và những trường hợp nào bắt buộc phải dùng chúng?"
      },
      answer: {
        en: `## Slivers\nA *Sliver* is just a slice of a scrollable area. While a normal \`ListView\` applies a rigid box protocol (min/max width/height), Slivers use a sliver protocol dealing directly with scroll geometry, offsets, and overlaps.\n\n## Use Cases\nSlivers are mandatory when building complex, custom scrolling effects like:\n- Expanding/collapsing AppBars (\`SliverAppBar\`).\n- Parallax headers or grids mixed smoothly with linear lists.\n- Placing sticky headers that pause while scrolling (\`SliverPersistentHeader\`).\nBehind the scenes, \`ListView\` is structurally just a \`CustomScrollView\` wrapping a single \`SliverList\`.`,
        vi: `## Slivers\nSliver dịch thô là "một phần/lát cắt" của một khu vực có thể cuộn. Nếu \`ListView\` thường chỉ biết vẽ một giao diện hộp cứng, thì Sliver hoạt động trên cơ chế tính toán hình học cuộn (Sliver constraints), can thiệp sâu vào thanh cuộn, phần trăm khuất, phần đè chéo gốc layout.\n\n## Khi nào dùng\nBắt buộc dùng khi sếp hoặc designer yêu cầu các layout bay lượn lúc scroll:\n- Thanh tiêu đề AppBar co dãn, lúc cuộn mất mờ mờ đi (\`SliverAppBar\`).\n- Trộn lẫn 1 layout dọc hẹp với 1 cục layout Grid (\`SliverGrid\`) cuộn mượt mà dính cứng vào nhau.\n- Header dính lại ở cạnh màn hình khi cuộn tới mốc.\nThực chất \`ListView\` bạn xài hàng ngày là vỏ bọc nhẹ của \`CustomScrollView\` kẹp \`SliverList\` bên trong.`
      },
      level: "intermediate",
      tags: ["Widgets", "UI", "Scroll"]
    },

    {
      id: "fl-intermediate-9",
      question: {
        en: "Why is it dangerous to use BuildContext across an asynchronous gap? How do you prevent it?",
        vi: "Tại sao dùng BuildContext lọt qua một khoảng async (asynchronous gap) lại nguy hiểm? Giải pháp khắc phục?"
      },
      answer: {
        en: `## The Danger\nIf you \`await\` an operation (e.g., an API request) and then use \`Navigator.of(context)\` or \`ScaffoldMessenger.of(context)\`, the widget possessing that \`context\` might have already been removed from the widget tree by the user going back.\nThis throws a disastrous \`BuildContext used across a widget tree after being unmounted\` exception.\n\n## Prevention\nSince Dart 2.12+, you must explicitly check \`if (!context.mounted) return;\` immediately after to safeguard the use of that context. Alternatively, extract navigation logic outward using GlobalKeys attached to Navigators.`,
        vi: `## Mối nguy hiểm\nTrong 1 hàm onClick, bạn gọi hàm API \`await callApi()\`. Trong thời gian hệ thống đợi mạng, user bấm nút Back thoát khỏi màn hình đó. \nKhi data về, code chạy tiếp và bạn gọi \`ScaffoldMessenger.of(context)\`. Vì màn hình cũ đã bị unmount tiêu hủy, \`context\` đó chết ngắc, dẫn đến Crash app vỡ mặt.\n\n## Cách phòng vệ\nLuôn để câu thần chú \`if (!context.mounted) return;\` ngay lập tức phía sau dòng \`await\`. Nó sẽ kiểm tra màn hình còn sống không rồi mới thực thi tiếp logic UI. Cách cao cấp hơn là dùng Global Navigator Key ở Router để không cần dựa vào context của page nữa.`
      },
      level: "intermediate",
      tags: ["Core", "Async", "Best Practices"]
    },

    {
      id: "fl-intermediate-10",
      question: {
        en: "What are some common memory leak sources in Flutter applications?",
        vi: "Những nguyên nhân thường gặp nhất gây ra Memory Leaks (rò rỉ bộ nhớ) trong ứng dụng Flutter?"
      },
      answer: {
        en: `## Common Causes\n1. **Unclosed Streams/Controllers:** Forgetting to call \`dispose()\` on \`TextEditingController\`, \`AnimationController\`, or \`StreamController\`.\n2. **Unregistered Listeners:** Attaching listeners to global objects or \`ChangeNotifier\` and ignoring to \`removeListener\` them when the widget unmounts.\n3. **BuildContext caching:** Storing a global reference to a local \`BuildContext\`, forcing the garbage collector to keep the entire detached widget tree in memory.\n\n*Senior trait:* Relentlessly hunting leaks using the DevTools Memory visualizer, checking for stranded instances by forcing garbage collection.`,
        vi: `## Nguồn cơn lọt hố rò rỉ\n1. **Quên gọi dispose():** Hay gặp nhất là tạo \`TextEditingController\`, \`AnimationController\`, Timer, Stream nhưng lúc rời page không nhớ viết hàm \`dispose()\` để đóng tụi nó lại.\n2. **Listener quên gỡ (removeListener):** Gắn tai nghe vĩnh viễn vào các object global (như AppState) ở \`initState()\`, nhưng quên tháo ra lúc màn hình biến mất.\n3. **Cầm tù BuildContext:** Lưu context vào một Singleton Class tĩnh. Garbage Collector (bộ thu gom rác) không dám đổ rác biến context đó, dẫn đến toàn bộ cây Widget cũ nằm chình ình trong RAM.\n\n*Senior trait:* Khó có app nào không nếm mùi Leak. Senior Dev luôn thuộc bài mở DevTools Memory Snapshot, càn quét dò tìm các object ngầm theo định kỳ.`
      },
      level: "intermediate",
      tags: ["Performance", "Memory"]
    },

    {
      id: "fl-intermediate-11",
      question: {
        en: "What is Declarative Routing (Navigation 2.0)?",
        vi: "Khái niệm Declarative Routing (Navigation 2.0) là gì?"
      },
      answer: {
        en: `## Navigator 1.0 (Imperative)\nIn Nav 1.0, you explicitly command Flutter: "Push this screen, Pop that screen." State is hidden in the engine.\n\n## Navigation 2.0 (Router API)\nIt synchronizes the app's route state with app state declaratively. The navigation stack becomes a function of your app's state. When a state variable \`isLoggedIn\` changes, you simply update the state array, and the router rebuilds the stack replacing the login page with the home page instantly.\nThis guarantees flawless OS back-button synchronization, profound Deep Linking structures, and Web URL integration.\n*(Packages like \`go_router\` or \`auto_route\` simplify this complex API)*`,
        vi: `## Navigator 1.0 (Mệnh lệnh cứng)\nỞ Nav 1.0, bạn ra lệnh kiểu thủ công: "Cất màn A vào kho, Mở màn B ra". Stack của route bị giấu nhẹm bên dưới engine.\n\n## Navigation 2.0 (Khai báo - Declarative)\nStack Màn hình bây giờ phản chiếu 100% dựa theo State của App. Nếu biến \`isLoggedIn\` đổi thành false, State của mảng Route đổi, hệ thống sẽ tự động rebuild ném màn hình Home đi và hiện màn hình Login ngay lập tức.\nCơ chế này giúp giải quyết việc Deep Link (vào app từ web), bắt chính xác nút Back của hệ thống trên Android lẫn nút Back của trình duyệt Web.\n*(Thực tế API gốc khá lằng nhằng, dev thường xài tool \`go_router\` của team Google làm ra)*`
      },
      level: "intermediate",
      tags: ["Architecture", "Routing"]
    },

    {
      id: "fl-intermediate-12",
      question: {
        en: "Difference between Stream and Future. What is a StreamController?",
        vi: "Phân biệt Stream và Future. StreamController là gì?"
      },
      answer: {
        en: `## Future vs Stream\n- **Future:** Responds **once** with a value or an error in the future. (e.g., getting an HTTP response).\n- **Stream:** Pushes a **series** of values over time asynchronously. (e.g., WebSocket feeds, GPS coordinate updates).\n\n## StreamController\nA \`StreamController\` gives you total control over a Stream. You use its \`sink\` property to \`add()\` new events/data into the stream, and expose the \`stream\` property for other components (like \`StreamBuilder\`) to listen and react to.`,
        vi: `## Future vs Stream\n- **Future:** Giống như đặt giao hàng, người giao mang đồ tới đúng vỏn vẹn **1 lần** rồi xong. (Vd: API HTTP request).\n- **Stream:** Giống như vòi nước máy. Nước chảy ra **liên tục** tới khi khóa van. (Vd: Nhắn tin Socket, vị trí toạ độ chuyển động GPS).\n\n## StreamController\nLà trung tâm điều khiển cai quản dòng chảy đó. Người vận hành dùng \`khoang chứa (sink)\` để bơm (\`add\`) data vào trong ống, rồi ném đầu ra \`stream\` cho máy khác hoặc giao diện cắm vào hứng data ra nghe.`
      },
      level: "intermediate",
      tags: ["Dart", "Async", "Core"]
    },

    {
      id: "fl-intermediate-13",
      question: {
        en: "Compare AnimatedBuilder vs AnimatedWidget.",
        vi: "So sánh AnimatedBuilder và AnimatedWidget."
      },
      answer: {
        en: `## Shared Goal\nBoth eliminate the need to call \`setState()\` manually inside an animation loop tick, pushing rebuild configurations purely exactly where needed.\n\n## AnimatedBuilder\nA versatile widget that takes an \`Animation\` and a \`builder\` callback. It wraps existing widgets transparently. Best for complex, localized animations inside a bigger layout without rewriting custom classes.\n\n## AnimatedWidget\nA base class you extend to create a reusable component that automatically rebuilds when its \`listenable\` (animation) ticks. Good for entirely self-contained pieces of UI like a standalone spinning logo, keeping code modular.`,
        vi: `## Điểm chung\nCả hai giúp bạn loại bỏ hoàn toàn hàm \`setState()\` bị gọi mỏi tay liên tục ở mỗi khung quét của Animation (60 tới 120 FPS), tối ưu hóa luồng vẽ.\n\n## AnimatedBuilder\nWidget này vô cùng linh hoạt. Nhét truyền vào đối số \`animation\`, và hàm \`builder\` của nó sẽ chỉ rebuild nhỏ gọn một nhánh con nhất định. Rất ngon để chế hoạt cảnh nhỏ xen giữa class cũ mà không cần viết component đập ra làm lại.\n\n## AnimatedWidget\nLà abstract class dùng để kế thừa (\`extends\`). Nếu bạn làm hẳn 1 Giao diện cục bộ bự bự tái sử dụng nhiều nơi (ví dụ hiệu ứng loading logo xoay mượt mà), kế thừa nó sẽ giúp class nhìn xịn và đúng chuẩn DRY / OOP.`
      },
      level: "intermediate",
      tags: ["Animations", "Widgets"]
    },

    {
      id: "fl-intermediate-14",
      question: {
        en: "What are Extension Methods in Dart? Give a practical example.",
        vi: "Phương thức mở rộng (Extension Methods) trong Dart là gì? Cho ví dụ thực tế."
      },
      answer: {
        en: `## Extension Methods\nIntroduced in Dart 2.7, they allow you to add new functionalities to existing libraries or primitive classes (like \`String\`, \`DateTime\`, or even \`BuildContext\`) without subclassing them.\n\n## Practical Usage\nInstead of writing a clunky utility class: \`Formatter.capitalize(myString)\`, you create:\n\`\`\`dart\nextension StringExtension on String {\n  String capitalize() => this[0].toUpperCase() + this.substring(1);\n}\n\`\`\`\nThen simply call it gracefully: \`"hello".capitalize();\`\nYou can also extend \`BuildContext\` to create quick typography mapping: \`context.textTheme.headlineLarge\` instead of \`Theme.of(context).textTheme.headlineLarge\`.`,
        vi: `## Cấu trúc Extension\nCho phép bạn chèn thêm hàm mới vào trong các Class gốc có sẵn của hệ thống (như \`String\`, \`List\`, \`DateTime\`) mà không cần phải vất vả Kế thừa (extends) chúng.\n\n## Ứng dụng đỉnh cao\nThay vì tạo mớ class Utils nhạt nhẽo kiểu: \`DateUtils.formatToDDMM(date)\`, người ta bọc thẳng Extension:\n\`\`\`dart\nextension DateX on DateTime {\n  String toVNFormat() => "\${this.day}/\${this.month}";\n}\n\`\`\`\nVà gọi sang chảnh: \`DateTime.now().toVNFormat();\`\nHay chèn vào \`BuildContext\` hàm lấy hệ thống màu thần tốc cho gọn code UI: \`context.colorScheme.primary\`.`
      },
      level: "intermediate",
      tags: ["Dart", "Architecture"]
    },

    {
      id: "fl-intermediate-15",
      question: {
        en: "How do you profile a Flutter app for performance limits? What is Jank?",
        vi: "Cách profile đo hiệu năng của app Flutter? Thuật ngữ Jank nghĩa là gì?"
      },
      answer: {
        en: `## Profiling\nYou profile using the **Flutter DevTools** inside Profile mode (\`flutter run --profile\`). Never profile performance limits in Debug mode due to JIT compilation overhead.\nUse the Performance View to monitor UI frames and GPU ticks.\n\n## What is Jank?\nFlutter renders standard UI at 60 FPS (or 120 FPS on modern displays), allocating roughly ~16ms per frame.\nIf your \`build()\` processes or render layouts take more than 16ms, the engine drops the frame. This visual stutter is called **Jank**. It's usually fixed by breaking down deep trees, utilizing \`const\` everywhere, and deploying Isolates for synchronous data crunching.`,
        vi: `## Đo hiệu năng (Profiling)\nLuôn dùng **Flutter DevTools** kết nối ứng dụng chạy bằng chế độ Profile (\`flutter run --profile\`) cắm trực tiếp trên thiết bị thật. TUYỆT ĐỐI không đo tốc năng lực bằng Emulator chế độ Debug vì cơ chế JIT dịch động rất giật lác khác xa lúc production build phát hành.\n\n## Khái niệm Jank\nApp Flutter mượt khi vẽ đủ tiêu chuẩn 60 khung hình/giây (Tương đương 1 CPU cắn tối đa 16ms mỗi nhịp).\nNếu code quá chuối, vòng lặp ngầm chặn 2-30ms mới vẽ xong thì bị lỡ nhịp hệ thống chối màn hình luôn. Hiện tượng rớt viền, giật xé màn hình này gọi là **Jank**. Thuốc chữa cơ bản nhất: xài \`const\` ngập trời, cắt nát Widget và đẩy thuật toán vào Isolate riêng.`
      },
      level: "intermediate",
      tags: ["Performance", "Tooling"]
    },

    {
      id: "fl-intermediate-16",
      question: {
        en: "Explain the concept of ThemeExtension in Flutter.",
        vi: "Giải thích khái niệm ThemeExtension trong hệ thống Flutter."
      },
      answer: {
        en: `## Motivation\n\`ThemeData\` contains dozens of default Material design properties, but it fundamentally limits adding highly customized brand properties (like \`brandDangerColor\` or \`gradientHeaders\`).\n\n## ThemeExtension\nIntroduced in newer Flutter versions, it lets you define custom structured theme classes integrated smoothly inside \`ThemeData\`. You extend \`ThemeExtension<T>\`, implement \`copyWith\` and \`lerp\` (for smooth mode transition animations like dark-to-light), and inject it into \`ThemeData.extensions\`.\nNow you can fetch semantic branding safely via \`Theme.of(context).extension<MyBrandTheme>()!.brandDangerColor\` natively across the whole tree.`,
        vi: `## Lý do ra đời\nFile cấu hình \`ThemeData\` gốc của Flutter chỉ giới hạn ở các bảng màu Material Design truyền thống (Primary, Secondary...). Nếu Designer thiết kế một App có bộ 5 dãy màu Gradient độc quyền hoặc màu Cảnh báo riêng, việc ép chung vào cấu trúc cũ rất phiền.\n\n## ThemeExtension giải cứu\nLà công cụ siêu đẳng có từ nhánh bản Flutter 3. Bạn tự do tạo 1 class chóp tuỳ biến. Quan trọng nhất là triển khai hàm \`lerp()\` để các sắc màu tự trượt mịn màng hoà trộn mỗi lúc người dùng lướt đổi sáng bật Dark Mode.\nNạp class đó vào thuộc tính \`extensions\` rồi gọi dễ dàng từ context: \`Theme.of(context).extension<MyBrandColors>().warning\` ngầu và scale bá cháy.`
      },
      level: "intermediate",
      tags: ["UI", "Styling"]
    },

    {
      id: "fl-intermediate-17",
      question: {
        en: "Explain the difference between Unit Testing, Widget Testing, and Integration Testing.",
        vi: "Thế nào là Unit Test, Widget Test và Integration Test trong Flutter?"
      },
      answer: {
        en: `## Testing Pyramid\n- **Unit Testing:** Tests a single function, method, or class (e.g., a BLoC parsing logic). Extremely fast execute time. No UI is loaded.\n- **Widget Testing:** (Specific to Flutter) Instantiates a specific component in a localized headless environment. Used to test tap interactions, layout constraints, and specific UI states without firing up a real mobile device.\n- **Integration Testing:** Runs the full application on an emulator or real device. Evaluates end-to-end user flows navigating among multiple screens (e.g., logging in -> viewing profile). Slowest but highest confidence.`,
        vi: `## Phân lớp Kim tự tháp Testing\n- **Unit Test:** Thử nghiệm mức nguyên tử đối với 1 hàm tính toán logic hay Class nhỏ rời rạc. Vận hành tức tốc, hoàn toàn không có máy vẽ giao diện can thiệp.\n- **Widget Test:** (Hàng độc quyền phái Flutter). Hệ thống giả lập vẽ test độc lập 1 khối Component mà không cần máy ảo điện thoại thật. Khảm check sự kiện nhấp (Tap) xem hộp text báo hiệu có đúng kịch bản không.\n- **Integration Test:** Vua của mọi bài test, chạy trực diện Full nguyên vẹn ứng dụng lên Máy ảo (Emulator) thật. Nó giả lập kịch bản thao tác rẽ chéo luồng như một người dùng: bấm Đăng nhập -> load màn hình chờ -> hiện màn hình Profile. Dù chạy khá chậm chạp nhưng độ chuẩn xác bá đạo nhất.`
      },
      level: "intermediate",
      tags: ["Testing", "Workflow"]
    },

    {
      id: "fl-intermediate-18",
      question: {
        en: "What is the factory keyword in Dart? How does it differ from a standard constructor?",
        vi: "Từ khóa 'factory' trong Dart có ý nghĩa gì? Nó khác gì constructor khởi tạo chuẩn?"
      },
      answer: {
        en: `## Standard constructors\nAlways unconditionally allocate and return a *brand-new* instance of the class in the heap memory.\n\n## Factory Keyword\nA \`factory\` constructor acts like a normal method capable of returning an instance, but it possesses explicit power to **decide what to return**.\nIt doesn't always carve fresh memory. It can:\n1. Return an existing cached instance from memory (crucial for Singletons).\n2. Return a subclass based on specific input logic.\n3. Avoid instantiation altogether until a complex asynchronous resolution ends.`,
        vi: `## Constructor thông thường\nMỗi lần được gọi, constructor thông thường luôn cấp phát và trả về một đối tượng hoàn toàn mới trong bộ nhớ Heap.\n\n## Từ khóa Factory\nConstructor mang từ khóa \`factory\` hoạt động như một hàm thông thường có thể trả về instance, nhưng nó có quyền **tự quyết định sẽ trả về gì**.\nNó không nhất thiết phải tạo object mới mỗi lần gọi. Nó có thể:\n1. Trả về instance đã được cache sẵn trong bộ nhớ (cốt lõi của Singleton pattern).\n2. Trả về một subclass khác nhau tùy theo điều kiện đầu vào.\n3. Trì hoãn việc khởi tạo cho đến khi một tác vụ bất đồng bộ phức tạp hoàn thành.`
      },
      level: "intermediate",
      tags: ["Dart", "Architecture"]
    },

    {
      id: "fl-intermediate-19",
      question: {
        en: "How does Flutter handle different screen sizes across Web, Tablet, and Mobile? (Responsiveness)",
        vi: "Cách Flutter xoay sở với sự khác biệt kích thước màn hình chéo giữa Web, Tablet và Điện thoại? (Responsive)"
      },
      answer: {
        en: `## Responsive Strategies\nTo build truly adaptable native interfaces in Flutter:\n1. **LayoutBuilder:** Gives you precise \`BoxConstraints\` of the immediate parent frame to decide whether to output a Mobile vs Desktop UI locally.\n2. **MediaQuery:** Fetches global dimensional physical pixel data (\`MediaQuery.of(context).size\`).\n3. **Flexible/Expanded/Wrap:** Handling internal spacing elastic constraints fluidly.\n\n*Senior trait:* Never use static pixel values (e.g., width: 600). Create breakpoint thresholds (Mobile < 600 < Tablet < 1200 < Desktop) guiding conditional \`Scaffold\` layouts (e.g., showing a \`Drawer\` versus a persistent side \`NavigationRail\`).`,
        vi: `## Chiến thuật đa kích thước\nThanh gươm diệt gọn đa rẽ nền tảng chéo:\n1. **LayoutBuilder:** Bùa ngải xịn nhất. Đo chính xác \`BoxConstraints\` hộp diện tích giới hạn khu vực, check đủ lớn không để tách phân màn hiển Mobile mỏng manh hay nở bung lõi Desktop dày chật nội dung.\n2. **MediaQuery:** Gọi về lấy tất thảy tầm bao chứa diện tích màn của vật lý thiết bị, trừ luôn dải camera tai hổ lấn đất màn an toàn.\n3. **Wrap / Flex:** Đệ ruột cho chữ tự động rớt hàng thả layout nhún dẻo êm trôi.\n\n*Senior trait:* Kẻ dại nhét cố định (width: 500) rồi gào thét vì app quay xoay giật sập hình. Kẻ mạnh cài ngưỡng breakpoints rõ ràng (<600 -> Mobile, chỉ hiện \`Drawer\`; >=1000 -> Desktop, hiện \`NavigationRail\` cố định bên cạnh).`
      },
      level: "intermediate",
      tags: ["UI", "Layout", "Responsive"]
    },

    {
      id: "fl-intermediate-20",
      question: {
        en: "Explain CustomPainter. When and how should you use it?",
        vi: "Giải thích CustomPainter. Khi nào và làm sao để khai chiến sử dụng nó?"
      },
      answer: {
        en: `## CustomPainter Concept\n\`CustomPainter\` is a low-level rendering tool allowing you to inject raw drawing instructions (lines, arcs, paths, gradients) directly onto the Skia/Impeller canvas canvas without the overhead of standard widget wrappers.\n\n## Execution\nYou wrap your UI chunk tightly utilizing the \`CustomPaint\` widget, extending a \`CustomPainter\` class holding a \`paint(Canvas canvas, Size size)\` method.\n*Use cases:* Radically complex vector charts, intricate interactive signature pads, game physics layers, or mathematical generative art patterns where building a Widget tree of thousands of \`Containers\` would devastate the frame rate natively.`,
        vi: `## Định nghĩa CustomPainter\nCông cụ vẽ cấp thấp (Low-level rendering). Bỏ qua lớp Widget, bạn vẽ trực tiếp lên \`Canvas\` của engine. Tha hồ tạo hình tròn, đường cong, vector hay phối màu gradient tùy ý.\n\n## Triển khai\nTạo một class kế thừa \`CustomPainter\` và override hàm \`paint(Canvas canvas, Size size)\` để viết các lệnh vẽ. Đặt class này vào widget \`CustomPaint\`.\n*Khi nào dùng:* Biểu đồ phức tạp (chứng khoán, analytics), bảng ký chữ điện tử, hay các hiệu ứng vật lý mà nếu ghép từ hàng nghìn Widget \`Container\` thì FPS sẽ sập ngay tức khắc.`
      },
      level: "intermediate",
      tags: ["Widgets", "UI", "Engine"]
    }
  
];
