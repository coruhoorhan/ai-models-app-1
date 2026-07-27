## Ne değişti?
[1-3 cümle]

## Neden?
[hangi task/bug'a karşılık geliyor]

## Nasıl test edildi?
[hangi testler eklendi/çalıştırıldı, manuel test adımları]

## DESIGN.md / AGENTS.md uyumu
[DoD checklist'i geçti mi — AGENTS.md Section 12'ye bak]
- [ ] Hiçbir dosya 150 satırı geçmiyor.
- [ ] `any` kullanımı yok; tüm `unknown` kullanımları type-guard ile korunmuş.
- [ ] Filtre/sayfalama/sekme durumları URL state'te (`useSearchParams`).
- [ ] Component, `DESIGN.md` Component Inventory'deki ilgili prop arayüzüne birebir uyuyor.
- [ ] Hiçbir hardcoded renk/font-size/spacing/radius yok.
- [ ] Loading durumu `skeleton-loader`, boş durum `empty-state-block` ile karşılanmış.
- [ ] Işık/karanlık (light/dark) her iki temada da görsel olarak test edilmiş.
- [ ] Form elemanlarında `id`/`htmlFor` eşleşmesi, tıklanabilir ikonlarda `aria-label` mevcut.
- [ ] İkonlar yalnızca `lucide-react`'ten.
- [ ] Dosya/hook/component isimleri standarda uygun.
- [ ] Yeni bir renk/component icat edildiyse onay alınmış.
- [ ] Yeni bağımlılık eklendiyse `npm audit` çalıştırılmış.
- [ ] Hata yönetimi merkezi `logError` üzerinden geçiyor.
