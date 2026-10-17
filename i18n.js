(function () {
  'use strict';

  const STORAGE_KEY = 'tml-language';
  const DEFAULT_LANGUAGE = 'eng';
  const languages = {
    eng: { code: 'eng', locale: 'en', label: 'English' },
    swa: { code: 'swa', locale: 'sw', label: 'Kiswahili' }
  };

  const translations = {
    'Home': 'Mwanzo', 'Beginning': 'Mwanzo', 'Competitions': 'Mashindano', 'Competition': 'Mashindano', 'Prediction': 'Utabiri', 'Forecast': 'Utabiri', 'News': 'Habari', 'Clubs': 'Vilabu', 'Club': 'Klabu', 'Leadership': 'Uongozi', 'About': 'Kuhusu Sisi', 'About Us': 'Kuhusu Sisi', 'Contact': 'Mawasiliano', 'Contact us': 'Mawasiliano', 'Contact office': 'Wasiliana na ofisi', 'Explore': 'Gundua', 'Subscribe': 'Jiandikishe', 'All news': 'Habari zote', 'Search': 'Tafuta', 'Language': 'Lugha', 'Open navigation': 'Fungua menyu', 'Close navigation': 'Funga menyu', 'Close search': 'Funga utafutaji', 'Back to top': 'Rudi juu', 'FAQs': 'Maswali Yanayoulizwa Mara kwa Mara',
    'Read more': 'Soma zaidi', 'Read More': 'Soma Zaidi', 'View all stories': 'Tazama habari zote', 'View all matches': 'Tazama mechi zote', 'View full table': 'Tazama msimamo kamili', 'View All': 'Tazama Zote', 'View Club': 'Tazama Klabu', 'View Competition': 'Tazama Mashindano', 'Browse leagues': 'Vinjari ligi', 'Open match centre': 'Fungua kituo cha mechi', 'Read Story': 'Soma Habari', 'Find your next story.': 'Pata habari yako inayofuata.', 'Find the next story.': 'Pata habari inayofuata.', 'Find a club fast.': 'Pata klabu haraka.', 'Join': 'Jiunge', 'Save': 'Hifadhi', 'Cancel': 'Ghairi', 'Submit': 'Wasilisha', 'Send Message': 'Tuma Ujumbe', 'Get Directions': 'Pata Maelekezo', 'Start Predicting': 'Anza Kutabiri', 'Next Question': 'Swali Linalofuata', 'Previous': 'Iliyotangulia', 'Next': 'Linalofuata', 'Continue': 'Endelea', 'Continue to next quiz': 'Endelea na chemsha bongo inayofuata', 'Copy link': 'Nakili kiungo', 'Share': 'Shiriki', 'Shared': 'Imeshirikiwa', 'Link copied': 'Kiungo kimenakiliwa', 'Play': 'Cheza', 'Pause': 'Sitisha', 'Auto': 'Otomatiki',
    'Fixtures': 'Ratiba', 'Results': 'Matokeo', 'Table': 'Msimamo', 'Top Scorers': 'Wafungaji Bora', 'Top scorers': 'Wafungaji bora', 'Player Stats': 'Takwimu za Wachezaji', 'Team Stats': 'Takwimu za Timu', 'History': 'Historia', 'Upcoming': 'Zijazo', 'Completed': 'Zilizokamilika', 'Correct': 'Sahihi', 'Incorrect': 'Si Sahihi', 'Points': 'Pointi', 'Rank': 'Nafasi', 'Assists': 'Mabao ya Kusaidia', 'Clean sheets': 'Mechi bila kufungwa', 'Man of the Match': 'Mchezaji Bora wa Mechi', 'Goals': 'Mabao', 'Appearances': 'Mechi Alicheza', 'Position': 'Nafasi', 'Club name': 'Jina la klabu', 'League': 'Ligi', 'Season': 'Msimu', 'Date': 'Tarehe', 'Stadium': 'Uwanja', 'Region': 'Mkoa', 'City': 'Jiji', 'Coach': 'Kocha', 'Founded': 'Ilianzishwa', 'Founded year': 'Mwaka wa kuanzishwa', 'Current position': 'Nafasi ya sasa', 'Matches played': 'Mechi zilizochezwa', 'Wins': 'Ushindi', 'Draws': 'Sare', 'Losses': 'Vipigo', 'Goals scored': 'Mabao yaliyofungwa', 'Goals conceded': 'Mabao yaliyofungwa dhidi', 'Clean sheets': 'Mechi bila kufungwa', 'Possession': 'Umiliki wa mpira', 'Shots': 'Mikwaju', 'Shots on target': 'Mikwaju iliyoelekea langoni', 'Corners': 'Kona', 'Fouls': 'Makosa', 'Yellow cards': 'Kadi za njano', 'Red cards': 'Kadi nyekundu',
    'All Clubs': 'Vilabu Vyote', 'A-Z': 'A-Z', 'Most followed': 'Vinavyofuatiliwa zaidi', 'Sort by': 'Panga kwa', 'Select Competition': 'Chagua Mashindano', 'Select Club': 'Chagua Klabu', 'Search clubs': 'Tafuta vilabu', 'Search by club name, city or home stadium to find the profile you are after.': 'Tafuta kwa jina la klabu, jiji au uwanja wa nyumbani ili kupata wasifu unaoutafuta.', 'NO MATCHING CLUBS': 'HAKUNA KLABU ZINAZOLINGANA', 'Try a different search.': 'Jaribu utafutaji mwingine.', 'League Regulations': 'Kanuni za Ligi', 'League regulations': 'Kanuni za ligi', 'All competitions': 'Mashindano yote', 'Official resources': 'Rasilimali rasmi', 'Official desk': 'Dawati rasmi', 'Official match tickets': 'Tiketi rasmi za mechi', 'Competition management system': 'Mfumo wa usimamizi wa mashindano', 'Tickets': 'Tiketi', 'Visit the office': 'Tembelea ofisi',
    'THE CLUBHOUSE': 'UWANJA WA KLabu', 'The home of Tanzania football': 'Nyumbani kwa soka la Tanzania', 'Football from Tanzania,': 'Soka kutoka Tanzania,', 'with the volume up.': 'kwa sauti ya juu.', 'Football news, without the filter.': 'Habari za soka bila kuchujwa.', 'One sharp email every week: the stories, fixtures and voices moving Tanzania’s game forward.': 'Barua pepe moja bora kila wiki: habari, ratiba na sauti zinazoendeleza soka la Tanzania.', 'One sharp email every week: the stories, fixtures and voices moving Tanzania\'s game forward.': 'Barua pepe moja bora kila wiki: habari, ratiba na sauti zinazoendeleza soka la Tanzania.', 'No noise. Just football. Unsubscribe whenever.': 'Hakuna kelele. Soka tu. Jiondoe wakati wowote.', 'Your email address': 'Anwani yako ya barua pepe', 'Search players, clubs, stories...': 'Tafuta wachezaji, vilabu, habari...', 'Search clubs, players, stories...': 'Tafuta vilabu, wachezaji, habari...', 'Search clubs, competitions, news...': 'Tafuta vilabu, mashindano, habari...', 'Search leadership, clubs, stories...': 'Tafuta uongozi, vilabu, habari...',
    'Competitions with a pulse.': 'Mashindano yenye msisimko.', 'Browse leagues': 'Vinjari ligi', 'One country.': 'Nchi moja.', 'Four competitions.': 'Mashindano manne.', 'Explore Tanzania football competitions, fixtures, results, tables, top scorers and latest news.': 'Gundua mashindano ya soka Tanzania, ratiba, matokeo, misimamo, wafungaji bora na habari za hivi karibuni.', 'The game,': 'Mchezo,', 'four ways.': 'kwa njia nne.', 'Every league has its own rhythm, rivalries and road to glory. Start with the competition you want to follow.': 'Kila ligi ina mwendo, ushindani na njia yake ya mafanikio. Anza na mashindano unayotaka kufuatilia.', 'The one to': 'Ligi ya', 'watch now.': 'kutazama sasa.', 'The NBC Premier League is in full flight. Catch the next big fixture, the leaders and the names shaping the season.': 'NBC Premier League iko kwenye kasi kamili. Fuata ratiba kubwa ijayo, vinara na majina yanayoongoza msimu.', 'Competition quick stats.': 'Takwimu fupi za mashindano.', 'Latest matches.': 'Mechi za karibuni.', 'Upcoming fixtures.': 'Ratiba zijazo.', 'League leaders.': 'Vinara wa ligi.', 'Top scorers across the field.': 'Wafungaji bora wa mashindano.', 'The finishers turning chances into momentum across Tanzania’s four competitions.': 'Wafungaji wanaogeuza nafasi kuwa msukumo katika mashindano manne ya Tanzania.', 'Latest competition news.': 'Habari za hivi karibuni za mashindano.', 'View all stories': 'Tazama habari zote',
    'Latest Football News': 'Habari za Hivi Karibuni za Soka', 'Fresh from the touchline': 'Mpya kutoka pembeni mwa uwanja', 'Across every league': 'Kutoka kila ligi', 'New stories land every matchweek, from the biggest fixtures to the details that deserve a second look.': 'Habari mpya huwasili kila wiki ya mechi, kutoka ratiba kubwa hadi maelezo yanayostahili kuangaliwa tena.', 'Showing the latest stories': 'Inaonyesha habari za hivi karibuni', 'The stories setting the tone': 'Habari zinazoongoza mjadala', 'Matchday': 'Siku ya mechi', 'Match report': 'Ripoti ya mechi', 'Match preview': 'Hakiki ya mechi', 'League update': 'Taarifa ya ligi', 'Official update': 'Taarifa rasmi', 'Club news': 'Habari za klabu', 'Player story': 'Habari ya mchezaji', 'Women’s football': 'Soka la wanawake', 'Women\'s football': 'Soka la wanawake', 'Previews, reports and reactions': 'Hakiki, ripoti na maoni', 'Inside the squad': 'Ndani ya kikosi', 'Notices, awards and competition news': 'Matangazo, tuzo na habari za mashindano', 'Profiles, form and the next wave': 'Wasifu, kiwango na kizazi kijacho', 'The Women’s Premier League deserves its own front row. Follow the players, clubs and moments building the next chapter.': 'Women’s Premier League inastahili nafasi yake ya mbele. Fuatilia wachezaji, vilabu na matukio yanayojenga sura inayofuata.', 'The notebook keeps moving': 'Daftari la habari linaendelea', 'Keep reading': 'Endelea kusoma', 'News /': 'Habari /',
    'Contact Tanzania Premier League Board': 'Wasiliana na Bodi ya Ligi Kuu Tanzania', 'Get in touch': 'Wasiliana nasi', 'Have a question, enquiry or need assistance? Our team is here to help.': 'Una swali, ombi au unahitaji msaada? Timu yetu iko hapa kukusaidia.', 'Contact information': 'Taarifa za mawasiliano', 'Send us a message': 'Tuma ujumbe kwetu', 'Full Name': 'Jina Kamili', 'Email Address': 'Anwani ya Barua Pepe', 'Phone Number': 'Namba ya Simu', 'Subject': 'Mada', 'Message': 'Ujumbe', 'Enquiry Type': 'Aina ya Ombi', 'Select an enquiry type': 'Chagua aina ya ombi', 'General Enquiry': 'Ombi la Jumla', 'Competition Information': 'Taarifa za Mashindano', 'Fixtures & Results': 'Ratiba na Matokeo', 'Media & Press': 'Vyombo vya Habari na Waandishi', 'Sponsorship & Partnership': 'Udhamini na Ushirikiano', 'Technical Support': 'Msaada wa Kiufundi', 'Other': 'Nyingine', 'General Enquiries': 'Maombi ya Jumla', 'Competition Support': 'Msaada wa Mashindano', 'Partnerships': 'Ushirikiano', 'Email the board directly': 'Tuma barua pepe moja kwa moja kwa bodi', 'Postal correspondence': 'Mawasiliano ya posta', 'Office visit': 'Ziara ya ofisi', 'Visit our office': 'Tembelea ofisi yetu', 'Quick contact': 'Mawasiliano ya haraka', 'Need to know': 'Unayohitaji kujua', 'Where can I report an issue with fixtures or results?': 'Ninawezaje kuripoti tatizo la ratiba au matokeo?', 'Where is the TPLB office located?': 'Ofisi ya TPLB iko wapi?', 'How can I contact the Tanzania Premier League Board?': 'Ninawezaje kuwasiliana na Bodi ya Ligi Kuu Tanzania?', 'How can clubs contact the league?': 'Vilabu vinawezaje kuwasiliana na ligi?', 'How can media organisations contact TPLB?': 'Mashirika ya habari yanawezaje kuwasiliana na TPLB?', 'Get Directions': 'Pata Maelekezo', 'Your message has been sent successfully. Our team will get back to you shortly.': 'Ujumbe wako umetumwa kwa mafanikio. Timu yetu itawasiliana nawe hivi karibuni.', 'This field is required.': 'Sehemu hii inahitajika.', 'Enter a valid email address.': 'Weka anwani sahihi ya barua pepe.', 'Please check the highlighted fields and try again.': 'Tafadhali kagua sehemu zilizoangaziwa na ujaribu tena.', 'Something went wrong. Please try again.': 'Kuna hitilafu imetokea. Tafadhali jaribu tena.',
    'PREDICTION': 'UTABIRI', 'Think you know Tanzanian football? Predict matches, answer football questions, earn points and compete with fans across the country.': 'Unaijua soka la Tanzania? Tabiri mechi, jibu maswali ya soka, pata pointi na shindana na mashabiki kote nchini.', 'All': 'Yote', 'Today': 'Leo', 'This week': 'Wiki hii', 'This month': 'Mwezi huu', 'Season': 'Msimu', 'MATCHDAY CHALLENGE': 'CHANGAMOTO YA SIKU YA MECHI', 'TODAY’S PREDICTION CHALLENGE': 'CHANGAMOTO YA LEO YA UTABIRI', 'Who will win?': 'Nani atashinda?', 'Home Win': 'Ushindi wa Nyumbani', 'Draw': 'Sare', 'Away Win': 'Ushindi wa Ugenini', 'Prediction Locked': 'Utabiri Umefungwa', 'Awaiting Result': 'Inasubiri Matokeo', 'Correct Prediction': 'Utabiri Sahihi', 'Fan Leaderboard': 'Orodha ya Mashabiki Bora', 'Prediction closes in': 'Utabiri unafungwa baada ya', 'Predictions Closed': 'Utabiri Umefungwa', 'Choose an outcome to save your prediction.': 'Chagua matokeo ili kuhifadhi utabiri wako.', 'Your call is in.': 'Utabiri wako umehifadhiwa.', 'Every prediction is saved immediately, locked at kickoff and settled once from the official result.': 'Kila utabiri huhifadhiwa mara moja, hufungwa wakati wa kuanza na kuthibitishwa kwa matokeo rasmi.', 'The official result is still pending.': 'Matokeo rasmi bado yanasubiriwa.', 'Correct match winner': 'Mshindi sahihi wa mechi', 'Incorrect prediction': 'Utabiri usio sahihi', 'Your predictions': 'Utabiri wako', 'Previous results': 'Matokeo yaliyopita', 'Live fan ranking': 'Orodha hai ya mashabiki', 'Current rank': 'Nafasi ya sasa', 'Total points': 'Jumla ya pointi', 'Prediction points': 'Pointi za utabiri', 'Quiz points': 'Pointi za chemsha bongo', 'My fan score': 'Alama zangu za shabiki', 'My quiz score': 'Alama zangu za chemsha bongo', 'No money. Just the game.': 'Hakuna pesa. Mchezo tu.', 'Choose your arena': 'Chagua uwanja wako', 'New challenge every day': 'Changamoto mpya kila siku', 'Complete today’s challenge to begin': 'Kamilisha changamoto ya leo ili kuanza', 'Answers are saved as you go.': 'Majibu huhifadhiwa unapoendelea.', 'Question missed.': 'Swali limekosa jibu.', 'This quiz is complete.': 'Chemsha bongo hii imekamilika.', 'Quiz completed': 'Chemsha bongo imekamilika', 'Review answers': 'Kagua majibu', 'Submit Quiz': 'Wasilisha chemsha bongo', 'Loading quiz question...': 'Inapakia swali la chemsha bongo...', 'Loading today’s challenge...': 'Inapakia changamoto ya leo...', 'Next question': 'Swali linalofuata', 'Correct': 'Sahihi', 'Incorrect': 'Si sahihi', 'Missed': 'Limekosa jibu', 'Your result is ready.': 'Matokeo yako yako tayari.', 'Your answers are locked.': 'Majibu yako yamefungwa.', 'You have answered all 5 questions. Your answers cannot be changed after submission.': 'Umejibu maswali yote 5. Majibu yako hayawezi kubadilishwa baada ya kuwasilisha.', 'No answer was submitted in 40 seconds.': 'Hakuna jibu lililowasilishwa ndani ya sekunde 40.', 'No answer was submitted in 20 seconds.': 'Hakuna jibu lililowasilishwa ndani ya sekunde 20.', '40 seconds': 'Sekunde 40', '20 seconds': 'Sekunde 20', 'points': 'pointi', 'pts': 'pt', 'goals': 'mabao', 'days': 'siku', 'hrs': 'masaa', 'mins': 'dak', 'secs': 'sek', 'UPCOMING': 'ZIJAZO', 'LIVE': 'MOJA KWA MOJA', 'FT': 'MWISHO', 'POSTPONED': 'IMEAHIRISHWA', 'UP NEXT': 'INAYOFUATA', 'vs': 'dhidi ya', 'Home': 'Mwanzo', 'Away': 'Ugenini',
    'Leadership with purpose.': 'Uongozi wenye dhamira.', 'Meet the people carrying Tanzania football’s competitions forward — with clear governance, professional standards and a shared ambition for the game.': 'Wakutane na watu wanaoendesha mashindano ya soka Tanzania — kwa uongozi ulio wazi, viwango vya kitaalamu na dhamira ya pamoja kwa mchezo.', 'Meet the office leaders and department heads keeping competition, clubs and communication moving together.': 'Wakutane na viongozi wa ofisi na wakuu wa idara wanaowezesha mashindano, vilabu na mawasiliano kusonga pamoja.', 'Board positions listed': 'Nafasi za bodi zilizoorodheshwa', 'Executive secretariat': 'Sekretarieti ya utendaji', 'Focused on the game': 'Tunaelekeza nguvu kwenye mchezo', 'Leadership bodies': 'Vyombo vya uongozi', 'The people entrusted with the league’s direction, standards and long-term growth.': 'Watu waliokabidhiwa mwelekeo, viwango na ukuaji wa muda mrefu wa ligi.', 'Strong competitions need strong stewardship.': 'Mashindano imara yanahitaji uongozi imara.',
    'Stories with weight.': 'Habari zenye uzito.', 'The game never stands still.': 'Mchezo hausimami kamwe.', 'Unmissable moment': 'Tukio lisilokosekana', 'Moment replay.': 'Rudia tukio.', 'Press play to watch the selected moment.': 'Bonyeza cheza kutazama tukio lililochaguliwa.', 'Video unavailable': 'Video haipatikani', 'This moment is available as a still image.': 'Tukio hili linapatikana kama picha tu.', 'Sound on for the full matchday feel': 'Washa sauti upate hisia kamili za siku ya mechi', 'MATCH CENTRE': 'KITUO CHA MECHI', 'FIXTURES': 'RATIBA', 'RESULTS': 'MATOKEO', 'TABLE': 'MSIMAMO', 'COUNTDOWN TO KICKOFF': 'HESABU KURUDI HADI MWANZO', 'VIEW ALL MATCHES': 'TAZAMA MECHI ZOTE', 'View full table': 'Tazama msimamo kamili', 'Vote & claim +30 PTS': 'Piga kura na pata +30 PT', 'Read more': 'Soma zaidi', 'Question': 'Swali', 'Answer': 'Jibu', 'Change': 'Badilisha', 'Member': 'Mwanachama', 'President': 'Rais', 'AFCON Host': 'Mwenyeji wa AFCON', 'CAF League Rank': 'Nafasi ya Ligi CAF', 'Long-range finish': 'Mkwaju wa mbali', 'OFFICIAL AWARD': 'TUZO RASMI', 'OFFICIAL BRIEF': 'TAARIFA RASMI',
    'TFF OFFICIAL PORTAL': 'TOVUTI RASMI YA TFF', 'NBC Championship': 'NBC Championship', 'NBC Championship League': 'NBC Championship', 'First League': 'Ligi ya Kwanza', 'Women’s Premier League': 'Ligi Kuu ya Wanawake', 'Women\'s Premier League': 'Women\'s Premier League', 'Ligi Kuu': 'Ligi Kuu', 'Tanzania Premier League Board': 'Bodi ya Ligi Kuu Tanzania', '14th Floor, NSSF Mafao House': 'Ghorofa ya 14, NSSF Mafao House', 'Plot No. 40, Block Y, Ilala': 'Kiwanja Na. 40, Kitalu Y, Ilala', 'Dar es Salaam, Tanzania.': 'Dar es Salaam, Tanzania.', 'Official league office': 'Ofisi rasmi ya ligi', 'The office is on the 14th Floor of NSSF Mafao House, Plot No. 40, Block Y, Ilala, Dar es Salaam.': 'Ofisi iko Ghorofa ya 14 ya NSSF Mafao House, Kiwanja Na. 40, Kitalu Y, Ilala, Dar es Salaam.',
    'Error': 'Hitilafu', 'Please enter a valid email address.': 'Tafadhali weka anwani sahihi ya barua pepe.', 'Something went wrong. Please try again.': 'Kuna hitilafu imetokea. Tafadhali jaribu tena.', 'You’re in': 'Umejiunga', "You're in": 'Umejiunga', 'Welcome to the clubhouse. Check your inbox for the first whistle.': 'Karibu kwenye uwanja wa klabu. Angalia kikasha chako kwa habari ya kwanza.', 'Your message has been sent successfully. Our team will get back to you shortly.': 'Ujumbe wako umetumwa kwa mafanikio. Timu yetu itawasiliana nawe hivi karibuni.'
  };

  Object.assign(translations, {
    "LIVE FROM TANZANIA": "MOJA KWA MOJA KUTOKA TANZANIA",
    "THE LANDSCAPE / 04 COMPETITIONS": "MANDHARI / 04 MASHINDANO",
    "THE NOTEBOOK / 2026 / 27": "DAFTARI LA HABARI / 2026 / 27",
    "THE FULL PICTURE OF TANZANIAN FOOTBALL": "TASWIRA KAMILI YA SOKA LA TANZANIA",
    "2026 / 27 SEASON": "MSIMU WA 2026 / 27",
    "THE LANDSCAPE": "MANDHARI",
    "THE SEASON": "MSIMU",
    "THE LEAGUES": "LIGI",
    "01 / THE NOTEBOOK": "01 / DAFTARI LA HABARI",
    "02 / MATCH CENTRE": "02 / KITUO CHA MECHI",
    "03 / UNMISSABLE MOMENTS": "03 / MATUKIO YASIYOKOSEKANA",
    "04 / FEDERATION EXECUTIVE LEADERSHIP": "04 / UONGOZI WA SHIRIKISHO",
    "05 / FAN ENTERTAINMENT & REWARDS": "05 / BURUDANI NA TUZO ZA MASHABIKI",
    "06 MOMENTS": "MATUKIO 06",
    "01 / CHOOSE YOUR COMPETITION": "01 / CHAGUA MASHINDANO YAKO",
    "02 / FEATURED COMPETITION": "02 / MASHINDANO YALIYOANGAZIWA",
    "03 / THE BIG PICTURE": "03 / TASWIRA KUBWA",
    "04 / ACROSS THE LEAGUES": "04 / KATIKA LIGI ZOTE",
    "05 / NEXT UP": "05 / INAYOFUATA",
    "06 / THE FRONT": "06 / VINARA",
    "07 / GOLDEN BOOT WATCH": "07 / UFUATILIAJI WA WAFUNGaji",
    "08 / THE NOTEBOOK": "08 / DAFTARI LA HABARI",
    "01 / THE FRONT PAGE": "01 / UKURASA WA MBELE",
    "02 / THE LATEST": "02 / HABARI MPYA",
    "03 / MATCHDAY": "03 / SIKU YA MECHI",
    "04 / THE CLUBHOUSE": "04 / UWANJA WA KLABU",
    "05 / THE PEOPLE": "05 / WATU",
    "06 / WOMEN'S FOOTBALL": "06 / SOKA LA WANAWAKE",
    "07 / THE LEAGUE DESK": "07 / DAWATI LA LIGI",
    "01 / CONTACT DESK": "01 / DAWATI LA MAWASILIANO",
    "02 / VISIT OUR OFFICE": "02 / TEMBELEA OFISI YETU",
    "03 / QUICK CONTACT": "03 / MAWASILIANO YA HARAKA",
    "04 / NEED TO KNOW": "04 / UNAYOHITAJI KUJUA",
    "01 / THE OVERSIGHT TABLE": "01 / BODI YA USIMAMIZI",
    "02 / THE DELIVERY ENGINE": "02 / INJINI YA UTEKELEZAJI",
    "03 / THE CHARTER": "03 / MISINGI YA UONGOZI",
    "02 / THE CALENDAR": "02 / KALENDA",
    "03 / THE RECORD": "03 / REKODI",
    "04 / THE RACE": "04 / MASHINDANO",
    "05 / PERFORMANCE CENTER": "05 / KITUO CHA UTENDAJI",
    "06 / THE SHIRTS": "06 / JEZI",
    "07 / THE NOTEBOOK": "07 / DAFTARI LA HABARI",
    "01 / PICK A CHALLENGE": "01 / CHAGUA CHANGAMOTO",
    "01 / TODAY'S PREDICTION CHALLENGE": "01 / CHANGAMOTO YA LEO YA UTABIRI",
    "02 / LOCK YOUR ANSWERS": "02 / FUNGA MAJIBU YAKO",
    "02 / TFF FAN QUIZ": "02 / CHEMSHA BONGO YA MSHABIKI WA TFF",
    "03 / CLIMB THE BOARD": "03 / PANDA KWENYE ORODHA",
    "03 / DAILY CHALLENGE": "03 / CHANGAMOTO YA KILA SIKU",
    "04 / MY PREDICTIONS": "04 / UTABIRI WANGU",
    "05 / FAN LEADERBOARD": "05 / ORODHA YA MASHABIKI",
    "06 / PREVIOUS RESULTS": "06 / MATOKEO YALIYOPITA",
    "FEATURED STORY": "HABARI ILIYOANGAZIWA",
    "LATEST NEWS": "HABARI ZA HIVI KARIBUNI",
    "UPCOMING FIXTURES": "RATIBA ZIJAZO",
    "UNMISSABLE MOMENTS": "MATUKIO YASIYOKOSEKANA",
    "FEDERATION EXECUTIVE LEADERSHIP": "UONGOZI WA UTENDAJI WA SHIRIKISHO",
    "FAN ENTERTAINMENT & REWARDS": "BURUDANI NA TUZO ZA MASHABIKI",
    "FOOTBALL QUIZ": "CHEMSHA BONGO YA SOKA",
    "MATCH PREDICTOR": "KITABIRI CHA MECHI",
    "MATCHDAY POLL": "KURA YA SIKU YA MECHI",
    "TRIVIA REWARDS": "TUZO ZA MASWALI YA SOKA",
    "GOAL OF THE WEEK": "BAO LA WIKI",
    "RESULTS": "MATOKEO",
    "TANZANIA PREMIER LEAGUE": "LIGI KUU TANZANIA",
    "SEARCH THE NOTEBOOK": "TAFUTA KWENYE DAFTARI LA HABARI",
    "SEARCH THE CLUBHOUSE": "TAFUTA KWENYE UWANJA WA KLABU",
    "SEARCH THE DIRECTORY": "TAFUTA KWENYE ORODHA",
    "SEARCH THE LEADERSHIP ROOM": "TAFUTA KWENYE CHUMBA CHA UONGOZI",
    "SEARCH THE LEAGUE": "TAFUTA KWENYE LIGI",
    "The directory / 2026 / 27": "ORODHA / 2026 / 27",
    "THE DIRECTORY / 2026 / 27": "ORODHA / 2026 / 27",
    "64 clubs / all competitions": "Vilabu 64 / mashindano yote",
    "Explore clubs from Tanzania's top football competitions. Find every badge, home ground, league position and the story behind the squad.": "Gundua vilabu kutoka mashindano makubwa ya soka Tanzania. Pata kila nembo, uwanja wa nyumbani, nafasi ya ligi na historia ya kikosi.",
    "Every card opens a full club profile with its league table, fixtures, player numbers, team metrics and history.": "Kila kadi inafungua wasifu kamili wa klabu wenye msimamo wa ligi, ratiba, takwimu za wachezaji, vipimo vya timu na historia.",
    "CONTACT INFORMATION": "TAARIFA ZA MAWASILIANO",
    "SEND US A MESSAGE": "TUTUMIE UJUMBE",
    "THE OFFICE / TANZANIA PREMIER LEAGUE BOARD": "OFISI / BODI YA LIGI KUU TANZANIA",
    "OFFICE VISIT": "ZIARA YA OFISI",
    "ILALA, DAR ES SALAAM": "ILALA, DAR ES SALAAM",
    "14TH FLOOR / PLOT NO. 40, BLOCK Y": "GHOROFA YA 14 / KIWANJA NA. 40, KITALU Y",
    "Season tracker": "Ufuatiliaji wa msimu",
    "Top 10 players / current season snapshot": "Wachezaji 10 bora / taswira ya msimu wa sasa",
    "The players shaping this league, from the golden boot race to the clean-sheet battle. Switch the category and stay close to the numbers.": "Wachezaji wanaoipa ligi sura, kutoka mbio za ufungaji hadi ushindani wa kutofungwa. Badilisha kundi na fuatilia takwimu.",
    "THE NOTEBOOK KEEPS MOVING": "DAFTARI LA HABARI LINAENDELEA",
    "Across every league": "Katika ligi zote",
    "Fresh from the touchline": "Mpya kutoka pembeni mwa uwanja",
    "New stories land every matchweek, from the biggest fixtures to the details that deserve a second look.": "Habari mpya huwasili kila wiki ya mechi, kutoka ratiba kubwa hadi maelezo yanayostahili kuangaliwa tena.",
    "TRENDING / 24 HOURS": "ZINAZOVUMA / MASAA 24",
    "The stories setting the tone": "Habari zinazoongoza mjadala",
    "Previews, reports and reactions": "Hakiki, ripoti na maoni",
    "Profiles, form and the next wave": "Wasifu, kiwango na kizazi kijacho",
    "Notices, awards and competition news": "Matangazo, tuzo na habari za mashindano",
    "Inside the squad": "Ndani ya kikosi",
    "The Women's Premier League deserves its own front row. Follow the players, clubs and moments building the next chapter.": "Women’s Premier League inastahili nafasi yake ya mbele. Fuatilia wachezaji, vilabu na matukio yanayojenga sura inayofuata.",
    "THE GOVERNANCE ROOM / 2026": "CHUMBA CHA UONGOZI / 2026",
    "KAMATI YA UONGOZI": "KAMATI YA UONGOZI",
    "BODI YA LIGI KUU TANZANIA": "BODI YA LIGI KUU TANZANIA",
    "THE PEOPLE": "WATU",
    "Leadership bodies": "Vyombo vya uongozi",
    "The executive office and operational departments that turn league strategy into a professional matchday experience.": "Ofisi ya utendaji na idara zinazogeuza mkakati wa ligi kuwa uzoefu wa kitaalamu wa siku ya mechi.",
    "PREDICTION SAVED": "UTABIRI UMEHIFADHIWA",
    "OFFICIAL SETTLEMENT": "UTHIBITISHO RASMI",
    "SCORING RULES": "KANUNI ZA ALAMA",
    "LOCAL FAN SAVE": "HIFADHI YA MSHABIKI WA HUMU",
    "CHOOSE YOUR ARENA": "CHAGUA UWANJA WAKO",
    "MY FAN SCORE": "ALAMA ZANGU ZA MSHABIKI",
    "MY QUIZ SCORE": "ALAMA ZANGU ZA CHEMSHA BONGO",
    "TOTAL POINTS": "JUMLA YA POINTI",
    "PREDICTION POINTS": "POINTI ZA UTABIRI",
    "REFRESH-SAFE SAVE": "HIFADHI SALAMA BAADA YA KUSASISHA",
    "Review answers": "Kagua majibu",
    "Your result is ready.": "Matokeo yako yako tayari.",
    "Awaiting the official final result.": "Inasubiri matokeo rasmi ya mwisho.",
    "It is locked at kickoff and will be settled from the official final result.": "Utabiri hufungwa wakati wa kuanza na kuthibitishwa kwa matokeo rasmi ya mwisho.",
    "Choose Home Win, Draw or Away Win. Your selection is saved immediately and can only change before the deadline.": "Chagua ushindi wa nyumbani, sare au ushindi wa ugenini. Chaguo lako huhifadhiwa mara moja na linaweza kubadilishwa kabla ya muda kuisha.",
    "Complete today's five-question challenge. The same scoring applies: 5/5 earns 3 points, 4/5 earns 2, 3/5 earns 1, and 0–2 earns 0.": "Kamilisha changamoto ya leo yenye maswali matano. Mfumo wa alama ni huu: 5/5 hupata pointi 3, 4/5 hupata 2, 3/5 hupata 1, na 0–2 hupata 0.",
    "Test your Tanzania football knowledge. Finish all five questions before points are calculated.": "Pima ujuzi wako wa soka la Tanzania. Maliza maswali yote matano kabla ya kuhesabu pointi.",
    "Daily Challenge": "Changamoto ya Kila Siku",
    "MY PREDICTIONS": "UTABIRI WANGU",
    "PREVIOUS RESULTS": "MATOKEO YALIYOPITA",
    "LIVE FAN RANKING": "ORODHA HAI YA MASHABIKI",
    "Current rank": "Nafasi ya sasa",
    "Your live ranking should come from registered fan accounts and settled point transactions.": "Nafasi yako hai inapaswa kutoka kwenye akaunti ya shabiki iliyosajiliwa na miamala ya pointi iliyothibitishwa.",
    "No money. Just the game.": "Hakuna pesa. Mchezo tu.",
    "The game never stands still.": "Mchezo hausimami kamwe.",
    "Scroll to explore": "Shuka kuchunguza",
    "VIEW ALL MATCHES": "TAZAMA MECHI ZOTE",
    "Back to all news": "Rudi kwenye habari zote",
    "KEEP READING": "ENDELEA KUSOMA",
    "PASS IT ON": "SHIRIKI HABARI HII",
    "Official league office": "Ofisi rasmi ya ligi",
    "Questions about the league office or official information.": "Maswali kuhusu ofisi ya ligi au taarifa rasmi.",
    "Competition information, fixtures, results and league matters.": "Taarifa za mashindano, ratiba, matokeo na masuala ya ligi.",
    "Press enquiries, official statements and interview requests.": "Maombi ya waandishi, taarifa rasmi na maombi ya mahojiano.",
    "Sponsorship, partnership and football development enquiries.": "Maombi ya udhamini, ushirikiano na maendeleo ya soka.",
    "Tell us how we can help and the league office will route your message to the right desk.": "Tuambie tunavyoweza kukusaidia na ofisi ya ligi itapeleka ujumbe wako kwenye dawati sahihi."
  });  Object.assign(translations, {
    "Mashujaa, Pamba Jiji and Namungo return strong to the NBC Premier League.": "Mashujaa, Pamba Jiji na Namungo warejea kwa nguvu NBC Premier League.",
    "Simba and Young Africans set the volume for the next big night.": "Simba na Young Africans wanaweka msisimko kuelekea usiku mkubwa unaofuata.",
    "Ngassa and Elias shine in the September awards.": "Ngassa na Elias wang'ara katika tuzo za Septemba.",
    "Maxi Nzengeli is turning the midfield into a Premier League stage.": "Maxi Nzengeli anaifanya safu ya kiungo kuwa jukwaa la Premier League.",
    "Azam sharpen the squad as the race begins to stretch.": "Azam wanaimarisha kikosi wakati mbio za ligi zikianza kuwa ndefu.",
    "The league operations room sets the rhythm for the next round.": "Chumba cha uendeshaji wa ligi kinaweka mpangilio wa raundi inayofuata.",
    "Rhino Rangers prepare for a Tabora test as the Championship race tightens.": "Rhino Rangers wajiandaa kwa mtihani wa Tabora wakati mbio za Championship zikizidi kuwa ngumu.",
    "Pressure builds across a Championship table with no room to drift.": "Presha inaongezeka kwenye msimamo wa Championship bila nafasi ya kulegea.",
    "Promotion hopefuls add depth for the long Championship run.": "Wanaowania kupanda daraja wanaongeza kina cha kikosi kwa safari ndefu ya Championship.",
    "The Championship's next generation is taking the stage.": "Kizazi kijacho cha Championship kinachukua nafasi yake.",
    "The competition desk keeps clubs aligned for the next chapter.": "Dawati la mashindano linaweka vilabu kwenye mwelekeo mmoja kwa sura inayofuata.",
    "Mbeya Kwanza start the next chapter at the top of the race.": "Mbeya Kwanza wanaanza sura inayofuata wakiwa kileleni mwa mbio.",
    "The First League's stadium stories are shaping the matchday experience.": "Hadithi za viwanja vya First League zinaunda uzoefu wa siku ya mechi.",
    "The First League is giving the next generation room to grow.": "First League inatoa nafasi kwa kizazi kijacho kukua.",
    "Simba Queens keep the standard high as the season gathers pace.": "Simba Queens wanaendelea kuweka kiwango cha juu msimu unapoongeza kasi.",
    "JKT Queens show the power of a team growing together.": "JKT Queens wanaonyesha nguvu ya timu inayokua pamoja.",
    "A new wave of women's football talent is ready for the next step.": "Kizazi kipya cha vipaji vya soka la wanawake kiko tayari kwa hatua inayofuata.",
    "The women's game is building its next great chapter.": "Soka la wanawake linajenga sura yake kubwa inayofuata.",
    "KMC chase a place in the 2026/2027 Premier League.": "KMC wanafuatilia nafasi katika Premier League ya 2026/2027.",
    "The fourth Championship round kicks off today.": "Raundi ya nne ya Championship inaanza leo.",
    "The latest round brought brave performances, late pressure and a new shape to the early Premier League conversation.": "Raundi ya hivi karibuni ilileta uchezaji wa kishujaa, presha ya dakika za mwisho na mwelekeo mpya kwenye mjadala wa mwanzo wa Premier League.",
    "A rivalry built on history returns with both sides looking to make the first statement of the next round.": "Ushindani uliojengwa na historia unarejea huku pande zote zikilenga kutoa kauli ya kwanza kwenye raundi inayofuata.",
    "Which club won the most recent NBC Premier League title?": "Klabu gani ilishinda taji la hivi karibuni la NBC Premier League?",
    "What does TFF stand for?": "TFF inamaanisha nini?",
    "What is the nickname of Tanzania men's national team?": "Jina la utani la timu ya taifa ya wanaume Tanzania ni lipi?",
    "What is the nickname of Tanzania women's national team?": "Jina la utani la timu ya taifa ya wanawake Tanzania ni lipi?",
    "Which competition is Tanzania's top domestic men's league?": "Ni mashindano gani yaliyo ligi kuu ya wanaume Tanzania?",
    "Which body administers Tanzania football?": "Ni chombo gani kinachosimamia soka la Tanzania?",
    "Which cup is closely associated with Zanzibar football?": "Kombe gani linahusishwa kwa karibu na soka la Zanzibar?",
    "The Kagame Cup is associated with which regional body?": "Kagame Cup inahusishwa na chombo gani cha kikanda?",
    "What does a Community Shield usually signal?": "Community Shield kwa kawaida huashiria nini?",
    "Which two clubs contest Tanzania's famous Kariakoo derby?": "Ni vilabu gani viwili vinavyoshindana katika derby maarufu ya Kariakoo Tanzania?",
    "Which city is home to the traditional Kariakoo derby rivalry?": "Ni jiji gani ni nyumbani kwa ushindani wa jadi wa derby ya Kariakoo?",
    "Which club is nicknamed Wekundu wa Msimbazi?": "Ni klabu gani inayoitwa Wekundu wa Msimbazi?",
    "Which club is commonly known as Yanga?": "Ni klabu gani inayojulikana kama Yanga?",
    "Which club is known by the short name Azam?": "Ni klabu gani inayojulikana kwa jina fupi la Azam?",
    "Which club appears in the current women's match example?": "Ni klabu gani inaonekana kwenye mfano wa mechi ya wanawake?",
    "Which club is paired with Simba SC in a Kariakoo derby?": "Ni klabu gani inapambana na Simba SC katika derby ya Kariakoo?",
    "Which competition sits below the Premier League in this portal?": "Ni mashindano gani yapo chini ya Premier League kwenye tovuti hii?",
    "Which competition is the next level named in the portal?": "Ni mashindano gani ni ngazi inayofuata kwenye tovuti hii?",
    "How many main competitions are featured on the Competitions page?": "Ni mashindano mangapi makuu yameonyeshwa kwenye ukurasa wa Mashindano?",
    "Which women's competition is featured?": "Ni mashindano gani ya wanawake yameonyeshwa?",
    "Which positions represent CAF Champions League places in the league table?": "Nafasi zipi zinawakilisha nafasi za CAF Champions League kwenye msimamo wa ligi?",
    "Taifa Stars represents which national team?": "Taifa Stars inawakilisha timu gani ya taifa?",
    "Twiga Stars represents which national team?": "Twiga Stars inawakilisha timu gani ya taifa?",
    "What do national teams represent?": "Timu za taifa zinawakilisha nini?",
    "Which competition body is connected to continental football?": "Ni chombo gani cha mashindano kinahusishwa na soka la bara?",
    "What does a national-team call-up mean?": "Kuitwa kwenye timu ya taifa kunamaanisha nini?",
    "Benjamin Mkapa Stadium is in which city?": "Uwanja wa Benjamin Mkapa uko katika jiji gani?",
    "Sokoine Stadium is associated with which city in this portal?": "Uwanja wa Sokoine unahusishwa na jiji gani kwenye tovuti hii?",
    "Which venue is used in the women's prediction example?": "Ni uwanja gani umetumika kwenye mfano wa utabiri wa wanawake?",
    "Which venue is used for the First League example?": "Ni uwanja gani umetumika kwenye mfano wa First League?",
    "What is a stadium primarily used for?": "Uwanja hutumika hasa kwa ajili gani?",
    "What position is Clatous Chama listed as?": "Clatous Chama ameorodheshwa katika nafasi gani?",
    "What position is Peter Shalulile listed as?": "Peter Shalulile ameorodheshwa katika nafasi gani?",
    "What position is Djigui Diarra listed as?": "Djigui Diarra ameorodheshwa katika nafasi gani?",
    "What position is Feisal Salum listed as?": "Feisal Salum ameorodheshwa katika nafasi gani?",
    "Which player is listed with Simba in the assists data?": "Ni mchezaji gani ameorodheshwa na Simba kwenye takwimu za pasi za mabao?",
    "What does GF mean in a league table?": "GF inamaanisha nini kwenye msimamo wa ligi?",
    "What does GA mean?": "GA inamaanisha nini?",
    "What does GD describe?": "GD inaeleza nini?",
    "How many points does a league win normally earn?": "Ushindi wa ligi kwa kawaida hupata pointi ngapi?",
    "Which places are marked as relegation in the table design?": "Nafasi zipi zimewekwa kama za kushuka daraja kwenye muundo wa msimamo?",
    "How many points does a draw normally earn?": "Sare kwa kawaida hupata pointi ngapi?",
    "What does a red card mean?": "Kadi nyekundu inamaanisha nini?",
    "What does FT mean beside a match?": "FT inamaanisha nini karibu na mechi?",
    "What is a clean sheet?": "Clean sheet ni nini?",
    "Why is a prediction locked at kickoff?": "Kwa nini utabiri hufungwa wakati wa kuanza kwa mechi?",
    "Which match is the classic Tanzania football derby example?": "Ni mechi gani ni mfano wa derby ya kawaida ya soka Tanzania?",
    "What does TPLB refer to in this portal?": "TPLB inamaanisha nini kwenye tovuti hii?",
    "What does a club badge help fans identify?": "Nembo ya klabu huwasaidia mashabiki kutambua nini?",
    "What is a matchweek?": "Wiki ya mechi ni nini?",
    "What is the purpose of the fan leaderboard?": "Madhumuni ya orodha ya mashabiki bora ni nini?",
    "Tanzania Football Federation": "Shirikisho la Mpira wa Miguu Tanzania",
    "Tanzania Fans Forum": "Jukwaa la Mashabiki Tanzania",
    "Tanzania Finals Federation": "Shirikisho la Fainali Tanzania",
    "Tanzania Football Foundation": "Msingi wa Soka Tanzania",
    "Tanzania men": "Timu ya wanaume Tanzania",
    "Tanzania women": "Timu ya wanawake Tanzania",
    "Tanzania under-17 only": "Tanzania chini ya miaka 17 pekee",
    "Zanzibar clubs": "Vilabu vya Zanzibar",
    "The start of a new season": "Mwanzo wa msimu mpya",
    "The end of every match": "Mwisho wa kila mechi",
    "A transfer window": "Dirisha la usajili",
    "A national team camp": "Kambi ya timu ya taifa",
    "The country": "Nchi",
    "One club only": "Klabu moja tu",
    "One stadium": "Uwanja mmoja",
    "A league sponsor": "Mdhamini wa ligi",
    "A player is selected to represent the country": "Mchezaji amechaguliwa kuiwakilisha nchi",
    "A match is postponed": "Mechi imeahirishwa",
    "A club changes its badge": "Klabu inabadilisha nembo yake",
    "A league table is reset": "Msimamo wa ligi unaanzishwa upya",
    "Hosting football matches": "Kuandaa mechi za soka",
    "Publishing league rules": "Kuchapisha kanuni za ligi",
    "Counting league points": "Kuhesabu pointi za ligi",
    "Registering transfers only": "Kusajili uhamisho pekee",
    "Midfielder": "Kiungo",
    "Goalkeeper": "Kipa",
    "Defender": "Beki",
    "Forward": "Mshambuliaji",
    "Coach": "Kocha",
    "Referee": "Mwamuzi",
    "Analyst": "Mchambuzi",
    "Physio": "Mtaalamu wa tiba",
    "Goals For": "Mabao ya kufunga",
    "Games Finished": "Michezo iliyomalizika",
    "Goals Against": "Mabao ya kufungwa",
    "Goal Difference": "Tofauti ya mabao",
    "Game Duration": "Muda wa mchezo",
    "Three": "Tatu",
    "Two": "Mbili",
    "Four": "Nne",
    "Five": "Tano",
    "Six": "Sita",
    "Ten": "Kumi",
    "One": "Moja",
    "Zero always": "Sifuri kila mara",
    "The player is sent off": "Mchezaji anatolewa uwanjani",
    "The team scores a goal": "Timu inafunga bao",
    "The match restarts": "Mechi inaanza tena",
    "The coach enters the pitch": "Kocha anaingia uwanjani",
    "Full time": "Muda wote umemalizika",
    "First team": "Timu ya kwanza",
    "Final transfer": "Uhamisho wa mwisho",
    "Fixture table": "Jedwali la ratiba",
    "Conceding no goals": "Kutofungwa bao",
    "Scoring no goals": "Kutofunga bao",
    "Winning on penalties": "Kushinda kwa penalti",
    "Receiving no cards": "Kutopata kadi",
    "To keep the game fair": "Kuweka mchezo kuwa wa haki",
    "To change the result": "Kubadilisha matokeo",
    "To add extra goals": "Kuongeza mabao",
    "To hide the fixture": "Kuficha ratiba",
    "A scheduled round of league fixtures": "Raundi iliyopangwa ya ratiba za ligi",
    "A transfer contract": "Mkataba wa uhamisho",
    "A stadium section": "Sehemu ya uwanja",
    "A player position": "Nafasi ya mchezaji",
    "To compare points and ranks": "Kulinganisha pointi na nafasi",
    "To set ticket prices": "Kuweka bei za tiketi",
    "To replace the league table": "Kuchukua nafasi ya msimamo wa ligi",
    "To select referees": "Kuchagua waamuzi",
    "Ready to play": "Tayari kucheza",
    "Open quiz": "Fungua chemsha bongo",
    "Continue": "Endelea",
    "Complete the previous quiz to unlock": "Kamilisha chemsha bongo iliyotangulia ili kufungua",
    "5 Questions": "Maswali 5",
    "COMPLETED": "IMEKAMILIKA",
    "IN PROGRESS": "INAENDELEA",
    "CONTINUE": "ENDELEA",
    "READY TO PLAY": "TAYARI KUCHEZA",
    "LOCKED": "IMEFUNGWA",
    "QUIZ HISTORY": "HISTORIA YA CHEMSHA BONGO",
    "Result:": "Matokeo:",
    "Earned:": "Umejipatia:",
    "No answer was submitted in 40 seconds.": "Hakuna jibu lililowasilishwa ndani ya sekunde 40.",
    "Time expired. Question": "Muda umeisha. Swali",
    "marked missed.": "limewekwa kuwa limekosa jibu.",
    "Answer each question or let its 40-second timer mark it missed.": "Jibu kila swali au acha kipima muda cha sekunde 40 kiweke kuwa limekosa jibu.",
    "Quiz completed. No points this time.": "Chemsha bongo imekamilika. Hakuna pointi safari hii.",
    "Quiz completed.": "Chemsha bongo imekamilika.",
    "points added.": "pointi zimeongezwa.",
    "Question missed.": "Swali limekosa jibu.",
    "CORRECT": "SAHIHI",
    "INCORRECT": "SI SAHIHI",
    "AWAITING": "INASUBIRI",
    "POINTS EARNED": "POINTI ZILIZOPATIKANA",
    "STATUS": "HALI"
  });  Object.assign(translations, {
    "Total clubs": "Jumla ya vilabu",
    "Matches played": "Mechi zilizochezwa",
    "Goals scored": "Mabao yaliyofungwa",
    "Matches today": "Mechi za leo",
    "clubs": "vilabu",
    "current round": "raundi ya sasa",
    "Current leader": "Kiongozi wa sasa",
    "Top scorer": "Mfungaji bora",
    "Matches today": "Mechi za leo",
    "MOST ACTIVE RIGHT NOW": "INA KASI ZAIDI SASA",
    "Next big match": "Mechi kubwa inayofuata",
    "Saturday": "Jumamosi",
    "Full time": "Muda wote",
    "Today": "Leo",
    "following": "wanaofuatilia",
    "Showing every registered club": "Inaonyesha kila klabu iliyosajiliwa",
    "View competition": "Tazama mashindano",
    "Current league position": "Nafasi ya sasa kwenye ligi",
    "2026 / 2027 season": "msimu wa 2026 / 2027",
    "Home stadium": "Uwanja wa nyumbani",
    "Club colors": "Rangi za klabu",
    "Recent form": "Kiwango cha karibuni",
    "Quick numbers.": "Takwimu fupi.",
    "The season snapshot supporters check first.": "Taswira ya msimu ambayo mashabiki huangalia kwanza.",
    "Last five matches.": "Mechi tano zilizopita.",
    "Next match.": "Mechi inayofuata.",
    "The badge": "Nembo",
    "in context.": "katika muktadha.",
    "Performance data": "Takwimu za uchezaji",
    "Player profile": "Wasifu wa mchezaji",
    "The golden boot race": "Mbio za ufungaji",
    "The final pass": "Pasi ya mwisho",
    "The last line": "Mstari wa mwisho",
    "Matchday impact": "Mchango wa siku ya mechi",
    "Show all clubs": "Onyesha vilabu vyote",
    "Show featured positions": "Onyesha nafasi zilizoangaziwa",
    "Positions 5-12 are hidden - show all clubs to view the complete table.": "Nafasi 5-12 zimefichwa - onyesha vilabu vyote kutazama msimamo kamili.",
    "Full time": "Muda wote",
    "Performance": "Uchezaji",
    "Overview": "Muhtasari",
    "News": "Habari",
    "Clubs": "Vilabu",
    "Player": "Mchezaji",
    "Total": "Jumla",
    "Current round": "Raundi ya sasa",
    "All competitions": "Mashindano yote"
  });

  // Generated labels are not always complete dictionary keys. These entries
  // keep page-generated copy in Swahili as well as the static page text.
  Object.assign(translations, {
    "The game lives here.": "Mchezo unaishi hapa.", "Explore the story": "Gundua habari", "Watch the pulse": "Tazama msisimko", "Now playing": "Inayochezwa sasa",
    "Keep an eye on the fixtures, follow the form, and never miss the moment the game turns.": "Fuatilia ratiba, angalia kiwango cha timu na usikose muda ambao mchezo hubadilika.",
    "Unmissable goals, skills and pitchside celebrations.": "Mabao, ustadi na shangwe za pembeni mwa uwanja zisizokosekana.", "CURATED COLLECTION": "MKUSANYIKO ULIOCHAGULIWA", "CURATED GALLERY": "MATUKIO YALIYOCHAGULIWA",
    "Leadership, ambition and a clear route for the game to rise together.": "Uongozi, azma na njia wazi ya mchezo kuinuka pamoja.", "Tanzania football federation.": "Shirikisho la soka Tanzania.", "OFFICIAL TENURE": "MUDA RASMI",
    "Fan zone & interactive rewards.": "Eneo la mashabiki na tuzo shirikishi.", "Vote, test your knowledge, earn fan points and win VIP match tickets.": "Piga kura, pima ujuzi wako, pata pointi za shabiki na ushinde tiketi za mechi za VIP.", "MY FAN POINTS": "POINTI ZANGU ZA MSHABIKI", "PRO FAN": "MSHABIKI MZOEFU", "View rewards": "Tazama tuzo",
    "Who will take the 3 points today?": "Nani atachukua pointi 3 leo?", "Prediction:": "Utabiri:", "votes": "kura", "Ends in": "Inaisha baada ya", "Vote for this goal +100 PTS": "Piga kura kwa bao hili +100 POINTI",
    "League Titles": "Mataji ya Ligi", "Record Champion": "Bingwa mwenye rekodi", "Win +50 Points for the correct answer": "Shinda Pointi +50 kwa jibu sahihi", "Don't just watch.": "Usitazame tu.", "Stay close.": "Kaa karibu.", "Made in Tanzania.": "Imetengenezwa Tanzania.",
    "The flagship stage: big clubs, bigger nights and the race for Tanzania’s top prize.": "Jukwaa kuu: vilabu vikubwa, usiku mikubwa zaidi na mbio za tuzo kuu ya Tanzania.",
    "The proving ground where hungry clubs build momentum and chase promotion.": "Uwanja wa kujithibitisha ambapo vilabu vyenye kiu hujenga mwendo na kuwania kupanda daraja.",
    "Raw ambition, local pride and the next generation of Tanzanian football stories.": "Azma halisi, fahari ya eneo na kizazi kijacho cha habari za soka Tanzania.",
    "The women’s game moves forward with skill, speed and a new generation of leaders.": "Soka la wanawake linasonga mbele kwa ustadi, kasi na kizazi kipya cha viongozi.",
    "A new stretch of the season opens with renewed ambition, fresh pressure and plenty to prove.": "Sehemu mpya ya msimu inaanza ikiwa na azma mpya, presha mpya na mengi ya kuthibitisha.",
    "From the roar of the stands to the last touch in the box - step inside the football stories shaping Tanzania.": "Kutoka kishindo cha viwanjani hadi mguso wa mwisho kwenye eneo la hatari - ingia ndani ya habari za soka zinazoipa Tanzania sura.",
    "Select the best strike from Matchday 26:": "Chagua mkwaju bora wa Siku ya Mechi ya 26:",
    "How many NBC Premier League titles has Young Africans (Yanga SC) won in history?": "Young Africans (Yanga SC) wameshinda mataji mangapi ya NBC Premier League katika historia?",
    "THE SEASON IS ALIVE": "MSIMU UNAISHI", "One country. One rhythm.": "Nchi moja. Mdundo mmoja.", "ONE GAME. ONE FUTURE.": "MCHEZO MMOJA. MUSTAKABALI MMOJA.", "ONE GAME STRONGER": "MCHEZO MMOJA IMARA ZAIDI", "Board of Members.": "Bodi ya Wajumbe.", "View Secretariat": "Tazama Sekretarieti",
    "The leadership room exists to protect the credibility of the league, raise the standard of every club experience and keep Tanzania’s football story moving forward.": "Chumba cha uongozi kinalinda uaminifu wa ligi, kinaongeza kiwango cha uzoefu wa kila klabu na kinaendeleza habari ya soka Tanzania.",
    "The office is located on the 14th Floor of NSSF Mafao House in Ilala, Dar es Salaam.": "Ofisi iko Ghorofa ya 14 ya NSSF Mafao House, Ilala, Dar es Salaam.",    "Filter by competition": "Chuja kwa mashindano", "Read story": "Soma habari", "Load more stories": "Pakia habari zaidi", "Most read.": "Zilizosomwa zaidi.", "News now.": "Habari sasa.", "Match news.": "Habari za mechi.", "Transfers & club news.": "Usajili na habari za klabu.", "Player stories.": "Habari za wachezaji.", "Her game,": "Mchezo wake,", "her stage.": "jukwaa lake.", "Official updates.": "Taarifa rasmi.", "Stay close to the game.": "Kaa karibu na mchezo.",
    "Clubs directory.": "Orodha ya vilabu.", "Every badge. Every story.": "Kila nembo. Kila habari.", "Pick a badge. Go deeper.": "Chagua nembo. Jua zaidi.", "64 clubs indexed": "Vilabu 64 vimeorodheshwa", "Profiles connected": "Wasifu uliounganishwa", "64 BADGES ONE HOME": "NEMBO 64 NYUMBANI PAMOJA", "FIND YOUR CLUB": "PATA KLABU YAKO", "Explore competitions": "Gundua mashindano",
    "THE OFFICE / TANZANIA PREMIER LEAGUE BOARD": "OFISI / BODI YA LIGI KUU TANZANIA", "We are here to help.": "Tupo hapa kusaidia.", "Visit the league office": "Tembelea ofisi ya ligi", "Start a conversation.": "Anza mazungumzo.", "Find us in Ilala.": "Tupate Ilala.", "Come to the league office.": "Njoo kwenye ofisi ya ligi.", "Choose your desk.": "Chagua dawati lako.", "Frequently asked questions.": "Maswali yanayoulizwa mara kwa mara.", "View All FAQs": "Tazama Maswali Yote",
    "Play now": "Cheza sasa", "See the leaderboard": "Tazama orodha ya wanaoongoza", "Read the game.": "Soma mchezo.", "Call the moment.": "Tabiri tukio.", "Make your call before kickoff.": "Toa utabiri wako kabla ya kuanza kwa mechi.", "One prediction per match.": "Utabiri mmoja kwa kila mechi.", "Status:": "Hali:", "Your scorecard": "Kadi yako ya alama", "Ten challenges.": "Changamoto kumi.", "Fifty questions.": "Maswali hamsini.", "5 questions per quiz": "Maswali 5 kwa kila chemsha bongo", "Start daily challenge": "Anza changamoto ya kila siku", "Today completed": "Leo imekamilika", "Submit daily challenge": "Wasilisha changamoto ya kila siku",
    "Your calls,": "Utabiri wako,", "your record.": "rekodi yako.", "The race for": "Mbio za", "bragging rights.": "haki ya kujivunia.", "Add your next prediction": "Ongeza utabiri wako unaofuata", "View my full record": "Tazama rekodi yangu kamili", "Unsubscribe this device": "Jiondoe kwenye kifaa hiki", "Searching the notebook...": "Inatafuta kwenye daftari la habari...", "Join the club": "Jiunge na klabu", "You are on the list": "Uko kwenye orodha",
    "Welcome to the clubhouse. Check your inbox for the first whistle.": "Karibu kwenye uwanja wa klabu. Angalia kikasha chako kwa habari ya kwanza.", "Subscription saved on this device. You can unsubscribe from the clubhouse email.": "Usajili umehifadhiwa kwenye kifaa hiki. Unaweza kujiondoa kwenye barua pepe za uwanja wa klabu.", "Subscription removed from this device.": "Usajili umeondolewa kwenye kifaa hiki."
  });


  Object.assign(translations, {
    "Story - Tanzania Major League": "Habari - Ligi Kuu Tanzania",
    "Tanzania Major League - Tanzania Football, in full colour": "Ligi Kuu Tanzania - Soka la Tanzania, kwa rangi kamili",
    "TANZANIA MAJOR LEAGUE": "LIGI KUU TANZANIA",
    "MAJOR LEAGUE": "LIGI KUU",
    "Made in Tanzania.": "Imetengenezwa Tanzania.",
    "Don't just watch. Stay close.": "Usitazame tu. Endelea kuwa karibu.",
    "THE NEW SEASON": "MSIMU MPYA",
    "2026 / 27 - THE SEASON IS ALIVE": "2026 / 27 - MSIMU UNAENDELEA",
    "Wear the colour.": "Vaa rangi hii.",
    "A new season, in full colour.": "Msimu mpya, kwa rangi kamili.",
    "Explore the story": "Gundua habari",
    "Watch the pulse": "Tazama msisimko",
    "Now playing": "Inachezwa sasa",
    "FEATURED STORY": "HABARI ILIYOANGAZIWA",
    "The shirt that starts a new chapter": "Jezi inayoanza sura mpya",
    "Portraits - Tanzania": "Picha - Tanzania",
    "Scroll to explore": "Shuka kuchunguza",
    "Stories with weight.": "Habari zenye uzito.",
    "One country.": "Nchi moja.",
    "One rhythm.": "Mdundo mmoja.",
    "Keep an eye on the fixtures, follow the form, and never miss the moment the game turns.": "Fuatilia ratiba na kiwango, usikose wakati mchezo unapobadilika.",
    "COUNTDOWN TO KICKOFF": "HESABU KURUDI HADI MWANZO",
    "Unmissable goals, skills and pitchside celebrations.": "Mabao, ustadi na shangwe za pembeni mwa uwanja zisizokosekana.",
    "CURATED COLLECTION": "MKUSANYO ULIOCHAGULIWA",
    "CURATED GALLERY": "MATUKIO YALIYOCHAGULIWA",
    "THE MOMENT": "TUKIO",
    "THE FINISHER": "MFUNGAJI",
    "THE ENGINE": "NGUVU YA TIMU",
    "THE WALL": "UKUTA",
    "THE TOUCH": "MGUSO",
    "THE GAME NEVER STANDS STILL": "Mchezo hausimami kamwe",
    "05 MOMENTS": "MATUKIO 05",
    "Moment replay.": "Rudia tukio.",
    "Competitions": "Mashindano",
    "Competition": "Mashindano",
    "All competitions": "Mashindano yote",
    "NBC Premier League": "NBC Ligi Kuu",
    "NBC Championship": "NBC Championship",
    "NBC Championship League": "NBC Championship",
    "First League": "Ligi ya Kwanza",
    "Women's Premier League": "Ligi Kuu ya Wanawake",
    "Womenâ€™s Premier League": "Ligi Kuu ya Wanawake",
    "Ligi Kuu": "Ligi Kuu",
    "Search the notebook": "Tafuta kwenye daftari la habari",
    "Search the clubhouse": "Tafuta kwenye uwanja wa klabu",
    "Search the directory": "Tafuta kwenye orodha",
    "Search the league": "Tafuta kwenye ligi",
    "Search clubs": "Tafuta vilabu",
    "Find a club fast.": "Pata klabu haraka.",
    "Find the next story.": "Pata habari inayofuata.",
    "Find your next story.": "Pata habari yako inayofuata.",
    "Every badge. Every story.": "Kila nembo. Kila habari.",
    "Pick a badge. Go deeper.": "Chagua nembo. Chunguza zaidi.",
    "Explore competitions": "Gundua mashindano",
    "Profiles connected": "Wasifu umeunganishwa",
    "64 BADGES ONE HOME": "NEMBO 64 NYUMBA MOJA",
    "Get in touch.": "Wasiliana nasi.",
    "Have a question, enquiry or need assistance? Our team is here to help.": "Una swali, ombi au unahitaji msaada? Timu yetu iko hapa kukusaidia.",
    "Board of Members": "Bodi ya Wajumbe",
    "View Secretariat": "Tazama Sekretarieti",
    "View rewards": "Tazama tuzo",
    "Open full prediction": "Fungua utabiri kamili",
    "Change": "Badilisha",
    "Select the best strike from Matchday 26:": "Chagua mkwaju bora wa Siku ya Mechi 26:",
    "Vote for this goal": "Pigia kura bao hili",
    "Open the Prediction page to play this quiz": "Fungua ukurasa wa Utabiri kucheza chemsha bongo hii",
    "Contact office": "Wasiliana na ofisi",
    "Official desk": "Dawati rasmi",
    "Visit the office": "Tembelea ofisi",
    "Back to top": "Rudi juu",
    "The home of Tanzania football": "Nyumbani kwa soka la Tanzania",
    "Football from Tanzania,": "Soka kutoka Tanzania,",
    "with the volume up.": "kwa sauti ya juu.",
    "No noise. Just football. Unsubscribe whenever.": "Hakuna kelele. Soka tu. Jiondoe wakati wowote.",
    "Made in Tanzania": "Imetengenezwa Tanzania",
    "Switch to": "Badilisha kwenda",
    "selected": "imechaguliwa",
    "Show story": "Onyesha habari",
    "Show news story": "Onyesha habari ya habari",
    "Read more:": "Soma zaidi:",
    "Close moment video": "Funga video ya tukio",
    "Sound on for the full matchday feel": "Washa sauti upate hisia kamili za siku ya mechi"
  });
  // Page titles, generated status messages and small labels are also routed
  // through the shared translator so the choice works across every page.
  Object.assign(translations, {
    "Tanzania Major League - Tanzania Football, in full colour": "Tanzania Major League - Soka la Tanzania, kwa rangi kamili",
    "Latest Football News - Tanzania Major League": "Habari za Hivi Karibuni za Soka - Tanzania Major League",
    "Competitions - Tanzania Major League": "Mashindano - Tanzania Major League",
    "Clubs - Tanzania Major League": "Vilabu - Tanzania Major League",
    "Club Profile - Tanzania Major League": "Wasifu wa Klabu - Tanzania Major League",
    "Leadership - Tanzania Major League": "Uongozi - Tanzania Major League",
    "League - Tanzania Major League": "Ligi - Tanzania Major League",
    "Prediction - Tanzania Major League": "Utabiri - Tanzania Major League",
    "Contact - Tanzania Major League": "Mawasiliano - Tanzania Major League",
    "Story - Tanzania Major League": "Habari - Tanzania Major League",
    "Join the club": "Jiunge na klabu",
    "Latest Football": "Soka la Hivi Karibuni",
    "Latest competition": "Mashindano ya hivi karibuni",
    "Latest news": "Habari za hivi karibuni",
    "Contact desk": "Dawati la mawasiliano",
    "Email the board": "Tuma barua pepe kwa bodi",
    "Email the board at": "Tuma barua pepe kwa bodi kupitia",
    "Find a club": "Pata klabu",
    "Find your next": "Pata inayofuata",
    "Find the": "Pata",
    "Find a quick answer or send the office a message if you need more help.": "Pata jibu la haraka au tuma ujumbe kwa ofisi ikiwa unahitaji msaada zaidi.",
    "Choose a side": "Chagua upande",
    "Choose an answer to continue.": "Chagua jibu ili kuendelea.",
    "Choose Home Win, Draw or Away Win. Your selection is saved immediately and can only change before the deadline.": "Chagua ushindi wa nyumbani, sare au ushindi wa ugenini. Chaguo lako huhifadhiwa mara moja na linaweza kubadilishwa kabla ya muda kuisha.",
    "Awaiting the official final result.": "Inasubiri matokeo rasmi ya mwisho.",
    "It is locked at kickoff and will be settled from the official final result.": "Utabiri hufungwa wakati wa kuanza na kuthibitishwa kwa matokeo rasmi ya mwisho.",
    "Complete today's challenge to begin": "Kamilisha changamoto ya leo ili kuanza",
    "Complete today's five-question challenge. The same scoring applies: 5/5 earns 3 points, 4/5 earns 2, 3/5 earns 1, and 0–2 earns 0.": "Kamilisha changamoto ya leo yenye maswali matano. Mfumo wa alama ni huu: 5/5 hupata pointi 3, 4/5 hupata 2, 3/5 hupata 1, na 0–2 hupata 0.",
    "Answers are saved as you go. No quiz points are awarded until you submit all five answers.": "Majibu huhifadhiwa unapoendelea. Hakuna pointi za chemsha bongo zinazotolewa hadi uwasilishe majibu yote matano.",
    "One prediction per match. The official result settles your point after full time.": "Utabiri mmoja kwa kila mechi. Matokeo rasmi yanaamua pointi yako baada ya muda wote wa mchezo.",
    "One sharp home for the stories, voices and matchday details moving Tanzanian football across all four competitions.": "Mahali pamoja bora kwa habari, sauti na maelezo ya siku ya mechi yanayosogeza soka la Tanzania katika mashindano yote manne.",
    "Every card opens a full club profile with its league table, fixtures, player numbers, team metrics and history.": "Kila kadi inafungua wasifu kamili wa klabu wenye msimamo wa ligi, ratiba, takwimu za wachezaji, vipimo vya timu na historia.",
    "Explore clubs from Tanzania's top football competitions. Find every badge, home ground, league position and the story behind the squad.": "Gundua vilabu kutoka mashindano makubwa ya soka Tanzania. Pata kila nembo, uwanja wa nyumbani, nafasi ya ligi na historia ya kikosi.",
    "Keep showing up. Every prediction, vote and quiz answer moves you closer to VIP matchday access.": "Endelea kushiriki. Kila utabiri, kura na jibu la chemsha bongo linakusogeza karibu na fursa ya VIP ya siku ya mechi.",
    "Live rankings require a connected fan account.": "Orodha hai inahitaji akaunti ya shabiki iliyounganishwa.",
    "Load more stories": "Pakia habari zaidi",
    "Make your call before kickoff. Your answers lock at the deadline, and fan voting percentages appear only after you submit.": "Toa chaguo lako kabla ya kuanza kwa mechi. Majibu yako hufungwa muda wa mwisho, na asilimia za kura za mashabiki huonekana baada ya kuwasilisha.",
    "Select Fixtures & Results in the message form and include the match details so the office can route the enquiry.": "Chagua Ratiba na Matokeo kwenye fomu ya ujumbe na uweke maelezo ya mechi ili ofisi ipeleke ombi lako kwenye dawati sahihi.",
    "Select Media & Press or email the board with your publication and request details.": "Chagua Vyombo vya Habari na Waandishi au tuma barua pepe kwa bodi ukiweka maelezo ya chapisho na ombi lako.",
    "Settled prediction results will appear here after official results are confirmed.": "Matokeo ya utabiri yaliyothibitishwa yataonekana hapa baada ya matokeo rasmi kuthibitishwa.",
    "Sponsorship, partnership and football development enquiries.": "Maombi kuhusu udhamini, ushirikiano na maendeleo ya soka.",
    "Tell us how we can help and the league office will route your message to the right desk.": "Tuambie tunavyoweza kukusaidia na ofisi ya ligi itapeleka ujumbe wako kwenye dawati sahihi.",
    "The executive office and operational departments that turn league strategy into a professional matchday experience.": "Ofisi ya utendaji na idara zinazogeuza mkakati wa ligi kuwa uzoefu wa kitaalamu wa siku ya mechi.",
    "The finishers turning chances into momentum across Tanzania's four competitions.": "Wafungaji wanaogeuza nafasi kuwa msukumo katika mashindano manne ya Tanzania.",
    "The people entrusted with the league's direction, standards and long-term growth.": "Watu waliokabidhiwa mwelekeo, viwango na ukuaji wa muda mrefu wa ligi.",
    "The players shaping this league, from the golden boot race to the clean-sheet battle. Switch the category and stay close to the numbers.": "Wachezaji wanaoipa ligi sura, kutoka mbio za ufungaji hadi ushindani wa kutofungwa. Badilisha kundi na fuatilia takwimu.",
    "The Women's Premier League deserves its own front row. Follow the players, clubs and moments building the next chapter.": "Ligi Kuu ya Wanawake inastahili nafasi yake ya mbele. Fuatilia wachezaji, vilabu na matukio yanayojenga sura inayofuata.",
    "Your answers persist on this device. A connected account and server database are required for cross-device leaderboard sync.": "Majibu yako yanahifadhiwa kwenye kifaa hiki. Akaunti iliyounganishwa na hifadhidata ya seva vinahitajika kusawazisha orodha ya mashabiki kwenye vifaa mbalimbali.",
    "Your saved match predictions will appear here.": "Utabiri wako wa mechi uliouhifadhi utaonekana hapa.",
    "Your live ranking should come from registered fan accounts and settled point transactions.": "Nafasi yako hai inapaswa kutoka kwenye akaunti za mashabiki waliosajiliwa na miamala ya pointi iliyothibitishwa.",
    "Who will take the 3 points today?": "Nani atachukua pointi 3 leo?",
    "Vote, test your knowledge, earn fan points and win VIP match tickets.": "Piga kura, pima maarifa yako, pata pointi za shabiki na ushinde tiketi za mechi za VIP.",
    "View All FAQs": "Tazama Maswali Yote Yanayoulizwa Mara kwa Mara",
    "View all matches": "Tazama mechi zote",
    "View full table": "Tazama msimamo kamili",
    "View leaderboard": "Tazama orodha ya wanaoongoza",
    "View my full record": "Tazama rekodi yangu kamili",
    "View the league office": "Tazama ofisi ya ligi",
    "Visit the league office": "Tembelea ofisi ya ligi",
    "Your calls,": "Chaguo zako,",
    "your record.": "rekodi yako.",
    "YOUR SCORECARD": "ALAMA ZAKO",
    "Status: Awaiting Result": "Hali: Inasubiri Matokeo",
    "Refresh-safe save": "Hifadhi salama baada ya kusasisha",
    "One hot streak.": "Mfululizo mmoja wa ushindi.",
    "Read the game.": "Soma mchezo.",
    "Call the moment.": "Amua tukio.",
    "Ten challenges.": "Changamoto kumi.",
    "Fifty questions.": "Maswali hamsini.",
    "Tanzania football": "Soka la Tanzania",
    "Tanzania Football Federation (TFF)": "Shirikisho la Mpira wa Miguu Tanzania (TFF)",
    "with a pulse.": "wenye msisimko.",
    "with purpose.": "wenye dhamira.",
    "weight.": "uzito.",
    "Stories with": "Habari zenye",
    "Share the": "Shiriki",
    "Stay close to": "Kaa karibu na",
    "Wear the": "Vaa",
    "Unsubscribe this device": "Jiondoe kwenye kifaa hiki",
    "Play now": "Cheza sasa",
    "Start daily challenge": "Anza changamoto ya kila siku",
    "Submit Quiz?": "Wasilisha Chemsha Bongo?",
    "Select the best strike from Matchday 26:": "Chagua mkwaju bora wa Siku ya Mechi ya 26:"
  });  Object.assign(translations, {
    "Tanzania Major League": "Tanzania Major League",
    "Tanzania Premier League": "Ligi Kuu ya Tanzania",
    "Tanzania Premier": "Ligi Kuu ya Tanzania",
    "Premier League": "Ligi Kuu",
    "Championship League": "Ligi ya Ubingwa",
    "NBC Premier": "NBC Ligi Kuu",
    "© 2026 Tanzania Major League. Made in Tanzania.": "© 2026 Tanzania Major League. Imetengenezwa Tanzania.",
    "We are here to": "Tupo hapa kwa",
    "Reach the Tanzania Premier League Board for official correspondence, competition support and league enquiries.": "Wasiliana na Bodi ya Ligi Kuu Tanzania kwa mawasiliano rasmi, msaada wa mashindano na maombi ya ligi.",
    "Frequently asked": "Maswali yanayoulizwa mara kwa mara",
    "questions.": "yanayoulizwa mara kwa mara.",
    "message form above.": "fomu ya ujumbe hapo juu.",
    "Back to top ?": "Rudi juu",
    "View all matches ?": "Tazama mechi zote",
    "View full table ?": "Tazama msimamo kamili",
    "Continue to next quiz ?": "Endelea na chemsha bongo inayofuata",
    "Open full prediction ?": "Fungua utabiri kamili",
    "P.O. Box 79043": "P.O. Box 79043",
    "Clubs can use the official league email and select Clubs or Competition Information in the enquiry type.": "Vilabu vinaweza kutumia barua pepe rasmi ya ligi na kuchagua Vilabu au Taarifa za Mashindano kwenye aina ya ombi.",
    "Competition information, fixtures, results and league matters.": "Taarifa za mashindano, ratiba, matokeo na masuala ya ligi.",
    "Follow one league or play every challenge.": "Fuatilia ligi moja au cheza kila changamoto.",
    "One prediction per match. The official result settles your point after full time.": "Utabiri mmoja kwa kila mechi. Matokeo rasmi yanaamua pointi yako baada ya muda wote wa mchezo.",
    "One standard.": "Kiwango kimoja.",
    "One badge.": "Nembo moja.",
    "Every badge.": "Kila nembo.",
    "Every story.": "Kila habari.",
    "Every card opens a full club profile with its league table, fixtures, player numbers, team metrics and history.": "Kila kadi inafungua wasifu kamili wa klabu wenye msimamo wa ligi, ratiba, takwimu za wachezaji, vipimo vya timu na historia.",
    "Points. Ranks. Bragging rights.": "Pointi. Nafasi. Haki ya kujivunia.",
    "Search by club name, city or home stadium to find the profile you are after.": "Tafuta kwa jina la klabu, jiji au uwanja wa nyumbani ili kupata wasifu unaoutafuta.",
    "Select an enquiry type": "Chagua aina ya ombi",
    "Select Fixtures & Results": "Chagua Ratiba na Matokeo",
    "View All FAQs": "Tazama Maswali Yote Yanayoulizwa Mara kwa Mara",
    "View leaderboard": "Tazama orodha ya wanaoongoza",
    "View my full record": "Tazama rekodi yangu kamili",
    "Visit the league office": "Tembelea ofisi ya ligi",
    "Vote for this goal": "Piga kura kwa bao hili",
    "Play-off": "Mchujo",
    "Level 4": "Kiwango 4",
    "Updates": "Masasisho",
    "updates.": "masasisho.",
    "Now playing": "Inachezwa sasa",
    "Live fan ranking": "Orodha hai ya mashabiki",
    "Not ranked": "Bila nafasi",
    "Most read.": "Zilizosomwa zaidi.",
    "Recent calls": "Chaguo za hivi karibuni",
    "Your answers persist on this device. A connected account and server database are required for cross-device leaderboard sync.": "Majibu yako yanahifadhiwa kwenye kifaa hiki. Akaunti iliyounganishwa na hifadhidata ya seva vinahitajika kusawazisha orodha ya mashabiki kwenye vifaa mbalimbali."
  });  Object.assign(translations, {
    "Tanzania Major League home": "Nyumbani Tanzania Major League",
    "Tanzania Premier League Board contact office": "Ofisi ya mawasiliano ya Bodi ya Ligi Kuu Tanzania",
    "Stylized map showing the Tanzania Premier League Board office in Ilala, Dar es Salaam": "Ramani inayoonyesha ofisi ya Bodi ya Ligi Kuu Tanzania huko Ilala, Dar es Salaam",
    "Premier League Board.": "Bodi ya Ligi Kuu.",
    "Official league office": "Ofisi rasmi ya ligi",
    "Come to the": "Njoo kwenye",
    "league office.": "ofisi ya ligi.",
    "Our office is located on the 14th Floor of NSSF Mafao House in Ilala, Dar es Salaam.": "Ofisi yetu iko Ghorofa ya 14 ya NSSF Mafao House huko Ilala, Dar es Salaam.",
    "or use the message form above.": "au tumia fomu ya ujumbe hapo juu.",
    "Frequently asked": "Maswali"
  });  Object.assign(translations, {
    "Find us in": "Pata katika",
    "NSSF Mafao House, Plot No. 40, Block Y, Ilala, Dar es Salaam.": "NSSF Mafao House, Kiwanja Na. 40, Kitalu Y, Ilala, Dar es Salaam."
  });  Object.assign(translations, {
    "Tanzania Major League - news, stories and the rhythm of Tanzanian football.": "Tanzania Major League - habari, simulizi na mdundo wa soka la Tanzania.",
    "Explore Tanzania football competitions, fixtures, results, tables, top scorers and latest news.": "Gundua mashindano ya soka Tanzania, ratiba, matokeo, misimamo, wafungaji bora na habari za hivi karibuni.",
    "Meet the Board of Members and Secretariat guiding Tanzania football competitions.": "Kutana na Bodi ya Wajumbe na Sekretarieti inayoongoza mashindano ya soka Tanzania.",
    "League overview, fixtures, results, table, clubs, scorers and news from Tanzania Major League.": "Muhtasari wa ligi, ratiba, matokeo, msimamo, vilabu, wafungaji na habari kutoka Tanzania Major League.",
    "Latest football news from Tanzania Major League.": "Habari za hivi karibuni za soka kutoka Tanzania Major League.",
    "Prediction games, football quizzes and fan rewards for Tanzania football supporters.": "Michezo ya utabiri, chemsha bongo za soka na tuzo za mashabiki wa soka la Tanzania.",
    "Tanzania Major League football story.": "Habari ya soka ya Tanzania Major League.",
    "Contact the Tanzania Premier League Board for official enquiries, competition support and office correspondence in Dar es Salaam.": "Wasiliana na Bodi ya Ligi Kuu Tanzania kwa maombi rasmi, msaada wa mashindano na mawasiliano ya ofisi Dar es Salaam."
  });  const wordTranslations = {
    live: 'moja kwa moja', alive: 'hai', box: 'eneo la hatari', portrait: 'picha', portraits: 'picha', fire: 'moto', returns: 'inarejea', future: 'mustakabali', digital: 'dijitali', secretariat: 'sekretarieti', stronger: 'imara zaidi', credibility: 'uaminifu', raise: 'ongeza', experience: 'uzoefu', many: 'mangapi', title: 'taji', titles: 'mataji', strike: 'mkwaju', matchday: 'siku ya mechi', best: 'bora', trivia: 'maswali ya maarifa', rewards: 'tuzo', reward: 'tuzo', matchweek: 'wiki ya mechi', country: 'nchi', ways: 'njia', rhythm: 'mdundo', shaping: 'zinazoipa sura', pressure: 'presha', prove: 'kuthibitisha', noise: 'kelele', sharp: 'bora', email: 'barua pepe', voices: 'sauti', moving: 'zinazosonga', forward: 'mbele', finishers: 'wafungaji', turning: 'zinazogeuza', chances: 'nafasi', momentum: 'msukumo', proving: 'kujithibitisha', hungry: 'zenye kiu', build: 'jenga', chase: 'wania', promotion: 'kupanda daraja', raw: 'halisi', ambition: 'azma', local: 'ya eneo', pride: 'fahari', generation: 'kizazi', skill: 'ustadi', speed: 'kasi', standard: 'kiwango', ranks: 'nafasi', rights: 'haki', money: 'pesa', it: 'hilo', unranked: 'bila nafasi', refresh: 'kuonyesha upya', safe: 'salama', earned: 'zilizopatikana', knowledge: 'maarifa', left: 'iliyobaki',
    from: 'kutoka', football: 'soka', news: 'habari', without: 'bila', filter: 'chujio', official: 'rasmi', match: 'mechi', matches: 'mechi', day: 'siku', days: 'siku', week: 'wiki', weeks: 'wiki', month: 'mwezi', months: 'miezi', story: 'habari', stories: 'habari', latest: 'za hivi karibuni', fresh: 'mpya', home: 'nyumbani', away: 'ugenini', club: 'klabu', clubs: 'vilabu', player: 'mchezaji', players: 'wachezaji', team: 'timu', teams: 'timu', league: 'ligi', leagues: 'ligi', competition: 'mashindano', competitions: 'mashindano', table: 'msimamo', tables: 'misimamo', fixtures: 'ratiba', fixture: 'ratiba', results: 'matokeo', result: 'matokeo', season: 'msimu', current: 'sasa', upcoming: 'zijazo', completed: 'zilizokamilika', read: 'soma', more: 'zaidi', view: 'tazama', all: 'yote', select: 'chagua', search: 'tafuta', sort: 'panga', by: 'kwa', position: 'nafasi', positions: 'nafasi', founded: 'ilianzishwa', city: 'jiji', stadium: 'uwanja', coach: 'kocha', colors: 'rangi', recent: 'za karibuni', form: 'kiwango', quick: 'fupi', numbers: 'takwimu', performance: 'utendaji', data: 'takwimu', profile: 'wasifu', history: 'historia', overview: 'muhtasari', stats: 'takwimu', goals: 'mabao', goal: 'bao', assists: 'pasi za mabao', points: 'pointi', point: 'pointi', rank: 'nafasi', ranked: 'walioorodheshwa', top: 'bora', scorer: 'mfungaji', scorers: 'wafungaji', leader: 'kiongozi', leaders: 'vinara', today: 'leo', saturday: 'Jumamosi', sunday: 'Jumapili', monday: 'Jumatatu', tuesday: 'Jumanne', wednesday: 'Jumatano', thursday: 'Alhamisi', friday: 'Ijumaa', minutes: 'dakika', minute: 'dakika', seconds: 'sekunde', second: 'sekunde', hours: 'masaa', hour: 'saa', mins: 'dak', min: 'dak', hrs: 'masaa', hr: 'saa', secs: 'sek', sec: 'sek', next: 'inayofuata', previous: 'iliyotangulia', open: 'fungua', close: 'funga', start: 'anza', continue: 'endelea', submit: 'wasilisha', answer: 'jibu', answers: 'majibu', question: 'swali', questions: 'maswali', correct: 'sahihi', incorrect: 'si sahihi', missed: 'limekosa jibu', saved: 'imehifadhiwa', save: 'hifadhi', locked: 'imefungwa', lock: 'funga', pending: 'inasubiri', awaiting: 'inasubiri', choose: 'chagua', choice: 'chaguo', change: 'badilisha', prediction: 'utabiri', predictions: 'utabiri', quiz: 'chemsha bongo', challenge: 'changamoto', challenges: 'changamoto', daily: 'kila siku', fan: 'shabiki', fans: 'mashabiki', ranking: 'orodha', leaderboard: 'orodha ya wanaoongoza', total: 'jumla', local: 'ya hapa', account: 'akaunti', level: 'kiwango', following: 'wanaofuatilia', show: 'onyesha', showing: 'inaonyesha', name: 'jina', email: 'barua pepe', phone: 'simu', number: 'namba', subject: 'mada', message: 'ujumbe', contact: 'mawasiliano', office: 'ofisi', help: 'msaada', information: 'taarifa', support: 'msaada', general: 'jumla', type: 'aina', other: 'nyingine', regulations: 'kanuni', resources: 'rasilimali', tickets: 'tiketi', system: 'mfumo', management: 'usimamizi', round: 'raundi', rounds: 'raundi', full: 'kamili', time: 'muda', status: 'hali',
    the: '', a: '', an: '', "don't": '', "you're": 'upo', "you’re": 'upo', "today's": 'ya leo', "today’s": 'ya leo', "women's": 'ya wanawake', "women’s": 'ya wanawake', never: 'kamwe', miss: 'kosa', moment: 'tukio', turns: 'hubadilika', just: 'tu', one: 'moja', two: 'mbili', three: 'tatu', four: 'nne', five: 'tano', six: 'sita', ten: 'kumi', and: 'na', with: 'na', for: 'kwa', to: 'kwa', in: 'katika', on: 'kwenye', of: 'ya', is: 'ni', are: 'ni', your: 'yako', my: 'yangu', our: 'yetu', this: 'hii', that: 'hiyo', every: 'kila', each: 'kila', no: 'hakuna', or: 'au', as: 'kama', at: 'kwenye', before: 'kabla ya', after: 'baada ya', big: 'kubwa', bigger: 'kubwa zaidi', new: 'mpya', strong: 'imara', most: 'zaidi', behind: 'nyuma ya', inside: 'ndani ya', across: 'katika', where: 'wapi', how: 'vipi', what: 'nini', which: 'ipi', who: 'nani', will: 'ita', can: 'inaweza', have: 'una', has: 'ime', need: 'hitaji', find: 'pata', keep: 'endelea', follow: 'fuatilia', make: 'fanya', take: 'chukua', earn: 'pata', win: 'shinda', play: 'cheza', watch: 'tazama', share: 'shiriki', copy: 'nakili', link: 'kiungo', back: 'rudi', visit: 'tembelea', welcome: 'karibu', please: 'tafadhali', enter: 'weka', valid: 'sahihi', field: 'sehemu', required: 'inahitajika', error: 'hitilafu', people: 'watu', leadership: 'uongozi', board: 'bodi', member: 'mjumbe', members: 'wajumbe', executive: 'utendaji', department: 'idara', president: 'rais', chairperson: 'mwenyekiti', vice: 'makamu', chief: 'mkuu', officer: 'afisa', acting: 'kaimu', secretary: 'katibu', representative: 'mwakilishi', appointed: 'aliyeteuliwa', list: 'orodha', badges: 'nembo', badge: 'nembo', indexed: 'vimeorodheshwa', shown: 'imeonyeshwa', explore: 'gundua', stage: 'jukwaa', game: 'mchezo', games: 'michezo', lives: 'unaishi', here: 'hapa', picture: 'taswira', front: 'mbele', page: 'ukurasa', pulse: 'msisimko', roar: 'kishindo', stands: 'viwanjani', last: 'mwisho', touch: 'mguso', step: 'hatua', volume: 'sauti', draw: 'sare', loss: 'kipigo', losses: 'vipigo', shots: 'mikwaju', corners: 'kona', fouls: 'makosa', yellow: 'njano', red: 'nyekundu', cards: 'kadi', rating: 'alama', age: 'umri', made: 'imetengenezwa'
  };
  Object.assign(wordTranslations, {
    wear: "vaa", colour: "rangi", rise: "inuka", built: "jengwa", build: "jenga", mark: "alama", become: "kuwa", becomes: "inakuwa", plans: "mipango", new: "mpya", season: "msimu", colour: "rangi", moment: "tukio", moments: "matukio", big: "kubwa", picture: "taswira", touchline: "pembeni mwa uwanja", player: "mchezaji", file: "jalada", engine: "nguvu", wall: "ukuta", finisher: "mfungaji", featured: "iliyoangaziwa", curated: "iliyochaguliwa", collection: "mkusanyo", gallery: "ghala", pitchside: "pembeni mwa uwanja", celebrations: "shangwe", skills: "ustadi", colour: "rangi", major: "kuu", first: "kwanza", championship: "mashindano ya ubingwa", premier: "kuu", clubhouse: "uwanja wa klabu", notebook: "daftari la habari", desk: "dawati", official: "rasmi", resources: "rasilimali", regulations: "kanuni", pdf: "PDF", address: "anwani", phone: "simu", send: "tuma", enquiry: "ombi", enquiries: "maombi", press: "waandishi", media: "vyombo vya habari", sponsorship: "udhamini", partnership: "ushirikiano", partnerships: "ushirikiano", governance: "utawala", directory: "orodha", details: "maelezo", chapter: "sura", finish: "umaliziaji", winner: "mshindi", winners: "washindi", score: "alama", scoring: "ufungaji", awards: "tuzo", award: "tuzo", vote: "piga kura", appear: "onekana", available: "inapatikana", loading: "inapakia", final: "mwisho", complete: "kamilika", answered: "yamejibiwa", immediately: "mara moja", deadline: "muda wa mwisho", connected: "umeunganishwa", located: "iko", return: "rejea", record: "rekodi", shared: "imeshirikiwa", meet: "kutana", together: "pamoja", still: "bado", professional: "kitaalamu", only: "tu", long: "ndefu", clear: "wazi", call: "ita", scroll: "shuka", now: "sasa", stay: "kaa", whenever: "wakati wowote", today: "leo", tomorrow: "kesho", october: "Oktoba", november: "Novemba", december: "Desemba", january: "Januari", february: "Februari", march: "Machi", april: "Aprili", may: "Mei", june: "Juni", july: "Julai", august: "Agosti", september: "Septemba", "don't": "usi", you: "wewe", know: "jua", what: "nini", use: "tumia", get: "pata", per: "kwa kila", into: "kuwa", own: "chake", her: "wake", its: "yake", together: "pamoja", available: "inapatikana"
  });
  Object.assign(wordTranslations, {
    "facts": "ukweli", "fact": "ukweli", "logo": "nembo", "logos": "nembo", "weight": "uzito", "shirt": "jezi", "shirts": "jezi", "starts": "inaanza", "start": "anza",
    "pause": "sitisha", "slideshow": "onyesho la slaidi", "rotation": "mzunguko", "closed": "imefungwa",
    "zone": "eneo", "interactive": "shirikishi", "council": "baraza", "confederation": "shirikisho",
    "east": "mashariki", "central": "kati", "africa": "Afrika", "operations": "uendeshaji",
    "committee": "kamati", "statement": "taarifa", "statements": "taarifa", "bring": "leta",
    "life": "maisha", "shine": "ng'ara", "place": "nafasi", "kicks": "anza", "kick": "mkwaju",
    "off": "rasmi", "fourth": "nne", "renewed": "iliyoboreshwa", "plenty": "mengi", "access": "ufikiaji",
    "moves": "inakusogeza", "move": "sogeza", "closer": "karibu", "up": "juu", "showing": "inaonyesha",
    "award": "tuzo", "awarded": "imetolewa", "interactive": "shirikishi", "rewards": "tuzo", "board": "bodi",
    "members": "wanachama", "positions": "nafasi", "listed": "zilizoorodheshwa", "pick": "chagua",
    "side": "upande", "sides": "pande", "outcome": "matokeo", "before": "kabla ya", "after": "baada ya",
    "deadline": "muda wa mwisho", "title": "taji", "titles": "mataji", "champion": "bingwa", "champions": "mabingwa",
    "record": "rekodi", "card": "kadi", "cards": "kadi", "opens": "inafungua", "opening": "ufunguzi",
    "metrics": "vipimo", "deserves": "inastahili", "row": "mstari", "come": "kuja", "conversation": "mazungumzo",
    "quickly": "haraka", "fast": "haraka", "deep": "kwa kina", "deeper": "kwa kina zaidi", "full": "kamili",
    "latest": "za hivi karibuni", "officially": "rasmi", "ready": "tayari", "persist": "hifadhi",
    "everywhere": "kila mahali", "countrywide": "nchini kote", "across": "katika", "against": "dhidi ya",
    "between": "kati ya", "through": "kupitia", "from": "kutoka", "towards": "kuelekea", "another": "nyingine",
    "yourself": "mwenyewe", "knowledge": "maarifa", "test": "pima", "finish": "kamilisha", "finished": "imekamilika",
    "calculate": "hesabu", "calculated": "imehesabiwa", "applies": "inatumika", "same": "sawa", "five": "tano",
    "four": "nne", "three": "tatu", "two": "mbili", "one": "moja", "zero": "sifuri", "maximum": "kiwango cha juu",
    "max": "kiwango cha juu", "earned": "zilizopatikana", "awarded": "imetolewa", "streak": "mfululizo",
    "per": "kwa kila", "quiz": "chemsha bongo", "quizzes": "chemsha bongo", "available": "inapatikana",
    "completed": "zilizokamilika", "unavailable": "haipatikani", "selected": "iliyochaguliwa", "selected": "iliyochaguliwa",
    "rotation": "mzunguko", "sections": "sehemu", "section": "sehemu", "centre": "kituo", "center": "kituo",
    "home": "nyumbani", "away": "ugenini", "versus": "dhidi ya", "versus": "dhidi ya", "winner": "mshindi",
    "loser": "mshindwa", "settled": "imethibitishwa", "settle": "thibitisha", "final": "mwisho", "result": "matokeo",
    "results": "matokeo", "wait": "subiri", "waiting": "inasubiri", "refresh": "onyesha upya", "load": "pakia",
    "loaded": "imepakiwa", "more": "zaidi", "less": "kidogo", "related": "zinazohusiana", "share": "shiriki",
    "claim": "dai", "points": "pointi", "point": "pointi", "vote": "piga kura", "voting": "kupiga kura",
    "percentages": "asilimia", "appear": "onekana", "appears": "inaonekana", "question": "swali", "questions": "maswali",
    "answer": "jibu", "answers": "majibu", "correct": "sahihi", "incorrect": "si sahihi", "missed": "limekosa jibu",
    "submit": "wasilisha", "submission": "uwasilishaji", "saved": "imehifadhiwa", "save": "hifadhi", "device": "kifaa",
    "database": "hifadhidata", "server": "seva", "account": "akaunti", "registered": "umesajiliwa", "users": "watumiaji",
    "multi-user": "watumiaji wengi", "sync": "sawazisha", "synchronization": "usawazishaji", "official": "rasmi",
    "organization": "shirika", "organisations": "mashirika", "federation": "shirikisho", "federations": "mashirikisho",
    "football": "soka", "league": "ligi", "leagues": "ligi", "premier": "kuu", "championship": "mashindano ya ubingwa"
  });
  Object.assign(wordTranslations, {
    host: "mwenyeji", african: "Afrika", votes: "kura", voted: "imepigiwa kura", points: "pointi", pts: "pt",
    awarded: "imetolewa", earned: "zilizopatikana", indexed: "vimeorodheshwa", badge: "nembo", badges: "nembo",
    club: "klabu", clubs: "vilabu", competition: "mashindano", competitions: "mashindano", featured: "iliyoangaziwa",
    every: "kila", card: "kadi", cards: "kadi", full: "kamili", account: "akaunti", accounts: "akaunti",
    require: "hitaji", requires: "inahitajia", required: "inahitajika", connected: "iliyounganishwa",
    server: "seva", database: "hifadhidata", cross: "kwenye", device: "kifaa", devices: "vifaa",
    sync: "sawazisha", leaderboard: "orodha ya wanaoongoza", access: "ufikiaji", vip: "VIP",
    call: "chaguo", calls: "machaguo", join: "jiunge", joined: "umejiunga", stay: "kaa", close: "karibu",
    latest: "za hivi karibuni", football: "soka", image: "picha", images: "picha", video: "video",
    sound: "sauti", feel: "hisia", right: "sahihi", route: "elekeza", publication: "chapisho", request: "ombi",
    requests: "maombi", details: "maelezo", include: "jumuisha", send: "tuma", message: "ujumbe",
    take: "chukua", point: "pointi", settled: "imethibitishwa", settlement: "uthibitisho", confirmed: "imethibitishwa",
    confirm: "thibitisha", appear: "onekana", appears: "inaonekana", result: "matokeo", results: "matokeo",
    status: "hali", awaiting: "inasubiri", official: "rasmi", final: "mwisho", locked: "imefungwa",
    kickoff: "kuanza kwa mechi", deadline: "muda wa mwisho", switch: "badilisha", switched: "imebadilishwa",
    category: "kundi", categories: "makundi", numbers: "takwimu", golden: "dhahabu", boot: "kiatu",
    clean: "bila", sheet: "kufungwa", battle: "ushindani", term: "muda", growth: "ukuaji",
    standards: "viwango", direction: "mwelekeo", long: "mrefu", entrusted: "waliokabidhiwa",
    departments: "idara", professional: "kitaalamu", experience: "uzoefu", strategy: "mkakati",
    finishers: "wafungaji", chances: "nafasi", momentum: "msukumo", moving: "zinazosonga",
    top: "bora", ground: "uwanja", behind: "nyuma ya", squad: "kikosi", generation: "kizazi",
    chapter: "sura", next: "inayofuata", previous: "iliyotangulia", question: "swali", questions: "maswali",
    quiz: "chemsha bongo", quizzes: "chemsha bongo", challenge: "changamoto", challenges: "changamoto",
    daily: "kila siku", start: "anza", submit: "wasilisha", play: "cheza", now: "sasa",
    available: "inapatikana", unavailable: "haipatikani", ready: "tayari", perfect: "bora kabisa",
    great: "vizuri", job: "kazi", good: "nzuri", run: "mwendo", missed: "limekosa jibu",
    answer: "jibu", answers: "majibu", correct: "sahihi", incorrect: "si sahihi", review: "kagua",
    all: "yote", show: "onyesha", load: "pakia", more: "zaidi", story: "habari", stories: "habari",
    read: "soma", related: "zinazohusiana", share: "shiriki", unranked: "bila nafasi", rank: "nafasi",
    ranked: "walioorodheshwa", leader: "kiongozi", leaders: "vinara", fan: "shabiki", fans: "mashabiki",
    money: "pesa", just: "tu", game: "mchezo", games: "michezo", match: "mechi", matches: "mechi",
    one: "moja", two: "mbili", three: "tatu", four: "nne", five: "tano", six: "sita", ten: "kumi",
    hot: "mkali", streak: "mfululizo", read: "soma", close: "karibu", wear: "vaa", unsubscribe: "jiondoe",
    field: "uwanja", player: "mchezaji", players: "wachezaji", team: "timu", teams: "timu", league: "ligi",
    leagues: "ligi", table: "msimamo", tables: "mismamo", fixture: "ratiba", fixtures: "ratiba",
    prediction: "utabiri", predictions: "utabiri", your: "yako", record: "rekodi", home: "nyumbani",
    away: "ugenini", win: "shinda", draw: "sare", loss: "kipigo", losses: "vipigo", winner: "mshindi",
    winners: "washindi", position: "nafasi", positions: "nafasi", performance: "utendaji",
    quick: "fupi", stats: "takwimu", history: "historia", founded: "ilianzishwa", city: "jiji",
    stadium: "uwanja", coach: "kocha", colors: "rangi", season: "msimu", current: "sasa",
    upcoming: "zijazo", completed: "zilizokamilika", yes: "ndiyo", no: "hapana", can: "inaweza",
    cannot: "haiwezi", before: "kabla ya", after: "baada ya", from: "kutoka", with: "na", without: "bila",
    under: "chini ya", into: "kwenye", toward: "kuelekea", through: "kupitia", against: "dhidi ya",
    between: "kati ya", about: "kuhusu", other: "nyingine", type: "aina", general: "jumla",
    media: "vyombo vya habari", press: "waandishi", sponsorship: "udhamini", partnership: "ushirikiano",
    partnerships: "ushirikiano", development: "maendeleo", enquiry: "ombi", enquiries: "maombi",
    information: "taarifa", support: "msaada", office: "ofisi", visit: "tembelea", league: "ligi",
    direct: "moja kwa moja", directly: "moja kwa moja", postal: "posta", correspondence: "mawasiliano",
    location: "mahali", located: "iko", floor: "ghorofa", plot: "kiwanja", block: "kitalu",
    left: "iliyobaki", duration: "muda", units: "vipimo", unit: "kipimo", minute: "dakika",
    minutes: "dakika", second: "sekunde", seconds: "sekunde", hour: "saa", hours: "masaa",
    next: "inayofuata", previous: "iliyotangulia", change: "badilisha", save: "hifadhi", saved: "imehifadhiwa",
    immediately: "mara moja", whenever: "wakati wowote", welcome: "karibu", check: "kagua", inbox: "kikasha",
    first: "kwanza", whistle: "filimbi", field: "uwanja", colour: "rangi", colours: "rangi"
  });  const translateWord = (word) => {
    const mapped = wordTranslations[word.toLowerCase()];
    if (mapped === undefined) return null;
    if (!mapped) return '';
    if (word === word.toUpperCase() && /[A-Z]/.test(word)) return mapped.toUpperCase();
    if (/^[A-ZÀ-Ý]/.test(word)) return mapped.charAt(0).toUpperCase() + mapped.slice(1);
    return mapped;
  };
  const translateByParts = (source) => {
    const parts = String(source).split(/([A-Za-zÀ-ÿ]+(?:['’][A-Za-zÀ-ÿ]+)?)/g);
    let changed = false;
    const result = parts.map((part) => {
      if (!/^[A-Za-zÀ-ÿ]+(?:['’][A-Za-zÀ-ÿ]+)?$/.test(part)) return part;
      const mapped = translateWord(part);
      if (mapped === null) return part;
      changed = true;
      return mapped;
    }).join('').replace(/\s{2,}/g, ' ').replace(/\s+([,.;!?])/g, '$1').trim();
    return changed && result ? result : null;
  };

  const attributeTranslations = {
    'Search': 'Tafuta', 'Open navigation': 'Fungua menyu', 'Close search': 'Funga utafutaji', 'Close moment video': 'Funga video ya tukio', 'Search players, clubs, stories...': 'Tafuta wachezaji, vilabu, habari...', 'Search clubs, players, stories...': 'Tafuta vilabu, wachezaji, habari...', 'Search clubs, competitions, news...': 'Tafuta vilabu, mashindano, habari...', 'Search leadership, clubs, stories...': 'Tafuta uongozi, vilabu, habari...', 'Your email address': 'Anwani yako ya barua pepe', 'Full Name': 'Jina Kamili', 'Email Address': 'Anwani ya Barua Pepe', 'Phone Number': 'Namba ya Simu', 'Subject': 'Mada', 'Message': 'Ujumbe'
  };

  const originalText = new WeakMap();
  const lastRenderedText = new WeakMap();
  const originalAttributes = new WeakMap();
  const originalMetaDescriptions = new WeakMap();
  let sourceTitle = document.title
  let lastRenderedTitle = null;
  let language = DEFAULT_LANGUAGE;
  let observer;

  const normalize = (value) => String(value || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
  const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const localizeLeagueNames = (value) => String(value)
    .replace(/\bNBC\s+Premier\s+League\b/gi, 'NBC Ligi Kuu')
    .replace(/\bNBC\s+Championship\s+League\b/gi, 'NBC Championship')
    .replace(/\bNBC\s+Championship\b/gi, 'NBC Championship')
    .replace(/\bFirst\s+League\b/gi, 'Ligi ya Kwanza')
    .replace(/\bWomen[’']s\s+Premier\s+League\b/gi, 'Ligi Kuu ya Wanawake')
    .replace(/\bPremier\s+League\b/gi, 'Ligi Kuu')
  const preserveWhitespace = (source, value) => {
    const leading = String(source).match(/^\s*/)?.[0] || '';
    const trailing = String(source).match(/\s*$/)?.[0] || '';
    return leading + value + trailing;
  };
  const lookup = (source) => {
    const key = normalize(source);
    if (!key) return null;
    if (language === 'eng') return key;
    if (Object.prototype.hasOwnProperty.call(translations, key)) return translations[key];
    const caseInsensitiveKey = Object.keys(translations).find((candidate) => candidate.toLowerCase() === key.toLowerCase());
    if (caseInsensitiveKey) return translations[caseInsensitiveKey];
    if (/^\d+ predictions saved$/.test(key)) return key.replace('predictions saved', 'utabiri umehifadhiwa');
    if (/^\d+-day streak$/.test(key)) return key.replace('-day streak', '-siku mfululizo');
    if (/^\+?\d+ POINTS?$/.test(key)) return key.replace('POINTS', 'POINTI').replace('POINT', 'POINTI');
    if (/^\d+ questions? missed$/.test(key)) return key.replace('questions missed', 'maswali yamekosa jibu');
    if (/^\d+ questions? answered$/.test(key)) return key.replace('questions answered', 'maswali yamejibiwa');
    if (/^\d+ quizzes? completed$/.test(key)) return key.replace('quizzes completed', 'chemsha bongo zimekamilika');
    if (/^Quiz \d+ \/ \d+$/.test(key)) return key.replace('Quiz', 'Chemsha bongo');
    if (/^QUESTION \d+ OF \d+$/.test(key)) return key.replace('QUESTION', 'SWALI').replace(' OF ', ' KATI YA ');
    if (/^Question \d+ of \d+$/.test(key)) return key.replace('Question', 'Swali').replace(' of ', ' kati ya ');
    if (/^\d+ min read$/.test(key)) return key.replace('min read', 'dak kusoma');
    if (/^\d+ goals?$/.test(key)) return key.replace('goals', 'mabao').replace('goal', 'bao');
    if (/^\d+ pts?$/.test(key)) return key.replace('pts', 'pt').replace('pt', 'pt');
    if (/^Prediction saved: (.+)\. You can change it before the deadline\.$/.test(key)) return 'Utabiri umehifadhiwa: ' + key.match(/^Prediction saved: (.+)\. You can change it before the deadline\.$/)[1] + '. Unaweza kuubadilisha kabla ya muda kuisha.';
    if (/^Saved: (.+)\. Change it any time before the deadline\.$/.test(key)) return 'Imehifadhiwa: ' + key.match(/^Saved: (.+)\. Change it any time before the deadline\.$/)[1] + '. Badilisha wakati wowote kabla ya muda kuisha.';
    if (/^Prediction settled\.$/.test(key)) return 'Utabiri umethibitishwa.';
    if (/^Your prediction is locked\.$/.test(key)) return 'Utabiri wako umefungwa.';
    if (/^The final result has been confirmed and cannot be changed\.$/.test(key)) return 'Matokeo ya mwisho yamethibitishwa na hayawezi kubadilishwa.';
    if (/^Kickoff has passed\. This selection is permanently locked for this match\.$/.test(key)) return 'Muda wa kuanza umepita. Chaguo hili limefungwa kabisa kwa mechi hii.';
    if (/^Live period rankings require the connected leaderboard service\.$/.test(key)) return 'Orodha hai ya vipindi inahitaji huduma ya orodha iliyounganishwa.';
    if (/^This local fan score is saved on this device\. Connect the database to join the live multi-user ranking\.$/.test(key)) return 'Alama hizi za shabiki zimehifadhiwa kwenye kifaa hiki. Unganisha hifadhidata ili kujiunga na orodha hai ya watumiaji wengi.';    if (/^\d+ clubs? \/ all competitions$/.test(key)) return key.replace('clubs', 'vilabu').replace('club', 'klabu').replace('all competitions', 'mashindano yote');
    if (/^\d+ following$/.test(key)) return key.replace('following', 'wanaofuatilia');
    if (/^\d+ ranked players \/ /.test(key)) return key.replace('ranked players', 'wachezaji walioorodheshwa');
    if (/^Showing (.+)$/.test(key)) return key.replace('Showing ', 'Inaonyesha ');
    if (/^\d+ results for/.test(key)) return key.replace('results for', 'matokeo ya');    if (/^NBC (.+) LEAGUE 2026\/2027$/.test(key)) return key;
    if (/^\d+ \/ \d+ SEASON$/.test(key)) return key.replace('SEASON', 'MSIMU');
    if (/^\d+ \/ \d+ FAN LEADERBOARD$/.test(key)) return key.replace('FAN LEADERBOARD', 'ORODHA YA MASHABIKI');
    if (/^\d+ of \d+ stories$/.test(key)) return key.replace('of', 'kati ya').replace('stories', 'habari');
    if (/^\d+ pts to next$/.test(key)) return key.replace('pts to next', 'pointi hadi inayofuata');
    if (/^\d+ MIN READ$/i.test(key)) return key.replace(/ MIN READ$/i, ' DAKIKA ZA KUSOMA');
    if (/^\d+ MOMENTS$/i.test(key)) return 'MATUKIO ' + key.match(/^\d+/)[0];
    if (/^Show story \d+$/i.test(key)) return key.replace('Show story', 'Onyesha habari');
    if (/^Show news story \d+$/i.test(key)) return key.replace('Show news story', 'Onyesha habari ya');    return translateByParts(key);
  };
  const textValue = (node) => {
    const current = node.nodeValue;
    if (!originalText.has(node)) originalText.set(node, current);
    else if (lastRenderedText.has(node) && current !== lastRenderedText.get(node)) originalText.set(node, current);
    return originalText.get(node);
  };
  const shouldSkip = (node) => { const parent = node.parentElement; return !parent || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG'].includes(parent.tagName) || parent.closest('[data-i18n-ignore]'); };
  const translateTextNode = (node) => {
    if (shouldSkip(node)) return;
    const source = textValue(node);
    const result = lookup(source);
    const next = language === 'eng' ? source : (result === null ? source : preserveWhitespace(source, localizeLeagueNames(result)));
    if (node.nodeValue !== next) node.nodeValue = next;
    lastRenderedText.set(node, next);
  };
  const translateAttributes = (root) => {
    const elements = root.nodeType === 1 ? [root, ...root.querySelectorAll('*')] : [...root.querySelectorAll('*')];
    elements.forEach((element) => {
      ['placeholder', 'aria-label', 'title', 'alt', 'value'].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        let stored = originalAttributes.get(element);
        if (!stored) { stored = {}; originalAttributes.set(element, stored); }
        if (stored[attribute] === undefined) stored[attribute] = element.getAttribute(attribute);
        const source = stored[attribute];
        const mapped = attributeTranslations[source] || lookup(source);
        const next = language === 'eng' ? source : localizeLeagueNames(mapped || source);
        if (element.getAttribute(attribute) !== next) element.setAttribute(attribute, next);
      });
    });
  };
  const translateMetaDescription = () => {
    const meta = document.querySelector('meta[name="description"]');
    if (!meta) return;
    if (!originalMetaDescriptions.has(meta)) originalMetaDescriptions.set(meta, meta.getAttribute('content') || '');
    const source = originalMetaDescriptions.get(meta);
    const mapped = lookup(source);
    const next = language === 'eng' ? source : localizeLeagueNames(mapped || source);
    if (meta.getAttribute('content') !== next) meta.setAttribute('content', next);
  };  const translatePage = () => {
    document.documentElement.lang = languages[language].locale;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(translateTextNode);
    translateAttributes(document.body);
    translateMetaDescription();
    if (lastRenderedTitle !== null && document.title !== lastRenderedTitle) sourceTitle = document.title;
    const titleKey = language === 'swa' ? localizeLeagueNames(lookup(sourceTitle)) : sourceTitle;
    if (titleKey && document.title !== titleKey) document.title = titleKey;
    lastRenderedTitle = titleKey;
    updateSwitcher();
  };
  const readLanguage = () => { try { const requested = new URLSearchParams(window.location.search).get('lang'); if (requested && languages[requested]) return requested; const saved = window.localStorage.getItem(STORAGE_KEY); return saved && languages[saved] ? saved : DEFAULT_LANGUAGE; } catch (error) { return DEFAULT_LANGUAGE; } };
  const persistLanguage = () => { try { window.localStorage.setItem(STORAGE_KEY, language); } catch (error) { /* Local file previews may restrict storage. */ } };
  const updateSwitcher = () => {
    const selectedLabel = language === 'swa' ? 'imechaguliwa' : 'selected';
    const switchLabel = language === 'swa' ? 'Badilisha kwenda ' : 'Switch to ';
    document.querySelectorAll('[data-language-option]').forEach((button) => {
      const active = button.dataset.languageOption === language;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', active ? languages[language].label + ' ' + selectedLabel : switchLabel + languages[button.dataset.languageOption].label);
    });
  };
  const setLanguage = (next) => {
    if (!languages[next] || next === language) { updateSwitcher(); return; }
    language = next;
    persistLanguage();
    translatePage();
    document.dispatchEvent(new CustomEvent('tml-languagechange', { detail: { language, locale: languages[language].locale } }));
  };
  const mountSwitcher = () => {
    document.querySelectorAll('.nav-actions').forEach((actions) => {
      if (actions.querySelector('[data-language-switcher]')) return;
      const switcher = document.createElement('div');
      switcher.className = 'language-switcher';
      switcher.setAttribute('data-language-switcher', '');
      switcher.setAttribute('role', 'group');
      switcher.setAttribute('aria-label', 'Language');
      switcher.innerHTML = '<span class="language-switcher-label">Language</span><button type="button" data-language-option="eng">ENG</button><span class="language-divider" aria-hidden="true">|</span><button type="button" data-language-option="swa">SWA</button>';
      const menu = actions.querySelector('.menu-toggle');
      actions.insertBefore(switcher, menu || null);
      switcher.querySelectorAll('[data-language-option]').forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.languageOption)));
    });
    updateSwitcher();
  };
  const localizeRecord = (record, fields = ['title', 'summary', 'description', 'category', 'label', 'body']) => {
    if (!record || language === 'eng') return record;
    const copy = { ...record };
    fields.forEach((field) => {
      const explicit = record[field + 'Sw'] || record[field + 'Swa'];
      if (explicit) copy[field] = explicit;
      else if (Array.isArray(record[field])) copy[field] = record[field].map((part) => lookup(part) || part);
      else if (typeof record[field] === 'string') copy[field] = localizeLeagueNames(lookup(record[field]) || record[field]);
    });
    return copy;
  };

  language = readLanguage();
  window.TML_I18N = { languages, translations, t: (key) => language === 'eng' ? key : (lookup(key) || key), getLanguage: () => language, setLanguage, translatePage, mountSwitcher, localizeRecord, storageKey: STORAGE_KEY };
  mountSwitcher();
  translatePage();
  observer = new MutationObserver((mutations) => mutations.forEach((mutation) => {
    if (mutation.type === 'characterData') translateTextNode(mutation.target);
    if (mutation.type === 'attributes') translateAttributes(mutation.target);
    mutation.addedNodes.forEach((node) => { if (node.nodeType === 1) { translatePage(); } else if (node.nodeType === 3) translateTextNode(node); });
  }));
  observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'aria-label', 'title', 'alt', 'value'] });
})();
