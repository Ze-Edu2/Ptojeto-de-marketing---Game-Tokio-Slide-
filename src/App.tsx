import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Play, ShieldCheck, Cpu, Trophy, Menu, X, ArrowRight, Gauge, HelpCircle } from 'lucide-react';
import { Vehicle } from './types';
import InteractiveTuner from './components/InteractiveTuner';
import Features from './components/Features';
import ReleaseTimer from './components/ReleaseTimer';
import PreRegister from './components/PreRegister';
import Footer from './components/Footer';

// Pre-defined high-resolution JDM drift cars generated via Gemini Imagen
const vehicles: Vehicle[] = [
  {
    id: 'shinryu',
    name: 'Shinryu Custom RX7',
    codename: 'Mamba Amarela',
    year: 1997,
    origin: 'Hiroshima, Japão',
    baseHp: 480,
    baseTorque: 512,
    weight: 1210,
    topSpeedKmH: 290,
    acceleration0to100: "3.2s",
    imagePath: '/src/assets/images/rx7_garage_1780006154953.png',
    description: 'Um monstro leve de motor rotativo biturbo. Rotação incrivelmente alta, agilidade cirúrgica e o equilíbrio dinâmico perfeito para as descidas sinuosas e estreitas do monte Hakone.',
    colorHex: '#EAB308',
    features: ['Motor Rotativo Twin-Scroll', 'Suspensão Coilover Drift R-Spec', 'Rodas Custom Advan Gold']
  },
  {
    id: 'kenshin',
    name: 'Krimson Kenshin GTR Base',
    codename: 'Guerreiro Vermelho',
    year: 2024,
    origin: 'Toyota City, Japão',
    baseHp: 620,
    baseTorque: 750,
    weight: 1450,
    topSpeedKmH: 325,
    acceleration0to100: "2.8s",
    imagePath: '/src/assets/images/modern_jdm_1780006178000.png',
    description: 'Supercarro moderno de tração traseira direta modificada. Domina largas pistas expressas com torque monstruoso instantâneo e estabilidade impecável nas curvas rápidas.',
    colorHex: '#EF4444',
    features: ['Motor Inline-6 Biturbo 3.0L', 'Kit Aerodinâmico Carbon Widebody', 'Spoiler GT Super-downforce']
  },
  {
    id: 'shadow',
    name: 'V8 Shadow Charger Spec',
    codename: 'Espectro de Detroit',
    year: 2021,
    origin: 'Detroit, EUA',
    baseHp: 750,
    baseTorque: 980,
    weight: 1620,
    topSpeedKmH: 310,
    acceleration0to100: "3.5s",
    imagePath: '/src/assets/images/muscle_drift_1780006196655.png',
    description: 'A força bruta mecânica americana feita para canibalizar pneus e criar volumosas nuvens de fumaça. Amparada por um V8 supercharged de torque torque titânico instantâneo.',
    colorHex: '#A855F7',
    features: ['V8 Supercharged 6.2L HEMI', 'Freio de Mão Hidráulico On-the-Fly', 'Sistema de Suspensão de Arrancada']
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#FF3E00] selection:text-white">
      
      {/* Dynamic Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/90 backdrop-blur-md border-b border-white/5">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo - ShiftLabs style */}
          <a href="#" className="flex items-center gap-2 text-2xl font-display font-black tracking-tighter uppercase italic select-none cursor-pointer">
            <span>Apex<span className="text-[#FF3E00]">Shift</span></span>
          </a>

          {/* Desktop Navigation Links - Editorial Letterspacing */}
          <div className="hidden md:flex items-center gap-10 text-[11px] font-bold tracking-[0.2em] uppercase text-white/60">
            <a href="#garage" className="hover:text-[#FF3E00] hover:opacity-100 transition-colors">Garagem JDM</a>
            <a href="#features" className="hover:text-[#FF3E00] hover:opacity-100 transition-colors">Física de Pneus</a>
            <a href="#preregistro" className="hover:text-[#FF3E00] hover:opacity-100 transition-colors">Passes de Teste</a>
          </div>

          {/* Action Trigger - Editorial sharp border style */}
          <div className="hidden md:block">
            <a
              href="#preregistro"
              className="px-6 py-2.5 border border-white/20 hover:border-[#FF3E00] text-[11px] font-bold uppercase tracking-widest transition-all duration-150 rounded-none bg-transparent text-white hover:bg-[#FF3E00]/10"
            >
              PRÉ-REGISTRO
            </a>
          </div>

          {/* Mobile hamburger button */}
          <button
            id="btn-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white transition cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </nav>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#080808] border-b border-white/5 py-6 px-6 space-y-4"
            >
              <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                <a 
                  href="#garage" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#FF3E00] transition"
                >
                  Garagem JDM
                </a>
                <a 
                  href="#features" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#FF3E00] transition"
                >
                  Física de Pneus
                </a>
                <a 
                  href="#preregistro" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#FF3E00] transition"
                >
                  Passes de Teste
                </a>
              </div>
              <a
                href="#preregistro"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-3 bg-[#FF3E00] text-xs font-bold uppercase tracking-widest rounded-none text-white"
              >
                Garantir Pré-registro
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Sections */}
      <main className="pt-20">

        {/* Hero Banner Section */}
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16">
          
          {/* Main Beautifully Drift Background Image generated via Gemini */}
          <div className="absolute inset-0 z-0">
            <img
              src="/src/assets/images/hero_tokyo_drift_1780006138191.png"
              alt="Apex Shift JDM drift sideways on rainy Tokyo highway"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover scale-102 filter brightness-[0.38] saturation-[1.05]"
            />
            {/* Visual gradient mask block */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-[#080808]/80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-[#080808]/80 pointer-events-none" />
          </div>

          {/* Floating background gradient matching the luxury editorial display look */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FF3E00]/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 text-center relative z-10 space-y-8">
            
            {/* Hype telemetry badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#080808]/90 border border-white/10 rounded-none cursor-default"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF3E00] animate-ping" />
              <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#FF3E00] uppercase">
                BETA VIP: INSCRITOS GANHAM SKINS DE LANÇAMENTO
              </span>
            </motion.div>

            {/* Title / Hero Pitch - High contrast Editorial large fonts */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-6xl md:text-[120px] leading-[0.85] font-display font-black italic uppercase tracking-tighter text-white"
              >
                TOKYO<br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3E00] to-orange-500">SLIDE</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="text-white/60 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed font-sans"
              >
                O asfalto sob chuva cintila com os neons de Shinjuku. Domine o acelerador, dose o freio de mão hidráulico e libere cortinas gigantes de fumaça na recriação mais fiel do de drift urbano.
              </motion.p>
            </div>

            {/* Hero CTA button interactions (Rectangular high contrast) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <a
                href="#preregistro"
                className="w-full sm:w-auto px-8 py-5 bg-[#FF3E00] hover:bg-[#D63400] text-white font-sans font-black uppercase text-xs tracking-[0.1em] rounded-sm transition duration-150 flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current text-white" />
                ACESSAR O ALPHA DRIFT
              </a>
              <a
                href="#garage"
                className="w-full sm:w-auto px-8 py-5 bg-transparent hover:bg-white/5 border border-white/20 rounded-sm font-sans font-black text-xs uppercase tracking-[0.1em] text-white transition"
              >
                OFICINA DE TUNING
              </a>
            </motion.div>

            {/* Ground-level micro telemetry markers matching design specifications */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-12 md:gap-16 border-t border-white/5 pt-10 max-w-3xl mx-auto text-center"
            >
              <div className="flex flex-col">
                <span className="text-4xl font-display font-black italic text-white leading-none">142+</span>
                <span className="text-[10px] font-mono uppercase tracking-widest opacity-40 mt-1">Carros JDM Licenciados</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-display font-black italic text-[#FF3E00] leading-none">24</span>
                <span className="text-[10px] font-mono uppercase tracking-widest opacity-40 mt-1">Circuitos Globais</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-display font-black italic text-white leading-none">0.02s</span>
                <span className="text-[10px] font-mono uppercase tracking-widest opacity-40 mt-1">Latência de Entrada</span>
              </div>
            </motion.div>

          </div>

          {/* Fade transition elements in layout boundary */}
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
        </section>

        {/* Live Countdown section */}
        <section className="bg-[#080808] py-10 relative z-10 px-6">
          <ReleaseTimer />
        </section>

        {/* Interactive tuning garage component */}
        <InteractiveTuner vehicles={vehicles} />

        {/* Physical gameplay features segment */}
        <Features />

        {/* Registrations list & Community rewards */}
        <PreRegister />

      </main>

      {/* Main Footer layout */}
      <Footer />

    </div>
  );
}

