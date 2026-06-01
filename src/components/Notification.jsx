import { Sparkles } from 'lucide-react';

export default function Notification({ message }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-20 left-4 right-4 md:bottom-6 md:right-6 md:left-auto bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl z-50 flex items-center space-x-3 border border-slate-700 max-w-sm">
      <Sparkles className="h-5 w-5 text-amber-400 shrink-0" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
