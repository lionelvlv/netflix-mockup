/* ============================================================
   STREAMLINE — Enterprise Media Catalog
   Application Logic
   ============================================================ */

'use strict';

// ─── DATA ─────────────────────────────────────────────────────────────

const PROFILES = [
  { id: 'p1', name: 'Lionel',  init: 'LB', bg: '#1a2540' },
  { id: 'p2', name: 'Alex',    init: 'AK', bg: '#1a3020' },
  { id: 'p3', name: 'Jordan',  init: 'JM', bg: '#2d1a1a' },
  { id: 'p4', name: 'Guest',   init: '?',  bg: '#252830' },
];

const MOODS = [
  { id: 'all',       label: 'All',       accent: '#2D7DF4', glow: 'rgba(45,125,244,0.15)' },
  { id: 'chill',     label: 'Chill',     accent: '#3b82f6', glow: 'rgba(59,130,246,0.15)' },
  { id: 'intense',   label: 'Intense',   accent: '#e05252', glow: 'rgba(224,82,82,0.15)'  },
  { id: 'nostalgic', label: 'Nostalgic', accent: '#d97706', glow: 'rgba(217,119,6,0.15)'  },
];

// Updated at dates to reinforce enterprise tone
const TITLES = [
  {
    id: 't1', t: 'Echoes of Titan',    y: 2023, m: 96, r: 'PG-13', rt: '2h 18m',
    g: ['Sci-Fi','Thriller'],
    s: 'A lone engineer uncovers a conspiracy buried beneath the moon of Titan that could rewrite human history.',
    c: ['Maya Chen','Idris Volta','Sasha Merritt'],
    e: '🛰', updated: '2 days ago',
    bg: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900&q=75',
    moods: ['intense','chill'],
  },
  {
    id: 't2', t: 'Neon Requiem',        y: 2022, m: 91, r: 'R',     rt: '1h 52m',
    g: ['Neo-Noir','Drama'],
    s: 'In a rain-soaked megacity, a disgraced detective takes one final case that pulls her into the city\'s darkest underworld.',
    c: ['Vera Nakamura','Cal Draven','Lena Solis'],
    e: '🌆', updated: '5 days ago',
    bg: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=900&q=75',
    moods: ['intense','nostalgic'],
  },
  {
    id: 't3', t: 'The Quiet Atlas',     y: 2024, m: 88, r: 'PG',    rt: '1h 44m',
    g: ['Drama','Romance'],
    s: 'Two cartographers mapping uncharted islands fall in love in the last truly wild corner of the world.',
    c: ['Elena Frost','Marcus Bell'],
    e: '🗺', updated: '1 week ago',
    bg: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=75',
    moods: ['chill','nostalgic'],
  },
  {
    id: 't4', t: 'Fracture Point',      y: 2023, m: 94, r: 'R',     rt: '2h 05m',
    g: ['Action','Thriller'],
    s: 'A hostage negotiator must outwit a mastermind who has rigged a city-wide trap — with no room for error.',
    c: ['Dante Rush','Sofia Park','Eliot Weiss'],
    e: '💥', updated: '3 days ago',
    bg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=75',
    moods: ['intense'],
  },
  {
    id: 't5', t: 'Salt & Starlight',    y: 2021, m: 87, r: 'PG-13', rt: '1h 38m',
    g: ['Comedy','Romance'],
    s: 'A Michelin-star chef loses everything and finds herself reinventing life — and love — at a seaside diner.',
    c: ['Penny Holt','Marco Quinn'],
    e: '🌊', updated: '2 weeks ago',
    bg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=75',
    moods: ['chill','nostalgic'],
  },
  {
    id: 't6', t: 'Orbital Drift',       y: 2024, m: 92, r: 'PG-13', rt: '2h 22m',
    g: ['Sci-Fi','Adventure'],
    s: 'Six astronauts stranded between Earth and Mars must survive on dwindling supplies and fractured trust.',
    c: ['Jin Park','Amara Osei','Nick Tal'],
    e: '🚀', updated: 'Today',
    bg: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=900&q=75',
    moods: ['intense','chill'],
  },
  {
    id: 't7', t: 'Paper Tigers',        y: 2022, m: 89, r: 'PG',    rt: '1h 56m',
    g: ['Documentary','Crime'],
    s: 'A decade-long investigation into the underground art forgery rings that fooled the world\'s greatest museums.',
    c: ['Miriam Clay','Sven Larson'],
    e: '🖼', updated: '1 month ago',
    bg: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=75',
    moods: ['nostalgic','chill'],
  },
  {
    id: 't8', t: 'The Hollow Crown',    y: 2023, m: 95, r: 'R',     rt: '2h 34m',
    g: ['Historical','Epic'],
    s: 'A forgotten dynasty rises again in medieval Europe, setting fire to the continent\'s fragile peace.',
    c: ['Cecil Brand','Irina Moret','Aldous Grey'],
    e: '👑', updated: '4 days ago',
    bg: 'https://images.unsplash.com/photo-1520637836993-5d6be48ef2bd?w=900&q=75',
    moods: ['intense','nostalgic'],
  },
  {
    id: 't9', t: 'Glass Hours',         y: 2024, m: 90, r: 'PG-13', rt: '1h 50m',
    g: ['Mystery','Sci-Fi'],
    s: 'A theoretical physicist who can rewind time by six minutes uses it to solve her own murder.',
    c: ['Vera Nakamura','Pavel Cross'],
    e: '⏳', updated: 'Yesterday',
    bg: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=75',
    moods: ['intense','chill'],
  },
  {
    id: 't10', t: 'Ember & Ash',        y: 2022, m: 86, r: 'PG-13', rt: '1h 42m',
    g: ['Fantasy','Adventure'],
    s: 'Two rival clans must unite to stop an ancient volcano from consuming their world.',
    c: ['Sara Voss','Kenji Ito'],
    e: '🌋', updated: '3 weeks ago',
    bg: 'https://images.unsplash.com/photo-1527482937786-6608f6e14c15?w=900&q=75',
    moods: ['intense','nostalgic'],
  },
  {
    id: 't11', t: 'Nightgarden',        y: 2021, m: 93, r: 'G',     rt: '1h 30m',
    g: ['Animation','Family'],
    s: 'A girl discovers a hidden world blooming beneath her city that only she can save from an ancient blight.',
    c: ['Lily Chen (voice)','Omar Fox (voice)'],
    e: '🌸', updated: '2 months ago',
    bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=75',
    moods: ['chill','nostalgic'],
  },
  {
    id: 't12', t: 'Deep Signal',        y: 2024, m: 91, r: 'R',     rt: '2h 10m',
    g: ['Sci-Fi','Horror'],
    s: 'A deep-sea research team intercepts a signal from a civilization that should not exist.',
    c: ['Nat Reeves','Asha Patel','Bjorn Stoll'],
    e: '🌊', updated: '6 days ago',
    bg: 'https://images.unsplash.com/photo-1551244072-5d12893278bc?w=900&q=75',
    moods: ['intense'],
  },
  {
    id: 't13', t: 'Sundown Protocol',   y: 2023, m: 88, r: 'PG-13', rt: '1h 58m',
    g: ['Action','Spy'],
    s: 'A retired MI6 agent is pulled back for one last mission — to stop the person who trained her.',
    c: ['Grace Ashby','Viktor Hall'],
    e: '🕵️', updated: '1 week ago',
    bg: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=900&q=75',
    moods: ['intense'],
  },
  {
    id: 't14', t: 'The Long Harvest',   y: 2020, m: 85, r: 'PG',    rt: '1h 35m',
    g: ['Drama','Family'],
    s: 'Three generations of a farming family navigate a devastating drought and the ties that survive it.',
    c: ['Ruth Simmons','Joe Blake','Annie Cross'],
    e: '🌾', updated: '1 month ago',
    bg: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=75',
    moods: ['nostalgic','chill'],
  },
  {
    id: 't15', t: 'Zero Hour',          y: 2024, m: 97, r: 'R',     rt: '2h 28m',
    g: ['Thriller','Action'],
    s: 'When a nuclear countdown begins with no demands, one analyst has 12 hours to find who pressed the button.',
    c: ['Morgan Stein','Irina Moret','Luke Hale'],
    e: '⚡', updated: 'Today',
    bg: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=900&q=75',
    moods: ['intense'],
  },
  {
    id: 't16', t: 'Indigo Shore',       y: 2022, m: 90, r: 'PG-13', rt: '1h 48m',
    g: ['Drama','Mystery'],
    s: 'A journalist returns to her coastal hometown and unravels a conspiracy stretching back fifty years.',
    c: ['Nadia Wells','Hugo March'],
    e: '🏖', updated: '2 weeks ago',
    bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=75',
    moods: ['nostalgic','chill'],
  },
  {
    id: 't17', t: 'Molten Core',        y: 2023, m: 89, r: 'PG-13', rt: '2h 00m',
    g: ['Sci-Fi','Action'],
    s: 'A geologist drilling to the Earth\'s core encounters something alive that has been waiting for millennia.',
    c: ['Rex Darko','Sasha Merritt'],
    e: '⛏', updated: '5 days ago',
    bg: 'https://images.unsplash.com/photo-1527482937786-6608f6e14c15?w=900&q=75',
    moods: ['intense'],
  },
  {
    id: 't18', t: 'The Paper City',     y: 2021, m: 87, r: 'PG',    rt: '1h 40m',
    g: ['Animation','Drama'],
    s: 'In an origami metropolis, a young architect dreams of building something that cannot be folded away.',
    c: ['Hana Lee (voice)'],
    e: '📐', updated: '3 months ago',
    bg: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=75',
    moods: ['nostalgic','chill'],
  },
];

// Spec: enterprise content taxonomy
const ROWS = {
  all: [
    { label: 'Most Viewed',           badge: false, ids: ['t1','t2','t6','t9','t15','t4','t8','t12'] },
    { label: 'Recently Added',        badge: false, ids: ['t6','t9','t15','t12','t17','t4','t1','t2'] },
    { label: 'Recommended for You',   badge: true,  ids: ['t3','t5','t7','t11','t14','t16','t18','t4'] },
    { label: 'Top Categories',        badge: false, ids: ['t1','t8','t3','t10','t11','t7','t5','t14'] },
    { label: 'Operational Updates',   badge: false, ids: ['t6','t15','t9','t17','t4','t13','t2','t8'] },
    { label: 'Catalog Archive',       badge: false, ids: ['t7','t11','t14','t18','t5','t3','t16','t2'] },
  ],
  chill: [
    { label: 'Curated for Mood',      badge: true,  ids: ['t3','t5','t7','t11','t14','t16','t18','t4'] },
    { label: 'Most Viewed',           badge: false, ids: ['t1','t2','t6','t9','t15','t4','t8','t12'] },
    { label: 'Drama & Character',     badge: false, ids: ['t3','t14','t7','t18','t5','t11','t16','t10'] },
    { label: 'Catalog Archive',       badge: false, ids: ['t11','t14','t18','t5','t3','t7','t16','t2'] },
    { label: 'Recommended for You',   badge: false, ids: ['t1','t6','t9','t15','t4','t8','t12','t13'] },
    { label: 'Recently Added',        badge: false, ids: ['t6','t9','t15','t12','t17','t4','t1','t2'] },
  ],
  intense: [
    { label: 'Curated for Mood',      badge: true,  ids: ['t4','t15','t6','t12','t17','t13','t8','t1'] },
    { label: 'Most Viewed',           badge: false, ids: ['t1','t2','t6','t9','t15','t4','t8','t12'] },
    { label: 'Thriller & Suspense',   badge: false, ids: ['t4','t9','t15','t2','t13','t17','t1','t6'] },
    { label: 'Sci-Fi & Technology',   badge: false, ids: ['t1','t6','t12','t9','t17','t15','t4','t8'] },
    { label: 'Action & Operations',   badge: false, ids: ['t13','t4','t15','t8','t17','t2','t1','t6'] },
    { label: 'Recently Added',        badge: false, ids: ['t6','t9','t15','t12','t17','t4','t1','t2'] },
  ],
  nostalgic: [
    { label: 'Curated for Mood',      badge: true,  ids: ['t7','t11','t14','t16','t18','t3','t5','t8'] },
    { label: 'Most Viewed',           badge: false, ids: ['t1','t2','t6','t9','t15','t4','t8','t12'] },
    { label: 'Catalog Archive',       badge: false, ids: ['t11','t14','t18','t5','t3','t7','t16','t2'] },
    { label: 'Drama & Narrative',     badge: false, ids: ['t14','t3','t7','t16','t5','t11','t18','t8'] },
    { label: 'Family & Community',    badge: false, ids: ['t11','t14','t5','t18','t3','t16','t7','t1'] },
    { label: 'Recently Added',        badge: false, ids: ['t6','t9','t15','t12','t17','t4','t1','t2'] },
  ],
};

const HERO = { all: 't15', chill: 't3', intense: 't1', nostalgic: 't8' };

// ─── STATE ────────────────────────────────────────────────────────────

let mood    = localStorage.getItem('sl_mood') || 'all';
let prof    = JSON.parse(localStorage.getItem('sl_prof') || 'null');
let prog    = JSON.parse(localStorage.getItem('sl_prog') || '{}');
let mlist   = JSON.parse(localStorage.getItem('sl_mlist') || '[]');
let lastSY  = 0;
let srchT   = null;
let srchOpen = false;
let hideT   = null;
let vid     = null;
let activeId = null;

// ─── BOOT ─────────────────────────────────────────────────────────────

(function boot() {
  applyMoodTokens(MOODS.find(m => m.id === mood));
  buildProfiles();
  if (prof) launchHome();
})();

// ─── PROFILE ──────────────────────────────────────────────────────────

function buildProfiles() {
  document.getElementById('pgrid').innerHTML = PROFILES.map(p => `
    <div class="p-card" tabindex="0" role="button" aria-label="Select profile ${p.name}"
         onclick="pickProf('${p.id}')"
         onkeydown="if(event.key==='Enter'||event.key===' ')pickProf('${p.id}')">
      <div class="p-avatar" style="background:${p.bg}">${p.init}</div>
      <div class="p-name">${p.name}</div>
    </div>
  `).join('');
}

function pickProf(id) {
  prof = PROFILES.find(p => p.id === id);
  localStorage.setItem('sl_prof', JSON.stringify(prof));
  launchHome();
}

// ─── HOME ─────────────────────────────────────────────────────────────

function launchHome() {
  document.getElementById('sp').classList.remove('active');
  document.getElementById('sh').classList.add('active');
  wireNav();
  buildMoodFilters();
  buildHero();
  buildRows();
  wireScroll();
}

function wireNav() {
  const av = document.getElementById('nav-avatar');
  if (av) {
    av.style.background = prof ? prof.bg : '#252830';
    av.textContent = prof ? prof.init : '?';
    av.onclick = () => {
      localStorage.removeItem('sl_prof');
      prof = null;
      document.getElementById('sh').classList.remove('active');
      document.getElementById('sp').classList.add('active');
    };
  }
}

function wireScroll() {
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    const sy = window.scrollY;
    nav.classList.toggle('scrolled', sy > 24);
    if (sy > lastSY + 80 && sy > 200) nav.classList.add('hide');
    else if (sy < lastSY - 10 || sy < 80) nav.classList.remove('hide');
    lastSY = sy;
  }, { passive: true });
}

// ─── MOOD ─────────────────────────────────────────────────────────────

function applyMoodTokens(m) {
  document.documentElement.style.setProperty('--accent', m.accent);
  document.documentElement.style.setProperty('--accent-dim', m.glow);
}

function buildMoodFilters() {
  document.getElementById('mood-filters').innerHTML = MOODS.map(m => `
    <button class="mood-pill ${m.id === mood ? 'active' : ''}"
            onclick="switchMood('${m.id}')"
            aria-pressed="${m.id === mood}">
      ${m.label}
    </button>
  `).join('');
}

function switchMood(id) {
  if (id === mood) return;
  mood = id;
  localStorage.setItem('sl_mood', id);
  const m = MOODS.find(x => x.id === id);
  applyMoodTokens(m);
  burst(m.accent);
  buildMoodFilters();
  buildHero();
  buildRows();
  toast(`Catalog filtered: ${m.label}`);
}

function burst(col) {
  const c = document.getElementById('particles');
  c.innerHTML = '';
  for (let i = 0; i < 32; i++) {
    const d = document.createElement('div');
    d.className = 'pdot';
    const sz = 3 + Math.random() * 6;
    d.style.cssText = `
      width:${sz}px; height:${sz}px;
      background:${col};
      left:${Math.random() * 100}vw;
      top:${Math.random() * 100}vh;
      opacity:${0.3 + Math.random() * 0.5};
      transform:scale(0);
      transition:transform ${0.25 + Math.random() * 0.3}s ease-out,
                 opacity   ${0.3 + Math.random() * 0.2}s ease-in ${0.1 + Math.random() * 0.35}s
    `;
    c.appendChild(d);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      d.style.transform = `scale(${1.5 + Math.random() * 3})`;
      d.style.opacity = '0';
    }));
  }
  setTimeout(() => { c.innerHTML = ''; }, 900);
}

// ─── HERO ─────────────────────────────────────────────────────────────

function buildHero() {
  const tid = HERO[mood];
  const x = TITLES.find(t => t.id === tid);
  document.getElementById('hero-backdrop').style.backgroundImage = `url(${x.bg})`;
  document.getElementById('hero-content').innerHTML = `
    <div class="hero-eyebrow">Most Viewed</div>
    <div class="hero-title">${x.t}</div>
    <div class="hero-meta">
      <span class="hero-meta-match">${x.m}% Match</span>
      <span class="hero-meta-divider">·</span>
      <span>${x.y}</span>
      <span class="hero-meta-divider">·</span>
      <span>${x.r}</span>
      <span class="hero-meta-divider">·</span>
      <span>${x.rt}</span>
      <span class="hero-meta-divider">·</span>
      <span>${x.g.join(' / ')}</span>
    </div>
    <p class="hero-synopsis">${x.s}</p>
    <div class="hero-actions">
      <button class="btn btn-primary" onclick="startPlayer('${x.id}')">
        <span class="btn-icon">▶</span> Play
      </button>
      <button class="btn btn-ghost" onclick="showModal('${x.id}')">
        <span class="btn-icon">ⓘ</span> Details
      </button>
    </div>
  `;
}

// ─── ROWS ─────────────────────────────────────────────────────────────

function buildRows() {
  const rows = ROWS[mood];
  document.getElementById('rows').innerHTML = rows.map((row, i) => `
    <div class="section">
      <div class="section-head">
        <div class="section-title">${row.label}</div>
        ${row.badge ? '<div class="section-badge">Mood Pick</div>' : ''}
        <div class="section-count">${row.ids.length} titles</div>
      </div>
      <div class="carousel-wrap">
        <button class="carousel-arrow arr-left"
                onclick="scrollRow('track-${i}', -1)"
                aria-label="Scroll left">‹</button>
        <div class="carousel-track" id="track-${i}">
          ${row.ids.map(id => mkCard(id)).join('')}
        </div>
        <button class="carousel-arrow arr-right"
                onclick="scrollRow('track-${i}', 1)"
                aria-label="Scroll right">›</button>
      </div>
    </div>
  `).join('');
  document.querySelectorAll('.carousel-track').forEach(initDrag);
}

function mkCard(tid) {
  const x = TITLES.find(t => t.id === tid);
  const pct = prog[tid] ? Math.min(100, (prog[tid] / x._dur) * 100) : 0;
  return `
    <div class="card" tabindex="0" role="button" aria-label="Open ${x.t}"
         onclick="showModal('${x.id}')"
         onkeydown="if(event.key==='Enter')showModal('${x.id}')">
      <div class="card-thumb" style="background-image:url(${x.bg})">
        <div class="card-thumb-emoji">${x.e}</div>
        ${pct > 0 ? `<div class="card-progress" style="width:${pct}%"></div>` : ''}
      </div>
      <div class="card-footer">
        <div class="card-title">${x.t}</div>
        <div class="card-category">${x.g[0]}</div>
        <div class="card-updated">Updated ${x.updated}</div>
      </div>
    </div>
  `;
}

function scrollRow(id, dir) {
  const el = document.getElementById(id);
  const card = el.querySelector('.card');
  if (!card) return;
  const w = card.offsetWidth + 24; // card + gutter
  el.scrollBy({ left: dir * w * 3, behavior: 'smooth' });
}

function initDrag(el) {
  let dn = false, sx, sl;
  el.addEventListener('mousedown', e => {
    dn = true;
    el.classList.add('grabbing');
    sx = e.pageX - el.offsetLeft;
    sl = el.scrollLeft;
  });
  const up = () => { dn = false; el.classList.remove('grabbing'); };
  el.addEventListener('mouseleave', up);
  el.addEventListener('mouseup', up);
  el.addEventListener('mousemove', e => {
    if (!dn) return;
    e.preventDefault();
    el.scrollLeft = sl - (e.pageX - el.offsetLeft - sx) * 1.4;
  });
}

// ─── SEARCH ───────────────────────────────────────────────────────────

function toggleSearch() {
  srchOpen = !srchOpen;
  const inp = document.getElementById('search-input');
  inp.classList.toggle('open', srchOpen);
  if (srchOpen) {
    setTimeout(() => inp.focus(), 200);
  } else {
    inp.value = '';
    closeSearch();
  }
}

function onSearch(q) {
  clearTimeout(srchT);
  if (!q.trim()) { closeSearch(); return; }
  srchT = setTimeout(() => runSearch(q.trim()), 300);
}

function runSearch(q) {
  const ql = q.toLowerCase();
  const hits = TITLES.filter(x =>
    x.t.toLowerCase().includes(ql) ||
    x.g.some(g => g.toLowerCase().includes(ql)) ||
    x.c.some(c => c.toLowerCase().includes(ql))
  );

  const hl = s => s.replace(
    new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'),
    '<em>$1</em>'
  );

  const panel = document.getElementById('search-panel');
  panel.innerHTML = `
    <div class="search-label">
      ${hits.length
        ? `${hits.length} result${hits.length !== 1 ? 's' : ''} for <em>"${q}"</em>`
        : `No results for <em>"${q}"</em>`}
    </div>
    ${hits.length ? `
      <div class="search-grid">
        ${hits.map(x => `
          <div class="search-item" onclick="showModal('${x.id}')" tabindex="0"
               role="button" onkeydown="if(event.key==='Enter')showModal('${x.id}')">
            <div class="search-thumb" style="background-image:url(${x.bg})">${x.e}</div>
            <div>
              <div class="search-title">${hl(x.t)}</div>
              <div class="search-sub">${x.g.join(' · ')}</div>
            </div>
          </div>
        `).join('')}
      </div>
    ` : ''}
  `;
  panel.classList.add('open');
  history.replaceState({}, '', hits.length ? `?q=${encodeURIComponent(q)}` : location.pathname);
}

function closeSearch() {
  document.getElementById('search-panel').classList.remove('open');
  history.replaceState({}, '', location.pathname);
}

function onSearchKey(e) {
  if (e.key === 'Escape') { toggleSearch(); closeSearch(); }
}

// ─── MODAL ────────────────────────────────────────────────────────────

function showModal(tid) {
  const x = TITLES.find(t => t.id === tid);
  const inL = mlist.includes(tid);

  document.getElementById('modal-hero-bg').style.backgroundImage = `url(${x.bg})`;

  document.getElementById('modal-content').innerHTML = `
    <div class="modal-title">${x.t}</div>
    <div class="modal-pills">
      <span class="pill-match">${x.m}% Match</span>
      <span class="pill-meta">${x.y}</span>
      <span class="pill-meta">${x.rt}</span>
      <span class="pill-outline">${x.r}</span>
      <span class="pill-fill">HD</span>
    </div>
    <div class="modal-actions">
      <button class="btn btn-primary" onclick="startPlayer('${x.id}')">
        <span class="btn-icon">▶</span> Play
      </button>
      <button class="btn btn-ghost" id="ml-btn" onclick="toggleList('${x.id}',this)">
        <span class="btn-icon">${inL ? '✓' : '+'}</span>
        ${inL ? 'In Catalog' : 'Add to Catalog'}
      </button>
    </div>
    <p class="modal-synopsis">${x.s}</p>
    <div class="modal-info-grid">
      <div class="modal-info-row">
        <span class="info-label">Cast</span>
        <span class="info-val">${x.c.slice(0, 3).join(', ')}</span>
      </div>
      <div class="modal-info-row">
        <span class="info-label">Genre</span>
        <span class="info-val">${x.g.join(', ')}</span>
      </div>
      <div class="modal-info-row">
        <span class="info-label">Year</span>
        <span class="info-val">${x.y}</span>
      </div>
      <div class="modal-info-row">
        <span class="info-label">Runtime</span>
        <span class="info-val">${x.rt}</span>
      </div>
    </div>
    <div class="cast-list">
      ${x.c.map(n => `<div class="cast-pill">${n}</div>`).join('')}
    </div>
  `;

  document.getElementById('modal-bg').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-bg').classList.remove('open');
  document.body.style.overflow = '';
}

function handleModalBg(e) {
  if (e.target === document.getElementById('modal-bg')) closeModal();
}

function toggleList(tid, btn) {
  const i = mlist.indexOf(tid);
  if (i >= 0) {
    mlist.splice(i, 1);
    btn.innerHTML = '<span class="btn-icon">+</span> Add to Catalog';
    toast('Removed from catalog');
  } else {
    mlist.push(tid);
    btn.innerHTML = '<span class="btn-icon">✓</span> In Catalog';
    toast('Added to catalog');
  }
  localStorage.setItem('sl_mlist', JSON.stringify(mlist));
}

// ─── PLAYER ───────────────────────────────────────────────────────────

function startPlayer(tid) {
  closeModal();
  const x = TITLES.find(t => t.id === tid);
  activeId = tid;

  document.getElementById('player-screen').classList.add('active');
  document.body.style.overflow = 'hidden';
  document.getElementById('p-film-title').textContent = x.t;

  vid = document.getElementById('vid');
  vid.src = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  vid.volume = 0.8;
  document.getElementById('volbar').value = 0.8;
  vid.currentTime = prog[tid] || 0;
  vid.play().catch(() => {});

  document.getElementById('ppbtn').textContent = '⏸';

  vid.ontimeupdate = () => {
    const p = vid.duration ? (vid.currentTime / vid.duration) * 100 : 0;
    document.getElementById('seek-fill').style.width = p + '%';
    document.getElementById('seek-thumb').style.left = p + '%';
    document.getElementById('tcur').textContent = fmt(vid.currentTime);
  };
  vid.onloadedmetadata = () => {
    document.getElementById('ttot').textContent = fmt(vid.duration);
  };
  vid.onpause = () => { document.getElementById('ppbtn').textContent = '▶'; };
  vid.onplay  = () => { document.getElementById('ppbtn').textContent = '⏸'; };

  document.addEventListener('keydown', pKey);
  document.getElementById('player-screen').addEventListener('mousemove', resetHide);
  resetHide();
}

function closePlayer() {
  if (vid && activeId) {
    prog[activeId] = vid.currentTime;
    localStorage.setItem('sl_prog', JSON.stringify(prog));
    vid.pause();
    vid.src = '';
    vid.ontimeupdate = null;
    vid.onloadedmetadata = null;
  }
  clearTimeout(hideT);
  document.getElementById('player-screen').classList.remove('active');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', pKey);
  buildRows(); // refresh progress bars
}

function togglePlay() {
  if (!vid) return;
  vid.paused ? vid.play() : vid.pause();
  resetHide();
}

function seek(v) {
  if (vid && vid.duration) vid.currentTime = (v / 100) * vid.duration;
}

function seekClick(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  if (vid && vid.duration) vid.currentTime = pct * vid.duration;
  resetHide();
}

function skip(s) {
  if (vid) vid.currentTime = Math.max(0, Math.min(vid.duration || 9999, vid.currentTime + s));
  resetHide();
}

function setVol(v) {
  if (vid) { vid.volume = v; vid.muted = v == 0; }
  document.getElementById('mutebtn').textContent = v == 0 ? '🔇' : '🔊';
}

function toggleMute() {
  if (!vid) return;
  vid.muted = !vid.muted;
  document.getElementById('mutebtn').textContent = vid.muted ? '🔇' : '🔊';
  document.getElementById('volbar').value = vid.muted ? 0 : vid.volume;
}

function goFS() {
  const el = document.getElementById('player-screen');
  document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen();
}

function fmt(s) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, '0')}`;
}

function resetHide() {
  const ui = document.getElementById('pui');
  ui.classList.remove('hidden');
  clearTimeout(hideT);
  hideT = setTimeout(() => {
    if (vid && !vid.paused) ui.classList.add('hidden');
  }, 2500);
}

function pKey(e) {
  if (!document.getElementById('player-screen').classList.contains('active')) return;
  switch (e.key) {
    case ' ':          e.preventDefault(); togglePlay(); break;
    case 'ArrowLeft':  e.preventDefault(); skip(-10);   break;
    case 'ArrowRight': e.preventDefault(); skip(10);    break;
    case 'f': case 'F': goFS();       break;
    case 'm': case 'M': toggleMute(); break;
    case 'Escape': closePlayer();     break;
  }
  resetHide();
}

// ─── TOAST ────────────────────────────────────────────────────────────

function toast(msg) {
  const container = document.getElementById('toasts');
  const el = document.createElement('div');
  el.className = 'toast-item';
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => { if (el.parentNode) container.removeChild(el); }, 4300);
}

// ─── NAV SCROLL TO TOP ────────────────────────────────────────────────

function toTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
