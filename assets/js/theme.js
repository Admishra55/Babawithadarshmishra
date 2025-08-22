// Theme + color persistence
const modeSelect = document.getElementById('modeSelect');
const colorSelect = document.getElementById('colorSelect');
function applyPrefs(){
  const mode = localStorage.getItem('mode') || 'theme-light';
  const color = localStorage.getItem('color') || 'color-red';
  document.body.classList.remove('theme-light','theme-dark','color-red','color-blue','color-yellow');
  document.body.classList.add(mode, color);
  if(modeSelect) modeSelect.value = mode;
  if(colorSelect) colorSelect.value = color;
}
applyPrefs();
modeSelect && (modeSelect.onchange = e => { localStorage.setItem('mode', e.target.value); applyPrefs(); });
colorSelect && (colorSelect.onchange = e => { localStorage.setItem('color', e.target.value); applyPrefs(); });
