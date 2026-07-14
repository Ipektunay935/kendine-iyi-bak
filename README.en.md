# Kendine İyi Bak 🩺

🇹🇷 *[Bu README'yi Türkçe okuyun](README.md)*

A doctor/hospital search and filtering interface built with Vue 3 + Vite. Users can filter and sort the doctor list by specialty, city, online appointment availability, on-call status, language, and payment method.

This project was built during an internship. The doctor/hospital data included in this repo (`src/assets/doctors.json`) **does not contain any real personal data** — it is synthetic (mock) data generated solely to demonstrate the UI.

## Features

- Filter by medical specialty and city
- Filter by online-appointment availability / on-call doctors
- Filter by language and payment method
- Sort by name, specialty, etc.
- Pagination
- Responsive (mobile-friendly) layout
- State management with Pinia

## Tech Stack

- [Vue 3](https://vuejs.org/) (`<script setup>` SFC)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/) — state management
- [Vue Router](https://router.vuejs.org/)
- [Heroicons](https://heroicons.com/)
- [Axios](https://axios-http.com/)
- Sass, TypeScript types

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
src/
├── assets/           # Sample (mock) doctor/hospital data
├── components/        # Navbar, SideBar, DoctorCard, DoctorList, etc.
├── stores/             # Pinia stores (filters, doctor list)
├── App.vue
├── main.js
└── style.css
```

## Notes

- This project was built for learning purposes.
- All names, ID numbers, and internal identifiers in `src/assets/doctors.json` are randomly generated; none of it belongs to any real person or organization.

## License

This is a personal learning/portfolio project.
