import { useState } from 'react';
import { Sparkles, Volume2, CheckCircle } from 'lucide-react';

export default function AITranslator({ geminiApiKey, activeUser, speakThai, onSavePhrase, showNotification }) {
  const [translateQuery,    setTranslateQuery]    = useState('');
  const [translationResult, setTranslationResult] = useState(null);
  const [translationLoading, setTranslationLoading] = useState(false);

  const translateWithAI = async () => {
    if (!translateQuery.trim()) return;
    if (!geminiApiKey) {
      showNotification('Add VITE_GEMINI_API_KEY to your .env file to enable AI translation.');
      return;
    }
    setTranslationLoading(true);
    setTranslationResult(null);

    const systemPrompt = `You are a native Thai language translator. Translate English travel phrases into natural, conversational Thai optimised for travelers visiting Thailand.
Respond only with a raw JSON object — no markdown or extra text — with these exact keys:
"thaiScript": Thai characters only,
"phoneticMale": Romanized phonetics with male particle 'khrap',
"phoneticFemale": Romanized phonetics with female particle 'ka',
"thaiMale": Thai script with ครับ,
"thaiFemale": Thai script with ค่ะ,
"literal": Word-by-word English breakdown,
"category": One of: Essentials, Food & Dining, Directions & Travel, Shopping & Numbers, Social & Culture,
"tip": Short cultural/practical travel tip.`;

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;
      const payload = {
        contents: [{ parts: [{ text: `Translate: "${translateQuery}"` }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: { responseMimeType: 'application/json' },
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error('Empty response');

      const result = JSON.parse(rawText);
      setTranslationResult({ id: `custom_${Date.now()}`, english: translateQuery, ...result });
      showNotification('✅ Translation ready!');
    } catch (err) {
      console.error(err);
      showNotification('Translation failed. Check your API key and internet connection.');
    } finally {
      setTranslationLoading(false);
    }
  };

  const saveCustomTranslation = () => {
    if (!translationResult) return;
    onSavePhrase(translationResult);
    setTranslationResult(null);
    setTranslateQuery('');
  };

  return (
    <div className="space-y-5">

      {/* Description card */}
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-2">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <h3 className="text-lg font-bold text-slate-800">AI Custom Phrasebook</h3>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed">
          Powered by <strong>Gemini 2.5 Flash</strong>. Translate any phrase — food allergies, flight requests, specific questions — and save it directly to your phrasebook with full male/female variants and cultural tips.
        </p>
      </div>

      {/* Input card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5">

        {/* API key status */}
        {geminiApiKey ? (
          <div className="bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-2xl flex items-center gap-2 text-xs">
            <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
            <span className="font-semibold text-emerald-800">Gemini API key loaded from <code className="font-mono">.env</code></span>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 px-4 py-3 rounded-2xl text-xs space-y-1">
            <p className="font-bold text-amber-900">⚠️ API key not configured</p>
            <p className="text-amber-800">
              Add your key to the <code className="font-mono">.env</code> file in the project root:
            </p>
            <pre className="bg-white border border-amber-200 rounded-lg px-3 py-2 font-mono text-[11px] text-slate-700 overflow-x-auto">VITE_GEMINI_API_KEY=your_key_here</pre>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-bold text-emerald-700 hover:underline mt-1"
            >
              Get a free key at aistudio.google.com →
            </a>
          </div>
        )}

        {/* Phrase input */}
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-slate-600 uppercase tracking-wide">Phrase to Translate</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="e.g. Do you have vegetarian options? / I need a doctor."
              value={translateQuery}
              onChange={e => setTranslateQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && translateWithAI()}
              className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <button
              disabled={translationLoading || !translateQuery.trim()}
              onClick={translateWithAI}
              className="bg-emerald-900 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-extrabold px-6 py-3 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {translationLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Translating…</span>
                </>
              ) : 'Translate'}
            </button>
          </div>
        </div>

      </div>

      {/* Translation result card */}
      {translationResult && (
        <div className="bg-gradient-to-tr from-amber-400/5 to-emerald-500/5 border-2 border-dashed border-emerald-400/30 p-6 rounded-3xl space-y-4 shadow-sm">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div>
              <span className="text-[10px] bg-emerald-900 text-amber-300 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">AI Generated</span>
              <h4 className="text-xl font-black text-slate-800 mt-2">"{translationResult.english}"</h4>
            </div>
            <span className="text-xs font-bold text-slate-400">{translationResult.category}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* David (Male) */}
            <div className={`p-4 rounded-2xl border bg-white ${activeUser === 'david' ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-slate-100'}`}>
              <div className="flex justify-between items-start">
                <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-full uppercase">🧔 David (Male)</span>
                <button onClick={() => speakThai(translationResult.thaiMale)} className="bg-sky-50 text-sky-700 p-2 rounded-xl hover:bg-sky-100 transition-colors">
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
              <p className="text-lg font-black text-slate-800 font-mono mt-3">{translationResult.phoneticMale}</p>
              <p className="text-sm text-slate-500 thai-script mt-1">{translationResult.thaiMale}</p>
            </div>

            {/* Lynsie (Female) */}
            <div className={`p-4 rounded-2xl border bg-white ${activeUser === 'lynsie' ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-slate-100'}`}>
              <div className="flex justify-between items-start">
                <span className="text-[10px] bg-pink-100 text-pink-800 font-bold px-2 py-0.5 rounded-full uppercase">👩 Lynsie (Female)</span>
                <button onClick={() => speakThai(translationResult.thaiFemale)} className="bg-pink-50 text-pink-700 p-2 rounded-xl hover:bg-pink-100 transition-colors">
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
              <p className="text-lg font-black text-slate-800 font-mono mt-3">{translationResult.phoneticFemale}</p>
              <p className="text-sm text-slate-500 thai-script mt-1">{translationResult.thaiFemale}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 space-y-2 text-xs">
            <p><span className="font-extrabold text-slate-500">Literal: </span><span className="italic text-slate-700">{translationResult.literal}</span></p>
            <p className="bg-amber-400/10 p-2.5 rounded-xl text-amber-900 leading-relaxed font-medium">💡 <strong>Tip:</strong> {translationResult.tip}</p>
          </div>

          <div className="flex gap-3">
            <button onClick={saveCustomTranslation} className="flex-1 bg-emerald-900 hover:bg-emerald-800 text-white font-extrabold py-3.5 rounded-2xl shadow-md text-xs uppercase tracking-wider">
              Save to Phrasebook
            </button>
            <button onClick={() => setTranslationResult(null)} className="bg-slate-200 hover:bg-slate-300 text-slate-600 font-extrabold px-6 rounded-2xl text-xs uppercase">
              Discard
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
