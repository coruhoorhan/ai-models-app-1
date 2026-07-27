# 🤖 AGENT TASK DISTRIBUTION (İŞ DAĞILIMI)

Projenin hızla ve çakışma (merge conflict) olmadan tamamlanması için geliştirme görevleri 3 yapay zeka ajanı arasında bölünmüştür. Her ajan kendi yetki alanındaki (scope) dosyalara odaklanmalı, diğer ajanların alanına müdahale etmemelidir.

## 1. 🟢 ANTIGRAVITY (Backend, DB & Core Architecture)
**Görev Tanımı:** Sunucu (Express), Veritabanı (Prisma/Neon DB) ve projenin ana mimari yapılandırmasından sorumludur.
**Sorumluluk Alanları:**
- `src/server/*` (Express API Rotaları)
- `prisma/schema.prisma` (Veritabanı Tabloları ve İlişkileri)
- `.env` ve kimlik doğrulama/token altyapısı (JWT, API Key validasyonu).
**İlk Hedefler:**
1. `/api/models`, `/api/providers`, `/api/chat` gibi temel backend rotalarını ayağa kaldırmak.
2. Prisma şemasında eksik kalan log veya stat tablolarını tamamlamak.
3. API Hız sınırlandırması (Rate Limiting) mekanizmalarını kurmak.

## 2. 🔵 GOOGLE AI STUDIO (Chat Client & LLM Integration)
**Görev Tanımı:** Uygulamanın kalbi olan, kullanıcıların yapay zeka modelleriyle konuştuğu arayüzün (Chat Sandbox) geliştirilmesi.
**Sorumluluk Alanları:**
- `src/features/chat/*`
- `src/pages/ChatPage.tsx`
- OpenAI Uyumlu Chat Streaming (SSE) entegrasyonu (Client-side).
**İlk Hedefler:**
1. `ChatPage` arayüzünü (Sol sidebar sohbet geçmişi, sağ panel mesajlaşma alanı) `DESIGN.md` standartlarında kodlamak.
2. Kullanıcının farklı modelleri ve "Karakterleri" seçebileceği dropdown/ayarlar panelini yapmak.
3. Mesajlaşma sırasında streaming (yazarak gelme) efektini UI'a bağlamak.

## 3. 🟠 GOOGLE JULES (Data Visualization & Discoverability)
**Görev Tanımı:** Modellerin listelendiği, filtrelendiği ve analiz edildiği Dashboard, Models ve Rankings sayfalarının UI/UX geliştirmeleri.
**Sorumluluk Alanları:**
- `src/features/models/*` (Model kartları, filtreler)
- `src/features/dashboard/*` (Kullanım istatistikleri, chart'lar)
- `src/features/rankings/*` (Leaderboard tablosu)
- `src/pages/ModelsPage.tsx`, `src/pages/DashboardPage.tsx`, `src/pages/RankingsPage.tsx`
**İlk Hedefler:**
1. `ModelsPage` içine arama çubuğu ve sol panel filtrelerini (Provider, Price, Context Window) URL State (`useSearchParams`) ile entegre etmek.
2. Dashboard'da sahte verilerle bile olsa görsel olarak şık grafik (Chart) component'lerini oluşturmak.
3. Rankings sayfasında tablo (Table) component'ini yazmak ve modelleri ELO puanına göre dizecek arayüzü tasarlamak.

---

### ⚠️ Ortak Çalışma Kuralları (Tüm Ajanlar İçin)
1. **Çakışma Önleme:** Hiçbir ajan bir diğerinin klasöründe dosya düzenleyemez. Ortak UI bileşenleri (ör. yeni bir Button) gerekiyorsa, bunu Antigravity'den talep edin veya `shared/ui/` altında çok dikkatli bir şekilde, mevcut olanları ezmeden oluşturun.
2. **Commit Standartları:** Her ajan kendi branch'inde çalışmalı (`feature/chat-ui`, `feature/models-page`, `backend/api-routes`).
3. **Design System:** Yeni bir renk veya boşluk eklenecekse KESİNLİKLE `DESIGN.md` baz alınacaktır. Kendi başınıza tasarım uydurmak yasaktır.
