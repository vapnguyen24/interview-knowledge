export const basicQs = [

    {
      id: "fl-basic-1",
      question: {
        en: "What is Flutter and what makes it different from other cross-platform frameworks?",
        vi: "Flutter là gì và điểm khác biệt của nó so với các framework đa nền tảng khác?"
      },
      answer: {
        en: `## Flutter Overview\nFlutter is a UI toolkit from Google for building natively compiled applications for mobile, web, and desktop from a single codebase.\n\n## Key Differences\n- **Renderer:** Unlike React Native which uses OEM widgets, Flutter ships with its own rendering engine (Skia/Impeller) to draw pixels directly to the screen.\n- **Language:** Written in Dart, which compiles to native ARM/x86 code (AOT for production) giving high performance.\n- **No Bridge:** It avoids the JS-to-Native bridge heavily used by older cross-platform frameworks, eliminating performance bottlenecks during animations or heavy UI rendering.`,
        vi: `## Tổng quan Flutter\nFlutter là một UI toolkit của Google để xây dựng ứng dụng biên dịch native cho mobile, web, và desktop từ một codebase duy nhất.\n\n## Điểm khác biệt chính\n- **Renderer:** Khác với React Native sử dụng OEM widgets, Flutter tích hợp sẵn rendering engine riêng (Skia/Impeller) để vẽ pixel trực tiếp lên màn hình.\n- **Ngôn ngữ:** Viết bằng Dart, biên dịch thẳng sang mã máy (AOT - Ahead of Time) mang lại hiệu năng cao.\n- **Không có Bridge (Cầu nối):** Nó loại bỏ JS-to-Native bridge thường gặp, giảm triệt để bottleneck hiệu năng khi render UI hoặc animation phức tạp.`
      },
      level: "basic",
      tags: ["Core", "Architecture"]
    },

    {
      id: "fl-basic-2",
      question: {
        en: "Explain the difference between Stateless and Stateful widgets.",
        vi: "Phân biệt Stateless và Stateful widgets."
      },
      answer: {
        en: `## StatelessWidget\nA \`StatelessWidget\` is immutable. Once initialized, its properties cannot change. It only depends on configuration information passed to its constructor. Best used for static UI elements like labels or icons.\n\n## StatefulWidget\nA \`StatefulWidget\` is mutable and can rebuild its UI dynamically. It maintains a \`State\` object separate from the widget itself, allowing it to persist state across widget rebuilds. Use it when the UI can change dynamically (e.g., form inputs, counters, animations).\n\n*Senior tip:* Always prefer \`StatelessWidget\` unless state change is absolutely necessary to keep the widget tree lightweight.`,
        vi: `## StatelessWidget\n\`StatelessWidget\` là immutable (bất biến). Khi đã khởi tạo, thuộc tính của nó không thay đổi. Giao diện chỉ phụ thuộc vào config truyền qua constructor. Phù hợp cho UI tĩnh như label, icon.\n\n## StatefulWidget\n\`StatefulWidget\` có thể thay đổi và rebuild UI linh hoạt. Nó duy trì một object \`State\` tách biệt khỏi widget, giúp lưu trữ state khi widget tree rebuild. Dùng khi UI thay đổi liên tục (form input, counter, animation).\n\n*Senior tip:* Luôn ưu tiên \`StatelessWidget\` để giữ widget tree nhẹ nhất, chỉ dùng \`StatefulWidget\` khi thực sự cần thiết.`
      },
      level: "basic",
      tags: ["Widgets", "State"]
    },

    {
      id: "fl-basic-3",
      question: {
        en: "What is BuildContext?",
        vi: "BuildContext là gì?"
      },
      answer: {
        en: `## Understanding BuildContext\n\`BuildContext\` is a locator that identifies a widget's specific position in the widget tree. \n\nEach widget has its own \`BuildContext\`, which becomes the parent context for widgets returned by its \`build()\` function.\n\nIt is heavily used to look up values inherited from parents via \`InheritedWidget\` (e.g., \`Theme.of(context)\`, \`MediaQuery.of(context)\`, or provider locators).\n\n*Senior tip:* Never store a \`BuildContext\` across asynchronous gaps without checking \`if (context.mounted)\`, as the widget might have been removed from the tree while the async operation was running.`,
        vi: `## Hiểu về BuildContext\n\`BuildContext\` là một locator định vị chỗ đứng chính xác của một widget trong widget tree.\n\nMỗi widget có một \`BuildContext\` riêng, Context này sẽ là parent context cho các widget được trả về trong \`build()\`. \n\nNó được dùng phổ biến để lấy data từ các root widgets thông qua \`InheritedWidget\` (ví dụ: \`Theme.of(context)\`, \`MediaQuery.of(context)\`).\n\n*Senior tip:* Tuyệt đối không lưu \`BuildContext\` qua các hàm async (async gaps) mà không kiểm tra \`context.mounted\`, vì widget có thể đã bị unmount khỏi tree.`
      },
      level: "basic",
      tags: ["Core", "Context"]
    },

    {
      id: "fl-basic-4",
      question: {
        en: "Explain the lifecycle of a StatefulWidget.",
        vi: "Giải thích vòng đời (lifecycle) của StatefulWidget."
      },
      answer: {
        en: `## StatefulWidget Lifecycle\n1. **createState():** Creates the mutable state object.\n2. **initState():** Called exactly once. Ideal for one-time initialization (e.g., subscribing to streams).\n3. **didChangeDependencies():** Called right after \`initState\` and whenever an inherited widget it depends on changes.\n4. **build():** Called often. Returns the widget tree. Must be pure and side-effect free.\n5. **didUpdateWidget(oldWidget):** Called when the parent rebuilds and provides a new widget of the same type.\n6. **deactivate():** State is temporarily removed from the tree.\n7. **dispose():** Permanent removal. Used strictly to clean up resources (controllers, listeners) to prevent memory leaks.`,
        vi: `## Vòng đời của StatefulWidget\n1. **createState():** Khởi tạo object state.\n2. **initState():** Gọi duy nhất 1 lần đầu tiên. Dùng để khởi tạo tài nguyên (subscribing stream, animation controller).\n3. **didChangeDependencies():** Gọi sau \`initState\` và mỗi khi \`InheritedWidget\` mà nó đang lắng nghe thay đổi.\n4. **build():** Gọi rất nhiều lần liên tục. Trả về widget tree. Hàm này phải pure và không có side-effect.\n5. **didUpdateWidget(oldWidget):** Gọi khi parent rebuild và đẩy config mới xuống widget hiện tại.\n6. **deactivate():** State tạm thời bị gỡ khỏi tree.\n7. **dispose():** Xóa vĩnh viễn khỏi tree. Chỗ bắt buộc để dọn dẹp (tắt controllers, hủy listeners) để tránh memory leaks.`
      },
      level: "basic",
      tags: ["Lifecycle", "State"]
    },

    {
      id: "fl-basic-5",
      question: {
        en: "What are Keys in Flutter and when should you use them?",
        vi: "Keys trong Flutter là gì và khi nào nên sử dụng?"
      },
      answer: {
        en: `## Usage of Keys\n\`Keys\` control how widgets are matched up with other widgets when a widget rebuilds. By default, Flutter matches widgets by their runtime \`Type\`. \n\n## When to use them\nYou need \`Keys\` (specifically \`GlobalKey\` or \`ValueKey\`/\`ObjectKey\`) when you are modifying a collection of *Stateful* widgets of the same type, like reordering items in a list, adding/removing items, or animating them.\nWithout a Key, Flutter might reuse the State from an old widget for a new widget because their Types match, leading to UI bugs.\n\n*Senior tip:* Using a \`GlobalKey\` is heavy; only use it if you absolutely need to access the State or trigger UI updates of a child from outside, or reparent a widget without losing its state.`,
        vi: `## Tác dụng của Keys\n\`Keys\` kiểm soát cách Flutter so sánh (matching) các widget cũ và mới trong quá trình rebuild. Mặc định, Flutter match qua \`Type\`.\n\n## Khi nào cần dùng\nBạn bắt buộc dùng \`Key\` khi thao tác (thêm/xóa/đảo vị trí) với 1 danh sách các **StatefulWidget có cùng Type**.\nNếu không có Key, Flutter sẽ gán nhầm State của widget cũ sang widget mới vì Type của chúng giống hệt nhau, gây lỗi UI.\n\n*Senior tip:* \`GlobalKey\` rất tốn tài nguyên. Chỉ dùng nó khi cần truy cập thẳng vào State của child từ bên ngoài, hoặc khi muốn bốc một widget cắm sang vị trí khác trên tree mà không làm mất current state.`
      },
      level: "basic",
      tags: ["Widgets", "Keys"]
    },

    {
      id: "fl-basic-6",
      question: {
        en: "What is the difference between Hot Reload and Hot Restart?",
        vi: "Phân biệt Hot Reload và Hot Restart."
      },
      answer: {
        en: `## Hot Reload\nInjects updated source code files into the running Dart Virtual Machine (VM) and reconstructs the widget tree. It **preserves** the application state. Extremely fast, used for UI tweaking.\n\n## Hot Restart\nCompletely destroys the current app state and restarts the app with the new code from scratch. It takes slightly longer. \n\n*When to Hot Restart:* Required when you add a new plugin/asset, change native code (Android/iOS dirs), or change \`main()\` /\`initState()\` logic that won't trigger through a simple widget rebuild.`,
        vi: `## Hot Reload\nTiêm (inject) các file code vừa sửa vào Dart VM đang chạy và vẽ lại widget tree. Nó **giữ nguyên** state hiện tại của app. Rất nhanh, hỗ trợ tuyệt vời để tinh chỉnh UI.\n\n## Hot Restart\nXóa sạch state hiện tại và chạy lại app từ đầu với code mới. Mất nhiều thời gian hơn một chút.\n\n*Khi nào cần Hot Restart:* Bắt buộc khi cài thêm plugin/asset mới, sửa native code (bên trong folder android/ios), hoặc sửa logic trong \`main()\`, \`initState()\` - những chỗ mà hot reload không chạy lại.`
      },
      level: "basic",
      tags: ["Tooling", "Workflow"]
    },

    {
      id: "fl-basic-7",
      question: {
        en: "Explain main() vs runApp() in Flutter.",
        vi: "Giải thích hàm main() và runApp() trong Flutter."
      },
      answer: {
        en: `## main()\n\`main()\` is the required entry point for any Dart program. Execution starts here.\n\n## runApp()\n\`runApp()\` is a Flutter-specific function called inside \`main()\`. It takes a given \`Widget\` and makes it the root of the widget tree. It attaches the framework to the UI layer and schedules the first frame rendering.\n\n*Senior tip:* Avoid placing heavy asynchronous initialization tasks directly inside \`runApp()\`. Use \`WidgetsFlutterBinding.ensureInitialized()\` if you need to call native platform channels before \`runApp()\` is executed.`,
        vi: `## main()\n\`main()\` là entry point bắt buộc của mọi chương trình Dart. Code bắt đầu chạy từ đây.\n\n## runApp()\n\`runApp()\` là hàm đặc thù của Flutter được gọi bên trong \`main()\`. Nó nhận vào 1 \`Widget\` và biến widget đó thành Root của toàn bộ widget tree, gắn kết framework lên màn hình và chuẩn bị render frame đầu tiên.\n\n*Senior tip:* Tránh nhét các tác vụ async nặng khởi tạo ngay trong \`runApp()\`. Nếu cần gọi platform channel/native plugin trước khi app chạy, phải gọi \`WidgetsFlutterBinding.ensureInitialized()\` trước.`
      },
      level: "basic",
      tags: ["Core", "Entrypoint"]
    },

    {
      id: "fl-basic-8",
      question: {
        en: "What is pubspec.yaml?",
        vi: "File pubspec.yaml dùng để làm gì?"
      },
      answer: {
        en: `## Purpose\n\`pubspec.yaml\` is the project metadata and dependency management file for Flutter/Dart apps.\n\nIt handles:\n- Project versioning and environment descriptions.\n- Managing 3rd-party dependencies (packages/plugins via pub.dev).\n- Registering assets like images, fonts, and localizations.\n\n*Senior constraint:* Always lock dependency versions or use sensible constraints (e.g., \`^1.2.3\`) to avoid breaking physical builds via transient updates in CI/CD environments.`,
        vi: `## Mục đích\n\`pubspec.yaml\` là file quản lý metadata và dependency của toàn bộ dự án Flutter/Dart (tương tự package.json trong JS).\n\nNó đảm nhiệm:\n- Quản lý version của app và SDK requirement.\n- Định nghĩa các package/plugin bên thứ ba cài từ pub.dev.\n- Khai báo thiết lập asset tĩnh (ảnh, fonts, files ngôn ngữ).\n\n*Senior constraint:* Luôn kiểm soát version của dependency chặt chẽ (dùng dấu \`^\` hợp lý hoặc cố định version) để tránh gãy build pipeline (CI/CD) khi một package nào đó tự cập nhật ngầm phá vỡ code hiện tại.`
      },
      level: "basic",
      tags: ["Tooling", "Dependency"]
    },

    {
      id: "fl-basic-9",
      question: {
        en: "What is the difference between final and const in Dart?",
        vi: "Phân biệt final và const trong Dart."
      },
      answer: {
        en: `## final\nA \`final\` variable can only be set once and is initialized at runtime. If you fetch an API response, it can be assigned to a \`final\` variable.\n\n## const\nA \`const\` variable is fundamentally a compile-time constant. Its value must be known precisely during compilation. Using \`const\` essentially freezes the object.\n\n*Flutter perspective:* Always aggressively use \`const\` for widgets configuration. A widget declared with \`const\` tells the framework to never rebuild it unless its parent removes it, saving massive CPU cycles during animations.`,
        vi: `## final\nMột biến \`final\` chỉ được gán giá trị 1 lần duy nhất và nó được khởi tạo tại **runtime**. Giá trị fetch từ API có thể gán cho biến \`final\`.\n\n## const\n\`const\` là hằng số ở thời điểm biên dịch (**compile-time**). Giá trị của nó phải xác định từ lúc chưa chạy app. Object lưu bằng const sẽ được cấp phát đúng 1 lần trong bộ nhớ.\n\n*Góc nhìn Flutter:* Tận dụng tối đa từ khóa \`const\` trước các widget. Nó báo cho framework biết widget này là tĩnh hoàn toàn, giúp GPU không cần vẽ đi vẽ lại (rebuild) widget đó khi cây cha có thay đổi, tối ưu hiệu năng triệt để.`
      },
      level: "basic",
      tags: ["Dart", "Performance"]
    },

    {
      id: "fl-basic-10",
      question: {
        en: "How do you display a large list of dynamic items efficiently?",
        vi: "Làm thế nào để hiển thị một danh sách rất dài một cách tối ưu hiệu năng?"
      },
      answer: {
        en: `## Use ListView.builder\nInstead of a standard \`ListView\`, which renders all items at once (causing huge memory load), use \`ListView.builder\` or \`SliverList.builder\`. \n\n## How it works\nIt implements **lazy loading (virtualization)**. It only builds the widgets that are currently visible on the screen. As the user scrolls, widgets that leave the viewport are destroyed or recycled, maintaining a constant low memory footprint.\n\n*Tip:* If list items have complex bounds, defining \`itemExtent\` drastically speeds up scrolling by allowing Flutter to skip computing sizes during scroll physics calculations.`,
        vi: `## Dùng ListView.builder\nThay vì dùng \`ListView\` thường (nó sẽ render toàn bộ item cùng lúc, ngốn rất nhiều bộ nhớ RAM), hãy luôn dùng \`ListView.builder\` (hoặc các dạng Sliver lazy).\n\n## Cơ chế\nNó hoạt động theo cơ chế **lazy loading**. Chỉ những item nào chuẩn bị hoặc đang nằm trên màn hình mới được \`build()\`. Khi scroll qua, các item cũ bị hủy để tiết kiệm bộ nhớ.\n\n*Tip:* Nếu các item có chiều cao cố định, luôn khai báo thuộc tính \`itemExtent\`. Nó giúp Flutter bỏ qua quá trình tính toán kích thước của hàng ngàn item ẩn, biến việc scroll trở nên siêu mượt (60-120fps).`
      },
      level: "basic",
      tags: ["Widgets", "Performance", "UI"]
    },

    {
      id: "fl-basic-11",
      question: {
        en: "What is Scaffold in Flutter?",
        vi: "Scaffold trong Flutter là cái gì?"
      },
      answer: {
        en: `## Scaffold\n\`Scaffold\` is a top-level container widget that implements the basic Material Design visual layout structure.\n\nIt provides slots for standard layout components, giving you APIs to display:\n- \`appBar\` (Top Navigation)\n- \`body\` (Main Content)\n- \`floatingActionButton\` (FAB)\n- \`drawer\` / \`endDrawer\` (Sidebar menus)\n- \`bottomNavigationBar\`\n- \`bottomSheet\` / \`snackbar\` contexts.\n\nIt simplifies creating proper app structural constraints instantly.`,
        vi: `## Scaffold\n\`Scaffold\` là một root component triển khai cấu trúc layout cơ bản chuẩn Material Design cho một màn hình ứng dụng.\n\nNó dựng sẵn các \"khe cắm\" (slots) tiện lợi để bạn cấu trúc UI như:\n- \`appBar\` (Thanh điều hướng trên)\n- \`body\` (Phần hiển thị chính)\n- \`floatingActionButton\` (Nút nổi)\n- \`drawer\` (Menu trượt ngang)\n- \`bottomNavigationBar\` (Thanh điều hướng dưới)\n\nNhờ nó, thay vì phải tự setup các class phức tạp, bạn có ngay một trang App chuyên nghiệp chỉ với vài dòng code.`
      },
      level: "basic",
      tags: ["Widgets", "UI"]
    },

    {
      id: "fl-basic-12",
      question: {
        en: "Explain Future and async/await in Dart.",
        vi: "Giải thích Future và async/await trong ngôn ngữ Dart."
      },
      answer: {
        en: `## Future\nA \`Future\` represents a potential value or error that will be available at some time in the future (similar to a JS Promise). It's used for asynchronous operations holding off blocking the main UI thread.\n\n## async / await\nKeywords that provide a declarative way to write asynchronous code looking like synchronous code.\n- \`async\` marks a function as asynchronous.\n- \`await\` pauses the execution of inside that function until the \`Future\` completes.`,
        vi: `## Future\n\`Future\` đại diện cho một tác vụ bất đồng bộ sẽ hoàn thành ở tương lai (giống như Promise của JavaScript). Dùng tải dữ liệu mạng hoặc đọc file mà không làm treo UI (main thread).\n\n## async / await\nCú pháp kẹo mềm (syntactic sugar) giúp viết code bất đồng bộ nhìn gọn gàng như code đồng bộ bình thường.\n- Đánh dấu \`async\` trên hàm để khai báo hàm đó là bất đồng bộ (trả về Future).\n- Dùng \`await\` trước một \`Future\` để tạm dừng thực thi code bên dưới trong hàm đó, chờ cho Future chạy xong mới nhả ra kết quả.`
      },
      level: "basic",
      tags: ["Dart", "Async"]
    },

    {
      id: "fl-basic-13",
      question: {
        en: "What is the difference between Expanded and Flexible?",
        vi: "Sự khác biệt giữa Expanded và Flexible widget là gì?"
      },
      answer: {
        en: `## Shared Concept\nBoth are used inside \`Row\` or \`Column\` (CSS Flexbox equivalents) to determine how children occupy available empty space.\n\n## Expanded\nForces the widget to occupy **all remaining available empty space**. It sets \`fit: FlexFit.tight\` internally.\n\n## Flexible\nAllows the widget to take up residual space, but **does not force** it to fill all of it. If the child is smaller than the available space, it remains small. It uses \`fit: FlexFit.loose\`.\n\n*Senior view:* Misusing \`Expanded\` inside scrollable widgets (like listviews) often causes infinite constraint errors. Be precise about flex layouts.`,
        vi: `## Điểm chung\nĐều dùng trong \`Row\` hoặc \`Column\` (tương tự Flexbox) để điều tiết không gian thừa màn hình mà các con có thể chiếm.\n\n## Expanded\nCuộn ép widget con phải phình ra chiếm **toàn bộ khoảng trống còn lại** của widget cha. Bản chất nó set thuộc tính flex là \`FlexFit.tight\`.\n\n## Flexible\nCho phép diện tích chứa child được linh hoạt. Nếu child nhỏ hơn space còn lại thì nó cứ bo theo kích thước thật (dài tới đâu ôm tới đó). Nó xài \`FlexFit.loose\`.\n\n*Senior view:* Lỗi kinh điển của Junior là lạm dụng \`Expanded\` bên trong các widget có behavior scroll vô cực, dẫn đến lỗi Unbounded Constraints sập UI.`
      },
      level: "basic",
      tags: ["Widgets", "Layout"]
    },

    {
      id: "fl-basic-14",
      question: {
        en: "How do you handle routing in a basic Flutter app?",
        vi: "Cách xử lý chuyển màn hình (Routing) cơ bản trong Flutter?"
      },
      answer: {
        en: `## Basic Navigator Push/Pop\nYou can use \`Navigator.push(context, MaterialPageRoute(...))\` to push a new route on the stack and \`Navigator.pop(context)\` to remove the current screen.\n\n## Named Routes\nFor better structuring, register a \`routes\` map in \`MaterialApp\` and transition using \`Navigator.pushNamed(context, '/home')\`.\n\n*Senior context:* Native Navigator 1.0 is sufficient for basic apps. However, for deep in-app linking (especially on Web), an advanced standard like *Router API (Navigator 2.0)* using packages like \`go_router\` is highly recommended as the enterprise standard.`,
        vi: `## Basic Push/Pop\nDùng lệnh trực tiếp: \`Navigator.push(context, MaterialPageRoute(...))\` để ném 1 màn hình mới lên cùng của ngăn xếp (stack), và \`Navigator.pop(context)\` để tháo màn hình hiện tại ra.\n\n## Named Routes\nDùng tên define sẵn: Đăng ký cục \`routes\` Map tại \`MaterialApp\`, sau đó xài \`Navigator.pushNamed(context, '/detail')\`, setup code sẽ sạch sẽ hơn.\n\n*Senior context:* Cơ chế gốc (Navigator 1.0) đủ dùng cho app siêu nhẹ. Với các dự án thực tế lớn cần Deep Link phức tạp (đặc biệt khi target xuống Web), bắt buộc phải dùng Navigator 2.0 (thường tích hợp qua package \`go_router\` làm chuẩn công nghiệp).`
      },
      level: "basic",
      tags: ["Routing", "Architecture"]
    },

    {
      id: "fl-basic-15",
      question: {
        en: "What is Null Safety in Dart 2.12+?",
        vi: "Biến Null Safety (Dart 2.12+) có ý nghĩa gì?"
      },
      answer: {
        en: `## Concept\nSound Null Safety guarantees that variables cannot contain \`null\` unless you explicitly declare them as nullable.\n\n## Usage\n- Non-nullable (Default): \`String name;\` (must be initialized before usage, will never fault at runtime due to null).\n- Nullable: \`String? name;\` (appends \`?\`, allows null).\n- Late initialization: \`late String name;\` (you promise to initialize this later before using it).\n\nThis completely eliminates the billion-dollar mistake: the \`NullPointerException\` crash during runtime, making apps objectively safer.`,
        vi: `## Khái niệm\nSound Null Safety đảm bảo biến không bao giờ được phép mang giá trị \`null\` trừ phi lập trình viên cho phép nó rõ ràng.\n\n## Cách dùng\n- Mặc định báo lỗi ngay: \`String name;\` (phải gán giá trị lúc khai báo, hệ thống đảm bảo nó không bao giờ null khi chạy).\n- Cho phép null: \`String? name;\` (Thêm \`?\` để biểu thị).\n- Hoãn khởi tạo: \`late String name;\` (Hứa hẹn sẽ nạp giá trị vào sau, nhưng nếu chưa nạp mà xài vẫn văng app).\n\nViệc này giúp giết chết hoàn toàn lỗi kinh điển \`NullPointerException\` lúc Runtime. App an toàn và ổn định hơn 100 lần ngay từ khi viết code.`
      },
      level: "basic",
      tags: ["Dart", "Safety"]
    },

    {
      id: "fl-basic-16",
      question: {
        en: "What is FutureBuilder widget?",
        vi: "Widget FutureBuilder dùng để làm gì?"
      },
      answer: {
        en: `## Usage\n\`FutureBuilder\` dictates a widget that builds itself based on the latest snapshot of interaction with a Dart \`Future\`. \n\n## Purpose\nIt removes the boilerplate of handling manual \`setState\` calls to show loading indicators or fetch results. You provide a future (like an API call), and inside the \`builder\` callback, you evaluate \`snapshot.connectionState\` to show a Spinner (when waiting) or your actual UI (when done/data present).\n\n*Senior tip:* Never instantiate the \`Future\` directly in the \`future:\` parameter of the \`FutureBuilder\`'s \`build\` block, because it will re-trigger the API call on every parent rebuild. Init the future in \`initState\`.`,
        vi: `## Công năng\n\`FutureBuilder\` giải quyết bài toán giao diện chờ đồng bộ dữ liệu. Nó định nghĩa 1 widget tự vẽ UI theo trạng thái trả về của một \`Future\`.\n\n## Ứng dụng\nNó thay thế hoàn toàn việc phải viết \`setState\` thủ công với cục loading quay vòng vòng. Truyền API request (kiểu Future) vào, nó tự trigger callback \`builder\`. Dựa trên \`snapshot.connectionState\`, bạn tha hồ return 1 cục CircularProgressIndicator (đang đợi) hoặc cục List dữ liệu (khi thành công).\n\n*Senior tip:* Lỗi cực kỳ tai hại là gọi API thẳng trong tham số \`future:\` của hàm build. Nghĩa là cứ mỗi lần cha quét rebuild, API lại gọi lại. Xin nhắc lại: Chỉ lưu khởi tạo mạng ở \`initState\`, ném biến đó cho FutureBuilder xài.`
      },
      level: "basic",
      tags: ["Widgets", "Async", "UI"]
    },

    {
      id: "fl-basic-17",
      question: {
        en: "What are mixins in Dart?",
        vi: "Mixin trong Dart là gì?"
      },
      answer: {
        en: `## Mixins\nMixins are a way of reusing a class's code in multiple class hierarchies without inheriting from them (avoiding the diamond problem of multiple inheritance).\n\n## Syntax\nUse the \`mixin\` keyword to define it, and the \`with\` keyword to apply it to a class.\n\n*Example in Flutter:* \`SingleTickerProviderStateMixin\` is typically mixed into a State class to provide vsync for animations, drastically reducing boilerplate without forcing a rigid inheritance structure.`,
        vi: `## Mixin\nMixin là cơ chế hay ho của Dart dùng để gọt lấy logic/hàm/thuộc tính của một class và \"trộn\" vào nhiều class khác nhau mà không cần cấu trúc \`Kế thừa - Extends\` nặng nề. \n\n## Cú pháp\nĐịnh nghĩa bằng từ khóa \`mixin\`, và trộn vào class khác bằng từ khóa \`with\`.\n\n*Ví dụ kinh điển Flutter:* Để làm UI có Animation, bạn chỉ cần thêm \`with SingleTickerProviderStateMixin\` vào khai báo class State thay vì dùng \`extends\`, nó cung cấp liền object \`vsync\` sync khung hình xịn xò với GPU tránh mất frame mượt mà.`
      },
      level: "basic",
      tags: ["Dart", "Architecture"]
    },

    {
      id: "fl-basic-18",
      question: {
        en: "Explain setState(). How does it work under the hood?",
        vi: "Giải thích hàm setState(). Nó hoạt động bên dưới như thế nào?"
      },
      answer: {
        en: `## setState()\n\`setState()\` notifies the framework that the internal state of a \`StatefulWidget\` has changed.\n\n## Under the hood\nIt marks the element representing that widget as "dirty". During the next frame pipeline, Flutter's Engine checks the tree for dirty elements and aggressively calls the \`build()\` method belonging to that specific segment of the tree, generating a new widget configuration to send to the RenderObject tree.\n\n*Senior rule:* Never place network calls or heavy sync computations directly inside the \`setState(() { ... })\` closure. It must be as synchronous and fast as possible.`,
        vi: `## setState()\n\`setState()\` gửi chuông báo cho framework biết là state của cái \`StatefulWidget\` hiện tại vừa bị thay đổi.\n\n## Cách chạy\nLúc bị gọi, nó đánh dấu widget này đang bị \"dơ\" (dirty element). Ở lần vẽ ngầm kế tiếp của luồng refresh màn hình (vi giây), Engine quét thấy cục dơ này, lập tức tái gọi hàm \`build()\` của nó áp xuống cây widget mới, ráp nối lại các mảnh vỡ layout UI.\n\n*Senior rule:* TUYỆT ĐỐI không bao giờ call API, đặt luồng chọc database lớn ngay bên trong block callback \`setState() { ... }\`. Code trong block này phải cực nhanh, chỉ dùng để đổi giá trị biến local.`
      },
      level: "basic",
      tags: ["Core", "State"]
    },

    {
      id: "fl-basic-19",
      question: {
        en: "What is an InheritedWidget?",
        vi: "InheritedWidget là khái niệm gì?"
      },
      answer: {
        en: `## InheritedWidget\nNormally, passing data down a deep widget tree requires "prop drilling" (passing variables manually to every constructor). \n\`InheritedWidget\` solves this by allowing child widgets to reach up the widget tree and read data directly from an ancestor without intermediaries.\n\n## Rebuild optimizations\nIt is the backbone of Flutter's reactive model. When its data changes, it intelligently instructs only the specific children that explicitly called \`dependOnInheritedWidgetOfExactType\` to rebuild.\n\n(Note: Packages like \`Provider\` or \`Riverpod\` are elegant wrappers around this raw mechanism).`,
        vi: `## InheritedWidget\nBình thường UI component cha muốn truyền biến xuống chắt chút chít lồng quá sâu, phải tự đẩy param cực khổ qua từng level (gọi là vã mồ hôi prop drilling).\n\`InheritedWidget\` cho phép các child widgets chọc ngược thẳng lên cha lớn nhất để rút data ra xài độc lập.\n\n## Khả năng tối ưu\nNó là gốc lõi của khả năng xử lý bất biến (reactive) trong Flutter. Khi data cha đổi, nó siêu việt ở chỗ chỉ bắt ĐÚNG những child nào đã gọi \`dependOnInheritedWidgetOfExactType\` đăng ký lắng nghe đi rebuild lại thôi, chứ không load lại toàn bộ màn hình.\n\n*(Lưu ý: Provider / Riverpod hay Bloc mà bạn dùng thì cái lõi cuối cùng bên dưới hoàn toàn bọc trên InheritedWidget).*`
      },
      level: "basic",
      tags: ["Core", "State"]
    },

    {
      id: "fl-basic-20",
      question: {
        en: "How do you define styling (Fonts, Colors) globally in Flutter?",
        vi: "Cách khai báo design styling (Màu sắc, Font chữ) trên phạm vi toàn cục trong app Flutter?"
      },
      answer: {
        en: `## ThemeData\nTo define design systems globally, use the \`theme\` property of the \`MaterialApp\` root widget by passing a \`ThemeData\` object.\n\n## Usage\nYou configure colors (\`ColorScheme\`), typographic hierarchies (\`TextTheme\`), and specific widget overrides (like \`ElevatedButtonThemeData\`) at once. \nChild widgets then automatically inherit these aesthetics (or manually tap into them via \`Theme.of(context).primaryColor\`).\n\n*Senior trait:* Never hardcode colors or sizes locally in your widgets (e.g., \`color: Colors.red\`). Always refer to the design system context to ensure fast enterprise-level styling tweaks / Dark mode scaling natively.`,
        vi: `## ThemeData\nĐể phủ phong cách màu cho app từ rễ, truyền vào một đối tượng \`ThemeData\` vào slot tên là \`theme\` của root app \`MaterialApp\`.\n\n## Triển khai\nTrong cục config \`ThemeData\` này, bạn chốt toàn bộ bảng màu (\`colorScheme\`), định cỡ chữ chính, font base (\`textTheme\`), chỉnh style chung cực chất cho từng cục nhỏ như nút, input field luôn. Các cháu con cháu bên dưới tự động thừa kế. Nếu cần xin hệ màu, cháu gọi thẳng \`Theme.of(context).primaryColor\`.\n\n*Senior trait:* Thói quen junior là chắp vá nhét cứng mã màu \`style: TextStyle(color: Colors.red)\` loạn xạ. Chuẩn Senior là mọi giá trị phải bốc từ context cấu trúc chung, app muốn đập ra làm UI Dark Mode lúc đó chỉ tốn đúng 5 phút vì không bị conflict rác cục bộ.`
      },
      level: "basic",
      tags: ["UI", "Styling"]
    }
];
