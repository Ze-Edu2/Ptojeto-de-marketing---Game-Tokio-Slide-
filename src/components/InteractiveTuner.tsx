import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Shield, Gauge, Zap, Sparkles, Volume2, VolumeX, Eye, Flame, RotateCcw } from 'lucide-react';
import { Vehicle, VehicleTune } from '../types';

interface InteractiveTunerProps {
  vehicles: Vehicle[];
}

export default function InteractiveTuner({ vehicles }: InteractiveTunerProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(vehicles[0]);
  const [tune, setTune] = useState<VehicleTune>({
    engineLevel: 1,
    suspensionStiffness: 2,
    tireGrip: 2, // Hard Tires (Perfect for sliding)
    aeroWing: 1, // Street wing
    exhaustStage: 1,
  });

  const [revving, setRevving] = useState(false);
  const [rpm, setRpm] = useState(1000);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Web Audio refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const engineOscRef = useRef<OscillatorNode | null>(null);
  const engineSubRef = useRef<OscillatorNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Reset tune when changing vehicle
  useEffect(() => {
    setTune({
      engineLevel: 1,
      suspensionStiffness: 2,
      tireGrip: 2,
      aeroWing: 1,
      exhaustStage: 1,
    });
    setRpm(1000);
  }, [selectedVehicle]);

  // Audio Context initialization on first interaction
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass();
      }
    }
  };

  const startEngineSound = () => {
    initAudio();
    if (!audioCtxRef.current || !soundEnabled) return;

    try {
      // Resume if suspended (browser security)
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;

      // Base Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.1);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Lowpass Filter to make the engine sound bassy and raw
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(250, ctx.currentTime);
      filter.connect(masterGain);
      filterNodeRef.current = filter;

      // Main engine sound oscillator (Sawtooth for high RPM growl)
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(45, ctx.currentTime); // deep growl frequency
      osc.connect(filter);
      osc.start();
      engineOscRef.current = osc;

      // Sub-harmonic oscillator (Triangle for deep rumble exhaust)
      const sub = ctx.createOscillator();
      sub.type = 'triangle';
      sub.frequency.setValueAtTime(22.5, ctx.currentTime); // half frequency
      sub.connect(filter);
      sub.start();
      engineSubRef.current = sub;

    } catch (e) {
      console.error("Web Audio API error:", e);
    }
  };

  const stopEngineSound = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      try {
        const time = audioCtxRef.current.currentTime;
        gainNodeRef.current.gain.cancelScheduledValues(time);
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, time);
        gainNodeRef.current.gain.linearRampToValueAtTime(0.001, time + 0.3);

        const osc = engineOscRef.current;
        const sub = engineSubRef.current;

        setTimeout(() => {
          try {
            osc?.stop();
            sub?.stop();
          } catch (err) {}
        }, 350);
      } catch (err) {}
    }
    engineOscRef.current = null;
    engineSubRef.current = null;
    filterNodeRef.current = null;
    gainNodeRef.current = null;
  };

  // Rev loop implementation
  useEffect(() => {
    let targetRpm = revving ? 8200 : 1000;
    
    // Add realistic vibration/backfire at redline
    if (revving && rpm > 8000) {
      // Redline limiter wobble
      targetRpm = 7800 + Math.random() * 600;
    }

    const interval = setInterval(() => {
      setRpm((current) => {
        const diff = targetRpm - current;
        if (Math.abs(diff) < 50) return targetRpm;
        
        // Speed up when revving, slow down more naturally
        const factor = revving ? 0.25 : 0.12; 
        return Math.round(current + diff * factor);
      });
    }, 24);

    return () => clearInterval(interval);
  }, [revving, rpm]);

  // Translate RPM to Audio Frequency
  useEffect(() => {
    if (engineOscRef.current && filterNodeRef.current && audioCtxRef.current) {
      const t = audioCtxRef.current.currentTime;
      
      // Calculate fundamental base frequency from RPM
      // 1000 RPM -> ~30Hz, 8500 RPM -> ~250Hz
      const freq = 20 + (rpm / 8500) * 220;
      
      engineOscRef.current.frequency.setTargetAtTime(freq, t, 0.05);
      if (engineSubRef.current) {
        engineSubRef.current.frequency.setTargetAtTime(freq * 0.5, t, 0.05);
      }

      // Open the filter as RPM increases to let treble sound out
      const filterFreq = 160 + (rpm / 8500) * 1100 + (tune.exhaustStage * 120);
      filterNodeRef.current.frequency.setTargetAtTime(filterFreq, t, 0.08);

      // Louder at redline
      if (gainNodeRef.current) {
        const volumeFactor = 0.08 + (rpm / 8500) * 0.14 + (tune.exhaustStage * 0.02);
        gainNodeRef.current.gain.setTargetAtTime(volumeFactor, t, 0.04);
      }
    }
  }, [rpm, tune.exhaustStage]);

  // Track button events for Engine Revving
  const handlePressStart = () => {
    initAudio();
    setRevving(true);
    startEngineSound();
  };

  const handlePressEnd = () => {
    setRevving(false);
    stopEngineSound();
  };

  // Calculations for vehicle stats based on tuning parameters
  const getModifiedStats = () => {
    const hpBoostPerLevel = 45 + (selectedVehicle.baseHp * 0.05); // boost based on base class
    const torqueBoostPerLevel = 55 + (selectedVehicle.baseTorque * 0.06);

    const extraHp = (tune.engineLevel - 1) * hpBoostPerLevel + (tune.exhaustStage - 1) * 25;
    const extraTorque = (tune.engineLevel - 1) * torqueBoostPerLevel + (tune.exhaustStage - 1) * 35;
    
    const finalHp = Math.round(selectedVehicle.baseHp + extraHp);
    const finalTorque = Math.round(selectedVehicle.baseTorque + extraTorque);
    
    // Weight saving with suspension and wing
    const finalWeight = Math.round(selectedVehicle.weight - (tune.suspensionStiffness * 8) - (tune.engineLevel * 4));

    // Stats calculations from 0 to 100
    // Engine & Exhaust boosts speed
    const hpRatio = finalHp / 1000;
    const speedScore = Math.min(100, Math.round(70 + (hpRatio * 25) + tune.aeroWing * 1.5));
    
    // Low Grip Tires = High Drift Angle, but Stiff suspension helps guide it
    const driftAngleScore = Math.min(100, Math.round(
      95 - (tune.tireGrip * 12) + (tune.suspensionStiffness * 5)
    ));

    // Grip/Tires + wing = Handling control
    const controlScore = Math.min(100, Math.round(
      45 + (tune.tireGrip * 10) + (tune.suspensionStiffness * 4) + (tune.aeroWing * 6)
    ));

    // Calculate simulated 0-100 acceleration
    const originalSecs = parseFloat(selectedVehicle.acceleration0to100);
    const accelSecs = Math.max(1.8, originalSecs - (tune.engineLevel * 0.18) - (tune.exhaustStage * 0.05) - (tune.tireGrip * 0.05)).toFixed(2);

    return {
      hp: finalHp,
      torque: finalTorque,
      weight: finalWeight,
      speed: speedScore,
      driftAngle: driftAngleScore,
      control: controlScore,
      acceleration: accelSecs + "s",
    };
  };

  const stats = getModifiedStats();

  const resetTune = () => {
    setTune({
      engineLevel: 1,
      suspensionStiffness: 2,
      tireGrip: 2,
      aeroWing: 1,
      exhaustStage: 1,
    });
    setRpm(1000);
    setRevving(false);
    stopEngineSound();
  };

  return (
    <section id="garage" className="py-20 bg-[#080808] relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-[#FF3E00]/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#FF3E00]/5 blur-3xl pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FF3E00]/10 border border-[#FF3E00]/20 rounded-none mb-4">
            <Settings className="w-3.5 h-3.5 text-[#FF3E00] animate-spin-slow" />
            <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#FF3E00] font-bold">Oficina JDM Virtual</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter text-white uppercase italic mb-4">
            OFICINA DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3E00] to-orange-500">TUNING</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm leading-relaxed">
            Ajuste cada componente de performance e sinta a diferença nas estatísticas e no ronco do escapamento em tempo real. Prepare a sua montaria para os asfaltos noturnos de Tóquio.
          </p>
        </div>

        {/* Garage Layout - Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Car Selector & High-quality Render */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Grid Vehicle Tabs */}
            <div className="grid grid-cols-3 gap-3 bg-[#0c0c0c] p-2 border border-white/5 rounded-none">
              {vehicles.map((v) => {
                const isSelected = v.id === selectedVehicle.id;
                return (
                  <button
                    key={v.id}
                    id={`btn-select-${v.id}`}
                    onClick={() => {
                      setSelectedVehicle(v);
                      stopEngineSound();
                    }}
                    className={`relative p-3 rounded-none text-left transition-all duration-300 pointer-events-auto cursor-pointer ${
                      isSelected 
                        ? 'bg-white/5 text-white border border-[#FF3E00]/40' 
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isSelected && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute left-1.5 top-1.5 w-1.5 h-1.5 bg-[#FF3E00]"
                      />
                    )}
                    <span className="block font-mono text-[9px] uppercase font-bold tracking-[0.1em] text-white/50 mb-0.5">
                      {v.codename}
                    </span>
                    <span className="block font-sans text-xs md:text-sm font-semibold truncate leading-none">
                      {v.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Main Interactive Stage with Sound HUD */}
            <div className="relative aspect-[4/3] w-full rounded-none overflow-hidden border border-white/10 bg-[#050505] shadow-2xl group">
              <img
                src={selectedVehicle.imagePath}
                alt={selectedVehicle.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none scale-102"
              />
              
              {/* Image overlay details */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-transparent pointer-events-none" />

              {/* Specifications HUD Tags */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 bg-[#080808]/90 backdrop-blur-md border border-white/10 p-4 rounded-none font-mono text-[10px] text-white/70">
                <div className="flex justify-between gap-6">
                  <span className="text-white/40 font-bold">MODELO:</span>
                  <span className="text-white font-bold">{selectedVehicle.name}</span>
                </div>
                <div className="flex justify-between gap-6">
                  <span className="text-white/40 font-bold">ORIGEM:</span>
                  <span className="text-white">{selectedVehicle.origin}</span>
                </div>
                <div className="flex justify-between gap-6">
                  <span className="text-white/40 font-bold">ANO:</span>
                  <span className="text-white">{selectedVehicle.year}</span>
                </div>
              </div>

              {/* Exhaust sound / Visual Heat Waves on rev */}
              {revving && (
                <div className="absolute bottom-20 right-12 flex space-x-1 items-end h-16 pointer-events-none">
                  {/* Dynamic graphic flames or soundwave */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 bg-gradient-to-t from-[#FF3E00] via-orange-500 to-yellow-400 rounded-none"
                      animate={{
                        height: [10, 45, 15, 60, 20][(i + Math.floor(rpm / 1000)) % 5],
                        opacity: [0.6, 1.0, 0.7][i % 3]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.15 + i * 0.02,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                  <span className="absolute -top-6 right-0 text-[10px] font-mono text-[#FF3E00] font-bold uppercase tracking-widest animate-pulse">
                    FOGO NO ESCAPE!
                  </span>
                </div>
              )}

              {/* Lower HUD Area detailing vehicle features */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="max-w-[70%]">
                  <h3 className="text-lg font-display font-black text-white italic uppercase drop-shadow">
                    {selectedVehicle.name}
                  </h3>
                  <p className="text-xs text-white/60 drop-shadow line-clamp-2">
                    {selectedVehicle.description}
                  </p>
                </div>

                {/* Direct sound toggle */}
                <button
                  id="btn-toggle-sound"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-3 rounded-none select-none justify-center items-center pointer-events-auto cursor-pointer transition ${
                    soundEnabled ? 'bg-[#FF3E00] text-white hover:bg-[#D63400]' : 'bg-white/10 text-white/50 hover:bg-white/15'
                  }`}
                  title={soundEnabled ? "Desativar Áudio" : "Ativar Áudio"}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Cockpit RPM rev-gauge dial & Throttle panel */}
            <div className="bg-[#0c0c0c] border border-white/5 p-6 rounded-none flex flex-col md:flex-row gap-6 items-center justify-between">
              
              {/* Micro rev dial representation */}
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 rounded-none border-2 border-white/10 bg-[#050505] flex flex-col justify-center items-center overflow-hidden">
                  
                  {/* Rotating needle or dial ring */}
                  <div 
                    className="absolute inset-0 border-t-2 border-r-2 border-[#FF3E00] transition-transform duration-100 ease-out"
                    style={{ transform: `rotate(${(rpm / 8500) * 270 - 135}deg)` }}
                  />
                  
                  <span className="text-[9px] font-mono text-white/40 font-bold tracking-widest">RPM</span>
                  <span className="text-xl font-display font-black text-white italic tracking-tighter leading-none">
                    {rpm}
                  </span>
                  
                  <span className={`text-[8px] font-mono mt-1 px-1.5 py-0.5 rounded-none font-bold tracking-wider ${
                    rpm > 7800 ? 'bg-[#FF3E00] text-white animate-flash' : 'text-white/40'
                  }`}>
                    {rpm > 7800 ? 'REDLINE' : 'LIMITE'}
                  </span>
                </div>

                <div>
                  <div className="text-sm font-display font-bold text-white uppercase italic flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                    Ronco do Motor
                  </div>
                  <p className="text-xs text-white/50 max-w-[240px]">
                    Ative o áudio e pressione o acelerador para simular o ronco JDM.
                  </p>
                </div>
              </div>

              {/* High-octane Rev Engine Button */}
              <button
                id="btn-throttle-pedal"
                onMouseDown={handlePressStart}
                onMouseUp={handlePressEnd}
                onMouseLeave={handlePressEnd}
                onTouchStart={(e) => { e.preventDefault(); handlePressStart(); }}
                onTouchEnd={handlePressEnd}
                className={`relative overflow-hidden w-full md:w-auto px-8 py-4 rounded-none flex items-center justify-center gap-3 font-mono font-bold tracking-[0.1em] text-xs uppercase select-none transition-all duration-150 active:scale-[0.98] cursor-pointer pointer-events-auto border ${
                  revving 
                    ? 'bg-[#FF3E00] border-[#FF3E00] text-white shadow-lg shadow-[#FF3E00]/20' 
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/70'
                }`}
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-white/10 animate-pulse" />
                <Gauge className={`w-4 h-4 ${revving ? 'animate-bounce text-yellow-300' : 'text-white/40'}`} />
                PEDAL DO ACELERADOR (Hold)
              </button>

            </div>

          </div>

          {/* Right Column: Tuning Controls & Mod Stats display */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Stats Panel */}
            <div className="bg-[#0c0c0c] border border-white/5 p-6 rounded-none relative">
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  id="btn-reset-tuning"
                  onClick={resetTune}
                  className="p-1.5 rounded-none bg-white/5 hover:bg-[#FF3E00] text-white/60 hover:text-white transition cursor-pointer"
                  title="Resetar Ajustes"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white/50 font-bold mb-6 flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-[#FF3E00]" />
                Telemetria de Performance
              </h4>

              {/* Key Specs Row */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#050505] p-3 rounded-none border border-white/5">
                  <div className="text-[9px] font-mono font-bold tracking-wider text-white/40">POTÊNCIA</div>
                  <div className="text-2xl font-display font-black text-white italic leading-none mt-1">
                    {stats.hp} <span className="text-[10px] text-[#FF3E00] font-mono not-italic font-bold ml-1">CV</span>
                  </div>
                </div>
                <div className="bg-[#050505] p-3 rounded-none border border-white/5">
                  <div className="text-[9px] font-mono font-bold tracking-wider text-white/40">TORQUE</div>
                  <div className="text-2xl font-display font-black text-white italic leading-none mt-1">
                    {stats.torque} <span className="text-[10px] text-[#FF3E00] font-mono not-italic font-bold ml-1">Nm</span>
                  </div>
                </div>
                <div className="bg-[#050505] p-3 rounded-none border border-white/5">
                  <div className="text-[9px] font-mono font-bold tracking-wider text-white/40">PESO</div>
                  <div className="text-2xl font-display font-black text-white italic leading-none mt-1">
                    {stats.weight} <span className="text-[10px] text-white/40 font-mono not-italic font-bold ml-1">Kg</span>
                  </div>
                </div>
                <div className="bg-[#050505] p-3 rounded-none border border-white/5">
                  <div className="text-[9px] font-mono font-bold tracking-wider text-white/40">ACELERAÇÃO 0-100</div>
                  <div className="text-2xl font-display font-black text-[#FF3E00] italic leading-none mt-1">
                    {stats.acceleration}
                  </div>
                </div>
              </div>

              {/* Dynamic Recalculated Bars - Strict high contrast blocks */}
              <div className="space-y-5">
                
                {/* Stat Speed */}
                <div>
                  <div className="flex justify-between text-[11px] font-mono font-bold tracking-wider mb-2">
                    <span className="text-white/40">VELOCIDADE MÁXIMA</span>
                    <span className="text-white font-heavy">{stats.speed}/100</span>
                  </div>
                  <div className="h-1.5 bg-[#050505] rounded-none overflow-hidden border border-white/5">
                    <motion.div
                      className="h-full bg-[#FF3E00]"
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.speed}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Stat Drift Angle */}
                <div>
                  <div className="flex justify-between text-[11px] font-mono font-bold tracking-wider mb-2">
                    <span className="text-white/40">ÂNGULO REVELADO</span>
                    <span className="text-white font-heavy">{stats.driftAngle}/100</span>
                  </div>
                  <div className="h-1.5 bg-[#050505] rounded-none overflow-hidden border border-white/5">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#FF3E00] to-orange-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.driftAngle}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Stat Handling/Control */}
                <div>
                  <div className="flex justify-between text-[11px] font-mono font-bold tracking-wider mb-2">
                    <span className="text-white/40">ESTABILIDADE E SINAL</span>
                    <span className="text-white font-heavy">{stats.control}/100</span>
                  </div>
                  <div className="h-1.5 bg-[#050505] rounded-none overflow-hidden border border-white/5">
                    <motion.div
                      className="h-full bg-[#FF3E00]"
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.control}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

              </div>

            </div>

            {/* Adjustments Panel (The Sliders and buttons with sharp styling) */}
            <div className="bg-[#0c0c0c] border border-white/5 p-6 space-y-6 rounded-none">
              
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white/50 font-bold flex items-center gap-2">
                <Settings className="w-3.5 h-3.5 text-[#FF3E00]" />
                PEÇAS DE ALTA PERFORMANCE
              </h4>

              {/* Adjust Engine Stage */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono font-bold tracking-wider">
                  <span className="text-white/60">ESTÁGIO DO MOTOR (ECU / TURBO)</span>
                  <span className="text-[#FF3E00]">NÍVEL {tune.engineLevel}</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <button
                      key={lvl}
                      id={`btn-engine-lvl-${lvl}`}
                      onClick={() => setTune({ ...tune, engineLevel: lvl })}
                      className={`py-2 text-[10px] font-mono font-bold rounded-none border transition duration-150 cursor-pointer ${
                        tune.engineLevel === lvl
                          ? 'bg-[#FF3E00] text-white border-[#FF3E00]'
                          : 'bg-[#050505] text-white/40 border-white/5 hover:text-white hover:border-white/10'
                      }`}
                    >
                      STG {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Adjust Suspension */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono font-bold tracking-wider">
                  <span className="text-white/60 font-bold uppercase">RIGIDEZ DA SUSPENSÃO</span>
                  <span className="text-white">
                    {tune.suspensionStiffness === 1 ? 'Macia (Conforto)' : 
                     tune.suspensionStiffness === 2 ? 'Rua JDM' : 
                     tune.suspensionStiffness === 3 ? 'Esportiva' : 
                     tune.suspensionStiffness === 4 ? 'Competição (Dura)' : 'Drift Pro'}
                  </span>
                </div>
                <input
                  id="slider-suspension"
                  type="range"
                  min="1"
                  max="5"
                  value={tune.suspensionStiffness}
                  onChange={(e) => setTune({ ...tune, suspensionStiffness: parseInt(e.target.value) })}
                  className="w-full h-1 bg-[#050505] accent-[#FF3E00] cursor-pointer appearance-none outline-none border border-white/5"
                />
              </div>

              {/* Adjust Tire Compound */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono font-bold tracking-wider">
                  <span className="text-white/60 font-bold uppercase">COMPOSTO DOS PNEUS</span>
                  <span className="text-white">
                    {tune.tireGrip === 1 ? 'Semislick (Massa de Drift)' : 
                     tune.tireGrip === 2 ? 'Duro (Facilidade de Slide)' : 
                     tune.tireGrip === 3 ? 'Esportivo (Equilibrado)' : 
                     tune.tireGrip === 4 ? 'Semi-Grip' : 'Grip Total (Corrida)'}
                  </span>
                </div>
                <input
                  id="slider-tire-grip"
                  type="range"
                  min="1"
                  max="5"
                  value={tune.tireGrip}
                  onChange={(e) => setTune({ ...tune, tireGrip: parseInt(e.target.value) })}
                  className="w-full h-1 bg-[#050505] accent-[#FF3E00] cursor-pointer appearance-none outline-none border border-white/5"
                />
              </div>

              {/* Adjust Spoiler/Aero */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono font-bold tracking-wider">
                  <span className="text-white/60 font-bold uppercase">ASA AERODINÂMICA (AERO)</span>
                  <span className="text-[#FF3E00] uppercase font-bold">
                    {tune.aeroWing === 0 ? 'Sem Aero (Velocidade)' : 
                     tune.aeroWing === 1 ? 'Street Wing' : 
                     tune.aeroWing === 2 ? 'Carbon Spoiler' : 'Big GT Race Wing'}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {['Nenhum', 'Street', 'Carbon', 'GT Race'].map((wing, index) => (
                    <button
                      key={wing}
                      id={`btn-wing-${index}`}
                      onClick={() => setTune({ ...tune, aeroWing: index })}
                      className={`py-2 text-[9px] font-mono font-bold rounded-none border transition duration-150 cursor-pointer ${
                        tune.aeroWing === index
                          ? 'bg-[#FF3E00] text-white border-[#FF3E00]'
                          : 'bg-[#050505] text-white/40 border-white/5 hover:text-white hover:border-white/10'
                      }`}
                    >
                      {wing}
                    </button>
                  ))}
                </div>
              </div>

              {/* Exhaust Stage */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono font-bold tracking-wider">
                  <span className="text-white/60 font-bold uppercase">SISTEMA DO ESCAPAMENTO</span>
                  <span className="text-[#FF3E00]">ESTÁGIO {tune.exhaustStage}</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {['Original', 'Aço Inox', 'Corrida Completo'].map((exh, index) => (
                    <button
                      key={exh}
                      id={`btn-exhaust-${index + 1}`}
                      onClick={() => setTune({ ...tune, exhaustStage: index + 1 })}
                      className={`py-2 text-[9px] font-mono font-bold rounded-none border transition duration-150 cursor-pointer truncate px-1 ${
                        tune.exhaustStage === index + 1
                          ? 'bg-[#FF3E00] text-white border-[#FF3E00]'
                          : 'bg-[#050505] text-white/40 border-white/5 hover:text-white hover:border-white/10'
                      }`}
                    >
                      {exh}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
