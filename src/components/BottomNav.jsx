import { Compass, BookOpen, Award, Settings } from 'lucide-react';
import { Sparkles } from 'lucide-react';

const NAV_ITEMS = [
  { tab: 'dashboard',  icon: Compass,  label: 'Home'     },
  { tab: 'learn',      icon: BookOpen, label: 'Study'    },
  { tab: 'practice',   icon: Award,    label: 'Practice' },
  { tab: 'translator', icon: Sparkles, label: 'AI'       },
  { tab: 'settings',   icon: Settings, label: 'Settings' },
];

export default function BottomNav({ activeTab, navTo }) {
  return (
    <footer className="bg-white border-t border-slate-200 py-2 safe-bottom block lg:hidden sticky bottom-0 z-40 shadow-t">
      <div className="flex justify-around items-center max-w-sm mx-auto">
        {NAV_ITEMS.map(({ tab, icon: Icon, label }) => (
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
  );
}
