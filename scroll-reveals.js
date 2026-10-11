(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealGroups = [
    { selector: '.reveal-item.reveal-left, .contact-info-card, .article-body, .competition-hero-copy, .news-hero-copy, .prediction-hero-copy, .club-hero-identity, .league-hero-layout > div:first-child, .newsletter-copy, .footer-brand', type: 'left' },
    { selector: '.reveal-item.reveal-right, .contact-form-card, .contact-directions-card, .article-aside, .news-hero-story, .prediction-hero-card, .league-hero-side, .newsletter-form, .trending-panel, .footer-office-column', type: 'right' },
    { selector: '.reveal-item.reveal-up, .reveal-item:not(.reveal-left):not(.reveal-right):not(.reveal-bottom), .hero h1, .competition-hero h1, .prediction-hero h1, .news-hero h1, .clubs-hero h1, .leadership-hero h1, .contact-hero h1, .article-hero h1, .club-profile-hero h1, .league-detail-hero h1, .section-heading h2, .competition-section-heading h2, .news-section-heading h2, .detail-section-heading h2, .profile-panel-heading h2, .history-honours-heading h2, .quick-stats-section h2, .leadership-heading h2, .fan-zone-heading h2, .moments-heading h2, .newsletter-copy h2, .performance-heading h2, .clubs-directory-note h2, .news-pagination-copy h2', type: 'heading' },
    { selector: 'main > section:not(.moment-video-dialog), .site-footer', type: 'up', base: 20 },
    { selector: '.reveal-item.reveal-bottom, .league-card-grid > *, .featured-news-grid > *, .latest-news-grid > *, .category-news-grid > *, .women-news-grid > *, .featured-news-side > *, .competition-news-grid > *, .quick-stats-grid > *, .latest-match-grid > *, .upcoming-list > *, .upcoming-row, .upcoming-card, .leaders-list > *, .leader-row, .leader-card, .scorer-grid > *, .featured-card, .quick-stat, .latest-match, .match-row, .competition-news-feature, .competition-news-card, .featured-news-lead, .featured-news-mini, .latest-news-card, .news-item, .trending-item, .category-news-card, .women-news-card, .news-load-more, .my-predictions-grid > *, .quiz-catalog > *, .previous-results-grid > *, .directory-club-card, .fixture-card, .detail-fixture-grid > *, .detail-result-list > *, .club-grid > *, .detail-news-grid > *, .profile-card, .history-card, .history-honour-card, .team-stat-card, .quick-contact-card, .leadership-stat, .prediction-card, .award-card, .trivia-card, .moments-lede, .moment-card, .footer-link-column, .footer-top > p, .club-chip, .footer-main, .footer-bottom', type: 'up', stagger: 100, base: 35 },
    { selector: '.leadership-member-card:nth-child(odd), .secretariat-role-card:nth-child(odd)', type: 'left', stagger: 90, base: 35 },
    { selector: '.leadership-member-card:nth-child(even), .secretariat-role-card:nth-child(even)', type: 'right', stagger: 90, base: 35 },
    { selector: '.table-wrap, .detail-table-wrap, .profile-table-wrap, .player-table-wrap, .performance-table-wrap, .leaderboard-table-wrap, .match-module, .performance-console', type: 'up', base: 55 },
    { selector: '.leader-photo, .member-portrait, .secretariat-portrait, .club-hero-badge, .league-hero-logo, .news-hero-image, .article-hero-image, .featured-logo, .competition-news-image, .women-news-logo', type: 'image', base: 45 }
  ];

  const revealObserver = !reduceMotion && 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
    : null;

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
  if ('MutationObserver' in window) {
    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node.nodeType === 1) decorate(node);
      }));
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.dataset.noSmoothScroll !== undefined) return;
    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return;
    const target = document.querySelector(hash);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    try { window.history.pushState({}, '', hash); } catch (error) { window.location.hash = hash; }
  });
}());
