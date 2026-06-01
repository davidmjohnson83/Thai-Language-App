import { useState, useCallback, useEffect } from 'react';
import { Award, Volume2, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

const MAX_QUIZ_QUESTIONS = 5;

export default function PracticeArena({ allPhrases, userGender, currentUser, speakThai, onToggleMastered, updateStreak, showNotification, requestedMode, onConsumeRequestedMode }) {
  const [quizMode,       setQuizMode]       = useState(null);
  const [quizIndex,      setQuizIndex]      = useState(0);
  const [quizScore,      setQuizScore]      = useState(0);
  const [quizAnswers,    setQuizAnswers]    = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [quizComplete,   setQuizComplete]   = useState(false);
  const [cardFlipped,    setCardFlipped]    = useState(false);

  // Auto-start when Dashboard navigates here with a requested mode
  useEffect(() => {
    if (requestedMode) {
      startQuiz(requestedMode);
      onConsumeRequestedMode();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedMode]);

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

  // ── Mode picker (no active session) ─────────────────────────────────────
  if (!quizMode) {
    return (
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
    );
  }

  // ── Active quiz session ──────────────────────────────────────────────────
  return (
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

          {/* ── Flashcards ── */}
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
                  onClick={() => { onToggleMastered(allPhrases[quizIndex % allPhrases.length].id); nextQuestion(); }}
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

          {/* ── Quiz / Listening ── */}
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
                    if (isCorrectOption)      cls = 'bg-emerald-50 border-emerald-500 text-emerald-900';
                    else if (isSelected)      cls = 'bg-rose-50 border-rose-500 text-rose-900';
                    else                      cls = 'bg-white border-slate-200 opacity-50';
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
        /* Quiz complete screen */
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
  );
}
