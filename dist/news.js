const stories = Array.isArray(window.newsStories) ? window.newsStories : [];
const params = new URLSearchParams(window.location.search);
let activeFilter = params.get('league') || 'all';
let latestLimit = 6;
const filters = [
  ['all', 'All news'],
  ['premier', 'NBC Premier League'],
  ['championship', 'NBC Championship'],
  ['first', 'First League'],
  ['women', "Women's Premier League"]
];
const localizeStory = (story) => window.TML_I18N?.localizeRecord(story) || story;
const getVisibleStories = () => {
  const filtered = activeFilter === 'all' ? stories : stories.filter((story) => story.league === activeFilter);
  return (filtered.length ? filtered : stories).map(localizeStory);
};
const articleUrl = (story) => `article.html?story=${encodeURIComponent(story.id)}`;
const badge = (story, extra = '') => `<span class="news-card-badge ${extra}"><img src="${story.logo}" alt="${story.leagueName} logo" loading="lazy" /><span>${story.category}</span></span>`;
const readLink = (story, label = 'Read more') => `<a class="news-read-link" href="${articleUrl(story)}">${label} <span>&rarr;</span></a>`;
const emptyState = (message = 'No stories in this lane yet. Check back after the next matchweek.') => `<div class="news-empty-state"><span>NOTEBOOK / 00</span><p>${message}</p></div>`;
const renderHero = (story) => {
  const root = document.querySelector('[data-news-hero]');
  if (!root || !story) return;
  root.innerHTML = `<a class="news-hero-image" href="${articleUrl(story)}"><img src="${story.image}" alt="${story.title}" /><span class="news-hero-image-note">01 / FRONT PAGE</span></a><div class="news-hero-story-copy"><div class="news-story-meta">${badge(story)}<time datetime="${story.date}">${story.date}</time></div><h2>${story.title}</h2><p>${story.summary}</p><div class="news-hero-actions">${readLink(story, 'Read story')}<span class="news-hero-readtime">${story.readTime}</span></div></div>`;
};
const renderFilters = () => {
  const root = document.querySelector('[data-news-filters]');
  if (!root) return;
  root.innerHTML = `<div class="container news-filter-inner"><span class="news-filter-label">Filter by competition</span><div class="news-filter-tabs" role="tablist">${filters.map(([key, label]) => `<button class="news-filter-tab${activeFilter === key ? ' active' : ''}" type="button" role="tab" aria-selected="${activeFilter === key}" data-news-filter="${key}">${label}<span>&rarr;</span></button>`).join('')}</div></div>`;
  root.querySelectorAll('[data-news-filter]').forEach((button) => button.addEventListener('click', () => {
    activeFilter = button.dataset.newsFilter;
    latestLimit = 6;
    const nextUrl = activeFilter === 'all' ? 'news.html' : `news.html?league=${activeFilter}`;
    try { window.history.replaceState({}, '', nextUrl); } catch (error) { /* file previews can block URL state changes */ }
    renderAll();
  }));
};
const renderFeatured = (visible) => {
  const root = document.querySelector('[data-featured-grid]');
  if (!root) return;
  const [lead, ...side] = visible;
  root.innerHTML = lead ? `<article class="featured-news-lead" style="--story-accent:${lead.accent}"><a href="${articleUrl(lead)}" class="featured-news-image"><img src="${lead.image}" alt="${lead.title}" loading="lazy" /><span>${lead.label}</span></a><div class="featured-news-body">${badge(lead)}<h3>${lead.title}</h3><p>${lead.summary}</p><div class="featured-news-footer"><time>${lead.date}</time>${readLink(lead, 'Read story')}</div></div></article><div class="featured-news-side">${side.slice(0, 4).map((story, index) => `<article class="featured-news-mini" style="--story-accent:${story.accent}"><a href="${articleUrl(story)}" class="featured-mini-image"><img src="${story.image}" alt="${story.title}" loading="lazy" /><span>0${index + 2}</span></a><div>${badge(story)}<h3><a href="${articleUrl(story)}">${story.title}</a></h3><time>${story.date} / ${story.readTime}</time></div></article>`).join('')}</div>` : emptyState();
};
const renderLatest = (visible) => {
  const root = document.querySelector('[data-latest-news]');
  const loadMore = document.querySelector('[data-load-more]');
  const loadNote = document.querySelector('[data-load-note]');
  if (!root) return;
  const latest = visible.slice(0, latestLimit);
  root.innerHTML = latest.length ? latest.map((story, index) => `<article class="latest-news-card" style="--story-accent:${story.accent}"><a class="latest-news-image" href="${articleUrl(story)}"><img src="${story.image}" alt="${story.title}" loading="lazy" /><span>${String(index + 1).padStart(2, '0')}</span></a><div class="latest-news-card-copy">${badge(story)}<h3><a href="${articleUrl(story)}">${story.title}</a></h3><p>${story.summary}</p><div class="latest-news-card-foot"><time>${story.date}</time><span>${story.readTime}</span>${readLink(story)}</div></div></article>`).join('') : emptyState();
  if (loadMore) loadMore.hidden = latestLimit >= visible.length;
  if (loadNote) loadNote.textContent = `Showing ${Math.min(latestLimit, visible.length)} of ${visible.length} stories`;
};
const renderTrending = (visible) => {
  const root = document.querySelector('[data-trending-news]');
  if (!root) return;
  root.innerHTML = visible.slice(0, 5).map((story, index) => `<a class="trending-item" href="${articleUrl(story)}"><span class="trending-number">${String(index + 1).padStart(2, '0')}</span><span class="trending-copy"><strong>${story.title}</strong><small>${story.leagueName} / ${story.date}</small></span><span class="trending-arrow">&rarr;</span></a>`).join('');
};
const renderCategory = (selector, visible, type, fallback) => {
  const root = document.querySelector(selector);
  if (!root) return;
  const matching = visible.filter((story) => story.type === type);
  root.innerHTML = matching.length ? matching.slice(0, 3).map((story) => `<article class="category-news-card" style="--story-accent:${story.accent}"><a class="category-news-image" href="${articleUrl(story)}"><img src="${story.image}" alt="${story.title}" loading="lazy" /><span>${story.category}</span></a><div class="category-news-copy">${badge(story)}<h3><a href="${articleUrl(story)}">${story.title}</a></h3><p>${story.summary}</p><div>${readLink(story)}<time>${story.date}</time></div></div></article>`).join('') : emptyState(fallback);
};
const renderWomen = (visible) => {
  const root = document.querySelector('[data-women-news]');
  if (!root) return;
  const matching = visible.filter((story) => story.league === 'women');
  root.innerHTML = matching.length ? matching.slice(0, 3).map((story, index) => `<article class="women-news-card${index === 0 ? ' featured' : ''}" style="--story-accent:${story.accent}"><a href="${articleUrl(story)}"><img src="${story.image}" alt="${story.title}" loading="lazy" /><span class="women-news-card-index">0${index + 1}</span><div>${badge(story)}<h3>${story.title}</h3><p>${story.summary}</p><time>${story.date} / ${story.readTime}</time></div></a></article>`).join('') : emptyState('Select Women\'s Premier League to bring this section into focus.');
};
const renderAll = () => {
  const visible = getVisibleStories();
  renderFilters();
  renderHero(visible[0]);
  renderFeatured(visible);
  renderLatest(visible);
  renderTrending(visible);
  renderCategory('[data-match-news]', visible, 'match', 'No match stories in this competition filter yet.');
  renderCategory('[data-transfer-news]', visible, 'transfer', 'No transfer stories in this competition filter yet.');
  renderCategory('[data-player-news]', visible, 'player', 'No player stories in this competition filter yet.');
  renderWomen(visible);
  renderCategory('[data-official-news]', visible, 'official', 'No official updates in this competition filter yet.');
};
renderAll();
document.addEventListener('tml-languagechange', renderAll);
document.addEventListener('click', (event) => { if (event.target.closest('[data-load-more]')) { latestLimit += 6; renderLatest(getVisibleStories()); } });
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => { const open = mainNav.classList.toggle('open'); menuToggle.classList.toggle('open', open); menuToggle.setAttribute('aria-expanded', String(open)); document.body.classList.toggle('menu-open', open); });
  mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { mainNav.classList.remove('open'); menuToggle.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open'); }));
}
const drawer = document.querySelector('[data-search-drawer]');
const searchTrigger = document.querySelector('[data-search-trigger]');
const searchClose = document.querySelector('[data-search-close]');
const searchInput = document.querySelector('.search-form input');
if (drawer && searchTrigger && searchClose) {
  const closeSearch = () => { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); document.body.classList.remove('drawer-open'); };
  searchTrigger.addEventListener('click', () => { drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); document.body.classList.add('drawer-open'); window.setTimeout(() => searchInput && searchInput.focus(), 180); });
  searchClose.addEventListener('click', closeSearch); drawer.addEventListener('click', (event) => { if (event.target === drawer) closeSearch(); }); document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeSearch(); });
}
const searchForm = document.querySelector('[data-search-form]');
if (searchForm) searchForm.addEventListener('submit', (event) => { event.preventDefault(); if (searchInput && searchInput.value.trim()) searchInput.placeholder = 'Searching the notebook...'; });
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) newsletterForm.addEventListener('submit', (event) => { event.preventDefault(); const button = newsletterForm.querySelector('button'); if (button) button.innerHTML = 'You are on the list <span>&#10003;</span>'; });