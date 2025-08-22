# 🕉 BabaturantnathMandir — V9 (Offline PWA)

यह build GitHub Pages + WebToApk के लिए तैयार है।
- 10 पूरी आरतियाँ + 10 पूरे भजन (assets/data/*.json, offline)
- 5 demo audio placeholders (assets/audio)
- Donation (CSV export), Community (Admin PIN 1080)
- Hindi Panchang (sample)
- YouTube Live (assets/js/app.js में चैनल ID बदलें)
- Themes: Light/Dark + Red/Blue/Yellow (localStorage)
- Responsive Navbar (hamburger)
- Service Worker (offline) + Manifest (PWA)
- 404 redirect (GitHub Pages)

## Deploy (GitHub Pages)
1) Repo बनाएं और ये files root में रखें
2) Settings → Pages → Deploy from a branch → main / root → Save
3) URL को WebToApk में डालें

## Content
- `assets/data/aarti.json` में और आरती जोड़ें (audio key optional)
- `assets/data/bhajan.json` में और भजन जोड़ें
- Audio `assets/audio/` में रखें और JSON में नाम दें (e.g. "audio": "aarti_006.mp3")
