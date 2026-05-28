import React from 'react';
import { ShieldAlert, Flame } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080808] border-t border-white/5 py-16 text-white/40 font-mono text-xs relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 border-b border-white/5 pb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-display font-black tracking-tighter text-lg select-none uppercase italic">
              <Flame className="w-5 h-5 text-[#FF3E00]" />
              APEX SHIFT
            </div>
            <p className="text-white/40 text-[11px] leading-relaxed font-sans">
              A nova era dos simuladores híbridos de drift JDM. Desenvolvido no motor gráfico de última geração para queimar borracha virtual com precisão extrema.
            </p>
          </div>

          {/* Links Col */}
          <div>
            <h4 className="text-white font-display font-bold mb-4 uppercase tracking-wider text-xs italic">Pistas & Áreas</h4>
            <ul className="space-y-2.5 font-mono">
              <li><a href="#garage" className="hover:text-[#FF3E00] transition">Garagem JDM</a></li>
              <li><a href="#features" className="hover:text-[#FF3E00] transition">Motor de Física</a></li>
              <li><a href="#preregistro" className="hover:text-[#FF3E00] transition">Pré-registro</a></li>
              <li><span className="text-white/20 select-none">Hakone Climb (Passe Vip)</span></li>
            </ul>
          </div>

          {/* Guidelines Col */}
          <div>
            <h4 className="text-white font-display font-bold mb-4 uppercase tracking-wider text-xs italic">Redes Sociais</h4>
            <ul className="space-y-2.5 font-mono">
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#FF3E00] transition">Canal no Discord</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#FF3E00] transition">Changelog Twitter</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#FF3E00] transition">Showcase Instagram</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#FF3E00] transition">Trailers no YouTube</a></li>
            </ul>
          </div>

          {/* Advisory Rating Card */}
          <div className="bg-[#0c0c0c] border border-white/5 p-4 rounded-none flex gap-3 items-start select-none">
            <ShieldAlert className="w-5 h-5 text-[#FF3E00] shrink-0" />
            <div className="space-y-1">
              <h5 className="text-[10px] text-white font-display font-bold uppercase leading-none italic">CLASSIFICAÇÃO</h5>
              <p className="text-[9px] text-[#A3A3A3] leading-snug font-sans">
                Livre para todos os públicos. Contém fumaça de pneu virtual e adrenalina em alta velocidade.
              </p>
              <div className="flex gap-1.5 pt-1">
                <span className="bg-[#050505] font-bold border border-white/5 px-2 py-0.5 rounded-none text-[8px] text-white/50 font-mono">ADRENALINA</span>
                <span className="bg-[#050505] font-bold border border-white/5 px-2 py-0.5 rounded-none text-[8px] text-white/50 font-mono">JDM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Lower row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-center md:text-left text-[11px] font-sans">
              © 2026 Shift Studios Licensing, Inc. Todos os direitos reservados. Marcas e carros listados são recriações artísticas baseadas no design clássico JDM de rua.
            </p>
          </div>
          
          <button
            id="btn-scroll-to-top"
            onClick={scrollToTop}
            className="px-4 py-2 bg-[#0c0c0c] hover:bg-[#151515] text-white border border-white/10 hover:border-white/20 rounded-none transition cursor-pointer select-none text-[10px] font-bold uppercase whitespace-nowrap"
          >
            Voltar ao Topo ↑
          </button>
        </div>

      </div>
    </footer>
  );
}
