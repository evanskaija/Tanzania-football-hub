(function () {
  'use strict';

  const storageKey = 'tml-prediction-state-v4';
  const legacyStorageKey = 'tml-prediction-state-v3';
  const matches = {
    premier: { id: 'premier-2026-10-12', league: 'NBC PREMIER LEAGUE', logo: 'images/Tz NBC pl.png', home: 'Simba SC', away: 'Young Africans', homeLogo: 'images/simba.jpg', awayLogo: 'images/yanga.jpg', date: '12 OCT 2026', time: '4:00 PM EAT', stadium: 'Benjamin Mkapa Stadium', deadlineAt: '2026-10-12T13:45:00+03:00', officialResult: null },
    championship: { id: 'championship-2026-10-18', league: 'NBC CHAMPIONSHIP', logo: 'images/TzNBC championship.png', home: 'Mbeya Kwanza', away: 'KMC', homeLogo: 'images/TzNBC championship.png', awayLogo: 'images/nbc_championship.png', date: '18 OCT 2026', time: '3:00 PM EAT', stadium: 'Sokoine Stadium', deadlineAt: '2026-10-18T14:00:00+03:00', officialResult: null },
    first: { id: 'first-2026-10-19', league: 'FIRST LEAGUE', logo: 'images/Tz first league.png', home: 'TMA', away: 'Bigman', homeLogo: 'images/Tz first league.png', awayLogo: 'images/first-league-logo.png', date: '19 OCT 2026', time: '3:00 PM EAT', stadium: 'Uhuru Stadium', deadlineAt: '2026-10-19T14:00:00+03:00', officialResult: null },
    women: { id: 'women-2026-10-20', league: "WOMEN'S PREMIER LEAGUE", logo: 'images/women-ligue-nbc.png', home: 'Simba Queens', away: 'JKT Queens', homeLogo: 'images/simba-queenz.jpg', awayLogo: 'images/women-ligue-nbc.png', date: '20 OCT 2026', time: '4:00 PM EAT', stadium: 'Azam Complex', deadlineAt: '2026-10-20T15:00:00+03:00', officialResult: null }
  };

  const readState = () => {
    try {
      return JSON.parse(window.localStorage.getItem(storageKey) || window.localStorage.getItem(legacyStorageKey) || 'null');
    } catch (error) {
      return null;
    }
  };
  const writeState = (state) => {
    try { window.localStorage.setItem(storageKey, JSON.stringify(state)); } catch (error) { /* Local storage can be unavailable in file previews. */ }
    window.dispatchEvent(new CustomEvent('tml-predictionstatechange', { detail: state }));
  };
  const totalPoints = (state) => Number(state?.predictionPoints || 0) + Number(state?.quizPoints || 0) + Number(state?.rewardPoints || 0);
  const broadcast = (state) => window.dispatchEvent(new CustomEvent('tml-predictionstatechange', { detail: state }));

  window.TML_PREDICTION = { storageKey, legacyStorageKey, matches, readState, writeState, totalPoints, broadcast };
  window.addEventListener('storage', (event) => {
    if (event.key === storageKey || event.key === legacyStorageKey) window.dispatchEvent(new CustomEvent('tml-predictionstatechange', { detail: readState() }));
  });
}());
