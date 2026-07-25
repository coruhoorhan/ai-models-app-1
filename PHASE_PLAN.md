# UnoRouter - Development Phase Plan (Faz Planı)

Bu doküman, `AGENTS.md` içerisindeki kurallar, `DESIGN.md`'deki tasarım sistemi, `PAGES.md` içerisindeki sayfa yapıları, `docs/schema-design.md` içindeki veritabanı şeması ve `docs/api-contract.yaml` içindeki API kontratına dayanarak oluşturulmuş detaylı geliştirme faz planıdır.

Projenin şu anki durumuna göre (`TESPITLER.md`), temel frontend yapıları (Routing, ThemeProvider, DashboardChart, mock Auth) oluşturulmuştur. Neon veritabanı (PostgreSQL) bağlantısı hazırdır (`prisma/schema.prisma`).

## Faz 1: Backend Altyapısının Kurulması ve Veritabanı (Data Layer)
*Amaç: Prisma modellerinin veritabanına yansıtılması ve API Route altyapısının `api-contract.yaml` ile uyumlu olarak Express veya Next.js Route Handlers ile ayağa kaldırılması.*

- **1.1. Veritabanı Migrasyonları (Prisma & Neon):**
  - `prisma/schema.prisma` incelendiğinde şema hazır görünüyor.
  - Veritabanında tabloların oluşturulması için Prisma migrasyonlarının (`npx prisma migrate dev` veya `npx prisma db push`) çalıştırılması.
  - (Opsiyonel) Geliştirme sürecini hızlandırmak için `prisma/seed.ts` dosyası oluşturulup, örnek `Provider`, `Model`, `Ranking` ve `User` verilerinin (mock data) basılması.

- **1.2. Backend API Mimarisinin Başlatılması:**
  - Proje şu an Vite ile frontend olarak çalışıyor. Backend için Express (`server.js`) veya ayrı bir api klasörü kurulumunun standartlaştırılması (`AGENTS.md` Kural 8).
  - Güvenli çevre değişkenleri (`.env`) yönetimi.
  - Hata yakalama mekanizmasının (`shared/lib/logError.ts`) backend route'larına entegrasyonu (`ENGINEERING-STANDARDS.md` Section 1).

- **1.3. Kimlik Doğrulama (Auth) Katmanı (Backend):**
  - `api-contract.yaml`'daki `/auth/register`, `/auth/login`, `/auth/me`, `/auth/logout` endpoint'lerinin uygulanması.
  - HTTP-Only Cookie tabanlı JWT mekanizmasının yazılması.
  - Mock AuthProvider'ın (frontend) gerçek API ile değiştirilmesi.

## Faz 2: Dashboard ve Core API Entegrasyonları
*Amaç: Dashboard sayfasının statik (mock) verilerden gerçek API'ye geçirilmesi ve veritabanı işlemlerinin (Usage Logs, Stats) bağlanması.*

- **2.1. Usage Logs & Materialized Stats (Backend):**
  - `/usage-logs` endpoint'inin paginasyon destekli yazılması.
  - `users.current_balance` gibi materialized alanların, transaction tablosuna insert atılırken Prisma Transaction veya DB Trigger ile güncellenmesi mimarisinin kurulması (`schema-design.md`).

- **2.2. Dashboard Stats & Charts (Backend & Frontend):**
  - `/dashboard/stats` ve `/dashboard/chart` endpoint'lerinin uygulanması.
  - Frontend'de `features/dashboard/hooks/useDashboardStats.ts` gibi custom hook'lar aracılığıyla (SWR/React Query mantığı) verinin çekilip UI'a (StatCard'lar ve DashboardChart) bağlanması.

- **2.3. API Keys Yönetimi:**
  - `/api-keys` (GET, POST, DELETE) endpoint'lerinin yazılması.
  - Backend'de key hash'leme mantığı.
  - Frontend API Keys sayfasının entegrasyonu.

## Faz 3: Models Sayfası ve Dinamik Filtreleme
*Amaç: `PAGES.md` içindeki Models Sayfası Blueprint'ine uygun olarak Model listeleme ve filtreleme işlemlerinin tamamlanması.*

- **3.1. Models Backend Endpoint'leri:**
  - `/models` (arama, filtreleme, sıralama destekli) ve `/providers` endpoint'lerinin yazılması.
  - `models.popularity_score` için arka plan (cron) güncelleme mekanizmasının tasarlanması.

- **3.2. Models Sayfası UI Entegrasyonu:**
  - Models sayfasındaki DataTable bileşenine `/models` API'sinin bağlanması.
  - Provider ve Tier dropdown filtrelerinin URL state (`useSearchParams`) senkronizasyonunun yapılması (`AGENTS.md` Kural 3).

## Faz 4: Rankings Sayfası ve Yeni Bileşenler (Onay Bekleyenler)
*Amaç: `RANKINGS-PAGE-BLUEPRINT.md`'de belirtilen karmaşık veri gösterimlerinin tasarlanması ve uygulanması.*

- **4.1. Yeni Tasarım Bileşenleri (DESIGN.md Güncellemesi):**
  - `chart-card-scatter`, `highlight-list-item`, `cost-simulator-card`, `methodology-tile` bileşenlerinin `DESIGN.md` standartlarına (`colors.hairline`, `colors.live`, monospace typography vb.) uygun olarak `shared/ui/` altında geliştirilmesi.

- **4.2. Rankings Backend Endpoint'leri:**
  - `/rankings` ve `/rankings/highlights` endpoint'lerinin yazılması.
  - Sparkline grafikler için gerekli olan`/models/{id}/performance` endpoint'inin uygulanması.

- **4.3. Rankings Sayfası UI Geliştirmesi:**
  - Sol tabloda SIRA (ilk 3 sıra vurgusu) ve genişletilmiş hücre tiplerinin (PERFORMANS GRAFİĞİ) kodlanması.
  - Sağ taraftaki kart yığınının (Intelligence Hub 2030, Haftalık Yükseklikler, API Maliyet Simülasyonu) yeni geliştirilen bileşenlerle hayata geçirilmesi.

## Faz 5: İnce Ayar, Performans ve Optimizasyon
*Amaç: Tüm kuralların (Definition of Done) üzerinden geçilmesi ve projenin production'a hazır hale getirilmesi.*

- **5.1. Performans Denetimi:**
  - DataTable'lar üzerinde TanStack Virtual veya benzeri liste sanallaştırma yöntemlerinin uygulanması (`ENGINEERING-STANDARDS.md` Section 3).
  - Bundle boyutlarının analizi ve gerektiğinde React.lazy/Suspense ile code splitting.

- **5.2. Test ve Kalite Güvencesi:**
  - Vitest ile custom hook ve shared/lib fonksiyonları için unit testlerin yazılması (`GIT-WORKFLOW.md` Section 1).
  - React Testing Library ile UI bileşenlerinin (özellikle yeni eklenenlerin) a11y (erişilebilirlik) ve davranış testleri.

- **5.3. Görsel Kontrol ve Definition of Done (DoD):**
  - Light/Dark mode testleri.
  - Magic number kontrolleri (`w-[324px]`, `text-[13px]` yok, sadece DESIGN.md tokenları).
  - Koda son kez 150 satır kuralı incelemesi yapılması.

---

**Not:** Bu plan, `AGENTS.md`'deki **Sıkı Onay Mekanizması** kuralı uyarınca her adım öncesinde ve sonrasında kullanıcı (developer/PM) onayını gerektirir. Hiçbir faz, önceki fazın DoD (Definition of Done) kontrolleri geçilmeden ve onay alınmadan başlamaz.
