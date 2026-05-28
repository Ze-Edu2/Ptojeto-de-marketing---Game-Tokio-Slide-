import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, AlertCircle } from 'lucide-react';

export default function ReleaseTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 114,
    hours: 14,
    minutes: 36,
    seconds: 40,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0c0c0c] border border-white/10 p-8 rounded-none flex flex-col items-center justify-center max-w-xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Editorial accent strip */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF3E00]" />
      
      <div className="flex items-center gap-2 mb-6 text-white/50 font-mono text-[11px] font-bold uppercase tracking-[0.2em]">
        <Calendar className="w-3.5 h-3.5 text-[#FF3E00]" />
        REGISTRO AUTOMÁTICO DO GRID
      </div>

      {/* Grid of countdown boxes */}
      <div className="grid grid-cols-4 gap-4 w-full">
        
        {/* Days */}
        <div className="bg-[#050505] border border-white/5 p-4 rounded-none text-center relative overflow-hidden">
          <div className="text-3xl md:text-5xl font-display font-black text-white leading-none tracking-tighter italic">
            {String(timeLeft.days).padStart(2, '0')}
          </div>
          <div className="text-[9px] font-mono text-white/40 uppercase mt-2.5 font-bold tracking-widest select-none">
            DIAS
          </div>
        </div>

        {/* Hours */}
        <div className="bg-[#050505] border border-white/5 p-4 rounded-none text-center relative overflow-hidden">
          <div className="text-3xl md:text-5xl font-display font-black text-white leading-none tracking-tighter italic">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-[9px] font-mono text-white/40 uppercase mt-2.5 font-bold tracking-widest select-none">
            HORAS
          </div>
        </div>

        {/* Minutes */}
        <div className="bg-[#050505] border border-white/5 p-4 rounded-none text-center relative overflow-hidden">
          <div className="text-3xl md:text-5xl font-display font-black text-white leading-none tracking-tighter italic">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-[9px] font-mono text-white/40 uppercase mt-2.5 font-bold tracking-widest select-none">
            MINS
          </div>
        </div>

        {/* Seconds */}
        <div className="bg-[#050505] border border-white/5 p-4 rounded-none text-center relative overflow-hidden">
          <div className="text-3xl md:text-5xl font-display font-black text-[#FF3E00] leading-none tracking-tighter italic animate-pulse">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-[9px] font-mono text-[#FF3E00]/60 uppercase mt-2.5 font-bold tracking-widest select-none">
            SEGS
          </div>
        </div>

      </div>

      <div className="mt-6 flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#FF3E00] bg-[#FF3E00]/10 border border-[#FF3E00]/20 px-3 py-1.5 rounded-none tracking-wider">
        <AlertCircle className="w-3.5 h-3.5" />
        VAGAS LIMITADAS PARA CHAVES ALPHA VIP
      </div>
    </div>
  );
}
