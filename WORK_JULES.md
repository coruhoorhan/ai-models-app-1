# 🤖 WORK_JULES.md
**Agent:** Google Jules
**Role:** Senior Frontend & Design Systems Engineer
**Focus:** UI Refactoring, Component Composition, Tasarım Sistemi Standardizasyonu (DESIGN.md)

## 🎨 Faz B Görevleri

### 1. Dosya Uzunluğu ve Karmaşıklık İhlalleri (Kural 1)
- Projedeki 150 satırı aşan büyük dosyaları tespit et (Örn: `ChatWorkspace.tsx`, `DashboardRouterInspector.tsx`).
- Bu dosyaları Single Responsibility (Tek Sorumluluk) prensibine göre mantıklı `Presentational` alt bileşenlere (sub-components) böl.
- Prop drilling (çok derin prop geçişleri) yaratmadan Component Composition (`children` prop veya Context) stratejilerini uygula.

### 2. Magic Number ve Tasarım Standardı Temizliği (Kural 7)
- Kod tabanında manuel yazılmış padding/margin (`p-[18px]`, `gap-5`), sabit renkler (`text-[#fff]`, `bg-blue-500`) veya sabit genişlikleri (`w-[324px]`) tara.
- Tüm bu aykırı değerleri `DESIGN.md` ve `tailwind.config.ts` ile uyumlu standart token'lara (`p-md`, `gap-sm`, `text-ink`, `bg-live`) dönüştür.
- Kural 13'te belirtilen `max-w-[1440px]` ve `mx-auto` merkezleme zorunluluklarının tüm sayfalarda eksiksiz uygulandığından emin ol.
- Skeleton loader ve Error block UI durumlarını tasarla (yükleniyor metni yerine).

### 3. Frontend Servis Entegrasyonu (SWR & Custom Hooks)
- `shared/api` veya feature bazlı `api` katmanında bulunan mock (sahte) verileri, Antigravity'nin hazırlayacağı Express API'ye (`/api/...`) bağla.
- SWR veya React Query benzeri hook'lar (`useFetchModels`, `useDashboardStats`) yazarak yükleme, hata ve caching durumlarını yönet (Kural 3/5).
- Bileşenlerin içinde doğrudan `fetch` veya `axios` kullanımlarını engelle, servis izolasyonunu koru.

## 📌 Hedef Çıktı (Definition of Done)
- Hiçbir `.tsx` dosyası 150 satırı geçmemeli.
- Projede hardcoded hiçbir Tailwind veya CSS stili kalmamalı; her şey `DESIGN.md` token sistemine entegre olmalı.
- Tüm veriler API'den başarılı şekilde akmalı, API çağrıları izole hook'larda yönetilmeli.
