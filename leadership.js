document.documentElement.classList.add('js');
const boardMembers = [
  ['Nassor Idrissa', 'Chairperson - Premier League Board', 'images/leadership/board-nassor-idrissa.png', 'Anaongoza Bodi ya Ligi Kuu Tanzania na kusimamia utekelezaji wa mikakati ya maendeleo ya ligi.'],
  ['Hassan Muhsin', 'Vice Chairperson - Premier League Board', 'images/leadership/board-hassan-muhsin.png', 'Anasaidia mwenyekiti katika usimamizi na kuhakikisha malengo ya ligi yanafikiwa.'],
  ['Cornel L. Barnabas', 'Chief Executive Officer - Premier League Board', 'images/leadership/board-cornel-barnabas.png', 'Anasimamia shughuli za kila siku na utekelezaji wa maamuzi ya bodi.'],
  ['Oscar Mirambo', 'Acting Secretary General - TFF', 'images/leadership/board-oscar-mirambo.png', 'Anaratibu mawasiliano, mikutano na nyaraka za bodi pamoja na TFF.'],
  ['Japhet Makau', 'Board Member - Premier League', 'images/leadership/board-japhet-makau.png'],
  ['Gilbert Nkoronko', 'Board Member - Premier League', 'images/leadership/board-gilbert-nkoronko.png'],
  ['Mjumbe Mwakilishi', 'Representative Member - Premier League', 'images/leadership/board-representative-premier.png'],
  ['Hillary Ndumbaro', 'Representative Member - Championship', 'images/leadership/board-hillary-ndumbaro.png'],
  ['Ahmed Gao', 'Representative Member - Championship', 'images/leadership/board-ahmed-gao.png'],
  ['Azimkhan Akber', 'Representative Member - First League', 'images/leadership/board-azimkhan-akber.png'],
  ['Kheri Misinga', 'Appointed Member', 'images/leadership/board-kheri-misinga.png'],
  ['Shani Christoms', 'Appointed Member', 'images/leadership/board-shani-christoms.png']
];
const secretariatMembers = [
  ['Cornel L. Barnabas', 'Afisa Mtendaji Mkuu', 'images/leadership/secretariat-cornel-barnabas.png', '*'],
  ['Maua Rubibi', 'Msaidizi Binafsi - Afisa Mtendaji Mkuu', 'images/leadership/secretariat-02.png', '+'],
  ['AQPA (T.) Ibrahim Nmaeyela', 'Idara ya Fedha', 'images/leadership/secretariat-03.png', 'F'],
  ['Hassan Abdallah', 'Idara ya Ligi', 'images/leadership/secretariat-04.png', 'L'],
  ['Fatma Abdallah', 'Idara ya Uendeshaji', 'images/leadership/secretariat-05.png', 'U'],
  ['Anna Ndaro', 'Idara ya Rasilimali Watu', 'images/leadership/secretariat-06.png', 'W'],
  ['Yahaya Abushene', 'Idara ya Habari na Mawasiliano', 'images/leadership/secretariat-07.png', 'H'],
  ['Jerry Temu', 'Idara ya Masoko', 'images/leadership/secretariat-08.png', 'M'],
  ['Neema Hassan', 'Idara ya Udhibiti na Utekelezaji', 'images/leadership/secretariat-09.png', 'C'],
  ['Abdu Mgugu', 'Idara ya Manunuzi na Ugavi', 'images/leadership/secretariat-10.png', 'S']
];
const boardRoot = document.querySelector('[data-board-members]');
if (boardRoot) boardRoot.innerHTML = boardMembers.map((member, index) => `<article class="leadership-member-card ${index < 4 ? 'member-card-feature' : ''} accent-${index % 4} reveal-item"><span class="member-portrait"><img src="${member[2]}" alt="${member[0]} portrait" loading="lazy" /></span><span class="member-card-body"><span class="member-number">${String(index + 1).padStart(2, '0')} / 12</span><strong class="member-name">${member[0]}</strong><small class="member-role">${member[1]}</small>${member[3] ? `<small class="member-bio">${member[3]}</small>` : ''}</span><span class="member-card-mark" aria-hidden="true">*</span></article>`).join('');
const secretariatRoot = document.querySelector('[data-secretariat-roles]');
if (secretariatRoot) secretariatRoot.innerHTML = secretariatMembers.map((member, index) => `<article class="secretariat-role-card secretariat-accent-${index % 5} ${index < 2 ? 'secretariat-command-card' : ''} reveal-item"><span class="secretariat-portrait"><img src="${member[2]}" alt="${member[0]} portrait" loading="lazy" /></span><span class="secretariat-role-number">${String(index + 1).padStart(2, '0')} / 10</span><span class="secretariat-department-mark" aria-hidden="true">${member[3] || '*'}</span><strong>${member[0]}</strong><small>${member[1]}</small></article>`).join('');
const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .12 }) : null;
document.querySelectorAll('.reveal-item').forEach((item) => observer ? observer.observe(item) : item.classList.add('is-visible'));
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