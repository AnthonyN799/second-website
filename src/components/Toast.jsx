import React, { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message, show, onHide, duration = 2000 }) {
  useEffect(() => {
    if (show) { const t = setTimeout(onHide, duration); return () => clearTimeout(t); }
  }, [show, onHide, duration]);
  if (!show) return null;
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center space-x-2 z-50 animate-[slideUp_0.3s_ease-out]">
      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
      <span className="font-bold text-sm">{message}</span>
      <style>{`@keyframes slideUp { from { transform: translate(-50%, 20px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }`}</style>
    </div>
  );
}
