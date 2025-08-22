
# BabaturantnathMandir (v7)

**फीचर्स:** 50 आरती + 50 भजन (टेक्स्ट), 5 डेमो ऑडियो, दान (CSV Export), कम्युनिटी (Admin PIN: 1080), YouTube Live embed, हिन्दी पंचांग, थीम (Light/Dark + रंग), PWA + Service Worker (ऑफ़लाइन), मोबाइल मेन्यू, 🕉 Loader।

## कैसे चलाएँ
1. इस फ़ोल्डर को GitHub repo में push करें।
2. GitHub → Settings → Pages → Source: *Deploy from a branch* → Branch: `main` → `/root` → **Save**.
3. जो HTTPS URL मिले उसे WebToApk में डालें → APK बनाएं।

## अपनी ऑडियो कैसे जोड़ें
- `assets/audio/` में अपनी फाइलें रखें: `aarti_001.mp3` … `aarti_005.mp3` (या और भी जोड़ें)
- `assets/data/aarti.json` में जिन items में `audio` path दिया है वे प्ले होंगे। आप entries बढ़ा सकते हैं।

## Offline
- `sw.js` सारी ज़रूरी files cache करता है। पहली बार इंटरनेट से खुलने के बाद ऑफ़लाइन 100% काम करेगा।

## Local Admin
- कम्युनिटी पोस्ट हटाने के लिए PIN: **1080**।
- YouTube live देखने के लिए होम पर Channel ID सेव करें।

— Generated 2025-08-22
