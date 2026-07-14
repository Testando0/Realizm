'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log interno apenas. A stack trace nunca vai aparecer na tela.
    console.error("Falha silenciosa capturada no sistema central.");
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050505] text-red-500 flex flex-col items-center justify-center p-6 font-mono">
      <div className="border border-red-500/20 bg-black/40 p-8 rounded-xl text-center max-w-md w-full backdrop-blur-md shadow-[0_0_40px_rgba(255,0,0,0.05)] relative overflow-hidden">
        <div className="absolute inset-0 bg-red-500/5 mix-blend-overlay animate-pulse" />
        
        <div className="relative z-10 flex flex-col items-center">
          <AlertTriangle className="w-12 h-12 text-red-500/80 mb-4 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
          <h2 className="text-xl font-bold mb-2 tracking-widest uppercase text-red-400">
            Falha de Conexão Neural
          </h2>
          <p className="text-sm text-red-400/60 mb-8 leading-relaxed">
            Sinal com o servidor interrompido. Reestabeleça o link de dados para continuar.
          </p>
          <button 
            onClick={() => reset()}
            className="flex items-center gap-2 px-6 py-3 bg-red-950/40 hover:bg-red-900/60 text-red-200 text-xs tracking-widest border border-red-500/30 transition-all rounded-md group"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            REINICIAR LINK
          </button>
        </div>
      </div>
    </div>
  );
}
