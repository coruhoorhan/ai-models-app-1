# UnoRouter Projesi Faz Planı (Mimari ve Uygulama)

`AGENTS.md` içerisindeki prensiplere (özellikle sıkı onay mekanizması, Feature-Sliced Design, ve DESIGN.md referansına sadakat) ve `.md` dokümanlarındaki (özellikle `docs/schema-design.md`'de belirtilen **Neon** bağlantısı) kurallara dayalı, uçtan uca uygulama planı aşağıdadır.

Bu plan, **Kullanıcıdan onay alınmadan kod yazmama** (AGENTS.md - Kural 1) prensibine tam uyum sağlamak için hazırlanmıştır. Geliştirme sürecinin bu fazlara göre yürütülmesi önerilmektedir.

---

## Faz 1: Altyapı ve Veritabanı Hazırlığı (Backend-İlk Yaklaşımı)

**Hedef:** Güvenilir ve ölçeklenebilir Neon + Prisma altyapısını ayağa kaldırmak.

1.  **Neon Veritabanı Bağlantısı:**
    *   `docs/schema-design.md` dosyasında belirtildiği üzere, projenin veritabanı Neon üzerinde barındırılmaktadır (Serverless PostgreSQL).
    *   İlk iş olarak `.env` dosyası oluşturulup `DATABASE_URL` ve `DIRECT_URL` parametrelerinin tanımlanması sağlanmalıdır. (Neon üzerindeki dallanma/branching özelliklerinin PR tabanlı çalışma için konfigürasyonu).
2.  **Prisma Şeması Validasyonu ve Migration:**
    *   `prisma/schema.prisma` incelenecek ve `docs/schema-design.md`'deki eksik tablo/alanlar ile senkronize edilecek. (Örn. Enumlar: `SubscriptionTier`, `ModelCategory`, `TransactionType`, `SenderType`).
    *   **Onay Bekleniyor:** Prisma şemasında eksiklik var mı? (Şu anki `schema.prisma` güncel görünüyor, ancak lokal PostgreSQL/Neon senkronizasyonu için `npx prisma db push` veya `npx prisma migrate dev` çalıştırılması gerekebilir).
3.  **Cron İşleri (Background Jobs) Altyapısı:**
    *   Performans Optimizasyonu (Materialized fields) için gerekli background job'ların (veya Neon üzerinde serverless function'ların) belirlenmesi. (Örn: `rankings.weekly_change` ve `models.popularity_score` hesaplamaları için Node.js cron ya da dış bir tetikleyici).

## Faz 2: API Katmanının Geliştirilmesi (Next.js/Express)

**Hedef:** `docs/api-contract.yaml` baz alınarak eksiksiz bir backend hizmeti sunmak.
*(Not: Şu an proje kökünde Express sunucusu başlatacak script görünmüyor; VITE konfigürasyonu istemci tarafını işaret ediyor. API'nin nerede barındırılacağı netleştirilmelidir).*

1.  **Auth Mekanizması:**
    *   Kullanıcı yetkilendirmesi, HTTP-Only Cookie-based JWT kullanılarak implemente edilecektir (Supabase gibi dış sağlayıcılar yerine). `POST /auth/register`, `POST /auth/login`, `POST /auth/logout` ve `GET /auth/me` rotaları yazılacaktır.
2.  **Veri Çekme Endpoint'leri:**
    *   `GET /dashboard/stats`
    *   `GET /dashboard/chart`
    *   `GET /models` ve `GET /models/{id}` (Filtreleme, arama ve `popularity` gibi sort opsiyonlarıyla)
    *   `GET /providers` (Models sayfasındaki dropdown için).
    *   `GET /rankings` ve `GET /rankings/highlights`.
3.  **Hata Yönetimi (Observability):**
    *   `ENGINEERING-STANDARDS.md` - Section 1 uyarınca: `shared/lib/logError.ts` entegre edilecek, tüm route'larda `try-catch` blokları içinde bu yapı kullanılacak.

## Faz 3: Frontend - Veri Katmanı ve State Yönetimi

**Hedef:** Backend'e bağlanan istemci hook'larını Feature-Sliced Design ile kurmak.

1.  **API İstemcisi ve Hook'ların Yazılması:**
    *   `features/[featureName]/api/` dizini altında merkezi fetch servisleri oluşturulacak. (Asla component içinde doğrudan fetch yapılmayacak).
    *   `features/models/hooks/useFetchModels.ts` ve `features/rankings/hooks/useFetchRankings.ts` oluşturulacak.
2.  **Global ve URL State:**
    *   Filtreleme, arama, sayfalama durumları (`ModelsPage`'deki tier/provider filtreleri) **kesinlikle** `useSearchParams` (URL) içinde yönetilecek (AGENTS.md - Kural 3).

## Faz 4: Frontend - UI Bileşenleri ve Sayfa Kompozisyonu

**Hedef:** Sayfaları `DESIGN.md` ve `PAGES.md` prensiplerine tam uygun hale getirmek.

1.  **Yeniden Kullanılabilir Bileşenler:**
    *   Rankings blueprint'inde istenen yeni component'lerin onay sonrası (veya `DESIGN.md`'ye eklenmesi şartıyla) `shared/ui` altında oluşturulması: `chart-card-scatter`, `highlight-list-item`, `cost-simulator-card`, `methodology-tile`.
    *   Bileşenlerin Tailwind sınıfları sadece `DESIGN.md`'deki tokenlar (örn: `bg-ink`, `text-muted`, `border-hairline`) ile oluşturulacak, `w-[324px]` gibi magic number'lar KULLANILMAYACAK.
2.  **Sayfa Entegrasyonu:**
    *   `ModelsPage.tsx` ve `RankingsPage.tsx` dosyaları API'den gelen dinamik verilerle (yazılan hooklar vasıtasıyla) bağlanacak.
    *   Boş state (`empty-state-block`), loading durumu (`skeleton-loader`) ve hata durumları (`error-state-block`) `DESIGN.md`'ye uygun olarak sayfalara yerleştirilecek.
3.  **Performans ve Düzen:**
    *   Grid ve max-width kurallarına uyulacak (ana taşıyıcılar `max-w-[1440px]` ortalı olacak).
    *   100'den fazla satır olan listeler (Rankings ve Models) için `TanStack Virtual` ile sanallaştırma değerlendirilecek (`ENGINEERING-STANDARDS.md` - Section 3).

## Faz 5: Test, Performans ve Lansman Hazırlığı

**Hedef:** Kalite standartlarını (DoD) sağlamak ve yayına hazırlamak.

1.  **Testlerin Yazılması:**
    *   `shared/lib` ve custom hook'lar için Vitest ile unit testler.
    *   Kritik UI bileşenleri için React Testing Library ile render testleri.
    *   Kritik akışlar (Login, Key oluşturma) için Playwright E2E.
2.  **DoD (Definition of Done) Kontrolü:**
    *   Herhangi bir dosyanın 150 satırı aşmadığından emin olunacak.
    *   `tsc --noEmit` hatasız olmalı, `any` kullanılmamış olmalı.
    *   Bundle boyutu analizi yapılacak (200KB sınır).
3.  **Git & PR Standartları:**
    *   Değişiklikler, `GIT-WORKFLOW.md` uyarınca conventional commits formatında (örn: `feat(rankings): API baglantisi kuruldu`) ve PR şablonuna sadık kalınarak gönderilecek.

---
**Durum:** Plan inceleme için sunuldu. Kullanıcı (veya Senior Engineer) onayı beklenmektedir. Onay gelmeden hiçbir implementasyon yapılmayacaktır.
