# 🌌 WORK_ANTIGRAVITY.md
**Agent:** Antigravity
**Role:** Senior Backend & Systems Engineer
**Focus:** Altyapı, Veritabanı (Neon DB), Express.js API, Mimari Güvenlik ve Tip Güvenliği

## 🎯 Faz A Görevleri

### 1. Veritabanı ve ORM Entegrasyonu (Neon DB + Prisma)
- `package.json` dosyasına gerekli bağımlılıkları ekle (`@prisma/client`, `prisma`, `express`, `cors`, vb.).
- `prisma/schema.prisma` dosyasını Neon DB PostgreSQL standartlarına uygun hale getir.
- `.env` içerisinden `DATABASE_URL` okuyacak şekilde Prisma Client bağlantı havuzunu ayarla.
- `npx prisma db push` ve `npx prisma generate` komutlarını çalıştırarak şemayı Neon'a bas.
- `prisma/seed.ts` yazarak ilk veritabanı tohumlamasını (modeller, sağlayıcılar) yap.

### 2. Express.js Backend API Geliştirimi
- `src/server/index.js` (veya `server.ts`) üzerinden ana Express sunucusunu ayağa kaldır.
- CORS ve Rate Limiter middleware'lerini kur.
- `GET /api/models`, `GET /api/providers`, `GET /api/dashboard/stats` gibi frontend'i besleyecek kritik RESTful endpoint'leri oluştur.
- Prisma kullanarak veritabanı sorgularını optimize et.

### 3. Mimari Borçların Kapatılması (Kural 3 ve 4 İhlalleri)
- `TESPITLER.md`'de listelenen **Kural 4 (Tip Güvenliği)** ihlallerini çöz: Proje genelindeki `any` kullanımlarını bul ve `unknown` + Type Guard veya kesin `interface` tanımları ile değiştir.
- **Kural 3 (URL State)** ihlallerini çöz: `ModelsPage` ve `DocsPage`'deki lokal filtre/sekme (useState) yapılarını silip `useSearchParams` kullanarak URL tabanlı router state mimarisine çevir.
- Yeni eklenen dosyalar için 150 satır kuralına ve `DESIGN.md` sistem kısıtlamalarına uymayı garantiye al.

## 📌 Hedef Çıktı (Definition of Done)
- Backend `localhost:3001` (veya istenen port) üzerinden hatasız çalışmalı.
- Prisma seed verileri veritabanına başarılı şekilde yazılmalı.
- Frontend'deki statik verilerin yerini API'den beslenen dinamik sistem almalı.
- Projede hiçbir `any` tipi veya URL state ihlali kalmamalı.
