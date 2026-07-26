## 2026-07-26 - [Insecure Session Management - LocalStorage Auth Token]
**Vulnerability:** Kimlik doğrulama token'ları (unorouter_token) `localStorage` üzerinde düz metin (plaintext) olarak saklanıyordu.
**Learning:** React/SPA projelerinde token'ların `localStorage`'da saklanması yaygın bir hatadır. Bu durum, olası bir XSS (Cross-Site Scripting) zafiyetinde saldırganların JavaScript ile token'ları okuyup kullanıcı oturumlarını çalmasına neden olur.
**Prevention:** Her zaman backend tabanlı ve HTTP-Only, Secure flag'leri ayarlanmış Cookie'ler ile session yönetimi kullanılmalıdır. İstemci tarafı kodları doğrudan session token'larına erişmemelidir.
