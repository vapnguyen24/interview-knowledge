export const screenCastingPerformance = {
  id: "screen-casting-performance",
  title: "Performance & Architecture",
  tech: ["Wi-Fi Direct", "WebSocket", "Architecture", "Optimization"],
  qas: [
    // ── BASIC ──────────────────────────────────────────────────────────────
    {
      id: "perf-b1",
      question: {
        en: "What is Wi-Fi Direct and how does it differ from regular Wi-Fi?",
        vi: "Wi-Fi Direct là gì và khác gì với Wi-Fi thông thường?",
      },
      answer: {
        en: `## Wi-Fi Direct

Wi-Fi Direct (IEEE 802.11) allows devices to connect **directly to each other** over Wi-Fi without needing a wireless router or access point.

### Comparison

| Feature | Regular Wi-Fi | Wi-Fi Direct |
|---------|--------------|--------------|
| Infrastructure | Needs AP/router | No AP needed |
| Internet | Yes (via router) | No |
| Range | Up to AP range | ~200m direct |
| Speed | Depends on AP | Up to ~250 Mbps |
| Latency | +AP hop | Direct |

### How it works

One device becomes the **Group Owner (GO)** — acting like a soft access point. Other devices join as clients in the P2P group.

\`\`\`
[Device A: Group Owner]
       ↕ (Wi-Fi Direct link, ~250 Mbps)
[Device B: Client]
\`\`\`

### In the project

Wi-Fi Direct was chosen to eliminate dependency on a router or internet connection. This makes the casting system work in:
- Corporate environments with strict Wi-Fi restrictions
- Remote locations without network infrastructure
- Demo scenarios with zero setup`,
        vi: `## Wi-Fi Direct

Wi-Fi Direct (IEEE 802.11) cho phép các thiết bị kết nối **trực tiếp với nhau** qua Wi-Fi mà không cần bộ định tuyến hay điểm truy cập không dây.

### So sánh

| Tính năng | Wi-Fi thông thường | Wi-Fi Direct |
|-----------|-------------------|--------------|
| Hạ tầng | Cần AP/router | Không cần AP |
| Internet | Có (qua router) | Không |
| Phạm vi | Đến tầm AP | ~200m trực tiếp |
| Tốc độ | Phụ thuộc AP | Đến ~250 Mbps |
| Độ trễ | +hop AP | Trực tiếp |

### Cách hoạt động

Một thiết bị trở thành **Group Owner (GO)** — hoạt động như điểm truy cập mềm. Các thiết bị khác tham gia như client trong nhóm P2P.

\`\`\`
[Thiết bị A: Group Owner]
       ↕ (đường truyền Wi-Fi Direct, ~250 Mbps)
[Thiết bị B: Client]
\`\`\`

### Trong dự án

Wi-Fi Direct được chọn để loại bỏ sự phụ thuộc vào router hoặc kết nối internet. Điều này cho phép hệ thống casting hoạt động trong:
- Môi trường doanh nghiệp có hạn chế Wi-Fi nghiêm ngặt
- Địa điểm từ xa không có hạ tầng mạng
- Tình huống demo không cần thiết lập`,
      },
      level: "basic",
      tags: ["Wi-Fi Direct", "networking", "P2P"],
    },
    {
      id: "perf-b2",
      question: {
        en: "What is WebSocket and why was it chosen for the signaling server?",
        vi: "WebSocket là gì và tại sao nó được chọn cho signaling server?",
      },
      answer: {
        en: `## WebSocket for Signaling

### What is WebSocket

WebSocket is a protocol that provides **full-duplex, persistent communication** over a single TCP connection. Unlike HTTP, both sides can send messages at any time.

\`\`\`
HTTP:  Client ──► Request ──► Server ──► Response (connection closes)
WS:    Client ◄══════════════════════════════ Server (persistent)
\`\`\`

### Why WebSocket for WebRTC signaling

| Requirement | WebSocket | HTTP polling |
|-------------|-----------|--------------|
| Low latency | ✅ Push | ❌ Delayed |
| Server → client push | ✅ Native | ❌ Workaround |
| Persistent connection | ✅ Yes | ❌ No |
| Overhead per message | Low (2-byte frame header) | High (HTTP headers) |

### In the project

A lightweight WebSocket server ran on the **Group Owner device** (Wi-Fi Direct host). Both the caster and viewer connected to it for SDP and ICE exchange.

\`\`\`
[Group Owner: WebSocket Server + Caster]
          ↕ WebSocket (LAN)
[Client: WebSocket Client + Viewer]
\`\`\`

No external server was needed — the signaling server ran locally on the same Wi-Fi Direct network.`,
        vi: `## WebSocket cho Signaling

### WebSocket là gì

WebSocket là giao thức cung cấp **giao tiếp hai chiều, kết nối bền vững** qua một kết nối TCP duy nhất. Khác với HTTP, cả hai bên có thể gửi tin nhắn bất kỳ lúc nào.

\`\`\`
HTTP:  Client ──► Request ──► Server ──► Response (đóng kết nối)
WS:    Client ◄══════════════════════════════ Server (bền vững)
\`\`\`

### Tại sao WebSocket cho WebRTC signaling

| Yêu cầu | WebSocket | HTTP polling |
|---------|-----------|--------------|
| Độ trễ thấp | ✅ Push | ❌ Chậm |
| Push từ server đến client | ✅ Tích hợp sẵn | ❌ Giải pháp phức tạp |
| Kết nối bền vững | ✅ Có | ❌ Không |
| Overhead mỗi tin nhắn | Thấp (header 2 byte) | Cao (HTTP header) |

### Trong dự án

WebSocket server nhẹ chạy trên thiết bị **Group Owner** (host Wi-Fi Direct). Cả caster và viewer đều kết nối đến nó để trao đổi SDP và ICE.

\`\`\`
[Group Owner: WebSocket Server + Caster]
          ↕ WebSocket (LAN)
[Client: WebSocket Client + Viewer]
\`\`\`

Không cần server ngoài — signaling server chạy cục bộ trên cùng mạng Wi-Fi Direct.`,
      },
      level: "basic",
      tags: ["WebSocket", "signaling", "networking"],
    },
    {
      id: "perf-b3",
      question: {
        en: "What is latency and what factors contribute to it in a screen casting system?",
        vi: "Độ trễ là gì và những yếu tố nào ảnh hưởng đến nó trong hệ thống screen casting?",
      },
      answer: {
        en: `## Latency in Screen Casting

**Latency** is the delay between a screen event happening and the viewer seeing it.

### Latency sources

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│  Source                    │  Typical value                 │
├─────────────────────────────────────────────────────────────┤
│  Screen capture (VirtualDisplay refresh) │  8–16ms (60fps)  │
│  Encoding (H.264 hardware)  │  5–15ms                      │
│  Network transmission       │  1–5ms (Wi-Fi Direct)        │
│  Jitter buffer              │  20–60ms (WebRTC default)    │
│  Decoding                   │  5–10ms                      │
│  Display rendering          │  8–16ms (60fps display)      │
├─────────────────────────────────────────────────────────────┤
│  Total                      │  47–122ms                    │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Why the project achieved ~150ms

- Wi-Fi Direct = near-zero network latency
- H.264 hardware encoder = fast encoding
- Tuned jitter buffer = reduced buffer delay
- No relay server = no extra network hop

### Latency vs reliability tradeoff

Lower jitter buffer → lower latency, but more susceptible to drops.
Higher jitter buffer → smoother playback, but higher latency.`,
        vi: `## Độ Trễ Trong Screen Casting

**Độ trễ** là thời gian trễ giữa khi một sự kiện xảy ra trên màn hình và khi người xem thấy nó.

### Nguồn gốc độ trễ

\`\`\`
┌──────────────────────────────────────────────────────────────┐
│  Nguồn                      │  Giá trị điển hình             │
├──────────────────────────────────────────────────────────────┤
│  Capture màn hình (VirtualDisplay) │  8–16ms (60fps)         │
│  Encoding (H.264 hardware)  │  5–15ms                       │
│  Truyền qua mạng            │  1–5ms (Wi-Fi Direct)         │
│  Jitter buffer              │  20–60ms (mặc định WebRTC)    │
│  Decoding                   │  5–10ms                       │
│  Render màn hình            │  8–16ms (màn hình 60fps)      │
├──────────────────────────────────────────────────────────────┤
│  Tổng                       │  47–122ms                     │
└──────────────────────────────────────────────────────────────┘
\`\`\`

### Tại sao dự án đạt ~150ms

- Wi-Fi Direct = độ trễ mạng gần bằng 0
- H.264 hardware encoder = encoding nhanh
- Jitter buffer được tinh chỉnh = giảm độ trễ buffer
- Không có relay server = không thêm hop mạng

### Đánh đổi giữa độ trễ và độ tin cậy

Jitter buffer thấp hơn → độ trễ thấp hơn, nhưng dễ bị drop hơn.
Jitter buffer cao hơn → phát lại mượt mà hơn, nhưng độ trễ cao hơn.`,
      },
      level: "basic",
      tags: ["latency", "performance", "streaming", "jitter buffer"],
    },
    {
      id: "perf-b4",
      question: {
        en: "What is FPS and why is 60fps important for screen casting?",
        vi: "FPS là gì và tại sao 60fps quan trọng trong screen casting?",
      },
      answer: {
        en: `## FPS in Screen Casting

**FPS (Frames Per Second)** is the number of distinct images captured and transmitted per second.

### Why 60fps matters for screen content

| FPS | Use case |
|-----|----------|
| 24fps | Film (motion blur compensates) |
| 30fps | Acceptable for most video content |
| **60fps** | **UI, scrolling, cursor movement — no perceptible lag** |
| 120fps | Gaming, high-refresh displays |

Screen content is different from video — **text, cursors, and UI animations** at 30fps look choppy because there's no motion blur to smooth the transitions.

### Frame time budget at 60fps

\`\`\`
1 second / 60 frames = 16.67ms per frame
\`\`\`

Every stage in the pipeline (capture → encode → transmit → decode → display) must complete within this budget.

### In the project

60fps was chosen as the target because the primary use case was **mirroring UI interactions** (mouse clicks, typing, window management). Below 60fps, cursor and scroll animations appear laggy to the viewer.`,
        vi: `## FPS Trong Screen Casting

**FPS (Frames Per Second)** là số lượng hình ảnh riêng biệt được capture và truyền mỗi giây.

### Tại sao 60fps quan trọng với nội dung màn hình

| FPS | Use case |
|-----|----------|
| 24fps | Phim (motion blur bù đắp) |
| 30fps | Chấp nhận được với hầu hết nội dung video |
| **60fps** | **UI, cuộn trang, con trỏ chuột — không có lag nhận ra được** |
| 120fps | Gaming, màn hình high-refresh |

Nội dung màn hình khác với video — **văn bản, con trỏ và animation UI** ở 30fps trông bị giật vì không có motion blur để làm mịn chuyển động.

### Ngân sách thời gian frame ở 60fps

\`\`\`
1 giây / 60 frame = 16,67ms mỗi frame
\`\`\`

Mỗi giai đoạn trong pipeline (capture → encode → transmit → decode → display) phải hoàn thành trong ngân sách này.

### Trong dự án

60fps được chọn làm mục tiêu vì use case chính là **phản chiếu tương tác UI** (click chuột, gõ phím, quản lý cửa sổ). Dưới 60fps, animation con trỏ và cuộn trang trông bị lag với người xem.`,
      },
      level: "basic",
      tags: ["FPS", "performance", "60fps", "streaming"],
    },
    {
      id: "perf-b5",
      question: {
        en: "What is scalable architecture and why does it matter in this project?",
        vi: "Kiến trúc có khả năng mở rộng là gì và tại sao nó quan trọng trong dự án này?",
      },
      answer: {
        en: `## Scalable Architecture

**Scalable architecture** means the system can accommodate growth — more features, more users, more complexity — without requiring a full rewrite.

### Key principles applied

**1. Separation of concerns**

\`\`\`
UI Layer       → only renders state
Business Logic → only processes events
Data Layer     → only manages data/native calls
\`\`\`

**2. Dependency Inversion**

Components depend on **interfaces**, not concrete implementations. Swap implementations without touching consumers.

\`\`\`dart
abstract class CastRepository {
  Future<void> startCast();
  Future<void> stopCast();
}
// Today: NativeCastRepository
// Tomorrow: WebRTCCloudRepository
\`\`\`

**3. Single Responsibility**

Each module has one reason to change:
- \`MediaCodecEncoder\` — only encoding
- \`WifiDirectManager\` — only connectivity
- \`SignalingService\` — only SDP/ICE exchange

### Future expansion examples this architecture supports

- Add recording: plug a new \`RecorderSink\` into the existing encoder output
- Add cloud relay: swap \`WifiDirectManager\` for \`TURNRelayManager\`
- Add iOS: implement the same \`CastRepository\` interface with ReplayKit`,
        vi: `## Kiến Trúc Có Khả Năng Mở Rộng

**Kiến trúc có khả năng mở rộng** có nghĩa là hệ thống có thể đáp ứng sự tăng trưởng — thêm tính năng, thêm người dùng, thêm độ phức tạp — mà không cần viết lại hoàn toàn.

### Các nguyên tắc chính được áp dụng

**1. Phân tách mối quan tâm**

\`\`\`
UI Layer       → chỉ render state
Business Logic → chỉ xử lý event
Data Layer     → chỉ quản lý dữ liệu/native call
\`\`\`

**2. Đảo ngược phụ thuộc**

Các thành phần phụ thuộc vào **interface**, không phải implementation cụ thể. Thay implementation mà không ảnh hưởng consumer.

\`\`\`dart
abstract class CastRepository {
  Future<void> startCast();
  Future<void> stopCast();
}
// Hôm nay: NativeCastRepository
// Ngày mai: WebRTCCloudRepository
\`\`\`

**3. Single Responsibility**

Mỗi module có một lý do để thay đổi:
- \`MediaCodecEncoder\` — chỉ encoding
- \`WifiDirectManager\` — chỉ kết nối
- \`SignalingService\` — chỉ trao đổi SDP/ICE

### Ví dụ mở rộng trong tương lai mà kiến trúc này hỗ trợ

- Thêm tính năng ghi: cắm \`RecorderSink\` mới vào output encoder hiện có
- Thêm cloud relay: thay \`WifiDirectManager\` bằng \`TURNRelayManager\`
- Thêm iOS: implement interface \`CastRepository\` với ReplayKit`,
      },
      level: "basic",
      tags: ["architecture", "scalability", "SOLID", "design"],
    },
    {
      id: "perf-b6",
      question: {
        en: "What is bitrate and how does it relate to streaming quality?",
        vi: "Bitrate là gì và nó liên quan đến chất lượng streaming như thế nào?",
      },
      answer: {
        en: `## Bitrate in Streaming

**Bitrate** is the number of bits transmitted per second, measured in Kbps or Mbps. It directly controls the quality vs bandwidth tradeoff.

### Video bitrate guidelines for screen content (1080p)

| Bitrate | Quality | Use case |
|---------|---------|----------|
| 500 Kbps | Very low | Slow presentations |
| 1–2 Mbps | Acceptable | Mostly static screens |
| **2–4 Mbps** | **Good** | **Normal UI interaction** |
| 4–8 Mbps | Excellent | Fast animations, video playback |
| 8+ Mbps | Overkill for most screens | |

### Constant vs Variable Bitrate

- **CBR (Constant Bitrate)** — always sends the same amount of data, even for static screens
- **VBR (Variable Bitrate)** — sends more bits for complex frames, fewer for simple ones

Screen content benefits from **VBR** — a static document uses almost no bits, while a scrolling video-heavy page demands more.

### In the project

VBR targeting **2–4 Mbps average** was used. On Wi-Fi Direct's ~250 Mbps link, the bitrate had no constraint — the encoder ran near its configured maximum.`,
        vi: `## Bitrate Trong Streaming

**Bitrate** là số bit được truyền mỗi giây, đo bằng Kbps hoặc Mbps. Nó trực tiếp kiểm soát đánh đổi giữa chất lượng và băng thông.

### Hướng dẫn bitrate video cho nội dung màn hình (1080p)

| Bitrate | Chất lượng | Use case |
|---------|-----------|----------|
| 500 Kbps | Rất thấp | Thuyết trình chậm |
| 1–2 Mbps | Chấp nhận được | Màn hình tĩnh chủ yếu |
| **2–4 Mbps** | **Tốt** | **Tương tác UI thông thường** |
| 4–8 Mbps | Xuất sắc | Animation nhanh, phát video |
| 8+ Mbps | Dư thừa với hầu hết màn hình | |

### Constant vs Variable Bitrate

- **CBR (Constant Bitrate)** — luôn gửi cùng lượng dữ liệu, kể cả màn hình tĩnh
- **VBR (Variable Bitrate)** — gửi nhiều bit hơn cho frame phức tạp, ít hơn cho frame đơn giản

Nội dung màn hình hưởng lợi từ **VBR** — tài liệu tĩnh dùng rất ít bit, trong khi trang có nhiều video đang cuộn cần nhiều hơn.

### Trong dự án

VBR nhắm **trung bình 2–4 Mbps** được sử dụng. Trên đường truyền Wi-Fi Direct ~250 Mbps, bitrate không bị ràng buộc — encoder chạy gần mức tối đa được cấu hình.`,
      },
      level: "basic",
      tags: ["bitrate", "quality", "VBR", "CBR", "streaming"],
    },
    {
      id: "perf-b7",
      question: {
        en: "What is a jitter buffer and why does WebRTC use one?",
        vi: "Jitter buffer là gì và tại sao WebRTC dùng nó?",
      },
      answer: {
        en: `## Jitter Buffer

**Jitter** is the variation in packet arrival times. Even on a fast network, packets don't always arrive in order or at consistent intervals.

### Problem without a jitter buffer

\`\`\`
Expected: frame arrives every 16.7ms
Reality:  frame 1: 14ms, frame 2: 24ms, frame 3: 10ms, frame 4: missing…
Result:   choppy, stuttering playback
\`\`\`

### Jitter buffer solution

Incoming packets are held in a buffer and played out at a **controlled, smooth rate**. The buffer absorbs timing variations.

\`\`\`
Received: 14ms, 24ms, 10ms  →  Buffer  →  Output: 16.7ms, 16.7ms, 16.7ms
\`\`\`

### Tradeoff

- **Larger buffer** → smoother playback, higher latency
- **Smaller buffer** → lower latency, risk of stuttering on jitter spikes

### Adaptive jitter buffer

WebRTC's jitter buffer is **adaptive** — it measures actual jitter and adjusts its target delay dynamically.

### In the project

On Wi-Fi Direct, jitter was very low (<2ms). The adaptive jitter buffer settled to its minimum (~20ms), contributing minimally to the overall 150ms latency target.`,
        vi: `## Jitter Buffer

**Jitter** là sự biến đổi trong thời gian đến của gói tin. Ngay cả trên mạng nhanh, gói tin không phải lúc nào cũng đến đúng thứ tự hoặc đúng thời gian.

### Vấn đề khi không có jitter buffer

\`\`\`
Dự kiến: frame đến mỗi 16,7ms
Thực tế: frame 1: 14ms, frame 2: 24ms, frame 3: 10ms, frame 4: mất...
Kết quả: phát lại bị giật, không mượt
\`\`\`

### Giải pháp jitter buffer

Các gói đến được giữ trong buffer và phát ra theo **tốc độ đều, được kiểm soát**. Buffer hấp thụ các biến đổi timing.

\`\`\`
Nhận: 14ms, 24ms, 10ms  →  Buffer  →  Output: 16,7ms, 16,7ms, 16,7ms
\`\`\`

### Đánh đổi

- **Buffer lớn hơn** → phát lại mượt hơn, độ trễ cao hơn
- **Buffer nhỏ hơn** → độ trễ thấp hơn, rủi ro giật khi có jitter spike

### Adaptive jitter buffer

Jitter buffer của WebRTC là **thích ứng** — nó đo jitter thực tế và điều chỉnh độ trễ mục tiêu một cách linh động.

### Trong dự án

Trên Wi-Fi Direct, jitter rất thấp (<2ms). Adaptive jitter buffer ổn định ở mức tối thiểu (~20ms), đóng góp rất ít vào mục tiêu tổng độ trễ 150ms.`,
      },
      level: "basic",
      tags: ["jitter buffer", "latency", "WebRTC", "networking"],
    },

    // ── INTERMEDIATE ───────────────────────────────────────────────────────
    {
      id: "perf-i1",
      question: {
        en: "How does Wi-Fi Direct establish a P2P connection between two Android devices?",
        vi: "Wi-Fi Direct thiết lập kết nối P2P giữa hai thiết bị Android như thế nào?",
      },
      answer: {
        en: `## Wi-Fi Direct Connection Flow on Android

### Android Wi-Fi P2P API

\`\`\`kotlin
val manager = getSystemService(WIFI_P2P_SERVICE) as WifiP2pManager
val channel = manager.initialize(this, mainLooper, null)
\`\`\`

### Discovery phase

\`\`\`kotlin
// Device A: discover peers
manager.discoverPeers(channel, object : ActionListener {
    override fun onSuccess() { /* discovery started */ }
    override fun onFailure(reason: Int) { /* handle error */ }
})

// Listen for discovered peers
val receiver = object : BroadcastReceiver() {
    override fun onReceive(ctx: Context, intent: Intent) {
        if (intent.action == WIFI_P2P_PEERS_CHANGED_ACTION) {
            manager.requestPeers(channel) { peers ->
                // peers.deviceList contains discovered devices
            }
        }
    }
}
\`\`\`

### Connection phase

\`\`\`kotlin
val config = WifiP2pConfig().apply {
    deviceAddress = targetDevice.deviceAddress
    wps.setup = WpsInfo.PBC  // Push Button Connect
}
manager.connect(channel, config, actionListener)
\`\`\`

### Group formation

Android negotiates which device becomes **Group Owner** (deterministic via group owner intent score, or forced):

\`\`\`kotlin
config.groupOwnerIntent = 15 // 0-15, higher = more likely to be GO
\`\`\`

After connection:
- Group Owner gets IP: \`192.168.49.1\`
- Client gets IP: \`192.168.49.x\`
- Both devices can communicate directly`,
        vi: `## Luồng Kết Nối Wi-Fi Direct Trên Android

### Android Wi-Fi P2P API

\`\`\`kotlin
val manager = getSystemService(WIFI_P2P_SERVICE) as WifiP2pManager
val channel = manager.initialize(this, mainLooper, null)
\`\`\`

### Giai đoạn khám phá

\`\`\`kotlin
// Thiết bị A: khám phá các peer
manager.discoverPeers(channel, object : ActionListener {
    override fun onSuccess() { /* đã bắt đầu khám phá */ }
    override fun onFailure(reason: Int) { /* xử lý lỗi */ }
})

// Lắng nghe các peer được khám phá
val receiver = object : BroadcastReceiver() {
    override fun onReceive(ctx: Context, intent: Intent) {
        if (intent.action == WIFI_P2P_PEERS_CHANGED_ACTION) {
            manager.requestPeers(channel) { peers ->
                // peers.deviceList chứa các thiết bị được khám phá
            }
        }
    }
}
\`\`\`

### Giai đoạn kết nối

\`\`\`kotlin
val config = WifiP2pConfig().apply {
    deviceAddress = targetDevice.deviceAddress
    wps.setup = WpsInfo.PBC  // Push Button Connect
}
manager.connect(channel, config, actionListener)
\`\`\`

### Hình thành nhóm

Android thương lượng thiết bị nào trở thành **Group Owner** (xác định qua điểm group owner intent, hoặc buộc):

\`\`\`kotlin
config.groupOwnerIntent = 15 // 0-15, cao hơn = nhiều khả năng là GO hơn
\`\`\`

Sau kết nối:
- Group Owner nhận IP: \`192.168.49.1\`
- Client nhận IP: \`192.168.49.x\`
- Cả hai thiết bị có thể giao tiếp trực tiếp`,
      },
      level: "intermediate",
      tags: ["Wi-Fi Direct", "Android", "P2P", "networking"],
    },
    {
      id: "perf-i2",
      question: {
        en: "How did you design the WebSocket signaling server that runs on the device?",
        vi: "Bạn đã thiết kế WebSocket signaling server chạy trên thiết bị như thế nào?",
      },
      answer: {
        en: `## On-Device WebSocket Signaling Server

Running the signaling server on the Group Owner device removes any dependency on external infrastructure.

### Technology choice

**Ktor** (Kotlin) was used — lightweight, coroutine-native, minimal footprint.

\`\`\`kotlin
fun Application.configureSignaling() {
    install(WebSockets)

    routing {
        val sessions = ConcurrentHashMap<String, DefaultWebSocketSession>()

        webSocket("/signal") {
            val peerId = call.request.queryParameters["id"] ?: return@webSocket
            sessions[peerId] = this

            try {
                for (frame in incoming) {
                    if (frame is Frame.Text) {
                        val msg = Json.decodeFromString<SignalMessage>(frame.readText())
                        // Forward message to target peer
                        sessions[msg.to]?.send(Frame.Text(frame.readText()))
                    }
                }
            } finally {
                sessions.remove(peerId)
            }
        }
    }
}
\`\`\`

### Message format

\`\`\`json
{
  "from": "device-a",
  "to": "device-b",
  "type": "offer" | "answer" | "ice",
  "payload": { ... }
}
\`\`\`

### Starting the server from Flutter

\`\`\`kotlin
// MethodChannel handler
"startSignalingServer" -> {
    embeddedServer(Netty, port = 8080, module = Application::configureSignaling).start()
    result.success("started")
}
\`\`\``,
        vi: `## WebSocket Signaling Server Chạy Trên Thiết Bị

Chạy signaling server trên thiết bị Group Owner loại bỏ mọi sự phụ thuộc vào hạ tầng bên ngoài.

### Lựa chọn công nghệ

**Ktor** (Kotlin) được sử dụng — nhẹ, coroutine-native, footprint tối thiểu.

\`\`\`kotlin
fun Application.configureSignaling() {
    install(WebSockets)

    routing {
        val sessions = ConcurrentHashMap<String, DefaultWebSocketSession>()

        webSocket("/signal") {
            val peerId = call.request.queryParameters["id"] ?: return@webSocket
            sessions[peerId] = this

            try {
                for (frame in incoming) {
                    if (frame is Frame.Text) {
                        val msg = Json.decodeFromString<SignalMessage>(frame.readText())
                        // Chuyển tiếp tin nhắn đến peer đích
                        sessions[msg.to]?.send(Frame.Text(frame.readText()))
                    }
                }
            } finally {
                sessions.remove(peerId)
            }
        }
    }
}
\`\`\`

### Định dạng tin nhắn

\`\`\`json
{
  "from": "device-a",
  "to": "device-b",
  "type": "offer" | "answer" | "ice",
  "payload": { ... }
}
\`\`\`

### Khởi động server từ Flutter

\`\`\`kotlin
// MethodChannel handler
"startSignalingServer" -> {
    embeddedServer(Netty, port = 8080, module = Application::configureSignaling).start()
    result.success("started")
}
\`\`\``,
      },
      level: "intermediate",
      tags: ["WebSocket", "signaling", "Ktor", "server", "architecture"],
    },
    {
      id: "perf-i3",
      question: {
        en: "How did you optimize the encoding pipeline to maintain stable 60fps?",
        vi: "Bạn đã tối ưu hóa encoding pipeline như thế nào để duy trì 60fps ổn định?",
      },
      answer: {
        en: `## Optimizing for Stable 60fps

At 60fps, every frame has a **16.7ms budget**. Missing this deadline causes a dropped frame.

### Bottleneck identification

First, profiled with Android Studio CPU Profiler:

\`\`\`
Thread: EncodeThread
  dequeueInputBuffer():  0.1ms
  queueInputBuffer():    0.2ms  (Surface mode = near zero)
  dequeueOutputBuffer(): 14ms   ← hardware encode time
  total per frame:       ~15ms  ← just fits in 16.7ms budget
\`\`\`

### Optimizations applied

**1. Use Surface input (zero-copy)**

\`\`\`kotlin
// Instead of: codec.getInputBuffer(index) → copy pixels → queueInputBuffer()
// Use:        codec.createInputSurface() → VirtualDisplay renders directly
\`\`\`

**2. Async MediaCodec callback**

\`\`\`kotlin
codec.setCallback(object : MediaCodec.Callback() {
    override fun onInputBufferAvailable(codec: MediaCodec, index: Int) { }
    override fun onOutputBufferAvailable(codec: MediaCodec,
        index: Int, info: MediaCodec.BufferInfo) {
        // Called on encoder thread — no polling
        handleEncodedFrame(codec.getOutputBuffer(index)!!, info)
        codec.releaseOutputBuffer(index, false)
    }
})
\`\`\`

**3. Dedicated encoding thread with high priority**

\`\`\`kotlin
val encodeThread = HandlerThread("EncodeThread",
    Process.THREAD_PRIORITY_URGENT_DISPLAY)
encodeThread.start()
\`\`\`

**4. Keyframe interval tuning**

\`\`\`kotlin
setInteger(KEY_I_FRAME_INTERVAL, 2) // keyframe every 2s, not every frame
\`\`\`

Result: consistent 60fps with <5% frame drop rate.`,
        vi: `## Tối Ưu Hóa Để Duy Trì 60fps Ổn Định

Ở 60fps, mỗi frame có **ngân sách 16,7ms**. Bỏ lỡ deadline này gây ra frame bị drop.

### Xác định bottleneck

Đầu tiên, profiled với Android Studio CPU Profiler:

\`\`\`
Thread: EncodeThread
  dequeueInputBuffer():  0,1ms
  queueInputBuffer():    0,2ms  (Surface mode = gần như 0)
  dequeueOutputBuffer(): 14ms   ← thời gian hardware encode
  tổng mỗi frame:        ~15ms  ← vừa khớp với ngân sách 16,7ms
\`\`\`

### Các tối ưu hóa được áp dụng

**1. Dùng Surface input (zero-copy)**

\`\`\`kotlin
// Thay vì: codec.getInputBuffer(index) → copy pixel → queueInputBuffer()
// Dùng:    codec.createInputSurface() → VirtualDisplay render trực tiếp
\`\`\`

**2. Async MediaCodec callback**

\`\`\`kotlin
codec.setCallback(object : MediaCodec.Callback() {
    override fun onInputBufferAvailable(codec: MediaCodec, index: Int) { }
    override fun onOutputBufferAvailable(codec: MediaCodec,
        index: Int, info: MediaCodec.BufferInfo) {
        // Được gọi trên encode thread — không cần polling
        handleEncodedFrame(codec.getOutputBuffer(index)!!, info)
        codec.releaseOutputBuffer(index, false)
    }
})
\`\`\`

**3. Thread encoding chuyên dụng với độ ưu tiên cao**

\`\`\`kotlin
val encodeThread = HandlerThread("EncodeThread",
    Process.THREAD_PRIORITY_URGENT_DISPLAY)
encodeThread.start()
\`\`\`

**4. Tinh chỉnh keyframe interval**

\`\`\`kotlin
setInteger(KEY_I_FRAME_INTERVAL, 2) // keyframe mỗi 2 giây, không phải mỗi frame
\`\`\`

Kết quả: 60fps ổn định với tỷ lệ drop frame <5%.`,
      },
      level: "intermediate",
      tags: ["60fps", "optimization", "MediaCodec", "encoding", "performance"],
    },
    {
      id: "perf-i4",
      question: {
        en: "How do you handle network quality degradation gracefully during casting?",
        vi: "Làm thế nào để xử lý suy giảm chất lượng mạng một cách linh hoạt trong quá trình casting?",
      },
      answer: {
        en: `## Graceful Network Degradation

### Detection

Monitor WebRTC stats every second:

\`\`\`dart
Timer.periodic(Duration(seconds: 1), (_) async {
  final stats = await peerConnection.getStats();
  final rtt = stats.firstWhere(
      (s) => s.type == 'candidate-pair').values['currentRoundTripTime'];
  final lost = stats.firstWhere(
      (s) => s.type == 'inbound-rtp').values['packetsLost'];

  if (rtt > 0.1 || lost > 5) {
    castBloc.add(NetworkDegradedEvent(rtt: rtt, lost: lost));
  }
});
\`\`\`

### Response strategy (graduated)

\`\`\`
Level 1 (RTT 50–100ms, loss <1%):
  → No action, still within acceptable range

Level 2 (RTT 100–200ms, loss 1–5%):
  → Reduce max bitrate by 30%
  → Notify viewer with subtle indicator

Level 3 (RTT >200ms, loss >5%):
  → Reduce FPS to 30
  → Reduce resolution to 720p
  → Show "Poor connection" warning

Level 4 (connection-state: failed):
  → Attempt ICE restart
  → If still fails: show reconnect dialog
\`\`\`

### Bitrate adjustment without renegotiation

\`\`\`javascript
const sender = pc.getSenders()[0];
const params = sender.getParameters();
params.encodings[0].maxBitrate = newBitrate;
await sender.setParameters(params);
\`\`\`

No SDP exchange needed — takes effect immediately.`,
        vi: `## Xử Lý Suy Giảm Chất Lượng Mạng Linh Hoạt

### Phát hiện

Theo dõi stats WebRTC mỗi giây:

\`\`\`dart
Timer.periodic(Duration(seconds: 1), (_) async {
  final stats = await peerConnection.getStats();
  final rtt = stats.firstWhere(
      (s) => s.type == 'candidate-pair').values['currentRoundTripTime'];
  final lost = stats.firstWhere(
      (s) => s.type == 'inbound-rtp').values['packetsLost'];

  if (rtt > 0.1 || lost > 5) {
    castBloc.add(NetworkDegradedEvent(rtt: rtt, lost: lost));
  }
});
\`\`\`

### Chiến lược phản hồi (theo cấp độ)

\`\`\`
Cấp 1 (RTT 50–100ms, loss <1%):
  → Không hành động, vẫn trong phạm vi chấp nhận được

Cấp 2 (RTT 100–200ms, loss 1–5%):
  → Giảm max bitrate 30%
  → Thông báo người xem bằng chỉ báo nhẹ

Cấp 3 (RTT >200ms, loss >5%):
  → Giảm FPS xuống 30
  → Giảm độ phân giải xuống 720p
  → Hiển thị cảnh báo "Kết nối kém"

Cấp 4 (connection-state: failed):
  → Thử ICE restart
  → Nếu vẫn thất bại: hiển thị dialog kết nối lại
\`\`\`

### Điều chỉnh bitrate không cần renegotiation

\`\`\`javascript
const sender = pc.getSenders()[0];
const params = sender.getParameters();
params.encodings[0].maxBitrate = newBitrate;
await sender.setParameters(params);
\`\`\`

Không cần trao đổi SDP — có hiệu lực ngay lập tức.`,
      },
      level: "intermediate",
      tags: ["network", "degradation", "adaptive", "resilience", "quality"],
    },
    {
      id: "perf-i5",
      question: {
        en: "How do you manage CPU and battery resources during extended casting sessions?",
        vi: "Làm thế nào để quản lý tài nguyên CPU và pin trong các phiên casting kéo dài?",
      },
      answer: {
        en: `## Resource Management for Extended Casting

### CPU profiling baseline

| Component | CPU % (software encode) | CPU % (hardware encode) |
|-----------|------------------------|------------------------|
| Screen capture | 2% | 2% |
| Video encoding | 35–45% | **5–8%** |
| WebRTC | 5% | 5% |
| Audio | 2% | 2% |
| Total | ~45–55% | **~15–18%** |

H.264 hardware encoding was the single biggest CPU saving.

### Battery optimizations

**1. Use \`PARTIAL_WAKE_LOCK\` only while casting**

\`\`\`kotlin
val wakeLock = (getSystemService(POWER_SERVICE) as PowerManager)
    .newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "ScreenCast::CastLock")

wakeLock.acquire()   // on cast start
wakeLock.release()   // on cast stop
\`\`\`

**2. Reduce network polling frequency**

RTCP stats are read every 1s — no tighter polling loop needed.

**3. Avoid unnecessary Wake Locks on the receiver**

The receiver only decodes and renders — no screen capture. Use \`SCREEN_DIM_WAKE_LOCK\` to keep display on without full brightness.

**3. Dynamic FPS reduction when screen is idle**

\`\`\`kotlin
// Detect no screen change: consecutive identical frames
if (lastFrameHash == currentFrameHash) {
    mediaCodec.setParameters(Bundle().apply {
        putInt(KEY_FRAME_RATE, 5) // drop to 5fps for static screen
    })
}
\`\`\``,
        vi: `## Quản Lý Tài Nguyên Cho Phiên Casting Kéo Dài

### Baseline profiling CPU

| Thành phần | CPU % (software encode) | CPU % (hardware encode) |
|-----------|------------------------|------------------------|
| Capture màn hình | 2% | 2% |
| Encoding video | 35–45% | **5–8%** |
| WebRTC | 5% | 5% |
| Audio | 2% | 2% |
| Tổng | ~45–55% | **~15–18%** |

H.264 hardware encoding là khoản tiết kiệm CPU lớn nhất.

### Tối ưu hóa pin

**1. Dùng \`PARTIAL_WAKE_LOCK\` chỉ khi đang casting**

\`\`\`kotlin
val wakeLock = (getSystemService(POWER_SERVICE) as PowerManager)
    .newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "ScreenCast::CastLock")

wakeLock.acquire()   // khi bắt đầu cast
wakeLock.release()   // khi dừng cast
\`\`\`

**2. Giảm tần suất polling mạng**

RTCP stats được đọc mỗi 1 giây — không cần polling vòng lặp chặt hơn.

**3. Tránh Wake Lock không cần thiết trên receiver**

Receiver chỉ decode và render — không capture màn hình. Dùng \`SCREEN_DIM_WAKE_LOCK\` để giữ màn hình bật mà không cần độ sáng đầy.

**4. Giảm FPS động khi màn hình không hoạt động**

\`\`\`kotlin
// Phát hiện không thay đổi màn hình: các frame liên tiếp giống nhau
if (lastFrameHash == currentFrameHash) {
    mediaCodec.setParameters(Bundle().apply {
        putInt(KEY_FRAME_RATE, 5) // giảm xuống 5fps cho màn hình tĩnh
    })
}
\`\`\``,
      },
      level: "intermediate",
      tags: ["CPU", "battery", "optimization", "resource management", "Android"],
    },
    {
      id: "perf-i6",
      question: {
        en: "How did you measure and validate that the system achieves ~150ms latency?",
        vi: "Làm thế nào để đo và xác nhận rằng hệ thống đạt ~150ms latency?",
      },
      answer: {
        en: `## Measuring & Validating 150ms Latency

### Challenge

You cannot simply subtract timestamps — sender and receiver clocks are not synchronized.

### Method 1: Visual latency measurement (simple)

\`\`\`
1. Show a fast-changing timer (milliseconds) on caster screen
2. Film both the caster screen and receiver screen simultaneously
3. Compare frames — measure timestamp difference
\`\`\`

This is the most accurate real-world method.

### Method 2: RTCP-based measurement (WebRTC native)

WebRTC's \`getStats()\` exposes \`roundTripTime\`:

\`\`\`javascript
// roundTripTime = network RTT (one-way = RTT/2)
// Add encoding + decoding time to estimate total
const rtt = stats.get('candidate-pair').currentRoundTripTime;
const encodeDecode = 0.020; // ~20ms H.264 encode + decode
const buffer = 0.030;       // jitter buffer
const estimated = rtt / 2 + encodeDecode + buffer;
\`\`\`

### Method 3: Embedded timestamps in SEI NAL units

\`\`\`kotlin
// Sender: write capture timestamp into H.264 SEI
val sei = buildSEITimestamp(System.currentTimeMillis())
// prepend to NAL unit before WebRTC injection

// Receiver: parse SEI, calculate delta
val latency = System.currentTimeMillis() - parseSEITimestamp(nalUnit)
\`\`\`

### Results in the project

- Visual measurement: **120–160ms** (average 135ms)
- RTCP estimate: **140ms** (conservative, includes buffer margin)
- Target: **≤150ms** ✅`,
        vi: `## Đo Và Xác Nhận Độ Trễ ~150ms

### Thách thức

Bạn không thể đơn giản trừ timestamp — đồng hồ của sender và receiver không được đồng bộ.

### Phương pháp 1: Đo độ trễ trực quan (đơn giản)

\`\`\`
1. Hiển thị đồng hồ thay đổi nhanh (millisecond) trên màn hình caster
2. Quay phim cả màn hình caster và màn hình receiver đồng thời
3. So sánh frame — đo sự chênh lệch timestamp
\`\`\`

Đây là phương pháp thực tế chính xác nhất.

### Phương pháp 2: Đo dựa trên RTCP (WebRTC native)

WebRTC's \`getStats()\` cung cấp \`roundTripTime\`:

\`\`\`javascript
// roundTripTime = RTT mạng (một chiều = RTT/2)
// Cộng thêm thời gian encode + decode để ước tính tổng
const rtt = stats.get('candidate-pair').currentRoundTripTime;
const encodeDecode = 0.020; // ~20ms H.264 encode + decode
const buffer = 0.030;       // jitter buffer
const estimated = rtt / 2 + encodeDecode + buffer;
\`\`\`

### Phương pháp 3: Timestamp nhúng trong SEI NAL unit

\`\`\`kotlin
// Sender: ghi capture timestamp vào SEI H.264
val sei = buildSEITimestamp(System.currentTimeMillis())
// thêm vào trước NAL unit trước khi đưa vào WebRTC

// Receiver: phân tích SEI, tính delta
val latency = System.currentTimeMillis() - parseSEITimestamp(nalUnit)
\`\`\`

### Kết quả trong dự án

- Đo trực quan: **120–160ms** (trung bình 135ms)
- Ước tính RTCP: **140ms** (thận trọng, bao gồm margin buffer)
- Mục tiêu: **≤150ms** ✅`,
      },
      level: "intermediate",
      tags: ["latency", "measurement", "testing", "validation", "RTCP"],
    },

    // ── ADVANCED ───────────────────────────────────────────────────────────
    {
      id: "perf-a1",
      question: {
        en: "How would you design a multi-viewer architecture that scales beyond Wi-Fi Direct's single-hop P2P limit?",
        vi: "Bạn sẽ thiết kế kiến trúc multi-viewer như thế nào để vượt qua giới hạn P2P single-hop của Wi-Fi Direct?",
      },
      answer: {
        en: `## Multi-Viewer Architecture Design

Wi-Fi Direct supports up to **8 clients per group**, but each viewer consumes upload bandwidth on the caster device.

### Option 1: Wi-Fi Direct + SFU on Group Owner

\`\`\`
Caster ──► SFU (runs on Group Owner device)
               ├──► Viewer 1 (Wi-Fi Direct client)
               ├──► Viewer 2 (Wi-Fi Direct client)
               └──► Viewer 3 (Wi-Fi Direct client)
\`\`\`

- Caster sends one stream to the SFU
- SFU (mediasoup/Node.js on Android via Termux or embedded JVM) forwards to each viewer
- **Limitation**: Group Owner's CPU handles all forwarding

### Option 2: Wi-Fi Direct Mesh (Android 12+)

Android 12 introduced **Wi-Fi Aware** (NAN — Neighbor Awareness Networking), allowing true mesh without a Group Owner:

\`\`\`
Caster ◄──► Viewer 1 ◄──► Viewer 2 ◄──► Viewer 3
\`\`\`

### Option 3: Hybrid — Wi-Fi Direct local + Cloud SFU for remote viewers

\`\`\`
Local (Wi-Fi Direct):
  Caster ──► Viewer 1, 2, 3

Remote (internet):
  Caster ──► Cloud SFU ──► Viewer 4, 5, 6
\`\`\`

### Recommended for production

\`\`\`
Phase 1 (≤8 viewers, local):  Wi-Fi Direct P2P or tiny SFU on GO
Phase 2 (8–100 viewers):      Cloud SFU (LiveKit/mediasoup)
Phase 3 (100+ viewers):       CDN-based HLS/DASH (accept higher latency)
\`\`\``,
        vi: `## Thiết Kế Kiến Trúc Multi-Viewer

Wi-Fi Direct hỗ trợ tối đa **8 client mỗi nhóm**, nhưng mỗi viewer tiêu thụ băng thông upload trên thiết bị caster.

### Tùy chọn 1: Wi-Fi Direct + SFU trên Group Owner

\`\`\`
Caster ──► SFU (chạy trên thiết bị Group Owner)
               ├──► Viewer 1 (Wi-Fi Direct client)
               ├──► Viewer 2 (Wi-Fi Direct client)
               └──► Viewer 3 (Wi-Fi Direct client)
\`\`\`

- Caster gửi một stream đến SFU
- SFU (mediasoup/Node.js trên Android qua Termux hoặc embedded JVM) chuyển tiếp đến mỗi viewer
- **Hạn chế**: CPU của Group Owner xử lý tất cả việc chuyển tiếp

### Tùy chọn 2: Wi-Fi Direct Mesh (Android 12+)

Android 12 giới thiệu **Wi-Fi Aware** (NAN — Neighbor Awareness Networking), cho phép mesh thực sự không cần Group Owner:

\`\`\`
Caster ◄──► Viewer 1 ◄──► Viewer 2 ◄──► Viewer 3
\`\`\`

### Tùy chọn 3: Hybrid — Wi-Fi Direct cục bộ + Cloud SFU cho viewer từ xa

\`\`\`
Cục bộ (Wi-Fi Direct):
  Caster ──► Viewer 1, 2, 3

Từ xa (internet):
  Caster ──► Cloud SFU ──► Viewer 4, 5, 6
\`\`\`

### Khuyến nghị cho production

\`\`\`
Giai đoạn 1 (≤8 viewer, cục bộ):  P2P Wi-Fi Direct hoặc SFU nhỏ trên GO
Giai đoạn 2 (8–100 viewer):       Cloud SFU (LiveKit/mediasoup)
Giai đoạn 3 (100+ viewer):        CDN-based HLS/DASH (chấp nhận độ trễ cao hơn)
\`\`\``,
      },
      level: "advanced",
      tags: ["scalability", "SFU", "multi-viewer", "Wi-Fi Direct", "architecture"],
    },
    {
      id: "perf-a2",
      question: {
        en: "What are the tradeoffs between Wi-Fi Direct and a TURN relay approach, and when would you choose each?",
        vi: "Đánh đổi giữa Wi-Fi Direct và TURN relay là gì, và khi nào bạn chọn mỗi cách?",
      },
      answer: {
        en: `## Wi-Fi Direct vs TURN Relay

### Comparison

| Dimension | Wi-Fi Direct | TURN Relay |
|-----------|-------------|------------|
| **Latency** | 1–5ms | 20–100ms (server hop) |
| **Bandwidth** | ~250 Mbps | Limited by server/plan |
| **Cost** | Free | Per-GB bandwidth cost |
| **Internet required** | ❌ No | ✅ Yes |
| **Range** | ~200m | Unlimited (internet) |
| **Setup complexity** | Medium (P2P negotiation) | Low (server handles NAT) |
| **Security** | Local network | Encrypted (DTLS-SRTP) + server sees encrypted data |
| **Max viewers** | 8 per group | Scales with server capacity |
| **Android API** | WifiP2pManager | Standard WebRTC |

### Choose Wi-Fi Direct when

- Devices are physically co-located (same room, same building)
- No internet is available (industrial, demo, field use)
- Lowest possible latency is required
- Privacy: stream must not leave the local network
- Cost sensitivity: no cloud infrastructure budget

### Choose TURN relay when

- Devices are geographically separated
- Behind symmetric NAT (P2P fails)
- Multiple viewers across different locations
- Enterprise IT blocks Wi-Fi Direct frequency bands

### Hybrid approach (recommended for production)

\`\`\`
Try Wi-Fi Direct first (preferred path)
  ↓ fails? (different network, NAT issues)
Fall back to TURN relay (internet path)
\`\`\`

\`\`\`javascript
const config = {
  iceTransportPolicy: 'all', // try both direct and relay
  iceServers: [
    { urls: 'stun:stun.example.com' },
    { urls: 'turn:turn.example.com', username: 'u', credential: 'p' }
  ]
};
\`\`\``,
        vi: `## Wi-Fi Direct vs TURN Relay

### So sánh

| Tiêu chí | Wi-Fi Direct | TURN Relay |
|----------|-------------|------------|
| **Độ trễ** | 1–5ms | 20–100ms (hop server) |
| **Băng thông** | ~250 Mbps | Giới hạn bởi server/gói cước |
| **Chi phí** | Miễn phí | Chi phí băng thông theo GB |
| **Cần internet** | ❌ Không | ✅ Có |
| **Phạm vi** | ~200m | Không giới hạn (internet) |
| **Độ phức tạp setup** | Trung bình (P2P negotiation) | Thấp (server xử lý NAT) |
| **Bảo mật** | Mạng cục bộ | Mã hóa (DTLS-SRTP) + server thấy data đã mã hóa |
| **Số viewer tối đa** | 8 mỗi nhóm | Tùy theo công suất server |
| **Android API** | WifiP2pManager | WebRTC tiêu chuẩn |

### Chọn Wi-Fi Direct khi

- Các thiết bị ở cùng vị trí vật lý (cùng phòng, cùng tòa nhà)
- Không có internet (công nghiệp, demo, thực địa)
- Cần độ trễ thấp nhất có thể
- Bảo mật: stream không được rời mạng cục bộ
- Nhạy cảm về chi phí: không có ngân sách hạ tầng cloud

### Chọn TURN relay khi

- Các thiết bị ở xa nhau về địa lý
- Đằng sau symmetric NAT (P2P thất bại)
- Nhiều viewer ở các địa điểm khác nhau
- IT doanh nghiệp chặn băng tần Wi-Fi Direct

### Cách tiếp cận hybrid (khuyến nghị cho production)

\`\`\`
Thử Wi-Fi Direct trước (đường ưu tiên)
  ↓ thất bại? (mạng khác, vấn đề NAT)
Fallback về TURN relay (đường internet)
\`\`\`

\`\`\`javascript
const config = {
  iceTransportPolicy: 'all', // thử cả trực tiếp và relay
  iceServers: [
    { urls: 'stun:stun.example.com' },
    { urls: 'turn:turn.example.com', username: 'u', credential: 'p' }
  ]
};
\`\`\``,
      },
      level: "advanced",
      tags: ["Wi-Fi Direct", "TURN", "architecture", "tradeoffs", "networking"],
    },
    {
      id: "perf-a3",
      question: {
        en: "How would you implement adaptive quality control to dynamically balance latency, FPS, and resolution?",
        vi: "Làm thế nào để implement kiểm soát chất lượng thích ứng để cân bằng động giữa độ trễ, FPS và độ phân giải?",
      },
      answer: {
        en: `## Adaptive Quality Control

### Quality dimensions to control

\`\`\`
Quality = f(resolution, fps, bitrate)
Network = f(bandwidth, RTT, loss)
\`\`\`

### Controller design — priority order

When network degrades, sacrifice quality in this order:
1. **Bitrate** (reduce compression quality) — invisible to most users
2. **Frame rate** (30fps → 24fps → 15fps) — noticeable but acceptable
3. **Resolution** (1080p → 720p → 480p) — noticeable, last resort

### Implementation

\`\`\`dart
class QualityController {
  static const levels = [
    QualityLevel(fps: 60, resolution: 1080, bitrateKbps: 4000),
    QualityLevel(fps: 60, resolution: 1080, bitrateKbps: 2000),
    QualityLevel(fps: 30, resolution: 1080, bitrateKbps: 1500),
    QualityLevel(fps: 30, resolution:  720, bitrateKbps: 1000),
    QualityLevel(fps: 15, resolution:  720, bitrateKbps:  500),
  ];

  int currentLevel = 0;

  void onNetworkStats({required double rttMs, required double lossRate}) {
    if (rttMs < 50 && lossRate < 0.01 && currentLevel > 0) {
      _upgradeLevel();
    } else if (rttMs > 150 || lossRate > 0.05) {
      _degradeLevel();
    }
  }

  void _degradeLevel() {
    if (currentLevel < levels.length - 1) {
      currentLevel++;
      _applyLevel(levels[currentLevel]);
    }
  }

  void _upgradeLevel() {
    // Upgrade slowly (hysteresis) to avoid oscillation
    Future.delayed(Duration(seconds: 10), () {
      if (_stillGoodNetwork()) {
        currentLevel--;
        _applyLevel(levels[currentLevel]);
      }
    });
  }
}
\`\`\`

### Hysteresis prevents oscillation

Always degrade fast, upgrade slowly. Without hysteresis, the quality flips back and forth every few seconds as bandwidth fluctuates.`,
        vi: `## Kiểm Soát Chất Lượng Thích Ứng

### Các chiều chất lượng cần kiểm soát

\`\`\`
Chất lượng = f(độ phân giải, fps, bitrate)
Mạng = f(băng thông, RTT, loss)
\`\`\`

### Thiết kế bộ điều khiển — thứ tự ưu tiên

Khi mạng suy giảm, hy sinh chất lượng theo thứ tự này:
1. **Bitrate** (giảm chất lượng nén) — hầu hết người dùng không nhận ra
2. **Frame rate** (30fps → 24fps → 15fps) — dễ nhận ra nhưng chấp nhận được
3. **Độ phân giải** (1080p → 720p → 480p) — dễ nhận ra, phương án cuối

### Implementation

\`\`\`dart
class QualityController {
  static const levels = [
    QualityLevel(fps: 60, resolution: 1080, bitrateKbps: 4000),
    QualityLevel(fps: 60, resolution: 1080, bitrateKbps: 2000),
    QualityLevel(fps: 30, resolution: 1080, bitrateKbps: 1500),
    QualityLevel(fps: 30, resolution:  720, bitrateKbps: 1000),
    QualityLevel(fps: 15, resolution:  720, bitrateKbps:  500),
  ];

  int currentLevel = 0;

  void onNetworkStats({required double rttMs, required double lossRate}) {
    if (rttMs < 50 && lossRate < 0.01 && currentLevel > 0) {
      _upgradeLevel();
    } else if (rttMs > 150 || lossRate > 0.05) {
      _degradeLevel();
    }
  }

  void _degradeLevel() {
    if (currentLevel < levels.length - 1) {
      currentLevel++;
      _applyLevel(levels[currentLevel]);
    }
  }

  void _upgradeLevel() {
    // Nâng cấp chậm (hysteresis) để tránh dao động
    Future.delayed(Duration(seconds: 10), () {
      if (_stillGoodNetwork()) {
        currentLevel--;
        _applyLevel(levels[currentLevel]);
      }
    });
  }
}
\`\`\`

### Hysteresis ngăn dao động

Luôn giảm cấp nhanh, nâng cấp chậm. Không có hysteresis, chất lượng dao động qua lại mỗi vài giây khi băng thông biến động.`,
      },
      level: "advanced",
      tags: ["adaptive quality", "bitrate", "FPS", "resolution", "optimization"],
    },
    {
      id: "perf-a4",
      question: {
        en: "How would you design a robust end-to-end testing strategy for the streaming system?",
        vi: "Bạn sẽ thiết kế chiến lược kiểm thử end-to-end toàn diện cho hệ thống streaming như thế nào?",
      },
      answer: {
        en: `## E2E Testing Strategy for Streaming

### Testing pyramid

\`\`\`
         [E2E: Full cast session]
       [Integration: Native ↔ Flutter]
    [Unit: BLoC / Encoder / Signaling]
\`\`\`

### Unit tests

\`\`\`dart
// BLoC state machine tests
blocTest<CastBloc, CastState>(
  'degraded network triggers FPS reduction',
  build: () => CastBloc(repo: mockRepo, qc: mockQC),
  seed: () => CastStreaming(fps: 60),
  act: (b) => b.add(NetworkDegradedEvent(rttMs: 200)),
  expect: () => [CastStreaming(fps: 30)],
);
\`\`\`

\`\`\`kotlin
// Encoder unit test
@Test fun \`keyframe requested on PLI\`() {
    encoder.onPictureLossIndication()
    assertTrue(nextEncodedFrame().isKeyFrame)
}
\`\`\`

### Integration tests

\`\`\`kotlin
@RunWith(AndroidJUnit4::class)
class ScreenCastIntegrationTest {
    @Test fun \`encoder produces valid H264 NAL units\`() {
        val encoder = HardwareH264Encoder()
        encoder.initEncode(testSettings, frameCallback)
        encoder.encode(syntheticFrame, EncodeInfo())
        // Validate SPS + PPS + IDR in first output
        assertTrue(capturedFrames.first().containsSPSAndPPS())
    }
}
\`\`\`

### E2E performance tests

\`\`\`python
# Automated latency measurement using OpenCV
# Record both screens, find matching frames, measure time delta
def measure_latency(caster_video, viewer_video):
    for frame_ts, frame in caster_video.frames():
        match_ts = viewer_video.find_matching_frame(frame)
        yield match_ts - frame_ts
\`\`\`

### Metrics to validate in CI

| Metric | Threshold |
|--------|-----------|
| Frame rate | ≥ 57fps (95th percentile) |
| End-to-end latency | ≤ 150ms (average) |
| Frame drop rate | ≤ 5% |
| Connection setup time | ≤ 3s |
| Memory (caster) | ≤ 200MB heap |`,
        vi: `## Chiến Lược Kiểm Thử E2E Cho Hệ Thống Streaming

### Pyramid kiểm thử

\`\`\`
         [E2E: Phiên cast đầy đủ]
       [Integration: Native ↔ Flutter]
    [Unit: BLoC / Encoder / Signaling]
\`\`\`

### Unit test

\`\`\`dart
// Test state machine BLoC
blocTest<CastBloc, CastState>(
  'mạng suy giảm kích hoạt giảm FPS',
  build: () => CastBloc(repo: mockRepo, qc: mockQC),
  seed: () => CastStreaming(fps: 60),
  act: (b) => b.add(NetworkDegradedEvent(rttMs: 200)),
  expect: () => [CastStreaming(fps: 30)],
);
\`\`\`

\`\`\`kotlin
// Unit test encoder
@Test fun \`yêu cầu keyframe khi nhận PLI\`() {
    encoder.onPictureLossIndication()
    assertTrue(nextEncodedFrame().isKeyFrame)
}
\`\`\`

### Integration test

\`\`\`kotlin
@RunWith(AndroidJUnit4::class)
class ScreenCastIntegrationTest {
    @Test fun \`encoder tạo NAL unit H264 hợp lệ\`() {
        val encoder = HardwareH264Encoder()
        encoder.initEncode(testSettings, frameCallback)
        encoder.encode(syntheticFrame, EncodeInfo())
        // Xác thực SPS + PPS + IDR trong output đầu tiên
        assertTrue(capturedFrames.first().containsSPSAndPPS())
    }
}
\`\`\`

### E2E performance test

\`\`\`python
# Đo latency tự động dùng OpenCV
# Ghi cả hai màn hình, tìm frame khớp, đo delta thời gian
def measure_latency(caster_video, viewer_video):
    for frame_ts, frame in caster_video.frames():
        match_ts = viewer_video.find_matching_frame(frame)
        yield match_ts - frame_ts
\`\`\`

### Các chỉ số cần xác nhận trong CI

| Chỉ số | Ngưỡng |
|--------|--------|
| Frame rate | ≥ 57fps (percentile 95) |
| Độ trễ end-to-end | ≤ 150ms (trung bình) |
| Tỷ lệ drop frame | ≤ 5% |
| Thời gian thiết lập kết nối | ≤ 3 giây |
| Bộ nhớ (caster) | ≤ 200MB heap |`,
      },
      level: "advanced",
      tags: ["testing", "E2E", "performance", "CI", "quality assurance"],
    },
    {
      id: "perf-a5",
      question: {
        en: "How do you handle the case where Wi-Fi Direct group negotiation results in the wrong device becoming Group Owner?",
        vi: "Làm thế nào để xử lý trường hợp thương lượng nhóm Wi-Fi Direct dẫn đến sai thiết bị trở thành Group Owner?",
      },
      answer: {
        en: `## Wi-Fi Direct Group Owner Negotiation

The Group Owner (GO) hosts the signaling server and the caster's screen. It **must** be the casting device.

### Problem

Android uses a **Group Owner Intent** score (0–15) to negotiate who becomes GO. If not explicitly set, Android picks based on device capabilities — the wrong device may become GO.

### Solution: Force the caster to be Group Owner

\`\`\`kotlin
val config = WifiP2pConfig.Builder()
    .setDeviceAddress(targetDevice.deviceAddress)
    .setGroupOperatingBand(WifiP2pConfig.GROUP_OWNER_BAND_5GHZ)
    .setGroupOwnerIntent(15)  // Maximum — strongly prefer to be GO
    .build()

manager.connect(channel, config, actionListener)
\`\`\`

### Why 15 doesn't always work

Both devices might request \`intent = 15\`. In case of a tie, Android uses a **random tiebreaker**. If the viewer wins:

\`\`\`
Viewer becomes GO (192.168.49.1)
Caster becomes Client (192.168.49.x)
BUT: signaling server must run on GO (Viewer has no server running!)
\`\`\`

### Robust solution: topology-agnostic signaling

Instead of running the server only on GO, detect the GO role after connection and start the server conditionally:

\`\`\`kotlin
manager.requestConnectionInfo(channel) { info ->
    if (info.isGroupOwner) {
        startSignalingServer()  // This device is GO, run the server
        notifyRole(Role.GROUP_OWNER)
    } else {
        val goAddress = info.groupOwnerAddress.hostAddress
        connectToSignalingServer(goAddress)
        notifyRole(Role.CLIENT)
    }
}
\`\`\`

Both devices can cast or view regardless of which is GO — the role is discovered post-connection.`,
        vi: `## Thương Lượng Group Owner Wi-Fi Direct

Group Owner (GO) host signaling server và màn hình của caster. Nó **phải** là thiết bị casting.

### Vấn đề

Android dùng điểm **Group Owner Intent** (0–15) để thương lượng ai trở thành GO. Nếu không được đặt rõ ràng, Android chọn dựa trên khả năng thiết bị — thiết bị sai có thể trở thành GO.

### Giải pháp: Buộc caster trở thành Group Owner

\`\`\`kotlin
val config = WifiP2pConfig.Builder()
    .setDeviceAddress(targetDevice.deviceAddress)
    .setGroupOperatingBand(WifiP2pConfig.GROUP_OWNER_BAND_5GHZ)
    .setGroupOwnerIntent(15)  // Tối đa — ưu tiên mạnh để là GO
    .build()

manager.connect(channel, config, actionListener)
\`\`\`

### Tại sao 15 không phải lúc nào cũng hiệu quả

Cả hai thiết bị có thể yêu cầu \`intent = 15\`. Trong trường hợp hòa, Android dùng **tiebreaker ngẫu nhiên**. Nếu viewer thắng:

\`\`\`
Viewer trở thành GO (192.168.49.1)
Caster trở thành Client (192.168.49.x)
NHƯNG: signaling server phải chạy trên GO (Viewer không có server chạy!)
\`\`\`

### Giải pháp mạnh: signaling độc lập với topology

Thay vì chạy server chỉ trên GO, phát hiện vai trò GO sau kết nối và khởi động server có điều kiện:

\`\`\`kotlin
manager.requestConnectionInfo(channel) { info ->
    if (info.isGroupOwner) {
        startSignalingServer()  // Thiết bị này là GO, chạy server
        notifyRole(Role.GROUP_OWNER)
    } else {
        val goAddress = info.groupOwnerAddress.hostAddress
        connectToSignalingServer(goAddress)
        notifyRole(Role.CLIENT)
    }
}
\`\`\`

Cả hai thiết bị có thể cast hoặc xem bất kể thiết bị nào là GO — vai trò được phát hiện sau khi kết nối.`,
      },
      level: "advanced",
      tags: ["Wi-Fi Direct", "Group Owner", "architecture", "resilience", "Android"],
    },
    {
      id: "perf-a6",
      question: {
        en: "What security vulnerabilities exist in a local P2P screen casting system and how do you mitigate them?",
        vi: "Những lỗ hổng bảo mật nào tồn tại trong hệ thống screen casting P2P cục bộ và làm thế nào để giảm thiểu chúng?",
      },
      answer: {
        en: `## Security Analysis of Local P2P Screen Casting

### Threat model

\`\`\`
Assets:        Screen content (potentially sensitive)
Threat actors: Rogue devices on same Wi-Fi Direct network
               Man-in-the-middle on LAN
               Malicious app on caster/viewer device
\`\`\`

### Vulnerability 1: Unauthorized viewers

**Risk**: Any device that joins the Wi-Fi Direct group could attempt to connect to the signaling server.

**Mitigation**:
\`\`\`kotlin
// Require a session PIN to join
webSocket("/signal") {
    val pin = call.request.queryParameters["pin"]
    if (pin != expectedPin) {
        close(CloseReason(CloseReason.Codes.CANNOT_ACCEPT, "Invalid PIN"))
        return@webSocket
    }
}
\`\`\`

### Vulnerability 2: Signaling message tampering (MITM on LAN)

**Risk**: A rogue device intercepts WebSocket messages and injects fake SDP/ICE.

**Mitigation**: Use **WSS (WebSocket Secure)** with a self-signed certificate:
\`\`\`kotlin
sslConnector(
    keyStore = generateSelfSignedKeyStore(),
    keyAlias = "cast",
    privateKeyPassword = { charArrayOf() },
    keyStorePassword = { charArrayOf() }
) { port = 8443 }
\`\`\`

DTLS-SRTP fingerprint verification in SDP prevents fake endpoints.

### Vulnerability 3: Screen content exposure

WebRTC mandates **DTLS-SRTP** — all media is encrypted in transit. No mitigation needed for transport.

### Vulnerability 4: PIN brute force

**Mitigation**: Limit connection attempts + exponential backoff:
\`\`\`kotlin
val attempts = AtomicInteger(0)
if (attempts.incrementAndGet() > 5) {
    delay(30_000) // lockout 30s
}
\`\`\`

### Summary

| Risk | Mitigation |
|------|------------|
| Unauthorized viewer | Session PIN |
| Signaling MITM | WSS + DTLS fingerprint |
| Media interception | DTLS-SRTP (mandatory) |
| Brute force | Rate limiting |`,
        vi: `## Phân Tích Bảo Mật Hệ Thống Screen Casting P2P Cục Bộ

### Mô hình mối đe dọa

\`\`\`
Tài sản:          Nội dung màn hình (có thể nhạy cảm)
Tác nhân đe dọa:  Thiết bị giả mạo trên cùng mạng Wi-Fi Direct
                  Man-in-the-middle trên LAN
                  Ứng dụng độc hại trên thiết bị caster/viewer
\`\`\`

### Lỗ hổng 1: Viewer trái phép

**Rủi ro**: Bất kỳ thiết bị nào tham gia nhóm Wi-Fi Direct đều có thể cố kết nối đến signaling server.

**Giảm thiểu**:
\`\`\`kotlin
// Yêu cầu PIN phiên để tham gia
webSocket("/signal") {
    val pin = call.request.queryParameters["pin"]
    if (pin != expectedPin) {
        close(CloseReason(CloseReason.Codes.CANNOT_ACCEPT, "PIN không hợp lệ"))
        return@webSocket
    }
}
\`\`\`

### Lỗ hổng 2: Giả mạo tin nhắn signaling (MITM trên LAN)

**Rủi ro**: Thiết bị giả mạo chặn tin nhắn WebSocket và inject SDP/ICE giả.

**Giảm thiểu**: Dùng **WSS (WebSocket Secure)** với self-signed certificate:
\`\`\`kotlin
sslConnector(
    keyStore = generateSelfSignedKeyStore(),
    keyAlias = "cast",
    privateKeyPassword = { charArrayOf() },
    keyStorePassword = { charArrayOf() }
) { port = 8443 }
\`\`\`

Xác minh fingerprint DTLS-SRTP trong SDP ngăn endpoint giả.

### Lỗ hổng 3: Lộ nội dung màn hình

WebRTC bắt buộc **DTLS-SRTP** — toàn bộ media được mã hóa trong quá trình truyền. Không cần biện pháp giảm thiểu bổ sung cho transport.

### Lỗ hổng 4: Brute force PIN

**Giảm thiểu**: Giới hạn số lần thử kết nối + exponential backoff:
\`\`\`kotlin
val attempts = AtomicInteger(0)
if (attempts.incrementAndGet() > 5) {
    delay(30_000) // khóa 30 giây
}
\`\`\`

### Tóm tắt

| Rủi ro | Giảm thiểu |
|--------|-----------|
| Viewer trái phép | Session PIN |
| MITM signaling | WSS + DTLS fingerprint |
| Chặn media | DTLS-SRTP (bắt buộc) |
| Brute force | Rate limiting |`,
      },
      level: "advanced",
      tags: ["security", "MITM", "authentication", "encryption", "vulnerabilities"],
    },
  ],
};
