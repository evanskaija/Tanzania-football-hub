const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const storageKey = 'tml-prediction-state-v4';
const legacyStorageKey = 'tml-prediction-state-v3';
const makeDefaultState = () => ({
  schemaVersion: 4,
  user: { id: 'local-fan', username: 'Guest Fan', avatar: 'GF' },
  predictionPoints: 0,
  quizPoints: 0,
  rewardPoints: 0,
  activeMatchKey: 'premier',
  predictions: {},
  transactions: [],
  quiz: { activeId: 'quiz-01', current: {}, answers: {}, attempts: {}, started: {}, deadlines: {}, missed: {} },
  fanRewards: { awardSelected: false, awardVoted: false },
  daily: { date: '', started: false, current: 0, answers: {}, missed: {}, deadlines: {}, completed: false, correct: 0, points: 0, streak: 0, lastCompletedDate: '', history: [] },
  subscriptions: []
});

const readState = () => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) || window.localStorage.getItem(legacyStorageKey) || 'null');
    if (!saved || (saved.schemaVersion !== 3 && saved.schemaVersion !== 4)) return makeDefaultState();
    const defaults = makeDefaultState();
    const legacyQuiz = saved.schemaVersion === 3;
    const legacyAttempts = saved.quiz?.attempts || {};
    const quiz = legacyQuiz
      ? { ...defaults.quiz, activeId: saved.quiz?.activeId || defaults.quiz.activeId, attempts: legacyAttempts, current: {}, answers: {}, started: {}, deadlines: {}, missed: {} }
      : { ...defaults.quiz, ...(saved.quiz || {}), current: saved.quiz?.current || {}, answers: saved.quiz?.answers || {}, attempts: saved.quiz?.attempts || {}, started: saved.quiz?.started || {}, deadlines: saved.quiz?.deadlines || {}, missed: saved.quiz?.missed || {} };
    const legacyDailyCompleted = Boolean(saved.daily?.completed);
    const daily = legacyQuiz
      ? { ...defaults.daily, date: legacyDailyCompleted ? saved.daily?.date || '' : '', completed: legacyDailyCompleted, correct: legacyDailyCompleted ? Number(saved.daily?.correct || 0) : 0, points: legacyDailyCompleted ? Number(saved.daily?.points || 0) : 0, streak: Number(saved.daily?.streak || 0), lastCompletedDate: saved.daily?.lastCompletedDate || '', history: saved.daily?.history || [] }
      : { ...defaults.daily, ...(saved.daily || {}), answers: saved.daily?.answers || {}, missed: saved.daily?.missed || {}, deadlines: saved.daily?.deadlines || {}, history: saved.daily?.history || [] };
    return {
      ...defaults,
      ...saved,
      schemaVersion: 4,
      user: { ...defaults.user, ...(saved.user || {}) },
      predictions: saved.predictions || {},
      transactions: saved.transactions || [],
      fanRewards: { ...defaults.fanRewards, ...(saved.fanRewards || {}) },
      quiz,
      daily,
      subscriptions: saved.subscriptions || []
    };
  } catch (error) {
    return makeDefaultState();
  }
};
const state = readState();
const saveState = () => {
  try { window.localStorage.setItem(storageKey, JSON.stringify(state)); } catch (error) { /* static file previews may block storage */ }
  window.TML_PREDICTION?.broadcast(state);
};
const totalPoints = () => Number(state.predictionPoints || 0) + Number(state.quizPoints || 0) + Number(state.rewardPoints || 0);
const scoringFor = (correct) => correct >= 5 ? 3 : correct === 4 ? 2 : correct === 3 ? 1 : 0;
const todayKey = () => {
  const now = new Date();
  return now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
};
const dateDifference = (a, b) => Math.round((new Date(b + 'T12:00:00').getTime() - new Date(a + 'T12:00:00').getTime()) / 86400000);

const matches = window.TML_PREDICTION?.matches || {
  premier: { id: 'premier-2026-10-12', league: 'NBC PREMIER LEAGUE', logo: 'images/Tz NBC pl.png', home: 'Simba SC', away: 'Young Africans', homeLogo: 'images/simba.jpg', awayLogo: 'images/yanga.jpg', date: '12 OCT 2026', time: '4:00 PM EAT', stadium: 'Benjamin Mkapa Stadium', deadlineAt: '2026-10-12T13:45:00+03:00', officialResult: null },
  championship: { id: 'championship-2026-10-18', league: 'NBC CHAMPIONSHIP', logo: 'images/TzNBC championship.png', home: 'Mbeya Kwanza', away: 'KMC', homeLogo: 'images/TzNBC championship.png', awayLogo: 'images/nbc_championship.png', date: '18 OCT 2026', time: '3:00 PM EAT', stadium: 'Sokoine Stadium', deadlineAt: '2026-10-18T14:00:00+03:00', officialResult: null },
  first: { id: 'first-2026-10-19', league: 'FIRST LEAGUE', logo: 'images/Tz first league.png', home: 'TMA', away: 'Bigman', homeLogo: 'images/Tz first league.png', awayLogo: 'images/first-league-logo.png', date: '19 OCT 2026', time: '3:00 PM EAT', stadium: 'Uhuru Stadium', deadlineAt: '2026-10-19T14:00:00+03:00', officialResult: null },
  women: { id: 'women-2026-10-20', league: "WOMEN'S PREMIER LEAGUE", logo: 'images/women-ligue-nbc.png', home: 'Simba Queens', away: 'JKT Queens', homeLogo: 'images/simba-queenz.jpg', awayLogo: 'images/women-ligue-nbc.png', date: '20 OCT 2026', time: '4:00 PM EAT', stadium: 'Azam Complex', deadlineAt: '2026-10-20T15:00:00+03:00', officialResult: null }
};

let answerLetterCursor = 0;
const quizQuestion = (id, question, options, answer) => {
  const correctPosition = answerLetterCursor % 4;
  answerLetterCursor += 1;
  const correctOption = options[answer];
  const distractors = options.filter((_, index) => index !== answer);
  const arranged = [];
  for (let index = 0; index < options.length; index += 1) arranged[index] = index === correctPosition ? correctOption : distractors.shift();
  return { id, question, options: arranged, answer: correctPosition };
};
const quizzes = [
  { id: 'quiz-01', title: 'TFF General Knowledge', questions: [
    quizQuestion('q1', 'What does TFF stand for?', ['Tanzania Football Federation', 'Tanzania Fans Forum', 'Tanzania Finals Federation', 'Tanzania Football Foundation'], 0),
    quizQuestion('q2', 'What is the nickname of Tanzania men\'s national team?', ['Taifa Stars', 'Twiga Stars', 'Wekundu wa Msimbazi', 'Jangwani Boys'], 0),
    quizQuestion('q3', 'What is the nickname of Tanzania women\'s national team?', ['Twiga Stars', 'Taifa Stars', 'Simba Queens', 'Kilimanjaro Queens'], 0),
    quizQuestion('q4', 'Which competition is Tanzania\'s top domestic men\'s league?', ['NBC Premier League', 'First League', 'CECAFA Cup', 'Mapinduzi Cup'], 0),
    quizQuestion('q5', 'Which body administers Tanzania football?', ['TFF', 'CAF only', 'FIFA only', 'TPLB only'], 0)
  ]},
  { id: 'quiz-02', title: 'Tanzania Football History', questions: [
    quizQuestion('q1', 'Which cup is closely associated with Zanzibar football?', ['Mapinduzi Cup', 'FA Community Cup', 'Kilimanjaro Shield', 'Uhuru Trophy'], 0),
    quizQuestion('q2', 'The Kagame Cup is associated with which regional body?', ['CECAFA', 'WAFU', 'COSAFA', 'UNAF'], 0),
    quizQuestion('q3', 'What does a Community Shield usually signal?', ['The start of a new season', 'The end of every match', 'A transfer window', 'A national team camp'], 0),
    quizQuestion('q4', 'Which two clubs contest Tanzania\'s famous Kariakoo derby?', ['Simba SC and Young Africans', 'Azam FC and Coastal Union', 'Mbeya City and KMC', 'Namungo and Mashujaa'], 0),
    quizQuestion('q5', 'Which city is home to the traditional Kariakoo derby rivalry?', ['Dar es Salaam', 'Mbeya', 'Arusha', 'Mwanza'], 0)
  ]},
  { id: 'quiz-03', title: 'Tanzania Clubs', questions: [
    quizQuestion('q1', 'Which club is nicknamed Wekundu wa Msimbazi?', ['Simba SC', 'Young Africans', 'Azam FC', 'Singida Black Stars'], 0),
    quizQuestion('q2', 'Which club is commonly known as Yanga?', ['Young Africans', 'Simba SC', 'Coastal Union', 'Geita Gold'], 0),
    quizQuestion('q3', 'Which club is known by the short name Azam?', ['Azam FC', 'TRA United', 'KMC', 'JKT Tanzania'], 0),
    quizQuestion('q4', 'Which club appears in the current women\'s match example?', ['Simba Queens', 'Pamba Queens', 'Azam Women', 'KMC Ladies'], 0),
    quizQuestion('q5', 'Which club is paired with Simba SC in a Kariakoo derby?', ['Young Africans', 'Mbeya City', 'Mashujaa', 'Namungo'], 0)
  ]},
  { id: 'quiz-04', title: 'Tanzania Competitions', questions: [
    quizQuestion('q1', 'Which competition sits below the Premier League in this portal?', ['NBC Championship', 'Community Shield', 'CAF Cup', 'Mapinduzi Cup'], 0),
    quizQuestion('q2', 'Which competition is the next level named in the portal?', ['First League', 'Super Cup', 'Youth Shield', 'National Series'], 0),
    quizQuestion('q3', 'How many main competitions are featured on the Competitions page?', ['Four', 'Two', 'Six', 'Ten'], 0),
    quizQuestion('q4', 'Which women\'s competition is featured?', ["Women's Premier League", 'Women\'s First League only', 'Women\'s Shield', 'Women\'s Kagame Cup'], 0),
    quizQuestion('q5', 'Which positions represent CAF Champions League places in the league table?', ['1 and 2', '3 and 4', '13 and 14', '15 and 16'], 0)
  ]},
  { id: 'quiz-05', title: 'Tanzania National Teams', questions: [
    quizQuestion('q1', 'Taifa Stars represents which national team?', ['Tanzania men', 'Tanzania women', 'Tanzania under-17 only', 'Zanzibar clubs'], 0),
    quizQuestion('q2', 'Twiga Stars represents which national team?', ['Tanzania women', 'Tanzania men', 'Tanzania referees', 'Tanzania futsal only'], 0),
    quizQuestion('q3', 'What do national teams represent?', ['The country', 'One club only', 'One stadium', 'A league sponsor'], 0),
    quizQuestion('q4', 'Which competition body is connected to continental football?', ['CAF', 'TPLB only', 'A club supporters group', 'A stadium authority'], 0),
    quizQuestion('q5', 'What does a national-team call-up mean?', ['A player is selected to represent the country', 'A match is postponed', 'A club changes its badge', 'A league table is reset'], 0)
  ]},
  { id: 'quiz-06', title: 'Stadiums & Venues', questions: [
    quizQuestion('q1', 'Benjamin Mkapa Stadium is in which city?', ['Dar es Salaam', 'Mbeya', 'Mwanza', 'Tanga'], 0),
    quizQuestion('q2', 'Sokoine Stadium is associated with which city in this portal?', ['Mbeya', 'Dar es Salaam', 'Arusha', 'Dodoma'], 0),
    quizQuestion('q3', 'Which venue is used in the women\'s prediction example?', ['Azam Complex', 'Benjamin Mkapa Stadium', 'Uhuru Stadium', 'Mkwakwani Stadium'], 0),
    quizQuestion('q4', 'Which venue is used for the First League example?', ['Uhuru Stadium', 'Azam Complex', 'Sokoine Stadium', 'Benjamin Mkapa Stadium'], 0),
    quizQuestion('q5', 'What is a stadium primarily used for?', ['Hosting football matches', 'Publishing league rules', 'Counting league points', 'Registering transfers only'], 0)
  ]},
  { id: 'quiz-07', title: 'Famous Tanzania Players', questions: [
    quizQuestion('q1', 'What position is Clatous Chama listed as?', ['Midfielder', 'Goalkeeper', 'Defender', 'Referee'], 0),
    quizQuestion('q2', 'What position is Peter Shalulile listed as?', ['Forward', 'Goalkeeper', 'Defender', 'Coach'], 0),
    quizQuestion('q3', 'What position is Djigui Diarra listed as?', ['Goalkeeper', 'Midfielder', 'Forward', 'Analyst'], 0),
    quizQuestion('q4', 'What position is Feisal Salum listed as?', ['Midfielder', 'Goalkeeper', 'Defender', 'Physio'], 0),
    quizQuestion('q5', 'Which player is listed with Simba in the assists data?', ['Libasse Gueye', 'Peter Shalulile', 'Jonathan Sowah', 'Maxi Nzengeli'], 0)
  ]},
  { id: 'quiz-08', title: 'League History & Records', questions: [
    quizQuestion('q1', 'What does GF mean in a league table?', ['Goals For', 'Games Finished', 'Goals Final', 'Fixtures Generated'], 0),
    quizQuestion('q2', 'What does GA mean?', ['Goals Against', 'Games Awarded', 'Goals Added', 'Goalkeeper Average'], 0),
    quizQuestion('q3', 'What does GD describe?', ['Goal Difference', 'Game Duration', 'Goals Division', 'Group Draw'], 0),
    quizQuestion('q4', 'How many points does a league win normally earn?', ['Three', 'One', 'Two', 'Five'], 0),
    quizQuestion('q5', 'Which places are marked as relegation in the table design?', ['15 and 16', '1 and 2', '3 and 4', '9 and 10'], 0)
  ]},
  { id: 'quiz-09', title: 'Football Rules & TFF Knowledge', questions: [
    quizQuestion('q1', 'How many points does a draw normally earn?', ['One', 'Three', 'Two', 'Zero always'], 0),
    quizQuestion('q2', 'What does a red card mean?', ['The player is sent off', 'The team scores a goal', 'The match restarts', 'The coach enters the pitch'], 0),
    quizQuestion('q3', 'What does FT mean beside a match?', ['Full time', 'First team', 'Final transfer', 'Fixture table'], 0),
    quizQuestion('q4', 'What is a clean sheet?', ['Conceding no goals', 'Scoring no goals', 'Winning on penalties', 'Receiving no cards'], 0),
    quizQuestion('q5', 'Why is a prediction locked at kickoff?', ['To keep the game fair', 'To change the result', 'To add extra goals', 'To hide the fixture'], 0)
  ]},
  { id: 'quiz-10', title: 'Tanzania Football Challenge', questions: [
    quizQuestion('q1', 'Which match is the classic Tanzania football derby example?', ['Simba SC vs Young Africans', 'KMC vs TMA', 'Mbeya City vs Bigman', 'Azam vs TMA'], 0),
    quizQuestion('q2', 'What does TPLB refer to in this portal?', ['Tanzania Premier League Board', 'Tanzania Players League Board', 'Tanzania Pitch Licensing Bureau', 'Tanzania Premier League Badge'], 0),
    quizQuestion('q3', 'What does a club badge help fans identify?', ['The club', 'The referee', 'The stadium capacity', 'The league points only'], 0),
    quizQuestion('q4', 'What is a matchweek?', ['A scheduled round of league fixtures', 'A transfer contract', 'A stadium section', 'A player position'], 0),
    quizQuestion('q5', 'What is the purpose of the fan leaderboard?', ['To compare points and ranks', 'To set ticket prices', 'To replace the league table', 'To select referees'], 0)
  ]}
];

const dailyQuestions = [
  quizQuestion('d1', 'Which team is known as Taifa Stars?', ['Tanzania men', 'Tanzania women', 'Simba SC', 'Young Africans'], 0),
  quizQuestion('d2', 'Which table stat means Goals For?', ['GF', 'GA', 'GD', 'Pts'], 0),
  quizQuestion('d3', 'Which competition is Tanzania\'s top-flight example?', ['NBC Premier League', 'First League', 'Mapinduzi Cup', 'CECAFA Cup'], 0),
  quizQuestion('d4', 'Which match status means the game has ended?', ['FT', 'LIVE', 'UPCOMING', 'POSTPONED'], 0),
  quizQuestion('d5', 'How many points does a correct match-winner prediction earn?', ['1', '3', '10', '30'], 0)
];

const filterMap = { all: 'premier', premier: 'premier', championship: 'championship', first: 'first', women: 'women' };
let currentMatchKey = 'premier';

const toast = document.createElement('div');
toast.className = 'prediction-toast';
toast.setAttribute('role', 'status');
toast.setAttribute('aria-live', 'polite');
document.body.appendChild(toast);
let toastTimer;
const notify = (message, tone) => {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.className = 'prediction-toast is-visible is-' + (tone || 'success');
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3500);
};

const pointTargets = $$('[data-current-points], [data-aside-points]');
const renderAccount = () => {
  const total = totalPoints();
  pointTargets.forEach((element) => { element.textContent = total.toLocaleString(); });
  $$('[data-prediction-points-total]').forEach((element) => { element.textContent = state.predictionPoints; });
  $$('[data-quiz-points-total]').forEach((element) => { element.textContent = state.quizPoints; });
  $$('[data-quiz-points]').forEach((element) => { element.textContent = state.quizPoints; });
  const level = Math.floor(total / 25) + 1;
  const levelLabel = total ? 'LEVEL ' + level + ' / FAN' : 'ROOKIE FAN';
  const progress = total ? Math.min(100, Math.round((total % 25) / 25 * 100)) : 0;
  const next = total % 25 === 0 ? 25 : 25 - (total % 25);
  $$('[data-account-rank]').forEach((element) => { element.textContent = 'Not ranked'; });
  $$('[data-account-level]').forEach((element) => { element.textContent = levelLabel; });
  $$('[data-account-streak]').forEach((element) => { element.textContent = String(state.daily.streak || 0) + '-day streak'; });
  $$('[data-account-progress]').forEach((element) => { element.style.width = progress + '%'; });
  $$('[data-account-next]').forEach((element) => { element.textContent = next + ' pts to next'; });
  $$('[data-account-username]').forEach((element) => { element.textContent = state.user.username; });
};

const getPrediction = (match) => {
  if (!state.predictions[match.id]) {
    state.predictions[match.id] = { matchId: match.id, choice: null, deadlineAt: new Date(match.deadlineAt).getTime(), locked: false, settled: false, correct: null, pointsAwarded: 0 };
  }
  return state.predictions[match.id];
};
const isLocked = (prediction) => prediction.locked || prediction.settled || Date.now() >= prediction.deadlineAt;
const labelForChoice = (match, choice) => choice === 'home' ? match.home + ' Win' : choice === 'away' ? match.away + ' Win' : 'Draw';
const settlePrediction = (match, prediction) => {
  if (!prediction.choice || !match.officialResult || !isLocked(prediction) || prediction.settled) return;
  const correct = prediction.choice === match.officialResult.winner;
  const transactionId = 'prediction:' + match.id;
  prediction.settled = true;
  prediction.correct = correct;
  prediction.pointsAwarded = correct ? 1 : 0;
  prediction.officialScore = match.officialResult.score;
  if (!state.transactions.some((item) => item.id === transactionId)) {
    state.predictionPoints += prediction.pointsAwarded;
    state.transactions.push({ id: transactionId, type: 'prediction', points: prediction.pointsAwarded, label: 'Correct match prediction', matchId: match.id, createdAt: new Date().toISOString() });
  }
  saveState();
};

const matchElements = {
  leagueLogo: $('[data-match-league-logo] img'),
  league: $('[data-match-league]'),
  homeLogo: $('[data-match-home-logo]'),
  awayLogo: $('[data-match-away-logo]'),
  home: $('[data-match-home]'),
  away: $('[data-match-away]'),
  date: $('[data-match-date]'),
  time: $('[data-match-time]'),
  stadium: $('[data-match-stadium]'),
  status: $('.challenge-match-status'),
  deadline: $('[data-deadline]'),
  deadlineLabel: $('[data-deadline-label]'),
  season: $('[data-match-season]'),
  number: $('[data-match-number]')
};
const matchOptions = $('[data-match-options]');
const predictionStatus = $('[data-prediction-status-message]');
const submittedPanel = $('[data-submitted-panel]');
const submittedTitle = $('[data-submitted-title]');
const submittedCopy = $('[data-submitted-copy]');
const resultPanel = $('[data-prediction-results]');
const officialResult = $('[data-official-result]');
const settlementTitle = $('[data-prediction-settlement]');
const settlementPoints = $('[data-prediction-points]');
const matchCard = $('[data-match-card]');

const renderMatch = (key) => {
  currentMatchKey = key;
  if (state.activeMatchKey !== key) { state.activeMatchKey = key; saveState(); }
  const match = matches[key];
  const prediction = getPrediction(match);
  if (Date.now() >= prediction.deadlineAt) prediction.locked = true;
  settlePrediction(match, prediction);
  matchElements.leagueLogo.src = match.logo;
  matchElements.leagueLogo.alt = match.league + ' badge';
  matchElements.league.textContent = match.league;
  matchElements.homeLogo.src = match.homeLogo;
  matchElements.homeLogo.alt = match.home + ' badge';
  matchElements.awayLogo.src = match.awayLogo;
  matchElements.awayLogo.alt = match.away + ' badge';
  matchElements.home.textContent = match.home;
  matchElements.away.textContent = match.away;
  matchElements.date.textContent = match.date;
  matchElements.time.textContent = match.time;
  matchElements.stadium.textContent = match.stadium;
  matchElements.number.textContent = key === 'premier' ? '01' : key === 'championship' ? '02' : key === 'first' ? '03' : '04';
  matchOptions.innerHTML = '';
  [
    { value: 'home', label: match.home, logo: match.homeLogo },
    { value: 'draw', label: 'Draw', logo: null },
    { value: 'away', label: match.away, logo: match.awayLogo }
  ].forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-button' + (prediction.choice === option.value ? ' selected' : '');
    button.disabled = isLocked(prediction);
    if (option.logo) {
      const image = document.createElement('img');
      image.src = option.logo;
      image.alt = '';
      button.appendChild(image);
    }
    const text = document.createElement('span');
    text.textContent = option.label;
    button.appendChild(text);
    button.addEventListener('click', () => {
      if (isLocked(prediction)) return;
      prediction.choice = option.value;
      prediction.updatedAt = new Date().toISOString();
      saveState();
      renderMatch(key);
      renderMyPredictions();
      notify('Prediction saved: ' + labelForChoice(match, option.value) + '. You can change it before the deadline.');
    });
    matchOptions.appendChild(button);
  });
  const locked = isLocked(prediction);
  const settled = prediction.settled;
  matchCard.classList.toggle('is-closed', locked);
  matchElements.status.textContent = settled ? 'SETTLED' : locked ? 'LOCKED' : 'UPCOMING';
  matchElements.status.classList.toggle('is-closed', locked && !settled);
  matchElements.status.classList.toggle('is-locked', settled);
  matchElements.deadlineLabel.textContent = settled ? 'Matchday status' : locked ? 'Matchday status' : 'Prediction closes in';
  if (settled) matchElements.deadline.textContent = 'Result confirmed';
  else if (locked) matchElements.deadline.textContent = 'Predictions Closed';
  const isSaved = Boolean(prediction.choice);
  predictionStatus.textContent = !isSaved ? (locked ? 'Predictions are closed for this match.' : 'Choose an outcome to save your prediction.') : !locked ? 'Saved: ' + labelForChoice(match, prediction.choice) + '. Change it any time before the deadline.' : settled ? (prediction.correct ? 'Correct prediction.' : 'Incorrect prediction.') : 'Prediction locked. Awaiting the official result.';
  predictionStatus.className = 'prediction-status-message ' + (!isSaved ? 'is-muted' : settled ? (prediction.correct ? 'is-correct' : 'is-incorrect') : locked ? 'is-locked' : 'is-saved');
  submittedPanel.hidden = !locked || !isSaved;
  if (locked && isSaved) {
    submittedTitle.textContent = settled ? 'Prediction settled.' : 'Your prediction is locked.';
    submittedCopy.textContent = settled ? 'The final result has been confirmed and cannot be changed.' : 'Kickoff has passed. This selection is permanently locked for this match.';
  }
  resultPanel.hidden = !settled;
  if (settled) {
    officialResult.textContent = 'FT — ' + prediction.officialScore;
    settlementTitle.textContent = prediction.correct ? 'Correct prediction.' : 'Incorrect prediction.';
    settlementPoints.textContent = prediction.correct ? '+1 Prediction Point' : '+0 Prediction Points';
  }
  updateDeadline();
  renderAccount();
};

const updateDeadline = () => {
  const match = matches[currentMatchKey];
  if (!match || !matchElements.deadline) return;
  const prediction = getPrediction(match);
  if (prediction.settled) return;
  const remaining = Math.max(0, prediction.deadlineAt - Date.now());
  if (!remaining) {
    if (!prediction.locked) {
      prediction.locked = true;
      saveState();
      renderMatch(currentMatchKey);
    }
    return;
  }
  const totalSeconds = Math.floor(remaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  matchElements.deadline.textContent = String(hours).padStart(2, '0') + 'h ' + String(minutes).padStart(2, '0') + 'm ' + String(seconds).padStart(2, '0') + 's';
};
window.setInterval(updateDeadline, 1000);

const renderMyPredictions = () => {
  const grid = $('[data-my-predictions-grid]');
  if (!grid) return;
  const entries = Object.values(state.predictions).filter((prediction) => prediction.choice);
  $('[data-history-count]').textContent = entries.length + (entries.length === 1 ? ' prediction saved' : ' predictions saved');
  grid.innerHTML = '';
  if (!entries.length) {
    grid.innerHTML = '<div class="empty-state">Your saved match predictions will appear here.</div>';
    return;
  }
  entries.forEach((prediction) => {
    const match = Object.values(matches).find((item) => item.id === prediction.matchId);
    if (!match) return;
    const card = document.createElement('article');
    const status = prediction.settled ? (prediction.correct ? 'correct' : 'incorrect') : 'upcoming';
    card.className = 'my-prediction-card is-' + status;
    card.dataset.historyStatus = status;
    const score = prediction.officialScore || 'VS';
    const statusLabel = prediction.settled ? (prediction.correct ? '✓ CORRECT' : '✕ INCORRECT') : (isLocked(prediction) ? '🔒 LOCKED' : 'UPCOMING');
    const points = prediction.settled ? (prediction.pointsAwarded ? '+1' : '+0') : 'AWAITING';
    card.innerHTML = '<div class="my-prediction-top"><span class="league-tag"><img src="' + match.logo + '" alt="" /> ' + match.league + '</span><span class="prediction-status ' + status + '">' + statusLabel + '</span></div><div class="history-match"><span>' + match.home + '</span><strong>' + score + '</strong><span>' + match.away + '</span></div><div class="history-meta"><span>My prediction: <b>' + labelForChoice(match, prediction.choice) + '</b></span><span>' + match.date + '</span></div><div class="history-points ' + (status === 'incorrect' ? 'muted' : status === 'upcoming' ? 'pending' : '') + '">' + points + ' <small>' + (prediction.settled ? 'POINTS EARNED' : 'STATUS') + '</small></div>';
    grid.appendChild(card);
  });
  applyHistoryFilter(document.querySelector('.history-filter.active')?.dataset.historyFilter || 'all');
};

const applyHistoryFilter = (filter) => {
  $$('.my-prediction-card').forEach((card) => { card.hidden = filter !== 'all' && card.dataset.historyStatus !== filter; });
};
$$('[data-history-filter]').forEach((button) => button.addEventListener('click', () => {
  $$('[data-history-filter]').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  applyHistoryFilter(button.dataset.historyFilter);
}));

const renderPreviousResults = () => {
  const root = $('[data-previous-results]');
  if (!root) return;
  const settled = Object.values(state.predictions).filter((prediction) => prediction.settled);
  root.innerHTML = '';
  if (!settled.length) {
    root.innerHTML = '<div class="empty-state">Settled results appear here after an official result is confirmed.</div>';
    return;
  }
  settled.forEach((prediction) => {
    const match = Object.values(matches).find((item) => item.id === prediction.matchId);
    if (!match) return;
    const article = document.createElement('article');
    article.innerHTML = '<span class="previous-date">' + match.date + ' / ' + match.league + '</span><div><strong>' + match.home + ' <b>' + prediction.officialScore + '</b> ' + match.away + '</strong><span class="' + (prediction.correct ? 'result-correct' : 'result-wrong') + '">' + (prediction.correct ? 'CORRECT +1' : 'INCORRECT +0') + '</span></div>';
    root.appendChild(article);
  });
};

const renderLeaderboard = () => {
  const body = $('[data-leaderboard-body]');
  if (!body) return;
  const total = totalPoints();
  body.innerHTML = '<tr class="leaderboard-row is-you"><td><span class="rank-number">--</span></td><td><div class="fan-profile"><span class="fan-avatar avatar-orange">' + state.user.avatar + '</span><span><strong>' + state.user.username + '</strong><small>LOCAL SAVE <b>YOU</b></small></span></div></td><td>' + state.predictionPoints + '</td><td>' + state.quizPoints + '</td><td><strong class="leader-points">' + total + '</strong></td></tr>';
  $('[data-leaderboard-note]').textContent = 'This local fan score is saved on this device. Connect the database to join the live multi-user ranking.';
};
$$('[data-leader-filter]').forEach((button) => button.addEventListener('click', () => {
  $$('[data-leader-filter]').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  notify('Live period rankings require the connected leaderboard service.', 'info');
}));

const getQuiz = (id) => quizzes.find((quiz) => quiz.id === id);
const quizCompleted = (quiz) => Boolean(state.quiz.attempts[quiz.id]?.completed);
const quizUnlocked = (index) => index === 0 || quizCompleted(quizzes[index - 1]);
const currentQuiz = () => getQuiz(state.quiz.activeId) || quizzes[0];
const quizAnswers = (quiz) => {
  if (!state.quiz.answers[quiz.id]) state.quiz.answers[quiz.id] = {};
  return state.quiz.answers[quiz.id];
};
const quizMissed = (quiz) => {
  if (!state.quiz.missed[quiz.id]) state.quiz.missed[quiz.id] = {};
  return state.quiz.missed[quiz.id];
};
const quizCurrentIndex = (quiz) => Number.isInteger(state.quiz.current[quiz.id]) ? state.quiz.current[quiz.id] : 0;
const quizQuestionDone = (quiz, index) => quizAnswers(quiz)[quiz.questions[index].id] !== undefined || Boolean(quizMissed(quiz)[quiz.questions[index].id]);
const quizCompletionReady = (quiz) => quiz.questions.every((_, index) => quizQuestionDone(quiz, index));
const quizAnsweredCount = () => Object.values(state.quiz.answers).reduce((sum, answers) => sum + Object.keys(answers || {}).length, 0);
const quizMissedCount = () => Object.values(state.quiz.missed).reduce((sum, missed) => sum + Object.keys(missed || {}).length, 0);
const quizElements = {
  number: $('[data-quiz-number]'), category: $('[data-quiz-category]'), label: $('[data-quiz-question-label]'), progress: $('[data-quiz-progress]'), timerWrap: $('[data-quiz-timer-wrap]'), timer: $('[data-quiz-timer]'), timerBar: $('[data-quiz-timer-bar]'), title: $('[data-quiz-question]'), questionBody: $('[data-quiz-question]') ? $('[data-quiz-question]').closest('.quiz-card-body') : null, options: $('[data-quiz-options]'), feedback: $('[data-quiz-feedback]'), indicators: $('[data-quiz-indicators]'), prev: $('[data-quiz-prev]'), next: $('[data-quiz-next]'), submit: $('[data-quiz-submit]'), confirmation: $('[data-quiz-confirmation]'), review: $('[data-quiz-review]'), confirmSubmit: $('[data-quiz-confirm-submit]'), completion: $('[data-quiz-completion]'), resultTitle: $('[data-quiz-result-title]'), resultCopy: $('[data-quiz-result-copy]'), resultPoints: $('[data-quiz-result-points]'), continue: $('[data-quiz-continue]'), catalog: $('[data-quiz-catalog]'), history: $('[data-quiz-history]')
};

let quizTimerHandle = 0;
let lastQuizQuestionKey = null;
let lastDailyQuestionKey = null;
const playQuestionTransition = (element) => {
  if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  element.classList.remove('question-transition-enter');
  void element.offsetWidth;
  element.classList.add('question-transition-enter');
};
const stopQuizTimer = () => {
  if (quizTimerHandle) window.clearInterval(quizTimerHandle);
  quizTimerHandle = 0;
};
const expireQuizQuestion = (quiz, index) => {
  const question = quiz.questions[index];
  const answers = quizAnswers(quiz);
  const missed = quizMissed(quiz);
  if (answers[question.id] !== undefined || missed[question.id]) return;
  missed[question.id] = { missedAt: new Date().toISOString() };
  delete state.quiz.deadlines[quiz.id + ':' + question.id];
  if (index < quiz.questions.length - 1) state.quiz.current[quiz.id] = index + 1;
  saveState();
  renderQuiz();
  notify('Time expired. Question ' + (index + 1) + ' marked missed.', 'info');
};
const syncQuizTimer = () => {
  const quiz = currentQuiz();
  const index = Math.min(4, Math.max(0, quizCurrentIndex(quiz)));
  const question = quiz.questions[index];
  const answers = quizAnswers(quiz);
  const missed = quizMissed(quiz);
  if (quizCompleted(quiz) || answers[question.id] !== undefined || missed[question.id]) {
    stopQuizTimer();
    quizElements.timerWrap.hidden = true;
    return;
  }
  const deadlineKey = quiz.id + ':' + question.id;
  if (!state.quiz.deadlines[deadlineKey]) {
    state.quiz.deadlines[deadlineKey] = Date.now() + 40000;
    saveState();
  }
  const remaining = Math.max(0, state.quiz.deadlines[deadlineKey] - Date.now());
  if (!remaining) {
    expireQuizQuestion(quiz, index);
    return;
  }
  const seconds = Math.ceil(remaining / 1000);
  quizElements.timerWrap.hidden = false;
  quizElements.timer.textContent = seconds + 's';
  quizElements.timerBar.style.width = Math.min(100, remaining / 400) + '%';
  if (!quizTimerHandle) quizTimerHandle = window.setInterval(syncQuizTimer, 250);
};
const renderQuizCatalog = () => {
  quizElements.catalog.innerHTML = '';
  quizzes.forEach((quiz, index) => {
    const attempt = state.quiz.attempts[quiz.id];
    const unlocked = quizUnlocked(index);
    const card = document.createElement('article');
    card.className = 'quiz-catalog-card ' + (attempt?.completed ? 'is-complete' : unlocked ? 'is-open' : 'is-locked');
    const started = Boolean(state.quiz.started[quiz.id]);
    const status = attempt?.completed ? 'COMPLETED' : unlocked ? (started ? (state.quiz.activeId === quiz.id ? 'IN PROGRESS' : 'CONTINUE') : 'READY TO PLAY') : 'LOCKED';
    const action = attempt?.completed ? '<small>Result: ' + attempt.correct + '/5 · Earned: +' + attempt.pointsAwarded + '</small>' : unlocked ? '<button type="button" data-open-quiz="' + quiz.id + '">' + (started ? 'Continue' : 'Open quiz') + ' &rarr;</button>' : '<small>Complete the previous quiz to unlock</small>';
    card.innerHTML = '<div class="quiz-catalog-number">QUIZ ' + String(index + 1).padStart(2, '0') + '</div><h3>' + quiz.title + '</h3><p>5 Questions</p><span class="quiz-catalog-status">' + status + '</span>' + action;
    quizElements.catalog.appendChild(card);
  });
  $$('[data-open-quiz]').forEach((button) => button.addEventListener('click', () => {
    state.quiz.activeId = button.dataset.openQuiz;
    state.quiz.started[button.dataset.openQuiz] = true;
    if (!Number.isInteger(state.quiz.current[button.dataset.openQuiz])) state.quiz.current[button.dataset.openQuiz] = 0;
    saveState();
    renderQuiz();
    document.querySelector('#quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
};

const renderQuizHistory = () => {
  const completed = quizzes.filter((quiz) => quizCompleted(quiz));
  quizElements.history.innerHTML = completed.length ? '<span>QUIZ HISTORY</span><b>' + completed.length + ' of 10 completed</b><small>Completed quizzes are permanently settled and cannot award points twice.</small>' : '';
};

const completeQuiz = () => {
  const quiz = currentQuiz();
  const answers = quizAnswers(quiz);
  if (!quizCompletionReady(quiz)) {
    notify('Answer each question or let its 40-second timer mark it missed.', 'info');
    return;
  }
  if (quizCompleted(quiz)) return;
  const correct = quiz.questions.reduce((count, question) => count + (Number(answers[question.id]) === question.answer ? 1 : 0), 0);
  const points = scoringFor(correct);
  state.quiz.attempts[quiz.id] = { completed: true, correct, missed: Object.keys(quizMissed(quiz)).length, pointsAwarded: points, submittedAt: new Date().toISOString() };
  const transactionId = 'quiz:' + quiz.id;
  if (!state.transactions.some((item) => item.id === transactionId)) {
    state.quizPoints += points;
    state.transactions.push({ id: transactionId, type: 'quiz', points, label: quiz.title + ' completed', correct, createdAt: new Date().toISOString() });
  }
  saveState();
  notify(points ? 'Quiz completed. +' + points + ' points added.' : 'Quiz completed. No points this time.', points ? 'success' : 'info');
  renderQuiz();
  renderAccount();
  renderLeaderboard();
};

const renderQuiz = () => {
  stopQuizTimer();
  const quiz = currentQuiz();
  const quizIndex = quizzes.findIndex((item) => item.id === quiz.id);
  const attempt = state.quiz.attempts[quiz.id];
  const answers = quizAnswers(quiz);
  const missed = quizMissed(quiz);
  const index = Math.min(4, Math.max(0, quizCurrentIndex(quiz)));
  quizElements.number.textContent = String(quizIndex + 1).padStart(2, '0');
  quizElements.category.textContent = quiz.title.toUpperCase();
  quizElements.indicators.innerHTML = '';
  const quizStarted = Boolean(state.quiz.started[quiz.id]) || Boolean(attempt?.completed);
  for (let i = 0; i < 5; i += 1) {
    const indicator = document.createElement('button');
    const answered = answers[quiz.questions[i].id] !== undefined;
    const isMissed = Boolean(missed[quiz.questions[i].id]);
    indicator.type = 'button';
    indicator.className = 'quiz-progress-indicator ' + (answered ? 'is-answered' : '') + (isMissed ? ' is-missed' : '') + (i === index ? ' is-current' : '');
    indicator.textContent = isMissed ? '× ' + (i + 1) : answered ? '✓ ' + (i + 1) : (i === index ? '• ' : '') + (i + 1);
    indicator.disabled = !quizStarted || Boolean(attempt?.completed) || (i > index && !quizQuestionDone(quiz, i));
    indicator.addEventListener('click', () => { state.quiz.current[quiz.id] = i; saveState(); renderQuiz(); });
    quizElements.indicators.appendChild(indicator);
  }
  if (!quizStarted) {
    quizElements.timerWrap.hidden = true;
    quizElements.title.textContent = 'Open this quiz to begin.';
    quizElements.label.textContent = 'READY WHEN YOU ARE';
    quizElements.progress.textContent = 'OPEN QUIZ TO PLAY';
    quizElements.feedback.textContent = 'You have five questions. Each one gives you 40 seconds. Choose an answer to advance automatically.';
    quizElements.feedback.className = 'quiz-feedback';
    quizElements.options.innerHTML = '<div class="quiz-start-panel"><p>Answers save instantly. You can review before final submission, but a completed quiz cannot be replayed for more points.</p><button type="button" class="flow-button flow-button-primary" data-start-active-quiz>Open quiz &rarr;</button></div>';
    quizElements.prev.hidden = true;
    quizElements.next.hidden = true;
    quizElements.submit.hidden = true;
    quizElements.confirmation.hidden = true;
    quizElements.completion.hidden = true;
    const startButton = $('[data-start-active-quiz]', quizElements.options);
    startButton.addEventListener('click', () => {
      state.quiz.started[quiz.id] = true;
      state.quiz.current[quiz.id] = 0;
      saveState();
      renderQuiz();
    });
    renderQuizCatalog();
    renderQuizHistory();
    renderQuizStats();
    return;
  }
  if (attempt?.completed) {
    quizElements.timerWrap.hidden = true;
    quizElements.options.innerHTML = '';
    quizElements.title.textContent = 'This quiz is complete.';
    quizElements.label.textContent = 'QUIZ ' + String(quizIndex + 1).padStart(2, '0') + ' / COMPLETED';
    quizElements.progress.textContent = 'QUIZ COMPLETED';
    quizElements.feedback.textContent = 'Your answers are locked. Review is available through your saved result.';
    quizElements.confirmation.hidden = true;
    quizElements.prev.hidden = true;
    quizElements.next.hidden = true;
    quizElements.submit.hidden = true;
    quizElements.completion.hidden = false;
    quizElements.resultTitle.textContent = attempt.correct === 5 ? 'PERFECT!' : attempt.correct === 4 ? 'GREAT JOB' : attempt.correct === 3 ? 'GOOD RUN' : 'QUIZ COMPLETED';
    quizElements.resultCopy.textContent = 'Your result: ' + attempt.correct + '/5 correct' + (attempt.missed ? ' · ' + attempt.missed + ' missed' : '');
    quizElements.resultPoints.textContent = '+' + attempt.pointsAwarded + ' POINTS';
    quizElements.continue.hidden = quizIndex >= quizzes.length - 1;
    quizElements.continue.textContent = quizIndex >= quizzes.length - 1 ? 'All quizzes complete' : 'Continue to Quiz ' + String(quizIndex + 2).padStart(2, '0') + ' →';
    renderQuizCatalog();
    renderQuizHistory();
    renderQuizStats();
    return;
  }
  quizElements.completion.hidden = true;
  quizElements.confirmation.hidden = true;
  quizElements.label.textContent = 'QUESTION ' + (index + 1) + ' OF 5';
  quizElements.progress.textContent = 'QUESTION ' + (index + 1) + ' OF 5';
  const question = quiz.questions[index];
  const questionKey = quiz.id + ':' + index;
  const questionChanged = lastQuizQuestionKey !== null && lastQuizQuestionKey !== questionKey;
  lastQuizQuestionKey = questionKey;
  if (questionChanged) playQuestionTransition(quizElements.questionBody);
  const questionAnswered = answers[question.id] !== undefined;
  const questionMissed = Boolean(missed[question.id]);
  quizElements.title.textContent = questionMissed ? 'Question missed.' : question.question;
  quizElements.feedback.textContent = questionMissed ? 'The 40-second timer expired. This question is marked missed.' : questionAnswered ? 'Answer saved. You can review it before submitting.' : 'Choose an answer before the timer runs out.';
  quizElements.feedback.className = 'quiz-feedback' + (questionAnswered ? ' is-saved' : '') + (questionMissed ? ' is-missed' : '');
  quizElements.options.innerHTML = '';
  if (questionMissed) {
    quizElements.options.innerHTML = '<div class="missed-question"><b>MISSED</b><span>No answer was submitted in 40 seconds. Continue to the next question.</span></div>';
  } else {
    question.options.forEach((option, optionIndex) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'quiz-option' + (Number(answers[question.id]) === optionIndex ? ' is-selected' : '');
      button.innerHTML = '<b>' + String.fromCharCode(65 + optionIndex) + '</b><span>' + option + '</span>';
      button.addEventListener('click', () => {
        if (quizMissed(quiz)[question.id]) return;
        answers[question.id] = optionIndex;
        state.quiz.current[quiz.id] = index < quiz.questions.length - 1 ? index + 1 : index;
        saveState();
        renderQuiz();
        notify(index === quiz.questions.length - 1 ? 'Answer saved. Review and submit your quiz.' : 'Answer saved. Moving to the next question.');
      });
      quizElements.options.appendChild(button);
    });
  }
  quizElements.prev.hidden = false;
  quizElements.prev.disabled = index === 0;
  const allDone = quizCompletionReady(quiz);
  quizElements.next.hidden = true;
  quizElements.next.textContent = 'Next question →';
  quizElements.next.disabled = true;
  quizElements.submit.hidden = !allDone;
  syncQuizTimer();
  renderQuizCatalog();
  renderQuizHistory();
  renderQuizStats();
};

const renderQuizStats = () => {
  $('[data-quiz-points]').textContent = state.quizPoints;
  $('[data-quiz-completed-count]').textContent = quizzes.filter(quizCompleted).length;
  $('[data-quiz-answered-count]').textContent = quizAnsweredCount();
  $('[data-quiz-missed-count]').textContent = quizMissedCount();
  $('[data-quiz-available-count]').textContent = quizzes.filter((quiz, index) => quizUnlocked(index)).length;
};

quizElements.prev.addEventListener('click', () => {
  const quiz = currentQuiz();
  const index = quizCurrentIndex(quiz);
  if (index > 0) { state.quiz.current[quiz.id] = index - 1; saveState(); renderQuiz(); }
});
quizElements.next.addEventListener('click', () => {
  const quiz = currentQuiz();
  const index = quizCurrentIndex(quiz);
  if (quizAnswers(quiz)[quiz.questions[index].id] !== undefined && index < 4) { state.quiz.current[quiz.id] = index + 1; saveState(); renderQuiz(); }
});
quizElements.submit.addEventListener('click', () => { quizElements.confirmation.hidden = false; });
quizElements.review.addEventListener('click', () => { quizElements.confirmation.hidden = true; });
quizElements.confirmSubmit.addEventListener('click', completeQuiz);
quizElements.continue.addEventListener('click', () => {
  const index = quizzes.findIndex((quiz) => quiz.id === currentQuiz().id);
  if (index < quizzes.length - 1) {
    state.quiz.activeId = quizzes[index + 1].id;
    state.quiz.current[state.quiz.activeId] = 0;
    saveState();
    renderQuiz();
    document.querySelector('#quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

const dailyQuestionDone = (question) => state.daily.answers[question.id] !== undefined || Boolean(state.daily.missed[question.id]);
const dailyCompleteReady = () => dailyQuestions.every(dailyQuestionDone);
const dailyMissedCount = () => Object.keys(state.daily.missed || {}).length;
const prepareDaily = () => {
  const today = todayKey();
  if (state.daily.date !== today) {
    if (state.daily.lastCompletedDate && dateDifference(state.daily.lastCompletedDate, today) > 1) state.daily.streak = 0;
    state.daily.date = today;
    state.daily.started = false;
    state.daily.current = 0;
    state.daily.answers = {};
    state.daily.missed = {};
    state.daily.deadlines = {};
    state.daily.completed = false;
    state.daily.correct = 0;
    state.daily.points = 0;
    saveState();
  }
};
const dailyElements = { panel: $('[data-daily-panel]'), step: $('[data-daily-step]'), question: $('[data-daily-question]'), options: $('[data-daily-options]'), feedback: $('[data-daily-feedback]'), next: $('[data-daily-next]'), start: $('[data-daily-start]'), streak: $('[data-daily-streak]'), streakCopy: $('[data-daily-streak-copy]'), status: $('[data-daily-status]'), dots: $('[data-streak-dots]'), timer: $('[data-daily-timer]'), timerBar: $('[data-daily-timer-bar]') };
let dailyTimerHandle = 0;
const stopDailyTimer = () => {
  if (dailyTimerHandle) window.clearInterval(dailyTimerHandle);
  dailyTimerHandle = 0;
};
const expireDailyQuestion = (index) => {
  const question = dailyQuestions[index];
  if (dailyQuestionDone(question)) return;
  state.daily.missed[question.id] = { missedAt: new Date().toISOString() };
  delete state.daily.deadlines[question.id];
  if (index < dailyQuestions.length - 1) state.daily.current = index + 1;
  saveState();
  renderDaily();
  notify('Time expired. Daily question ' + (index + 1) + ' marked missed.', 'info');
};
const syncDailyTimer = () => {
  if (state.daily.completed) { stopDailyTimer(); return; }
  const index = Math.min(4, Math.max(0, state.daily.current));
  const question = dailyQuestions[index];
  if (dailyQuestionDone(question)) { stopDailyTimer(); return; }
  if (!state.daily.deadlines[question.id]) {
    state.daily.deadlines[question.id] = Date.now() + 40000;
    saveState();
  }
  const remaining = Math.max(0, state.daily.deadlines[question.id] - Date.now());
  if (!remaining) { expireDailyQuestion(index); return; }
  dailyElements.timer.textContent = Math.ceil(remaining / 1000) + 's';
  dailyElements.timerBar.style.width = Math.min(100, remaining / 400) + '%';
  if (!dailyTimerHandle) dailyTimerHandle = window.setInterval(syncDailyTimer, 250);
};
const renderDaily = () => {
  prepareDaily();
  dailyElements.streak.textContent = state.daily.streak;
  dailyElements.streakCopy.textContent = state.daily.completed ? state.daily.correct + '/5 correct today · +' + state.daily.points + ' points' : 'Complete today\'s challenge to begin';
  dailyElements.status.textContent = state.daily.completed ? 'Today completed' : 'New challenge every day';
  [...dailyElements.dots.children].forEach((dot, index) => dot.className = index < Math.min(5, state.daily.streak) ? 'is-done' : index === Math.min(4, state.daily.streak) && state.daily.streak ? 'is-current' : '');
  const hasProgress = state.daily.started || state.daily.current > 0 || Object.keys(state.daily.answers).length > 0 || dailyMissedCount() > 0 || state.daily.completed;
  dailyElements.panel.hidden = !hasProgress;
  if (!hasProgress) { stopDailyTimer(); return; }
  if (state.daily.completed) {
    stopDailyTimer();
    dailyElements.question.textContent = 'Today\'s challenge is complete.';
    dailyElements.options.innerHTML = '';
    dailyElements.feedback.textContent = state.daily.correct + '/5 correct · +' + state.daily.points + ' points added once · ' + dailyMissedCount() + ' missed';
    dailyElements.next.hidden = true;
    return;
  }
  const index = Math.min(4, Math.max(0, state.daily.current));
  const question = dailyQuestions[index];
  const questionKey = String(index);
  const questionChanged = lastDailyQuestionKey !== null && lastDailyQuestionKey !== questionKey;
  lastDailyQuestionKey = questionKey;
  if (questionChanged) playQuestionTransition(dailyElements.panel);
  const questionAnswered = state.daily.answers[question.id] !== undefined;
  const questionMissed = Boolean(state.daily.missed[question.id]);
  dailyElements.step.textContent = 'QUESTION ' + (index + 1) + ' OF 5';
  dailyElements.question.textContent = questionMissed ? 'Question missed.' : question.question;
  dailyElements.options.innerHTML = '';
  if (questionMissed) {
    dailyElements.options.innerHTML = '<div class="missed-question"><b>MISSED</b><span>No answer was submitted in 40 seconds. Continue to the next question.</span></div>';
  } else {
    question.options.forEach((option, optionIndex) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'quiz-option' + (Number(state.daily.answers[question.id]) === optionIndex ? ' is-selected' : '');
      button.innerHTML = '<b>' + String.fromCharCode(65 + optionIndex) + '</b><span>' + option + '</span>';
      button.addEventListener('click', () => {
        if (state.daily.missed[question.id]) return;
        state.daily.started = true;
        state.daily.answers[question.id] = optionIndex;
        saveState();
        renderDaily();
      });
      dailyElements.options.appendChild(button);
    });
  }
  dailyElements.feedback.textContent = questionMissed ? 'The 40-second timer expired. This question is marked missed.' : questionAnswered ? 'Answer saved. The next question has its own 40-second timer.' : 'Choose an answer before the timer runs out.';
  dailyElements.feedback.className = 'quiz-feedback' + (questionAnswered ? ' is-saved' : '') + (questionMissed ? ' is-missed' : '');
  dailyElements.next.hidden = false;
  dailyElements.next.textContent = index === 4 ? 'Submit daily challenge' : 'Next question →';
  dailyElements.next.disabled = !dailyQuestionDone(question);
  syncDailyTimer();
};
dailyElements.start.addEventListener('click', () => { state.daily.started = true; saveState(); dailyElements.panel.hidden = false; renderDaily(); dailyElements.panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); });
dailyElements.next.addEventListener('click', () => {
  const index = Math.min(4, Math.max(0, state.daily.current));
  const question = dailyQuestions[index];
  if (!dailyQuestionDone(question)) return;
  if (index < 4) { state.daily.current = index + 1; saveState(); renderDaily(); return; }
  if (!dailyCompleteReady()) return;
  const correct = dailyQuestions.reduce((count, item) => count + (Number(state.daily.answers[item.id]) === item.answer ? 1 : 0), 0);
  const points = scoringFor(correct);
  state.daily.correct = correct;
  state.daily.points = points;
  state.daily.completed = true;
  if (state.daily.lastCompletedDate && dateDifference(state.daily.lastCompletedDate, todayKey()) === 1) state.daily.streak += 1;
  else state.daily.streak = 1;
  state.daily.lastCompletedDate = todayKey();
  state.daily.history.push({ date: todayKey(), correct, missed: dailyMissedCount(), points });
  const transactionId = 'daily:' + todayKey();
  if (!state.transactions.some((item) => item.id === transactionId)) {
    state.quizPoints += points;
    state.transactions.push({ id: transactionId, type: 'daily', points, correct, missed: dailyMissedCount(), createdAt: new Date().toISOString() });
  }
  saveState();
  renderDaily();
  renderAccount();
  renderLeaderboard();
  notify(points ? 'Daily challenge complete. +' + points + ' points.' : 'Daily challenge complete. No points this time.', points ? 'success' : 'info');
});

$$('[data-filter]').forEach((button) => button.addEventListener('click', () => {
  $$('[data-filter]').forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); });
  button.classList.add('active');
  button.setAttribute('aria-selected', 'true');
  renderMatch(filterMap[button.dataset.filter]);
  document.querySelector('#challenge').scrollIntoView({ behavior: 'smooth', block: 'start' });
}));

const menuToggle = $('.menu-toggle');
const mainNav = $('.main-nav');
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
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
const closeSearch = () => { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); document.body.classList.remove('drawer-open'); };
$('[data-search-close]').addEventListener('click', closeSearch);
drawer.addEventListener('click', (event) => { if (event.target === drawer) closeSearch(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeSearch(); });
$('.search-form').addEventListener('submit', (event) => { event.preventDefault(); const value = searchInput.value.trim(); if (!value) return; searchInput.placeholder = 'Searching for "' + value + '"...'; searchInput.value = ''; });

$('.newsletter-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const input = form.querySelector('input');
  const button = form.querySelector('button');
  const note = form.querySelector('.form-note');
  const unsubscribeButton = form.querySelector('[data-newsletter-unsubscribe]');
  if (unsubscribeButton) unsubscribeButton.hidden = state.subscriptions.length === 0;
  if (!input.checkValidity()) { input.reportValidity(); return; }
  const email = input.value.trim().toLowerCase();
  if (state.subscriptions.includes(email)) {
    note.textContent = 'This email is already subscribed.';
    note.style.color = '#a98bff';
    return;
  }
  state.subscriptions.push(email);
  saveState();
  button.innerHTML = 'Saved <span>&#x2713;</span>';
  button.disabled = true;
  input.disabled = true;
  note.textContent = 'Subscription saved on this device. You can unsubscribe from the clubhouse email.';
  note.style.color = '#a98bff';
});

if ($('[data-newsletter-unsubscribe]')) $('[data-newsletter-unsubscribe]').addEventListener('click', () => {
  state.subscriptions = [];
  saveState();
  const form = $('.newsletter-form');
  const input = form.querySelector('input');
  const button = form.querySelector('button[type=submit]');
  const note = form.querySelector('.form-note');
  input.disabled = false;
  input.value = '';
  button.disabled = false;
  button.innerHTML = 'Join <span>&#x2197;</span>';
  $('[data-newsletter-unsubscribe]').hidden = true;
  note.textContent = 'Subscription removed from this device.';
});
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduceMotion || !('IntersectionObserver' in window)) $$('.reveal-item').forEach((element) => element.classList.add('is-visible'));
else {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
  $$('.reveal-item').forEach((element) => observer.observe(element));
}

renderAccount();
renderMatch(state.activeMatchKey && matches[state.activeMatchKey] ? state.activeMatchKey : 'premier');
renderMyPredictions();
renderPreviousResults();
renderLeaderboard();
renderQuiz();
prepareDaily();
renderDaily();
