# 🤖 AGENT TASK DISTRIBUTION (İŞ DAĞILIMI) - GÜNCELLENDİ

Projenin hızla ve çakışma (merge conflict) olmadan tamamlanması için geliştirme görevleri **Antigravity** ve **Google Jules** arasında bölünmüştür. (Google AI Studio görevden alınmış, sorumlulukları Antigravity'ye aktarılmıştır.)

## 1. 🟢 ANTIGRAVITY (Backend, Core & Chat UI)
**Görev Tanımı:** Sunucu mimarisi, veritabanı, LLM API rotaları ve en kritik UI parçası olan Chat Sandbox arayüzü.
**Sorumluluk Alanları:**
- `src/server/*` ve `prisma/schema.prisma` (Backend)
- `.env` ve kimlik doğrulama/API Key altyapısı.
- `src/features/chat/*` ve `src/pages/ChatPage.tsx` (Eski AI Studio görevleri)
**İlk Hedefler:**
1. Backend ve Prisma veritabanı mimarisini sorunsuz çalıştırmak (TAMAMLANDI).
2. `ChatPage` arayüzünü (Sol sidebar sohbet geçmişi, sağ panel mesajlaşma alanı) `DESIGN.md` standartlarında "WOW" dedirtecek şekilde kodlamak.

## 2. 🟠 GOOGLE JULES (Data Visualization & Discoverability)
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
### ⚠️ Ortak Çalışma Kuralları (Antigravity & Jules İçin)
1. **Çakışma Önleme:** Hiçbir ajan bir diğerinin klasöründe dosya düzenleyemez. 
2. **Commit Standartları:** Her ajan kendi branch'inde çalışmalı. Jules kendi geliştirmelerini tamamlayıp PR açmalı veya ayrı bir branch'e (ör. `feature/jules-dashboard`) pushlamalı.
3. **Design System:** Yeni bir renk veya boşluk eklenecekse KESİNLİKLE `DESIGN.md` baz alınacaktır. Kendi başınıza tasarım uydurmak yasaktır.
