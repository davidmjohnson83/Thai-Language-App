import { Compass, User } from 'lucide-react';
import { USERS } from '../data/constants';

export default function AppHeader({ activeUser, onSwitchUser, streak, showNotification }) {
  return (
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

        {/* User profile switcher + streak badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 bg-white/10 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
          <span className="text-xs font-semibold px-2 text-teal-100 flex items-center gap-1">
            <User className="h-3.5 w-3.5" /> Studying as:
          </span>
          {USERS.map(user => (
            <button
              key={user.id}
              onClick={() => {
                onSwitchUser(user.id);
                showNotification(`Switched to ${user.name} — ${user.gender === 'male' ? 'ครับ' : 'ค่ะ'} mode!`);
              }}
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
  );
}
