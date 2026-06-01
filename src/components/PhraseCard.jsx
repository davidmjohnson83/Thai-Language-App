import { useState } from 'react';
import { Heart, CheckCircle, Volume2, ChevronDown, ChevronUp } from 'lucide-react';
import { CATEGORY_COLORS } from '../data/constants';
import { WORD_BREAKDOWNS } from '../data/wordBreakdowns';

export default function PhraseCard({ phrase, userGender, currentUser, isStarred, isMastered, onToggleFavorite, onToggleMastered, onSpeak }) {
  const phonetic      = userGender === 'male' ? phrase.phoneticMale  : phrase.phoneticFemale;
  const thaiDisplay   = userGender === 'male' ? phrase.thaiMale      : phrase.thaiFemale;
  const catColor      = CATEGORY_COLORS[phrase.category] || { bg: 'bg-slate-100', text: 'text-slate-600' };
  const wordBreakdown = WORD_BREAKDOWNS[phrase.id] ?? null;
  const [showBreakdown, setShowBreakdown] = useState(false);

  return (
    <div className={`bg-white rounded-3xl p-5 border shadow-sm transition-all duration-300 ${isMastered ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-100'}`}>

      {/* Card header: category badge + action buttons */}
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[10px] ${catColor.bg} ${catColor.text} font-bold px-2 py-0.5 rounded-full`}>
          {phrase.category}
        </span>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onToggleFavorite(phrase.id)}
            className={`p-1.5 rounded-lg transition-all ${isStarred ? 'bg-amber-50 text-amber-500' : 'text-slate-300 hover:text-slate-400'}`}
            title={isStarred ? 'Unstar' : 'Star phrase'}
          >
            <Heart className={`h-4 w-4 ${isStarred ? 'fill-amber-500' : ''}`} />
          </button>
          <button
            onClick={() => onToggleMastered(phrase.id)}
            className={`p-1.5 rounded-lg transition-all ${isMastered ? 'bg-emerald-100 text-emerald-800' : 'text-slate-300 hover:text-slate-400'}`}
            title={isMastered ? 'Unmark mastered' : 'Mark as mastered'}
          >
            <CheckCircle className={`h-4 w-4 ${isMastered ? 'fill-emerald-700 text-white' : ''}`} />
          </button>
        </div>
      </div>

      {/* Card body: English, phonetics, Thai script, literal, tip */}
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
                onClick={() => onSpeak(thaiDisplay)}
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

        {wordBreakdown && (
          <div className="pt-1">
            <button
              onClick={() => setShowBreakdown(prev => !prev)}
              className="flex items-center gap-1 text-[10px] font-bold text-indigo-500 uppercase tracking-widest hover:text-indigo-700 transition-colors"
            >
              {showBreakdown ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              Word Breakdown
            </button>
            {showBreakdown && (
              <div className="flex flex-wrap gap-2 mt-2">
                {wordBreakdown.map((w, i) => (
                  <div
                    key={i}
                    className="text-center bg-indigo-50 border border-indigo-100 rounded-xl px-2.5 py-1.5 min-w-[56px]"
                  >
                    <p className="font-mono text-[11px] font-bold text-indigo-700 leading-tight">{w.phonetic}</p>
                    <p className="text-xs font-bold text-slate-600 thai-script leading-tight">{w.thai}</p>
                    <p className="text-[10px] text-slate-400 italic leading-tight mt-0.5">{w.meaning}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
