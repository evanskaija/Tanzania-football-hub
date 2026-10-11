const competitions = [
  {
    id: 'premier', name: 'NBC Premier League', label: 'NBC PREMIER LEAGUE', logo: 'images/Tz NBC pl.png', accent: '#ff842a',
    description: 'The flagship stage: big clubs, bigger nights and the race for Tanzania’s top prize.', clubs: 16, matchweek: 'Matchweek 08', leader: 'Simba SC', leaderPoints: 21,
    topScorer: 'Feisal Salum', goals: 8, today: 3
  },
  {
    id: 'championship', name: 'NBC Championship League', label: 'NBC CHAMPIONSHIP', logo: 'images/TzNBC championship.png', accent: '#65aee6',
    description: 'The proving ground where hungry clubs build momentum and chase promotion.', clubs: 16, matchweek: 'Matchweek 05', leader: 'KMC FC', leaderPoints: 11,
    topScorer: 'Salum Kihimbi', goals: 6, today: 4
  },
  {
    id: 'first', name: 'First League', label: 'FIRST LEAGUE', logo: 'images/Tz first league.png', accent: '#ec6a2b',
    description: 'Raw ambition, local pride and the next generation of Tanzanian football stories.', clubs: 24, matchweek: 'Matchweek 04', leader: 'Mbeya Kwanza', leaderPoints: 10,
    topScorer: 'Abdul Mussa', goals: 5, today: 2
  },
  {
    id: 'women', name: "Women's Premier League", label: "WOMEN'S PREMIER LEAGUE", logo: 'images/women-ligue-nbc.png', accent: '#d66caa',
    description: 'The women’s game moves forward with skill, speed and a new generation of leaders.', clubs: 12, matchweek: 'Matchweek 06', leader: 'Simba Queens', leaderPoints: 15,
    topScorer: 'Clara Luvanga', goals: 7, today: 2
  }
];

const byId = (id) => competitions.find((competition) => competition.id === id) || competitions[0];
const clubLogoCatalog = {
  'Simba SC': 'images/simba.jpg', 'Young Africans': 'images/yanga.jpg', 'Azam FC': 'images/azam.jpg', 'Mashujaa': 'images/mashujaa-fc.jpg', 'Mashujaa FC': 'images/mashujaa-fc.jpg', 'Singida BS': 'images/singida.jpg', 'Dodoma Jiji': 'images/dodoma-jiji.jpg', 'Polisi Tanzania': 'images/tanzania-prison.jpg', 'Polisi Tanzania FC': 'images/tanzania-prison.jpg', 'Mbeya City': 'images/mbeya-city.jpg', 'JKT Tanzania': 'images/jkt-tanzania.jpg', 'Namungo FC': 'images/namungo-fc.jpg', 'Geita Gold': 'images/feitoto.jpg', 'Geita Gold FC': 'images/feitoto.jpg', 'Coastal Union': 'images/costal-union.jpg', 'TRA United': 'images/tra-united.jpg', 'Kagera Sugar': 'images/mtibwa-suger.jpg', 'Pamba Jiji': 'images/pamba-jiji.jpg', 'Fountain Gate': 'images/fauntaingate.jpg', 'Fountain Gate FC': 'images/fauntaingate.jpg', 'KMC FC': 'images/kmc.jpg', 'Transit Camp': 'images/tra-united.jpg', 'Tanzania Prisons': 'images/tanzania-prison.jpg', 'Stand United': 'images/mtibwa-suger.jpg', 'Kigamboni United': 'images/feitoto.jpg', 'Mtibwa Sugar': 'images/mtibwa-suger.jpg', 'Rhino Rangers': 'images/rhino-rangers.svg', 'Bandari Tanzania': 'images/costal-union.jpg', 'KenGold FC': 'images/feitoto.jpg', 'IAA SC': 'images/mbeya-city.jpg', 'Songea United': 'images/tra-united.jpg', 'Mbeya Kwanza': 'images/mbeya-city.jpg', 'Gunners FC': 'images/kmc.jpg', 'Mbuni': 'images/pamba-jiji.jpg', 'TMA': 'images/tanzania-prison.jpg', 'Bigman FC': 'images/bigman-fc.svg', 'Simba Queens': 'images/simba-queens.jpg', 'Yanga Princess': 'images/yanga.jpg', 'JKT Queens': 'images/jkt-quens.jpg', 'Alliance Girls': 'images/feitoto.jpg', 'Lady Doves': 'images/women_troph.png', 'Mlandizi Queens': 'images/jkt-quens.jpg'
};
const clubBadge = (club) => clubLogoCatalog[club] ? `<img src="${clubLogoCatalog[club]}" alt="${club} badge" loading="lazy" />` : '';
const logo = (competition, className = 'match-league-logo') => `<span class="${className}"><img src="${competition.logo}" alt="${competition.name} logo" loading="lazy" /></span>`;

const leagueCards = document.querySelector('[data-league-cards]');
if (leagueCards) {
  leagueCards.innerHTML = competitions.map((competition, index) => `
    <a class="league-card" style="--league-accent:${competition.accent}" href="league.html?competition=${competition.id}" aria-label="View ${competition.name}">
      <span class="league-card-head"><span class="league-card-number">0${index + 1} / 04</span><span class="league-card-arrow">&rarr;</span></span>
      <span class="league-card-logo"><img src="${competition.logo}" alt="${competition.name} logo" loading="lazy" /></span>
      <span class="league-card-label">${competition.label}</span>
      <h3>${competition.name}</h3>
      <p class="league-card-description">${competition.description}</p>
      <span class="league-card-stats"><span><strong>${competition.clubs}</strong>clubs</span><span><strong>${competition.matchweek.replace('Matchweek ', 'MW ')}</strong>current round</span></span>
      <span class="league-card-link">View competition <span>&rarr;</span></span>
    </a>`).join('');
}

const featuredRoot = document.querySelector('[data-featured-competition]');
if (featuredRoot) {
  const featured = byId('premier');
  featuredRoot.innerHTML = `
    <article class="featured-card" style="--league-accent:${featured.accent}">
      <div class="featured-card-main">
        <span class="featured-card-kicker">MOST ACTIVE RIGHT NOW / ${featured.matchweek}</span>
        <div class="featured-card-identity">
          <span class="featured-logo"><img src="${featured.logo}" alt="${featured.name} logo" /></span>
          <div><h3>NBC Premier<br /><em>League.</em></h3><div class="featured-meta"><span>Season <b>2026 / 27</b></span><span>Leader <b>${featured.leader}</b></span></div></div>
        </div>
        <nav class="featured-tabs" aria-label="NBC Premier League navigation">
          <a class="active" href="league.html?competition=premier">Overview</a><a href="league.html?competition=premier#fixtures">Fixtures</a><a href="league.html?competition=premier#results">Results</a><a href="league.html?competition=premier#table">Table</a><a href="league.html?competition=premier#scorers">Top scorers</a><a href="league.html?competition=premier#news">News</a>
        </nav>
      </div>
      <div class="featured-card-side">
        <span class="featured-side-kicker">Next big match / NBC Premier League</span>
        <div class="featured-match"><span class="featured-match-date">Saturday / 10 October / Full time</span><div class="featured-match-teams"><strong>${clubBadge('Simba SC')}Simba SC</strong><b>2 - 1</b><strong>${clubBadge('Young Africans')}Young Africans</strong></div></div>
        <div class="featured-facts"><span>Current leader<strong>${featured.leader}</strong></span><span>Top scorer<strong>${featured.goals} <small>goals</small></strong></span><span>Matches today<strong>${featured.today}</strong></span></div>
      </div>
    </article>`;
}

const quickStats = [
  ['58', 'Total clubs'], ['146', 'Matches played'], ['384', 'Goals scored'], ['4', 'Competitions'], ['11', 'Matches today']
];
const quickStatsRoot = document.querySelector('[data-quick-stats]');
if (quickStatsRoot) quickStatsRoot.innerHTML = quickStats.map(([value, label]) => `<div class="quick-stat"><i></i><strong>${value}</strong><span>${label}</span></div>`).join('');

const latestMatches = [
  { competition: 'premier', home: 'Simba SC', away: 'Young Africans', score: '2 - 1', status: 'Full time', date: '10 Oct 2026', venue: 'Benjamin Mkapa Stadium' },
  { competition: 'premier', home: 'Coastal Union', away: 'Azam FC', score: '0 — 2', status: 'Full time', date: '09 Oct 2026', venue: 'Mkwakwani Stadium' },
  { competition: 'premier', home: 'Dodoma Jiji', away: 'Singida BS', score: '1 — 1', status: 'Full time', date: '09 Oct 2026', venue: 'Jamhuri Stadium' },
  { competition: 'championship', home: 'KMC FC', away: 'Gunners FC', score: '1 — 1', status: 'Full time', date: '09 Oct 2026', venue: 'Uhuru Stadium' },
  { competition: 'first', home: 'Rhino Rangers', away: 'Bigman FC', score: '4:00 PM', status: 'Today', date: '11 Oct 2026', venue: 'Tabora Boys Stadium', pending: true },
  { competition: 'women', home: 'Simba Queens', away: 'JKT Queens', score: '3 — 0', status: 'Full time', date: '08 Oct 2026', venue: 'Azam Complex' },
  { competition: 'championship', home: 'Mbeya Kwanza', away: 'Mbuni', score: '2 — 1', status: 'Full time', date: '08 Oct 2026', venue: 'Sokoine Stadium' }
];
const latestMatchesRoot = document.querySelector('[data-latest-matches]');
if (latestMatchesRoot) {
  latestMatchesRoot.innerHTML = latestMatches.map((match) => {
    const competition = byId(match.competition);
    return `<article class="latest-match${match.pending ? ' result-pending' : ''}" style="--league-accent:${competition.accent}">${logo(competition)}<div><span class="latest-match-league">${competition.label}</span><div class="latest-match-teams"><strong>${clubBadge(match.home)}${match.home}</strong><b>vs</b><strong>${clubBadge(match.away)}${match.away}</strong></div><span class="latest-match-meta">${match.date} / ${match.venue}</span></div><div class="latest-match-result"><strong>${match.score}</strong><span>${match.status}</span></div></article>`;
  }).join('');
}

const upcomingFixtures = [
  { competition: 'premier', day: '12', month: 'OCT', home: 'Simba SC', away: 'Azam FC', time: '4:00 PM', venue: 'Benjamin Mkapa Stadium' },
  { competition: 'championship', day: '11', month: 'OCT', home: 'Rhino Rangers', away: 'Bigman FC', time: '4:00 PM', venue: 'Tabora Boys Stadium' },
  { competition: 'first', day: '12', month: 'OCT', home: 'Mbeya Kwanza', away: 'KenGold FC', time: '4:00 PM', venue: 'Sokoine Stadium' },
  { competition: 'women', day: '13', month: 'OCT', home: 'Simba Queens', away: 'JKT Queens', time: '3:00 PM', venue: 'Azam Complex' }
];
const upcomingRoot = document.querySelector('[data-upcoming-fixtures]');
if (upcomingRoot) upcomingRoot.innerHTML = upcomingFixtures.map((fixture) => { const competition = byId(fixture.competition); return `<a class="upcoming-row" href="league.html?competition=${competition.id}#fixtures"><span class="upcoming-league-logo"><img src="${competition.logo}" alt="${competition.name} logo" loading="lazy" /></span><span class="fixture-date">${fixture.day}<small>${fixture.month}</small></span><span class="fixture-main"><strong>${clubBadge(fixture.home)}${fixture.home} <small>vs</small> ${clubBadge(fixture.away)}${fixture.away}</strong><span>${competition.label} / ${fixture.venue}</span></span><span class="fixture-time"><b>${fixture.time}</b><small>UP NEXT</small></span></a>`; }).join('');

const leaders = [
  { competition: 'premier', club: 'Simba SC', points: 21, image: 'images/simba.jpg' },
  { competition: 'championship', club: 'KMC FC', points: 11, image: 'images/kmc.jpg' },
  { competition: 'first', club: 'Mbeya Kwanza', points: 10, image: 'images/mbeya-city.jpg' },
  { competition: 'women', club: 'Simba Queens', points: 15, image: 'images/simba-queens.jpg' }
];
const leadersRoot = document.querySelector('[data-league-leaders]');
if (leadersRoot) leadersRoot.innerHTML = leaders.map((leader, index) => { const competition = byId(leader.competition); return `<a class="leader-row" href="league.html?competition=${competition.id}#table"><span class="leader-rank">0${index + 1}</span><span class="leader-logo"><img src="${leader.image}" alt="${leader.club} logo" loading="lazy" /></span><span class="leader-competition-logo"><img src="${competition.logo}" alt="${competition.name} logo" loading="lazy" /></span><span class="leader-main"><strong>${leader.club}</strong><span>${competition.label}</span></span><span class="leader-points">${leader.points}<small>pts</small></span></a>`; }).join('');

const scorers = [
  { name: 'Feisal Salum', club: 'Young Africans', competition: 'premier', goals: 8, image: 'images/feisal-salum.png' },
  { name: 'Clara Luvanga', club: 'Simba Queens', competition: 'women', goals: 7, image: 'images/simba-queenz.jpg' },
  { name: 'Salum Kihimbi', club: 'KMC FC', competition: 'championship', goals: 6, image: 'images/max nzengeli.png' },
  { name: 'Abdul Mussa', club: 'Mbeya Kwanza', competition: 'first', goals: 5, image: 'images/player_1.png' },
  { name: 'Clement Mzize', club: 'Young Africans', competition: 'premier', goals: 5, image: 'images/clement-mzize.png' }
];
const scorersRoot = document.querySelector('[data-top-scorers]');
if (scorersRoot) scorersRoot.innerHTML = scorers.map((scorer, index) => { const competition = byId(scorer.competition); return `<article class="scorer-card"><div class="scorer-photo"><img src="${scorer.image}" alt="${scorer.name}" loading="lazy" /><span class="scorer-rank">0${index + 1}</span><span class="scorer-goals">${scorer.goals}<small>goals</small></span></div><div class="scorer-body"><span class="scorer-league-lockup" style="color:${competition.accent}"><img src="${competition.logo}" alt="${competition.name} logo" loading="lazy" /><span>${competition.label}</span></span><h3>${scorer.name}</h3><p>${scorer.club}</p></div></article>`; }).join('');

const news = [
  { image: 'images/mashujaa-fc.jpg', competition: 'premier', label: 'NBC PREMIER LEAGUE', title: 'Mashujaa, Pamba Jiji and Namungo return strong to the NBC Premier League.', excerpt: 'A new stretch of the season opens with renewed ambition, fresh pressure and plenty to prove.', date: '09.10.26' },
  { image: 'images/tplb-management-2026.jpeg', competition: 'premier', label: 'OFFICIAL STATEMENT', title: 'The league operations room sets the rhythm for the next round.', date: '08.10.26' },
  { image: 'images/simba-queens.jpg', competition: 'women', label: "WOMEN'S PREMIER LEAGUE", title: 'Simba Queens keep the standard high as the women’s season gathers pace.', date: '07.10.26' }
];
const newsRoot = document.querySelector('[data-competition-news]');
if (newsRoot) {
  const feature = news[0];
newsRoot.innerHTML = `<article class="competition-news-feature"><div class="competition-news-image" style="background-image:url('${feature.image}')"><span class="competition-news-label">${feature.label}</span><span class="competition-news-badge"><img src="${byId(feature.competition).logo}" alt="${byId(feature.competition).name} logo" loading="lazy" /></span></div><div class="competition-news-copy"><p class="story-category"><span class="news-category-lockup"><img src="${byId(feature.competition).logo}" alt="" loading="lazy" />${feature.label}</span></p><h3>${feature.title}</h3><p>${feature.excerpt}</p><div class="competition-news-footer"><span>${feature.date} / 06 MIN READ</span><a href="index.html#stories">Read more <span>&rarr;</span></a></div></div></article><div class="competition-news-side">${news.slice(1).map((story) => `<article class="competition-news-card"><div class="competition-news-image" style="background-image:url('${story.image}')"><span class="competition-news-badge"><img src="${byId(story.competition).logo}" alt="${byId(story.competition).name} logo" loading="lazy" /></span></div><div class="competition-news-copy"><p class="story-category"><span class="news-category-lockup"><img src="${byId(story.competition).logo}" alt="" loading="lazy" />${story.label}</span></p><h3>${story.title}</h3><div class="competition-news-footer"><span>${story.date}</span><a href="index.html#stories" aria-label="Read ${story.title}">&rarr;</a></div></div></article>`).join('')}</div>`;
}

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuToggle.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });
  mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    mainNav.classList.remove('open'); menuToggle.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open');
  }));
}

const drawer = document.querySelector('[data-search-drawer]');
const searchTrigger = document.querySelector('[data-search-trigger]');
const searchClose = document.querySelector('[data-search-close]');
const searchInput = document.querySelector('.search-form input');
if (drawer && searchTrigger && searchClose) {
  const closeSearch = () => { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); document.body.classList.remove('drawer-open'); };
  searchTrigger.addEventListener('click', () => { drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); document.body.classList.add('drawer-open'); window.setTimeout(() => searchInput && searchInput.focus(), 180); });
  searchClose.addEventListener('click', closeSearch);
  drawer.addEventListener('click', (event) => { if (event.target === drawer) closeSearch(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeSearch(); });
}

const searchForm = document.querySelector('[data-search-form]');
if (searchForm) searchForm.addEventListener('submit', (event) => { event.preventDefault(); if (searchInput && searchInput.value.trim()) searchInput.placeholder = 'Searching the notebook...'; });

const newsletterForm = document.querySelector('[data-newsletter-form]');
if (newsletterForm) newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = newsletterForm.querySelector('input');
  const button = newsletterForm.querySelector('button');
  const note = newsletterForm.querySelector('.form-note');
  if (!input.value) return;
  button.innerHTML = "You're in <span>&check;</span>";
  button.disabled = true;
  note.textContent = 'Welcome to the clubhouse. Check your inbox for the first whistle.';
  note.style.color = '#ffb45c';
});
