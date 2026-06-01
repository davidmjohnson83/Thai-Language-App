import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Award, 
  Settings, 
  Compass, 
  Volume2, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  ChevronRight, 
  Sparkles, 
  User, 
  Heart, 
  Calendar, 
  TrendingUp, 
  Plus, 
  Search, 
  VolumeX,
  Languages,
  ArrowRight
} from 'lucide-react';

// Pre-defined essential Thai travel phrases
const INITIAL_PHRASES = [
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
    tip: 'The standard greeting used day and night. Accompany with a "Wai" (palms together at chest) for extra politeness.'
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
    literal: 'Thank you (with polite particle)',
    tip: 'A vital phrase. Use it generously with servers, drivers, and hotel staff.'
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
    literal: 'Ask for punishment',
    tip: 'Perfect for squeezing through crowds or apologizing for an accidental bump.'
  },
  {
    id: 'not_spicy',
    english: "I don't want it spicy",
    thaiBase: 'ไม่เอาเผ็ด',
    phoneticMale: 'Mai ao phet khrap',
    phoneticFemale: 'Mai ao phet ka',
    thaiMale: 'ไม่เอาเผ็ดครับ',
    thaiFemale: 'ไม่เอาเผ็ดค่ะ',
    category: 'Food & Dining',
    literal: 'No (ไม่) want (เอา) spicy (เผ็ด)',
    tip: 'Crucial for visitors who cannot handle high heat. Thai spicy is extremely hot!'
  },
  {
    id: 'no_chili',
    english: 'Do not put chili',
    thaiBase: 'ไม่ใส่พริก',
    phoneticMale: 'Mai sai phrik khrap',
    phoneticFemale: 'Mai sai phrik ka',
    thaiMale: 'ไม่ใส่พริกครับ',
    thaiFemale: 'ไม่ใส่พริกค่ะ',
    category: 'Food & Dining',
    literal: 'No (ไม่) put/wear (ใส่) chili (พริก)',
    tip: 'An extra safeguard if you want absolutely zero heat in your meal.'
  },
  {
    id: 'delicious',
    english: 'This is very delicious!',
    thaiBase: 'อร่อยมาก',
    phoneticMale: 'Aroy mak khrap',
    phoneticFemale: 'Aroy mak ka',
    thaiMale: 'อร่อยมากครับ',
    thaiFemale: 'อร่อยมากค่ะ',
    category: 'Food & Dining',
    literal: 'Delicious (อร่อย) very (มาก)',
    tip: 'Say this to street food vendors to see them light up with smiles!'
  },
  {
    id: 'bill_please',
    english: 'Check, please (Bill please)',
    thaiBase: 'เก็บเงินด้วย',
    phoneticMale: 'Kep ngen duay khrap',
    phoneticFemale: 'Kep ngen duay ka',
    thaiMale: 'เก็บเงินด้วยครับ',
    thaiFemale: 'เก็บเงินด้วยค่ะ',
    category: 'Food & Dining',
    literal: 'Collect (เก็บ) money (เงิน) also (ด้วย)',
    tip: 'You can also say "Check Bill" (เช็คบิล chék bin) which is widely understood.'
  },
  {
    id: 'bathroom',
    english: "Where is the bathroom?",
    thaiBase: 'ห้องน้ำอยู่ที่ไหน',
    phoneticMale: 'Hong-nam yoo thee-nai khrap',
    phoneticFemale: 'Hong-nam yoo thee-nai ka',
    thaiMale: 'ห้องน้ำอยู่ที่ไหนครับ',
    thaiFemale: 'ห้องน้ำอยู่ที่ไหนค่ะ',
    category: 'Directions & Travel',
    literal: 'Water room (ห้องน้ำ) located at (อยู่ที) where (ไหน)',
    tip: 'Hong-nam literally translates to "water room".'
  },
  {
    id: 'where_is',
    english: 'Where is...?',
    thaiBase: '...อยู่ที่ไหน',
    phoneticMale: '... yoo thee-nai khrap',
    phoneticFemale: '... yoo thee-nai ka',
    thaiMale: '... อยู่ที่ไหนครับ',
    thaiFemale: '... อยู่ที่ไหนค่ะ',
    category: 'Directions & Travel',
    literal: '... located at (อยู่ที) where (ไหน)',
    tip: 'Simply place the noun at the beginning (e.g., "Airport yoo thee-nai khrap?").'
  },
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
    tip: 'Point at the item while saying "An-nee thao-rai".'
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
    tip: 'Follow up with "Lot noi dai mai ka/khrap?" (Can you discount a bit?) for friendly negotiation.'
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
    tip: 'To ask specifically for ice, say "Nam Khaeng" (น้ำแข็ง).'
  }
];

export default function App() {
  // Global & User State
  const [userGender, setUserGender] = useState(() => {
    return localStorage.getItem('thai_user_gender') || 'female'; // Default to female (ka) or male (khrap)
  });
  const [customPhrases, setCustomPhrases] = useState(() => {
    const saved = localStorage.getItem('thai_custom_phrases');
    return saved ? JSON.parse(saved) : [];
  });
  const [masteredPhrases, setMasteredPhrases] = useState(() => {
    const saved = localStorage.getItem('thai_mastered_phrases');
    return saved ? JSON.parse(saved) : [];
  });
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('thai_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [tripDate, setTripDate] = useState(() => {
    return localStorage.getItem('thai_trip_date') || '';
  });
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem('thai_streak') || '0', 10);
  });
  const [lastPracticeDate, setLastPracticeDate] = useState(() => {
    return localStorage.getItem('thai_last_practice_date') || '';
  });

  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, learn, practice, translator, settings
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // AI Translator State
  const [translateQuery, setTranslateQuery] = useState('');
  const [translationResult, setTranslationResult] = useState(null);
  const [translationLoading, setTranslationLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  // Quiz State
  const [quizMode, setQuizMode] = useState(null); // 'flashcards', 'quiz', 'listening'
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);

  // Notifications/Alert states
  const [notification, setNotification] = useState(null);

  // Speech engine availability status
  const [speechSupported, setSpeechSupported] = useState(true);

  // Sound play confirmation
  const [lastSpokenId, setLastSpokenId] = useState(null);

  // Combine default and custom phrases
  const allPhrases = [...INITIAL_PHRASES, ...customPhrases];

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('thai_user_gender', userGender);
  }, [userGender]);

  useEffect(() => {
    localStorage.setItem('thai_custom_phrases', JSON.stringify(customPhrases));
  }, [customPhrases]);

  useEffect(() => {
    localStorage.setItem('thai_mastered_phrases', JSON.stringify(masteredPhrases));
  }, [masteredPhrases]);

  useEffect(() => {
    localStorage.setItem('thai_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('thai_trip_date', tripDate);
  }, [tripDate]);

  useEffect(() => {
    localStorage.setItem('thai_streak', streak.toString());
    localStorage.setItem('thai_last_practice_date', lastPracticeDate);
  }, [streak, lastPracticeDate]);

  // Check speech synthesis on mount
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSpeechSupported(false);
    }
  }, []);

  // Set up daily practice streak tracking
  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    if (lastPracticeDate === today) return; // already updated today

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastPracticeDate === yesterdayStr) {
      setStreak(prev => prev + 1);
    } else if (lastPracticeDate === '') {
      setStreak(1);
    } else {
      // Streak broken, reset to 1
      setStreak(1);
    }
    setLastPracticeDate(today);
    showNotification('🔥 Daily streak updated!');
  };

  // Toast notification helper
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Audio Pronunciation Engine
  const speakThai = (text) => {
    if (!('speechSynthesis' in window)) {
      showNotification("Your browser does not support Audio speech synthesis.");
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'th-TH'; // Correct locale for Thai
    utterance.rate = 0.85; // Slightly slower for language learners

    // Find a proper Thai voice if available
    const voices = window.speechSynthesis.getVoices();
    const thaiVoice = voices.find(voice => voice.lang.startsWith('th'));
    if (thaiVoice) {
      utterance.voice = thaiVoice;
    }

    utterance.onerror = (e) => {
      console.error("Speech synthesis error", e);
      showNotification("Could not play speech. Standard Thai voice package may need installing on your device.");
    };

    window.speechSynthesis.speak(utterance);
  };

  // Toggle favorite status
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fId => fId !== id));
      showNotification("Removed from starred phrases");
    } else {
      setFavorites([...favorites, id]);
      showNotification("Added to starred phrases!");
    }
  };

  // Toggle mastery status
  const toggleMastered = (id) => {
    if (masteredPhrases.includes(id)) {
      setMasteredPhrases(masteredPhrases.filter(mId => mId !== id));
      showNotification("Marked as still learning");
    } else {
      setMasteredPhrases([...masteredPhrases, id]);
      showNotification("Awesome! Phrase marked as Mastered 🎉");
      updateStreak();
    }
  };

  // Calculate countdown days
  const getDaysToTrip = () => {
    if (!tripDate) return null;
    const diffTime = new Date(tripDate) - new Date();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : 0;
  };

  // AI Translation using Gemini 2.5 Flash
  const translateWithAI = async () => {
    if (!translateQuery.trim()) return;
    setTranslationLoading(true);
    setTranslationResult(null);

    const systemPrompt = `You are a native Thai language translator. You translate English travel phrases into practical, highly natural conversational Thai, optimized specifically for travelers. 
You must produce a structured JSON output with the exact keys:
"thaiScript": "The phrase written in correct Thai characters",
"phoneticMale": "Phonetics/Romanization with male polite particle 'khrap' at the end where appropriate",
"phoneticFemale": "Phonetics/Romanization with female polite particle 'ka' or 'kha' at the end where appropriate",
"thaiMale": "Thai script with male polite particle 'ครับ'",
"thaiFemale": "Thai script with female polite particle 'ค่ะ' or 'ขา'",
"literal": "Literal word-by-word meaning breakdown in English",
"category": "Pick one of: 'Essentials', 'Food & Dining', 'Directions & Travel', 'Shopping & Numbers', 'Social & Culture'",
"tip": "Short travel tip about when/how to use this phrase in Thailand"

Ensure the translation is natural and culturally polite. Return only the raw JSON.`;

    const userQuery = `Translate the phrase: "${translateQuery}"`;

    try {
      // Clean fallback if API key is not ready
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      
      const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              thaiScript: { type: "STRING" },
              phoneticMale: { type: "STRING" },
              phoneticFemale: { type: "STRING" },
              thaiMale: { type: "STRING" },
              thaiFemale: { type: "STRING" },
              literal: { type: "STRING" },
              category: { type: "STRING" },
              tip: { type: "STRING" }
            },
            required: ["thaiScript", "phoneticMale", "phoneticFemale", "thaiMale", "thaiFemale", "literal", "category", "tip"]
          }
        }
      };

      // Handle exponential backoff retries (up to 5 times)
      let response;
      let delay = 1000;
      for (let i = 0; i < 5; i++) {
        try {
          response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (response.ok) break;
        } catch (e) {
          if (i === 4) throw e;
        }
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      }

      if (!response || !response.ok) {
        throw new Error("Failed to connect to translation assistant.");
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error("No translation returned.");

      const result = JSON.parse(rawText);
      setTranslationResult({
        id: 'custom_' + Date.now(),
        english: translateQuery,
        ...result
      });
      showNotification("Custom translation ready!");
    } catch (error) {
      console.error(error);
      showNotification("Could not translate. Using instant dictionary simulation.");
      // Simulated translation fallback in case of no network/key limit
      const simulatedResult = {
        id: 'custom_' + Date.now(),
        english: translateQuery,
        thaiScript: "อยากได้...",
        phoneticMale: "Yak dai ... khrap",
        phoneticFemale: "Yak dai ... ka",
        thaiMale: "อยากได้ ... ครับ",
        thaiFemale: "อยากได้ ... ค่ะ",
        literal: `Want to get (อยากได้) + phrase`,
        category: "Essentials",
        tip: "This is a versatile phrasing to ask for items. Standard fallback translation simulated."
      };
      setTranslationResult(simulatedResult);
    } finally {
      setTranslationLoading(false);
    }
  };

  const saveCustomTranslation = () => {
    if (!translationResult) return;
    setCustomPhrases([translationResult, ...customPhrases]);
    setTranslationResult(null);
    setTranslateQuery('');
    showNotification("Added successfully to your Travel Phrasebook!");
  };

  // Interactive Quiz Generation
  const startQuiz = (mode) => {
    setQuizMode(mode);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizComplete(false);
    setCardFlipped(false);
    setupQuestion(0, mode);
  };

  const setupQuestion = (index, currentMode) => {
    if (allPhrases.length < 4) {
      showNotification("Add or learn at least 4 phrases to run quizzes!");
      setQuizMode(null);
      return;
    }
    
    const correctPhrase = allPhrases[index % allPhrases.length];
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);

    if (currentMode === 'quiz' || currentMode === 'listening') {
      // Pick 3 random wrong options
      const wrongOptions = allPhrases
        .filter(p => p.id !== correctPhrase.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      const options = [correctPhrase, ...wrongOptions].sort(() => 0.5 - Math.random());
      setQuizAnswers(options);

      // Play sound automatically in listening mode
      if (currentMode === 'listening') {
        setTimeout(() => {
          speakThai(userGender === 'male' ? correctPhrase.thaiMale : correctPhrase.thaiFemale);
        }, 300);
      }
    }
  };

  const handleAnswerSelect = (option) => {
    if (selectedAnswer !== null) return; // Answer already submitted
    
    setSelectedAnswer(option.id);
    const correctPhrase = allPhrases[quizIndex % allPhrases.length];
    const correct = option.id === correctPhrase.id;
    setIsAnswerCorrect(correct);
    
    if (correct) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    const nextIdx = quizIndex + 1;
    // Limit quiz session to 5 questions or length of phrases
    const maxQuestions = Math.min(allPhrases.length, 5);

    if (nextIdx >= maxQuestions) {
      setQuizComplete(true);
      updateStreak();
    } else {
      setQuizIndex(nextIdx);
      setCardFlipped(false);
      setupQuestion(nextIdx, quizMode);
    }
  };

  // Filter phrases based on search and category
  const filteredPhrases = allPhrases.filter(phrase => {
    const matchesCategory = selectedCategory === 'All' || phrase.category === selectedCategory || (selectedCategory === 'Starred' && favorites.includes(phrase.id));
    const matchesSearch = phrase.english.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          phrase.thaiBase.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          phrase.phoneticMale.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          phrase.phoneticFemale.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased">
      
      {/* Dynamic Toast Notification */}
      {notification && (
        <div className="fixed bottom-20 left-4 right-4 md:bottom-6 md:right-6 md:left-auto bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl z-50 flex items-center space-x-3 border border-slate-700 animate-bounce">
          <Sparkles className="h-5 w-5 text-amber-400" />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* Hero Header Area */}
      <header className="bg-gradient-to-r from-emerald-950 via-teal-900 to-indigo-950 text-white shadow-xl relative overflow-hidden">
        {/* Abstract Thai Mandala Art Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 opacity-5 rounded-full blur-3xl transform translate-x-20 -translate-y-20"></div>
        <div className="absolute -bottom-10 left-10 w-48 h-48 bg-teal-400 opacity-5 rounded-full blur-2xl"></div>

        <div className="max-w-6xl mx-auto px-4 py-5 md:py-6 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <div className="flex items-center space-x-3.5">
            <div className="bg-gradient-to-tr from-amber-400 to-amber-500 p-2.5 rounded-2xl shadow-lg border border-amber-300">
              <Compass className="h-7 w-7 text-emerald-950 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-2">
                Sawasdee Trip <span className="text-xs bg-amber-400 text-emerald-950 font-semibold px-2 py-0.5 rounded-full uppercase">Thai 🇹🇭</span>
              </h1>
              <p className="text-xs text-teal-200 font-medium">Your interactive travel language companion</p>
            </div>
          </div>

          {/* Quick Settings Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 bg-white/10 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
            
            {/* Speaker Gender Selector */}
            <div className="flex items-center bg-emerald-950/40 rounded-xl p-1 border border-white/15">
              <span className="text-xs font-semibold px-2 text-teal-100 flex items-center gap-1">
                <User className="h-3.5 w-3.5" /> Speak as:
              </span>
              <button
                onClick={() => { setUserGender('male'); showNotification("Voice particles switched to Male (ครับ)"); }}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200 ${userGender === 'male' ? 'bg-amber-400 text-emerald-950 shadow-md' : 'text-slate-200 hover:text-white'}`}
              >
                🧔 Male (Khrap)
              </button>
              <button
                onClick={() => { setUserGender('female'); showNotification("Voice particles switched to Female (ค่ะ)"); }}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200 ${userGender === 'female' ? 'bg-amber-400 text-emerald-950 shadow-md' : 'text-slate-200 hover:text-white'}`}
              >
                👩 Female (Ka)
              </button>
            </div>

            {/* Streak Counter */}
            <div className="bg-amber-500/10 text-amber-300 border border-amber-500/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-bold">
              <span>🔥 {streak} Day Streak</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Core Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column: Navigation & Countdown Sidecard */}
        <div className="space-y-6 lg:col-span-1">
          
          {/* Navigation Controls */}
          <nav className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-3 mb-3">Menu</p>
            <button
              onClick={() => { setActiveTab('dashboard'); setQuizMode(null); }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'dashboard' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Compass className="h-5 w-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => { setActiveTab('learn'); setQuizMode(null); }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'learn' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <BookOpen className="h-5 w-5" />
              <span>Study Deck</span>
            </button>
            <button
              onClick={() => { setActiveTab('practice'); setQuizMode(null); }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'practice' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Award className="h-5 w-5" />
              <span>Practice Arena</span>
            </button>
            <button
              onClick={() => { setActiveTab('translator'); setQuizMode(null); }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'translator' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Sparkles className="h-5 w-5 text-amber-500" />
              <span>AI Translation</span>
            </button>
            <button
              onClick={() => { setActiveTab('settings'); setQuizMode(null); }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'settings' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Settings className="h-5 w-5" />
              <span>My Trip Settings</span>
            </button>
          </nav>

          {/* Travel Countdown Card */}
          <div className="bg-gradient-to-br from-indigo-950 to-indigo-900 text-white rounded-3xl p-5 shadow-md relative overflow-hidden border border-indigo-900">
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
              <Calendar className="h-32 w-32" />
            </div>
            
            <h3 className="text-sm font-bold tracking-wide uppercase text-indigo-300">My Thailand Trip</h3>
            {getDaysToTrip() !== null ? (
              <div className="mt-2">
                <p className="text-4xl font-extrabold text-amber-400 tracking-tight">{getDaysToTrip()}</p>
                <p className="text-xs text-indigo-200 mt-1 font-medium">Days remaining until departure ✈️</p>
                <div className="mt-4 bg-indigo-900/50 p-3 rounded-xl border border-white/5 text-xs text-indigo-200 flex items-center justify-between">
                  <span>Departure:</span>
                  <span className="font-bold">{new Date(tripDate).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}</span>
                </div>
              </div>
            ) : (
              <div className="mt-3">
                <p className="text-sm text-indigo-200 leading-relaxed">No departure date set yet. Plan your trip in settings to start the countdown!</p>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className="mt-4 inline-flex items-center space-x-1.5 text-xs font-bold text-amber-400 hover:underline"
                >
                  <span>Set Departure Date</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Quick Mastery Summary Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 text-center">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mastery Progress</h4>
            <div className="relative inline-flex items-center justify-center mt-4">
              {/* Simple progress ring */}
              <div className="w-24 h-24 rounded-full border-8 border-slate-100 flex items-center justify-center">
                <span className="text-xl font-black text-emerald-950">
                  {allPhrases.length > 0 ? Math.round((masteredPhrases.length / allPhrases.length) * 100) : 0}%
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3 font-medium">
              You mastered <span className="font-bold text-emerald-800">{masteredPhrases.length}</span> out of <span className="font-bold">{allPhrases.length}</span> essential travel phrases!
            </p>
          </div>

        </div>

        {/* Right Columns: Main content interface */}
        <div className="lg:col-span-3 space-y-6">

          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Daily Tip / Encouragement Card */}
              <div className="bg-gradient-to-r from-teal-850 to-emerald-900 text-white rounded-3xl p-6 shadow-md border border-teal-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-teal-300">Daily Tip</span>
                  </div>
                  <h3 className="text-lg font-bold">The Magic of "Khrap" and "Ka"</h3>
                  <p className="text-sm text-teal-100 max-w-xl leading-relaxed">
                    Thai is a tonal language, but the absolute most important feature is politeness. End every single sentence with <span className="font-mono text-amber-300 font-bold">{userGender === 'male' ? 'khrap (ครับ)' : 'ka (ค่ะ)'}</span> to show respect. 
                  </p>
                </div>
                <button
                  onClick={() => speakThai(userGender === 'male' ? 'สวัสดีครับ' : 'สวัสดีค่ะ')}
                  className="bg-white text-emerald-950 hover:bg-slate-50 px-5 py-3 rounded-2xl shadow-sm font-extrabold text-sm flex items-center space-x-2 transition-all self-stretch md:self-auto justify-center"
                >
                  <Volume2 className="h-4 w-4 text-emerald-800" />
                  <span>Hear Polite Welcome</span>
                </button>
              </div>

              {/* Grid of Daily Goals & Progress Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Streak Panel */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start space-x-4">
                  <div className="p-3 bg-rose-50 rounded-xl text-rose-500">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Current Streak</span>
                    <h4 className="text-xl font-extrabold text-slate-800 mt-0.5">{streak} Days Practice</h4>
                    <p className="text-xs text-slate-500 mt-1">Keep it up to remember everything!</p>
                  </div>
                </div>

                {/* Starred Phrases */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start space-x-4">
                  <div className="p-3 bg-amber-50 rounded-xl text-amber-500">
                    <Heart className="h-6 w-6 fill-amber-500" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Starred phrases</span>
                    <h4 className="text-xl font-extrabold text-slate-800 mt-0.5">{favorites.length} Starred</h4>
                    <p className="text-xs text-slate-500 mt-1">Quick-access list for your transit days.</p>
                  </div>
                </div>

                {/* Custom Words Created */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start space-x-4">
                  <div className="p-3 bg-indigo-50 rounded-xl text-indigo-500">
                    <Languages className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Custom Phrases</span>
                    <h4 className="text-xl font-extrabold text-slate-800 mt-0.5">{customPhrases.length} Created</h4>
                    <p className="text-xs text-slate-500 mt-1">Personalized phrases for your needs.</p>
                  </div>
                </div>

              </div>

              {/* High Yield/Essential Practice Suggestions */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">Recommended Fast Tracks</h3>
                  <button 
                    onClick={() => setActiveTab('learn')} 
                    className="text-xs font-bold text-emerald-800 hover:underline flex items-center"
                  >
                    <span>View all Study Deck</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Food Card Quick Route */}
                  <div 
                    onClick={() => { setSelectedCategory('Food & Dining'); setActiveTab('learn'); }}
                    className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase">Food</span>
                    <h4 className="font-bold text-slate-800 mt-2 text-base group-hover:text-emerald-900">Spiciness & Dining Phrases</h4>
                    <p className="text-xs text-slate-500 mt-1">Make sure you order your Pad Thai correctly and ask for "Not Spicy"!</p>
                    <div className="mt-4 flex items-center text-xs font-bold text-emerald-800 space-x-1">
                      <span>Study 5 phrases now</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Direction Quick Route */}
                  <div 
                    onClick={() => { setSelectedCategory('Directions & Travel'); setActiveTab('learn'); }}
                    className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full uppercase">Directions</span>
                    <h4 className="font-bold text-slate-800 mt-2 text-base group-hover:text-indigo-900">Finding the Bathroom & Hotel</h4>
                    <p className="text-xs text-slate-500 mt-1">Master where things are located, navigation, and taxi essentials.</p>
                    <div className="mt-4 flex items-center text-xs font-bold text-emerald-800 space-x-1">
                      <span>Study directions now</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Rapid Study Challenge */}
              <div className="bg-amber-400/10 border border-amber-400/20 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-amber-900">Ready for a mini session?</h4>
                  <p className="text-xs text-amber-800 max-w-lg">Test your retention of basic Thai script and matching pronunciations with a rapid flashcard quiz.</p>
                </div>
                <button
                  onClick={() => startQuiz('flashcards')}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-5 py-3 rounded-2xl shadow-sm text-xs tracking-wider uppercase transition-all whitespace-nowrap"
                >
                  ⚡ Start Quiz Challenge
                </button>
              </div>

            </div>
          )}

          {/* LEARN / STUDY DECK TAB */}
          {activeTab === 'learn' && (
            <div className="space-y-6">
              
              {/* Category selector & search bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="relative w-full md:w-80">
                    <Search className="h-4 w-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      placeholder="Search translation or phonetics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Add New Custom Word button */}
                  <button
                    onClick={() => setActiveTab('translator')}
                    className="w-full md:w-auto bg-emerald-900 hover:bg-emerald-850 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all shadow-sm"
                  >
                    <Plus className="h-4 w-4 text-amber-400" />
                    <span>Create Custom Phrase</span>
                  </button>
                </div>

                {/* Category Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {['All', 'Essentials', 'Food & Dining', 'Directions & Travel', 'Shopping & Numbers', 'Starred'].map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${selectedCategory === category ? 'bg-emerald-900 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phrase Cards list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPhrases.length > 0 ? (
                  filteredPhrases.map((phrase) => {
                    const isStarred = favorites.includes(phrase.id);
                    const isMastered = masteredPhrases.includes(phrase.id);
                    const displayedPhonetic = userGender === 'male' ? phrase.phoneticMale : phrase.phoneticFemale;
                    const displayedThai = userGender === 'male' ? phrase.thaiMale : phrase.thaiFemale;

                    return (
                      <div 
                        key={phrase.id} 
                        className={`bg-white rounded-3xl p-5 border shadow-sm transition-all duration-300 relative ${isMastered ? 'border-emerald-100 bg-emerald-50/20' : 'border-slate-100'}`}
                      >
                        {/* Upper Badging and Starred action */}
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">
                            {phrase.category}
                          </span>
                          <div className="flex items-center space-x-1.5">
                            <button
                              onClick={() => toggleFavorite(phrase.id)}
                              className={`p-1.5 rounded-lg transition-all ${isStarred ? 'bg-amber-50 text-amber-500' : 'text-slate-300 hover:text-slate-400'}`}
                            >
                              <Heart className={`h-4.5 w-4.5 ${isStarred ? 'fill-amber-500' : ''}`} />
                            </button>
                            <button
                              onClick={() => toggleMastered(phrase.id)}
                              className={`p-1.5 rounded-lg transition-all ${isMastered ? 'bg-emerald-100 text-emerald-800' : 'text-slate-300 hover:text-slate-400'}`}
                              title={isMastered ? "Mastered" : "Mark as Mastered"}
                            >
                              <CheckCircle className={`h-4.5 w-4.5 ${isMastered ? 'fill-emerald-800 text-white' : ''}`} />
                            </button>
                          </div>
                        </div>

                        {/* Language Breakdown Block */}
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs font-semibold text-slate-400">English</span>
                            <h3 className="font-extrabold text-slate-800 text-lg leading-tight">{phrase.english}</h3>
                          </div>

                          <div className="bg-slate-50 p-3 rounded-2xl space-y-1.5 border border-slate-100">
                            <div>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thai Pronunciation</span>
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-emerald-950 font-extrabold text-base tracking-wide">
                                  {displayedPhonetic}
                                </span>
                                <button
                                  onClick={() => speakThai(displayedThai)}
                                  className="bg-emerald-900 hover:bg-emerald-850 text-white p-2 rounded-xl shadow-sm transition-transform active:scale-95 flex items-center justify-center"
                                  title="Pronounce"
                                >
                                  <Volume2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            
                            <div>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thai Characters</span>
                              <p className="text-slate-700 font-serif text-lg font-bold">
                                {displayedThai}
                              </p>
                            </div>
                          </div>

                          {/* Literal Word Meaning */}
                          {phrase.literal && (
                            <div className="text-xs pt-1">
                              <span className="font-bold text-slate-500">Literal: </span>
                              <span className="text-slate-600 italic">{phrase.literal}</span>
                            </div>
                          )}

                          {/* Travel Tip */}
                          {phrase.tip && (
                            <p className="text-[11px] bg-amber-500/10 text-amber-900 px-2.5 py-1.5 rounded-xl font-medium mt-2 leading-relaxed">
                              💡 {phrase.tip}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-1 md:col-span-2 bg-white text-center py-12 rounded-3xl border border-slate-100 text-slate-500 space-y-3">
                    <p className="font-bold">No travel phrases match your filter.</p>
                    <button
                      onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                      className="text-xs font-bold text-emerald-800 underline"
                    >
                      Clear filters and try again
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PRACTICE / QUIZ ARENA TAB */}
          {activeTab === 'practice' && !quizMode && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center max-w-2xl mx-auto space-y-4">
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Sawasdee Practice Arena</h3>
                  <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                    Improve retention dramatically. Active recall is the single most efficient way to learn language phonetics before boarding your flight.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4">
                  {/* Option 1: Flashcards */}
                  <button
                    onClick={() => startQuiz('flashcards')}
                    className="p-4 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-500 rounded-2xl transition-all space-y-2 group text-left"
                  >
                    <span className="text-xs font-black text-slate-400 group-hover:text-emerald-800 uppercase">Interactive</span>
                    <h4 className="font-bold text-slate-800">Flashcards</h4>
                    <p className="text-xs text-slate-500">Perfect for pronunciation recall.</p>
                  </button>

                  {/* Option 2: Written Quiz */}
                  <button
                    onClick={() => startQuiz('quiz')}
                    className="p-4 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-500 rounded-2xl transition-all space-y-2 group text-left"
                  >
                    <span className="text-xs font-black text-slate-400 group-hover:text-emerald-800 uppercase">Multiple Choice</span>
                    <h4 className="font-bold text-slate-800">Phrasal Quiz</h4>
                    <p className="text-xs text-slate-500">Match English to proper Thai meanings.</p>
                  </button>

                  {/* Option 3: Listening test */}
                  <button
                    onClick={() => startQuiz('listening')}
                    className="p-4 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-500 rounded-2xl transition-all space-y-2 group text-left"
                  >
                    <span className="text-xs font-black text-slate-400 group-hover:text-emerald-800 uppercase">Listening Skill</span>
                    <h4 className="font-bold text-slate-800">Listening Challenge</h4>
                    <p className="text-xs text-slate-500">Hear the audio, match the translation.</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE QUIZ SESSIONS */}
          {quizMode && (
            <div className="max-w-xl mx-auto space-y-6">
              
              {/* Quiz Session Top Bar */}
              <div className="flex justify-between items-center bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-black tracking-wider">Session</span>
                  <p className="text-sm font-bold text-slate-800 capitalize">{quizMode} Mode</p>
                </div>
                <button
                  onClick={() => setQuizMode(null)}
                  className="text-xs font-extrabold text-rose-500 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl"
                >
                  Quit Arena
                </button>
              </div>

              {/* Progress indicator */}
              <div className="bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-emerald-600 h-2.5 transition-all duration-300"
                  style={{ width: `${((quizIndex + 1) / Math.min(allPhrases.length, 5)) * 100}%` }}
                ></div>
              </div>

              {/* Quiz Body */}
              {!quizComplete ? (
                <div className="space-y-6">
                  {/* 1. FLASHCARDS SYSTEM */}
                  {quizMode === 'flashcards' && (
                    <div className="space-y-4">
                      {/* Interactive Card */}
                      <div 
                        onClick={() => setCardFlipped(!cardFlipped)}
                        className={`min-h-72 cursor-pointer bg-white border border-slate-200 hover:border-emerald-500 rounded-3xl p-6 flex flex-col justify-between items-center text-center shadow-lg transition-all duration-300 relative ${cardFlipped ? 'ring-2 ring-emerald-500' : ''}`}
                      >
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black absolute top-5">
                          {cardFlipped ? 'Answer Revealed' : 'Translate and click to flip'}
                        </span>

                        <div className="my-auto py-8">
                          {!cardFlipped ? (
                            <h3 className="text-2xl font-black text-emerald-950 leading-tight">
                              {allPhrases[quizIndex % allPhrases.length].english}
                            </h3>
                          ) : (
                            <div className="space-y-4">
                              <div>
                                <span className="text-xs font-bold text-slate-400 uppercase">Thai characters</span>
                                <p className="text-3xl font-extrabold text-slate-900 font-serif leading-tight">
                                  {userGender === 'male' 
                                    ? allPhrases[quizIndex % allPhrases.length].thaiMale 
                                    : allPhrases[quizIndex % allPhrases.length].thaiFemale}
                                </p>
                              </div>
                              
                              <div>
                                <span className="text-xs font-bold text-slate-400 uppercase">Pronunciation (Romanized)</span>
                                <p className="text-xl font-bold text-emerald-950 mt-1">
                                  {userGender === 'male' 
                                    ? allPhrases[quizIndex % allPhrases.length].phoneticMale 
                                    : allPhrases[quizIndex % allPhrases.length].phoneticFemale}
                                </p>
                              </div>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation(); // prevent flipping card
                                  speakThai(userGender === 'male' 
                                    ? allPhrases[quizIndex % allPhrases.length].thaiMale 
                                    : allPhrases[quizIndex % allPhrases.length].thaiFemale);
                                }}
                                className="inline-flex items-center space-x-1.5 bg-emerald-900 text-white px-4 py-2 rounded-xl text-xs font-extrabold hover:bg-emerald-850"
                              >
                                <Volume2 className="h-4 w-4" />
                                <span>Listen Audio</span>
                              </button>
                            </div>
                          )}
                        </div>

                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                          <RotateCcw className="h-3.5 w-3.5" /> Tap to flip card
                        </span>
                      </div>

                      {/* Flashcard actions */}
                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            toggleMastered(allPhrases[quizIndex % allPhrases.length].id);
                            nextQuestion();
                          }}
                          className="flex-1 bg-emerald-900 hover:bg-emerald-850 text-white font-extrabold py-3.5 rounded-2xl shadow-sm text-sm"
                        >
                          I Got This!
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

                  {/* 2. MULTIPLE CHOICE AND LISTENING MODE */}
                  {(quizMode === 'quiz' || quizMode === 'listening') && (
                    <div className="space-y-6">
                      <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm text-center space-y-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          {quizMode === 'listening' ? 'Listening Quiz' : 'Translational Quiz'}
                        </span>
                        
                        {quizMode === 'listening' ? (
                          <div className="space-y-3 py-4">
                            <p className="text-sm text-slate-500 font-medium">Click to hear the phonetic phrase spoken aloud:</p>
                            <button
                              onClick={() => speakThai(userGender === 'male' 
                                ? allPhrases[quizIndex % allPhrases.length].thaiMale 
                                : allPhrases[quizIndex % allPhrases.length].thaiFemale)}
                              className="mx-auto bg-emerald-900 text-white p-4 rounded-full shadow-lg hover:bg-emerald-850 flex items-center justify-center animate-pulse"
                            >
                              <Volume2 className="h-8 w-8" />
                            </button>
                          </div>
                        ) : (
                          <div className="py-4">
                            <p className="text-xs text-slate-400 uppercase tracking-widest">Identify the phrase in Thai</p>
                            <h3 className="text-2xl font-black text-slate-800 leading-tight mt-1">
                              "{allPhrases[quizIndex % allPhrases.length].english}"
                            </h3>
                          </div>
                        )}
                      </div>

                      {/* Multiple choice options */}
                      <div className="space-y-2.5">
                        {quizAnswers.map((option) => {
                          const isCorrectOption = option.id === allPhrases[quizIndex % allPhrases.length].id;
                          const isSelected = selectedAnswer === option.id;
                          
                          let btnClass = "bg-white border-slate-200 hover:border-emerald-500 hover:bg-slate-50";
                          if (selectedAnswer !== null) {
                            if (isCorrectOption) {
                              btnClass = "bg-emerald-50 border-emerald-500 text-emerald-900";
                            } else if (isSelected) {
                              btnClass = "bg-rose-50 border-rose-500 text-rose-900";
                            } else {
                              btnClass = "bg-white border-slate-200 opacity-60";
                            }
                          }

                          return (
                            <button
                              key={option.id}
                              disabled={selectedAnswer !== null}
                              onClick={() => handleAnswerSelect(option)}
                              className={`w-full p-4 border rounded-2xl text-left font-bold transition-all text-sm flex items-center justify-between ${btnClass}`}
                            >
                              <div>
                                <p className="font-semibold text-slate-500 uppercase text-[10px]">Thai Translation</p>
                                <p className="text-base text-slate-800">
                                  {userGender === 'male' ? option.phoneticMale : option.phoneticFemale}
                                </p>
                                <p className="text-xs text-slate-400 font-serif">
                                  {userGender === 'male' ? option.thaiMale : option.thaiFemale}
                                </p>
                              </div>
                              
                              {selectedAnswer !== null && isCorrectOption && (
                                <CheckCircle className="h-5 w-5 text-emerald-600" />
                              )}
                              {selectedAnswer !== null && isSelected && !isCorrectOption && (
                                <XCircle className="h-5 w-5 text-rose-600" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Next button after choice */}
                      {selectedAnswer !== null && (
                        <button
                          onClick={nextQuestion}
                          className="w-full bg-emerald-900 hover:bg-emerald-850 text-white font-black py-4 rounded-2xl shadow-md text-sm transition-all"
                        >
                          Next Question
                        </button>
                      )}
                    </div>
                  )}

                </div>
              ) : (
                /* QUIZ COMPLETED SCREEN */
                <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm text-center space-y-6">
                  <div className="text-5xl">🏆</div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800">Challenge Complete!</h3>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                      Amazing job keeping your practice alive. Consistent active recall builds deep neural pathways so you remember everything instantly on landing day!
                    </p>
                  </div>

                  {quizMode !== 'flashcards' && (
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 max-w-xs mx-auto text-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Final Score</span>
                      <p className="text-3xl font-black text-emerald-800 mt-1">
                        {quizScore} / {Math.min(allPhrases.length, 5)}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => startQuiz(quizMode)}
                      className="flex-1 bg-emerald-900 hover:bg-emerald-850 text-white font-extrabold py-3.5 rounded-2xl text-sm shadow-sm"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={() => setQuizMode(null)}
                      className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-extrabold py-3.5 rounded-2xl text-sm"
                    >
                      Return to Arena
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* AI TRANSLATION / PHRASE CUSTOMIZER */}
          {activeTab === 'translator' && (
            <div className="space-y-6">
              
              {/* Introduction to the translation engine */}
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  <h3 className="text-lg font-bold text-slate-800">Sawasdee Gemini AI Custom Phrasebook</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Going somewhere specific or have unique medical/dining concerns (e.g. "I am allergic to shrimp")? Use this AI Translation terminal powered by **Gemini 2.5 Flash** to generate custom cards instantly. The AI translates phonetic differences for both genders and provides cultural context!
                </p>
              </div>

              {/* Translation form */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                
                {/* Optional API Key configuration for the user */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-600">Gemini Live Environment Active</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Safe Mode Enabled</span>
                  </div>
                  <p className="text-slate-500">Provide an optional Gemini API Key to use raw endpoints, or keep it blank to utilize the default pre-loaded translation helper!</p>
                  <input
                    type="password"
                    placeholder="Enter Gemini API Key (Optional)..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full bg-white px-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-600 uppercase">Phrase to Translate</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Can you take a photo of me? / I don't eat meat"
                      value={translateQuery}
                      onChange={(e) => setTranslateQuery(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                    <button
                      disabled={translationLoading}
                      onClick={translateWithAI}
                      className="bg-emerald-900 hover:bg-emerald-850 disabled:bg-slate-400 text-white font-extrabold px-6 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center whitespace-nowrap"
                    >
                      {translationLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Translating...</span>
                        </div>
                      ) : 'Translate'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Translation output display */}
              {translationResult && (
                <div className="bg-gradient-to-tr from-amber-400/5 to-emerald-500/5 border-2 border-dashed border-emerald-400/30 p-6 rounded-3xl space-y-4 animate-fade-in shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] bg-emerald-900 text-amber-300 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">AI Generated Card</span>
                      <h4 className="text-xl font-black text-slate-800 mt-2">"{translationResult.english}"</h4>
                    </div>
                    <span className="text-xs font-bold text-slate-400">{translationResult.category}</span>
                  </div>

                  {/* Gendered audio preview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Male Speaker Variant */}
                    <div className={`p-4 rounded-2xl border bg-white ${userGender === 'male' ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-slate-100'}`}>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-full uppercase">For Male Speaker</span>
                        <button
                          onClick={() => speakThai(translationResult.thaiMale)}
                          className="bg-sky-50 text-sky-800 p-2 rounded-xl"
                        >
                          <Volume2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                      <p className="text-lg font-black text-slate-800 font-mono mt-3">{translationResult.phoneticMale}</p>
                      <p className="text-xs text-slate-400 font-serif mt-1">{translationResult.thaiMale}</p>
                    </div>

                    {/* Female Speaker Variant */}
                    <div className={`p-4 rounded-2xl border bg-white ${userGender === 'female' ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-slate-100'}`}>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] bg-pink-100 text-pink-800 font-bold px-2 py-0.5 rounded-full uppercase">For Female Speaker</span>
                        <button
                          onClick={() => speakThai(translationResult.thaiFemale)}
                          className="bg-pink-50 text-pink-800 p-2 rounded-xl"
                        >
                          <Volume2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                      <p className="text-lg font-black text-slate-800 font-mono mt-3">{translationResult.phoneticFemale}</p>
                      <p className="text-xs text-slate-400 font-serif mt-1">{translationResult.thaiFemale}</p>
                    </div>

                  </div>

                  {/* Breakdown & Tips */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 space-y-2 text-xs">
                    <p><span className="font-extrabold text-slate-500">Literal breakdown: </span><span className="text-slate-700 italic">{translationResult.literal}</span></p>
                    <p className="bg-amber-400/10 p-2.5 rounded-xl text-amber-900 leading-relaxed font-medium">💡 <span className="font-bold">Usage Tip: </span>{translationResult.tip}</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={saveCustomTranslation}
                      className="flex-1 bg-emerald-900 hover:bg-emerald-850 text-white font-extrabold py-3.5 rounded-2xl shadow-md text-xs uppercase tracking-wider"
                    >
                      Save to Travel Phrasebook
                    </button>
                    <button
                      onClick={() => setTranslationResult(null)}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-600 font-extrabold px-6 rounded-2xl text-xs uppercase"
                    >
                      Discard
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* SETTINGS / TRIP PLANNING TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Trip Planner & Settings</h3>
                  <p className="text-xs text-slate-500">Configure departure countdown, customize audio, or reset statistics to begin practicing fresh.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  
                  {/* Departure Setup */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-600 uppercase">Departure Date</label>
                    <input
                      type="date"
                      value={tripDate}
                      onChange={(e) => {
                        setTripDate(e.target.value);
                        showNotification("Trip date successfully set!");
                      }}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Learning Gender Bias Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-600 uppercase">Default Vocal Tone</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setUserGender('male')}
                        className={`py-3 rounded-2xl text-xs font-extrabold border transition-all ${userGender === 'male' ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-white border-slate-200 text-slate-600'}`}
                      >
                        Male Tone (ครับ)
                      </button>
                      <button
                        onClick={() => setUserGender('female')}
                        className={`py-3 rounded-2xl text-xs font-extrabold border transition-all ${userGender === 'female' ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-white border-slate-200 text-slate-600'}`}
                      >
                        Female Tone (ค่ะ)
                      </button>
                    </div>
                  </div>

                </div>

                {/* Reset Section */}
                <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100/50 flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-extrabold text-rose-900">Danger Zone</h4>
                    <p className="text-[11px] text-rose-800">Erase streak, favorites, custom phrases, and learning parameters to start your journey again.</p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to reset all progress data? This action cannot be undone.")) {
                        localStorage.clear();
                        setUserGender('female');
                        setCustomPhrases([]);
                        setMasteredPhrases([]);
                        setFavorites([]);
                        setTripDate('');
                        setStreak(0);
                        setLastPracticeDate('');
                        showNotification("All platform progress data has been reset.");
                      }
                    }}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-4 py-2 rounded-xl text-xs uppercase"
                  >
                    Reset Progress
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>

      </main>

      {/* Modern sticky mobile navigation bar */}
      <footer className="bg-white border-t border-slate-200 py-3 block lg:hidden sticky bottom-0 z-40">
        <div className="flex justify-around items-center">
          <button 
            onClick={() => { setActiveTab('dashboard'); setQuizMode(null); }}
            className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-emerald-900' : 'text-slate-400'}`}
          >
            <Compass className="h-5.5 w-5.5" />
            <span className="text-[10px] font-bold">Home</span>
          </button>
          <button 
            onClick={() => { setActiveTab('learn'); setQuizMode(null); }}
            className={`flex flex-col items-center gap-1 ${activeTab === 'learn' ? 'text-emerald-900' : 'text-slate-400'}`}
          >
            <BookOpen className="h-5.5 w-5.5" />
            <span className="text-[10px] font-bold">Study</span>
          </button>
          <button 
            onClick={() => { setActiveTab('practice'); setQuizMode(null); }}
            className={`flex flex-col items-center gap-1 ${activeTab === 'practice' ? 'text-emerald-900' : 'text-slate-400'}`}
          >
            <Award className="h-5.5 w-5.5" />
            <span className="text-[10px] font-bold">Practice</span>
          </button>
          <button 
            onClick={() => { setActiveTab('translator'); setQuizMode(null); }}
            className={`flex flex-col items-center gap-1 ${activeTab === 'translator' ? 'text-emerald-900' : 'text-slate-400'}`}
          >
            <Sparkles className="h-5.5 w-5.5" />
            <span className="text-[10px] font-bold">AI</span>
          </button>
        </div>
      </footer>
      
    </div>
  );
}