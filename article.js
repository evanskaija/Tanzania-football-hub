const stories = Array.isArray(window.newsStories) ? window.newsStories : [];
const params = new URLSearchParams(window.location.search);
const selectedStory = stories.find((item) => item.id === params.get('story')) || stories[0];
let story = selectedStory;
const articleUrl = (item) => `article.html?story=${encodeURIComponent(item.id)}`;
const badge = (item) => `<span class="article-category"><img src="${item.logo}" alt="${item.leagueName} logo" loading="lazy" /><span>${item.category}</span></span>`;
const hero = document.querySelector('[data-article-hero]');
const body = document.querySelector('[data-article-body]');
const related = document.querySelector('[data-related-stories]');
const renderArticle = () => {
  story = window.TML_I18N?.localizeRecord(selectedStory) || selectedStory;
  if (!story) return;
  document.documentElement.style.setProperty('--article-accent', story.accent);
  document.title = `${story.title} - Tanzania Major League`;
  if (hero) hero.innerHTML = `<div class="article-hero-kicker"><span class="section-kicker">${story.label}</span><span class="article-crumb">News / ${story.leagueName}</span></div><div class="article-hero-heading">${badge(story)}<h1>${story.title}</h1><p>${story.summary}</p><div class="article-meta"><time datetime="${story.date}">${story.date}</time><span>${story.readTime}</span><span>${story.leagueName}</span></div></div><div class="article-hero-image"><img src="${story.image}" alt="${story.title}" /></div>`;
  if (body) body.innerHTML = `<div class="article-body-kicker">${story.category} / ${story.leagueName}</div>${story.body.map((paragraph) => `<p>${paragraph}</p>`).join('')}<div class="article-takeaway"><span>THE NOTEBOOK</span><strong>Follow every competition, every matchweek, every story.</strong><a href="news.html">Back to all news <span>&rarr;</span></a></div>`;
  const relatedStories = stories.filter((item) => item.id !== story.id && item.league === story.league).slice(0, 3).concat(stories.filter((item) => item.id !== story.id && item.league !== story.league).slice(0, 3)).slice(0, 3).map((item) => window.TML_I18N?.localizeRecord(item) || item);
  if (related) related.innerHTML = relatedStories.map((item) => `<a class="related-story" href="${articleUrl(item)}"><img src="${item.image}" alt="${item.title}" loading="lazy" /><span><small>${item.leagueName}</small><strong>${item.title}</strong><time>${item.date}</time></span></a>`).join('');
};
renderArticle();
document.addEventListener('tml-languagechange', renderArticle);
const shareStatus = document.querySelector('[data-share-status]');
const setShareStatus = (message) => { if (shareStatus) { shareStatus.textContent = message; window.setTimeout(() => { shareStatus.textContent = ''; }, 2200); } };
document.querySelectorAll('[data-share]').forEach((button) => button.addEventListener('click', async () => {
  if (button.dataset.share === 'native' && navigator.share) { await navigator.share({ title: story.title, text: story.summary, url: window.location.href }); setShareStatus('Shared'); return; }
  if (button.dataset.share === 'copy' || !navigator.share) { try { await navigator.clipboard.writeText(window.location.href); setShareStatus('Link copied'); } catch (error) { setShareStatus('Copy the address from your browser'); } }
}));
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