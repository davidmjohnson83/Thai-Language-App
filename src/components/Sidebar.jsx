import { Compass, BookOpen, Award, Settings, Calendar, ChevronRight, MessageCircle } from 'lucide-react';
import { Sparkles } from 'lucide-react';

const NAV_ITEMS = [
  { tab: 'dashboard',     icon: Compass,         label: 'Dashboard'         },
  { tab: 'learn',         icon: BookOpen,        label: 'Study Deck'        },
  { tab: 'practice',      icon: Award,           label: 'Practice Arena'    },
  { tab: 'translator',    icon: Sparkles,        label: 'AI Translator'     },
  { tab: 'conversation',  icon: MessageCircle,   label: 'Conversation Mode' },
  { tab: 'settings',      icon: Settings,        label: 'Trip Settings'     },
];

export default function Sidebar({ activeTab, navTo, getDaysToTrip, tripDate, masteryPct, masteredCount, totalPhrases }) {
  const daysToTrip = getDaysToTrip();

  return (
    <div className="space-y-5 lg:col-span-1">

      {/* Navigation menu */}
      <nav className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-1">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-3 mb-3">Menu</p>
        {NAV_ITEMS.map(({ tab, icon: Icon, label }) => (
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

      {/* Trip countdown */}
      <div className="bg-gradient-to-br from-indigo-950 to-indigo-900 text-white rounded-3xl p-5 shadow-md relative overflow-hidden border border-indigo-800">
        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4 pointer-events-none">
          <Calendar className="h-32 w-32" />
        </div>
        <h3 className="text-xs font-bold tracking-widest uppercase text-indigo-300">Thailand Trip</h3>
        {daysToTrip !== null ? (
          <div className="mt-2">
            <p className="text-4xl font-extrabold text-amber-400 tracking-tight">{daysToTrip}</p>
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

      {/* Mastery progress ring */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 text-center">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mastery Progress</h4>
        <div className="relative inline-flex items-center justify-center mt-4">
          <div className="w-24 h-24 rounded-full border-8 border-slate-100 flex items-center justify-center">
            <span className="text-xl font-black text-emerald-900">{masteryPct}%</span>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-3 font-medium">
          <span className="font-bold text-emerald-800">{masteredCount}</span> of <span className="font-bold">{totalPhrases}</span> phrases mastered
        </p>
      </div>

    </div>
  );
}
