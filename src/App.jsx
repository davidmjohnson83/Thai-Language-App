import React, { useState, useEffect, useCallback } from 'react';
import {
  BookOpen,
  Award,
  Settings,
  Compass,
  Volume2,
  RotateCcw,
  CheckCircle,
  XCircle,
  ChevronRight,
  Sparkles,
  User,
  Heart,
  Calendar,
  TrendingUp,
  Plus,
  Search,
  Languages,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';

// ─── User Profiles ──────────────────────────────────────────────────────────
const USERS = [
  { id: 'david',  name: 'David',  gender: 'male',   emoji: '🧔', particle: 'ครับ (Khrap)' },
  { id: 'lynsie', name: 'Lynsie', gender: 'female', emoji: '👩', particle: 'ค่ะ (Ka)'     },
];

// ─── Thai Travel Phrase Library ─────────────────────────────────────────────
const INITIAL_PHRASES = [
  // ── Essentials ──────────────────────────────────────────────────────────
  {
    id: 'hello',
    english: 'Hello / Greetings',
    thaiBase: 'สวัสดี',
    phoneticMale: 'Sawat-dee khrap',
    phoneticFemale: 'Sawat-dee ka',
    thaiMale: 'สวัสดีครับ',
    thaiFemale: 'สวัสดีค่ะ',
    category: 'Essentials',
    literal: 'Goodness / Auspiciousness (with polite particle)',
    tip: 'The standard greeting for any time of day. Accompany with a "Wai" — palms pressed together at chest level with a slight bow — for extra warmth.',
  },
  {
    id: 'goodbye',
    english: 'Goodbye',
    thaiBase: 'ลาก่อน',
    phoneticMale: 'La-korn khrap',
    phoneticFemale: 'La-korn ka',
    thaiMale: 'ลาก่อนครับ',
    thaiFemale: 'ลาก่อนค่ะ',
    category: 'Essentials',
    literal: 'Leave first (ลาก่อน)',
    tip: 'You can also say "Sawat-dee" (สวัสดี) as a farewell — it doubles as hello and goodbye in Thai!',
  },
  {
    id: 'thank_you',
    english: 'Thank you',
    thaiBase: 'ขอบคุณ',
    phoneticMale: 'Khop-khun khrap',
    phoneticFemale: 'Khop-khun ka',
    thaiMale: 'ขอบคุณครับ',
    thaiFemale: 'ขอบคุณค่ะ',
    category: 'Essentials',
    literal: 'Thank you (ขอบคุณ)',
    tip: 'A vital phrase. Use it generously with servers, tuk-tuk drivers, and hotel staff. Thai people genuinely appreciate the effort.',
  },
  {
    id: 'sorry',
    english: 'Excuse me / Sorry',
    thaiBase: 'ขอโทษ',
    phoneticMale: 'Kho-thot khrap',
    phoneticFemale: 'Kho-thot ka',
    thaiMale: 'ขอโทษครับ',
    thaiFemale: 'ขอโทษค่ะ',
    category: 'Essentials',
    literal: 'Ask for forgiveness (ขอโทษ)',
    tip: 'Works for both "excuse me" (getting someone\'s attention) and "I\'m sorry". Perfect for squeezing through crowded markets.',
  },
  {
    id: 'help',
    english: 'Help!',
    thaiBase: 'ช่วยด้วย',
    phoneticMale: 'Chuay duay khrap',
    phoneticFemale: 'Chuay duay ka',
    thaiMale: 'ช่วยด้วยครับ',
    thaiFemale: 'ช่วยด้วยค่ะ',
    category: 'Essentials',
    literal: 'Help (ช่วย) please (ด้วย)',
    tip: 'In a real emergency, shout "CHUAY! CHUAY!" repeatedly. Thai people respond extremely quickly to genuine calls for help.',
  },
  {
    id: 'my_name',
    english: 'My name is...',
    thaiBase: 'ผม/ฉัน ชื่อ...',
    phoneticMale: 'Phom cheu ... khrap',
    phoneticFemale: 'Chan cheu ... ka',
    thaiMale: 'ผมชื่อ ... ครับ',
    thaiFemale: 'ฉันชื่อ ... ค่ะ',
    category: 'Essentials',
    literal: 'I (ผม/ฉัน) named (ชื่อ) ...',
    tip: '"Phom" is the polite male "I"; "Chan" is the polite female "I". Thai people use "Khun" (คุณ) before a first name as a friendly honorific.',
  },
  {
    id: 'yes_no',
    english: 'Yes / No',
    thaiBase: 'ใช่ / ไม่ใช่',
    phoneticMale: 'Chai khrap / Mai chai khrap',
    phoneticFemale: 'Chai ka / Mai chai ka',
    thaiMale: 'ใช่ครับ / ไม่ใช่ครับ',
    thaiFemale: 'ใช่ค่ะ / ไม่ใช่ค่ะ',
    category: 'Essentials',
    literal: 'Yes (ใช่) / No (ไม่ใช่)',
    tip: '"Mai" (ไม่) alone means "no/not" and negates any word that follows it. Adding it before a word flips the meaning entirely.',
  },

  // ── Food & Dining ────────────────────────────────────────────────────────
  {
    id: 'shellfish_allergy',
    english: "I'm allergic to shellfish",
    thaiBase: 'ฉัน/ผม แพ้อาหารทะเล',
    phoneticMale: 'Phom phae aa-haan ta-lae khrap',
    phoneticFemale: 'Chan phae aa-haan ta-lae ka',
    thaiMale: 'ผมแพ้อาหารทะเลครับ',
    thaiFemale: 'ฉันแพ้อาหารทะเลค่ะ',
    category: 'Food & Dining',
    literal: 'I (ผม/ฉัน) allergic (แพ้) seafood (อาหารทะเล)',
    tip: '⚠️ CRITICAL: Carry a printed Thai allergy card. "Goong" (กุ้ง) = shrimp. "Hoi" (หอย) = shellfish/mollusks. Many Thai dishes secretly use shrimp paste (กะปิ, "kapi") as a base — always ask!',
  },
  {
    id: 'shellfish_check',
    english: 'Does this have shellfish?',
    thaiBase: 'อาหารนี้มีอาหารทะเลไหม',
    phoneticMale: 'Aa-haan nee mee aa-haan ta-lae mai khrap',
    phoneticFemale: 'Aa-haan nee mee aa-haan ta-lae mai ka',
    thaiMale: 'อาหารนี้มีอาหารทะเลไหมครับ',
    thaiFemale: 'อาหารนี้มีอาหารทะเลไหมค่ะ',
    category: 'Food & Dining',
    literal: 'This food (อาหารนี้) has (มี) seafood (อาหารทะเล) or not (ไหม)',
    tip: 'Point at the dish as you ask. Even stir-fries and sauces may contain hidden shrimp paste. When in doubt, ask twice!',
  },
  {
    id: 'not_spicy',
    english: "Not spicy, please",
    thaiBase: 'ไม่เอาเผ็ด',
    phoneticMale: 'Mai ao phet khrap',
    phoneticFemale: 'Mai ao phet ka',
    thaiMale: 'ไม่เอาเผ็ดครับ',
    thaiFemale: 'ไม่เอาเผ็ดค่ะ',
    category: 'Food & Dining',
    literal: 'No (ไม่) want (เอา) spicy (เผ็ด)',
    tip: 'Thai "not spicy" can still be fiery by Western standards! Add "เผ็ดน้อยมาก" (phet noi mak = very little spicy) for extra safety.',
  },
  {
    id: 'no_chili',
    english: 'No chili at all',
    thaiBase: 'ไม่ใส่พริก',
    phoneticMale: 'Mai sai phrik khrap',
    phoneticFemale: 'Mai sai phrik ka',
    thaiMale: 'ไม่ใส่พริกครับ',
    thaiFemale: 'ไม่ใส่พริกค่ะ',
    category: 'Food & Dining',
    literal: 'No (ไม่) put (ใส่) chili (พริก)',
    tip: 'Use this alongside "Mai ao phet" for absolute certainty of zero heat. Point to the chili jar and shake your head — visual communication works perfectly!',
  },
  {
    id: 'delicious',
    english: 'Very delicious!',
    thaiBase: 'อร่อยมาก',
    phoneticMale: 'Aroy mak khrap',
    phoneticFemale: 'Aroy mak ka',
    thaiMale: 'อร่อยมากครับ',
    thaiFemale: 'อร่อยมากค่ะ',
    category: 'Food & Dining',
    literal: 'Delicious (อร่อย) very (มาก)',
    tip: 'Tell street food vendors this and watch them beam! "Aroy" alone (without "mak") still means delicious — use it often.',
  },
  {
    id: 'bill_please',
    english: 'Check, please',
    thaiBase: 'เก็บเงินด้วย',
    phoneticMale: 'Kep ngen duay khrap',
    phoneticFemale: 'Kep ngen duay ka',
    thaiMale: 'เก็บเงินด้วยครับ',
    thaiFemale: 'เก็บเงินด้วยค่ะ',
    category: 'Food & Dining',
    literal: 'Collect (เก็บ) money (เงิน) also/please (ด้วย)',
    tip: 'You can also say "chek bin" (เช็คบิล) which is widely understood everywhere.',
  },
  {
    id: 'water',
    english: 'Drinking water',
    thaiBase: 'น้ำเปล่า',
    phoneticMale: 'Nam plao khrap',
    phoneticFemale: 'Nam plao ka',
    thaiMale: 'น้ำเปล่าครับ',
    thaiFemale: 'น้ำเปล่าค่ะ',
    category: 'Food & Dining',
    literal: 'Water (น้ำ) plain (เปล่า)',
    tip: 'Always drink bottled or filtered water in Thailand. "Nam yen" (น้ำเย็น) = cold water. "Nam khaeng" (น้ำแข็ง) = ice.',
  },

  // ── Directions & Travel ──────────────────────────────────────────────────
  {
    id: 'bathroom',
    english: 'Where is the bathroom?',
    thaiBase: 'ห้องน้ำอยู่ที่ไหน',
    phoneticMale: 'Hong-nam yoo thee-nai khrap',
    phoneticFemale: 'Hong-nam yoo thee-nai ka',
    thaiMale: 'ห้องน้ำอยู่ที่ไหนครับ',
    thaiFemale: 'ห้องน้ำอยู่ที่ไหนค่ะ',
    category: 'Directions & Travel',
    literal: 'Water room (ห้องน้ำ) located (อยู่ที่) where (ไหน)',
    tip: '"Hong-nam" literally means "water room". Public restrooms in Thailand often charge 5–10 baht — keep small coins in your pocket!',
  },
  {
    id: 'where_is',
    english: 'Where is...?',
    thaiBase: '... อยู่ที่ไหน',
    phoneticMale: '... yoo thee-nai khrap',
    phoneticFemale: '... yoo thee-nai ka',
    thaiMale: '... อยู่ที่ไหนครับ',
    thaiFemale: '... อยู่ที่ไหนค่ะ',
    category: 'Directions & Travel',
    literal: '... located (อยู่ที่) where (ไหน)',
    tip: 'Put the place name first: "Airport yoo thee-nai khrap?" or "BTS yoo thee-nai khrap?" Works perfectly with a map on your phone.',
  },
  {
    id: 'how_to_get',
    english: 'How do I get to...?',
    thaiBase: 'ไปที่... อย่างไร',
    phoneticMale: 'Pai thee ... yang-rai khrap',
    phoneticFemale: 'Pai thee ... yang-rai ka',
    thaiMale: 'ไปที่... อย่างไรครับ',
    thaiFemale: 'ไปที่... อย่างไรค่ะ',
    category: 'Directions & Travel',
    literal: 'Go (ไป) to (ที่) ... how (อย่างไร)',
    tip: 'Thais are incredibly helpful with directions. Show your destination on Google Maps for the best results.',
  },
  {
    id: 'take_me',
    english: 'Take me to... (taxi/tuk-tuk)',
    thaiBase: 'พาไปที่...',
    phoneticMale: 'Pha pai thee ... khrap',
    phoneticFemale: 'Pha pai thee ... ka',
    thaiMale: 'พาไปที่... ครับ',
    thaiFemale: 'พาไปที่... ค่ะ',
    category: 'Directions & Travel',
    literal: 'Lead/Take (พา) go (ไป) to (ที่) ...',
    tip: 'Use the Grab app (Thailand\'s Uber) for fair metered prices. For tuk-tuks, always agree on a price before you get in!',
  },

  // ── Shopping & Numbers ───────────────────────────────────────────────────
  {
    id: 'how_much',
    english: 'How much is this?',
    thaiBase: 'อันนี้เท่าไหร่',
    phoneticMale: 'An-nee thao-rai khrap',
    phoneticFemale: 'An-nee thao-rai ka',
    thaiMale: 'อันนี้เท่าไหร่ครับ',
    thaiFemale: 'อันนี้เท่าไหร่ค่ะ',
    category: 'Shopping & Numbers',
    literal: 'This item (อันนี้) how much (เท่าไหร่)',
    tip: 'Point at the item. Vendors commonly show prices on a calculator — a useful visual shortcut across language barriers.',
  },
  {
    id: 'expensive',
    english: 'Too expensive!',
    thaiBase: 'แพงไป',
    phoneticMale: 'Phaeng pai khrap',
    phoneticFemale: 'Phaeng pai ka',
    thaiMale: 'แพงไปครับ',
    thaiFemale: 'แพงไปค่ะ',
    category: 'Shopping & Numbers',
    literal: 'Expensive (แพง) excessively (ไป)',
    tip: 'Follow with "Lot noi dai mai?" (ลดหน่อยได้ไหม) = "Can you discount a little?" — the magic bargaining combo!',
  },
  {
    id: 'will_you_take',
    english: 'Will you take [price]?',
    thaiBase: '[ราคา] ได้ไหม',
    phoneticMale: '[price] dai mai khrap',
    phoneticFemale: '[price] dai mai ka',
    thaiMale: '[ราคา] ได้ไหมครับ',
    thaiFemale: '[ราคา] ได้ไหมค่ะ',
    category: 'Shopping & Numbers',
    literal: '[price] (ราคา) acceptable (ได้) or not (ไหม)',
    tip: 'Replace [ราคา] with a number in Thai. "Roi baht" = 100 baht. "Song roi" = 200 baht. Bargaining is expected at night markets — smile and keep it friendly!',
  },
  {
    id: 'discount',
    english: 'Can you discount a little?',
    thaiBase: 'ลดหน่อยได้ไหม',
    phoneticMale: 'Lot noi dai mai khrap',
    phoneticFemale: 'Lot noi dai mai ka',
    thaiMale: 'ลดหน่อยได้ไหมครับ',
    thaiFemale: 'ลดหน่อยได้ไหมค่ะ',
    category: 'Shopping & Numbers',
    literal: 'Reduce (ลด) a little (หน่อย) can (ได้) or not (ไหม)',
    tip: 'The ultimate bargaining phrase! Chatuchak Weekend Market, Patpong Night Bazaar, and beach vendors all expect friendly negotiation.',
  },

  // ── Social & Culture ─────────────────────────────────────────────────────
  {
    id: 'very_good',
    english: 'Very good! / Excellent!',
    thaiBase: 'ดีมาก',
    phoneticMale: 'Dee mak khrap',
    phoneticFemale: 'Dee mak ka',
    thaiMale: 'ดีมากครับ',
    thaiFemale: 'ดีมากค่ะ',
    category: 'Social & Culture',
    literal: 'Good (ดี) very (มาก)',
    tip: 'Thai people genuinely love compliments and will often blush with joy. Compliment the food, service, and craftsmanship generously!',
  },
  {
    id: 'no_problem',
    english: 'No problem / Never mind',
    thaiBase: 'ไม่เป็นไร',
    phoneticMale: 'Mai pen rai khrap',
    phoneticFemale: 'Mai pen rai ka',
    thaiMale: 'ไม่เป็นไรครับ',
    thaiFemale: 'ไม่เป็นไรค่ะ',
    category: 'Social & Culture',
    literal: 'Not (ไม่) to be (เป็น) anything (ไร)',
    tip: '"Mai pen rai" is practically the Thai national motto — embodying the relaxed, go-with-the-flow spirit of Thailand. You will hear it dozens of times a day.',
  },
  {
    id: 'welcome',
    english: "You're welcome",
    thaiBase: 'ยินดี',
    phoneticMale: 'Yin-dee khrap',
    phoneticFemale: 'Yin-dee ka',
    thaiMale: 'ยินดีครับ',
    thaiFemale: 'ยินดีค่ะ',
    category: 'Social & Culture',
    literal: 'Delighted / Pleased (ยินดี)',
    tip: '"Yindee ton-rap" (ยินดีต้อนรับ) is the full formal "Welcome!" you\'ll see on entrance signs. "Mai pen rai" also works as a casual "you\'re welcome".',
  },
  {
    id: 'wai_custom',
    english: 'The Wai — Thai Greeting Gesture',
    thaiBase: 'ไหว้',
    phoneticMale: 'Wai (gesture)',
    phoneticFemale: 'Wai (gesture)',
    thaiMale: 'ไหว้',
    thaiFemale: 'ไหว้',
    category: 'Social & Culture',
    literal: 'Press palms together in prayer position at chest level with a slight bow',
    tip: 'Always return a Wai when someone gives one to you. Don\'t initiate a Wai to children or service workers — a smile and nod is sufficient. Monks always receive the highest Wai (fingertips at nose or forehead level).',
  },
  {
    id: 'temple_etiquette',
    english: 'Temple Etiquette',
    thaiBase: 'มารยาทในวัด',
    phoneticMale: 'Ma-ra-yaat nai wat',
    phoneticFemale: 'Ma-ra-yaat nai wat',
    thaiMale: 'มารยาทในวัดครับ',
    thaiFemale: 'มารยาทในวัดค่ะ',
    category: 'Social & Culture',
    literal: 'Etiquette (มารยาท) in (ใน) temple (วัด)',
    tip: 'Always remove shoes at the entrance. Cover shoulders and knees — women especially (sarongs are usually available for rent). NEVER point your feet toward a Buddha image or monk — deeply disrespectful.',
  },
  {
    id: 'head_feet',
    english: 'Head is sacred / Feet are low',
    thaiBase: 'หัวศักดิ์สิทธิ์ เท้าต่ำ',
    phoneticMale: 'Hua sak-sit, thao tam',
    phoneticFemale: 'Hua sak-sit, thao tam',
    thaiMale: 'หัวศักดิ์สิทธิ์ เท้าต่ำครับ',
    thaiFemale: 'หัวศักดิ์สิทธิ์ เท้าต่ำค่ะ',
    category: 'Social & Culture',
    literal: 'Head (หัว) sacred (ศักดิ์สิทธิ์), feet (เท้า) low (ต่ำ)',
    tip: 'In Thai culture the head is the most sacred body part and feet the lowest. Never touch anyone\'s head (even children). Never step over someone or point your feet at people, monks, or sacred objects.',
  },
];

// ─── Category colour map ─────────────────────────────────────────────────────
const CATEGORY_COLORS = {
  'Essentials':          { bg: 'bg-emerald-100', text: 'text-emerald-800' },
  'Food & Dining':       { bg: 'bg-orange-100',  text: 'text-orange-800'  },
  'Directions & Travel': { bg: 'bg-indigo-100',  text: 'text-indigo-800'  },
  'Shopping & Numbers':  { bg: 'bg-pink-100',    text: 'text-pink-800'    },
  'Social & Culture':    { bg: 'bg-amber-100',   text: 'text-amber-800'   },
};

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  // Global user state
  const [activeUser, setActiveUser] = useState(() => localStorage.getItem('thai_active_user') || 'david');
  const currentUser = USERS.find(u => u.id === activeUser) || USERS[0];
  const userGender = currentUser.gender;

  // Phrase & progress state
  const [customPhrases,   setCustomPhrases]   = useState(() => JSON.parse(localStorage.getItem('thai_custom_phrases') || '[]'));
  const [masteredPhrases, setMasteredPhrases] = useState(() => JSON.parse(localStorage.getItem('thai_mastered_phrases') || '[]'));
  const [favorites,       setFavorites]       = useState(() => JSON.parse(localStorage.getItem('thai_favorites') || '[]'));

  // Trip settings
  const [tripDate,         setTripDate]         = useState(() => localStorage.getItem('thai_trip_date') || '');
  const [streak,           setStreak]           = useState(() => parseInt(localStorage.getItem('thai_streak') || '0', 10));
  const [lastPracticeDate, setLastPracticeDate] = useState(() => localStorage.getItem('thai_last_practice_date') || '');

  // Navigation
  const [activeTab,        setActiveTab]        = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery,      setSearchQuery]      = useState('');

  // AI Translator
  const [translateQuery,    setTranslateQuery]    = useState('');
  const [translationResult, setTranslationResult] = useState(null);
  const [translationLoading, setTranslationLoading] = useState(false);
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // Quiz engine
  const [quizMode,      setQuizMode]      = useState(null); // 'flashcards' | 'quiz' | 'listening'
  const [quizIndex,     setQuizIndex]     = useState(0);
  const [quizScore,     setQuizScore]     = useState(0);
  const [quizAnswers,   setQuizAnswers]   = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [quizComplete,  setQuizComplete]  = useState(false);
  const [cardFlipped,   setCardFlipped]   = useState(false);

  // UI state
  const [notification, setNotification] = useState(null);
  const [speechSupported, setSpeechSupported] = useState(true);

  // Combined phrase list
  const allPhrases = [...INITIAL_PHRASES, ...customPhrases];

  // ── Persist to localStorage ────────────────────────────────────────────
  useEffect(() => { localStorage.setItem('thai_active_user', activeUser); }, [activeUser]);
  useEffect(() => { localStorage.setItem('thai_custom_phrases', JSON.stringify(customPhrases)); }, [customPhrases]);
  useEffect(() => { localStorage.setItem('thai_mastered_phrases', JSON.stringify(masteredPhrases)); }, [masteredPhrases]);
  useEffect(() => { localStorage.setItem('thai_favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('thai_trip_date', tripDate); }, [tripDate]);
  useEffect(() => {
    localStorage.setItem('thai_streak', streak.toString());
    localStorage.setItem('thai_last_practice_date', lastPracticeDate);
  }, [streak, lastPracticeDate]);

  // Check speech synthesis on mount
  useEffect(() => {
    if (!('speechSynthesis' in window)) setSpeechSupported(false);
  }, []);

  // ── Helpers ───────────────────────────────────────────────────────────
  const showNotification = useCallback((message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 4000);
  }, []);

  const updateStreak = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    if (lastPracticeDate === today) return;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    if (lastPracticeDate === yesterdayStr) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(1);
    }
    setLastPracticeDate(today);
    showNotification('🔥 Daily practice streak updated!');
  }, [lastPracticeDate, showNotification]);

  const speakThai = useCallback((text) => {
    if (!('speechSynthesis' in window)) {
      showNotification('Speech synthesis is not supported in this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'th-TH';
    utterance.rate = 0.85;
    const voices = window.speechSynthesis.getVoices();
    const thaiVoice = voices.find(v => v.lang.startsWith('th'));
    if (thaiVoice) utterance.voice = thaiVoice;
    utterance.onerror = () => showNotification('Thai voice not available. Install a Thai voice package on your device.');
    window.speechSynthesis.speak(utterance);
  }, [showNotification]);

  const toggleFavorite = useCallback((id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    showNotification(favorites.includes(id) ? 'Removed from starred phrases' : '⭐ Added to starred phrases!');
  }, [favorites, showNotification]);

  const toggleMastered = useCallback((id) => {
    if (masteredPhrases.includes(id)) {
      setMasteredPhrases(prev => prev.filter(i => i !== id));
      showNotification('Marked as still learning');
    } else {
      setMasteredPhrases(prev => [...prev, id]);
      showNotification('🎉 Phrase marked as mastered!');
      updateStreak();
    }
  }, [masteredPhrases, showNotification, updateStreak]);

  const getDaysToTrip = () => {
    if (!tripDate) return null;
    const diff = new Date(tripDate) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days >= 0 ? days : 0;
  };

  // ── AI Translation ────────────────────────────────────────────────────
  const translateWithAI = async () => {
    if (!translateQuery.trim()) return;
    if (!geminiApiKey) {
      showNotification('Add VITE_GEMINI_API_KEY to your .env file to enable AI translation.');
      return;
    }
    setTranslationLoading(true);
    setTranslationResult(null);

    const systemPrompt = `You are a native Thai language translator. Translate English travel phrases into natural, conversational Thai optimised for travelers visiting Thailand.
Respond only with a raw JSON object — no markdown or extra text — with these exact keys:
"thaiScript": Thai characters only,
"phoneticMale": Romanized phonetics with male particle 'khrap',
"phoneticFemale": Romanized phonetics with female particle 'ka',
"thaiMale": Thai script with ครับ,
"thaiFemale": Thai script with ค่ะ,
"literal": Word-by-word English breakdown,
"category": One of: Essentials, Food & Dining, Directions & Travel, Shopping & Numbers, Social & Culture,
"tip": Short cultural/practical travel tip.`;

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;
      const payload = {
        contents: [{ parts: [{ text: `Translate: "${translateQuery}"` }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: { responseMimeType: 'application/json' },
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error('Empty response');

      const result = JSON.parse(rawText);
      setTranslationResult({ id: `custom_${Date.now()}`, english: translateQuery, ...result });
      showNotification('✅ Translation ready!');
    } catch (err) {
      console.error(err);
      showNotification('Translation failed. Check your API key and internet connection.');
    } finally {
      setTranslationLoading(false);
    }
  };

  const saveCustomTranslation = () => {
    if (!translationResult) return;
    setCustomPhrases(prev => [translationResult, ...prev]);
    setTranslationResult(null);
    setTranslateQuery('');
    showNotification('✅ Saved to your Travel Phrasebook!');
  };

  // ── Quiz Engine ───────────────────────────────────────────────────────
  const MAX_QUIZ_QUESTIONS = 5;

  const setupQuestion = useCallback((index, mode) => {
    if (allPhrases.length < 4) {
      showNotification('Need at least 4 phrases to run a quiz.');
      setQuizMode(null);
      return;
    }
    const correct = allPhrases[index % allPhrases.length];
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setCardFlipped(false);

    if (mode === 'quiz' || mode === 'listening') {
      const wrong = allPhrases
        .filter(p => p.id !== correct.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      setQuizAnswers([correct, ...wrong].sort(() => Math.random() - 0.5));
      if (mode === 'listening') {
        setTimeout(() => speakThai(userGender === 'male' ? correct.thaiMale : correct.thaiFemale), 400);
      }
    }
  }, [allPhrases, showNotification, speakThai, userGender]);

  const startQuiz = (mode) => {
    setQuizMode(mode);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizComplete(false);
    setupQuestion(0, mode);
  };

  const handleAnswerSelect = (option) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option.id);
    const correct = allPhrases[quizIndex % allPhrases.length];
    const isCorrect = option.id === correct.id;
    setIsAnswerCorrect(isCorrect);
    if (isCorrect) setQuizScore(prev => prev + 1);
  };

  const nextQuestion = () => {
    const next = quizIndex + 1;
    if (next >= Math.min(allPhrases.length, MAX_QUIZ_QUESTIONS)) {
      setQuizComplete(true);
      updateStreak();
    } else {
      setQuizIndex(next);
      setupQuestion(next, quizMode);
    }
  };

  // ── Filtered phrases ──────────────────────────────────────────────────
  const filteredPhrases = allPhrases.filter(p => {
    const catMatch =
      selectedCategory === 'All' ||
      p.category === selectedCategory ||
      (selectedCategory === 'Starred' && favorites.includes(p.id));
    const q = searchQuery.toLowerCase();
    const textMatch =
      !q ||
      p.english.toLowerCase().includes(q) ||
      p.thaiBase.toLowerCase().includes(q) ||
      p.phoneticMale.toLowerCase().includes(q) ||
      p.phoneticFemale.toLowerCase().includes(q);
    return catMatch && textMatch;
  });

  const masteryPct = allPhrases.length > 0
    ? Math.round((masteredPhrases.length / allPhrases.length) * 100)
    : 0;

  const navTo = (tab) => { setActiveTab(tab); setQuizMode(null); };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased">

      {/* Toast notification */}
      {notification && (
        <div className="fixed bottom-20 left-4 right-4 md:bottom-6 md:right-6 md:left-auto bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl z-50 flex items-center space-x-3 border border-slate-700 max-w-sm">
          <Sparkles className="h-5 w-5 text-amber-400 shrink-0" />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="bg-gradient-to-r from-emerald-950 via-teal-900 to-indigo-950 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 opacity-5 rounded-full blur-3xl transform translate-x-20 -translate-y-20 pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-48 h-48 bg-teal-400 opacity-5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 py-4 md:py-5 flex flex-col md:flex-row justify-between items-center gap-3 relative z-10">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-amber-400 to-amber-500 p-2.5 rounded-2xl shadow-lg border border-amber-300">
              <Compass className="h-6 w-6 text-emerald-950" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-2">
                Sawasdee Trip
                <span className="text-xs bg-amber-400 text-emerald-950 font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">🇹🇭 Thai</span>
              </h1>
              <p className="text-xs text-teal-200 font-medium">Interactive travel language companion</p>
            </div>
          </div>

          {/* User profile switcher + streak */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-white/10 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
            <span className="text-xs font-semibold px-2 text-teal-100 flex items-center gap-1">
              <User className="h-3.5 w-3.5" /> Studying as:
            </span>
            {USERS.map(user => (
              <button
                key={user.id}
                onClick={() => { setActiveUser(user.id); showNotification(`Switched to ${user.name} — ${user.gender === 'male' ? 'ครับ' : 'ค่ะ'} mode!`); }}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  activeUser === user.id
                    ? 'bg-amber-400 text-emerald-950 shadow-md'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {user.emoji} {user.name}
              </button>
            ))}
            <div className="bg-amber-500/10 text-amber-300 border border-amber-500/20 px-3 py-1.5 rounded-xl flex items-center gap-1 text-xs font-bold">
              🔥 {streak} day streak
            </div>
          </div>
        </div>
      </header>

      {/* ── Main layout ───────────────────────────────────────────────── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <div className="space-y-5 lg:col-span-1">
          {/* Nav */}
          <nav className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-3 mb-3">Menu</p>
            {[
              { tab: 'dashboard',  icon: Compass,   label: 'Dashboard'       },
              { tab: 'learn',      icon: BookOpen,  label: 'Study Deck'      },
              { tab: 'practice',   icon: Award,     label: 'Practice Arena'  },
              { tab: 'translator', icon: Sparkles,  label: 'AI Translator'   },
              { tab: 'settings',   icon: Settings,  label: 'Trip Settings'   },
            ].map(({ tab, icon: Icon, label }) => (
              <button
                key={tab}
                onClick={() => navTo(tab)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-emerald-50 text-emerald-900 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className={`h-5 w-5 ${tab === 'translator' ? 'text-amber-500' : ''}`} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          {/* Countdown */}
          <div className="bg-gradient-to-br from-indigo-950 to-indigo-900 text-white rounded-3xl p-5 shadow-md relative overflow-hidden border border-indigo-800">
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4 pointer-events-none">
              <Calendar className="h-32 w-32" />
            </div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-indigo-300">Thailand Trip</h3>
            {getDaysToTrip() !== null ? (
              <div className="mt-2">
                <p className="text-4xl font-extrabold text-amber-400 tracking-tight">{getDaysToTrip()}</p>
                <p className="text-xs text-indigo-200 mt-1 font-medium">Days until departure ✈️</p>
                <div className="mt-4 bg-indigo-900/50 p-3 rounded-xl border border-white/5 text-xs text-indigo-200 flex items-center justify-between">
                  <span>Departs:</span>
                  <span className="font-bold">
                    {new Date(tripDate + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-3">
                <p className="text-sm text-indigo-200 leading-relaxed">No date set. Set your departure date to start the countdown!</p>
                <button onClick={() => navTo('settings')} className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:underline">
                  Set date <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Mastery ring */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 text-center">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mastery Progress</h4>
            <div className="relative inline-flex items-center justify-center mt-4">
              <div className="w-24 h-24 rounded-full border-8 border-slate-100 flex items-center justify-center">
                <span className="text-xl font-black text-emerald-900">{masteryPct}%</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3 font-medium">
              <span className="font-bold text-emerald-800">{masteredPhrases.length}</span> of <span className="font-bold">{allPhrases.length}</span> phrases mastered
            </p>
          </div>
        </div>

        {/* ── Content area ─────────────────────────────────────────────── */}
        <div className="lg:col-span-3 space-y-6">

          {/* ══ DASHBOARD ══════════════════════════════════════════════ */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">

              {/* Hero tip card */}
              <div className="bg-gradient-to-r from-emerald-950 to-teal-900 text-white rounded-3xl p-6 shadow-md border border-teal-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-teal-300">Today's Focus</span>
                  </div>
                  <h3 className="text-lg font-bold">
                    Studying as: {currentUser.emoji} {currentUser.name} &mdash; using {currentUser.gender === 'male' ? 'ครับ (khrap)' : 'ค่ะ (ka)'}
                  </h3>
                  <p className="text-sm text-teal-100 max-w-xl leading-relaxed">
                    End every sentence with <span className="font-mono text-amber-300 font-bold">{userGender === 'male' ? 'khrap (ครับ)' : 'ka (ค่ะ)'}</span> to show respect.
                    It's the single most impactful thing you can say in Thai!
                  </p>
                </div>
                <button
                  onClick={() => speakThai(userGender === 'male' ? 'สวัสดีครับ' : 'สวัสดีค่ะ')}
                  className="bg-white text-emerald-950 hover:bg-slate-50 px-5 py-3 rounded-2xl shadow-sm font-extrabold text-sm flex items-center space-x-2 transition-all self-stretch md:self-auto justify-center shrink-0"
                >
                  <Volume2 className="h-4 w-4 text-emerald-800" />
                  <span>Hear Polite Hello</span>
                </button>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start space-x-4">
                  <div className="p-3 bg-rose-50 rounded-xl text-rose-500 shrink-0"><TrendingUp className="h-6 w-6" /></div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Streak</span>
                    <h4 className="text-xl font-extrabold text-slate-800 mt-0.5">{streak} Days</h4>
                    <p className="text-xs text-slate-500 mt-1">Keep it going!</p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start space-x-4">
                  <div className="p-3 bg-amber-50 rounded-xl text-amber-500 shrink-0"><Heart className="h-6 w-6 fill-amber-500" /></div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Starred</span>
                    <h4 className="text-xl font-extrabold text-slate-800 mt-0.5">{favorites.length} Phrases</h4>
                    <p className="text-xs text-slate-500 mt-1">Quick-access list</p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start space-x-4">
                  <div className="p-3 bg-indigo-50 rounded-xl text-indigo-500 shrink-0"><Languages className="h-6 w-6" /></div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Custom</span>
                    <h4 className="text-xl font-extrabold text-slate-800 mt-0.5">{customPhrases.length} Created</h4>
                    <p className="text-xs text-slate-500 mt-1">Personalised phrases</p>
                  </div>
                </div>
              </div>

              {/* Quick-start tracks */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">Recommended Study Tracks</h3>
                  <button onClick={() => navTo('learn')} className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1">
                    View all <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { category: 'Food & Dining',       emoji: '🍜', desc: 'Order safely: spice levels, shellfish allergy phrases, and more.',       color: 'hover:border-orange-400 hover:shadow-orange-100' },
                    { category: 'Directions & Travel', emoji: '🗺️', desc: 'Find the bathroom, navigate taxis, and master key locations.',           color: 'hover:border-indigo-400 hover:shadow-indigo-100' },
                    { category: 'Social & Culture',    emoji: '🙏', desc: 'Wai etiquette, temple customs, and how to make a great impression.',     color: 'hover:border-amber-400 hover:shadow-amber-100'  },
                  ].map(({ category, emoji, desc, color }) => (
                    <div
                      key={category}
                      onClick={() => { setSelectedCategory(category); navTo('learn'); }}
                      className={`bg-white p-5 rounded-2xl border border-slate-100 hover:shadow-md transition-all cursor-pointer group ${color}`}
                    >
                      <span className="text-xl">{emoji}</span>
                      <h4 className="font-bold text-slate-800 mt-2 text-sm group-hover:text-emerald-900">{category}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{desc}</p>
                      <div className="mt-3 flex items-center text-xs font-bold text-emerald-700 space-x-1">
                        <span>Study now</span>
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Allergy alert banner */}
              <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-red-800">Shellfish Allergy Reminder</p>
                  <p className="text-xs text-red-700 mt-0.5 leading-relaxed">
                    Thai cuisine frequently uses shrimp paste (กะปิ) as an invisible base ingredient. Always carry a printed Thai allergy card and study the shellfish phrases before dining out.
                  </p>
                </div>
              </div>

              {/* Mini quiz CTA */}
              <div className="bg-amber-400/10 border border-amber-400/20 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-amber-900">Ready for a quick challenge?</h4>
                  <p className="text-xs text-amber-800 max-w-lg mt-1">Active recall is the fastest way to make phrases stick before your flight.</p>
                </div>
                <button
                  onClick={() => startQuiz('flashcards')}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-5 py-3 rounded-2xl shadow-sm text-xs tracking-wider uppercase transition-all whitespace-nowrap"
                >
                  ⚡ Start Flashcards
                </button>
              </div>
            </div>
          )}

          {/* ══ STUDY DECK ═════════════════════════════════════════════ */}
          {activeTab === 'learn' && (
            <div className="space-y-5">
              {/* Filter bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                  <div className="relative w-full md:w-80">
                    <Search className="h-4 w-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      placeholder="Search English, Thai, or phonetics…"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <button
                    onClick={() => navTo('translator')}
                    className="w-full md:w-auto bg-emerald-900 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all shadow-sm"
                  >
                    <Plus className="h-4 w-4 text-amber-400" />
                    <span>Add Custom Phrase</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {['All', 'Essentials', 'Food & Dining', 'Directions & Travel', 'Shopping & Numbers', 'Social & Culture', 'Starred'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                        selectedCategory === cat ? 'bg-emerald-900 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phrase cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPhrases.length > 0 ? filteredPhrases.map(phrase => {
                  const isStarred   = favorites.includes(phrase.id);
                  const isMastered  = masteredPhrases.includes(phrase.id);
                  const phonetic    = userGender === 'male' ? phrase.phoneticMale  : phrase.phoneticFemale;
                  const thaiDisplay = userGender === 'male' ? phrase.thaiMale      : phrase.thaiFemale;
                  const catColor    = CATEGORY_COLORS[phrase.category] || { bg: 'bg-slate-100', text: 'text-slate-600' };

                  return (
                    <div
                      key={phrase.id}
                      className={`bg-white rounded-3xl p-5 border shadow-sm transition-all duration-300 ${isMastered ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-100'}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className={`text-[10px] ${catColor.bg} ${catColor.text} font-bold px-2 py-0.5 rounded-full`}>
                          {phrase.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => toggleFavorite(phrase.id)}
                            className={`p-1.5 rounded-lg transition-all ${isStarred ? 'bg-amber-50 text-amber-500' : 'text-slate-300 hover:text-slate-400'}`}
                            title={isStarred ? 'Unstar' : 'Star phrase'}
                          >
                            <Heart className={`h-4 w-4 ${isStarred ? 'fill-amber-500' : ''}`} />
                          </button>
                          <button
                            onClick={() => toggleMastered(phrase.id)}
                            className={`p-1.5 rounded-lg transition-all ${isMastered ? 'bg-emerald-100 text-emerald-800' : 'text-slate-300 hover:text-slate-400'}`}
                            title={isMastered ? 'Unmark mastered' : 'Mark as mastered'}
                          >
                            <CheckCircle className={`h-4 w-4 ${isMastered ? 'fill-emerald-700 text-white' : ''}`} />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-xs font-semibold text-slate-400">English</span>
                          <h3 className="font-extrabold text-slate-800 text-lg leading-tight">{phrase.english}</h3>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-2xl space-y-2 border border-slate-100">
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phonetics ({currentUser.name})</span>
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono text-emerald-950 font-extrabold text-base tracking-wide leading-tight">{phonetic}</span>
                              <button
                                onClick={() => speakThai(thaiDisplay)}
                                className="bg-emerald-900 hover:bg-emerald-800 text-white p-2 rounded-xl shadow-sm transition-transform active:scale-95 shrink-0"
                                title="Pronounce in Thai"
                              >
                                <Volume2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thai Script</span>
                            <p className="text-slate-700 font-serif text-lg font-bold thai-script">{thaiDisplay}</p>
                          </div>
                        </div>

                        {phrase.literal && (
                          <p className="text-xs pt-1">
                            <span className="font-bold text-slate-500">Literal: </span>
                            <span className="text-slate-600 italic">{phrase.literal}</span>
                          </p>
                        )}
                        {phrase.tip && (
                          <p className="text-[11px] bg-amber-500/10 text-amber-900 px-2.5 py-1.5 rounded-xl font-medium leading-relaxed">
                            💡 {phrase.tip}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                }) : (
                  <div className="col-span-1 md:col-span-2 bg-white text-center py-12 rounded-3xl border border-slate-100 text-slate-500 space-y-3">
                    <p className="font-bold">No phrases match your filter.</p>
                    <button onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} className="text-xs font-bold text-emerald-800 underline">
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══ PRACTICE ARENA — pick mode ═════════════════════════════ */}
          {activeTab === 'practice' && !quizMode && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center max-w-2xl mx-auto space-y-4">
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Practice Arena</h3>
                  <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                    Active recall is the most effective way to memorise vocabulary. Choose your session type below.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4">
                  {[
                    { mode: 'flashcards', label: 'Flashcards',           tag: 'Interactive',     desc: 'Flip cards for pronunciation recall.' },
                    { mode: 'quiz',       label: 'Multiple-Choice Quiz', tag: 'Multiple Choice', desc: 'Match English to Thai meanings.'       },
                    { mode: 'listening',  label: 'Listening Challenge',  tag: 'Listening',       desc: 'Hear Thai audio and identify it.'      },
                  ].map(({ mode, label, tag, desc }) => (
                    <button
                      key={mode}
                      onClick={() => startQuiz(mode)}
                      className="p-4 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-500 rounded-2xl transition-all space-y-2 text-left group"
                    >
                      <span className="text-xs font-black text-slate-400 group-hover:text-emerald-800 uppercase">{tag}</span>
                      <h4 className="font-bold text-slate-800">{label}</h4>
                      <p className="text-xs text-slate-500">{desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══ ACTIVE QUIZ SESSION ════════════════════════════════════ */}
          {activeTab === 'practice' && quizMode && (
            <div className="max-w-xl mx-auto space-y-5">
              {/* Session header */}
              <div className="flex justify-between items-center bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-black tracking-wider">Session</span>
                  <p className="text-sm font-bold text-slate-800 capitalize">{quizMode} Mode · {currentUser.emoji} {currentUser.name}</p>
                </div>
                <button onClick={() => setQuizMode(null)} className="text-xs font-extrabold text-rose-500 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl">
                  Quit
                </button>
              </div>

              {/* Progress bar */}
              <div className="bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-600 h-2 transition-all duration-300"
                  style={{ width: `${((quizIndex + 1) / Math.min(allPhrases.length, MAX_QUIZ_QUESTIONS)) * 100}%` }}
                />
              </div>

              {!quizComplete ? (
                <div className="space-y-5">
                  {/* FLASHCARDS */}
                  {quizMode === 'flashcards' && (
                    <div className="space-y-4">
                      <div
                        onClick={() => setCardFlipped(!cardFlipped)}
                        className={`min-h-72 cursor-pointer bg-white border hover:border-emerald-500 rounded-3xl p-6 flex flex-col justify-between items-center text-center shadow-lg transition-all ${cardFlipped ? 'ring-2 ring-emerald-500 border-emerald-500' : 'border-slate-200'}`}
                      >
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">
                          {cardFlipped ? 'Answer revealed' : 'Think of the Thai — then tap to flip'}
                        </span>
                        <div className="my-auto py-8 w-full">
                          {!cardFlipped ? (
                            <h3 className="text-2xl font-black text-emerald-950 leading-tight">
                              {allPhrases[quizIndex % allPhrases.length].english}
                            </h3>
                          ) : (
                            <div className="space-y-4">
                              <div>
                                <span className="text-xs font-bold text-slate-400 uppercase">Thai Script</span>
                                <p className="text-3xl font-extrabold text-slate-900 thai-script leading-tight mt-1">
                                  {userGender === 'male' ? allPhrases[quizIndex % allPhrases.length].thaiMale : allPhrases[quizIndex % allPhrases.length].thaiFemale}
                                </p>
                              </div>
                              <div>
                                <span className="text-xs font-bold text-slate-400 uppercase">Phonetics</span>
                                <p className="text-lg font-bold text-emerald-950 mt-1 font-mono">
                                  {userGender === 'male' ? allPhrases[quizIndex % allPhrases.length].phoneticMale : allPhrases[quizIndex % allPhrases.length].phoneticFemale}
                                </p>
                              </div>
                              <button
                                onClick={e => { e.stopPropagation(); speakThai(userGender === 'male' ? allPhrases[quizIndex % allPhrases.length].thaiMale : allPhrases[quizIndex % allPhrases.length].thaiFemale); }}
                                className="inline-flex items-center space-x-1.5 bg-emerald-900 text-white px-4 py-2 rounded-xl text-xs font-extrabold hover:bg-emerald-800"
                              >
                                <Volume2 className="h-4 w-4" />
                                <span>Listen</span>
                              </button>
                            </div>
                          )}
                        </div>
                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                          <RotateCcw className="h-3.5 w-3.5" /> Tap to flip
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => { toggleMastered(allPhrases[quizIndex % allPhrases.length].id); nextQuestion(); }}
                          className="flex-1 bg-emerald-900 hover:bg-emerald-800 text-white font-extrabold py-3.5 rounded-2xl shadow-sm text-sm"
                        >
                          ✓ Got it!
                        </button>
                        <button
                          onClick={nextQuestion}
                          className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-extrabold py-3.5 rounded-2xl text-sm"
                        >
                          Still Learning
                        </button>
                      </div>
                    </div>
                  )}

                  {/* QUIZ / LISTENING */}
                  {(quizMode === 'quiz' || quizMode === 'listening') && (
                    <div className="space-y-5">
                      <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm text-center space-y-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          {quizMode === 'listening' ? 'Listening Quiz' : 'Translation Quiz'} · Q{quizIndex + 1} of {Math.min(allPhrases.length, MAX_QUIZ_QUESTIONS)}
                        </span>
                        {quizMode === 'listening' ? (
                          <div className="space-y-3 py-4">
                            <p className="text-sm text-slate-500 font-medium">Press play and identify what you heard:</p>
                            <button
                              onClick={() => speakThai(userGender === 'male' ? allPhrases[quizIndex % allPhrases.length].thaiMale : allPhrases[quizIndex % allPhrases.length].thaiFemale)}
                              className="mx-auto bg-emerald-900 text-white p-5 rounded-full shadow-lg hover:bg-emerald-800 flex items-center justify-center"
                            >
                              <Volume2 className="h-8 w-8" />
                            </button>
                          </div>
                        ) : (
                          <div className="py-4">
                            <p className="text-xs text-slate-400 uppercase tracking-widest">Which Thai phrase means…</p>
                            <h3 className="text-2xl font-black text-slate-800 leading-tight mt-2">
                              "{allPhrases[quizIndex % allPhrases.length].english}"
                            </h3>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2.5">
                        {quizAnswers.map(option => {
                          const isCorrectOption = option.id === allPhrases[quizIndex % allPhrases.length].id;
                          const isSelected      = selectedAnswer === option.id;
                          let cls = 'bg-white border-slate-200 hover:border-emerald-500 hover:bg-slate-50';
                          if (selectedAnswer !== null) {
                            if (isCorrectOption)          cls = 'bg-emerald-50 border-emerald-500 text-emerald-900';
                            else if (isSelected)          cls = 'bg-rose-50 border-rose-500 text-rose-900';
                            else                          cls = 'bg-white border-slate-200 opacity-50';
                          }
                          return (
                            <button
                              key={option.id}
                              disabled={selectedAnswer !== null}
                              onClick={() => handleAnswerSelect(option)}
                              className={`w-full p-4 border rounded-2xl text-left font-bold transition-all text-sm flex items-center justify-between gap-2 ${cls}`}
                            >
                              <div>
                                <p className="font-semibold text-slate-500 uppercase text-[10px]">Thai Pronunciation</p>
                                <p className="text-base text-slate-800">{userGender === 'male' ? option.phoneticMale : option.phoneticFemale}</p>
                                <p className="text-xs text-slate-400 thai-script">{userGender === 'male' ? option.thaiMale : option.thaiFemale}</p>
                              </div>
                              {selectedAnswer !== null && isCorrectOption && <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />}
                              {selectedAnswer !== null && isSelected && !isCorrectOption && <XCircle className="h-5 w-5 text-rose-600 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>

                      {selectedAnswer !== null && (
                        <button onClick={nextQuestion} className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-black py-4 rounded-2xl shadow-md text-sm transition-all">
                          Next Question →
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                /* Quiz complete */
                <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm text-center space-y-5">
                  <div className="text-5xl">🏆</div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800">Challenge Complete!</h3>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed max-w-sm mx-auto">
                      Consistent practice builds deep memory — you're one step closer to confident Thai conversation!
                    </p>
                  </div>
                  {quizMode !== 'flashcards' && (
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 max-w-xs mx-auto">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Score</span>
                      <p className="text-3xl font-black text-emerald-800 mt-1">
                        {quizScore} / {Math.min(allPhrases.length, MAX_QUIZ_QUESTIONS)}
                      </p>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button onClick={() => startQuiz(quizMode)} className="flex-1 bg-emerald-900 hover:bg-emerald-800 text-white font-extrabold py-3.5 rounded-2xl text-sm shadow-sm">
                      Try Again
                    </button>
                    <button onClick={() => setQuizMode(null)} className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-extrabold py-3.5 rounded-2xl text-sm">
                      Back to Arena
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══ AI TRANSLATOR ══════════════════════════════════════════ */}
          {activeTab === 'translator' && (
            <div className="space-y-5">
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  <h3 className="text-lg font-bold text-slate-800">AI Custom Phrasebook</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Powered by <strong>Gemini 2.5 Flash</strong>. Translate any phrase — food allergies, flight requests, specific questions — and save it directly to your phrasebook with full male/female variants and cultural tips.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5">
                {/* API key status */}
                {geminiApiKey ? (
                  <div className="bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-2xl flex items-center gap-2 text-xs">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-emerald-800">Gemini API key loaded from <code className="font-mono">.env</code></span>
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 px-4 py-3 rounded-2xl text-xs space-y-1">
                    <p className="font-bold text-amber-900">⚠️ API key not configured</p>
                    <p className="text-amber-800">
                      Add your key to the <code className="font-mono">.env</code> file in the project root:
                    </p>
                    <pre className="bg-white border border-amber-200 rounded-lg px-3 py-2 font-mono text-[11px] text-slate-700 overflow-x-auto">VITE_GEMINI_API_KEY=your_key_here</pre>
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block font-bold text-emerald-700 hover:underline mt-1"
                    >
                      Get a free key at aistudio.google.com →
                    </a>
                  </div>
                )}

                {/* Phrase input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-600 uppercase tracking-wide">Phrase to Translate</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Do you have vegetarian options? / I need a doctor."
                      value={translateQuery}
                      onChange={e => setTranslateQuery(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && translateWithAI()}
                      className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                    <button
                      disabled={translationLoading || !translateQuery.trim()}
                      onClick={translateWithAI}
                      className="bg-emerald-900 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-extrabold px-6 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 whitespace-nowrap"
                    >
                      {translationLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Translating…</span>
                        </>
                      ) : 'Translate'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Result card */}
              {translationResult && (
                <div className="bg-gradient-to-tr from-amber-400/5 to-emerald-500/5 border-2 border-dashed border-emerald-400/30 p-6 rounded-3xl space-y-4 shadow-sm">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <span className="text-[10px] bg-emerald-900 text-amber-300 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">AI Generated</span>
                      <h4 className="text-xl font-black text-slate-800 mt-2">"{translationResult.english}"</h4>
                    </div>
                    <span className="text-xs font-bold text-slate-400">{translationResult.category}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* David (Male) */}
                    <div className={`p-4 rounded-2xl border bg-white ${activeUser === 'david' ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-slate-100'}`}>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-full uppercase">🧔 David (Male)</span>
                        <button onClick={() => speakThai(translationResult.thaiMale)} className="bg-sky-50 text-sky-700 p-2 rounded-xl hover:bg-sky-100 transition-colors">
                          <Volume2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-lg font-black text-slate-800 font-mono mt-3">{translationResult.phoneticMale}</p>
                      <p className="text-sm text-slate-500 thai-script mt-1">{translationResult.thaiMale}</p>
                    </div>

                    {/* Lynsie (Female) */}
                    <div className={`p-4 rounded-2xl border bg-white ${activeUser === 'lynsie' ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-slate-100'}`}>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] bg-pink-100 text-pink-800 font-bold px-2 py-0.5 rounded-full uppercase">👩 Lynsie (Female)</span>
                        <button onClick={() => speakThai(translationResult.thaiFemale)} className="bg-pink-50 text-pink-700 p-2 rounded-xl hover:bg-pink-100 transition-colors">
                          <Volume2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-lg font-black text-slate-800 font-mono mt-3">{translationResult.phoneticFemale}</p>
                      <p className="text-sm text-slate-500 thai-script mt-1">{translationResult.thaiFemale}</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-100 space-y-2 text-xs">
                    <p><span className="font-extrabold text-slate-500">Literal: </span><span className="italic text-slate-700">{translationResult.literal}</span></p>
                    <p className="bg-amber-400/10 p-2.5 rounded-xl text-amber-900 leading-relaxed font-medium">💡 <strong>Tip:</strong> {translationResult.tip}</p>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={saveCustomTranslation} className="flex-1 bg-emerald-900 hover:bg-emerald-800 text-white font-extrabold py-3.5 rounded-2xl shadow-md text-xs uppercase tracking-wider">
                      Save to Phrasebook
                    </button>
                    <button onClick={() => setTranslationResult(null)} className="bg-slate-200 hover:bg-slate-300 text-slate-600 font-extrabold px-6 rounded-2xl text-xs uppercase">
                      Discard
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══ TRIP SETTINGS ══════════════════════════════════════════ */}
          {activeTab === 'settings' && (
            <div className="space-y-5">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Trip Planner & Settings</h3>
                  <p className="text-sm text-slate-500 mt-1">Set your departure date, manage user profiles, and configure your learning preferences.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  {/* Departure date */}
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold text-slate-600 uppercase tracking-wide">✈️ Departure Date</label>
                    <input
                      type="date"
                      value={tripDate}
                      onChange={e => { setTripDate(e.target.value); showNotification('Trip date saved!'); }}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    {tripDate && (
                      <p className="text-xs text-slate-500">
                        {getDaysToTrip()} days until departure — {getDaysToTrip() > 100 ? 'plenty of time to master all phrases! 📚' : getDaysToTrip() > 30 ? 'time to practice every day! 🔥' : 'final countdown — study hard! ✈️'}
                      </p>
                    )}
                  </div>

                  {/* Active user */}
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold text-slate-600 uppercase tracking-wide">👤 Currently Studying As</label>
                    <div className="grid grid-cols-2 gap-2">
                      {USERS.map(user => (
                        <button
                          key={user.id}
                          onClick={() => { setActiveUser(user.id); showNotification(`Switched to ${user.name}`); }}
                          className={`py-3 px-4 rounded-2xl text-sm font-extrabold border transition-all flex items-center gap-2 justify-center ${
                            activeUser === user.id
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {user.emoji} {user.name}
                          <span className="text-xs font-normal opacity-70">{user.gender === 'male' ? '(ครับ)' : '(ค่ะ)'}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats overview */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  {[
                    { label: 'Total Phrases',   value: allPhrases.length      },
                    { label: 'Mastered',         value: masteredPhrases.length },
                    { label: 'Starred',          value: favorites.length       },
                    { label: 'Custom Created',   value: customPhrases.length   },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-2xl font-black text-emerald-900">{value}</p>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Reset / Danger zone */}
                <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
                  <div>
                    <h4 className="text-xs font-extrabold text-rose-900">Reset All Progress</h4>
                    <p className="text-[11px] text-rose-700 mt-0.5">Clears streak, starred, mastered, and custom phrases. Cannot be undone.</p>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm('Reset all progress data? This cannot be undone.')) {
                        localStorage.clear();
                        setActiveUser('david');
                        setCustomPhrases([]);
                        setMasteredPhrases([]);
                        setFavorites([]);
                        setTripDate('');
                        setStreak(0);
                        setLastPracticeDate('');
                        showNotification('All progress has been reset.');
                      }
                    }}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-4 py-2 rounded-xl text-xs uppercase whitespace-nowrap"
                  >
                    Reset Progress
                  </button>
                </div>
              </div>

              {/* PWA install hint */}
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex items-start gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="text-sm font-bold text-indigo-900">Install as App (PWA)</p>
                  <p className="text-xs text-indigo-700 mt-0.5 leading-relaxed">
                    On Chrome/Edge: tap the install icon in the address bar. On iOS Safari: tap Share → Add to Home Screen. Works offline once installed!
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ── Mobile bottom nav ──────────────────────────────────────── */}
      <footer className="bg-white border-t border-slate-200 py-2 safe-bottom block lg:hidden sticky bottom-0 z-40 shadow-t">
        <div className="flex justify-around items-center max-w-sm mx-auto">
          {[
            { tab: 'dashboard',  icon: Compass,  label: 'Home'     },
            { tab: 'learn',      icon: BookOpen, label: 'Study'    },
            { tab: 'practice',   icon: Award,    label: 'Practice' },
            { tab: 'translator', icon: Sparkles, label: 'AI'       },
            { tab: 'settings',   icon: Settings, label: 'Settings' },
          ].map(({ tab, icon: Icon, label }) => (
            <button
              key={tab}
              onClick={() => navTo(tab)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                activeTab === tab ? 'text-emerald-900' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-bold">{label}</span>
            </button>
          ))}
        </div>
      </footer>

    </div>
  );
}
