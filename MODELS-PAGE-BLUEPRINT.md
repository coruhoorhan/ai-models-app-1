# Models Sayfası Blueprint (`/models`) — ONAYLANDI, GERÇEK ŞEMAYA BAĞLI

**Veri Kaynağı:** `docs/schema-design.md` — `models` ve `providers` tabloları.
Hiçbir alan mockup/uydurma değildir, hepsi gerçek şemadaki kolonlara karşılık gelir.

---

### Top Navigation
Landing Page ile birebir aynı — `PAGES.md`'deki Landing Page bölümüne referans.

### Sayfa Başlığı
- Yeşil nokta + "MODELS" (`{typography.label}`)
- "Browse all models" (`{typography.heading-md}`)
- Alt açıklama: dinamik — `COUNT(models)` ve `COUNT(DISTINCT providers)` 
  sorgusundan gelen gerçek sayılarla: "{{model_count}} models across 
  {{provider_count}} providers, routed through one API key."

### Mini Stat Satırı — Kaynak: `GET /api/dashboard/stats` veya ayrı bir 
`GET /api/models/stats` endpoint'i (Jules'a Faz 2'de bu endpoint'in eksik 
olup olmadığını sordurmak gerekebilir — api-contract.yaml'da bu spesifik 
endpoint yoktu, sadece dashboard/stats vardı)
4 kolon, dikey `{colors.hairline}` divider'larla:
- `MODELS` → `COUNT(models.id)`
- `PROVIDERS` → `COUNT(DISTINCT models.provider_id)`
- `FREE` → `COUNT(models.id) WHERE models.is_free = true`
- `PAID` → `COUNT(models.id) WHERE models.is_free = false`

### Filtre / Arama Bar'ı — Kaynak: `GET /api/models?search=&provider=&tier=&sort=`
(api-contract.yaml'da zaten tanımlı)
- Arama: `models.name` üzerinde ILIKE/full-text search
- Provider filtresi: `providers.name` listesinden dropdown (dinamik, 
  hardcoded liste DEĞİL — `GET /api/providers` gibi bir endpoint 
  gerekebilir, şu an kontratta yok, kontrol edilmeli)
- Tier filtresi: `models.is_free` boolean üzerinden (All/Free/Paid)
- Sort: `models.price_per_1m`, `models.speed_tok_s`, veya `models.created_at`
  (Popular/Newest/Price seçenekleri buna map'lenir — "Popular" için ayrı 
  bir metrik gerekebilir, örn. `usage_logs` üzerinden model başına 
  request sayısı — bu da kontratta yok, netleştirilmeli)

### Model Listesi (`data-table`) — Kaynak: `GET /api/models` response array'i
Kolonlar ve gerçek şema karşılığı:
1. **Model** — `models.name` (bold) + `providers.name` (join üzerinden, 
   muted alt satır) + `models.category` değeri `badge-category` olarak 
   render edilir (Coding/Chat/Character enum değerleri)
2. **Context** — `models.context_size` (örn. 128000 → "128k" formatlanır)
3. **Price** — `models.price_per_1m` (örn. "$X.XX / 1M tokens") ya da 
   `models.is_free = true` ise `badge-free` "Free"
4. **Speed** — `models.speed_tok_s` (örn. "300 tok/s")
5. Sağ: chevron ikonu — tıklanınca model detayı (henüz ayrı bir 
   `GET /api/models/:id` endpoint'i kontratta tanımlı değil, gerekiyorsa 
   Jules'a eklettirilmeli)

Durumlar: `empty-state-block`, `skeleton-loader` — response boşsa/
yükleniyorsa.

### Sayfalama — `GET /api/models` response'undaki `total`/`page`/`pageSize` 
meta bilgisinden:
- Sol: "Showing {{from}}-{{to}} of {{total}}"
- Sağ: `button-tertiary` sayfa numaraları + prev/next

---

## Netleştirilmesi Gereken Kontrat Eksikleri (Jules'a sorulmalı)
- [ ] `GET /api/providers` — filtre dropdown'u için dinamik provider 
      listesi endpoint'i kontratta yok, eklenmeli.
- [ ] "Popular" sıralaması hangi metriğe dayanacak — `usage_logs` 
      üzerinden agregasyon mu, yoksa `models` tablosunda ayrı bir 
      `popularity_score` alanı mı gerekiyor?
- [ ] Model detay sayfası/modalı olacaksa `GET /api/models/:id` 
      endpoint'i eklenmeli.

