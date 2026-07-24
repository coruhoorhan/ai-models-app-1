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
