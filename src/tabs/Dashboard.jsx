import { Sparkles, Volume2, TrendingUp, Heart, Languages, ChevronRight, ArrowRight, AlertTriangle } from 'lucide-react';

export default function Dashboard({ streak, favoritesCount, customCount, currentUser, userGender, speakThai, onSetCategory, navTo, onRequestPractice }) {
  return (
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
            <h4 className="text-xl font-extrabold text-slate-800 mt-0.5">{favoritesCount} Phrases</h4>
            <p className="text-xs text-slate-500 mt-1">Quick-access list</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start space-x-4">
          <div className="p-3 bg-indigo-50 rounded-xl text-indigo-500 shrink-0"><Languages className="h-6 w-6" /></div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Custom</span>
            <h4 className="text-xl font-extrabold text-slate-800 mt-0.5">{customCount} Created</h4>
            <p className="text-xs text-slate-500 mt-1">Personalised phrases</p>
          </div>
        </div>
      </div>

      {/* Recommended study tracks */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Recommended Study Tracks</h3>
          <button onClick={() => navTo('learn')} className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1">
            View all <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { category: 'Food & Dining',       emoji: '🍜', desc: 'Order safely: spice levels, shellfish allergy phrases, and more.',      color: 'hover:border-orange-400 hover:shadow-orange-100' },
            { category: 'Directions & Travel', emoji: '🗺️', desc: 'Find the bathroom, navigate taxis, and master key locations.',          color: 'hover:border-indigo-400 hover:shadow-indigo-100' },
            { category: 'Social & Culture',    emoji: '🙏', desc: 'Wai etiquette, temple customs, and how to make a great impression.',    color: 'hover:border-amber-400 hover:shadow-amber-100'  },
          ].map(({ category, emoji, desc, color }) => (
            <div
              key={category}
              onClick={() => { onSetCategory(category); navTo('learn'); }}
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

      {/* Shellfish allergy alert banner */}
      <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-red-800">Shellfish Allergy Reminder</p>
          <p className="text-xs text-red-700 mt-0.5 leading-relaxed">
            Thai cuisine frequently uses shrimp paste (กะปิ) as an invisible base ingredient. Always carry a printed Thai allergy card and study the shellfish phrases before dining out.
          </p>
        </div>
      </div>

      {/* Flashcard quick-start CTA */}
      <div className="bg-amber-400/10 border border-amber-400/20 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-amber-900">Ready for a quick challenge?</h4>
          <p className="text-xs text-amber-800 max-w-lg mt-1">Active recall is the fastest way to make phrases stick before your flight.</p>
        </div>
        <button
          onClick={() => onRequestPractice('flashcards')}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-5 py-3 rounded-2xl shadow-sm text-xs tracking-wider uppercase transition-all whitespace-nowrap"
        >
          ⚡ Start Flashcards
        </button>
      </div>

    </div>
  );
}
