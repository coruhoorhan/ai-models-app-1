# 🚀 AI Models App - Faz Planı ve Eksik Geliştirmeler

Bu belge, projenin mevcut durumu (tamamlananlar) üzerinden bir sonraki adımları, eksik kısımları ve yapılması gereken mimari, güvenlik, UI iyileştirmelerini listeler.

## Faz 1: Mevcut Durum (Tamamlananlar)

- **Sayfalar (Pages):** Landing, Pricing, Models, Rankings, Dashboard, Usage Logs.
- **Mimari (Architecture):** Feature-Sliced Design (FSD) ile dosya yapısı ayrıldı (`app/`, `pages/`, `features/`, `shared/`). Tema yönetimi (`ThemeProvider`) ve Error Boundary mekanizması entegre.
- **Tasarım (Design):** `DESIGN.md` ve `AGENTS.md` içerisindeki kurallara uygun, hardcoded styling'den kaçınan Tailwind token mapleri (`design-tokens.css`). `BackgroundGrid`, `LaserEffect`, `BlazeEffect` gibi interaktif elementler tamam.
- **Optimizasyon:** `DataTable` search mantığı, `.some` + `.includes()` döngüsünden RegExp ve geleneksel `for` döngüsüne dönüştürülerek optimize edildi (Performans artışı sağlandı).

---

## Faz 2: Uygulama İçi Özellikler ve Kullanıcı Deneyimi (Planlanan)

### 1. Eksik Sayfalar ve Görünümler

- **Ayarlar Sayfası (Settings - `/settings`):**
  - Profil detayları güncelleme.
  - API Anahtarları (API Keys) yönetimi. Token revokasyon işlemleri.
  - Tema, E-posta ve Bildirim (Notification) tercihleri menüsü.
- **Fatura ve Ödemeler (Billing - `/billing`):**
  - Ödeme geçmişi.
  - Mevcut ödeme yöntemi güncelleme ekranları.
- **Affiliate (Ortaklık) Dashboard'u (`/affiliate`):**
  - Referans kod üretme.
  - Kazanç ve yönlendirme grafikleri.
- **Kimlik Doğrulama (Auth Flow):**
  - Mevcut mock `AuthProvider`'ın gerçek bir JWT ve backend Auth (örneğin Neon Auth / OAuth) entegrasyonuna çevrilmesi.
  - Login, Register ve Forgot Password sayfaları/modalları.

### 2. Mimari ve State Yönetimi Geliştirmeleri

- **Global State Yönetimi (Zustand / Redux):** `Dashboard` ve `Settings` içinde kullanıcı ayarları, form stateleri ve bildirim sistemi (toast) için daha profesyonel bir global state entegrasyonu.
- **Veri Sanallaştırma (Data Virtualization):** `ModelsPage` ve `UsageLogsPage` içerisinde yer alan çok satırlı `DataTable`'ın `TanStack Virtual` ile sanallaştırılması (AGENTS.md Kural 9 uyarınca proaktif mimari iyileştirme).
- **Backend Servisleri ve ORM (Neon DB & Prisma):** `shared/api` altında mocklanan verilerin, Prisma ORM kullanarak PostgreSQL (Neon) üzerinden sağlanan Next.js/Express Endpoint'lerine dönüştürülmesi.
- **Caching ve SWR / React Query:** Dashboard veri yenilemeleri ve Model listesi sayfalama performansı için `SWR` veya `Tanstack Query` entegrasyonu.

---

## Faz 3: Güvenlik, Hata İzleme (Observability) ve Performans İyileştirmeleri

### 1. Güvenlik İyileştirmeleri

- **Rate Limiting (Hız Sınırı):** API route'ları için Rate Limiting.
- **Input Sanitization:** Arama parametreleri, URL parametreleri ve form girdilerinin (Settings, Auth) güvenlik kontrollerinden geçirilmesi (örn. Zod validasyonu).
- **Secret Management:** Çevresel değişkenlerin (API Keys vs.) client-side tarafında asla görünmediğinden emin olmak. (ENGINEERING-STANDARDS.md Bölüm 2 kuralları).

### 2. Observability (Gözlemleme)

- **Merkezi Loglama:** Mevcut `logError` altyapısının bir hata takip servisiyle (örn. Sentry, Datadog) entegrasyonu.
- **Otel (OpenTelemetry) / Metrics:** Endpoint süreleri ve kullanım istatistiklerinin toplanması ve monitor edilmesi.
- **Performance Profiling:** React Profiler ile yeniden renderları analiz ederek gereksiz memoization veya re-render durumlarını engelleme.

### 3. Ek Performans Adımları

- **Bundle Boyutu:** Ağır componentlerin (Örn. Recharts barındıran DashboardChart) `React.lazy` ve `<Suspense />` aracılığıyla code-splitting uygulanarak yüklenmesi (Bkz: `ENGINEERING-STANDARDS.md` - Performance Budget).
- **Görsel Optimizasyonu:** Varsa statik resimlerin (logo vb.) `webp`/`avif` formatlarına dönüşümü.
