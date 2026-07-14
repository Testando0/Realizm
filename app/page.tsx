'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Fingerprint, Cpu, Database, Activity } from 'lucide-react';

export default function Home() {
  const containerRef = useRef(null);
  
  // Captura o progresso da rolagem
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- MATEMÁTICA DA INTERPOLAÇÃO ---
  
  // Cena 1: Intro (0% - 25%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // Cena 2: Núcleo (15% - 55%)
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.25, 0.45, 0.55], [0, 1, 1, 0]);
  const scale2 = useTransform(scrollYProgress, [0.2, 0.45], [0.8, 1.2]);
  
  // Cena 3: Dados Estruturais (45% - 85%)
  const opacity3 = useTransform(scrollYProgress, [0.45, 0.55, 0.75, 0.85], [0, 1, 1, 0]);
  const x3 = useTransform(scrollYProgress, [0.45, 0.55], [100, 0]);

  // Cena 4: Conclusão (75% - 100%)
  const opacity4 = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0.75, 0.85], [50, 0]);

  return (
    <main ref={containerRef} className="h-[400vh] bg-background">
      
      {/* Container Fixo (A viewport do usuário) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Dinâmico */}
        <div className="absolute inset-0 bg-grid-pattern bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] opacity-30 z-0" />

        {/* --- CENA 1: INTRODUÇÃO --- */}
        <motion.div 
          style={{ opacity: opacity1, scale: scale1, y: y1 }} 
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10"
        >
          <div className="w-64 h-64 bg-cyan-600/10 blur-[80px] absolute rounded-full" />
          <Fingerprint className="w-16 h-16 text-cyan-400 mb-6 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]" />
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-800">
            Protocolo<br/>Órion
          </h1>
          <p className="mt-6 text-cyan-500/80 text-sm tracking-[0.2em] uppercase">
            Inicie a rolagem para acessar
          </p>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-8 w-[1px] h-16 bg-gradient-to-b from-cyan-500 to-transparent"
          />
        </motion.div>

        {/* --- CENA 2: O NÚCLEO --- */}
        <motion.div 
          style={{ opacity: opacity2, scale: scale2 }} 
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20 pointer-events-none"
        >
          <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-purple-500/20 absolute border-dashed animate-[spin_40s_linear_infinite]" />
          <div className="w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full border border-cyan-500/30 absolute border-dotted animate-[spin_30s_linear_infinite_reverse]" />
          
          <div className="bg-black/50 border border-white/10 p-8 rounded-2xl backdrop-blur-md relative z-10">
            <Cpu className="w-10 h-10 text-purple-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">Processamento LPU</h2>
            <p className="text-gray-400 text-sm max-w-xs mx-auto">
              Renderização e inferência em velocidade máxima no backend.
            </p>
          </div>
        </motion.div>

        {/* --- CENA 3: DADOS ESTRUTURAIS --- */}
        <motion.div 
          style={{ opacity: opacity3, x: x3 }} 
          className="absolute inset-0 flex flex-col items-center justify-center p-6 z-30 pointer-events-none"
        >
          <div className="w-full max-w-md bg-gradient-to-r from-cyan-950/80 to-black border-l-4 border-cyan-500 p-6 rounded-r-xl backdrop-blur-sm shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-cyan-50 uppercase tracking-widest">
                Dados Estruturais
              </h2>
            </div>
            <ul className="space-y-4 font-mono text-xs text-cyan-200/70">
              <li className="flex justify-between border-b border-cyan-900/50 pb-2">
                <span>[SYS.INTEGRITY]</span> <span className="text-green-400">100% SECURE</span>
              </li>
              <li className="flex justify-between border-b border-cyan-900/50 pb-2">
                <span>[ENV.RENDER]</span> <span className="text-cyan-400">NEXT.JS ENGINE</span>
              </li>
              <li className="flex justify-between border-b border-cyan-900/50 pb-2">
                <span>[UI.PHYSICS]</span> <span className="text-cyan-400">FRAMER MOTION</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* --- CENA 4: CONCLUSÃO --- */}
        <motion.div 
          style={{ opacity: opacity4, y: y4 }} 
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-40 bg-black/60 backdrop-blur-sm"
        >
          <Activity className="w-16 h-16 text-green-400 mb-6 drop-shadow-[0_0_20px_rgba(74,222,128,0.5)]" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Sistema Online.
          </h2>
          <button className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:shadow-[0_0_40px_rgba(0,255,255,0.5)] uppercase tracking-widest text-sm relative overflow-hidden group">
            <span className="relative z-10">Acessar Painel VIP</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </motion.div>

      </div>
    </main>
  );
}
