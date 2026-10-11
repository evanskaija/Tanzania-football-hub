const allClubs = window.clubDirectory || [];
const competitionConfigs = window.clubConfigs || {};
const pageParams = new URLSearchParams(window.location.search);
const competitionSelect = document.querySelector('[data-club-competition]');
const searchInput = document.querySelector('[data-club-search]');
const sortSelect = document.querySelector('[data-club-sort]');
const grid = document.querySelector('[data-club-grid]');
const emptyState = document.querySelector('[data-club-empty]');
const activeFilter = document.querySelector('[data-club-active-filter]');
const totalLabel = document.querySelector('[data-club-total]');
const countLabel = document.querySelector('[data-club-count]');
let activeCompetition = pageParams.get('competition') || 'all';
let searchTerm = '';
let sortMode = pageParams.get('sort') || 'az';
if (!competitionConfigs[activeCompetition]) activeCompetition = 'all';
if (!['az', 'league', 'position', 'followed'].includes(sortMode)) sortMode = 'az';
if (competitionSelect) competitionSelect.value = activeCompetition;
if (sortSelect) sortSelect.value = sortMode;
if (totalLabel) totalLabel.textContent = allClubs.length;
const safeText = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const clubUrl = (club) => `club.html?club=${encodeURIComponent(club.id)}&competition=${encodeURIComponent(club.league)}`;
const logoMarkup = (club, className = '') => `<img class="${className}" src="${club.image}" alt="${safeText(club.name)} badge" loading="lazy" />`;
const competitionLogo = (club) => `<img src="${club.logo}" alt="${safeText(club.leagueName)} logo" loading="lazy" />`;
const formMarkup = (club) => `<div class="directory-card-form"><span>Recent form</span><div>${club.form.map((result) => `<b class="${result === 'W' ? 'win' : result === 'D' ? 'draw' : 'loss'}">${result}</b>`).join('')}</div></div>`;
function getVisibleClubs() {
  let visible = allClubs.filter((club) => activeCompetition === 'all' || club.league === activeCompetition);
  const query = searchTerm.trim().toLowerCase();
  if (query) visible = visible.filter((club) => `${club.name} ${club.city} ${club.stadium} ${club.leagueName}`.toLowerCase().includes(query));
  return visible.sort((a, b) => {
    if (sortMode === 'league') return a.leagueName.localeCompare(b.leagueName) || a.name.localeCompare(b.name);
    if (sortMode === 'position') return a.position - b.position || a.leagueName.localeCompare(b.leagueName);
    if (sortMode === 'followed') return b.followers - a.followers || a.name.localeCompare(b.name);
    return a.name.localeCompare(b.name);
  });
}
function renderDirectory() {
  const visible = getVisibleClubs();
  if (countLabel) countLabel.textContent = `${visible.length} club${visible.length === 1 ? '' : 's'} / ${activeCompetition === 'all' ? 'all competitions' : competitionConfigs[activeCompetition].name}`;
  if (activeFilter) activeFilter.innerHTML = searchTerm ? `<strong>${visible.length}</strong> results for “${safeText(searchTerm)}”` : activeCompetition === 'all' ? 'Showing every registered club' : `Showing ${safeText(competitionConfigs[activeCompetition].name)}`;
  if (emptyState) emptyState.hidden = visible.length !== 0;
  if (!grid) return;
  grid.innerHTML = visible.map((club) => `<article class="directory-club-card" style="--club-accent:${club.accent}">
    <div class="directory-card-top"><span class="directory-card-rank">${String(club.position).padStart(2, '0')}</span><span class="directory-card-logo">${logoMarkup(club)}</span></div>
    <a class="directory-card-tag" href="${clubUrl(club)}">${competitionLogo(club)}<span>${safeText(club.leagueName)}</span></a>
    <h3><a href="${clubUrl(club)}">${safeText(club.name)}</a></h3>
    <p class="directory-card-location">${safeText(club.city)} / ${safeText(club.stadium)}</p>${formMarkup(club)}
    <div class="directory-card-details"><span>League position<b>#${club.position}</b></span><span>Founded<b>${club.founded}</b></span></div>
    <div class="directory-card-footer"><span>${club.followers.toLocaleString()} following</span><a class="directory-card-link" href="${clubUrl(club)}">View club <span>&rarr;</span></a></div>
  </article>`).join('');
  try { window.history.replaceState({}, '', `clubs.html?${new URLSearchParams({ ...(activeCompetition !== 'all' ? { competition: activeCompetition } : {}), ...(sortMode !== 'az' ? { sort: sortMode } : {}) }).toString()}`); } catch (error) { /* file previews can block URL state changes */ }
}
competitionSelect?.addEventListener('change', (event) => { activeCompetition = event.target.value; renderDirectory(); });
searchInput?.addEventListener('input', (event) => { searchTerm = event.target.value; renderDirectory(); });
sortSelect?.addEventListener('change', (event) => { sortMode = event.target.value; renderDirectory(); });
renderDirectory();
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
if (menuToggle && mainNav) { menuToggle.addEventListener('click', () => { const open = mainNav.classList.toggle('open'); menuToggle.classList.toggle('open', open); menuToggle.setAttribute('aria-expanded', String(open)); document.body.classList.toggle('menu-open', open); }); mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { mainNav.classList.remove('open'); menuToggle.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open'); })); }
const drawer = document.querySelector('[data-search-drawer]');
const searchTrigger = document.querySelector('[data-search-trigger]');
const searchClose = document.querySelector('[data-search-close]');
const drawerInput = document.querySelector('.search-form input');
if (drawer && searchTrigger && searchClose) { const closeSearch = () => { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); document.body.classList.remove('drawer-open'); }; searchTrigger.addEventListener('click', () => { drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); window.setTimeout(() => drawerInput?.focus(), 180); }); searchClose.addEventListener('click', closeSearch); drawer.addEventListener('click', (event) => { if (event.target === drawer) closeSearch(); }); document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeSearch(); }); }
const newsletterForm = document.querySelector('[data-newsletter-form]');
newsletterForm?.addEventListener('submit', (event) => { event.preventDefault(); const button = newsletterForm.querySelector('button'); const note = newsletterForm.querySelector('.form-note'); button.innerHTML = "You're in <span>&check;</span>"; button.disabled = true; if (note) note.textContent = 'Welcome to the clubhouse. Check your inbox for the first whistle.'; });