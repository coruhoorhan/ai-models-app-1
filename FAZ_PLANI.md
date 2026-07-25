# Proje Geliştirme Faz Planı

Bu belge, projenin mevcut statik yapısından tam teşekküllü (full-stack) bir yapıya geçişini sağlamak için `AGENTS.md`, `DESIGN.md`, `ENGINEERING-STANDARDS.md` ve ilgili diğer dökümanlar ışığında hazırlanmış detaylı ve aşamalı bir çalışma planıdır.

---

## Faz 1: Veritabanı ve API Altyapısının Kurulması (Backend)
**Hedef:** `.env` dosyasında bulunan Neon veritabanı bağlantılarını aktifleştirmek, Prisma şemasını veritabanına yansıtmak ve temel API katmanını oluşturmak.

- **Adım 1.1:** Express.js (veya Next.js API Routes / benzeri bir çözüm) ile izole bir API sunucu altyapısının kurulması (`server.js` veya `src/app/api` yapısı).
- **Adım 1.2:** Prisma ORM entegrasyonu; `prisma generate` ve `prisma db push/migrate` komutları ile şemanın Neon veritabanına uygulanması.
- **Adım 1.3:** `ENGINEERING-STANDARDS.md` (Section 1 ve 2) uyarınca merkezi hata yönetimi (`logError`), güvenlik (CORS) ve API rate-limiting ayarlarının yapılması.
- **Doğrulama:** Backend'in ayağa kalkması ve `GET /health` gibi temel bir endpoint'in yanıt vermesi.

---

## Faz 2: Temel Veri Endpoint'lerinin (API Rotaları) Geliştirilmesi
**Hedef:** Mock (sahte) verilerle beslenen frontend sayfaları için gerekli gerçek API uç noktalarının yazılması.

- **Adım 2.1 - Models API:** `GET /api/models` (sayfalama, arama, tier ve sort parametreleri ile) ve `GET /api/providers` (dropdown için) endpoint'lerinin oluşturulması.
- **Adım 2.2 - Rankings API:** Leaderboard ve analiz grafikleri için `GET /api/rankings` ile en çok yükselen/düşen modeller için `GET /api/rankings/highlights` endpoint'lerinin geliştirilmesi.
- **Adım 2.3 - Dashboard API:** `GET /api/dashboard/stats` endpoint'inin kullanıcı bakiyesi, tüketim, token gibi verileri `UsageLog` ve `BillingTransaction` tablolarından okuyacak şekilde kurgulanması.
- **Doğrulama:** Postman veya benzeri bir araçla endpoint'lerin doğru (200 OK) JSON formatında veri döndürdüğünün test edilmesi.

---

## Faz 3: Eksik UI Bileşenlerinin Geliştirilmesi (Frontend)
**Hedef:** `RANKINGS-PAGE-BLUEPRINT.md` ve `MODELS-PAGE-BLUEPRINT.md` belgelerinde tanımlı olan ve onay bekleyen yeni bileşenlerin `DESIGN.md` standartlarına tam uyumlu olarak `src/shared/ui/` altında üretilmesi.

- **Adım 3.1:** `ChartCardScatter` bileşeni (Intelligence Hub 2030 scatter/radar grafiği için).
- **Adım 3.2:** `HighlightListItem` bileşeni (Haftalık Yükseklikler delta rozetli liste elemanı).
- **Adım 3.3:** `CostSimulatorCard` bileşeni (API Maliyet Simülasyonu için token hacmi seçicili kart).
- **Adım 3.4:** (Gerekliyse) `MethodologyTile` bileşeni veya mevcut `card-feature` kullanılarak entegre edilmesi.
- **Doğrulama:** Bileşenlerin test ortamında (veya uygulamanın bir köşesinde geçici olarak) light/dark temalarda görsel olarak (Tailwind utility) sorunsuz çalıştığının onaylanması.

---

## Faz 4: Frontend Sayfalarının Gerçek API'lere Bağlanması
**Hedef:** Projedeki "useModels", "useDashboardStats" vb. hook'ların statik mock veriler yerine Phase 2'de yazılan API endpoint'lerini (`fetch`) kullanacak şekilde güncellenmesi.

- **Adım 4.1:** `src/features/models/hooks/useModels.ts` ve ilgili api fonksiyonlarının sunucudan veri çekecek şekilde düzenlenmesi (URL state / params desteği dahil).
- **Adım 4.2:** `src/features/dashboard/hooks/useDashboardData.ts` dosyasının gerçek verilere entegrasyonu.
- **Adım 4.3:** `src/features/rankings/hooks/useRankings.ts` hook'unun (veya benzer yapıların) eklenerek `RankingsPage.tsx` sayfasının dinamikleştirilmesi.
- **Adım 4.4:** `ModelsPage`, `RankingsPage`, ve `DashboardPage` bileşenlerinde `skeleton-loader` veya `empty-state-block` durumlarının tam entegre edilmesi (`AGENTS.md` Kural 5 ve 12).
- **Doğrulama:** İlgili sayfaların tarayıcıda tamamen dinamik verilerle yüklenmesi, arama ve filtreleme işlevlerinin (URL search params) kusursuz çalışması.

---

## Faz 5: Kalite Güvence, Test ve Definition of Done (DoD)
**Hedef:** Yazılan kodların proje mühendislik standartlarına tam uyması ve test süreçlerinin tamamlanması.

- **Adım 5.1:** Yeni oluşturulan veya güncellenen custom hook'lar ve servisler (`shared/api`, `features/*/hooks`) için Vitest birim testlerinin (unit tests) yazılması (`GIT-WORKFLOW.md` Kural 1).
- **Adım 5.2:** `eslint` ve TypeScript kontrolünün (`tsc --noEmit`) sıfır hata verecek şekilde düzenlenmesi.
- **Adım 5.3:** `AGENTS.md` Kural 12 (Definition of Done) maddelerinin kontrolü:
  - Hiçbir dosya 150 satırı geçmiyor mu?
  - `any` kullanımı engellendi mi?
  - Sadece `DESIGN.md` token'ları kullanıldı mı (Magic number kontrolü)?
- **Doğrulama:** `npm run lint` ve `npm run test` komutlarının başarıyla sonuçlanması.

---
*Not: Bu plan, kullanıcıdan gelecek onay ve geri bildirimler doğrultusunda revize edilebilir.*