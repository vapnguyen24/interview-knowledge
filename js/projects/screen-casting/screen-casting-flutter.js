export const screenCastingFlutter = {
  id: "screen-casting-flutter",
  title: "Flutter & Native",
  tech: ["Flutter", "Dart", "Android", "MediaProjection", "Platform Channel"],
  qas: [
    // ── BASIC ──────────────────────────────────────────────────────────────
    {
      id: "fl-b1",
      question: {
        en: "What is a Platform Channel in Flutter and when do you need one?",
        vi: "Platform Channel trong Flutter là gì và khi nào bạn cần dùng nó?",
      },
      answer: {
        en: `## Platform Channel

A Platform Channel is Flutter's mechanism for calling **native platform code** (Android/iOS/Windows) from Dart, and vice versa.

### When you need it

- Access APIs not exposed by Flutter plugins (e.g., MediaProjection, Wi-Fi Direct)
- Performance-critical native work (video encoding, GPU operations)
- Hardware-specific features (sensors, NFC, custom codecs)

### Three channel types

| Channel | Use case |
|---------|----------|
| \`MethodChannel\` | One-shot call → one response |
| \`EventChannel\` | Continuous stream of events from native to Dart |
| \`BasicMessageChannel\` | Bidirectional messages (custom codec) |

### In the project

\`MethodChannel\` was used to start/stop screen capture.
\`EventChannel\` streamed encoded video frame metadata from native to Dart.

\`\`\`dart
// Dart side
const channel = MethodChannel('com.app/screen_cast');

Future<void> startCapture() async {
  await channel.invokeMethod('startCapture', {'fps': 60});
}
\`\`\``,
        vi: `## Platform Channel

Platform Channel là cơ chế của Flutter để gọi **code native** (Android/iOS/Windows) từ Dart, và ngược lại.

### Khi nào bạn cần

- Truy cập API không được Flutter plugin expose (ví dụ: MediaProjection, Wi-Fi Direct)
- Công việc native tốn nhiều hiệu năng (mã hóa video, thao tác GPU)
- Tính năng phần cứng cụ thể (cảm biến, NFC, codec tùy chỉnh)

### Ba loại channel

| Channel | Use case |
|---------|----------|
| \`MethodChannel\` | Gọi một lần → một phản hồi |
| \`EventChannel\` | Luồng sự kiện liên tục từ native đến Dart |
| \`BasicMessageChannel\` | Tin nhắn hai chiều (codec tùy chỉnh) |

### Trong dự án

\`MethodChannel\` được dùng để bắt đầu/dừng screen capture.
\`EventChannel\` stream metadata video frame đã encode từ native đến Dart.

\`\`\`dart
// Phía Dart
const channel = MethodChannel('com.app/screen_cast');

Future<void> startCapture() async {
  await channel.invokeMethod('startCapture', {'fps': 60});
}
\`\`\``,
      },
      level: "basic",
      tags: ["Flutter", "Platform Channel", "native", "Dart"],
    },
    {
      id: "fl-b2",
      question: {
        en: "What is the Android MediaProjection API?",
        vi: "Android MediaProjection API là gì?",
      },
      answer: {
        en: `## MediaProjection API

\`MediaProjection\` is an Android API (introduced in API 21) that lets an app **capture the entire screen** content as a virtual display.

### How it works

\`\`\`
User grants permission (system dialog)
        ↓
MediaProjectionManager.createScreenCaptureIntent()
        ↓
MediaProjection (token)
        ↓
VirtualDisplay (renders screen into a Surface)
        ↓
ImageReader / MediaRecorder / MediaCodec reads frames
\`\`\`

### Key classes

| Class | Role |
|-------|------|
| \`MediaProjectionManager\` | Requests permission and creates the projection |
| \`MediaProjection\` | The capture session token |
| \`VirtualDisplay\` | A virtual screen surface that mirrors the real display |
| \`ImageReader\` | Reads raw frames from the virtual display |
| \`MediaCodec\` | Encodes frames to H.264 |

### Permission dialog

Android requires a system prompt before screen capture — it cannot be bypassed. The user must tap "Start Now" each session.`,
        vi: `## MediaProjection API

\`MediaProjection\` là API Android (ra mắt từ API 21) cho phép ứng dụng **capture toàn bộ màn hình** dưới dạng màn hình ảo.

### Cách hoạt động

\`\`\`
Người dùng cấp quyền (hộp thoại hệ thống)
        ↓
MediaProjectionManager.createScreenCaptureIntent()
        ↓
MediaProjection (token)
        ↓
VirtualDisplay (render màn hình vào một Surface)
        ↓
ImageReader / MediaRecorder / MediaCodec đọc frame
\`\`\`

### Các class chính

| Class | Vai trò |
|-------|---------|
| \`MediaProjectionManager\` | Yêu cầu quyền và tạo projection |
| \`MediaProjection\` | Token phiên capture |
| \`VirtualDisplay\` | Màn hình ảo phản chiếu màn hình thật |
| \`ImageReader\` | Đọc frame thô từ màn hình ảo |
| \`MediaCodec\` | Encode frame sang H.264 |

### Hộp thoại quyền

Android yêu cầu xác nhận hệ thống trước khi capture màn hình — không thể bỏ qua. Người dùng phải nhấn "Start Now" mỗi phiên.`,
      },
      level: "basic",
      tags: ["MediaProjection", "Android", "screen capture"],
    },
    {
      id: "fl-b3",
      question: {
        en: "What is the difference between MethodChannel and EventChannel?",
        vi: "Sự khác biệt giữa MethodChannel và EventChannel là gì?",
      },
      answer: {
        en: `## MethodChannel vs EventChannel

### MethodChannel — request / response

Used for **one-shot operations**. Dart calls a method, native executes it, returns a result.

\`\`\`dart
// Dart
final result = await channel.invokeMethod('getDeviceId');

// Kotlin
channel.setMethodCallHandler { call, result ->
  when (call.method) {
    "getDeviceId" -> result.success(Settings.Secure.ANDROID_ID)
    else -> result.notImplemented()
  }
}
\`\`\`

### EventChannel — continuous stream

Used when native **pushes data continuously** to Dart (e.g., sensor readings, captured frames).

\`\`\`dart
// Dart
Stream<dynamic> get frameStream =>
    const EventChannel('com.app/frames').receiveBroadcastStream();

// Kotlin
channel.setStreamHandler(object : EventChannel.StreamHandler {
  override fun onListen(args: Any?, events: EventSink) {
    // call events.success(data) whenever a new frame arrives
  }
  override fun onCancel(args: Any?) { /* cleanup */ }
})
\`\`\`

### In the project

- \`MethodChannel\`: start capture, stop capture, request Wi-Fi Direct connection
- \`EventChannel\`: stream encoded frame timestamps and stats to Dart UI`,
        vi: `## MethodChannel vs EventChannel

### MethodChannel — request / response

Dùng cho **thao tác một lần**. Dart gọi một method, native thực thi, trả về kết quả.

\`\`\`dart
// Dart
final result = await channel.invokeMethod('getDeviceId');

// Kotlin
channel.setMethodCallHandler { call, result ->
  when (call.method) {
    "getDeviceId" -> result.success(Settings.Secure.ANDROID_ID)
    else -> result.notImplemented()
  }
}
\`\`\`

### EventChannel — luồng liên tục

Dùng khi native **đẩy dữ liệu liên tục** đến Dart (ví dụ: đọc cảm biến, frame được capture).

\`\`\`dart
// Dart
Stream<dynamic> get frameStream =>
    const EventChannel('com.app/frames').receiveBroadcastStream();

// Kotlin
channel.setStreamHandler(object : EventChannel.StreamHandler {
  override fun onListen(args: Any?, events: EventSink) {
    // gọi events.success(data) mỗi khi có frame mới
  }
  override fun onCancel(args: Any?) { /* dọn dẹp */ }
})
\`\`\`

### Trong dự án

- \`MethodChannel\`: bắt đầu capture, dừng capture, yêu cầu kết nối Wi-Fi Direct
- \`EventChannel\`: stream timestamp frame đã encode và thống kê đến Dart UI`,
      },
      level: "basic",
      tags: ["MethodChannel", "EventChannel", "Flutter", "native"],
    },
    {
      id: "fl-b4",
      question: {
        en: "What is MediaCodec in Android and why is it used for encoding?",
        vi: "MediaCodec trong Android là gì và tại sao dùng nó để encoding?",
      },
      answer: {
        en: `## Android MediaCodec

\`MediaCodec\` is Android's low-level codec API providing access to **hardware-accelerated encoders and decoders**.

### Why use MediaCodec for screen casting

| Approach | CPU usage | Latency |
|----------|-----------|---------|
| Software encoder (libvpx, x264) | High | Medium |
| **MediaCodec (hardware H.264)** | **Low** | **Low** |

### Basic encoding pipeline

\`\`\`kotlin
val codec = MediaCodec.createEncoderByType(MediaFormat.MIMETYPE_VIDEO_AVC)

val format = MediaFormat.createVideoFormat(
    MediaFormat.MIMETYPE_VIDEO_AVC, width, height
).apply {
    setInteger(MediaFormat.KEY_BIT_RATE, 4_000_000)     // 4 Mbps
    setInteger(MediaFormat.KEY_FRAME_RATE, 60)
    setInteger(MediaFormat.KEY_I_FRAME_INTERVAL, 1)     // keyframe every 1s
    setInteger(MediaFormat.KEY_COLOR_FORMAT,
        MediaCodecInfo.CodecCapabilities.COLOR_FormatSurface)
}

codec.configure(format, null, null, MediaCodec.CONFIGURE_FLAG_ENCODE)
val inputSurface = codec.createInputSurface()
codec.start()
\`\`\`

### Surface input mode

By using a \`Surface\` as input (not raw buffers), the VirtualDisplay renders directly into the encoder — **zero-copy**, no CPU involvement in the video data path.`,
        vi: `## Android MediaCodec

\`MediaCodec\` là API codec cấp thấp của Android cung cấp quyền truy cập vào **encoder và decoder tăng tốc phần cứng**.

### Tại sao dùng MediaCodec cho screen casting

| Cách tiếp cận | CPU | Độ trễ |
|--------------|-----|--------|
| Software encoder (libvpx, x264) | Cao | Trung bình |
| **MediaCodec (hardware H.264)** | **Thấp** | **Thấp** |

### Pipeline encoding cơ bản

\`\`\`kotlin
val codec = MediaCodec.createEncoderByType(MediaFormat.MIMETYPE_VIDEO_AVC)

val format = MediaFormat.createVideoFormat(
    MediaFormat.MIMETYPE_VIDEO_AVC, width, height
).apply {
    setInteger(MediaFormat.KEY_BIT_RATE, 4_000_000)     // 4 Mbps
    setInteger(MediaFormat.KEY_FRAME_RATE, 60)
    setInteger(MediaFormat.KEY_I_FRAME_INTERVAL, 1)     // keyframe mỗi 1 giây
    setInteger(MediaFormat.KEY_COLOR_FORMAT,
        MediaCodecInfo.CodecCapabilities.COLOR_FormatSurface)
}

codec.configure(format, null, null, MediaCodec.CONFIGURE_FLAG_ENCODE)
val inputSurface = codec.createInputSurface()
codec.start()
\`\`\`

### Chế độ Surface input

Bằng cách dùng \`Surface\` làm input (không phải raw buffer), VirtualDisplay render trực tiếp vào encoder — **zero-copy**, không có CPU tham gia vào đường dữ liệu video.`,
      },
      level: "basic",
      tags: ["MediaCodec", "Android", "H.264", "encoding", "hardware"],
    },
    {
      id: "fl-b5",
      question: {
        en: "What is a Foreground Service in Android and why is it required for screen casting?",
        vi: "Foreground Service trong Android là gì và tại sao cần thiết cho screen casting?",
      },
      answer: {
        en: `## Android Foreground Service

A **Foreground Service** is a service that performs operations visible to the user and cannot be killed by the system under memory pressure.

### Why screen casting requires it

Android (API 29+) mandates that \`MediaProjection\` screen capture runs in a **Foreground Service with \`mediaProjection\` type**. Without it, the capture is terminated when the app goes to the background.

### Declaration in AndroidManifest.xml

\`\`\`xml
<service
  android:name=".ScreenCastService"
  android:foregroundServiceType="mediaProjection"
  android:exported="false" />
\`\`\`

### Starting the service from Flutter

\`\`\`kotlin
// Kotlin — called from MethodChannel handler
val intent = Intent(context, ScreenCastService::class.java).apply {
    putExtra("projection_data", projectionData)
}
ContextCompat.startForegroundService(context, intent)
\`\`\`

### Persistent notification

The service must show a notification while active:

\`\`\`kotlin
startForeground(NOTIFICATION_ID, buildNotification("Screen casting active"))
\`\`\`

This notification cannot be dismissed while casting is running.`,
        vi: `## Android Foreground Service

**Foreground Service** là service thực hiện các thao tác hiển thị với người dùng và không thể bị hệ thống kill khi thiếu bộ nhớ.

### Tại sao screen casting cần nó

Android (API 29+) bắt buộc \`MediaProjection\` screen capture chạy trong **Foreground Service với type \`mediaProjection\`**. Không có nó, capture bị dừng khi ứng dụng vào background.

### Khai báo trong AndroidManifest.xml

\`\`\`xml
<service
  android:name=".ScreenCastService"
  android:foregroundServiceType="mediaProjection"
  android:exported="false" />
\`\`\`

### Khởi động service từ Flutter

\`\`\`kotlin
// Kotlin — gọi từ MethodChannel handler
val intent = Intent(context, ScreenCastService::class.java).apply {
    putExtra("projection_data", projectionData)
}
ContextCompat.startForegroundService(context, intent)
\`\`\`

### Thông báo liên tục

Service phải hiển thị thông báo khi đang hoạt động:

\`\`\`kotlin
startForeground(NOTIFICATION_ID, buildNotification("Đang cast màn hình"))
\`\`\`

Thông báo này không thể bị đóng trong khi đang cast.`,
      },
      level: "basic",
      tags: ["Foreground Service", "Android", "MediaProjection", "background"],
    },
    {
      id: "fl-b6",
      question: {
        en: "What is audio streaming and how does Android capture system audio?",
        vi: "Audio streaming là gì và Android capture âm thanh hệ thống như thế nào?",
      },
      answer: {
        en: `## Audio Streaming & System Audio Capture

### What is audio streaming

Audio streaming is the continuous transmission of encoded audio samples over a network in real time. In screen casting, audio should be captured from the **device speaker output** (not the microphone) so the viewer hears what the screen is playing.

### Android system audio capture

Android 10 (API 29) introduced **\`AudioPlaybackCapture\`** — allows apps to capture audio played by other apps.

\`\`\`kotlin
val config = AudioPlaybackCaptureConfiguration.Builder(mediaProjection)
    .addMatchingUsage(AudioAttributes.USAGE_MEDIA)
    .addMatchingUsage(AudioAttributes.USAGE_GAME)
    .build()

val audioRecord = AudioRecord.Builder()
    .setAudioPlaybackCaptureConfig(config)
    .setAudioFormat(
        AudioFormat.Builder()
            .setEncoding(AudioFormat.ENCODING_PCM_16BIT)
            .setSampleRate(44100)
            .setChannelMask(AudioFormat.CHANNEL_IN_STEREO)
            .build()
    )
    .build()
\`\`\`

### Limitation

Apps can only capture audio from apps that **allow playback capture** (\`allowAudioPlaybackCapture = true\`). System sounds and some protected apps cannot be captured.`,
        vi: `## Audio Streaming & Capture Âm Thanh Hệ Thống

### Audio streaming là gì

Audio streaming là việc truyền liên tục các audio sample đã encode qua mạng theo thời gian thực. Trong screen casting, audio nên được capture từ **đầu ra loa thiết bị** (không phải microphone) để người xem nghe được âm thanh từ màn hình.

### Android capture âm thanh hệ thống

Android 10 (API 29) giới thiệu **\`AudioPlaybackCapture\`** — cho phép app capture âm thanh được phát bởi các app khác.

\`\`\`kotlin
val config = AudioPlaybackCaptureConfiguration.Builder(mediaProjection)
    .addMatchingUsage(AudioAttributes.USAGE_MEDIA)
    .addMatchingUsage(AudioAttributes.USAGE_GAME)
    .build()

val audioRecord = AudioRecord.Builder()
    .setAudioPlaybackCaptureConfig(config)
    .setAudioFormat(
        AudioFormat.Builder()
            .setEncoding(AudioFormat.ENCODING_PCM_16BIT)
            .setSampleRate(44100)
            .setChannelMask(AudioFormat.CHANNEL_IN_STEREO)
            .build()
    )
    .build()
\`\`\`

### Hạn chế

App chỉ có thể capture âm thanh từ các app **cho phép playback capture** (\`allowAudioPlaybackCapture = true\`). Âm thanh hệ thống và một số app được bảo vệ không thể capture.`,
      },
      level: "basic",
      tags: ["audio", "AudioPlaybackCapture", "Android", "streaming"],
    },
    {
      id: "fl-b7",
      question: {
        en: "What is state management in Flutter and what options are available?",
        vi: "State management trong Flutter là gì và có những lựa chọn nào?",
      },
      answer: {
        en: `## State Management in Flutter

State management controls how UI reacts to data changes in a Flutter app.

### Types of state

- **Ephemeral (local)** — UI state within one widget (\`setState\`)
- **App state (shared)** — data needed across many widgets

### Common solutions

| Solution | Best for |
|----------|----------|
| \`setState\` | Simple, single-widget state |
| \`InheritedWidget / Provider\` | Medium apps, dependency injection |
| \`Riverpod\` | Testable, compile-safe state |
| \`BLoC / Cubit\` | Complex event-driven flows |
| \`GetX\` | Minimal boilerplate, reactive |

### In the screen casting project

**BLoC (Business Logic Component)** was used:

\`\`\`dart
// States
abstract class CastState {}
class CastIdle extends CastState {}
class CastConnecting extends CastState {}
class CastStreaming extends CastState { final int fps; }
class CastError extends CastState { final String message; }

// Events drive state transitions
castBloc.add(StartCastEvent());
castBloc.add(StopCastEvent());
\`\`\`

BLoC separated business logic (connection, encoding) from UI, making it easy to test each transition.`,
        vi: `## State Management trong Flutter

State management kiểm soát cách UI phản ứng với các thay đổi dữ liệu trong ứng dụng Flutter.

### Các loại state

- **Ephemeral (cục bộ)** — trạng thái UI trong một widget (\`setState\`)
- **App state (chia sẻ)** — dữ liệu cần thiết cho nhiều widget

### Các giải pháp phổ biến

| Giải pháp | Phù hợp nhất |
|-----------|-------------|
| \`setState\` | State đơn giản, một widget |
| \`InheritedWidget / Provider\` | App tầm trung, dependency injection |
| \`Riverpod\` | State testable, an toàn compile-time |
| \`BLoC / Cubit\` | Luồng event phức tạp |
| \`GetX\` | Boilerplate tối thiểu, reactive |

### Trong dự án screen casting

**BLoC (Business Logic Component)** được sử dụng:

\`\`\`dart
// Các state
abstract class CastState {}
class CastIdle extends CastState {}
class CastConnecting extends CastState {}
class CastStreaming extends CastState { final int fps; }
class CastError extends CastState { final String message; }

// Event điều khiển chuyển đổi state
castBloc.add(StartCastEvent());
castBloc.add(StopCastEvent());
\`\`\`

BLoC tách biệt business logic (kết nối, encoding) khỏi UI, giúp dễ test từng chuyển đổi.`,
      },
      level: "basic",
      tags: ["state management", "Flutter", "BLoC", "Provider"],
    },

    // ── INTERMEDIATE ───────────────────────────────────────────────────────
    {
      id: "fl-i1",
      question: {
        en: "How do you implement the full screen capture pipeline from MediaProjection to WebRTC?",
        vi: "Làm thế nào để implement toàn bộ pipeline screen capture từ MediaProjection đến WebRTC?",
      },
      answer: {
        en: `## Screen Capture → WebRTC Pipeline

\`\`\`
MediaProjection
    ↓
VirtualDisplay (Surface input to MediaCodec)
    ↓
MediaCodec (H.264 hardware encoder)
    ↓
Encoded NAL units (H.264 byte stream)
    ↓
WebRTC custom video source (via native WebRTC library)
    ↓
RTP packetization & transmission
\`\`\`

### Key implementation steps

**1. Create VirtualDisplay feeding MediaCodec surface**

\`\`\`kotlin
val encoderSurface = mediaCodec.createInputSurface()

virtualDisplay = mediaProjection.createVirtualDisplay(
    "ScreenCast",
    screenWidth, screenHeight, screenDpi,
    DisplayManager.VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR,
    encoderSurface,  // frames go directly into encoder
    null, null
)
\`\`\`

**2. Read encoded output and inject into WebRTC**

\`\`\`kotlin
val bufferInfo = MediaCodec.BufferInfo()
while (isRunning) {
    val outputIndex = mediaCodec.dequeueOutputBuffer(bufferInfo, 10_000)
    if (outputIndex >= 0) {
        val encodedData = mediaCodec.getOutputBuffer(outputIndex)!!
        val isKeyFrame = bufferInfo.flags and
            MediaCodec.BUFFER_FLAG_KEY_FRAME != 0
        // Inject into WebRTC native video encoder interface
        webRtcSink.onEncodedFrame(encodedData, bufferInfo, isKeyFrame)
        mediaCodec.releaseOutputBuffer(outputIndex, false)
    }
}
\`\`\`

### Zero-copy benefit

VirtualDisplay → Surface → MediaCodec never touches the CPU for pixel data. Only the encoded output (a few KB per frame) crosses the JNI boundary.`,
        vi: `## Pipeline Screen Capture → WebRTC

\`\`\`
MediaProjection
    ↓
VirtualDisplay (Surface input cho MediaCodec)
    ↓
MediaCodec (H.264 hardware encoder)
    ↓
Các NAL unit đã encode (byte stream H.264)
    ↓
WebRTC custom video source (qua thư viện WebRTC native)
    ↓
RTP packetization & truyền dữ liệu
\`\`\`

### Các bước implement chính

**1. Tạo VirtualDisplay cấp dữ liệu vào surface của MediaCodec**

\`\`\`kotlin
val encoderSurface = mediaCodec.createInputSurface()

virtualDisplay = mediaProjection.createVirtualDisplay(
    "ScreenCast",
    screenWidth, screenHeight, screenDpi,
    DisplayManager.VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR,
    encoderSurface,  // frame đi thẳng vào encoder
    null, null
)
\`\`\`

**2. Đọc output đã encode và đưa vào WebRTC**

\`\`\`kotlin
val bufferInfo = MediaCodec.BufferInfo()
while (isRunning) {
    val outputIndex = mediaCodec.dequeueOutputBuffer(bufferInfo, 10_000)
    if (outputIndex >= 0) {
        val encodedData = mediaCodec.getOutputBuffer(outputIndex)!!
        val isKeyFrame = bufferInfo.flags and
            MediaCodec.BUFFER_FLAG_KEY_FRAME != 0
        // Đưa vào interface video encoder native của WebRTC
        webRtcSink.onEncodedFrame(encodedData, bufferInfo, isKeyFrame)
        mediaCodec.releaseOutputBuffer(outputIndex, false)
    }
}
\`\`\`

### Lợi ích zero-copy

VirtualDisplay → Surface → MediaCodec không bao giờ đụng CPU cho dữ liệu pixel. Chỉ output đã encode (vài KB mỗi frame) mới vượt qua ranh giới JNI.`,
      },
      level: "intermediate",
      tags: ["MediaProjection", "MediaCodec", "WebRTC", "pipeline", "Android"],
    },
    {
      id: "fl-i2",
      question: {
        en: "How do you pass video frame data efficiently across the Flutter Platform Channel?",
        vi: "Làm thế nào để truyền dữ liệu video frame hiệu quả qua Flutter Platform Channel?",
      },
      answer: {
        en: `## Efficient Data Transfer Across Platform Channel

The Platform Channel serializes data through a **message codec** — by default \`StandardMessageCodec\` which uses reflection and boxing. This is **too slow for raw frame data**.

### Wrong approach — sending raw frames through the channel

\`\`\`dart
// BAD: 1080p frame = 6MB, serialized 60×/s = 360MB/s through JNI
final bytes = await channel.invokeMethod('getFrame'); // ❌
\`\`\`

### Correct approach — share memory, pass metadata only

\`\`\`
Native encodes frame → writes H.264 NAL units to shared memory
Native sends metadata (offset, size, timestamp) via EventChannel
Dart reads metadata → native WebRTC library reads from shared memory
\`\`\`

### Or better: keep video entirely in native

The cleanest architecture for real-time video:

\`\`\`
Flutter UI ── (start/stop/status only) ──► MethodChannel
                                              ↓
                                     Native Service
                                     (MediaCodec + WebRTC)
                                     runs independently
\`\`\`

Flutter only controls the lifecycle — the actual video pipeline runs in native threads with no Dart involvement, eliminating JNI overhead entirely.`,
        vi: `## Truyền Dữ Liệu Video Frame Hiệu Quả Qua Platform Channel

Platform Channel serialize dữ liệu qua **message codec** — mặc định là \`StandardMessageCodec\` dùng reflection và boxing. Điều này **quá chậm cho raw frame data**.

### Cách tiếp cận sai — gửi raw frame qua channel

\`\`\`dart
// SAI: frame 1080p = 6MB, serialize 60×/s = 360MB/s qua JNI
final bytes = await channel.invokeMethod('getFrame'); // ❌
\`\`\`

### Cách tiếp cận đúng — chia sẻ memory, chỉ truyền metadata

\`\`\`
Native encode frame → ghi H.264 NAL unit vào shared memory
Native gửi metadata (offset, size, timestamp) qua EventChannel
Dart đọc metadata → thư viện WebRTC native đọc từ shared memory
\`\`\`

### Hoặc tốt hơn: giữ video hoàn toàn trong native

Kiến trúc sạch nhất cho video thời gian thực:

\`\`\`
Flutter UI ── (chỉ start/stop/status) ──► MethodChannel
                                              ↓
                                     Native Service
                                     (MediaCodec + WebRTC)
                                     chạy độc lập
\`\`\`

Flutter chỉ kiểm soát vòng đời — pipeline video thực tế chạy trong native thread không có Dart tham gia, loại bỏ hoàn toàn overhead JNI.`,
      },
      level: "intermediate",
      tags: ["Platform Channel", "performance", "JNI", "Flutter", "video"],
    },
    {
      id: "fl-i3",
      question: {
        en: "How did you implement audio-video synchronization in the streaming pipeline?",
        vi: "Bạn đã implement đồng bộ hóa audio-video trong pipeline streaming như thế nào?",
      },
      answer: {
        en: `## Audio-Video Synchronization

A/V sync ensures audio and video arrive at the receiver with matching timestamps — no lip-sync drift.

### Root cause of drift

Audio and video come from **separate capture pipelines** with independent clocks. Without alignment, they drift over time.

### RTP timestamp alignment

Both audio and video RTP packets carry timestamps referenced to the same NTP clock (via RTCP Sender Reports).

\`\`\`kotlin
// Video: timestamp in 90kHz clock units
val videoTs = bufferInfo.presentationTimeUs * 90 / 1_000

// Audio: timestamp in sample-rate units (e.g., 44100Hz)
val audioTs = audioFrameIndex * 44100 / frameRate
\`\`\`

### Synchronization via RTCP SR (Sender Report)

\`\`\`
RTCP SR contains:
  - NTP timestamp (wall clock)
  - RTP timestamp (media clock)
\`\`\`

The receiver uses SR pairs from audio and video to compute the offset and align playback.

### In the project

WebRTC's built-in **jitter buffer** and **sync module** handled A/V sync automatically once both tracks shared the same \`RTCPeerConnection\` and used accurate \`presentationTimeUs\` from \`MediaCodec.BufferInfo\`.`,
        vi: `## Đồng bộ Hóa Audio-Video

A/V sync đảm bảo audio và video đến receiver với timestamp phù hợp — không bị lệch lip-sync.

### Nguyên nhân gốc rễ của drift

Audio và video đến từ **các pipeline capture riêng biệt** với đồng hồ độc lập. Nếu không căn chỉnh, chúng sẽ drift theo thời gian.

### Căn chỉnh timestamp RTP

Cả audio và video RTP packet đều mang timestamp tham chiếu đến cùng một NTP clock (qua RTCP Sender Report).

\`\`\`kotlin
// Video: timestamp theo đơn vị clock 90kHz
val videoTs = bufferInfo.presentationTimeUs * 90 / 1_000

// Audio: timestamp theo đơn vị sample rate (ví dụ: 44100Hz)
val audioTs = audioFrameIndex * 44100 / frameRate
\`\`\`

### Đồng bộ qua RTCP SR (Sender Report)

\`\`\`
RTCP SR chứa:
  - NTP timestamp (đồng hồ tường)
  - RTP timestamp (đồng hồ media)
\`\`\`

Receiver dùng cặp SR từ audio và video để tính offset và căn chỉnh phát lại.

### Trong dự án

**Jitter buffer** và **sync module** tích hợp sẵn của WebRTC xử lý A/V sync tự động khi cả hai track dùng cùng một \`RTCPeerConnection\` và dùng \`presentationTimeUs\` chính xác từ \`MediaCodec.BufferInfo\`.`,
      },
      level: "intermediate",
      tags: ["A/V sync", "audio", "video", "RTP", "MediaCodec"],
    },
    {
      id: "fl-i4",
      question: {
        en: "How do you handle the MediaProjection permission flow in Flutter?",
        vi: "Làm thế nào để xử lý luồng cấp quyền MediaProjection trong Flutter?",
      },
      answer: {
        en: `## MediaProjection Permission Flow

Android requires a user-visible dialog before granting screen capture permission. This dialog can only be triggered by starting an Activity with a specific Intent.

### Complete flow

\`\`\`
Flutter UI taps "Start Cast"
       ↓
MethodChannel → Kotlin startCaptureRequest()
       ↓
MediaProjectionManager.createScreenCaptureIntent()
       ↓
startActivityForResult(intent, REQUEST_CODE)
       ↓
User taps "Start Now" in system dialog
       ↓
onActivityResult(REQUEST_CODE, RESULT_OK, data)
       ↓
mediaProjectionManager.getMediaProjection(resultCode, data)
       ↓
MethodChannel result.success() → Flutter receives token
       ↓
Flutter triggers startStreaming()
\`\`\`

### Kotlin implementation

\`\`\`kotlin
fun requestScreenCapture(result: MethodChannel.Result) {
    pendingResult = result
    val intent = projectionManager.createScreenCaptureIntent()
    activity.startActivityForResult(intent, REQ_CODE)
}

override fun onActivityResult(req: Int, res: Int, data: Intent?) {
    if (req == REQ_CODE && res == Activity.RESULT_OK) {
        val projection = projectionManager.getMediaProjection(res, data!!)
        startService(projection)
        pendingResult?.success("granted")
    } else {
        pendingResult?.error("DENIED", "User denied", null)
    }
}
\`\`\``,
        vi: `## Luồng Cấp Quyền MediaProjection

Android yêu cầu hộp thoại hiển thị với người dùng trước khi cấp quyền screen capture. Hộp thoại này chỉ có thể được kích hoạt bằng cách khởi động Activity với Intent cụ thể.

### Luồng hoàn chỉnh

\`\`\`
Flutter UI nhấn "Start Cast"
       ↓
MethodChannel → Kotlin startCaptureRequest()
       ↓
MediaProjectionManager.createScreenCaptureIntent()
       ↓
startActivityForResult(intent, REQUEST_CODE)
       ↓
Người dùng nhấn "Start Now" trong hộp thoại hệ thống
       ↓
onActivityResult(REQUEST_CODE, RESULT_OK, data)
       ↓
mediaProjectionManager.getMediaProjection(resultCode, data)
       ↓
MethodChannel result.success() → Flutter nhận token
       ↓
Flutter kích hoạt startStreaming()
\`\`\`

### Implement Kotlin

\`\`\`kotlin
fun requestScreenCapture(result: MethodChannel.Result) {
    pendingResult = result
    val intent = projectionManager.createScreenCaptureIntent()
    activity.startActivityForResult(intent, REQ_CODE)
}

override fun onActivityResult(req: Int, res: Int, data: Intent?) {
    if (req == REQ_CODE && res == Activity.RESULT_OK) {
        val projection = projectionManager.getMediaProjection(res, data!!)
        startService(projection)
        pendingResult?.success("granted")
    } else {
        pendingResult?.error("DENIED", "Người dùng từ chối", null)
    }
}
\`\`\``,
      },
      level: "intermediate",
      tags: ["MediaProjection", "permission", "Flutter", "Android", "Activity"],
    },
    {
      id: "fl-i5",
      question: {
        en: "How do you manage the streaming lifecycle with BLoC in Flutter?",
        vi: "Làm thế nào để quản lý vòng đời streaming bằng BLoC trong Flutter?",
      },
      answer: {
        en: `## Streaming Lifecycle with BLoC

### State machine

\`\`\`
Idle ──► Requesting Permission ──► Connecting ──► Streaming
  ▲                                                    │
  └─────────────────── Stopping ◄─────────────────────┘
           │
        Error (any state can transition here)
\`\`\`

### Events and States

\`\`\`dart
// Events
class RequestCastEvent extends CastEvent {}
class PermissionGrantedEvent extends CastEvent {}
class PermissionDeniedEvent extends CastEvent {}
class ConnectionEstablishedEvent extends CastEvent {}
class StopCastEvent extends CastEvent {}
class CastErrorEvent extends CastEvent {
  final String message;
}

// States
class CastIdle extends CastState {}
class CastRequestingPermission extends CastState {}
class CastConnecting extends CastState {}
class CastStreaming extends CastState {
  final int fps;
  final int bitrateKbps;
}
class CastError extends CastState { final String message; }
\`\`\`

### BLoC transition handler

\`\`\`dart
on<RequestCastEvent>((event, emit) async {
  emit(CastRequestingPermission());
  try {
    await nativeChannel.invokeMethod('requestPermission');
    emit(CastConnecting());
    await signaling.connect();
    emit(CastStreaming(fps: 60, bitrateKbps: 4000));
  } catch (e) {
    emit(CastError(message: e.toString()));
  }
});
\`\`\``,
        vi: `## Vòng Đời Streaming với BLoC

### State machine

\`\`\`
Idle ──► Yêu cầu quyền ──► Đang kết nối ──► Đang stream
  ▲                                               │
  └────────────── Đang dừng ◄────────────────────┘
           │
        Lỗi (bất kỳ state nào cũng có thể chuyển sang đây)
\`\`\`

### Events và States

\`\`\`dart
// Events
class RequestCastEvent extends CastEvent {}
class PermissionGrantedEvent extends CastEvent {}
class PermissionDeniedEvent extends CastEvent {}
class ConnectionEstablishedEvent extends CastEvent {}
class StopCastEvent extends CastEvent {}
class CastErrorEvent extends CastEvent {
  final String message;
}

// States
class CastIdle extends CastState {}
class CastRequestingPermission extends CastState {}
class CastConnecting extends CastState {}
class CastStreaming extends CastState {
  final int fps;
  final int bitrateKbps;
}
class CastError extends CastState { final String message; }
\`\`\`

### Handler chuyển đổi BLoC

\`\`\`dart
on<RequestCastEvent>((event, emit) async {
  emit(CastRequestingPermission());
  try {
    await nativeChannel.invokeMethod('requestPermission');
    emit(CastConnecting());
    await signaling.connect();
    emit(CastStreaming(fps: 60, bitrateKbps: 4000));
  } catch (e) {
    emit(CastError(message: e.toString()));
  }
});
\`\`\``,
      },
      level: "intermediate",
      tags: ["BLoC", "Flutter", "state machine", "lifecycle"],
    },
    {
      id: "fl-i6",
      question: {
        en: "How do you handle Flutter app lifecycle events during screen casting?",
        vi: "Làm thế nào để xử lý các sự kiện lifecycle của Flutter app trong quá trình screen casting?",
      },
      answer: {
        en: `## Flutter App Lifecycle During Casting

Flutter apps have four lifecycle states: \`resumed\`, \`inactive\`, \`paused\`, \`detached\`.

### Problem

When the user switches apps, Flutter goes to \`paused\`. Without a Foreground Service, the native screen capture stops.

### Solution: decouple casting from Flutter lifecycle

\`\`\`dart
class _CastPageState extends State<CastPage>
    with WidgetsBindingObserver {

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    switch (state) {
      case AppLifecycleState.paused:
        // Casting continues in Foreground Service — just update UI
        context.read<CastBloc>().add(AppBackgroundedEvent());
        break;
      case AppLifecycleState.resumed:
        // Re-sync stats from native
        context.read<CastBloc>().add(AppResumedEvent());
        break;
      default:
        break;
    }
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }
}
\`\`\`

The Foreground Service keeps capture alive; Flutter UI just observes and updates.`,
        vi: `## Flutter App Lifecycle Trong Quá Trình Casting

Flutter app có bốn trạng thái lifecycle: \`resumed\`, \`inactive\`, \`paused\`, \`detached\`.

### Vấn đề

Khi người dùng chuyển app, Flutter chuyển sang \`paused\`. Không có Foreground Service, native screen capture sẽ dừng.

### Giải pháp: tách casting khỏi lifecycle Flutter

\`\`\`dart
class _CastPageState extends State<CastPage>
    with WidgetsBindingObserver {

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    switch (state) {
      case AppLifecycleState.paused:
        // Casting tiếp tục trong Foreground Service — chỉ cập nhật UI
        context.read<CastBloc>().add(AppBackgroundedEvent());
        break;
      case AppLifecycleState.resumed:
        // Đồng bộ lại stats từ native
        context.read<CastBloc>().add(AppResumedEvent());
        break;
      default:
        break;
    }
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }
}
\`\`\`

Foreground Service giữ capture tiếp tục; Flutter UI chỉ quan sát và cập nhật.`,
      },
      level: "intermediate",
      tags: ["lifecycle", "Flutter", "Foreground Service", "background"],
    },
    {
      id: "fl-i7",
      question: {
        en: "How do you prevent memory leaks when processing high-frequency video frames?",
        vi: "Làm thế nào để ngăn rò rỉ bộ nhớ khi xử lý video frame tần số cao?",
      },
      answer: {
        en: `## Memory Leak Prevention for Video Frame Processing

At 60fps, frame buffers are allocated and released 60 times per second. Any unclosed buffer causes memory to grow indefinitely.

### Common leak sources

1. MediaCodec output buffer not released
2. ImageReader Image not closed
3. Native WebRTC objects not disposed

### MediaCodec — always release output buffers

\`\`\`kotlin
val index = codec.dequeueOutputBuffer(info, timeout)
if (index >= 0) {
    try {
        val buffer = codec.getOutputBuffer(index)
        processEncodedData(buffer, info)
    } finally {
        codec.releaseOutputBuffer(index, false) // MUST always run
    }
}
\`\`\`

### ImageReader — close every Image

\`\`\`kotlin
imageReader.setOnImageAvailableListener({ reader ->
    reader.acquireLatestImage()?.use { image ->
        // .use {} calls image.close() automatically
        processImage(image)
    }
}, handler)
\`\`\`

### Flutter / Dart — dispose streams and controllers

\`\`\`dart
@override
void dispose() {
  _frameSubscription?.cancel();
  _castBloc.close();
  super.dispose();
}
\`\`\`

### Monitoring

Use Android Studio **Memory Profiler** to track heap allocations. A flat heap line during casting = no leaks.`,
        vi: `## Ngăn Rò Rỉ Bộ Nhớ Khi Xử Lý Video Frame Tần Số Cao

Ở 60fps, frame buffer được cấp phát và giải phóng 60 lần mỗi giây. Bất kỳ buffer nào không được đóng sẽ khiến bộ nhớ tăng vô hạn.

### Các nguồn rò rỉ phổ biến

1. Output buffer của MediaCodec không được release
2. Image của ImageReader không được close
3. Đối tượng WebRTC native không được dispose

### MediaCodec — luôn release output buffer

\`\`\`kotlin
val index = codec.dequeueOutputBuffer(info, timeout)
if (index >= 0) {
    try {
        val buffer = codec.getOutputBuffer(index)
        processEncodedData(buffer, info)
    } finally {
        codec.releaseOutputBuffer(index, false) // PHẢI luôn chạy
    }
}
\`\`\`

### ImageReader — close mọi Image

\`\`\`kotlin
imageReader.setOnImageAvailableListener({ reader ->
    reader.acquireLatestImage()?.use { image ->
        // .use {} tự động gọi image.close()
        processImage(image)
    }
}, handler)
\`\`\`

### Flutter / Dart — dispose stream và controller

\`\`\`dart
@override
void dispose() {
  _frameSubscription?.cancel();
  _castBloc.close();
  super.dispose();
}
\`\`\`

### Giám sát

Dùng Android Studio **Memory Profiler** để theo dõi cấp phát heap. Đường heap phẳng trong quá trình casting = không có rò rỉ.`,
      },
      level: "intermediate",
      tags: ["memory leak", "MediaCodec", "ImageReader", "Android", "performance"],
    },

    // ── ADVANCED ───────────────────────────────────────────────────────────
    {
      id: "fl-a1",
      question: {
        en: "How would you implement a custom WebRTC video encoder using MediaCodec to bypass the default software encoder?",
        vi: "Làm thế nào để implement custom WebRTC video encoder dùng MediaCodec để bypass encoder mặc định bằng phần mềm?",
      },
      answer: {
        en: `## Custom WebRTC Video Encoder with MediaCodec

WebRTC's default Android encoder may fall back to VP8 software encoding. To force H.264 hardware, implement a custom \`VideoEncoder\` interface.

### Architecture

\`\`\`
WebRTC engine
  └── VideoEncoder (custom implementation)
        └── MediaCodec (H.264 hardware)
              └── encoded NAL units → RTP
\`\`\`

### Implementation (Kotlin + WebRTC native bindings)

\`\`\`kotlin
class HardwareH264Encoder : VideoEncoder {

    private lateinit var codec: MediaCodec
    private var callback: VideoEncoder.Callback? = null

    override fun initEncode(settings: VideoEncoder.Settings,
                            callback: VideoEncoder.Callback): VideoCodecStatus {
        this.callback = callback
        val format = MediaFormat.createVideoFormat(
            MediaFormat.MIMETYPE_VIDEO_AVC,
            settings.width, settings.height
        ).apply {
            setInteger(KEY_BIT_RATE, settings.startBitrate * 1000)
            setInteger(KEY_FRAME_RATE, settings.maxFramerate)
            setInteger(KEY_I_FRAME_INTERVAL, 1)
            setInteger(KEY_COLOR_FORMAT,
                COLOR_FormatSurface)
        }
        codec = MediaCodec.createEncoderByType(MIMETYPE_VIDEO_AVC)
        codec.configure(format, null, null, CONFIGURE_FLAG_ENCODE)
        codec.setCallback(mediaCodecCallback)
        codec.start()
        return VideoCodecStatus.OK
    }

    private val mediaCodecCallback = object : MediaCodec.Callback() {
        override fun onOutputBufferAvailable(
            codec: MediaCodec, index: Int, info: MediaCodec.BufferInfo
        ) {
            val buffer = codec.getOutputBuffer(index) ?: return
            val isKey = info.flags and BUFFER_FLAG_KEY_FRAME != 0
            // Deliver to WebRTC
            callback?.onEncodedFrame(
                EncodedImage.builder()
                    .setBuffer(buffer, null)
                    .setFrameType(if (isKey) VIDEOFRAME_TYPE_KEY else DELTA)
                    .setTimestampMs(info.presentationTimeUs / 1000)
                    .createEncodedImage(),
                CodecSpecificInfo()
            )
            codec.releaseOutputBuffer(index, false)
        }
    }
}
\`\`\``,
        vi: `## Custom WebRTC Video Encoder với MediaCodec

Encoder Android mặc định của WebRTC có thể fallback về VP8 software encoding. Để ép dùng H.264 hardware, implement custom interface \`VideoEncoder\`.

### Kiến trúc

\`\`\`
WebRTC engine
  └── VideoEncoder (implement tùy chỉnh)
        └── MediaCodec (H.264 hardware)
              └── NAL unit đã encode → RTP
\`\`\`

### Implementation (Kotlin + WebRTC native bindings)

\`\`\`kotlin
class HardwareH264Encoder : VideoEncoder {

    private lateinit var codec: MediaCodec
    private var callback: VideoEncoder.Callback? = null

    override fun initEncode(settings: VideoEncoder.Settings,
                            callback: VideoEncoder.Callback): VideoCodecStatus {
        this.callback = callback
        val format = MediaFormat.createVideoFormat(
            MediaFormat.MIMETYPE_VIDEO_AVC,
            settings.width, settings.height
        ).apply {
            setInteger(KEY_BIT_RATE, settings.startBitrate * 1000)
            setInteger(KEY_FRAME_RATE, settings.maxFramerate)
            setInteger(KEY_I_FRAME_INTERVAL, 1)
            setInteger(KEY_COLOR_FORMAT, COLOR_FormatSurface)
        }
        codec = MediaCodec.createEncoderByType(MIMETYPE_VIDEO_AVC)
        codec.configure(format, null, null, CONFIGURE_FLAG_ENCODE)
        codec.setCallback(mediaCodecCallback)
        codec.start()
        return VideoCodecStatus.OK
    }

    private val mediaCodecCallback = object : MediaCodec.Callback() {
        override fun onOutputBufferAvailable(
            codec: MediaCodec, index: Int, info: MediaCodec.BufferInfo
        ) {
            val buffer = codec.getOutputBuffer(index) ?: return
            val isKey = info.flags and BUFFER_FLAG_KEY_FRAME != 0
            // Chuyển đến WebRTC
            callback?.onEncodedFrame(
                EncodedImage.builder()
                    .setBuffer(buffer, null)
                    .setFrameType(if (isKey) VIDEOFRAME_TYPE_KEY else DELTA)
                    .setTimestampMs(info.presentationTimeUs / 1000)
                    .createEncodedImage(),
                CodecSpecificInfo()
            )
            codec.releaseOutputBuffer(index, false)
        }
    }
}
\`\`\``,
      },
      level: "advanced",
      tags: ["WebRTC", "MediaCodec", "custom encoder", "H.264", "Android"],
    },
    {
      id: "fl-a2",
      question: {
        en: "How would you design the architecture to make the casting system testable and maintainable?",
        vi: "Bạn sẽ thiết kế kiến trúc như thế nào để hệ thống casting có thể test và bảo trì được?",
      },
      answer: {
        en: `## Testable & Maintainable Architecture

### Layer separation

\`\`\`
┌─────────────────────────────────────┐
│  Flutter UI (Widget / BLoC)         │  ← Unit test with bloc_test
├─────────────────────────────────────┤
│  Domain Layer                       │
│  CastRepository (interface)         │  ← Mock in tests
│  SignalingService (interface)        │
├─────────────────────────────────────┤
│  Infrastructure Layer               │
│  NativeCastRepository               │  ← Integration test
│  WebSocketSignalingService          │
├─────────────────────────────────────┤
│  Native Android                     │  ← Instrumented test
│  ScreenCastService (Kotlin)         │
│  MediaCodecEncoder (Kotlin)         │
└─────────────────────────────────────┘
\`\`\`

### Dependency Injection (get_it)

\`\`\`dart
// Register real implementations
sl.registerSingleton<CastRepository>(NativeCastRepository());

// In tests: register mock
sl.registerSingleton<CastRepository>(MockCastRepository());
\`\`\`

### BLoC unit test

\`\`\`dart
blocTest<CastBloc, CastState>(
  'emits Streaming when StartCast succeeds',
  build: () {
    when(mockRepo.startCast()).thenAnswer((_) async => {});
    return CastBloc(repository: mockRepo);
  },
  act: (bloc) => bloc.add(StartCastEvent()),
  expect: () => [
    isA<CastConnecting>(),
    isA<CastStreaming>(),
  ],
);
\`\`\`

### Native unit test (Kotlin)

\`\`\`kotlin
@Test
fun \`encoder emits keyframe on first frame\`() {
    val encoder = HardwareH264Encoder()
    val frames = mutableListOf<EncodedImage>()
    encoder.initEncode(testSettings) { frame, _ -> frames.add(frame) }
    encoder.encode(testVideoFrame, EncodeInfo())
    assertTrue(frames.first().frameType == VideoFrameType.VideoFrameKey)
}
\`\`\``,
        vi: `## Kiến Trúc Có Thể Test và Bảo Trì

### Phân tách layer

\`\`\`
┌─────────────────────────────────────┐
│  Flutter UI (Widget / BLoC)         │  ← Unit test với bloc_test
├─────────────────────────────────────┤
│  Domain Layer                       │
│  CastRepository (interface)         │  ← Mock trong test
│  SignalingService (interface)        │
├─────────────────────────────────────┤
│  Infrastructure Layer               │
│  NativeCastRepository               │  ← Integration test
│  WebSocketSignalingService          │
├─────────────────────────────────────┤
│  Native Android                     │  ← Instrumented test
│  ScreenCastService (Kotlin)         │
│  MediaCodecEncoder (Kotlin)         │
└─────────────────────────────────────┘
\`\`\`

### Dependency Injection (get_it)

\`\`\`dart
// Đăng ký implementation thực
sl.registerSingleton<CastRepository>(NativeCastRepository());

// Trong test: đăng ký mock
sl.registerSingleton<CastRepository>(MockCastRepository());
\`\`\`

### Unit test BLoC

\`\`\`dart
blocTest<CastBloc, CastState>(
  'emit Streaming khi StartCast thành công',
  build: () {
    when(mockRepo.startCast()).thenAnswer((_) async => {});
    return CastBloc(repository: mockRepo);
  },
  act: (bloc) => bloc.add(StartCastEvent()),
  expect: () => [
    isA<CastConnecting>(),
    isA<CastStreaming>(),
  ],
);
\`\`\`

### Unit test native (Kotlin)

\`\`\`kotlin
@Test
fun \`encoder phát keyframe ở frame đầu tiên\`() {
    val encoder = HardwareH264Encoder()
    val frames = mutableListOf<EncodedImage>()
    encoder.initEncode(testSettings) { frame, _ -> frames.add(frame) }
    encoder.encode(testVideoFrame, EncodeInfo())
    assertTrue(frames.first().frameType == VideoFrameType.VideoFrameKey)
}
\`\`\``,
      },
      level: "advanced",
      tags: ["architecture", "testability", "BLoC", "dependency injection", "Flutter"],
    },
    {
      id: "fl-a3",
      question: {
        en: "How would you port the screen casting feature to iOS using ReplayKit?",
        vi: "Làm thế nào để chuyển tính năng screen casting sang iOS dùng ReplayKit?",
      },
      answer: {
        en: `## iOS Screen Casting with ReplayKit

iOS uses **ReplayKit** instead of MediaProjection. The approach differs significantly.

### Key differences vs Android

| Feature | Android | iOS |
|---------|---------|-----|
| API | MediaProjection | ReplayKit |
| Permission | System dialog per session | System dialog per session |
| Background capture | Foreground Service | Broadcast Upload Extension |
| System audio | AudioPlaybackCapture (API 29+) | Included in ReplayKit |
| Hardware encoder | MediaCodec | VideoToolbox |

### iOS Broadcast Upload Extension

iOS screen capture outside the app requires a **separate app extension**:

\`\`\`swift
// BroadcastSampleHandler.swift (separate extension target)
class BroadcastSampleHandler: RPBroadcastSampleHandler {
    override func processSampleBuffer(
        _ sampleBuffer: CMSampleBuffer,
        with type: RPSampleBufferType
    ) {
        switch type {
        case .video:
            // Encode with VideoToolbox, feed to WebRTC
            encoder.encode(sampleBuffer)
        case .audioApp:
            // System audio
            audioSource.push(sampleBuffer)
        default: break
        }
    }
}
\`\`\`

### Shared data between extension and main app

Use **App Groups** (shared container) to pass signaling data between the extension and main app via \`UserDefaults(suiteName:)\` or a socket.

### Flutter integration

\`\`\`dart
// Platform Channel calls the extension indirectly via main app
final channel = MethodChannel('com.app/ios_cast');
await channel.invokeMethod('startBroadcast');
\`\`\``,
        vi: `## Screen Casting iOS với ReplayKit

iOS dùng **ReplayKit** thay vì MediaProjection. Cách tiếp cận khác biệt đáng kể.

### Khác biệt chính so với Android

| Tính năng | Android | iOS |
|-----------|---------|-----|
| API | MediaProjection | ReplayKit |
| Quyền | Hộp thoại hệ thống mỗi phiên | Hộp thoại hệ thống mỗi phiên |
| Capture nền | Foreground Service | Broadcast Upload Extension |
| Âm thanh hệ thống | AudioPlaybackCapture (API 29+) | Tích hợp trong ReplayKit |
| Hardware encoder | MediaCodec | VideoToolbox |

### iOS Broadcast Upload Extension

Screen capture ngoài app trên iOS cần **một app extension riêng**:

\`\`\`swift
// BroadcastSampleHandler.swift (target extension riêng biệt)
class BroadcastSampleHandler: RPBroadcastSampleHandler {
    override func processSampleBuffer(
        _ sampleBuffer: CMSampleBuffer,
        with type: RPSampleBufferType
    ) {
        switch type {
        case .video:
            // Encode với VideoToolbox, đưa vào WebRTC
            encoder.encode(sampleBuffer)
        case .audioApp:
            // Âm thanh hệ thống
            audioSource.push(sampleBuffer)
        default: break
        }
    }
}
\`\`\`

### Chia sẻ dữ liệu giữa extension và app chính

Dùng **App Groups** (shared container) để truyền dữ liệu signaling qua \`UserDefaults(suiteName:)\` hoặc socket.

### Tích hợp Flutter

\`\`\`dart
// Platform Channel gọi extension gián tiếp qua app chính
final channel = MethodChannel('com.app/ios_cast');
await channel.invokeMethod('startBroadcast');
\`\`\``,
      },
      level: "advanced",
      tags: ["iOS", "ReplayKit", "VideoToolbox", "Flutter", "cross-platform"],
    },
    {
      id: "fl-a4",
      question: {
        en: "How do you handle dynamic screen resolution changes during an active cast?",
        vi: "Làm thế nào để xử lý thay đổi độ phân giải màn hình trong quá trình cast đang hoạt động?",
      },
      answer: {
        en: `## Handling Resolution Changes During Active Cast

Screen resolution can change due to: device rotation, split-screen mode, external display connect/disconnect.

### Detection

\`\`\`kotlin
// Register display listener in ScreenCastService
val displayManager = getSystemService(DISPLAY_SERVICE) as DisplayManager
displayManager.registerDisplayListener(object : DisplayListener {
    override fun onDisplayChanged(displayId: Int) {
        val display = displayManager.getDisplay(displayId) ?: return
        val newWidth = display.width
        val newHeight = display.height
        if (newWidth != currentWidth || newHeight != currentHeight) {
            handleResolutionChange(newWidth, newHeight)
        }
    }
    override fun onDisplayAdded(displayId: Int) {}
    override fun onDisplayRemoved(displayId: Int) {}
}, null)
\`\`\`

### Handling the change

\`\`\`kotlin
fun handleResolutionChange(width: Int, height: Int) {
    // 1. Stop current VirtualDisplay
    virtualDisplay.release()

    // 2. Reconfigure MediaCodec (requires stop/reset/start cycle)
    mediaCodec.stop()
    mediaCodec.reset()
    mediaCodec.configure(newFormat(width, height), ...)
    val newSurface = mediaCodec.createInputSurface()
    mediaCodec.start()

    // 3. Recreate VirtualDisplay with new dimensions and new surface
    virtualDisplay = mediaProjection.createVirtualDisplay(
        "ScreenCast", width, height, dpi,
        VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR, newSurface, null, null
    )

    // 4. Notify WebRTC of resolution change (triggers SDP renegotiation)
    videoSource.adaptOutputFormat(width, height, 60)
}
\`\`\`

The VirtualDisplay recreation causes a brief (~100ms) interruption in the stream — a PLI request from the receiver triggers a keyframe to re-sync.`,
        vi: `## Xử Lý Thay Đổi Độ Phân Giải Trong Quá Trình Cast

Độ phân giải màn hình có thể thay đổi do: xoay thiết bị, chế độ split-screen, kết nối/ngắt màn hình ngoài.

### Phát hiện thay đổi

\`\`\`kotlin
// Đăng ký display listener trong ScreenCastService
val displayManager = getSystemService(DISPLAY_SERVICE) as DisplayManager
displayManager.registerDisplayListener(object : DisplayListener {
    override fun onDisplayChanged(displayId: Int) {
        val display = displayManager.getDisplay(displayId) ?: return
        val newWidth = display.width
        val newHeight = display.height
        if (newWidth != currentWidth || newHeight != currentHeight) {
            handleResolutionChange(newWidth, newHeight)
        }
    }
    override fun onDisplayAdded(displayId: Int) {}
    override fun onDisplayRemoved(displayId: Int) {}
}, null)
\`\`\`

### Xử lý thay đổi

\`\`\`kotlin
fun handleResolutionChange(width: Int, height: Int) {
    // 1. Dừng VirtualDisplay hiện tại
    virtualDisplay.release()

    // 2. Cấu hình lại MediaCodec (cần chu trình stop/reset/start)
    mediaCodec.stop()
    mediaCodec.reset()
    mediaCodec.configure(newFormat(width, height), ...)
    val newSurface = mediaCodec.createInputSurface()
    mediaCodec.start()

    // 3. Tạo lại VirtualDisplay với kích thước và surface mới
    virtualDisplay = mediaProjection.createVirtualDisplay(
        "ScreenCast", width, height, dpi,
        VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR, newSurface, null, null
    )

    // 4. Thông báo WebRTC về thay đổi độ phân giải (kích hoạt SDP renegotiation)
    videoSource.adaptOutputFormat(width, height, 60)
}
\`\`\`

Việc tạo lại VirtualDisplay gây ra gián đoạn ngắn (~100ms) trong stream — yêu cầu PLI từ receiver kích hoạt keyframe để đồng bộ lại.`,
      },
      level: "advanced",
      tags: ["resolution", "VirtualDisplay", "MediaCodec", "Android", "resilience"],
    },
    {
      id: "fl-a5",
      question: {
        en: "How do you profile and optimize the end-to-end latency from screen pixel to decoded frame?",
        vi: "Làm thế nào để profile và tối ưu độ trễ end-to-end từ pixel màn hình đến frame đã decode?",
      },
      answer: {
        en: `## Profiling End-to-End Latency

Target: pixel appears on screen → visible in receiver's view = **~150ms**

### Latency breakdown

\`\`\`
Screen pixel rendered
    ↓  [VirtualDisplay capture delay: ~8ms at 60fps]
Frame in MediaCodec input surface
    ↓  [H.264 hardware encoding: ~5–15ms]
Encoded NAL units ready
    ↓  [WebRTC packetization + send: ~2ms]
    ↓  [Network (Wi-Fi Direct): ~1–5ms]
RTP packets received
    ↓  [WebRTC jitter buffer: 20–60ms default]
    ↓  [H.264 decoding: ~5ms hardware]
Frame rendered on receiver display
─────────────────────────────────────
Total: ~40–100ms (well under 150ms target)
\`\`\`

### Measuring with timestamps

\`\`\`kotlin
// Sender: embed capture timestamp in SEI NAL unit or RTP extension
val captureTimeUs = System.nanoTime() / 1000

// Receiver: compare with receipt time
val latencyMs = (System.nanoTime() / 1000 - captureTimeUs) / 1000
\`\`\`

### Reducing jitter buffer delay

\`\`\`javascript
// WebRTC jitter buffer target delay (default: 60ms)
// On a stable Wi-Fi Direct link, reduce to 20ms:
pc.setConfiguration({ ...config, iceTransportPolicy: 'all' });
// Use WebRTC internals (chrome://webrtc-internals) to monitor jitterBufferDelay
\`\`\`

### Tools used

- Android Studio **CPU Profiler** — trace encode thread
- **WebRTC getStats()** — \`framesPerSecond\`, \`totalEncodeTime\`
- **Wireshark** — measure network transit time on Wi-Fi Direct`,
        vi: `## Profile Độ Trễ End-to-End

Mục tiêu: pixel xuất hiện trên màn hình → hiển thị trong view của receiver = **~150ms**

### Phân tích độ trễ

\`\`\`
Pixel màn hình được render
    ↓  [Độ trễ capture VirtualDisplay: ~8ms ở 60fps]
Frame trong input surface của MediaCodec
    ↓  [H.264 hardware encoding: ~5–15ms]
NAL unit đã encode sẵn sàng
    ↓  [WebRTC packetization + gửi: ~2ms]
    ↓  [Mạng (Wi-Fi Direct): ~1–5ms]
RTP packet được nhận
    ↓  [WebRTC jitter buffer: mặc định 20–60ms]
    ↓  [H.264 decoding: ~5ms hardware]
Frame render trên màn hình receiver
──────────────────────────────────────
Tổng: ~40–100ms (tốt hơn mục tiêu 150ms)
\`\`\`

### Đo bằng timestamp

\`\`\`kotlin
// Sender: nhúng timestamp capture vào SEI NAL unit hoặc RTP extension
val captureTimeUs = System.nanoTime() / 1000

// Receiver: so sánh với thời điểm nhận
val latencyMs = (System.nanoTime() / 1000 - captureTimeUs) / 1000
\`\`\`

### Giảm độ trễ jitter buffer

\`\`\`javascript
// Độ trễ target của jitter buffer WebRTC (mặc định: 60ms)
// Trên đường truyền Wi-Fi Direct ổn định, giảm xuống 20ms:
pc.setConfiguration({ ...config, iceTransportPolicy: 'all' });
// Dùng WebRTC internals để theo dõi jitterBufferDelay
\`\`\`

### Công cụ sử dụng

- Android Studio **CPU Profiler** — trace encode thread
- **WebRTC getStats()** — \`framesPerSecond\`, \`totalEncodeTime\`
- **Wireshark** — đo thời gian transit mạng trên Wi-Fi Direct`,
      },
      level: "advanced",
      tags: ["latency", "profiling", "performance", "end-to-end", "optimization"],
    },
    {
      id: "fl-a6",
      question: {
        en: "How do you handle reconnection when the WebRTC connection drops during casting?",
        vi: "Làm thế nào để xử lý kết nối lại khi WebRTC bị ngắt giữa chừng?",
      },
      answer: {
        en: `## WebRTC Reconnection Strategy

### Detecting disconnection

\`\`\`javascript
pc.onconnectionstatechange = () => {
  switch (pc.connectionState) {
    case 'disconnected':
      // May recover — wait 5s before acting
      scheduleReconnect(5000);
      break;
    case 'failed':
      // Definitive failure — trigger full reconnect
      reconnect();
      break;
    case 'connected':
      cancelScheduledReconnect();
      break;
  }
};
\`\`\`

### ICE restart (fast path — no full renegotiation)

If the network changed but signaling is still alive:

\`\`\`javascript
async function iceRestart() {
  const offer = await pc.createOffer({ iceRestart: true });
  await pc.setLocalDescription(offer);
  ws.send({ type: 'offer', sdp: offer });
}
\`\`\`

### Full reconnect (slow path)

If the signaling WebSocket also dropped:

\`\`\`dart
Future<void> reconnect() async {
  await signalingService.reconnect();   // re-establish WebSocket
  await castRepository.restartCast();   // new RTCPeerConnection + new offer
}
\`\`\`

### Exponential backoff

\`\`\`dart
int attempt = 0;
Future<void> scheduleReconnect() async {
  final delay = Duration(seconds: min(2 << attempt, 30));
  attempt++;
  await Future.delayed(delay);
  await reconnect();
}
\`\`\`

### In the project

Wi-Fi Direct connections were stable — disconnections were rare. ICE restart was implemented as a safeguard, with the BLoC transitioning to \`CastReconnecting\` state and displaying a spinner to the user.`,
        vi: `## Chiến Lược Kết Nối Lại WebRTC

### Phát hiện mất kết nối

\`\`\`javascript
pc.onconnectionstatechange = () => {
  switch (pc.connectionState) {
    case 'disconnected':
      // Có thể phục hồi — chờ 5 giây trước khi xử lý
      scheduleReconnect(5000);
      break;
    case 'failed':
      // Lỗi xác định — kích hoạt kết nối lại hoàn toàn
      reconnect();
      break;
    case 'connected':
      cancelScheduledReconnect();
      break;
  }
};
\`\`\`

### ICE restart (đường nhanh — không cần renegotiation hoàn toàn)

Nếu mạng thay đổi nhưng signaling vẫn còn:

\`\`\`javascript
async function iceRestart() {
  const offer = await pc.createOffer({ iceRestart: true });
  await pc.setLocalDescription(offer);
  ws.send({ type: 'offer', sdp: offer });
}
\`\`\`

### Kết nối lại hoàn toàn (đường chậm)

Nếu WebSocket signaling cũng bị ngắt:

\`\`\`dart
Future<void> reconnect() async {
  await signalingService.reconnect();   // tạo lại WebSocket
  await castRepository.restartCast();   // RTCPeerConnection mới + offer mới
}
\`\`\`

### Exponential backoff

\`\`\`dart
int attempt = 0;
Future<void> scheduleReconnect() async {
  final delay = Duration(seconds: min(2 << attempt, 30));
  attempt++;
  await Future.delayed(delay);
  await reconnect();
}
\`\`\`

### Trong dự án

Kết nối Wi-Fi Direct ổn định — mất kết nối rất hiếm. ICE restart được implement như biện pháp an toàn, với BLoC chuyển sang state \`CastReconnecting\` và hiển thị spinner cho người dùng.`,
      },
      level: "advanced",
      tags: ["reconnection", "ICE restart", "resilience", "WebRTC", "error handling"],
    },
  ],
};
