import { USERS } from '../data/constants';

export default function TripSettings({ tripDate, setTripDate, activeUser, setActiveUser, getDaysToTrip, allPhrases, masteredPhrases, favorites, customPhrases, streak, onReset, showNotification }) {
  return (
    <div className="space-y-5">

      {/* Main settings panel */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Trip Planner & Settings</h3>
          <p className="text-sm text-slate-500 mt-1">Set your departure date, manage user profiles, and configure your learning preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">

          {/* Departure date picker */}
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
                {getDaysToTrip()} days until departure —{' '}
                {getDaysToTrip() > 100
                  ? 'plenty of time to master all phrases! 📚'
                  : getDaysToTrip() > 30
                  ? 'time to practice every day! 🔥'
                  : 'final countdown — study hard! ✈️'}
              </p>
            )}
          </div>

          {/* Active user switcher */}
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
            { label: 'Total Phrases', value: allPhrases.length      },
            { label: 'Mastered',       value: masteredPhrases.length },
            { label: 'Starred',        value: favorites.length       },
            { label: 'Custom Created', value: customPhrases.length   },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-2xl font-black text-emerald-900">{value}</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Danger zone */}
        <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
          <div>
            <h4 className="text-xs font-extrabold text-rose-900">Reset All Progress</h4>
            <p className="text-[11px] text-rose-700 mt-0.5">Clears streak, starred, mastered, and custom phrases. Cannot be undone.</p>
          </div>
          <button
            onClick={onReset}
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
  );
}
