import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Ticket, Mail, Globe, Sparkles, Trophy, Cpu, Gamepad2, Layers } from 'lucide-react';
import { PreRegisterUser, Milestone } from '../types';

export default function PreRegister() {
  const [email, setEmail] = useState('');
  const [platform, setPlatform] = useState<'pc' | 'ps5' | 'xbox-series' | 'mobile'>('pc');
  const [region, setRegion] = useState('America do Sul');
  const [copiedTicket, setCopiedTicket] = useState(false);
  
  // Persistent check
  const [registered, setRegistered] = useState(false);
  const [registeredData, setRegisteredData] = useState<PreRegisterUser | null>(null);
  const [customCounter, setCustomCounter] = useState(2842912);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('apex_shift_preregister');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as PreRegisterUser;
        setRegistered(true);
        setRegisteredData(parsed);
        setCustomCounter(2842913); // add 1 to signify their registration
      } catch (e) {}
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email) {
      setErrorMsg('Por favor, digite seu e-mail.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Por favor, insira um e-mail válido.');
      return;
    }

    const newUser: PreRegisterUser = {
      email,
      platform,
      region,
      date: new Date().toISOString(),
    };

    localStorage.setItem('apex_shift_preregister', JSON.stringify(newUser));
    setRegistered(true);
    setRegisteredData(newUser);
    setCustomCounter(customCounter + 1);
  };

  const clearRegistration = () => {
    localStorage.removeItem('apex_shift_preregister');
    setRegistered(false);
    setRegisteredData(null);
    setEmail('');
    setCustomCounter(2842912);
  };

  const handleCopyTicket = () => {
    navigator.clipboard.writeText("APEX-DRIFT-BETA-2026");
    setCopiedTicket(true);
    setTimeout(() => setCopiedTicket(false), 2000);
  };

  const milestones: Milestone[] = [
    {
      target: 500000,
      current: customCounter,
      rewardName: "Sticker Pack 'Tokyo Neon'",
      rewardDescription: "Conjunto exclusivo de decalques reflexivos para customizar a lataria de qualquer carro.",
      rewardImage: "🎨 Decalques Midnight",
      unlocked: true,
    },
    {
      target: 1500000,
      current: customCounter,
      rewardName: "Rodas Chrome JDM Spec",
      rewardDescription: "Rodas lendárias de liga leve polidas com acabamento em titânio e cromo.",
      rewardImage: "🛞 Rodas Customizadas",
      unlocked: true,
    },
    {
      target: 3000000,
      current: customCounter,
      rewardName: "Veículo Shinryu RX-7 Custom",
      rewardDescription: "Liberação instantânea do carro inicial personalizado na sua coleção de graça no dia de lançamento.",
      rewardImage: "🚗 Shinryu Customizado",
      unlocked: false,
    },
  ];

  const pct = Math.min(100, (customCounter / 3000000) * 100);

  return (
    <section id="preregistro" className="py-24 bg-[#080808] relative overflow-hidden border-t border-white/5">
      
      {/* Decorative fluorescent light lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-[#FF3E00]/10 via-transparent to-transparent" />
      <div className="absolute bottom-0 right-1/4 w-px h-full bg-gradient-to-t from-orange-500/5 via-transparent to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: The Interactive Form */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#FF3E00] font-bold block mb-2">Passe de Acesso Antecipado</span>
              <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white mb-4 uppercase italic">
                PRÉ-<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3E00] to-orange-500">REGISTRO</span>
              </h2>
              <p className="text-white/50 text-xs leading-relaxed max-w-lg">
                Entre na lista de convocação para concorrer a chaves de ativação antes de qualquer um. Ao se registrar, você ajuda a comunidade a liberar recompensas globais de lançamento!
              </p>
            </div>

            {/* If user is ALREADY registered */}
            <AnimatePresence mode="wait">
              {registered ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#0c0c0c] border border-green-500/25 p-6 rounded-none space-y-6 relative overflow-hidden"
                >
                  <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-green-500/5 blur-3xl pointer-events-none rounded-full" />
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-none bg-green-500/10 flex items-center justify-center border border-green-500/30">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-display font-bold text-white tracking-wider uppercase leading-none">PRÉ-REGISTRO CONFIRMADO!</h3>
                      <p className="text-[10px] text-green-400 font-mono mt-1 uppercase tracking-wider">Status: Convocado para o Grid</p>
                    </div>
                  </div>

                  {/* Fictional Digital Ticket design */}
                  <div className="bg-[#050505] border border-white/5 rounded-none p-5 relative overflow-hidden">
                    
                    {/* Punch hole details for ticket illusion */}
                    <div className="absolute top-1/2 -left-3 w-5 h-5 bg-[#0c0c0c] border border-white/5 rounded-full" />
                    <div className="absolute top-1/2 -right-3 w-5 h-5 bg-[#0c0c0c] border border-white/5 rounded-full" />

                    <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-3">
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40 block">BILHETE DIGITAL</span>
                        <span className="text-sm font-display font-bold text-white uppercase italic">APEX SHIFT JDM</span>
                      </div>
                      <Sparkles className="w-4 h-4 text-[#FF3E00] animate-pulse" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 font-mono text-xs mb-4">
                      <div>
                        <span className="text-[9px] text-white/30 block font-bold uppercase tracking-wider">REMETENTE:</span>
                        <span className="text-white/80 truncate block max-w-[160px] font-bold">{registeredData?.email}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-white/30 block font-bold uppercase tracking-wider">PLATAFORMA:</span>
                        <span className="text-[#FF3E00] uppercase font-bold">{registeredData?.platform}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-white/30 block font-bold uppercase tracking-wider">REGIÃO:</span>
                        <span className="text-white/80 font-bold">{registeredData?.region}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-white/30 block font-bold uppercase tracking-wider">TIPO:</span>
                        <span className="text-[#FF3E00] font-bold">VOTE BETA VIP</span>
                      </div>
                    </div>

                    {/* Code copy block */}
                    <div className="bg-[#0a0a0a] border border-white/5 p-2.5 rounded-none flex items-center justify-between">
                      <span className="font-mono text-xs text-white/70 select-all font-bold">
                        APEX-DRIFT-BETA-2026
                      </span>
                      <button
                        id="btn-copy-ticket"
                        onClick={handleCopyTicket}
                        className="px-3 py-1 text-[10px] font-mono bg-[#FF3E00] text-white border border-[#FF3E00] rounded-none hover:bg-[#D63400] cursor-pointer transition font-bold"
                      >
                        {copiedTicket ? 'COPIADO!' : 'COPIAR'}
                      </button>
                    </div>

                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <p className="text-white/40 font-mono text-[10px]">
                      Enviamos um código de confirmação para a sua caixa de entrada.
                    </p>
                    <button
                      id="btn-reset-preregister"
                      onClick={clearRegistration}
                      className="text-white/40 hover:text-[#FF3E00] underline transition cursor-pointer font-mono text-[10px] shrink-0"
                    >
                      Cancelar Cadastro
                    </button>
                  </div>

                </motion.div>
              ) : (
                /* Pre-register Form markup */
                <form id="form-preregister" onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Platform Selector buttons */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-white/45 font-bold uppercase tracking-wider">
                      Escolha Sua Plataforma Principal:
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { key: 'pc', icon: <Cpu className="w-4 h-4" />, name: 'PC Steam' },
                        { key: 'ps5', icon: <Gamepad2 className="w-4 h-4" />, name: 'PS5' },
                        { key: 'xbox-series', icon: <Gamepad2 className="w-4 h-4 text-[#FF3E00]" />, name: 'Xbox Series' },
                        { key: 'mobile', icon: <Layers className="w-4 h-4" />, name: 'Mobile' },
                      ].map((p) => {
                        const isChosen = platform === p.key;
                        return (
                          <button
                            key={p.key}
                            id={`btn-platform-${p.key}`}
                            type="button"
                            onClick={() => setPlatform(p.key as any)}
                            className={`p-3 rounded-none border flex flex-col items-center justify-center gap-1.5 transition duration-150 cursor-pointer ${
                              isChosen
                                ? 'bg-[#FF3E00] text-white border-[#FF3E00]'
                                : 'bg-[#0c0c0c] text-white/40 border-white/5 hover:text-white hover:border-white/10'
                            }`}
                          >
                            {p.icon}
                            <span className="text-[9px] uppercase font-bold font-mono tracking-tighter">
                              {p.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Region selection Dropdown */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-white/45 font-bold uppercase tracking-wider">
                      Região Geográfica:
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3.5 top-4 w-3.5 h-3.5 text-white/40 pointer-events-none" />
                      <select
                        id="select-region"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full bg-[#0c0c0c] border border-white/5 rounded-none px-10 py-3.5 text-xs text-white/85 font-mono focus:border-[#FF3E00]/60 focus:outline-none appearance-none cursor-pointer"
                      >
                        <option value="America do Sul">América do Sul (LatAm - São Paulo Server)</option>
                        <option value="America do Norte">América do Norte (NA East / West)</option>
                        <option value="Europa">Europa Ocidental (EU Central - Frankfurt)</option>
                        <option value="Asia">Ásia Oriental (Asia East - Tokyo)</option>
                      </select>
                    </div>
                  </div>

                  {/* Email Input Field */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-white/45 font-bold uppercase tracking-wider">
                      E-mail para Acesso:
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-4 w-3.5 h-3.5 text-white/40 pointer-events-none" />
                      <input
                        id="input-email"
                        type="email"
                        placeholder="nome@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#0c0c0c] border border-white/5 rounded-none px-10 py-3.5 text-xs text-white placeholder-white/20 focus:border-[#FF3E00] focus:outline-none focus:ring-0 font-mono"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <p className="text-[#FF3E00] font-mono text-[10px] uppercase font-bold">{errorMsg}</p>
                  )}

                  {/* Submission triggers */}
                  <button
                    id="btn-submit-preregister"
                    type="submit"
                    className="w-full py-4 rounded-none font-display font-black uppercase text-xs tracking-wider bg-[#FF3E00] hover:bg-[#D63400] text-white transition cursor-pointer"
                  >
                    GARANTIR CADASTRO NO GRID DE LARGADA
                  </button>

                  <p className="text-[9px] text-white/30 text-center font-mono leading-normal">
                    Registrando-se você aceita receber e-mails sobre testes de rede e as políticas de privacidade de Apex Shift.
                  </p>

                </form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Block: Global Milestones track */}
          <div className="lg:col-span-6 bg-[#0c0c0c] border border-white/5 p-6 md:p-8 rounded-none space-y-6">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-white/45 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-[#FF3E00]" />
                  Progresso da Comunidade Global
                </span>
                <span className="text-[10px] font-mono font-bold text-[#FF3E00] tracking-wider">
                  {pct.toFixed(1)}% ATINGIDO
                </span>
              </div>
              
              {/* Massive Counter */}
              <div className="text-3xl md:text-4xl font-mono font-black text-white tracking-tighter leading-none mb-4">
                {customCounter.toLocaleString()} <span className="text-xs font-mono font-normal text-white/30 tracking-widest uppercase">CORREDORES</span>
              </div>

              {/* Progress Bar */}
              <div className="h-4 bg-[#050505] border border-white/5 rounded-none overflow-hidden p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-[#FF3E00] via-orange-500 to-[#FF3E00] rounded-none transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-white/35 mt-2">
                <span>START</span>
                <span className="font-bold text-[#FF3E00] tracking-widest">METRO ALVO EM 3.000.000</span>
              </div>
            </div>

            {/* Milestones list detailing free unlocks */}
            <div className="space-y-3.5">
              {milestones.map((m) => (
                <div 
                  key={m.target} 
                  className={`border p-4 rounded-none flex gap-4 items-start transition duration-200 ${
                    m.unlocked 
                      ? 'bg-[#050505] border-white/10' 
                      : 'bg-[#050505]/40 border-white/5 opacity-40'
                  }`}
                >
                  <div className="p-3 bg-[#050505] rounded-none font-mono text-[10px] font-bold shrink-0 border border-white/5 text-[#FF3E00]">
                    {m.target >= 1000000 ? `${m.target / 1000000}M` : `${m.target / 1000}K`}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-xs font-display font-bold text-white uppercase tracking-tight">{m.rewardName}</h4>
                      {m.unlocked ? (
                        <span className="text-[8px] font-mono font-bold bg-[#FF3E00]/10 border border-[#FF3E00]/25 text-[#FF3E00] px-1.5 py-0.2">
                          LIBERADO
                        </span>
                      ) : (
                        <span className="text-[8px] font-mono font-bold bg-white/5 text-white/40 px-1.5 py-0.2">
                          BLOQUEADO
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-white/50 leading-relaxed">{m.rewardDescription}</p>
                    <div className="text-[9px] font-mono text-[#FF3E00] font-semibold italic mt-1 bg-[#FF3E00]/5 px-2 py-0.5 w-fit">
                      {m.rewardImage}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
