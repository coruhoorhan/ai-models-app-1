# 🧠 WORK_AI_STUDIO.md
**Agent:** Google AI Studio
**Role:** AI Engineer & LLM Orchestrator
**Focus:** @google/genai Entegrasyonu, Arena Battle Algoritmaları, Prompt Engineering & Tuning

## ⚡ Faz C Görevleri

### 1. Gerçek LLM Entegrasyonu (Gemini API)
- `src/features/chat/components/ChatWorkspace.tsx` bileşenindeki mock/simüle edilmiş yapay zeka yanıt motorunu kaldır.
- Mevcut `package.json` içindeki `@google/genai` kütüphanesini kullanarak, chat arayüzünü gerçek bir Gemini LLM modeline (örn. `gemini-1.5-pro` veya `gemini-1.5-flash`) bağla.
- API Key güvenliğini sağlamak için istemci (client-side) üzerinden değil, Antigravity'nin hazırlayacağı güvenli proxy backend üzerinden veya güvenli Server-Side mantığı üzerinden anahtar erişimi ayarla.
- Streaming (akış) desteğini kurarak AI yanıtlarının daktilo gibi ekrana basılmasını (canlı UX) gerçek API stream yetenekleriyle sağla.

### 2. Arena Battle Simulator Mantığı
- `RankingsPage` veya Dashboard'da bulunan yarışma (Arena Battle) ekranındaki modellerin gerçek zamanlı olarak API üzerinden yarışmasını kurgula.
- Hız, First Byte Latency (ilk bayt gecikmesi) ve Tokens per Second (saniyedeki jeton sayısı) ölçümlerini gerçek telemetri/istek süresi mantığı ile ölç.
- Model yanıtlarını kıyaslarken adil yarışma kurgusunu ve Elo hesaplaması altyapısını sistem mühendisliğine dök.

### 3. Prompt Engineering ve Optimizasyon (Tuning)
- Chat Studio içindeki "1-tıkla hazır mühendislik şablonları" (Code Optimization, System Instructions vs.) için gelişmiş sistem prompt'larını tasarla.
- UI'daki Temperature, Max Tokens, Top-P, Top-K kontrollerinden gelen verileri tam ve doğru parametre formatlarında Gemini SDK API uçlarına bağla.
- Uygulamanın kullanım senaryolarına özel (örneğin sadece kod asistanı olarak davranması) gelişmiş context yönergeleri oluştur.

## 📌 Hedef Çıktı (Definition of Done)
- Uygulama, mock bir sohbet ekranından çıkarak tamamen fonksiyonel, gerçek API istekleri yapabilen bir LLM platformu haline gelmeli.
- Stream akışı, latency göstergeleri ve prompt ayarlamaları eksiksiz, hatasız çalışmalı.
