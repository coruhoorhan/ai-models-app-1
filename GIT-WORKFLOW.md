# GIT-WORKFLOW.md — Commit, Test ve Merge Standartları

Bu dosya yalnızca **commit atacağın, test yazacağın veya merge/PR açacağın** anlarda okunur. `AGENTS.md`'nin genel kod üretim kurallarını tekrar etmez, sadece bu üç aşamaya özel standartları içerir.

---

## 1. Test Stratejisi

- **Unit test:** Vitest. Her custom hook (`features/*/hooks/`) ve her `shared/lib/` fonksiyonu için zorunlu.
- **Component test:** React Testing Library. Her `shared/ui/` component'i için: render doğru mu, prop değişince davranış doğru mu, a11y attribute'ları (aria-label, role) var mı.
- **E2E test:** Playwright — yalnızca kritik akışlar için (login, ödeme, API key oluşturma). Her sayfa için E2E zorunlu değil.
- **Kural:** Yeni bir bug fix yapıyorsan, önce o bug'ı reprodüklüyen bir test yaz (kırmızı), sonra fix'i yap (yeşil). Test'siz bug fix'i kabul edilmez.
- **Coverage eşiği:** `features/*/hooks/` ve `shared/lib/` için min %80. UI component'lerinde coverage zorunlu değil, davranış testi yeterli.

## 2. Commit Konvansiyonu (Conventional Commits)

Format: `tip(kapsam): kısa açıklama`

| Tip | Ne zaman kullanılır |
|---|---|
| `feat` | Yeni özellik |
| `fix` | Bug düzeltmesi |
| `refactor` | Davranış değişmeden kod yeniden yapılandırma |
| `style` | Sadece DESIGN.md/stil düzeltmesi, mantık değişmedi |
| `test` | Sadece test ekleme/düzeltme |
| `chore` | Bağımlılık güncelleme, config değişikliği |
| `docs` | Sadece .md dosya güncellemesi |

Örnek: `feat(dashboard): stat-card için secondary-stat varyantı eklendi`

- Bir commit **tek bir mantıksal değişikliği** temsil eder. "birden fazla şey" içeren commit'ler bölünür.
- Commit mesajı Türkçe veya İngilizce olabilir, proje boyunca tutarlı kalmalı — tek dil seç, karıştırma.

## 3. Branch İsimlendirme

- `feature/[kısa-açıklama]` — yeni özellik
- `fix/[kısa-açıklama]` — bug düzeltmesi
- `refactor/[kısa-açıklama]` — Faz 2 gibi yeniden yapılandırma işleri
- `chore/[kısa-açıklama]` — bağımlılık/config işleri

`main`/`master`'a doğrudan commit YASAK — her değişiklik branch + PR üzerinden gelir.

## 4. PR (Pull Request) Şablonu

Her PR açıklamasında şu 4 başlık zorunlu:

```
## Ne değişti?
[1-3 cümle]

## Neden?
[hangi task/bug'a karşılık geliyor]

## Nasıl test edildi?
[hangi testler eklendi/çalıştırıldı, manuel test adımları]

## DESIGN.md / AGENTS.md uyumu
[DoD checklist'i geçti mi — AGENTS.md Section 12'ye bak]
```

- PR **400 satırdan büyükse** review kalitesi düşer — mümkünse daha küçük parçalara böl. Büyükse PR açıklamasında neden bölünemediğini belirt.
- Screenshot/ekran kaydı: UI değişikliği varsa PR'a öncesi/sonrası görsel eklenir (light + dark mode).

## 5. Code Review Kuralı

- Self-merge yasak — en az 1 onay gerekir (tek kişilik projede: bir sonraki gün kendi PR'ını tekrar gözden geçirmeden merge etme, en az bir "soğuma" turu ver).
- Reviewer şunu kontrol eder: DoD checklist'i geçmiş mi (AGENTS.md Section 12), DESIGN.md token'ları dışında hardcoded değer var mı, test var mı.
- Review yorumları "nit:" (küçük, blocking olmayan) ve blocking (mutlaka düzeltilmeli) olarak ayrılır.

## 6. Merge Öncesi CI Gate'leri

Şunların hepsi yeşil olmadan merge fiziksel olarak engellenir:

1. `lint` — ESLint hatasız
2. `type-check` — `tsc --noEmit` hatasız, `any` taraması temiz
3. `test` — tüm unit/component testler geçiyor
4. `build` — production build hatasız tamamlanıyor
5. `line-count-check` — 150 satırı aşan dosya varsa build fail (custom script)

## 7. Merge Sonrası

- Merge edilen branch silinir.
- `TESPITLER.md`'de o task'a bağlı maddeler varsa, "çözüldü" olarak işaretlenir, tarih eklenir.
- Büyük bir refactor/faz tamamlandıysa, `AGENTS.md` içindeki ilgili faz notu (varsa) güncellenir.
