## Ne değişti

- `useModels` hook'u için Vitest ve React Testing Library tabanlı testler eklendi (`src/features/models/hooks/__tests__/useModels.test.ts`).
- Gerekli olan test ortamı bağımlılıkları (`vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`) `package.json`'a devDependency olarak eklendi.
- Vitest yapılandırma dosyası (`vitest.config.ts`) ve test setup dosyası (`src/setupTests.ts`) oluşturuldu.

## Neden

- `useModels` hook'unun davranışı (veri çekme sırasında yükleniyor durumu, başarılı veri çekme, hata yakalama, ve component unmount sonrası state güncellemelerinin önlenmesi) için güvenilir bir test ortamı sağlamak ve coverage oranını artırmak.
- Refactoring işlemleri sırasında mevcut özelliklerin bozulmasını (regression) önleyecek bir güvenlik ağı kurmak.

## Nasıl test edildi

- `npx vitest run` komutu ile oluşturulan 3 test senaryosunun (Happy Path, Error Handling, Unmount State Update Prevention) başarıyla geçtiği doğrulandı.
- Build (`npm run build`) ve lint (`npm run lint`) süreçlerinde test bağımlılıklarının veya dosyalarının herhangi bir olumsuz yan etkisi olmadığı teyit edildi.

## DESIGN.md-AGENTS.md uyumu

- Yeni bağımlılıklar eklenirken güvenlik uyarılarına dikkat edildi (hiçbir sır sızdırılmadı).
- Memory bölümünde belirtilen "Testing Strategy: Use Vitest for custom hooks" kuralına harfiyen uyuldu.
- Görev Checklist'ine uygun bir şekilde, geliştirme yapılırken mevcut feature-sliced dizin mimarisine (`features/models/hooks/__tests__`) sadık kalındı.
- Hata yönetimi (logError) ve unmount koruması (isMounted pattern) doğru şekilde mocklanarak ve test edilerek mimarinin "error-free ve scalable" olması prensibi desteklendi.
