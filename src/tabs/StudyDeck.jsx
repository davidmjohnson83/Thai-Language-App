import { Search, Plus } from 'lucide-react';
import PhraseCard from '../components/PhraseCard';

const CATEGORIES = ['All', 'Essentials', 'Food & Dining', 'Directions & Travel', 'Shopping & Numbers', 'Social & Culture', 'Starred'];

export default function StudyDeck({ filteredPhrases, selectedCategory, onSetCategory, searchQuery, onSetSearch, userGender, currentUser, favorites, masteredPhrases, onToggleFavorite, onToggleMastered, speakThai, navTo }) {
  return (
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
              onChange={e => onSetSearch(e.target.value)}
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
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => onSetCategory(cat)}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                selectedCategory === cat ? 'bg-emerald-900 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Phrase card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPhrases.length > 0 ? (
          filteredPhrases.map(phrase => (
            <PhraseCard
              key={phrase.id}
              phrase={phrase}
              userGender={userGender}
              currentUser={currentUser}
              isStarred={favorites.includes(phrase.id)}
              isMastered={masteredPhrases.includes(phrase.id)}
              onToggleFavorite={onToggleFavorite}
              onToggleMastered={onToggleMastered}
              onSpeak={speakThai}
            />
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 bg-white text-center py-12 rounded-3xl border border-slate-100 text-slate-500 space-y-3">
            <p className="font-bold">No phrases match your filter.</p>
            <button
              onClick={() => { onSetCategory('All'); onSetSearch(''); }}
              className="text-xs font-bold text-emerald-800 underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
