import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, MessageCircle, Trash2, CheckCircle } from 'lucide-react';

export default function ConversationMode({ geminiApiKey, showNotification, currentUser }) {
  const [messages, setMessages]     = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isThinking, setIsThinking]   = useState(false);

  const recognitionRef = useRef(null);
  const messagesEndRef  = useRef(null);
  const messagesRef     = useRef([]);

  // Keep ref in sync so the speech recognition callback always sees latest messages
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const sendToAI = async (userText, priorMessages) => {
    if (!geminiApiKey) {
      showNotification('Add VITE_GEMINI_API_KEY to your .env file to enable Conversation Mode.');
      return;
    }
    setIsThinking(true);

    const systemPrompt = `You are a friendly Thai local in a real-world scenario helping an English-speaking tourist practice conversational Thai situations. Respond naturally and briefly (1-2 sentences) as a Thai person would — as a market vendor, taxi driver, restaurant staff, shop owner, hotel receptionist, or similar. Always reply in English only. Be warm, realistic, and keep it short.`;

    // Build multi-turn conversation history for context
    const contents = priorMessages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));
    contents.push({ role: 'user', parts: [{ text: userText }] });

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;
      const payload = {
        contents,
        systemInstruction: { parts: [{ text: systemPrompt }] },
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!replyText) throw new Error('Empty response');

      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: replyText.trim(), id: Date.now() + 1 },
      ]);
    } catch (err) {
      console.error(err);
      showNotification('AI response failed. Check your API key and internet connection.');
    } finally {
      setIsThinking(false);
    }
  };

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showNotification('Speech recognition is not supported in this browser. Try Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsRecording(true);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      const prior = messagesRef.current; // snapshot before state update
      setMessages(prev => [...prev, { role: 'user', text, id: Date.now() }]);
      sendToAI(text, prior);
    };

    recognition.onerror = (event) => {
      if (event.error !== 'aborted') {
        showNotification(`Microphone error: ${event.error}. Please try again.`);
      }
      setIsRecording(false);
    };

    recognition.onend = () => setIsRecording(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
  };

  const userName = currentUser?.name || 'You';

  return (
    <div className="space-y-5">

      {/* Header card */}
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-800">Conversation Mode</h3>
          </div>
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear
            </button>
          )}
        </div>
        <p className="text-sm text-slate-500 leading-relaxed">
          Practice real Thai conversations. Press the mic, speak in English, and an AI Thai local will respond.
          Try ordering food, haggling at the market, or asking for directions!
        </p>
      </div>

      {/* API key warning */}
      {!geminiApiKey && (
        <div className="bg-amber-50 border border-amber-200 px-4 py-3 rounded-2xl text-xs space-y-1">
          <p className="font-bold text-amber-900">⚠️ API key not configured</p>
          <p className="text-amber-800">
            Add your Gemini API key to the <code className="font-mono">.env</code> file in the project root:
          </p>
          <pre className="bg-white border border-amber-200 rounded-lg px-3 py-2 font-mono text-[11px] text-slate-700 overflow-x-auto">
            VITE_GEMINI_API_KEY=your_key_here
          </pre>
        </div>
      )}

      {geminiApiKey && (
        <div className="bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-2xl flex items-center gap-2 text-xs">
          <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
          <span className="font-semibold text-emerald-800">Gemini API key loaded — ready to chat</span>
        </div>
      )}

      {/* Chat + mic */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">

        {/* Message list */}
        <div
          className="flex-1 overflow-y-auto p-5 space-y-4"
          style={{ minHeight: '360px', maxHeight: '420px' }}
        >
          {messages.length === 0 && !isThinking ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 space-y-3">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-emerald-300" />
              </div>
              <p className="text-slate-500 font-medium text-sm">Press the mic and start talking</p>
              <p className="text-slate-400 text-xs max-w-xs">
                Try: <span className="italic">"Hello"</span>, <span className="italic">"How much is this?"</span>, or <span className="italic">"Can I get a table for two?"</span>
              </p>
            </div>
          ) : (
            <>
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-[80%] space-y-1">
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${
                      msg.role === 'user' ? 'text-right text-emerald-600' : 'text-slate-400'
                    }`}>
                      {msg.role === 'user' ? userName : 'Thai Local'}
                    </p>
                    <div className={`px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-sm'
                        : 'bg-slate-100 text-slate-800 rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Thai Local</p>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-slate-100">
                      <div className="flex gap-1 items-center h-4">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Mic button */}
        <div className="border-t border-slate-100 p-6 flex flex-col items-center gap-3">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isThinking}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600 scale-110 ring-4 ring-red-200 animate-pulse'
                : isThinking
                ? 'bg-slate-200 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 hover:scale-105 active:scale-95'
            }`}
          >
            {isRecording
              ? <MicOff className="h-7 w-7 text-white" />
              : <Mic className="h-7 w-7 text-white" />
            }
          </button>
          <p className="text-xs text-slate-400 font-medium">
            {isRecording ? 'Listening… tap to stop' : isThinking ? 'Thinking…' : 'Tap to speak'}
          </p>
        </div>

      </div>
    </div>
  );
}
