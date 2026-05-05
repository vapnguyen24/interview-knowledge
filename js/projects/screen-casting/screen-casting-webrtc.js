export const screenCastingWebRTC = {
  id: "screen-casting-webrtc",
  title: "WebRTC & P2P",
  tech: ["WebRTC", "ICE", "SDP", "STUN", "TURN"],
  qas: [
    // ── BASIC ──────────────────────────────────────────────────────────────
    {
      id: "wrtc-b1",
      question: {
        en: "What is WebRTC and what problem does it solve?",
        vi: "WebRTC là gì và nó giải quyết vấn đề gì?",
      },
      answer: {
        en: `## WebRTC (Web Real-Time Communication)

WebRTC is an **open standard** that enables real-time audio, video, and data communication **directly between browsers or apps** — without requiring a plugin or intermediate server for media.

### Problem it solves

Before WebRTC, streaming between two peers required:
- A media server to relay streams
- Proprietary plugins (Flash, Silverlight)

WebRTC enables **P2P media transfer** with built-in:
- Audio/video codec negotiation
- Encryption (DTLS-SRTP mandatory)
- Adaptive bitrate and congestion control

### Core APIs

\`\`\`
RTCPeerConnection  — manages the P2P connection and media tracks
RTCDataChannel     — sends arbitrary data over the same connection
MediaStream        — represents a stream of audio/video tracks
\`\`\``,
        vi: `## WebRTC (Web Real-Time Communication)

WebRTC là một **chuẩn mở** cho phép truyền âm thanh, video và dữ liệu theo thời gian thực **trực tiếp giữa các trình duyệt hoặc ứng dụng** — không cần plugin hoặc server trung gian để truyền media.

### Vấn đề nó giải quyết

Trước WebRTC, để stream giữa hai peer cần:
- Một media server để chuyển tiếp stream
- Plugin độc quyền (Flash, Silverlight)

WebRTC cho phép **truyền media P2P** với tích hợp sẵn:
- Thương lượng codec audio/video
- Mã hóa bắt buộc (DTLS-SRTP)
- Adaptive bitrate và kiểm soát tắc nghẽn

### Các API cốt lõi

\`\`\`
RTCPeerConnection  — quản lý kết nối P2P và các media track
RTCDataChannel     — gửi dữ liệu tùy ý qua cùng kết nối
MediaStream        — đại diện cho một luồng audio/video track
\`\`\``,
      },
      level: "basic",
      tags: ["WebRTC", "P2P", "fundamentals"],
    },
    {
      id: "wrtc-b2",
      question: {
        en: "What is the difference between P2P and client-server architecture?",
        vi: "Sự khác biệt giữa kiến trúc P2P và client-server là gì?",
      },
      answer: {
        en: `## P2P vs Client-Server

### Client-Server

\`\`\`
Client A ──► Server ──► Client B
\`\`\`

- All traffic routes through a central server
- Server is a single point of failure and cost
- Easy to manage, scale, and monitor

### P2P

\`\`\`
Client A ◄──► Client B
\`\`\`

- Peers communicate directly
- No media server cost for forwarding
- Harder to manage NAT traversal, firewalls

### In the screen casting project

P2P via WebRTC was chosen because:
- **Low latency** — no server relay adds ~50–100ms extra hop
- **Cost** — no media server to pay for
- **Privacy** — stream never touches a third-party server
- Wi-Fi Direct further removes internet dependency entirely`,
        vi: `## P2P vs Client-Server

### Client-Server

\`\`\`
Client A ──► Server ──► Client B
\`\`\`

- Toàn bộ traffic đi qua server trung tâm
- Server là điểm lỗi duy nhất và phát sinh chi phí
- Dễ quản lý, mở rộng và giám sát

### P2P

\`\`\`
Client A ◄──► Client B
\`\`\`

- Các peer giao tiếp trực tiếp với nhau
- Không tốn chi phí server để chuyển tiếp media
- Khó xử lý NAT traversal và tường lửa hơn

### Trong dự án screen casting

P2P qua WebRTC được chọn vì:
- **Độ trễ thấp** — không có server relay giúp giảm ~50–100ms
- **Chi phí** — không cần trả tiền cho media server
- **Bảo mật** — stream không đi qua server của bên thứ ba
- Wi-Fi Direct loại bỏ hoàn toàn sự phụ thuộc vào internet`,
      },
      level: "basic",
      tags: ["P2P", "architecture", "client-server"],
    },
    {
      id: "wrtc-b3",
      question: {
        en: "What is a MediaStream and how is it used in WebRTC?",
        vi: "MediaStream là gì và được sử dụng như thế nào trong WebRTC?",
      },
      answer: {
        en: `## MediaStream

A \`MediaStream\` is a container of **audio and video tracks** (\`MediaStreamTrack\`). It represents live or recorded media flowing through the WebRTC pipeline.

### Structure

\`\`\`
MediaStream
├── VideoTrack (e.g., screen capture)
└── AudioTrack (e.g., system audio or microphone)
\`\`\`

### How it's used

\`\`\`javascript
// Capture screen
const stream = await navigator.mediaDevices.getDisplayMedia({
  video: { frameRate: 60 },
  audio: true,
});

// Attach tracks to the peer connection
stream.getTracks().forEach(track => {
  peerConnection.addTrack(track, stream);
});
\`\`\`

### In the screen casting project

The MediaStream came from Android's **MediaProjection API** (via native module) and was fed directly into the WebRTC pipeline as a custom video source.`,
        vi: `## MediaStream

\`MediaStream\` là một container chứa các **audio và video track** (\`MediaStreamTrack\`). Nó đại diện cho media trực tiếp hoặc đã ghi đang chạy qua pipeline WebRTC.

### Cấu trúc

\`\`\`
MediaStream
├── VideoTrack (ví dụ: màn hình được capture)
└── AudioTrack (ví dụ: âm thanh hệ thống hoặc microphone)
\`\`\`

### Cách sử dụng

\`\`\`javascript
// Capture màn hình
const stream = await navigator.mediaDevices.getDisplayMedia({
  video: { frameRate: 60 },
  audio: true,
});

// Gắn track vào peer connection
stream.getTracks().forEach(track => {
  peerConnection.addTrack(track, stream);
});
\`\`\`

### Trong dự án screen casting

MediaStream được lấy từ **MediaProjection API** của Android (qua native module) và đưa trực tiếp vào pipeline WebRTC như một custom video source.`,
      },
      level: "basic",
      tags: ["MediaStream", "WebRTC", "video"],
    },
    {
      id: "wrtc-b4",
      question: {
        en: "What is signaling in WebRTC and why is it needed?",
        vi: "Signaling trong WebRTC là gì và tại sao cần thiết?",
      },
      answer: {
        en: `## Signaling in WebRTC

WebRTC handles media transport but **does not define how peers find each other**. Signaling is the out-of-band mechanism peers use to exchange the metadata needed to establish a connection.

### What is exchanged during signaling?

- **SDP offer/answer** — describes codecs, resolution, direction
- **ICE candidates** — network address candidates for connectivity

### Why WebRTC doesn't include signaling

It's intentional — developers can use any transport (WebSocket, HTTP, XMPP). This flexibility lets WebRTC work in any environment.

### In the project

\`\`\`
Device A                 Signaling Server (WebSocket)          Device B
   │── SDP Offer ──────────────────────────────────────────► │
   │◄─ SDP Answer ───────────────────────────────────────── │
   │── ICE Candidates ─────────────────────────────────────► │
   │◄─ ICE Candidates ───────────────────────────────────── │
   │◄══════════ Direct P2P Media Stream ══════════════════► │
\`\`\``,
        vi: `## Signaling trong WebRTC

WebRTC xử lý việc truyền media nhưng **không định nghĩa cách các peer tìm thấy nhau**. Signaling là cơ chế ngoài băng tần mà các peer dùng để trao đổi metadata cần thiết để thiết lập kết nối.

### Những gì được trao đổi trong signaling?

- **SDP offer/answer** — mô tả codec, độ phân giải, hướng truyền
- **ICE candidates** — các địa chỉ mạng ứng viên để kết nối

### Tại sao WebRTC không bao gồm signaling

Đây là thiết kế có chủ đích — lập trình viên có thể dùng bất kỳ transport nào (WebSocket, HTTP, XMPP). Sự linh hoạt này cho phép WebRTC hoạt động trong mọi môi trường.

### Trong dự án

\`\`\`
Thiết bị A          Signaling Server (WebSocket)           Thiết bị B
   │── SDP Offer ──────────────────────────────────────── ► │
   │◄─ SDP Answer ─────────────────────────────────────── │
   │── ICE Candidates ──────────────────────────────────► │
   │◄─ ICE Candidates ─────────────────────────────────── │
   │◄══════════ Luồng Media P2P trực tiếp ══════════════► │
\`\`\``,
      },
      level: "basic",
      tags: ["signaling", "WebRTC", "WebSocket"],
    },
    {
      id: "wrtc-b5",
      question: {
        en: "What is SDP (Session Description Protocol)?",
        vi: "SDP (Session Description Protocol) là gì?",
      },
      answer: {
        en: `## SDP — Session Description Protocol

SDP is a text-based format that describes a multimedia session. In WebRTC it tells the remote peer **what you can send and receive**.

### Key fields in an SDP

\`\`\`
v=0                          # version
o=- 12345 2 IN IP4 0.0.0.0  # origin
m=video 9 UDP/TLS/RTP/SAVPF  # media section (video)
a=rtpmap:96 VP8/90000        # codec: VP8 at 90kHz clock
a=sendonly                   # direction: sender only
a=framerate:60               # desired frame rate
m=audio 9 UDP/TLS/RTP/SAVPF  # media section (audio)
a=rtpmap:111 opus/48000/2    # codec: Opus
\`\`\`

### Offer / Answer model

1. **Caller** creates an SDP offer (what it wants to send)
2. **Callee** responds with an SDP answer (what it agrees to)
3. Both sides configure their \`RTCPeerConnection\` with the agreed SDP`,
        vi: `## SDP — Session Description Protocol

SDP là định dạng text mô tả một phiên multimedia. Trong WebRTC nó cho peer từ xa biết **bạn có thể gửi và nhận những gì**.

### Các trường quan trọng trong SDP

\`\`\`
v=0                          # phiên bản
o=- 12345 2 IN IP4 0.0.0.0  # nguồn gốc
m=video 9 UDP/TLS/RTP/SAVPF  # phần media (video)
a=rtpmap:96 VP8/90000        # codec: VP8 tại clock 90kHz
a=sendonly                   # hướng: chỉ gửi
a=framerate:60               # frame rate mong muốn
m=audio 9 UDP/TLS/RTP/SAVPF  # phần media (audio)
a=rtpmap:111 opus/48000/2    # codec: Opus
\`\`\`

### Mô hình Offer / Answer

1. **Người gọi** tạo SDP offer (những gì nó muốn gửi)
2. **Người nhận** phản hồi bằng SDP answer (những gì nó đồng ý)
3. Cả hai bên cấu hình \`RTCPeerConnection\` của mình với SDP đã thỏa thuận`,
      },
      level: "basic",
      tags: ["SDP", "WebRTC", "codec"],
    },
    {
      id: "wrtc-b6",
      question: {
        en: "What are ICE candidates?",
        vi: "ICE candidate là gì?",
      },
      answer: {
        en: `## ICE Candidates

ICE (Interactive Connectivity Establishment) candidates are **possible network addresses** through which a peer can be reached. WebRTC collects several and tries them to find the best path.

### Types of candidates

| Type | Description |
|------|-------------|
| **host** | Device's local IP (LAN) |
| **srflx** (server reflexive) | Public IP via STUN |
| **relay** | IP via TURN server (fallback) |

### Priority order

WebRTC prefers: host → srflx → relay

### In the project (Wi-Fi Direct)

Since both devices are on the same Wi-Fi Direct network, only **host candidates** were needed — no STUN/TURN required. This significantly simplified the ICE process and reduced connection setup time.

\`\`\`
Candidate: 192.168.49.1 (host, Wi-Fi Direct group owner IP)
Candidate: 192.168.49.x (host, peer IP)
\`\`\``,
        vi: `## ICE Candidate

ICE (Interactive Connectivity Establishment) candidate là **các địa chỉ mạng khả thi** mà một peer có thể được tiếp cận. WebRTC thu thập nhiều candidate và thử từng cái để tìm đường đi tốt nhất.

### Các loại candidate

| Loại | Mô tả |
|------|-------|
| **host** | IP cục bộ của thiết bị (LAN) |
| **srflx** (server reflexive) | IP public qua STUN |
| **relay** | IP qua TURN server (dự phòng) |

### Thứ tự ưu tiên

WebRTC ưu tiên: host → srflx → relay

### Trong dự án (Wi-Fi Direct)

Vì cả hai thiết bị đều trên cùng mạng Wi-Fi Direct, chỉ cần **host candidate** — không cần STUN/TURN. Điều này đơn giản hóa đáng kể quá trình ICE và giảm thời gian thiết lập kết nối.

\`\`\`
Candidate: 192.168.49.1 (host, IP của group owner Wi-Fi Direct)
Candidate: 192.168.49.x (host, IP của peer)
\`\`\``,
      },
      level: "basic",
      tags: ["ICE", "WebRTC", "networking"],
    },
    {
      id: "wrtc-b7",
      question: {
        en: "What is the difference between STUN and TURN servers?",
        vi: "Sự khác biệt giữa STUN và TURN server là gì?",
      },
      answer: {
        en: `## STUN vs TURN

Both help WebRTC peers connect across NATs and firewalls, but they work differently.

### STUN (Session Traversal Utilities for NAT)

- Tells a peer its **public IP and port** as seen from the internet
- Lightweight — only used during connection setup
- Free and cheap to run
- **Fails** when symmetric NAT blocks the connection

\`\`\`
Peer ──► STUN Server
      ◄── "Your public IP is 203.0.113.5:54321"
\`\`\`

### TURN (Traversal Using Relays around NAT)

- Acts as a **relay**: all media flows through the TURN server
- Works in all network conditions (fallback of last resort)
- **Expensive** — server pays for all bandwidth

\`\`\`
Peer A ──► TURN Server ──► Peer B
\`\`\`

### In the project

Wi-Fi Direct creates a private LAN, so both STUN and TURN were **unnecessary** — peers connected directly via host candidates.`,
        vi: `## STUN vs TURN

Cả hai đều giúp WebRTC kết nối qua NAT và tường lửa, nhưng hoạt động khác nhau.

### STUN (Session Traversal Utilities for NAT)

- Cho peer biết **IP public và port** của nó nhìn từ internet
- Nhẹ — chỉ dùng trong quá trình thiết lập kết nối
- Miễn phí và rẻ để vận hành
- **Thất bại** khi symmetric NAT chặn kết nối

\`\`\`
Peer ──► STUN Server
      ◄── "IP public của bạn là 203.0.113.5:54321"
\`\`\`

### TURN (Traversal Using Relays around NAT)

- Hoạt động như một **relay**: toàn bộ media đi qua TURN server
- Hoạt động trong mọi điều kiện mạng (phương án dự phòng cuối cùng)
- **Tốn kém** — server phải trả tiền cho toàn bộ băng thông

\`\`\`
Peer A ──► TURN Server ──► Peer B
\`\`\`

### Trong dự án

Wi-Fi Direct tạo ra một mạng LAN riêng, nên cả STUN và TURN đều **không cần thiết** — các peer kết nối trực tiếp qua host candidate.`,
      },
      level: "basic",
      tags: ["STUN", "TURN", "NAT", "WebRTC"],
    },

    // ── INTERMEDIATE ───────────────────────────────────────────────────────
    {
      id: "wrtc-i1",
      question: {
        en: "Walk through the full WebRTC offer/answer connection flow.",
        vi: "Mô tả toàn bộ luồng kết nối offer/answer của WebRTC.",
      },
      answer: {
        en: `## WebRTC Offer/Answer Flow

\`\`\`
Caller                   Signaling (WS)              Callee
  │                           │                         │
  │ 1. createOffer()          │                         │
  │ 2. setLocalDescription()  │                         │
  │──── SDP Offer ───────────►│──── SDP Offer ─────────►│
  │                           │  3. setRemoteDescription │
  │                           │  4. createAnswer()       │
  │                           │  5. setLocalDescription  │
  │◄─── SDP Answer ───────────│◄─── SDP Answer ─────────│
  │ 6. setRemoteDescription   │                         │
  │                           │                         │
  │──── ICE candidate ───────►│──── ICE candidate ─────►│
  │◄─── ICE candidate ────────│◄─── ICE candidate ──────│
  │                           │                         │
  │◄════════════ P2P Media ═══════════════════════════► │
\`\`\`

### Code sketch (Caller side)

\`\`\`javascript
const pc = new RTCPeerConnection(config);

stream.getTracks().forEach(t => pc.addTrack(t, stream));

pc.onicecandidate = ({ candidate }) => {
  if (candidate) ws.send({ type: 'ice', candidate });
};

const offer = await pc.createOffer();
await pc.setLocalDescription(offer);
ws.send({ type: 'offer', sdp: offer });

// On answer received:
await pc.setRemoteDescription(new RTCSessionDescription(answer));
\`\`\``,
        vi: `## Luồng Offer/Answer của WebRTC

\`\`\`
Caller                  Signaling (WS)               Callee
  │                           │                         │
  │ 1. createOffer()          │                         │
  │ 2. setLocalDescription()  │                         │
  │──── SDP Offer ───────────►│──── SDP Offer ─────────►│
  │                           │  3. setRemoteDescription │
  │                           │  4. createAnswer()       │
  │                           │  5. setLocalDescription  │
  │◄─── SDP Answer ───────────│◄─── SDP Answer ─────────│
  │ 6. setRemoteDescription   │                         │
  │                           │                         │
  │──── ICE candidate ───────►│──── ICE candidate ─────►│
  │◄─── ICE candidate ────────│◄─── ICE candidate ──────│
  │                           │                         │
  │◄════════════ Luồng Media P2P ══════════════════════►│
\`\`\`

### Code phác thảo (phía Caller)

\`\`\`javascript
const pc = new RTCPeerConnection(config);

stream.getTracks().forEach(t => pc.addTrack(t, stream));

pc.onicecandidate = ({ candidate }) => {
  if (candidate) ws.send({ type: 'ice', candidate });
};

const offer = await pc.createOffer();
await pc.setLocalDescription(offer);
ws.send({ type: 'offer', sdp: offer });

// Khi nhận được answer:
await pc.setRemoteDescription(new RTCSessionDescription(answer));
\`\`\``,
      },
      level: "intermediate",
      tags: ["WebRTC", "offer", "answer", "signaling"],
    },
    {
      id: "wrtc-i2",
      question: {
        en: "What is Trickle ICE and why does it improve connection speed?",
        vi: "Trickle ICE là gì và tại sao nó cải thiện tốc độ kết nối?",
      },
      answer: {
        en: `## Trickle ICE

Without Trickle ICE, a peer must **gather all ICE candidates first**, then send them bundled with the SDP. This can take seconds.

### With Trickle ICE

Candidates are sent to the remote peer **as they are discovered**, in parallel with SDP exchange. Connectivity checks begin immediately.

\`\`\`javascript
pc.onicecandidate = ({ candidate }) => {
  if (candidate) {
    // Send immediately — don't wait for gathering to complete
    signalingChannel.send({ type: 'ice', candidate });
  }
};
\`\`\`

### Lifecycle states

\`\`\`
new → gathering → complete
                ↑
          candidates trickle out here
\`\`\`

### Impact on latency

| Mode | Typical setup time |
|------|--------------------|
| Non-trickle | 2–5 s |
| Trickle ICE | 200–500 ms |

In the screen casting project, Trickle ICE combined with Wi-Fi Direct host-only candidates reduced connection setup to **under 300ms**.`,
        vi: `## Trickle ICE

Không có Trickle ICE, một peer phải **thu thập tất cả ICE candidate trước**, rồi mới gửi chúng cùng với SDP. Quá trình này có thể mất vài giây.

### Với Trickle ICE

Các candidate được gửi đến peer từ xa **ngay khi được tìm thấy**, song song với việc trao đổi SDP. Kiểm tra kết nối bắt đầu ngay lập tức.

\`\`\`javascript
pc.onicecandidate = ({ candidate }) => {
  if (candidate) {
    // Gửi ngay — không chờ hoàn thành gathering
    signalingChannel.send({ type: 'ice', candidate });
  }
};
\`\`\`

### Các trạng thái vòng đời

\`\`\`
new → gathering → complete
                ↑
          candidate được gửi dần ở đây
\`\`\`

### Ảnh hưởng đến độ trễ

| Chế độ | Thời gian thiết lập điển hình |
|--------|-------------------------------|
| Không trickle | 2–5 giây |
| Trickle ICE | 200–500ms |

Trong dự án screen casting, Trickle ICE kết hợp với Wi-Fi Direct (chỉ dùng host candidate) giảm thời gian thiết lập kết nối xuống **dưới 300ms**.`,
      },
      level: "intermediate",
      tags: ["ICE", "Trickle ICE", "WebRTC", "performance"],
    },
    {
      id: "wrtc-i3",
      question: {
        en: "How does RTCPeerConnection manage media tracks internally?",
        vi: "RTCPeerConnection quản lý media track nội bộ như thế nào?",
      },
      answer: {
        en: `## RTCPeerConnection Track Management

\`RTCPeerConnection\` uses **senders** and **receivers** to manage outgoing and incoming tracks.

### Senders (outgoing)

\`\`\`javascript
const sender = pc.addTrack(videoTrack, stream);

// Replace track without renegotiation (e.g., switch camera)
await sender.replaceTrack(newTrack);

// Get encoding parameters
const params = sender.getParameters();
params.encodings[0].maxBitrate = 5_000_000; // 5 Mbps
await sender.setParameters(params);
\`\`\`

### Receivers (incoming)

\`\`\`javascript
pc.ontrack = ({ track, streams }) => {
  videoElement.srcObject = streams[0];
};
\`\`\`

### Transceivers

Each \`RTCRtpTransceiver\` bundles a sender + receiver for one track:

\`\`\`javascript
const transceiver = pc.addTransceiver('video', {
  direction: 'sendonly',  // sendonly | recvonly | sendrecv
});
\`\`\`

### In the project

The screen caster added one **video sender** (screen) + one **audio sender** (system audio). Direction was set to \`sendonly\` on the caster and \`recvonly\` on the viewer.`,
        vi: `## RTCPeerConnection quản lý Track

\`RTCPeerConnection\` dùng **sender** và **receiver** để quản lý track gửi đi và nhận về.

### Sender (gửi đi)

\`\`\`javascript
const sender = pc.addTrack(videoTrack, stream);

// Thay track mà không cần renegotiation (ví dụ: đổi camera)
await sender.replaceTrack(newTrack);

// Lấy thông số encoding
const params = sender.getParameters();
params.encodings[0].maxBitrate = 5_000_000; // 5 Mbps
await sender.setParameters(params);
\`\`\`

### Receiver (nhận về)

\`\`\`javascript
pc.ontrack = ({ track, streams }) => {
  videoElement.srcObject = streams[0];
};
\`\`\`

### Transceiver

Mỗi \`RTCRtpTransceiver\` gộp một sender + receiver cho một track:

\`\`\`javascript
const transceiver = pc.addTransceiver('video', {
  direction: 'sendonly',  // sendonly | recvonly | sendrecv
});
\`\`\`

### Trong dự án

Thiết bị caster thêm một **video sender** (màn hình) + một **audio sender** (âm thanh hệ thống). Direction được đặt thành \`sendonly\` ở caster và \`recvonly\` ở viewer.`,
      },
      level: "intermediate",
      tags: ["RTCPeerConnection", "tracks", "WebRTC"],
    },
    {
      id: "wrtc-i4",
      question: {
        en: "What video codecs does WebRTC support and which is best for screen casting?",
        vi: "WebRTC hỗ trợ những video codec nào và codec nào tốt nhất cho screen casting?",
      },
      answer: {
        en: `## WebRTC Video Codecs

### Supported codecs

| Codec | Type | Notes |
|-------|------|-------|
| **VP8** | Software | Mandatory in spec, widely supported |
| **VP9** | Software | Better compression, higher CPU |
| **H.264** | Hardware | Hardware-accelerated on most devices |
| **AV1** | Software | Best compression, limited support |

### For screen casting specifically

**H.264** is preferred because:
- Android's **MediaCodec** provides hardware-accelerated H.264 encoding
- Screen content (text, UI) has sharp edges — H.264 handles this well
- Lower CPU usage vs VP8/VP9 software encoding
- Widely supported on receivers

### Force H.264 in SDP

\`\`\`javascript
function preferH264(sdp) {
  return sdp.replace(
    /m=video .+/,
    line => reorderCodecs(line, '96') // H.264 payload type
  );
}
\`\`\`

### In the project

H.264 Baseline profile was used with hardware encoding (MediaCodec) to hit **60fps at ~2–4 Mbps** with minimal CPU impact.`,
        vi: `## Các Video Codec của WebRTC

### Các codec được hỗ trợ

| Codec | Loại | Ghi chú |
|-------|------|---------|
| **VP8** | Software | Bắt buộc theo spec, hỗ trợ rộng rãi |
| **VP9** | Software | Nén tốt hơn, CPU cao hơn |
| **H.264** | Hardware | Tăng tốc phần cứng trên hầu hết thiết bị |
| **AV1** | Software | Nén tốt nhất, hỗ trợ còn hạn chế |

### Dành riêng cho screen casting

**H.264** được ưu tiên vì:
- Android's **MediaCodec** cung cấp encoding H.264 tăng tốc phần cứng
- Nội dung màn hình (văn bản, UI) có cạnh sắc — H.264 xử lý tốt
- CPU thấp hơn so với VP8/VP9 bằng phần mềm
- Được hỗ trợ rộng rãi trên thiết bị nhận

### Ép dùng H.264 trong SDP

\`\`\`javascript
function preferH264(sdp) {
  return sdp.replace(
    /m=video .+/,
    line => reorderCodecs(line, '96') // H.264 payload type
  );
}
\`\`\`

### Trong dự án

H.264 Baseline profile được dùng với hardware encoding (MediaCodec) để đạt **60fps ở ~2–4 Mbps** với tác động CPU tối thiểu.`,
      },
      level: "intermediate",
      tags: ["codec", "H.264", "VP8", "WebRTC", "performance"],
    },
    {
      id: "wrtc-i5",
      question: {
        en: "How does NAT traversal work in WebRTC?",
        vi: "NAT traversal hoạt động như thế nào trong WebRTC?",
      },
      answer: {
        en: `## NAT Traversal in WebRTC

Most devices sit behind a NAT router which hides private IPs. WebRTC uses ICE to punch through NATs.

### Types of NAT and difficulty

| NAT Type | Description | WebRTC success |
|----------|-------------|----------------|
| Full cone | Any external host can reach mapped port | ✅ Easy |
| Restricted cone | Only hosts you've contacted | ✅ Works |
| Port restricted | Only specific host+port | ✅ Works |
| Symmetric | New mapping per destination | ⚠️ Needs TURN |

### ICE connectivity checks (STUN Binding Requests)

Both peers send STUN Binding Requests to each other's candidates. A successful round-trip establishes the path.

\`\`\`
Peer A (192.168.1.5) ──► NAT A ──► 203.0.113.5:4444
                                            │
Peer B (10.0.0.3)    ──► NAT B ──► 203.0.113.6:5555
\`\`\`

### In the project

Wi-Fi Direct bypasses NAT entirely — both devices are in the same **192.168.49.x** subnet, so connectivity succeeds with host candidates alone.`,
        vi: `## NAT Traversal trong WebRTC

Hầu hết thiết bị đứng sau NAT router ẩn đi IP private. WebRTC dùng ICE để vượt qua NAT.

### Các loại NAT và độ khó

| Loại NAT | Mô tả | Thành công WebRTC |
|----------|-------|-------------------|
| Full cone | Bất kỳ host ngoài nào cũng tiếp cận được port đã map | ✅ Dễ |
| Restricted cone | Chỉ host mà bạn đã liên hệ | ✅ Hoạt động |
| Port restricted | Chỉ host+port cụ thể | ✅ Hoạt động |
| Symmetric | Map mới cho mỗi đích | ⚠️ Cần TURN |

### Kiểm tra kết nối ICE (STUN Binding Requests)

Cả hai peer gửi STUN Binding Request đến các candidate của nhau. Một round-trip thành công thiết lập đường kết nối.

\`\`\`
Peer A (192.168.1.5) ──► NAT A ──► 203.0.113.5:4444
                                            │
Peer B (10.0.0.3)    ──► NAT B ──► 203.0.113.6:5555
\`\`\`

### Trong dự án

Wi-Fi Direct bỏ qua NAT hoàn toàn — cả hai thiết bị đều trong cùng subnet **192.168.49.x**, nên kết nối thành công chỉ với host candidate.`,
      },
      level: "intermediate",
      tags: ["NAT", "ICE", "WebRTC", "networking"],
    },
    {
      id: "wrtc-i6",
      question: {
        en: "How does WebRTC handle packet loss during streaming?",
        vi: "WebRTC xử lý mất gói tin trong quá trình streaming như thế nào?",
      },
      answer: {
        en: `## Packet Loss Handling in WebRTC

WebRTC uses **RTP** (Real-time Transport Protocol) over UDP, which doesn't guarantee delivery. Several mechanisms compensate for loss.

### 1. NACK (Negative Acknowledgment)

Receiver tells sender: "I'm missing packet #1234, resend it."

- Works well for small, short bursts of loss
- Adds latency equal to one round-trip

### 2. FEC (Forward Error Correction)

Sender adds **redundant data** so the receiver can reconstruct lost packets without retransmission.

- Trades bandwidth for resilience
- Useful for audio (Opus uses in-band FEC)

### 3. Adaptive Bitrate (REMB / TWCC)

If loss is sustained, the congestion controller **reduces bitrate** to ease network pressure.

### 4. PLI (Picture Loss Indication)

When a key frame is lost and can't be recovered, the receiver sends a PLI requesting a new key frame.

\`\`\`
Receiver ──► PLI ──► Sender ──► new keyframe ──► Receiver
\`\`\`

### In the project

Wi-Fi Direct provides a stable ~300Mbps link — packet loss was negligible. PLI handling was still implemented for resilience on congested Wi-Fi environments.`,
        vi: `## Xử lý Mất Gói Tin trong WebRTC

WebRTC dùng **RTP** (Real-time Transport Protocol) qua UDP, không đảm bảo việc giao hàng. Một số cơ chế bù đắp cho việc mất gói.

### 1. NACK (Negative Acknowledgment)

Receiver thông báo cho sender: "Tôi thiếu gói #1234, gửi lại đi."

- Hoạt động tốt cho các burst mất gói nhỏ, ngắn
- Thêm độ trễ bằng một round-trip

### 2. FEC (Forward Error Correction)

Sender thêm **dữ liệu dự phòng** để receiver có thể tái tạo gói bị mất mà không cần gửi lại.

- Đổi băng thông lấy khả năng chịu lỗi
- Hữu ích cho audio (Opus dùng in-band FEC)

### 3. Adaptive Bitrate (REMB / TWCC)

Nếu mất gói kéo dài, bộ điều khiển tắc nghẽn **giảm bitrate** để giảm áp lực mạng.

### 4. PLI (Picture Loss Indication)

Khi một key frame bị mất và không thể phục hồi, receiver gửi PLI yêu cầu key frame mới.

\`\`\`
Receiver ──► PLI ──► Sender ──► keyframe mới ──► Receiver
\`\`\`

### Trong dự án

Wi-Fi Direct cung cấp đường link ổn định ~300Mbps — mất gói không đáng kể. Xử lý PLI vẫn được implement để đảm bảo khả năng chịu lỗi trong môi trường Wi-Fi bị tắc nghẽn.`,
      },
      level: "intermediate",
      tags: ["packet loss", "NACK", "FEC", "WebRTC", "RTP"],
    },
    {
      id: "wrtc-i7",
      question: {
        en: "How does DTLS-SRTP provide security in WebRTC?",
        vi: "DTLS-SRTP cung cấp bảo mật trong WebRTC như thế nào?",
      },
      answer: {
        en: `## DTLS-SRTP Security

WebRTC **mandates encryption** — unencrypted media is not allowed by the spec.

### Two-layer security

\`\`\`
DTLS (Datagram TLS)
  └── Key exchange — peers authenticate and agree on encryption keys

SRTP (Secure RTP)
  └── Media encryption — audio/video encrypted with DTLS-derived keys
\`\`\`

### How it works

1. During ICE, a **DTLS handshake** occurs between peers
2. Each peer presents a **self-signed certificate** (fingerprint in SDP)
3. Keys are derived from the DTLS handshake
4. All RTP packets are **encrypted with SRTP** using those keys

### SDP fingerprint

\`\`\`
a=fingerprint:sha-256 AB:CD:EF:...
\`\`\`

The signaling channel delivers this fingerprint — if an attacker tampers with it, DTLS fails and the connection is rejected.

### In the project

Because signaling used a trusted local WebSocket server (Wi-Fi Direct network), the DTLS fingerprint could not be spoofed, providing end-to-end encrypted streaming without any additional configuration.`,
        vi: `## Bảo mật DTLS-SRTP

WebRTC **bắt buộc mã hóa** — media không được mã hóa không được phép theo spec.

### Hai lớp bảo mật

\`\`\`
DTLS (Datagram TLS)
  └── Trao đổi khóa — các peer xác thực và thống nhất khóa mã hóa

SRTP (Secure RTP)
  └── Mã hóa media — audio/video được mã hóa với khóa từ DTLS
\`\`\`

### Cách hoạt động

1. Trong quá trình ICE, **DTLS handshake** xảy ra giữa các peer
2. Mỗi peer trình bày một **self-signed certificate** (fingerprint trong SDP)
3. Khóa được tạo ra từ DTLS handshake
4. Tất cả RTP packet được **mã hóa bằng SRTP** dùng các khóa đó

### Fingerprint trong SDP

\`\`\`
a=fingerprint:sha-256 AB:CD:EF:...
\`\`\`

Kênh signaling gửi fingerprint này — nếu kẻ tấn công giả mạo, DTLS thất bại và kết nối bị từ chối.

### Trong dự án

Vì signaling dùng WebSocket server cục bộ đáng tin cậy (mạng Wi-Fi Direct), fingerprint DTLS không thể bị giả mạo, cung cấp streaming mã hóa end-to-end không cần cấu hình thêm.`,
      },
      level: "intermediate",
      tags: ["DTLS", "SRTP", "security", "WebRTC", "encryption"],
    },

    // ── ADVANCED ───────────────────────────────────────────────────────────
    {
      id: "wrtc-a1",
      question: {
        en: "How does WebRTC's congestion control work and how did you tune it for 60fps?",
        vi: "Congestion control của WebRTC hoạt động như thế nào và bạn đã tinh chỉnh nó cho 60fps như thế nào?",
      },
      answer: {
        en: `## WebRTC Congestion Control

WebRTC uses **GCC (Google Congestion Control)** — an algorithm that estimates available bandwidth and adjusts bitrate to avoid saturating the link.

### Two feedback mechanisms

**REMB (Receiver Estimated Max Bitrate)**
- Receiver estimates bandwidth from inter-packet arrival times
- Sends RTCP REMB messages back to sender
- Sender caps bitrate at REMB estimate

**TWCC (Transport-Wide Congestion Control)**
- More accurate — sender controls the estimate using receiver feedback
- Transport-wide sequence numbers track all packets

### The GCC algorithm

\`\`\`
Arrival time model → delay gradient → overuse detector
     ↓
Rate controller (AIMD: Additive Increase, Multiplicative Decrease)
     ↓
Encoder bitrate target
\`\`\`

### Tuning for 60fps

\`\`\`javascript
const sender = pc.getSenders().find(s => s.track.kind === 'video');
const params = sender.getParameters();

params.encodings[0].maxBitrate = 8_000_000;  // 8 Mbps ceiling
params.encodings[0].maxFramerate = 60;
params.encodings[0].networkPriority = 'high';

await sender.setParameters(params);
\`\`\`

On Wi-Fi Direct (~300 Mbps), GCC rarely throttled — the bitrate stayed at max, delivering consistent 60fps without drops.`,
        vi: `## Congestion Control của WebRTC

WebRTC dùng **GCC (Google Congestion Control)** — thuật toán ước tính băng thông khả dụng và điều chỉnh bitrate để tránh bão hòa đường truyền.

### Hai cơ chế feedback

**REMB (Receiver Estimated Max Bitrate)**
- Receiver ước tính băng thông từ thời gian đến giữa các gói
- Gửi RTCP REMB về sender
- Sender giới hạn bitrate theo ước tính REMB

**TWCC (Transport-Wide Congestion Control)**
- Chính xác hơn — sender kiểm soát ước tính dùng feedback từ receiver
- Sequence number toàn transport theo dõi tất cả gói

### Thuật toán GCC

\`\`\`
Mô hình thời gian đến → độ dốc trễ → bộ phát hiện overuse
     ↓
Bộ điều khiển tốc độ (AIMD: Tăng cộng, Giảm nhân)
     ↓
Mục tiêu bitrate encoder
\`\`\`

### Tinh chỉnh cho 60fps

\`\`\`javascript
const sender = pc.getSenders().find(s => s.track.kind === 'video');
const params = sender.getParameters();

params.encodings[0].maxBitrate = 8_000_000;  // Trần 8 Mbps
params.encodings[0].maxFramerate = 60;
params.encodings[0].networkPriority = 'high';

await sender.setParameters(params);
\`\`\`

Trên Wi-Fi Direct (~300 Mbps), GCC hiếm khi throttle — bitrate duy trì ở mức tối đa, đạt 60fps ổn định không bị giảm.`,
      },
      level: "advanced",
      tags: ["GCC", "congestion control", "bitrate", "WebRTC", "performance"],
    },
    {
      id: "wrtc-a2",
      question: {
        en: "How would you extend this system to support multiple simultaneous viewers using SFU?",
        vi: "Bạn sẽ mở rộng hệ thống này để hỗ trợ nhiều người xem đồng thời bằng SFU như thế nào?",
      },
      answer: {
        en: `## Scaling to Multiple Viewers with SFU

A pure P2P mesh doesn't scale — each additional viewer requires the caster to upload an extra stream copy.

### P2P Mesh (current) — doesn't scale

\`\`\`
Caster ──► Viewer 1
Caster ──► Viewer 2    (3 viewers = 3× upload)
Caster ──► Viewer 3
\`\`\`

### SFU (Selective Forwarding Unit)

\`\`\`
Caster ──► SFU ──► Viewer 1
               ──► Viewer 2   (caster uploads once)
               ──► Viewer 3
\`\`\`

The SFU forwards RTP packets without decoding — low CPU, low latency.

### Implementation approach

\`\`\`
1. Caster sends one WebRTC stream to SFU
2. SFU creates a new RTCPeerConnection per viewer
3. SFU uses addTrack() to forward caster's tracks
4. Viewers receive independent streams from SFU
\`\`\`

### Open-source SFUs to consider

- **mediasoup** — Node.js, very low latency
- **LiveKit** — Go, built-in scaling, SaaS option
- **Janus** — C, flexible plugin system

### Simulcast for quality adaptation

Caster sends **3 spatial layers** (1080p / 720p / 360p). The SFU selects the right layer per viewer based on bandwidth.`,
        vi: `## Mở rộng cho Nhiều Người Xem bằng SFU

P2P mesh thuần túy không scale được — mỗi người xem bổ sung yêu cầu caster upload thêm một bản stream.

### P2P Mesh (hiện tại) — không scale

\`\`\`
Caster ──► Viewer 1
Caster ──► Viewer 2    (3 viewer = upload 3×)
Caster ──► Viewer 3
\`\`\`

### SFU (Selective Forwarding Unit)

\`\`\`
Caster ──► SFU ──► Viewer 1
               ──► Viewer 2   (caster upload một lần)
               ──► Viewer 3
\`\`\`

SFU chuyển tiếp RTP packet mà không decode — CPU thấp, độ trễ thấp.

### Cách tiếp cận implementation

\`\`\`
1. Caster gửi một stream WebRTC đến SFU
2. SFU tạo RTCPeerConnection mới cho mỗi viewer
3. SFU dùng addTrack() để chuyển tiếp track của caster
4. Viewer nhận stream độc lập từ SFU
\`\`\`

### SFU open-source nên xem xét

- **mediasoup** — Node.js, độ trễ rất thấp
- **LiveKit** — Go, scaling tích hợp, tùy chọn SaaS
- **Janus** — C, hệ thống plugin linh hoạt

### Simulcast để thích ứng chất lượng

Caster gửi **3 spatial layer** (1080p / 720p / 360p). SFU chọn layer phù hợp cho từng viewer dựa trên băng thông.`,
      },
      level: "advanced",
      tags: ["SFU", "scalability", "simulcast", "WebRTC", "architecture"],
    },
    {
      id: "wrtc-a3",
      question: {
        en: "How do you debug WebRTC performance issues using getStats()?",
        vi: "Làm thế nào để debug các vấn đề hiệu năng WebRTC bằng getStats()?",
      },
      answer: {
        en: `## Debugging WebRTC with getStats()

\`RTCPeerConnection.getStats()\` returns a rich set of metrics updated every second.

### Key stats to monitor

\`\`\`javascript
const stats = await pc.getStats();

stats.forEach(report => {
  if (report.type === 'outbound-rtp' && report.kind === 'video') {
    console.log({
      framesSent:      report.framesSent,
      framesPerSecond: report.framesPerSecond,    // target: 60
      bytesSent:       report.bytesSent,
      retransmittedPacketsSent: report.retransmittedPacketsSent,
      qualityLimitationReason:  report.qualityLimitationReason,
      // 'none' | 'cpu' | 'bandwidth' | 'other'
    });
  }

  if (report.type === 'candidate-pair' && report.state === 'succeeded') {
    console.log({
      currentRoundTripTime: report.currentRoundTripTime, // target: <0.05s
      availableOutgoingBitrate: report.availableOutgoingBitrate,
    });
  }
});
\`\`\`

### qualityLimitationReason — the most useful field

| Value | Meaning | Fix |
|-------|---------|-----|
| \`none\` | No limitation | ✅ All good |
| \`cpu\` | Encoder too slow | Use hardware encoder |
| \`bandwidth\` | Network saturated | Reduce bitrate or fps |

### In the project

\`qualityLimitationReason: 'cpu'\` was detected during early testing with VP8 software encoding. Switching to H.264 hardware (MediaCodec) eliminated it.`,
        vi: `## Debug WebRTC bằng getStats()

\`RTCPeerConnection.getStats()\` trả về bộ số liệu phong phú được cập nhật mỗi giây.

### Các chỉ số quan trọng cần theo dõi

\`\`\`javascript
const stats = await pc.getStats();

stats.forEach(report => {
  if (report.type === 'outbound-rtp' && report.kind === 'video') {
    console.log({
      framesSent:      report.framesSent,
      framesPerSecond: report.framesPerSecond,    // mục tiêu: 60
      bytesSent:       report.bytesSent,
      retransmittedPacketsSent: report.retransmittedPacketsSent,
      qualityLimitationReason:  report.qualityLimitationReason,
      // 'none' | 'cpu' | 'bandwidth' | 'other'
    });
  }

  if (report.type === 'candidate-pair' && report.state === 'succeeded') {
    console.log({
      currentRoundTripTime: report.currentRoundTripTime, // mục tiêu: <0.05s
      availableOutgoingBitrate: report.availableOutgoingBitrate,
    });
  }
});
\`\`\`

### qualityLimitationReason — trường hữu ích nhất

| Giá trị | Ý nghĩa | Cách khắc phục |
|---------|---------|----------------|
| \`none\` | Không bị giới hạn | ✅ Tốt |
| \`cpu\` | Encoder quá chậm | Dùng hardware encoder |
| \`bandwidth\` | Mạng bị bão hòa | Giảm bitrate hoặc fps |

### Trong dự án

\`qualityLimitationReason: 'cpu'\` được phát hiện trong lúc kiểm thử đầu với VP8 software encoding. Chuyển sang H.264 hardware (MediaCodec) đã loại bỏ vấn đề này.`,
      },
      level: "advanced",
      tags: ["getStats", "debugging", "WebRTC", "performance"],
    },
    {
      id: "wrtc-a4",
      question: {
        en: "How does the WebRTC renegotiation flow work when a track changes mid-call?",
        vi: "Luồng renegotiation của WebRTC hoạt động như thế nào khi track thay đổi giữa cuộc gọi?",
      },
      answer: {
        en: `## WebRTC Renegotiation

Renegotiation is needed when the media configuration changes **after** the initial connection — e.g., adding a new track, changing resolution constraints.

### Trigger: onnegotiationneeded

\`\`\`javascript
pc.onnegotiationneeded = async () => {
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  ws.send({ type: 'offer', sdp: offer });
};
\`\`\`

### When does it fire?

- \`addTrack()\` is called
- \`removeTrack()\` is called
- Transceiver direction changes

### Renegotiation vs replaceTrack()

\`\`\`javascript
// No renegotiation needed — same track type, same transceiver
await sender.replaceTrack(newVideoTrack);

// Renegotiation IS needed — new track, new m= section
pc.addTrack(secondVideoTrack, stream);
\`\`\`

### Glare condition (both sides negotiate simultaneously)

Handle with a **rollback** mechanism:

\`\`\`javascript
if (pc.signalingState !== 'stable') {
  await Promise.all([
    pc.setLocalDescription({ type: 'rollback' }),
    pc.setRemoteDescription(offer),
  ]);
}
\`\`\`

### In the project

\`replaceTrack()\` was used to switch between full-screen and windowed capture modes without renegotiation, keeping the stream uninterrupted.`,
        vi: `## Renegotiation trong WebRTC

Renegotiation cần thiết khi cấu hình media thay đổi **sau** kết nối ban đầu — ví dụ: thêm track mới, thay đổi ràng buộc độ phân giải.

### Trigger: onnegotiationneeded

\`\`\`javascript
pc.onnegotiationneeded = async () => {
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  ws.send({ type: 'offer', sdp: offer });
};
\`\`\`

### Khi nào nó kích hoạt?

- \`addTrack()\` được gọi
- \`removeTrack()\` được gọi
- Direction của transceiver thay đổi

### Renegotiation vs replaceTrack()

\`\`\`javascript
// Không cần renegotiation — cùng loại track, cùng transceiver
await sender.replaceTrack(newVideoTrack);

// CẦN renegotiation — track mới, section m= mới
pc.addTrack(secondVideoTrack, stream);
\`\`\`

### Điều kiện Glare (cả hai bên negotiate đồng thời)

Xử lý bằng cơ chế **rollback**:

\`\`\`javascript
if (pc.signalingState !== 'stable') {
  await Promise.all([
    pc.setLocalDescription({ type: 'rollback' }),
    pc.setRemoteDescription(offer),
  ]);
}
\`\`\`

### Trong dự án

\`replaceTrack()\` được dùng để chuyển đổi giữa chế độ full-screen và windowed capture mà không cần renegotiation, giữ cho stream không bị gián đoạn.`,
      },
      level: "advanced",
      tags: ["renegotiation", "WebRTC", "replaceTrack", "signaling"],
    },
    {
      id: "wrtc-a5",
      question: {
        en: "How would you implement end-to-end encryption beyond the mandatory DTLS-SRTP?",
        vi: "Bạn sẽ implement mã hóa end-to-end vượt ra ngoài DTLS-SRTP bắt buộc như thế nào?",
      },
      answer: {
        en: `## E2E Encryption Beyond DTLS-SRTP

DTLS-SRTP encrypts the **transport** — but if a TURN server is used, the server can see decrypted media. For true E2E, use **Insertable Streams** (WebRTC E2E Encryption API).

### Insertable Streams

Transform raw RTP bytes before they're sent or after they're received:

\`\`\`javascript
// Sender: encrypt each video frame
const sender = pc.getSenders()[0];
const streams = sender.createEncodedStreams();

streams.readable
  .pipeThrough(new TransformStream({
    transform(encodedFrame, controller) {
      const view = new DataView(encodedFrame.data);
      // XOR each byte with key (simplified example)
      const encrypted = xorEncrypt(encodedFrame.data, sharedKey);
      encodedFrame.data = encrypted;
      controller.enqueue(encodedFrame);
    }
  }))
  .pipeTo(streams.writable);
\`\`\`

### Key exchange

Use ECDH (Elliptic Curve Diffie-Hellman) over the signaling channel to establish a shared secret without transmitting the key:

\`\`\`javascript
const keyPair = await crypto.subtle.generateKey(
  { name: 'ECDH', namedCurve: 'P-256' },
  false, ['deriveKey']
);
// Exchange public keys via signaling, derive shared AES key
\`\`\`

### In the project

The Wi-Fi Direct + local WebSocket combination was already trusted (no external server), so additional E2E encryption was not implemented. This would be the next step for a public network deployment.`,
        vi: `## Mã hóa E2E Vượt Ra Ngoài DTLS-SRTP

DTLS-SRTP mã hóa **transport** — nhưng nếu dùng TURN server, server có thể thấy media đã giải mã. Để có E2E thực sự, dùng **Insertable Streams** (WebRTC E2E Encryption API).

### Insertable Streams

Transform các byte RTP thô trước khi gửi hoặc sau khi nhận:

\`\`\`javascript
// Sender: mã hóa mỗi video frame
const sender = pc.getSenders()[0];
const streams = sender.createEncodedStreams();

streams.readable
  .pipeThrough(new TransformStream({
    transform(encodedFrame, controller) {
      // XOR mỗi byte với key (ví dụ đơn giản)
      const encrypted = xorEncrypt(encodedFrame.data, sharedKey);
      encodedFrame.data = encrypted;
      controller.enqueue(encodedFrame);
    }
  }))
  .pipeTo(streams.writable);
\`\`\`

### Trao đổi khóa

Dùng ECDH (Elliptic Curve Diffie-Hellman) qua kênh signaling để thiết lập shared secret mà không truyền khóa:

\`\`\`javascript
const keyPair = await crypto.subtle.generateKey(
  { name: 'ECDH', namedCurve: 'P-256' },
  false, ['deriveKey']
);
// Trao đổi public key qua signaling, derive shared AES key
\`\`\`

### Trong dự án

Sự kết hợp Wi-Fi Direct + WebSocket cục bộ đã đáng tin cậy (không có server ngoài), nên không cần mã hóa E2E bổ sung. Đây sẽ là bước tiếp theo khi triển khai trên mạng công cộng.`,
      },
      level: "advanced",
      tags: ["E2E encryption", "Insertable Streams", "ECDH", "security", "WebRTC"],
    },
    {
      id: "wrtc-a6",
      question: {
        en: "What is the RTP/RTCP relationship and how does RTCP affect streaming quality?",
        vi: "Mối quan hệ giữa RTP và RTCP là gì và RTCP ảnh hưởng đến chất lượng streaming như thế nào?",
      },
      answer: {
        en: `## RTP and RTCP

### RTP (Real-time Transport Protocol)

Carries the actual media payload — video frames, audio samples.

\`\`\`
RTP Header: sequence number | timestamp | SSRC | payload type
RTP Payload: compressed video/audio data
\`\`\`

- **Sequence number** — detect out-of-order or missing packets
- **Timestamp** — synchronize audio and video playback
- **SSRC** — identifies the source stream

### RTCP (RTP Control Protocol)

Companion protocol sent on a separate channel (~5% of bandwidth budget). Carries **feedback and quality reports**.

| RTCP Packet | Purpose |
|-------------|---------|
| SR (Sender Report) | Sender's stats: packets sent, bytes sent, NTP timestamp |
| RR (Receiver Report) | Receiver's stats: fraction lost, jitter, RTT |
| REMB | Bandwidth estimate from receiver |
| NACK | Request retransmission of specific packets |
| PLI | Request a new key frame |
| BYE | End of stream |

### How RTCP drives quality

\`\`\`
Receiver → RTCP RR (loss=5%, jitter=20ms) → Sender
Sender reads feedback → GCC reduces bitrate by 20%
Receiver → RTCP REMB (800kbps available) → Sender
Sender caps encoding bitrate at 800kbps
\`\`\`

The feedback loop runs every ~250ms, continuously adapting the stream quality to network conditions.`,
        vi: `## RTP và RTCP

### RTP (Real-time Transport Protocol)

Mang payload media thực tế — video frame, audio sample.

\`\`\`
Header RTP: sequence number | timestamp | SSRC | payload type
Payload RTP: dữ liệu video/audio đã nén
\`\`\`

- **Sequence number** — phát hiện gói đến sai thứ tự hoặc bị mất
- **Timestamp** — đồng bộ phát lại audio và video
- **SSRC** — xác định luồng nguồn

### RTCP (RTP Control Protocol)

Giao thức đồng hành gửi trên kênh riêng (~5% ngân sách băng thông). Mang **feedback và báo cáo chất lượng**.

| Gói RTCP | Mục đích |
|---------|---------|
| SR (Sender Report) | Thống kê sender: gói đã gửi, byte đã gửi, NTP timestamp |
| RR (Receiver Report) | Thống kê receiver: tỷ lệ mất, jitter, RTT |
| REMB | Ước tính băng thông từ receiver |
| NACK | Yêu cầu gửi lại gói cụ thể |
| PLI | Yêu cầu key frame mới |
| BYE | Kết thúc stream |

### Cách RTCP điều khiển chất lượng

\`\`\`
Receiver → RTCP RR (loss=5%, jitter=20ms) → Sender
Sender đọc feedback → GCC giảm bitrate 20%
Receiver → RTCP REMB (còn 800kbps) → Sender
Sender giới hạn bitrate encoding ở 800kbps
\`\`\`

Vòng feedback chạy mỗi ~250ms, liên tục thích ứng chất lượng stream với điều kiện mạng.`,
      },
      level: "advanced",
      tags: ["RTP", "RTCP", "WebRTC", "quality", "networking"],
    },
  ],
};
