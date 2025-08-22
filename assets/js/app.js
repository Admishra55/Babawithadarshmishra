// Responsive nav toggle + YouTube live + loader
function toggleMenu(){ const nav = document.getElementById('navLinks'); if(nav) nav.classList.toggle('show'); }

// Live
const YT_CHANNEL_ID = 'YOUR_CHANNEL_ID';
const liveFrame = document.getElementById('liveFrame');
if(liveFrame){ liveFrame.src = `https://www.youtube.com/embed/live_stream?channel=${YT_CHANNEL_ID}`; }
