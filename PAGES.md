# PAGES.md — Sayfa İçerik Envanteri

Bu dosya `DESIGN.md`'nin **stil** kurallarını ve `AGENTS.md`'nin **mimari** kurallarını tamamlayan üçüncü katmandır: her sayfada **tam olarak hangi öğelerin, kaç adet, hangi sırayla ve hangi metinlerle** bulunacağını tanımlar.

**Neden ayrı bir dosya:** `DESIGN.md` "stat-card nasıl görünür" der, ama "dashboard'da kaç tane stat-card var, hangi sırayla, hangi etiketlerle" demez. Bu bilgi olmadan kod ajanı sayfa yapısını tahmin eder — eksik/fazla menü, kayıp bölüm gibi sapmalar buradan doğar. Yeni bir sayfa/ekran eklerken önce bu dosyaya bir blueprint eklenir, sonra koda geçilir.

Her blueprint, `DESIGN.md`'deki component isimleriyle referans verir (`stat-card`, `card-feature`, `sidebar-nav-item` vb.) — component'in kendisi burada yeniden tanımlanmaz, sadece **hangi component'ten kaç adet, hangi içerikle** kullanılacağı belirtilir.

---

## 1. Landing Page (`/`)

### Top Navigation
- Sol: logo ikon (32×32) + wordmark
- Orta-sağ nav linkleri (`{typography.body-sm}`, uppercase): `DASHBOARD` · `MODELS` · `RANKINGS` · `PRICING` · `CHAT` · `DOCS`
- Sağ ikon kümesi (sırayla): Discord ikonu → bildirim zili → dil/bayrak → tema toggle (güneş/ay) → profil avatarı

### Hero Section
- `badge-status-live`: "ROUTER ONLINE"
- Headline: 2 satır, `{typography.hero}`, son kelime büyük siyah nokta ile bitiyor
- Paragraf: max-width 480px, `{typography.body}`
- 3 buton yan yana: `button-primary` (yıldırım ikon + "GET STARTED") · `button-secondary` ("VIEW MODELS" + sağ chevron) · `button-secondary` (chat ikon + "OPEN CHAT")
- 4 kolonlu stat satırı (dikey `{colors.hairline}` divider'larla ayrılmış): `MODELS "217" "Routable"` · `PROVIDERS "36+" "Upstreams"` · `FREE "122" "No cost"` · `PAID "95" "Pay per use"`

### Hero Sağ — Live Stats Card (`stat-card`, büyük varyant)
- Üst satır: yeşil nokta + `TOKENS SERVED` etiketi (sol), pulse ikon (sağ)
- Dev sayı: `{typography.display}` (örn. "33,548,373,527")
- Divider
- Alt: 2 kolon — `REQUESTS` + değer | `TOKENS / MIN` + değer + `badge-status-live` "Live"
- Çevresinde: 10–14 adet dağınık, hafif çakışan sağlayıcı ikon rozeti (32–40px, `rounded-full`), ince noktalı çizgilerle bağlı

### Popular Paths Bölümü
- Ortalı eyebrow: "POPULAR PATHS" + headline + alt açıklama
- 4 adet `card-feature`, eşit genişlik:
  1. `chart-green` — "Coding agents" — "OpenCode, Cline, Roo Code, Kilo Code, Zed, and more." — "View Guide"
  2. `chart-pink` — "Character & fiction clients" — "SillyTavern, Janitor.AI, Chub, and RisuAI." — "View Guide"
  3. `chart-blue` — "Chat clients" — "Desktop apps, web UIs, and generic OpenAI-compatible clients." — "View Guide"
  4. `chart-orange` — "CLI tools" — "Aider, Codex, Gemini CLI, OpenClaw, and terminal agents." — "View Guide"
- Altında `ticker-bar`: sol `badge-status-live` "LIVE INFERENCE", ortada kayan model isim listesi, sağda "TPS:" + canlı sayı

### Three Steps (Onboarding) Bölümü
- Ortalı badge: yıldırım ikon + "GET STARTED" (`chart-purple` vurgu)
- Headline: "Three steps." (siyah) + "From zero to first request." (gri), aynı satırda
- 3 kolon kart:
  1. **"Sign up"** — 3 tam genişlik buton: GitHub ikon + "Continue with GitHub" · Discord ikon + "Continue with Discord" · mail ikon + "Continue with Email"
  2. **"Top up or subscribe"** — 4 satır: tarih (sol, gri) + yatay progress bar (mor→yeşil gradient, 6px) + dolar tutarı (sağ, bold). Örnek satırlar: Free/$0, May 02/$50, Apr 18/$20, Apr 04/$10
  3. **"Get your API key"** — anahtar ikon + başlık, açıklama, `key-display-field` ("sk-••••••••••••••••" + kopyala ikonu), altında "Fully OpenAI compatible" küçük gri metin
- Altında 2 buton: `button-primary` "GET STARTED" + `button-secondary` "VIEW PRICING"

### Chat Client Showcase (50/50 split)
**Sol:** mini chat mockup (1px border, `{rounded.lg}`)
- Sidebar (200px): logo, "+ New Chat" butonu, 3 chat listesi öğesi (renkli nokta ikon + isim)
- Ana panel üst bar: model adı pill ("allam-2-7b:free" + `badge-free`) + 3-nokta menü
- Bot mesaj balonu (gri arka plan) → öneri butonu → ikinci bot yanıtı
- Sağ altta gri token sayacı: "95 in / 142 out"
- Altta input placeholder: "Type a message..."

**Sağ:**
- Mavi badge: chat ikon + "BUILT-IN CHAT"
- Headline 2 satır: "Not just an API." (siyah) / "A chat client too." (`chart-blue`)
- 2×2 küçük özellik grid: No Setup (mavi, yıldırım) · Characters (yeşil, insanlar) · Private & BYOK (mavi, kilit) · Character Chat (pembe, tiyatro maskesi)
- 2 buton: `button-primary` (chat ikon + "OPEN CHAT") + `button-secondary` "CONNECT YOUR CLIENT"

---

## 2. Dashboard (`/dashboard`)

### Sidebar (260px, sabit koyu — `{colors.sidebar}`)
- Üst: logo + wordmark, collapse toggle
- **"Menu" grubu** (`section: primary`): Dashboard (grid ikon, aktif) · API Keys (anahtar) · Usage Logs (liste) · Billing (kredi kartı) · Affiliate (hediye) · Settings (dişli)
- Divider
- **"Navigate" grubu** (`section: secondary`): Models · Rankings · Inspector · Pricing · Chat · Docs
- Alt: yeşil nokta + "Status" + external-link ikon

### Top Bar
- Sol: sidebar toggle
- Sağ: bildirim zili · dil/bayrak · tema toggle · profil ikonu

### Sayfa Başlığı
- Yeşil nokta + "DASHBOARD" (`{typography.label}`)
- "Good afternoon, [username]" (`{typography.heading-md}`)
- Sağ üst: takvim ikon + güncel tarih

### Stat Card Satırı (4 kolon, her biri `stat-card` stacked-stat varyantı)
1. **Account Data**: cüzdan ikon (yeşil) "CURRENT BALANCE" değer | trend-down ikon (kırmızı) "CONSUMPTION" değer
2. **Usage Statistics**: uçak ikon (mavi) "NUMBER OF REQUESTS" değer | hash ikon (turuncu) "STATISTICAL COUNT" değer
3. **Resource Consumption**: dolar ikon (kırmızı) "STATISTICAL QUOTA" değer | çip ikon (mavi) "STATISTICAL TOKENS" değer
4. **Performance Indicators**: gösterge ikon (yeşil) "AVERAGE RPM" değer | aktivite ikon (sarı) "AVERAGE TPM" değer

### Ana Chart Card (`card-chart`, 3/4 genişlik)
- Header: liste ikon + "Model Data Analysis" (sol) · tarih aralığı pill + yenile ikonu (sağ)
- `segmented-tab` satırı: Consumption Distribution (aktif) · Consumption Trend · Calls Distribution · Calls Ranking
- "TOTAL: $X.XX" küçük etiket
- Chart alanı: Y ekseni dolar, X ekseni zaman, tekli alan/bar (`chart-teal`)
- Legend: 3 model — `chart-teal` kare + model adı, `chart-pink` kare + model adı, `chart-blue` kare + model adı

### Side Card (1/4 genişlik, chart ile aynı yükseklik)
- Header: "<>" ikon + "API Information"
- İçerik boşsa: `empty-state-block` — sol/sağ chevron + "NO API INFORMATION"

### Alt Satır (3 eşit kart)
1. Zil ikon + "System Notice"
2. Yardım ikon + "FAQ"
3. Sinyal ikon + "Service Status" + external-link ikon (sağ üst)

---

## 3. Models Page (`/models`)

### Top Navigation
Landing Page ile birebir aynı.

### Sayfa Başlığı
- Yeşil nokta + "MODELS" (`{typography.label}`)
- "Browse all models" (`{typography.heading-md}`)
- Alt açıklama: "217 models across 36+ providers, routed through one API key." (`{typography.body}`, muted)

### Mini Stat Satırı
4 kolon, Landing'deki hero stat pattern'inin küçük versiyonu, dikey `{colors.hairline}` divider'larla ayrılmış:
- `MODELS "217"` · `PROVIDERS "36+"` · `FREE "122"` · `PAID "95"`

### Filtre / Arama Bar'ı
Tek satır, `text-input` + dropdown'lar:
- Sol: arama input'u (büyüteç ikon + placeholder "Search models...")
- Sağ: 3 dropdown filtre — Provider (Tümü/OpenAI/Anthropic/vb.) · Tier (All/Free/Paid) · Sort (Popular/Newest/Price)

### Model Listesi (`data-table`)
Kolonlar:
1. **Model** — model adı (bold) + provider adı (muted, alt satır) + varsa `badge-category` (Coding/Chat/Character uyumluluğu)
2. **Context** — örn. "128k" (monospace)
3. **Price** — "$X.XX / 1M tokens" ya da `badge-free` "Free" (monospace)
4. **Speed** — "XXX tok/s" (monospace, `chart-teal` ikon)
5. Sağ: ok/chevron ikonu (satıra tıklanınca detay açılır)

Durumlar:
- Boş sonuç: `empty-state-block` — "No models match your filters"
- Yükleniyor: `skeleton-loader` (5 satır placeholder)

### Sayfalama
Tablo altı:
- Sol: "Showing 1-20 of 217" (muted, `{typography.body-sm}`)
- Sağ: `button-tertiary` sayfa numaraları + prev/next ikon butonları

---

## Yeni Sayfa Ekleme Kuralı

Yeni bir sayfa/ekran eklerken:
1. Bu dosyaya yukarıdaki formatta bir blueprint bölümü ekle (hangi component'ten kaç adet, hangi sırada, hangi metin).
2. Blueprint'te sadece `DESIGN.md`'de tanımlı component isimlerini kullan — yeni bir görsel desen gerekiyorsa önce `DESIGN.md`'ye eklenmesi için onay iste.
3. Blueprint onaylandıktan sonra koda geç — onay öncesi kod yazılmaz (`AGENTS.md` Section 1 ile aynı prensip).

## 4. Rankings Page (`/rankings`)

### Top Navigation
Landing Page ile birebir aynı.

### Sayfa Başlığı
- Yeşil nokta + "RANKINGS" (`{typography.label}`)
- "Model Leaderboard" (`{typography.heading-md}`)
- Sağ üst: `badge-status-live` "LIVE" (skorlar canlı güncelleniyor mesajı)

### Ana Layout
2 kolonlu: sol tablo (~2/3 genişlik) + sağ dikey kart stack'i (~1/3 genişlik),
`items-start` ile üstten hizalı (DESIGN.md dashboard grid deseniyle aynı mantık).

---

## SOL: Ranking Tablosu (`data-table`, genişletilmiş varyant)

Kolonlar:
1. **SIRA** — "#1", "#2" formatında, monospace, bold. İlk 3 sıra `{colors.live}`
   veya `chart-purple` vurgulu render edilebilir (opsiyonel, onaya açık).
2. **MODEL & GELİŞTİRİCİ** — iki satırlı hücre:
   - Üst satır: model adı (bold, `{typography.body-md-bold}`) + varsa
     `badge-category` türevi bir "release" rozeti (örn. "1-Tier", "New Weights") —
     bu rozet DESIGN.md'deki `badge-new`/`badge-beta` kalıbına uyar, ayrı
     component gerekmiyor.
   - Alt satır: geliştirici adı + context boyutu, muted, `{typography.body-sm}`
     (örn. "OpenAI · 128k Context")
3. **PERFORMANS GRAFİĞİ** — yatay mini bar/sparkline, sabit genişlik+yükseklik
   (satır yüksekliği tutarlılığı için — bkz. daha önce bahsettiğimiz "biri
   aşağı biri yukarı" hatasını burada tekrar etmemek adına satır min-height
   sabit tutulmalı).
4. **SKOR / VİZ / DATE grubu** (3 alt-kolon tek başlık altında):
   - SKOR: büyük monospace sayı (örn. "1287")
   - VİZ: hız değeri, küçük monospace + "tok/s" (örn. "300 tok/s")
5. Sağ: chevron/expand ikonu (satır tıklanınca detay açılıyor, tıpkı
   Models sayfasındaki gibi)

Örnek satır verisi:
```
#1  GPT-4o (2024-08-06)  [1-Tier]     OpenAI · 128k Context     1287   300 tok/s
#2  Claude 3.5 Sonnet                 Anthropic · 200k Context  1279    49 tok/s
#3  Gemini 1.5 Pro (002)              Google · 1M Context       1261    44 tok/s
#4  Llama 3.1 405B Instruct [New]     Meta · 128k Context       1258    28 tok/s
```
Toplam 11 satır görünür, altında `button-tertiary` "Load More" / sayfalama
olabilir (Models sayfasındakiyle tutarlı olmalı).

Durumlar: `empty-state-block`, `skeleton-loader` — Models sayfasındakiyle
birebir aynı kural.

---

## SAĞ: Kart Stack'i (3 kart, dikey sırayla)

### Kart 1 — "Intelligence Hub 2030" (**COMPONENT: `chart-card-scatter`**)
- Header: başlık "Intelligence Hub 2030" + alt etiket "AKILLI ANALİZ & KIYAS"
  (`{typography.label}`) + sağda `badge-status-live` "LIVE ANALYTICS"
- `segmented-tab` (2 sekme): "Dağılım" (aktif) · "Top 8 Radar"
- Scatter/dağılım grafiği: X ekseni "Fiyat Rentabilite (log)", Y ekseni "Hız",
  her nokta bir modeli temsil ediyor, `chart-teal`/`chart-blue`/`chart-pink`
  renk kodlamasıyla (DESIGN.md data-accent paletinden)
- Altta küçük lejant: renkli nokta + kısa etiket

### Kart 2 — "Haftalık Yükseklikler" (**COMPONENT: `highlight-list-item`**)
- Header: başlık + alt etiket "EN ÇOK YÜKSELEN VE DÜŞEN MODELLER"
- Liste, her satır bir `highlight-list-item`:
  - Sol: model adı (bold) + geliştirici/context bilgisi (muted, küçük)
  - Sağ: delta rozeti (yeşil "+11", "+24" gibi pozitif değişim — negatif
    değişim olursa `{colors.error}` ile "-N" render edilir) + fiyat bilgisi
    ("$0.9 /1M", monospace, altında/yanında küçük)
- 3-4 satır örnek gösteriliyor

### Kart 3 — "API Maliyet Simülasyonu" (**COMPONENT: `cost-simulator-card`**)
- Header: başlık + alt etiket "AYLIK TOKEN HACMİ: 10 MİLYON TOKEN"
- `segmented-tab` benzeri 4'lü seçici: "1M" · "10M" (aktif) · "100M" · "1000M"
- Liste: model adı + aylık maliyet ("$62.50 /ay", monospace bold), 4-5 satır
- Alt: `button-primary` veya `button-tertiary` "Paylaş" (share ikonu ile)

---

## ALT: "Değerlendirme Metodolojisi ve Standartlar" Şeridi
Tam genişlik, 3 kolonlu, ikon + başlık + açıklama düzeni (`methodology-tile`):

1. İkon + "QA Kör Arena Testleri" — açıklama: kullanıcıların hangi modeli
   tercih ettiğini kör testlerle ölçen metodoloji açıklaması (1-2 cümle)
2. İkon + "Otomatik Benchmark Koşuları" — açıklama: standart benchmark
   setleriyle otomatik puanlama süreci (1-2 cümle)
3. İkon + "Hız ve Gecikme Metrikleri" — açıklama: tok/s ve ilk-token
   gecikmesi gibi performans ölçümlerinin nasıl yapıldığı (1-2 cümle)

# Rankings Sayfası Blueprint (`/rankings`) — TASLAK, ONAY BEKLİYOR

Bu dosya henüz `PAGES.md`'ye eklenmedi. Onaylandıktan sonra `PAGES.md` içine
"## 4. Rankings Page (`/rankings`)" başlığıyla taşınacak.

**Veri Kaynağı:** `docs/schema-design.md` — `rankings`, `models`, `providers`
tabloları. Örnek satır verisi aşağıda görsel referans amaçlıdır, gerçek veri
`GET /api/rankings` response'undan gelecektir. Hiçbir alan uydurma değildir.

**Not:** Bu sayfa 3 yeni component ihtiyacı doğuruyor —
`chart-card-scatter`, `highlight-list-item`, `cost-simulator-card`. Bunlar
DESIGN.md Component Inventory'ye eklenmeden bu blueprint'in kodu yazılamaz
(AGENTS.md Section 0 kuralı: DESIGN.md dışı component icat edilemez).
Aşağıda her biri için önerilen tanım da var — onaylarsan DESIGN.md'ye işlerim.

---

### Top Navigation
Landing Page ile birebir aynı.

### Sayfa Başlığı
- Yeşil nokta + "RANKINGS" (`{typography.label}`)
- "Model Leaderboard" (`{typography.heading-md}`)
- Sağ üst: `badge-status-live` "LIVE" (skorlar canlı güncelleniyor mesajı)

### Ana Layout
2 kolonlu: sol tablo (~2/3 genişlik) + sağ dikey kart stack'i (~1/3 genişlik),
`items-start` ile üstten hizalı (DESIGN.md dashboard grid deseniyle aynı mantık).

---

## SOL: Ranking Tablosu (`data-table`, genişletilmiş varyant)

Kolonlar:
1. **SIRA** — `rankings.rank` (monospace, bold). İlk 3 sıra `{colors.live}`
   veya `chart-purple` vurgulu render edilebilir (opsiyonel, onaya açık).
2. **MODEL & GELİŞTİRİCİ** — iki satırlı hücre:
   - Üst satır: `models.name` (bold) + varsa `models.category`'ye bağlı
     rozet (DESIGN.md `badge-new`/`badge-beta` kalıbı — "release" bilgisi
     için şemada ayrı bir alan yok, gerekiyorsa `models` tablosuna
     `release_tag` gibi bir alan eklenmesi Jules'a sorulmalı)
   - Alt satır: `providers.name` (join) + `models.context_size`
     (formatlanmış, örn. "128k Context")
3. **PERFORMANS GRAFİĞİ** — `usage_logs` üzerinden model başına zaman
   serisi (bu görselleştirme için ayrı bir agregasyon endpoint'i
   gerekebilir, kontratta yok — netleştirilmeli). Sabit genişlik+yükseklik
   (satır tutarlılığı için).
4. **SKOR / VİZ grubu**:
   - SKOR: `rankings.score` (büyük monospace sayı)
   - VİZ: `rankings.speed_viz` (küçük monospace + "tok/s")
   - (DATE sütunu şemada karşılığı yok — `rankings.created_at` kullanılabilir
     ama görselde ayrı bir sütun olarak net değildi, onay gerekiyor)
5. Sağ: chevron/expand ikonu

Örnek satır verisi (görselden, referans amaçlı — gerçek veri Faz 0 keşfinden
gelecek):
```
#1  GPT-4o (2024-08-06)  [1-Tier]     OpenAI · 128k Context     1287   300 tok/s
#2  Claude 3.5 Sonnet                 Anthropic · 200k Context  1279    49 tok/s
#3  Gemini 1.5 Pro (002)              Google · 1M Context       1261    44 tok/s
#4  Llama 3.1 405B Instruct [New]     Meta · 128k Context       1258    28 tok/s
```
Toplam 11 satır görünür, altında `button-tertiary` "Load More" / sayfalama
olabilir (Models sayfasındakiyle tutarlı olmalı).

Durumlar: `empty-state-block`, `skeleton-loader` — Models sayfasındakiyle
birebir aynı kural.

---

## SAĞ: Kart Stack'i (3 kart, dikey sırayla)

### Kart 1 — "Intelligence Hub 2030" (**YENİ COMPONENT: `chart-card-scatter`**)
- Header: başlık "Intelligence Hub 2030" + alt etiket "AKILLI ANALİZ & KIYAS"
  (`{typography.label}`) + sağda `badge-status-live` "LIVE ANALYTICS"
- `segmented-tab` (2 sekme): "Dağılım" (aktif) · "Top 8 Radar"
- Scatter/dağılım grafiği: X ekseni `models.price_per_1m` (log ölçek),
  Y ekseni `rankings.speed_viz` veya `models.speed_tok_s`, her nokta
  bir `models.id`'yi temsil ediyor, `chart-teal`/`chart-blue`/`chart-pink`
  renk kodlamasıyla (kategori/provider'a göre — DESIGN.md data-accent
  paletinden)
- Altta küçük lejant: renkli nokta + kısa etiket

**Önerilen component tanımı (DESIGN.md'ye eklenecek):**
```
chart-card-scatter — card-chart'ın scatter/radar varyantı.
Aynı chrome (border, radius, padding), farklı olarak segmented-tab ile
2 görselleştirme modu arasında geçiş yapabiliyor. Chart data-accent
paletini kullanır, eksen etiketleri {typography.caption}.
```

### Kart 2 — "Haftalık Yükseklikler" (**YENİ COMPONENT: `highlight-list-item`**)
- Header: başlık + alt etiket "EN ÇOK YÜKSELEN VE DÜŞEN MODELLER"
- Liste, her satır bir `highlight-list-item`:
  - Sol: `models.name` (bold) + `providers.name`/`models.context_size`
    (muted, küçük)
  - Sağ: `rankings.weekly_change` delta rozeti (pozitifse yeşil "+N",
    negatifse `{colors.error}` ile "-N") + `models.price_per_1m`
    (monospace, muted, örn. "$0.9 /1M")
- 3-4 satır örnek gösteriliyor — gerçek veri `GET /api/rankings/highlights`
  endpoint'inden (zaten kontratta tanımlı), `rankings.weekly_change`
  mutlak değerine göre sıralanmış TOP N kayıt

**Önerilen component tanımı:**
```
highlight-list-item — tek satırlık liste öğesi.
Sol: iki satırlı model bilgisi (isim + context). Sağ: delta badge
(yeşil pozitif / kırmızı negatif, {typography.caption-bold}, rounded-xs)
+ fiyat metni (monospace, muted). Border yok, sadece satır arası
{colors.hairline-soft} ayraç.
```

### Kart 3 — "API Maliyet Simülasyonu" (**YENİ COMPONENT: `cost-simulator-card`**)
- Header: başlık + alt etiket "AYLIK TOKEN HACMİ: 10 MİLYON TOKEN"
- `segmented-tab` benzeri 4'lü seçici: "1M" · "10M" (aktif) · "100M" · "1000M"
- Liste: `models.name` + hesaplanan aylık maliyet (`models.price_per_1m`
  × seçilen token hacmi, client-side veya backend'de hesaplanır — bu
  endpoint kontratta yok, "AYLIK TOKEN HACMİ" seçiciyle birlikte yeni bir
  `GET /api/models/cost-estimate?volume=` endpoint'i gerekebilir, Jules'a
  sorulmalı), 4-5 satır
- Alt: `button-primary` veya `button-tertiary` "Paylaş" (share ikonu ile)

**Önerilen component tanımı:**
```
cost-simulator-card — card-chart benzeri chrome, ama tab yerine 4'lü
segmented-selector (token hacmi seçimi) kullanıyor. Liste öğeleri
highlight-list-item'a benzer ama delta yerine sabit fiyat gösteriyor.
```

---

## ALT: "Değerlendirme Metodolojisi ve Standartlar" Şeridi
Tam genişlik, 3 kolonlu, ikon + başlık + açıklama düzeni (DESIGN.md'deki
`ai-product-tile`/`feature-tile` mantığına benzer, ama bordersiz/daha sade —
onaya açık, mevcut `card-feature` de kullanılabilir):

1. İkon + "QA Kör Arena Testleri" — açıklama: kullanıcıların hangi modeli
   tercih ettiğini kör testlerle ölçen metodoloji açıklaması (1-2 cümle)
2. İkon + "Otomatik Benchmark Koşuları" — açıklama: standart benchmark
   setleriyle otomatik puanlama süreci (1-2 cümle)
3. İkon + "Hız ve Gecikme Metrikleri" — açıklama: tok/s ve ilk-token
   gecikmesi gibi performans ölçümlerinin nasıl yapıldığı (1-2 cümle)

---

## Onay Durumu
- [ ] 3 yeni component tanımı (`chart-card-scatter`, `highlight-list-item`,
      `cost-simulator-card`) DESIGN.md'ye eklensin mi, yoksa mevcut
      component'lerle (örn. `card-chart` + `data-table` kombinasyonu)
      idare edilsin mi?
- [ ] Tabloda gerçekten ayrı bir "DATE" sütunu var mı, yoksa SKOR/VİZ
      grubunun bir parçası mı — ekran görüntüsünü tekrar kontrol etmek
      gerekebilir.
- [ ] İlk 3 sıraya özel vurgu (altın/gümüş/bronz gibi) istiyor musun, yoksa
      tüm satırlar nötr mü kalsın?
- [ ] Metodoloji şeridi `card-feature` ile mi yapılsın, yoksa bordersiz yeni
      bir `methodology-tile` component'i mi tanımlansın?

## Netleştirilmesi Gereken Kontrat Eksikleri (Jules'a sorulmalı)
- [ ] "Release" rozeti (1-Tier/New Weights gibi) için `models` tablosunda
      ayrı bir alan yok — eklenmeli mi?
- [ ] Performans grafiği sparkline'ı için zaman serisi agregasyon endpoint'i
      kontratta yok.
- [ ] Maliyet simülatörü için `GET /api/models/cost-estimate?volume=` gibi
      bir endpoint kontratta yok, eklenmeli mi yoksa hesaplama client-side
      mi yapılacak (models.price_per_1m zaten response'da varsa client
      tarafında çarpma işlemi yeterli olabilir, ekstra endpoint gerekmez).

Onaylandıktan sonra bu blueprint `PAGES.md`'ye taşınır, yeni component'ler
varsa DESIGN.md'ye işlenir, kontrat eksikleri Jules'a Faz 2 kapsamında
sorulur.
