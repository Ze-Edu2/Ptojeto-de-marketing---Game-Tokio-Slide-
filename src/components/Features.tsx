import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Compass, Users } from 'lucide-react';

export default function Features() {
  const list = [
    {
      id: "physics",
      icon: <Zap className="w-5 h-5 text-[#FF3E00]" />,
      title: "Física Oversteer 2.0",
      description: "Um motor híbrido ultra-responsivo que simula perda de tração de forma realista. Sinta o peso da transferência de massa nas quatro rodas e o grip lateral respondendo à temperatura dos compostos de borracha.",
      badge: "Realismo Puro"
    },
    {
      id: "world",
      icon: <Compass className="w-5 h-5 text-[#FF3E00]" />,
      title: "Tóquio em Escala 1:1",
      description: "Corra nas curvas sinuosas da rodovia Shuto Expressway, rasgue as ruas iluminadas de Akihabara e Shibuya, ou suba a lendária serra de Hakone. Totalmente renderizado com iluminação volumétrica noturna.",
      badge: "Mundo Aberto"
    },
    {
      id: "multiplayer",
      icon: <Users className="w-5 h-5 text-[#FF3E00]" />,
      title: "Twin-Drift Competitivo",
      description: "Batalhas multiplayer com lobby online. Corra na posição de Líder definindo a trajetória, ou de Perseguidor colando na porta traseira do rival. A telemetria julga ângulo, proximidade e fumaça.",
      badge: "Competição Líder"
    },
    {
      id: "custom",
      icon: <Shield className="w-5 h-5 text-[#FF3E00]" />,
      title: "Oficina sem Limites",
      description: "Além de mudar aerofólios e escapamentos, faça swaps de motor completos (de biturbo rotativo para V8 aspirado ou blocos inline-6), mude a relação de marcas de embreagem e ajuste o camber dinâmico.",
      badge: "Upgrades Reais"
    }
  ];

  return (
    <section id="features" className="py-24 bg-[#080808] border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#FF3E00] font-bold block mb-2">Engenharia Digital</span>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white uppercase italic">
              ENGINE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3E00] to-orange-500">SIMULATION</span>
            </h2>
          </div>
          <p className="text-white/50 max-w-sm text-xs leading-relaxed">
            Desenhado do zero por engenheiros automobilísticos e pilotos de drifitng reais para trazer o asfalto virtual o mais próximo da fumaça verdadeira.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="bg-[#0c0c0c] border border-white/5 hover:border-[#FF3E00]/30 p-6 rounded-none flex flex-col justify-between transition-all duration-300 relative group overflow-hidden"
            >
              {/* Corner ambient neon glow on hover */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#FF3E00]/5 blur-xl group-hover:bg-[#FF3E00]/10 transition-all duration-300 pointer-events-none rounded-full" />
              
              <div>
                <div className="p-3 bg-[#050505] w-fit rounded-none border border-white/5 group-hover:border-white/10 transition mb-6">
                  {item.icon}
                </div>
                
                <span className="inline-block text-[9px] font-mono tracking-widest uppercase font-bold text-[#FF3E00] mb-2.5">
                  {item.badge}
                </span>

                <h3 className="text-lg font-display font-bold text-white uppercase tracking-tight mb-3">
                  {item.title}
                </h3>

                <p className="text-white/50 text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-white/30 group-hover:text-[#FF3E00] transition-colors">
                <span className="text-[10px] font-mono uppercase tracking-[0.1em]">Telemetria Completa</span>
                <span className="text-sm font-bold font-mono">→</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Highlight banner inside Features */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-[#0c0c0c] border border-white/5 p-8 rounded-none flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF3E00]" />
          
          <div className="space-y-2 text-center md:text-left pl-2">
            <span className="inline-block px-3 py-1 bg-[#FF3E00]/10 border border-[#FF3E00]/20 text-[9px] font-mono uppercase text-[#FF3E00] font-bold tracking-widest">
              PRÉ-REGISTRO VIP DE OUTRIGGER SÃO CONCEDIDOS HOJE
            </span>
            <h4 className="text-xl font-display font-black text-white uppercase tracking-tight italic">
              Quer guiar o seu JDM antes do lançamento global?
            </h4>
            <p className="text-white/50 text-xs max-w-xl">
              Inscreva-se agora no nosso pré-registro para concorrer a chaves exclusivas de acesso antecipado às pistas de Hakone no PC e consoles de última geração.
            </p>
          </div>
          
          <a
            href="#preregistro"
            className="px-6 py-4 bg-[#FF3E00] hover:bg-[#D63400] text-white font-sans font-black uppercase tracking-wider text-xs rounded-none transition whitespace-nowrap"
          >
            Garantir Minha Vaga no Grid
          </a>
        </motion.div>

      </div>
    </section>
  );
}
