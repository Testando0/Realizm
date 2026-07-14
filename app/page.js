'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import StarsCanvas from './components/StarsCanvas';
import ProgressBar from './components/ProgressBar';
import Step from './components/Step';

export default function Home() {
  const stepsRef = useRef([]);

  const stepsData = [
    {
      emoji: '🌌',
      title: 'O Cosmos',
      text: 'O universo observável contém mais de <strong class="text-purple-300">2 trilhões de galáxias</strong>. Cada uma delas abriga bilhões de estrelas, planetas e mistérios ainda não decifrados.',
      tag: 'Astrofísica',
      quote: '“Estamos todos feitos de poeira estelar.”',
    },
    {
      emoji: '🧬',
      title: 'Evolução',
      text: 'A vida na Terra existe há cerca de <strong class="text-blue-300">3,8 bilhões de anos</strong>. A seleção natural molda cada espécie, adaptando‑a ao ambiente num processo contínuo e fascinante.',
      tag: 'Biologia',
      highlight: 'DNA · mutação · adaptação',
    },
    {
      emoji: '🧪',
      title: 'Genética',
      text: 'O <strong class="text-purple-300">DNA humano</strong> contém cerca de 3 bilhões de pares de bases. Pequenas variações no código genético são responsáveis por toda a diversidade que vemos ao redor.',
      tag: 'Genômica',
      quote: '“A informação está nos genes.”',
    },
    {
      emoji: '🌍',
      title: 'Clima & Futuro',
      text: 'A ciência climática mostra que a temperatura média global já aumentou <strong class="text-emerald-300">1,1 °C</strong> desde a era pré‑industrial. O futuro depende das decisões que tomamos hoje.',
      tag: 'Ciência Ambiental',
      highlight: '+ sustentabilidade',
    },
    {
      emoji: '⚛️',
      title: 'Inovação',
      text: 'Da <strong class="text-blue-300">inteligência artificial</strong> à computação quântica, a tecnologia avança exponencialmente. A ciência nunca foi tão colaborativa e acessível como agora.',
      tag: 'Tecnociência',
      quote: '“O amanhã pertence a quem o constrói.”',
    },
  ];

  const setStepRef = (el, index) => {
    if (el) stepsRef.current[index] = el;
  };

  return (
    <>
      <StarsCanvas />
      <ProgressBar />

      <main className="relative z-10 max-w-3xl mx-auto px-6 py-20 md:py-28">
        <motion.header
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight hero-gradient leading-tight">
            Universo<br />em Movimento
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mt-4 font-light tracking-wide">
            Scrollytelling · Ciência &amp; Descoberta
          </p>
          <motion.div
            className="mt-8 h-1 w-24 mx-auto bg-gradient-to-r from-purple-500 to-emerald-400 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          />
        </motion.header>

        <section>
          {stepsData.map((step, index) => (
            <Step
              key={index}
              ref={(el) => setStepRef(el, index)}
              index={index}
              emoji={step.emoji}
              title={step.title}
              text={step.text}
              tag={step.tag}
              highlight={step.highlight}
              quote={step.quote}
            />
          ))}
        </section>

        <footer className="mt-24 pt-8 text-center text-xs text-gray-600 border-t border-white/5">
          <p>Ciência · Scrollytelling cinematográfico · 2026</p>
        </footer>
      </main>
    </>
  );
            }
