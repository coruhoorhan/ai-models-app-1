# ENGINEERING-STANDARDS.md — Observability, Security, Performance, Docs

Bu dosya belirli anlarda okunur — her biri kendi başlığında ne zaman devreye gireceğini belirtir. `AGENTS.md`'nin genel kurallarını tekrar etmez.

---

## 1. Observability / Error Tracking
*Ne zaman okunur: bir API çağrısı, async işlem veya error boundary yazarken.*

- **Hata yakalama:** Her `try/catch` bloğunda hata sessizce yutulmaz. Konsola `console.error` yeterli değildir — production'da bir hata izleme servisine (örn. Sentry) gönderilecek şekilde merkezi bir `logError(error, context)` fonksiyonu kullanılır (`shared/lib/logError.ts`).
- **Context zenginliği:** Hata loglanırken hangi feature, hangi kullanıcı aksiyonu, hangi API endpoint olduğu bilgisi eklenir — çıplak stack trace tek başına yeterli değildir.
- **Kullanıcıya gösterilen mesaj ile loglanan mesaj ayrıdır:** Kullanıcı `error-state-block` (DESIGN.md) ile sade bir mesaj görür; teknik detay yalnızca log'a gider.
- **Performans metrikleri:** Sayfa yüklenme süresi, API yanıt süresi gibi kritik metrikler için `shared/lib/metrics.ts` üzerinden merkezi bir ölçüm noktası kullanılır — component içine serpiştirilmiş `performance.now()` çağrıları yasaktır.
- **Kritik akışlar** (login, ödeme, API key oluşturma) için özel event logu tutulur — bu akışlarda bir adım başarısız olursa hangi adımda koptuğu net olmalı.

## 2. Security Checklist
*Ne zaman okunur: yeni bir bağımlılık eklerken, form/input yazarken, API endpoint açarken.*

- **Bağımlılık denetimi:** Yeni bir npm paketi eklenmeden önce `npm audit` çalıştırılır; yüksek/kritik seviye açığı olan paket eklenmez (alternatifi aranır).
- **Input sanitization:** Kullanıcıdan gelen hiçbir veri doğrudan `dangerouslySetInnerHTML` veya benzeri ham render yöntemiyle basılmaz. XSS riski olan her input noktası işaretlenir.
- **API key/secret:** `AGENTS.md` Section 8 ile aynı kural burada da geçerli — asla client tarafına sızdırılmaz. Ek olarak: `.env` dosyaları `.gitignore`'da olmalı, hiçbir secret commit geçmişinde yer almamalı.
- **Rate limiting:** Kullanıcı girişli her API endpoint'i (özellikle login, arama, form submit) rate limit'e sahip olmalı — brute-force ve spam koruması.
- **CORS/CSP:** Backend tarafında CORS yalnızca gerekli origin'lere açılır (`*` kullanımı yasak). Content-Security-Policy header'ı tanımlanır.
- **Auth kontrolü:** Her korumalı route/endpoint'te auth kontrolü component/middleware seviyesinde merkezi yapılır — her sayfaya ayrı ayrı auth kontrolü kopyalanmaz.

## 3. Performance Budget
*Ne zaman okunur: yeni bir sayfa/route eklerken, büyük bir kütüphane import ederken.*

- **Bundle boyutu:** Hiçbir route-level JS chunk'ı 200KB (gzip) sınırını aşamaz. Aşıyorsa `React.lazy` + `Suspense` ile code-splitting uygulanır.
- **Görsel optimizasyonu:** Tüm görseller WebP/AVIF formatında, `loading="lazy"` ile (above-the-fold hariç) sunulur.
- **Ağır kütüphane kontrolü:** Yeni bir kütüphane (chart, animasyon, editör vb.) eklemeden önce bundle-size etkisi kontrol edilir (`bundlephobia` mantığı) — 50KB üstü kütüphaneler için gerekçe belirtilir.
- **Liste sanallaştırma:** 100+ satırlık herhangi bir liste/tablo `TanStack Virtual` ile sanallaştırılır (AGENTS.md Section 9'daki proaktiflik kuralıyla örtüşür).
- **Lighthouse eşiği:** Performans skoru minimum 90 hedeflenir; yeni bir sayfa bu eşiğin altına düşürüyorsa merge öncesi optimize edilir.
- **Font yükleme:** `font-display: swap` zorunlu, gereksiz font-weight varyantı yüklenmez (yalnızca DESIGN.md'de tanımlı 400/500/600/700 ağırlıkları).

## 4. Documentation-as-Code
*Ne zaman okunur: yeni bir shared/ui component'i veya yeni bir API endpoint eklerken.*

- **Component dokümantasyonu:** `shared/ui/` altına eklenen her component için kısa bir kullanım örneği component dosyasının üstünde JSDoc yorumu olarak yazılır (ayrı bir Storybook kurulmuyorsa minimum budur; proje büyürse Storybook'a geçilebilir).
- **API dokümantasyonu:** Backend endpoint'i eklendiğinde `docs/api/[endpoint].md` içine İstek/Yanıt şeması, hata kodları eklenir.
- **README güncelliği:** Kök `README.md`, projeye yeni bir çalıştırma adımı (yeni env variable, yeni servis bağımlılığı) eklendiğinde aynı PR içinde güncellenir — "sonra güncelleriz" yasak.
- **Değişiklik geçmişi:** `DESIGN.md` veya `AGENTS.md`'de bir kural değiştiğinde, dosyanın en altına kısa bir "Son Güncelleme" notu eklenir (tarih + ne değişti, 1 satır).
