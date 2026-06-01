import { useState, useEffect, useCallback } from 'react';
import { USERS, INITIAL_PHRASES } from './data/constants';

import Notification  from './components/Notification';
import AppHeader     from './components/AppHeader';
import Sidebar       from './components/Sidebar';
import BottomNav     from './components/BottomNav';

import Dashboard        from './tabs/Dashboard';
import StudyDeck        from './tabs/StudyDeck';
import PracticeArena    from './tabs/PracticeArena';
import AITranslator     from './tabs/AITranslator';
import TripSettings     from './tabs/TripSettings';
import ConversationMode from './tabs/ConversationMode';

export default function App() {
  // ── User state ──────────────────────────────────────────────────────────
  const [activeUser, setActiveUser] = useState(() => localStorage.getItem('thai_active_user') || 'david');
  const currentUser = USERS.find(u => u.id === activeUser) || USERS[0];
  const userGender  = currentUser.gender;

  // ── Phrase & progress state ─────────────────────────────────────────────
  const [customPhrases,   setCustomPhrases]   = useState(() => JSON.parse(localStorage.getItem('thai_custom_phrases')   || '[]'));
  const [masteredPhrases, setMasteredPhrases] = useState(() => JSON.parse(localStorage.getItem('thai_mastered_phrases') || '[]'));
  const [favorites,       setFavorites]       = useState(() => JSON.parse(localStorage.getItem('thai_favorites')        || '[]'));

  // ── Trip & streak state ─────────────────────────────────────────────────
  const [tripDate,         setTripDate]         = useState(() => localStorage.getItem('thai_trip_date')           || '');
  const [streak,           setStreak]           = useState(() => parseInt(localStorage.getItem('thai_streak') || '0', 10));
  const [lastPracticeDate, setLastPracticeDate] = useState(() => localStorage.getItem('thai_last_practice_date') || '');

  // ── Navigation & filter state ───────────────────────────────────────────
  const [activeTab,        setActiveTab]        = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery,      setSearchQuery]      = useState('');

  // ── UI state ────────────────────────────────────────────────────────────
  const [notification,   setNotification]   = useState(null);
  const [speechSupported, setSpeechSupported] = useState(true);

  // Bridge: Dashboard "Start Flashcards" → PracticeArena auto-start
  const [requestedPracticeMode, setRequestedPracticeMode] = useState(null);

  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // ── Derived state ───────────────────────────────────────────────────────
  const allPhrases = [...INITIAL_PHRASES, ...customPhrases];

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

  // ── Persist to localStorage ─────────────────────────────────────────────
  useEffect(() => { localStorage.setItem('thai_active_user',         activeUser);                     }, [activeUser]);
  useEffect(() => { localStorage.setItem('thai_custom_phrases',      JSON.stringify(customPhrases));   }, [customPhrases]);
  useEffect(() => { localStorage.setItem('thai_mastered_phrases',    JSON.stringify(masteredPhrases)); }, [masteredPhrases]);
  useEffect(() => { localStorage.setItem('thai_favorites',           JSON.stringify(favorites));       }, [favorites]);
  useEffect(() => { localStorage.setItem('thai_trip_date',           tripDate);                        }, [tripDate]);
  useEffect(() => {
    localStorage.setItem('thai_streak',              streak.toString());
    localStorage.setItem('thai_last_practice_date',  lastPracticeDate);
  }, [streak, lastPracticeDate]);

  useEffect(() => {
    if (!('speechSynthesis' in window)) setSpeechSupported(false);
  }, []);

  // ── Core helper functions ───────────────────────────────────────────────
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

  const handleSavePhrase = useCallback((phrase) => {
    setCustomPhrases(prev => [phrase, ...prev]);
    showNotification('✅ Saved to your Travel Phrasebook!');
  }, [showNotification]);

  const navTo = (tab) => setActiveTab(tab);

  const handleRequestPractice = (mode) => {
    setRequestedPracticeMode(mode);
    navTo('practice');
  };

  const handleReset = () => {
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
  };

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased">

      <Notification message={notification} />

      <AppHeader
        activeUser={activeUser}
        onSwitchUser={setActiveUser}
        streak={streak}
        showNotification={showNotification}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">

        <Sidebar
          activeTab={activeTab}
          navTo={navTo}
          getDaysToTrip={getDaysToTrip}
          tripDate={tripDate}
          masteryPct={masteryPct}
          masteredCount={masteredPhrases.length}
          totalPhrases={allPhrases.length}
        />

        <div className="lg:col-span-3 space-y-6">

          {activeTab === 'dashboard' && (
            <Dashboard
              streak={streak}
              favoritesCount={favorites.length}
              customCount={customPhrases.length}
              currentUser={currentUser}
              userGender={userGender}
              speakThai={speakThai}
              onSetCategory={setSelectedCategory}
              navTo={navTo}
              onRequestPractice={handleRequestPractice}
            />
          )}

          {activeTab === 'learn' && (
            <StudyDeck
              filteredPhrases={filteredPhrases}
              selectedCategory={selectedCategory}
              onSetCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSetSearch={setSearchQuery}
              userGender={userGender}
              currentUser={currentUser}
              favorites={favorites}
              masteredPhrases={masteredPhrases}
              onToggleFavorite={toggleFavorite}
              onToggleMastered={toggleMastered}
              speakThai={speakThai}
              navTo={navTo}
            />
          )}

          {activeTab === 'practice' && (
            <PracticeArena
              allPhrases={allPhrases}
              userGender={userGender}
              currentUser={currentUser}
              speakThai={speakThai}
              onToggleMastered={toggleMastered}
              updateStreak={updateStreak}
              showNotification={showNotification}
              requestedMode={requestedPracticeMode}
              onConsumeRequestedMode={() => setRequestedPracticeMode(null)}
            />
          )}

          {activeTab === 'translator' && (
            <AITranslator
              geminiApiKey={geminiApiKey}
              activeUser={activeUser}
              speakThai={speakThai}
              onSavePhrase={handleSavePhrase}
              showNotification={showNotification}
            />
          )}

          {activeTab === 'conversation' && (
            <ConversationMode
              geminiApiKey={geminiApiKey}
              showNotification={showNotification}
              currentUser={currentUser}
            />
          )}

          {activeTab === 'settings' && (
            <TripSettings
              tripDate={tripDate}
              setTripDate={setTripDate}
              activeUser={activeUser}
              setActiveUser={setActiveUser}
              getDaysToTrip={getDaysToTrip}
              allPhrases={allPhrases}
              masteredPhrases={masteredPhrases}
              favorites={favorites}
              customPhrases={customPhrases}
              streak={streak}
              onReset={handleReset}
              showNotification={showNotification}
            />
          )}

        </div>
      </main>

      <BottomNav activeTab={activeTab} navTo={navTo} />

    </div>
  );
}
