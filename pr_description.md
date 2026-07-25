## Ne değişti?
`DataTable.tsx` bileşenindeki genel arama fonksiyonunda performans artışı sağlandı. Gelen arama dizgisi (search term), iterasyon öncesinde Regex formatına (`new RegExp(escapedSearch, 'i')`) çevrildi ve `Object.values(item).some(...)` zinciri yerine `Object.values` bir diziye alınıp geleneksel (ve hızlı) bir `for` döngüsü ile test edilecek şekilde güncellendi.

## Neden?
Performans analizi (benchmark) testlerinde, 200.000 veri üzerinde yapılan aramalarda `String.prototype.toLowerCase().includes()` methodunun tekrarlı (ve büyük veri setlerinde yoğun) kullanılması performansı düşürüyordu. RegExp kullanımı ve iterator yerine standart `for` döngüsü kullanılarak arama işlevinde ~%65 oranında hız artışı elde edildi (Mevcut: ~800-850ms, Güncellenen: ~280-320ms).

## Nasıl test edildi?
Performans doğrulama aşamasında sentetik olarak oluşturulan 200.000 objelik dizilerle NodeJS ortamında `perf_hooks` (performance.now()) testleri uygulandı.
Fonksiyonel doğrulamada, obje üzerinde string dışındaki (`null`, `undefined`, sayı) alanlarda hata alınmadığı test edildi. `npm run format`, `npm run lint` ve `npm run build` üzerinden başarılı sonuç elde edildi ve React render testleri (`test-render.js`) problemsiz tamamlandı.

## DESIGN.md / AGENTS.md uyumu
* Herhangi bir UI, renk veya görsel değişiklik yapılmadı.
* TypeScript hataları önlendi ve DOM hiyerarşisi (150 satır altı vb.) bozulmadı.
* Hata kontrol mekanizmaları korundu.
* DoD kontrol listesinde belirtilen tip güvenliği, test geçişi, code styling ve formatting adımları doğrulandı.
* Geliştirme notu TESPITLER.md dosyasına eklendi.
