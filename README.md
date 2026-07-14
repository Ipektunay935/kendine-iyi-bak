# Kendine İyi Bak 🩺

Vue 3 + Vite ile geliştirilmiş, doktor/hastane arama ve filtreleme arayüzü. Kullanıcılar branş, şehir, online randevu durumu, nöbet durumu, dil ve ödeme yöntemi gibi kriterlere göre doktor listesini filtreleyip sıralayabiliyor.

Bu proje bir staj çalışması sırasında geliştirilmiştir. Repoda yer alan doktor/hastane verileri (`src/assets/doctors.json`) **gerçek kişisel veri içermez** — sadece uygulamanın arayüzünü göstermek amacıyla üretilmiş örnek (mock) verilerdir.

## Özellikler

- Branş ve şehre göre filtreleme
- Online randevu / nöbetçi doktor filtresi
- Dil ve ödeme yöntemine göre filtreleme
- İsim, branş vb. alanlara göre sıralama
- Sayfalama (pagination)
- Mobil uyumlu (responsive) tasarım
- Pinia ile durum (state) yönetimi

## Kullanılan Teknolojiler

- [Vue 3](https://vuejs.org/) (`<script setup>` SFC)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/) — state management
- [Vue Router](https://router.vuejs.org/)
- [Heroicons](https://heroicons.com/)
- [Axios](https://axios-http.com/)
- Sass, TypeScript tipleri

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build al
npm run build

# Build'i önizle
npm run preview
```

## Proje Yapısı

```
src/
├── assets/           # Örnek (mock) doktor/hastane verisi
├── components/        # Navbar, SideBar, DoctorCard, DoctorList vb.
├── stores/             # Pinia store'ları (filtreler, doktor listesi)
├── App.vue
├── main.js
└── style.css
```

## Notlar

- Bu proje eğitim/öğrenim amaçlı geliştirilmiştir.
- `src/assets/doctors.json` içindeki tüm isim, kimlik numarası ve dahili ID'ler rastgele üretilmiştir; gerçek hiçbir kişi ya da kuruma ait veri içermez.

## Lisans

Bu proje kişisel bir öğrenme/portföy çalışmasıdır.
