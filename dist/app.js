const heroStories = [
  {
    image: 'images/fiston-mayele.png',
    kicker: 'NBC PREMIER LEAGUE',
    title: 'The <em>game</em><br />lives here.',
    description: 'From the roar of the stands to the last touch in the box - step inside the football stories shaping Tanzania.',
    note: 'Fiston Mayele · the fire returns',
    meta: 'Fiston Mayele brings the heat',
    byline: 'Portraits · Dar es Salaam'
  },
  {
    image: 'images/tuzo2.jpg',
    kicker: 'THE BIG PICTURE',
    title: 'Built for the <em>moment.</em>',
    description: 'The ambition is visible everywhere: in the details, the drama and the people making Tanzanian football impossible to ignore.',
    note: 'The room where the future takes shape',
    meta: 'A new chapter, framed',
    byline: 'The big picture · Tanzania'
  },
  {
    image: 'images/Maema.png',
    kicker: 'PLAYER FILE',
    title: 'Make your <em>mark.</em>',
    description: 'Every player carries a story. This is a closer look at the mindset, movement and magic behind the shirt.',
    note: 'Maema · rhythm in every touch',
    meta: 'The touch that changes everything',
    byline: 'Player file · On the pitch'
  },
  {
    image: 'images/Mwalimu.png',
    kicker: 'THE TOUCHLINE',
    title: 'The mind <em>behind</em><br />the noise.',
    description: 'Plans become patterns, patterns become belief - meet the people turning preparation into performance.',
    note: 'Mwalimu · lessons from the touchline',
    meta: 'Where belief meets the whistle',
    byline: 'The touchline · Inside the game'
  }
];

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const slideRoot = $('[data-hero-slides]');
const heroVisualImage = $('[data-hero-image]');
const heroVisual = heroVisualImage ? heroVisualImage.closest('.hero-visual') : null;
const dotsRoot = $('[data-dots]');
const heroTitle = $('[data-hero-title]');
const heroDescription = $('[data-hero-description]');
const heroKicker = $('[data-hero-kicker]');
const heroNote = $('[data-hero-note]');
const heroMeta = $('[data-hero-meta]');
const heroByline = $('[data-hero-byline]');
const slideCount = $('[data-slide-count]');
const pauseButton = $('[data-pause]');
let currentSlide = 0;
let autoplayTimer;
let isPaused = false;

function buildHero() {
  heroStories.forEach((story) => {
    const preload = new Image();
    preload.src = story.image;
  });
  heroStories.forEach((story, index) => {
    const slide = document.createElement('div');
    slide.className = `hero-slide${index === 0 ? ' active' : ''}`;
    slide.style.backgroundImage = `url("${story.image}")`;
    slide.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
    slideRoot.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = `slider-dot${index === 0 ? ' active' : ''}`;
    dot.type = 'button';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Show story ${index + 1}`);
    dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => goToSlide(index));
    dotsRoot.appendChild(dot);
  });
  resetAutoplay();
}

function goToSlide(index) {
  currentSlide = (index + heroStories.length) % heroStories.length;
  const story = heroStories[currentSlide];
  if (heroVisualImage && heroVisual) {
    heroVisual.classList.remove('is-changing');
    void heroVisualImage.offsetWidth;
    heroVisualImage.src = story.image;
    heroVisual.classList.add('is-changing');
  }
  const slides = $$('.hero-slide');
  const dots = $$('.slider-dot');
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentSlide);
    slide.setAttribute('aria-hidden', i === currentSlide ? 'false' : 'true');
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
    dot.setAttribute('aria-selected', i === currentSlide ? 'true' : 'false');
  });
  heroTitle.innerHTML = story.title;
  heroDescription.textContent = story.description;
  heroKicker.textContent = story.kicker;
  heroNote.textContent = story.note;
  heroMeta.textContent = story.meta;
  heroByline.textContent = story.byline;
  slideCount.textContent = `${String(currentSlide + 1).padStart(2, '0')} / ${String(heroStories.length).padStart(2, '0')}`;
  resetAutoplay();
}

function resetAutoplay() {
  window.clearInterval(autoplayTimer);
  if (!isPaused) autoplayTimer = window.setInterval(() => goToSlide(currentSlide + 1), 5000);
}

function togglePause() {
  isPaused = !isPaused;
  pauseButton.classList.toggle('is-paused', isPaused);
  pauseButton.querySelector('span').textContent = isPaused ? '▶' : 'Ⅱ';
  pauseButton.querySelector('b').textContent = isPaused ? 'Play' : 'Pause';
  resetAutoplay();
}

buildHero();

$('[data-next]').addEventListener('click', () => goToSlide(currentSlide + 1));
$('[data-prev]').addEventListener('click', () => goToSlide(currentSlide - 1));
pauseButton.addEventListener('click', togglePause);
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') goToSlide(currentSlide + 1);
  if (event.key === 'ArrowLeft') goToSlide(currentSlide - 1);
  if (event.key === ' ') {
    const active = document.activeElement;
    if (active === pauseButton) { event.preventDefault(); togglePause(); }
  }
});

const menuToggle = $('.menu-toggle');
const mainNav = $('.main-nav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
});
$$('.main-nav a').forEach((link) => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}));

const drawer = $('[data-search-drawer]');
const searchInput = $('.search-form input');
$('.search-trigger').addEventListener('click', () => {
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('drawer-open');
  window.setTimeout(() => searchInput.focus(), 220);
});
function closeSearch() {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('drawer-open');
}
$('[data-search-close]').addEventListener('click', closeSearch);
drawer.addEventListener('click', (event) => { if (event.target === drawer) closeSearch(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeSearch(); });

$('.search-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const value = searchInput.value.trim();
  if (value) {
    searchInput.value = '';
    searchInput.placeholder = 'Searching for "' + value + '"...';
  }
});

$('.newsletter-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector('button');
  const note = form.querySelector('.form-note');
  const input = form.querySelector('input');
  if (!input.value) return;
  button.innerHTML = "You're in <span>✓</span>";
  button.disabled = true;
  note.textContent = 'Welcome to the clubhouse. Check your inbox for the first whistle.';
  note.style.color = '#ffb45c';
});



window.addEventListener('blur', () => { if (!isPaused) { window.clearInterval(autoplayTimer); } });
window.addEventListener('focus', () => { if (!isPaused) resetAutoplay(); });

const newsStories = [
  { image: 'images/mashujaa-fc.jpg', label: 'LATEST NEWS', readTime: '08 MIN READ', category: 'NBC PREMIER LEAGUE', title: 'MASHUJAA, PAMBA JIJI AND NAMUNGO RETURN STRONG TO THE NBC PREMIER LEAGUE.', excerpt: 'Mashujaa, Pamba Jiji and Namungo return to the NBC Premier League with renewed ambition.', read: 'READ MORE', date: '09.10.26', url: 'article.html?story=premier-return' },
  { image: 'images/tplb-management-2026.jpeg', label: 'TPLB UPDATE', readTime: '06 MIN READ', category: 'OFFICIAL STATEMENT', title: 'STATEMENT FROM THE TPLB LEAGUE OPERATIONS AND MANAGEMENT COMMITTEE.', excerpt: 'An official statement from the Tanzania Premier League Board leadership committee.', read: 'READ MORE', date: '08.10.26', url: 'article.html?story=premier-management' },
  { image: 'images/mkapa.jpg', label: 'MATCHDAY', readTime: '05 MIN READ', category: 'NBC PREMIER LEAGUE', title: 'THREE MATCHES BRING THE NBC PREMIER LEAGUE BACK TO LIFE TODAY.', excerpt: 'Three fixtures bring fresh competition, pressure and energy to today’s league action.', read: 'READ MORE', date: '08.10.26', url: 'article.html?story=premier-derby-preview' },
  { image: 'images/tuzo2.jpg', label: 'PLAYER AWARDS', readTime: '04 MIN READ', category: 'NBC PREMIER LEAGUE', title: 'NGASSA AND ELIAS SHINE IN THE SEPTEMBER AWARDS.', excerpt: 'A closer look at the players who stood above the rest during September.', read: 'READ MORE', date: '07.10.26', url: 'article.html?story=premier-awards' },
  { image: 'images/kmc.jpg', label: 'THE RACE', readTime: '05 MIN READ', category: 'NBC PREMIER LEAGUE', title: 'KMC CHASE A PLACE IN THE 2026/2027 PREMIER LEAGUE.', excerpt: 'KMC continue their push for a stronger place in the 2026/2027 league race.', read: 'READ MORE', date: '07.10.26', url: 'article.html?story=kmc-race' },
  { image: 'images/nbc_championship.png', label: 'CHAMPIONSHIP', readTime: '06 MIN READ', category: 'NBC CHAMPIONSHIP', title: 'THE FOURTH CHAMPIONSHIP ROUND KICKS OFF TODAY.', excerpt: 'The next Championship round opens with another test of depth, discipline and belief.', read: 'READ MORE', date: '02.10.26', url: 'article.html?story=championship-round' }
];
const newsCarousel = $('[data-news-carousel]');
if (newsCarousel) {
  const newsImage = $('[data-news-image]', newsCarousel);
  const newsMedia = $('[data-news-media]', newsCarousel);
  const newsLabel = $('[data-news-label]', newsCarousel);
  const newsCategory = $('[data-news-category]', newsCarousel);
  const newsTitle = $('[data-news-title]', newsCarousel);
  const newsExcerpt = $('[data-news-excerpt]', newsCarousel);
  const newsRead = $('[data-news-read]', newsCarousel);
  const newsReadTime = $('[data-news-read-time]', newsCarousel);
  const newsDate = $('[data-news-date]', newsCarousel);
  const newsIndex = $('[data-news-index]', newsCarousel);
  const newsCounter = $('[data-news-counter]', newsCarousel);
  const newsList = $('[data-news-list]', newsCarousel);
  const newsDots = $('[data-news-dots]', newsCarousel);
  const newsPause = $('[data-news-pause]', newsCarousel);
  const newsFeatureOpen = $('[data-news-open]', newsCarousel);
  const newsFeatureReadLink = $('[data-news-read-link]', newsCarousel);
  let currentNews = 0;
  let newsTimer;
  let newsPaused = false;

  newsStories.forEach((story, index) => {
    const item = document.createElement('a');
    item.className = `news-item${index === 0 ? ' active' : ''}`;
    item.href = story.url;
    item.target = '_blank';
    item.rel = 'noopener';
    item.setAttribute('role', 'tab');
    item.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    item.setAttribute('aria-label', `Read more: ${story.title}`);
    item.innerHTML = `<span class="news-item-number">${String(index + 1).padStart(2, '0')}</span><span class="news-thumb"><img src="${story.image}" alt="${story.title}" /></span><span class="news-item-copy"><small>${story.category}</small><strong>${story.title}</strong><em>${story.readTime} · ${story.date}</em></span><span class="news-item-arrow" aria-hidden="true">↗</span>`;
    item.addEventListener('click', () => showNews(index));
    newsList.appendChild(item);

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = `news-dot${index === 0 ? ' active' : ''}`;
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Show news story ${index + 1}`);
    dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => showNews(index));
    newsDots.appendChild(dot);
  });

  const newsItems = $$('.news-item', newsCarousel);
  const newsDotItems = $$('.news-dot', newsCarousel);

  function resetNewsTimer() {
    window.clearInterval(newsTimer);
    if (!newsPaused) newsTimer = window.setInterval(() => showNews(currentNews + 1), 6200);
  }

  function showNews(index) {
    currentNews = (index + newsStories.length) % newsStories.length;
    const story = newsStories[currentNews];
    newsFeatureOpen.href = story.url;
    newsFeatureReadLink.href = story.url;
    newsMedia.classList.remove('is-changing');
    void newsMedia.offsetWidth;
    newsMedia.classList.add('is-changing');
    newsImage.style.backgroundImage = `url("${story.image}")`;
    newsLabel.textContent = story.label;
    newsCategory.textContent = story.category;
    newsTitle.textContent = story.title;
    newsExcerpt.textContent = story.excerpt;
    newsRead.textContent = story.read;
    newsReadTime.textContent = story.readTime;
    newsDate.textContent = story.date;
    newsIndex.textContent = String(currentNews + 1).padStart(2, '0');
    newsCounter.textContent = `${String(currentNews + 1).padStart(2, '0')} / ${String(newsStories.length).padStart(2, '0')}`;
    newsItems.forEach((item, itemIndex) => {
      item.classList.toggle('active', itemIndex === currentNews);
      item.setAttribute('aria-selected', itemIndex === currentNews ? 'true' : 'false');
    });
    newsDotItems.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === currentNews);
      dot.setAttribute('aria-selected', dotIndex === currentNews ? 'true' : 'false');
    });
    resetNewsTimer();
  }

  $('[data-news-next]', newsCarousel).addEventListener('click', () => showNews(currentNews + 1));
  $('[data-news-prev]', newsCarousel).addEventListener('click', () => showNews(currentNews - 1));
  newsPause.addEventListener('click', () => {
    newsPaused = !newsPaused;
    newsPause.querySelector('span').textContent = newsPaused ? '\\u25B6' : '\\u2161';
    newsPause.querySelector('b').textContent = newsPaused ? 'Play' : 'Auto';
    resetNewsTimer();
  });
  showNews(0);
}
const matchCentre = $('[data-match-centre]');
if (matchCentre) {
  const matchUpcoming = [
    { league: 'NBC PREMIER LEAGUE 2026/2027', title: 'Simba SC vs Azam FC', home: 'Simba SC', away: 'Azam FC', date: 'October 12, 2026', time: '4:00 PM', venue: 'Benjamin Mkapa Stadium, DSM', target: '2026-10-12T16:00:00+03:00', badgeClass: 'red', opponentClass: 'blue' },
    { league: 'NBC CHAMPIONSHIP LEAGUE NEXT MATCH', title: 'Rhino Rangers vs Bigman FC', home: 'Rhino Rangers', away: 'Bigman FC', date: 'October 11, 2026', time: '4:00 PM', venue: 'Tabora Boys Stadium, Tabora', target: '2026-10-11T16:00:00+03:00', badgeClass: 'green', opponentClass: 'red', green: true }
  ];

  const teamGlyph = (team) => {
    const known = { 'Simba SC': 'S', 'Young Africans': 'Y', 'Azam FC': 'A', 'Coastal Union': 'C', 'Singida BS': 'S', 'Mbeya City': 'M', 'Kagera Sugar': 'K', 'Fountain Gate': 'F', 'JKT Tanzania': 'J', 'Namungo FC': 'N', 'TRA United': 'T', 'Rhino Rangers': 'R', 'Bigman FC': 'B', 'Stand United': 'S', 'Tanzania Prisons': 'TP', 'Mbeya Kwanza': 'MK', 'Mbuni': 'M', 'Bandari Tanzania': 'B', 'TMA': 'TM', 'KMC FC': 'K', 'Gunners FC': 'G', 'Kigamboni United': 'K', 'KenGold FC': 'KG', 'Songea United': 'S', 'IAA SC': 'IA', 'Mtibwa Sugar': 'MS', 'Transit Camp': 'TC', 'Mashujaa FC': 'M', 'Pamba Jiji': 'P' };
    return known[team] || team.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  };
  const teamLogos = {
    'Simba SC': 'images/simba.jpg', 'Young Africans': 'images/yanga.jpg', 'Azam FC': 'images/azam.jpg',
    'Coastal Union': 'images/costal-union.jpg', 'Singida BS': 'images/singida.jpg', 'Mbeya City': 'images/mbeya-city.jpg',
    'Fountain Gate': 'images/fauntaingate.jpg', 'JKT Tanzania': 'images/jkt-tanzania.jpg', 'Namungo FC': 'images/namungo-fc.jpg',
    'TRA United': 'images/tra-united.jpg', 'Dodoma Jiji': 'images/dodoma-jiji.jpg', 'Mashujaa FC': 'images/mashujaa-fc.jpg',
    'Pamba Jiji': 'images/pamba-jiji.jpg', 'Tanzania Prisons': 'images/tanzania-prison.jpg', 'KMC FC': 'images/kmc.jpg',
    'Mtibwa Sugar': 'images/mtibwa-suger.jpg', 'Rhino Rangers': 'images/rhino-rangers.svg', 'Bigman FC': 'images/bigman-fc.svg'
  };
  const teamBadge = (team) => teamLogos[team]
    ? `<img src="${teamLogos[team]}" alt="${team} logo" loading="lazy" />`
    : teamGlyph(team);

  const premierResults = [
    { date: 'October 10, 2026', home: 'Simba SC', away: 'Young Africans', score: ['2', '1'] },
    { date: 'October 9, 2026', home: 'Coastal Union', away: 'Azam FC', score: ['0', '2'] },
    { date: 'October 9, 2026', home: 'Dodoma Jiji', away: 'Singida BS', score: ['1', '1'] },
    { date: 'October 9, 2026', home: 'Mbeya City', away: 'Kagera Sugar', score: ['1', '3'] },
    { date: 'October 9, 2026', home: 'Fountain Gate', away: 'JKT Tanzania', score: ['1', '2'] },
    { date: 'October 8, 2026', home: 'Namungo FC', away: 'TRA United', score: ['1', '0'] }
  ];
  const championshipResults = [
    { date: 'October 10, 2026', home: 'Stand United', away: 'Tanzania Prisons', time: '4:00 PM' },
    { date: 'October 10, 2026', home: 'Mbeya Kwanza', away: 'Mbuni', time: '4:00 PM' },
    { date: 'October 10, 2026', home: 'Bandari Tanzania', away: 'TMA', time: '4:00 PM' },
    { date: 'October 9, 2026', home: 'KMC FC', away: 'Gunners FC', score: ['1', '1'] },
    { date: 'October 4, 2026', home: 'Kigamboni United', away: 'KenGold FC', score: ['2', '1'] }
  ];
  const premierFixtures = [
    { date: 'October 12, 2026', home: 'Simba SC', away: 'Azam FC', time: '4:00 PM' },
    { date: 'October 12, 2026', home: 'Coastal Union', away: 'Singida BS', time: '6:00 PM' },
    { date: 'October 13, 2026', home: 'TRA United', away: 'Young Africans', time: '4:00 PM' },
    { date: 'October 13, 2026', home: 'Simba SC', away: 'Mashujaa FC', time: '7:00 PM' },
    { date: 'October 16, 2026', home: 'Fountain Gate', away: 'Pamba Jiji', time: '4:00 PM' }
  ];
  const championshipFixtures = [
    { date: 'October 11, 2026', home: 'Rhino Rangers', away: 'Bigman FC', time: '4:00 PM' },
    { date: 'October 11, 2026', home: 'Kigamboni United', away: 'Songea United', time: '4:00 PM' },
    { date: 'October 11, 2026', home: 'IAA SC', away: 'Mtibwa Sugar', time: '4:00 PM' },
    { date: 'October 12, 2026', home: 'Transit Camp', away: 'KenGold FC', time: '4:00 PM' },
    { date: 'October 16, 2026', home: 'Bandari Tanzania', away: 'Stand United', time: '4:00 PM' }
  ];
  const premierTable = [
    [1, 'Simba SC', 7, 7, 0, 0, 13, 3, 10, 21], [2, 'Young Africans', 7, 6, 0, 1, 17, 4, 13, 18], [3, 'Azam', 7, 4, 2, 1, 11, 7, 4, 14], [4, 'Mashujaa', 7, 4, 0, 3, 8, 7, 1, 12], [5, 'Singida BS', 7, 3, 2, 2, 14, 10, 4, 11], [6, 'Dodoma Jiji', 7, 3, 2, 2, 5, 5, 0, 11], [7, 'Polisi Tanzania', 7, 3, 1, 3, 10, 9, 1, 10], [8, 'Mbeya City', 7, 3, 1, 3, 7, 7, 0, 10], [9, 'JKT Tanzania', 7, 3, 1, 3, 9, 11, -2, 10], [10, 'Namungo', 7, 3, 0, 4, 7, 9, -2, 9], [11, 'Geita Gold', 7, 2, 1, 4, 9, 12, -3, 7], [12, 'Coastal Union', 7, 2, 1, 4, 6, 11, -5, 7], [13, 'TRA United', 7, 1, 3, 3, 6, 7, -1, 6], [14, 'Kagera Sugar', 7, 1, 2, 4, 8, 15, -7, 5], [15, 'Pamba Jiji', 7, 1, 1, 5, 8, 13, -5, 4], [16, 'Fountain Gate', 7, 1, 1, 5, 3, 11, -8, 4]
  ];
  const championshipTable = [
    [1, 'KMC', 5, 3, 2, 0, 13, 4, 9, 11], [2, 'Transit Camp', 4, 3, 1, 0, 7, 3, 4, 10], [3, 'Tanzania Prisons', 4, 3, 0, 1, 5, 2, 3, 9], [4, 'Stand United', 3, 3, 0, 0, 4, 1, 3, 9], [5, 'Kigamboni utd', 4, 2, 1, 1, 4, 3, 1, 7], [6, 'Mtibwa Sugar', 4, 2, 1, 1, 4, 3, 1, 7], [7, 'Rhino Rangers', 4, 2, 1, 1, 2, 1, 1, 7], [8, 'Bandari Tanzania', 4, 1, 2, 1, 4, 4, 0, 5], [9, 'KenGold', 4, 1, 1, 2, 4, 6, -2, 4], [10, 'IAA', 4, 1, 1, 2, 3, 6, -3, 4], [11, 'Songea United', 4, 0, 3, 1, 1, 2, -1, 3], [12, 'Mbeya Kwanza', 4, 1, 0, 3, 4, 6, -2, 3], [13, 'Gunners', 5, 0, 3, 2, 3, 6, -3, 3], [14, 'Mbuni', 4, 1, 0, 3, 4, 9, -5, 3], [15, 'TMA', 3, 0, 1, 2, 2, 4, -2, 1], [16, 'Bigman', 4, 0, 1, 3, 5, 9, -4, 1]
  ];

  const upcomingGrid = $('[data-upcoming-grid]', matchCentre);
  upcomingGrid.innerHTML = matchUpcoming.map((match) => `<article class="upcoming-card${match.green ? ' is-green' : ''}" data-countdown-target="${match.target}"><div class="upcoming-card-head"><span>${match.league}</span><b>UP NEXT</b></div><h4>${match.title}</h4><div class="upcoming-details"><span>${match.date}</span><span>${match.venue}</span></div><div class="upcoming-teams"><span class="team-badge ${match.badgeClass}">${teamBadge(match.home)}</span><strong>${match.home}</strong><b>VS</b><span class="team-badge ${match.opponentClass}">${teamBadge(match.away)}</span><strong>${match.away}</strong></div><div class="countdown"><div class="countdown-item"><strong data-countdown-unit="days">00</strong><span>days</span></div><div class="countdown-item"><strong data-countdown-unit="hours">00</strong><span>hrs</span></div><div class="countdown-item"><strong data-countdown-unit="minutes">00</strong><span>mins</span></div><div class="countdown-item"><strong data-countdown-unit="seconds">00</strong><span>secs</span></div></div></article>`).join('');

  function updateCountdowns() {
    $$('.upcoming-card', matchCentre).forEach((card) => {
      const difference = Math.max(0, new Date(card.dataset.countdownTarget).getTime() - Date.now());
      const seconds = Math.floor(difference / 1000);
      const days = Math.floor(seconds / 86400);
      const hours = Math.floor((seconds % 86400) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainder = seconds % 60;
      $('[data-countdown-unit="days"]', card).textContent = String(days).padStart(2, '0');
      $('[data-countdown-unit="hours"]', card).textContent = String(hours).padStart(2, '0');
      $('[data-countdown-unit="minutes"]', card).textContent = String(minutes).padStart(2, '0');
      $('[data-countdown-unit="seconds"]', card).textContent = String(remainder).padStart(2, '0');
    });
  }
  updateCountdowns();
  window.setInterval(updateCountdowns, 1000);


  const teamTone = (team) => {
    if (['Simba SC', 'Gunners FC', 'Bigman FC', 'Kagera Sugar'].includes(team)) return 'red';
    if (['Young Africans', 'TRA United', 'Kigamboni United', 'Tanzania Prisons', 'Mbuni'].includes(team)) return 'green';
    if (['Azam FC', 'Singida BS', 'Coastal Union', 'Mbeya City', 'JKT Tanzania', 'Rhino Rangers', 'KenGold FC', 'IAA SC', 'Mtibwa Sugar', 'Transit Camp'].includes(team)) return 'blue';
    return 'gold';
  };
  function renderMatchRows(selector, rows, competition) {
    const target = $(selector, matchCentre);
    const module = target.closest('.match-module');
    const pagination = $('.match-pagination', module);
    const pageSize = 3;
    const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
    let currentPage = 0;

    const renderPage = () => {
      const pageRows = rows.slice(currentPage * pageSize, currentPage * pageSize + pageSize);
      target.innerHTML = pageRows.map((row) => `<article class="match-row"><span class="match-row-date">${row.date}</span><span class="match-row-main"><strong><span class="row-team"><i class="row-team-badge ${teamTone(row.home)}">${teamBadge(row.home)}</i>${row.home}</span><small>vs</small><span class="row-team"><i class="row-team-badge ${teamTone(row.away)}">${teamBadge(row.away)}</i>${row.away}</span></strong><span>NBC ${competition} LEAGUE 2026/2027</span></span>${row.score ? `<span class="match-score">${row.score[0]} <i>-</i> ${row.score[1]}</span>` : `<span class="match-score time">${row.time}</span>`}</article>`).join('');
      if (!pagination) return;
      const pageButtons = Array.from({ length: pageCount }, (_, page) => `<button type="button" class="match-page-number${page === currentPage ? ' active' : ''}" data-match-page="${page}" aria-label="Show match page ${page + 1}" aria-current="${page === currentPage ? 'page' : 'false'}">${page + 1}</button>`).join('');
      pagination.innerHTML = `<button type="button" class="match-page-control" data-match-direction="prev" ${currentPage === 0 ? 'disabled' : ''}>&lsaquo; Previous</button>${pageButtons}<button type="button" class="match-page-control" data-match-direction="next" ${currentPage === pageCount - 1 ? 'disabled' : ''}>Next &rsaquo;</button>`;
      $$('[data-match-page]', pagination).forEach((button) => button.addEventListener('click', () => {
        currentPage = Number(button.dataset.matchPage);
        renderPage();
      }));
      $('[data-match-direction="prev"]', pagination).addEventListener('click', () => { if (currentPage > 0) { currentPage -= 1; renderPage(); } });
      $('[data-match-direction="next"]', pagination).addEventListener('click', () => { if (currentPage < pageCount - 1) { currentPage += 1; renderPage(); } });
    };

    renderPage();
  }  renderMatchRows('[data-premier-results]', premierResults, 'PREMIER');
  renderMatchRows('[data-championship-results]', championshipResults, 'CHAMPIONSHIP');
  renderMatchRows('[data-premier-fixtures]', premierFixtures, 'PREMIER');
  renderMatchRows('[data-championship-fixtures]', championshipFixtures, 'CHAMPIONSHIP');

  function renderTable(selector, rows) {
    const table = $(selector, matchCentre);
    table.innerHTML = `<thead><tr><th>Pos</th><th>Club</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>GD</th><th>Pts</th></tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell, cellIndex) => `<td${cellIndex === 9 ? ' class="points"' : ''}>${cell}</td>`).join('')}</tr>`).join('')}</tbody>`;
  }
  renderTable('[data-premier-table]', premierTable);
  renderTable('[data-championship-table]', championshipTable);

  $$('[data-match-tab]', matchCentre).forEach((tab) => tab.addEventListener('click', () => {
    const target = tab.dataset.matchTab;
    $$('[data-match-tab]', matchCentre).forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    $$('[data-match-panel]', matchCentre).forEach((panel) => panel.classList.toggle('active', panel.dataset.matchPanel === target));
  }));
}













/* Fan Zone interactions */
const fanZone = $('#fan-zone');
if (fanZone) {
  const bridge = window.TML_PREDICTION;
  const defaultPredictionState = {
    schemaVersion: 4,
    user: { id: 'local-fan', username: 'Guest Fan', avatar: 'GF' },
    predictionPoints: 0,
    quizPoints: 0,
    rewardPoints: 0,
    activeMatchKey: 'premier',
    predictions: {},
    transactions: [],
    quiz: { activeId: 'quiz-01', current: {}, answers: {}, attempts: {}, started: {}, deadlines: {}, missed: {} },
    daily: { date: '', started: false, current: 0, answers: {}, missed: {}, deadlines: {}, completed: false, correct: 0, points: 0, streak: 0, lastCompletedDate: '', history: [] },
    subscriptions: [],
    fanRewards: { awardSelected: false, awardVoted: false }
  };
  const readPredictionState = () => {
    const saved = bridge?.readState?.();
    if (!saved) return { ...defaultPredictionState, predictions: {}, transactions: [], quiz: { ...defaultPredictionState.quiz, current: {}, answers: {}, attempts: {}, started: {}, deadlines: {}, missed: {} }, fanRewards: { ...defaultPredictionState.fanRewards } };
    return {
      ...defaultPredictionState,
      ...saved,
      predictions: saved.predictions || {},
      transactions: saved.transactions || [],
      quiz: { ...defaultPredictionState.quiz, ...(saved.quiz || {}), current: saved.quiz?.current || {}, attempts: saved.quiz?.attempts || {}, started: saved.quiz?.started || {} },
      fanRewards: { ...defaultPredictionState.fanRewards, ...(saved.fanRewards || {}) }
    };
  };
  let predictionState = readPredictionState();
  const savePredictionState = () => bridge?.writeState?.(predictionState);
  const fanPoints = $('[data-fan-points]', fanZone);
  const fanLevel = $('.fan-level span', fanZone);
  const fanLevelName = $('.fan-level strong', fanZone);
  const fanProgress = $('.fan-progress span', fanZone);
  const pollOptions = $$('[data-poll-option]', fanZone);
  const predictionChoice = $('[data-prediction-choice]', fanZone);
  const castVote = $('[data-cast-vote]', fanZone);
  const changePrediction = $('[data-change-prediction]', fanZone);
  const pollVotes = $('[data-poll-votes]', fanZone);
  const fanCountdown = $('[data-fan-countdown]', fanZone);
  const awardVote = $('[data-award-vote]', fanZone);
  const awardSubmit = $('[data-award-submit]', fanZone);
  const quizOptions = $$('[data-quiz-option]', fanZone);
  const quizFeedback = $('[data-quiz-feedback]', fanZone);
  const quizProgress = $('.trivia-title span', fanZone);
  const fanMatchTitle = $('[data-fan-match-title]', fanZone);
  const fanMatchQuestion = $('[data-fan-match-question]', fanZone);
  const fanHome = $('[data-fan-home]', fanZone);
  const fanAway = $('[data-fan-away]', fanZone);
  const fanHomeLogo = $('[data-fan-home-logo]', fanZone);
  const fanAwayLogo = $('[data-fan-away-logo]', fanZone);
  const fanMatchTime = $('[data-fan-match-time]', fanZone);
  const fanToast = document.createElement('div');
  fanToast.className = 'fan-toast';
  fanToast.setAttribute('role', 'status');
  fanToast.setAttribute('aria-live', 'polite');
  fanZone.appendChild(fanToast);
  let fanToastTimer;

  const notifyFan = (message, tone = 'success') => {
    window.clearTimeout(fanToastTimer);
    fanToast.textContent = message;
    fanToast.className = `fan-toast is-${tone} is-visible`;
    fanToastTimer = window.setTimeout(() => fanToast.classList.remove('is-visible'), 3600);
  };
  const getMatchKey = () => bridge?.matches?.[predictionState.activeMatchKey] ? predictionState.activeMatchKey : 'premier';
  const getMatch = () => bridge?.matches?.[getMatchKey()];
  const getMatchPrediction = (match, create = false) => {
    if (!match) return { choice: null, locked: false, settled: false };
    if (!predictionState.predictions[match.id] && create) {
      predictionState.predictions[match.id] = { matchId: match.id, choice: null, deadlineAt: new Date(match.deadlineAt).getTime(), locked: false, settled: false, correct: null, pointsAwarded: 0 };
    }
    return predictionState.predictions[match.id] || { matchId: match.id, choice: null, deadlineAt: new Date(match.deadlineAt).getTime(), locked: false, settled: false };
  };
  const isLocked = (match, prediction) => Boolean(prediction.locked || prediction.settled || Date.now() >= new Date(match.deadlineAt).getTime());
  const choiceLabel = (match, choice) => choice === 'home' ? match.home : choice === 'away' ? match.away : choice === 'draw' ? 'Draw' : 'Choose a side';
  const totalPoints = () => bridge?.totalPoints?.(predictionState) || Number(predictionState.predictionPoints || 0) + Number(predictionState.quizPoints || 0) + Number(predictionState.rewardPoints || 0);
  const renderFanProfile = () => {
    const points = totalPoints();
    const level = points ? Math.floor(points / 25) + 1 : 1;
    const progress = points ? Math.round((points % 25) / 25 * 100) : 0;
    fanPoints.textContent = points.toLocaleString();
    fanLevel.textContent = points ? `LEVEL ${level}` : 'ROOKIE FAN';
    fanLevelName.textContent = points ? 'FAN' : 'ROOKIE FAN';
    fanProgress.style.width = `${progress}%`;
    fanProgress.parentElement.setAttribute('aria-label', `${progress}% progress toward the next fan level`);
    fanProgress.parentElement.setAttribute('role', 'progressbar');
    fanProgress.parentElement.setAttribute('aria-valuemin', '0');
    fanProgress.parentElement.setAttribute('aria-valuemax', '100');
    fanProgress.parentElement.setAttribute('aria-valuenow', String(progress));
  };
  const renderPoll = () => {
    const match = getMatch();
    if (!match) return;
    const prediction = getMatchPrediction(match);
    const locked = isLocked(match, prediction);
    const percentages = { home: 58, draw: 18, away: 24 };
    fanHome.textContent = match.home;
    fanAway.textContent = match.away;
    fanHomeLogo.src = match.homeLogo;
    fanHomeLogo.alt = `${match.home} badge`;
    fanAwayLogo.src = match.awayLogo;
    fanAwayLogo.alt = `${match.away} badge`;
    fanMatchTime.textContent = match.time;
    fanMatchQuestion.textContent = locked ? 'Predictions are closed for this match.' : 'Who will take the 3 points today?';
    fanMatchTitle.textContent = 'MATCH PREDICTOR';
    pollOptions.forEach((option) => {
      const choice = option.dataset.pollOption;
      const selected = prediction.choice === choice;
      const percent = percentages[choice] || 0;
      const label = $('b', option);
      const percentLabel = $('strong', option);
      const percentBar = $('em', option);
      if (label) label.textContent = choiceLabel(match, choice);
      if (percentLabel) percentLabel.textContent = `${percent}%`;
      if (percentBar) percentBar.style.width = `${percent}%`;
      option.classList.toggle('selected', selected);
      option.disabled = locked;
      option.setAttribute('aria-pressed', String(selected));
    });
    predictionChoice.textContent = choiceLabel(match, prediction.choice);
    pollVotes.textContent = prediction.choice ? 'Prediction saved on this device' : 'Choose a side on the Prediction page';
    castVote.textContent = locked ? 'View prediction status ↗' : 'Open full prediction ↗';
    castVote.classList.toggle('is-complete', Boolean(prediction.choice));
    changePrediction.disabled = locked || !prediction.choice;
  };
  const renderAward = () => {
    const rewards = predictionState.fanRewards;
    awardVote.classList.toggle('selected', rewards.awardSelected);
    awardVote.setAttribute('aria-pressed', String(rewards.awardSelected));
    awardSubmit.disabled = rewards.awardVoted;
    awardSubmit.textContent = rewards.awardVoted ? 'Vote recorded ✓' : 'Vote for this goal +100 PTS';
    awardSubmit.classList.toggle('is-complete', rewards.awardVoted);
  };
  const renderQuiz = () => {
    const quizState = predictionState.quiz || defaultPredictionState.quiz;
    const activeId = quizState.activeId || 'quiz-01';
    const attempt = quizState.attempts?.[activeId];
    const started = Boolean(quizState.started?.[activeId]);
    const current = Number.isInteger(quizState.current?.[activeId]) ? quizState.current[activeId] : 0;
    quizOptions.forEach((option) => {
      option.disabled = false;
      option.classList.remove('correct', 'wrong');
      option.setAttribute('aria-pressed', 'false');
    });
    if (quizProgress) quizProgress.textContent = attempt ? 'COMPLETED' : started ? `QUESTION ${current + 1}/5` : 'OPEN ON PREDICTION';
    if (attempt) {
      quizFeedback.textContent = `Quiz completed: ${attempt.correct}/5 correct · +${attempt.pointsAwarded} PTS added.`;
      quizFeedback.classList.add('is-correct');
    } else if (started) {
      quizFeedback.textContent = `Quiz in progress: question ${current + 1} of 5. Continue on the Prediction page.`;
      quizFeedback.classList.remove('is-correct');
    } else {
      quizFeedback.textContent = 'Open the Prediction page to play this quiz.';
      quizFeedback.classList.remove('is-correct');
    }
  };
  const updateFanCountdown = () => {
    const match = getMatch();
    const remaining = Math.max(0, new Date(match.deadlineAt).getTime() - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    fanCountdown.textContent = remaining ? `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s` : 'Predictions closed';
  };
  const renderFanZone = () => {
    renderFanProfile();
    renderPoll();
    renderAward();
    renderQuiz();
    updateFanCountdown();
  };
  const syncFromPredictionPage = () => {
    predictionState = readPredictionState();
    renderFanZone();
  };

  pollOptions.forEach((option) => option.addEventListener('click', () => {
    const match = getMatch();
    const prediction = getMatchPrediction(match, true);
    if (isLocked(match, prediction)) {
      notifyFan('This prediction is locked. View the result on the Prediction page.', 'info');
      return;
    }
    prediction.choice = option.dataset.pollOption;
    prediction.updatedAt = new Date().toISOString();
    predictionState.activeMatchKey = getMatchKey();
    savePredictionState();
    renderFanZone();
    notifyFan(`Prediction saved for ${choiceLabel(match, prediction.choice)}.`, 'success');
  }));
  castVote.addEventListener('click', () => { window.location.href = 'prediction.html#challenge'; });
  changePrediction.addEventListener('click', () => {
    const match = getMatch();
    const prediction = getMatchPrediction(match, true);
    if (isLocked(match, prediction)) return;
    prediction.choice = null;
    savePredictionState();
    renderFanZone();
    notifyFan('Pick a new prediction on the Prediction page.', 'info');
  });
  awardVote.addEventListener('click', () => {
    if (predictionState.fanRewards.awardVoted) return;
    predictionState.fanRewards.awardSelected = !predictionState.fanRewards.awardSelected;
    savePredictionState();
    renderAward();
  });
  awardSubmit.addEventListener('click', () => {
    if (predictionState.fanRewards.awardVoted) return;
    if (!predictionState.fanRewards.awardSelected) {
      notifyFan('Select Neo Maema before submitting your award vote.', 'info');
      return;
    }
    const transactionId = 'reward:goal-week';
    if (!predictionState.transactions.some((item) => item.id === transactionId)) {
      predictionState.rewardPoints = Number(predictionState.rewardPoints || 0) + 100;
      predictionState.transactions.push({ id: transactionId, type: 'reward', points: 100, label: 'Goal of the Week vote', createdAt: new Date().toISOString() });
    }
    predictionState.fanRewards.awardVoted = true;
    savePredictionState();
    renderFanZone();
    notifyFan('Award vote recorded — +100 PTS added.', 'success');
  });
  quizOptions.forEach((option) => option.addEventListener('click', () => { window.location.href = 'prediction.html#quiz'; }));
  window.addEventListener('tml-predictionstatechange', syncFromPredictionPage);
  window.addEventListener('storage', (event) => { if (event.key === bridge?.storageKey || event.key === bridge?.legacyStorageKey) syncFromPredictionPage(); });

  renderFanZone();
  window.setInterval(updateFanCountdown, 1000);
}
/* Premium, one-time scroll choreography */
function initScrollReveals() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealObserver = !reduceMotion && 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -9% 0px' })
    : null;

  const revealGroups = [
    { selector: '.section-heading h2, .match-centre-hero .match-intro h2, .moments-heading h2, .leadership-heading h2, .fan-zone-heading h2, .newsletter-copy h2', type: 'heading' },
    { selector: '.match-section .upcoming-heading', type: 'heading' },
    { selector: '.section-heading .text-link, .match-centre-hero .season-lockup, .moments-actions, .leadership-heading > .leadership-portal, .leadership-stats, .fan-zone-heading > p, .reward-stack, .newsletter-form, .footer-links', type: 'right' },
    { selector: '.stories-section .news-feature, .match-centre-hero .match-intro, .leader-card, .fan-points-card, .newsletter-mark, .footer-brand', type: 'left' },
    { selector: '.match-section .upcoming-card', type: 'up', stagger: 65, base: 58 },
    { selector: '.match-section .match-tabs', type: 'up', base: 64 },
    { selector: '.match-section .match-panel-heading', type: 'heading' },
    { selector: '.match-section .match-row', type: 'up', stagger: 58, base: 92 },
    { selector: '.match-section .table-wrap', type: 'up', base: 92 },
    { selector: '.league-rail .competition, .stories-section .news-item, .moments-lede, .moment-card, .leadership-stat, .leader-roles > div, .prediction-card, .award-card, .trivia-card, .newsletter-copy, .footer-top > p, .footer-bottom', type: 'up', stagger: 58 },
    { selector: '.leader-photo, .season-ball', type: 'image' },
  ];

  const getMatches = (scope, selector) => {
    const matches = [];
    if (scope.nodeType === 1 && scope.matches(selector)) matches.push(scope);
    matches.push(...scope.querySelectorAll(selector));
    return matches;
  };

  const decorate = (scope = document) => {
    revealGroups.forEach(({ selector, type, stagger = 0, base = 0 }) => {
      getMatches(scope, selector).forEach((element) => {
        if (element.dataset.scrollRevealReady) return;
        element.dataset.scrollRevealReady = 'true';
        element.classList.add('scroll-reveal', `scroll-reveal--${type}`);
        const siblings = element.parentElement ? [...element.parentElement.querySelectorAll(selector)] : [];
        const siblingIndex = Math.max(0, siblings.indexOf(element));
        element.style.setProperty('--reveal-delay', `${base + Math.min(siblingIndex, 8) * stagger}ms`);
        if (reduceMotion || !revealObserver) element.classList.add('is-visible');
        else revealObserver.observe(element);
      });
    });
  };

  decorate();
  if (revealObserver) {
    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node.nodeType === 1) decorate(node);
      }));
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  }
}

/* Still moments: open the selected reel only when a fan asks to watch it. */
function initMomentPlayback() {
  const cards = $$('[data-moment-card]');
  const modal = $('[data-moment-modal]');
  if (!cards.length || !modal) return;
  const player = $('[data-moment-player]', modal);
  const title = $('[data-moment-title]', modal);
  const description = $('[data-moment-description]', modal);
  const fallback = $('[data-moment-fallback]', modal);
  let lastCard = null;
  let closeTimer = 0;

  const showFallback = () => {
    fallback.hidden = false;
    player.controls = false;
  };
  const closeMoment = () => {
    if (modal.hidden) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('moment-modal-open');
    player.pause();
    player.removeAttribute('src');
    player.load();
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => { modal.hidden = true; }, 240);
    if (lastCard) lastCard.focus();
  };
  const openMoment = (card) => {
    lastCard = card;
    const image = $('img', card);
    const cardTitle = $('.moment-copy strong', card);
    const cardLabel = $('.moment-copy small', card);
    title.textContent = cardTitle ? cardTitle.textContent.trim() : 'Moment replay.';
    description.textContent = cardLabel ? 'A curated ' + cardLabel.textContent.trim().toLowerCase() + ' from Tanzania football.' : 'A curated matchday moment from Tanzania football.';
    fallback.hidden = true;
    player.controls = true;
    if (image) player.poster = image.currentSrc || image.src;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('moment-modal-open');
    window.clearTimeout(closeTimer);
    window.requestAnimationFrame(() => modal.classList.add('is-open'));
    const source = card.dataset.momentVideo;
    if (!source) {
      showFallback();
    } else {
      player.src = source;
      player.load();
      const playRequest = player.play();
      if (playRequest && typeof playRequest.catch === 'function') playRequest.catch(() => { description.textContent = 'Press play to watch this moment.'; });
    }
    window.setTimeout(() => $('[data-moment-close]', modal)?.focus(), 40);
  };

  cards.forEach((card) => {
    const cardTitle = $('.moment-copy strong', card);
    if (!card.getAttribute('aria-label') && cardTitle) card.setAttribute('aria-label', 'Play video: ' + cardTitle.textContent.trim());
    card.addEventListener('click', (event) => { event.preventDefault(); openMoment(card); });
    card.addEventListener('keydown', (event) => {
      if (event.key === ' ') { event.preventDefault(); openMoment(card); }
    });
  });
  $$('[data-moment-close]', modal).forEach((button) => button.addEventListener('click', closeMoment));
  player.addEventListener('error', showFallback);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !modal.hidden) closeMoment(); });
}
initMomentPlayback();
initScrollReveals();