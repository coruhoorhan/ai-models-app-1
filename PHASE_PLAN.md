# Faz Planı: Gerçek Backend ve Veritabanı Entegrasyonu

Mevcut frontend projesini (Vite, React, TailwindCSS) mock API'lerden kurtarıp, Express.js backend ve Neon üzerinden PostgreSQL veritabanı ile (Prisma ORM kullanarak) entegre etmeye yönelik faz planıdır. Plan `docs/schema-design.md`, `MODELS-PAGE-BLUEPRINT.md`, `AGENTS.md`, `DESIGN.md` ve `ENGINEERING-STANDARDS.md` dosyalarındaki standart ve gereksinimleri temel almaktadır.

## Faz 1: Express.js Backend Altyapısı ve Prisma (Veritabanı) Kurulumu
**Amacı:** Backend API hizmeti verecek olan Express sunucusunun yapılandırılması ve uygulamanın Prisma aracılığıyla Neon (Postgres) veritabanına bağlanmasının sağlanması.

- **Adım 1.1:** Express.js sunucu iskeletinin oluşturulması. `src/server/index.ts` veya `server.js` dosyasının yaratılıp, Express uygulamasının (middleware'ler dahil: JSON parsing, CORS kuralları, Rate Limiting vb. -> `ENGINEERING-STANDARDS.md` Sec 2) Vite development server ile (gerekirse Vite plugin veya ayrı process ile) entegre edilmesi.
- **Adım 1.2:** Prisma schema'sının (`prisma/schema.prisma`) son kontrolü ve veritabanı göçlerinin (migration) çalıştırılması (`npx prisma db push` veya `npx prisma migrate dev`).
- **Adım 1.3:** Başlangıç verilerinin (seed) veritabanına eklenmesi. `prisma/seed.ts` dosyası oluşturulup, başlangıç için gerekli `providers` (OpenAI, Anthropic, Google vb.) ve `models` (gpt-4o, claude-3-opus vb.) verilerinin eklenmesi.
- **Adım 1.4:** Merkezi hata yakalama mekanizmasının backend'e entegrasyonu. (Uyarı: `logError` -> `ENGINEERING-STANDARDS.md` Sec 1)

## Faz 2: API Endpoint'lerinin Geliştirilmesi
**Amacı:** Frontend'in ihtiyaç duyduğu gerçek API rotalarının Express üzerinden dışa açılması (RESTful yapı).

- **Adım 2.1:** `GET /api/providers` endpoint'inin yazılması. `MODELS-PAGE-BLUEPRINT.md`'de belirtildiği gibi Models sayfasındaki Provider filtre dropdown'unu besleyecek dinamik veri.
- **Adım 2.2:** `GET /api/models` endpoint'inin güncellenmesi. Veritabanından verileri (`models` tablosu `providers` ile join'lenerek) pagination (sayfalama), search (arama) ve filtering (tier/provider filtresi) destekleyecek şekilde döndürülmesi. (Not: Popularity sıralaması için `popularity_score` alanı kullanılacak).
- **Adım 2.3:** Dashboard verilerini sağlayan endpoint'lerin yazılması (`api-contract.yaml` da belirtilen `GET /api/dashboard/stats`, `GET /api/dashboard/chart`). Dashboard'da kullanılan aggregasyonlar veritabanından çekilmeli, yüksek işlem maliyeti olanlar `current_balance` gibi materialize edilmiş field'lardan veya view'lerden okunmalı (`docs/schema-design.md`).
- **Adım 2.4:** `api-contract.yaml` da belirtilen diğer gerekli endpointlerin eksiklerinin tespiti ve eklenmesi.

## Faz 3: Frontend Entegrasyonu ve Veri Bağlama
**Amacı:** Frontend'deki mock servislerin yeni Express API üzerinden asenkron veri alacak şekilde güncellenmesi.

- **Adım 3.1:** `src/shared/api` içerisindeki mock fonksiyonların (örn: `fetchModels`, `fetchDashboardStats` vs.) `fetch` API kullanarak Express endpointlerine yönlendirilmesi. Environment variables (`APP_URL`) kullanımı.
- **Adım 3.2:** Frontend Data-Fetching Hook'larının (`useModels.ts`, `useDashboardData.ts`) hata durumlarını (API kesintisi vs) `logError`'a düşürecek ve UI'da `error-state-block` render edecek şekilde iyileştirilmesi. Loading süreçlerinde `skeleton-loader` kullanılması.
- **Adım 3.3:** Models sayfasındaki provider filtresinin, `GET /api/providers` endpoint'inden gelen dinamik veriler ile donatılması.
- **Adım 3.4:** Data fetching sonrası client-side filtering olan yerlerin (örn: Models sayfası) kontrol edilmesi, gerekirse server-side filtering & pagination yaklaşımının entegrasyonu (Performance Budget -> `ENGINEERING-STANDARDS.md` Sec 3).

## Faz 4: Tasarım/Mimari Gözden Geçirme, Kalite ve Son Testler
**Amacı:** Değişimlerin "Definition of Done" (DoD) kriterlerini sağlaması, kod kalitesinin artırılması ve potansiyel UI/UX hatalarının giderilmesi.

- **Adım 4.1:** Responsive tasarımların (Sidebar drawer vs.) ve Light/Dark mod geçişlerinin (`BackgroundGrid`, `LaserEffect` vs.) gerçek veri geldiğinde bozulmadığının test edilmesi. `max-w-[1440px]` standartlarının kontrolü (`AGENTS.md` Sec 13).
- **Adım 4.2:** Custom hook'lar (`features/*/hooks/`) ve yeni eklenecek shared/lib fonksiyonları için Vitest unit testlerinin yazılması veya güncellenmesi (`GIT-WORKFLOW.md`).
- **Adım 4.3:** 100 satır üzeri data listelerinde (DataTable) gerekiyorsa `TanStack Virtual` entegrasyonun tamamlanması (`ENGINEERING-STANDARDS.md` Sec 3 - Performans Bütçesi).
- **Adım 4.4:** Secret'lerin (`DATABASE_URL`, API key'ler) asla client side'a sızmadığının ve doğru bir auth mekanizmasının çalıştığının teyidi.
- **Adım 4.5:** PR (Pull Request) hazırlığı için `lint` ve `tsc --noEmit` çalıştırılarak TypeScript type sorunlarının temizlenmesi.
