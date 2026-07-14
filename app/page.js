'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import GalaxyBackground from './components/GalaxyBackground';
import ProgressRing from './components/ProgressRing';
import Step from './components/Step';

export default function Home() {
  const stepsRef = useRef([]);

  const stepsData = [
    {
      emoji: '🌌',
      title: 'O Cosmos',
      text: 'O universo observável contém mais de 2 trilhões de galáxias. Cada uma delas abriga bilhões de estrelas, planetas e mistérios ainda não decifrados.',
      tag: 'Astrofísica',
      quote: '“Estamos todos feitos de poeira estelar.”',
      bgColor: 'rgba(20,10,50,0.3)',
    },
    {
      emoji: '🧬',
      title: 'Evolução',
      text: 'A vida na Terra existe há cerca de 3,8 bilhões de anos. A seleção natural molda cada espécie, adaptando‑a ao ambiente num processo contínuo e fascinante.',
      tag: 'Biologia',
      highlight: 'DNA · mutação · adaptação',
      bgColor: 'rgba(10,30,50,0.3)',
    },
    {
      emoji: '🧪',
      title: 'Genética',
      text: 'O DNA humano contém cerca de 3 bilhões de pares de bases. Pequenas variações no código genético são responsáveis por toda a diversidade que vemos ao redor.',
      tag: 'Genômica',
      quote: '“A informação está nos genes.”',
      bgColor: 'rgba(30,10,50,0.3)',
    },
    {
      emoji: '🌍',
      title: 'Clima & Futuro',
      text: 'A ciência climática mostra que a temperatura média global já aumentou 1,1 °C desde a era pré‑industrial. O futuro depende das decisões que tomamos hoje.',
      tag: 'Ciência Ambiental',
      highlight: '+ sustentabilidade',
      bgColor: 'rgba(10,40,30,0.3)',
    },
    {
      emoji: '⚛️',
      title: 'Inovação',
      text: 'Da inteligência artificial à computação quântica, a tecnologia avança exponencialmente. A ciência nunca foi tão colaborativa e acessível como agora.',
      tag: 'Tecnociência',
      quote: '“O amanhã pertence a quem o constrói.”',
      bgColor: 'rgba(20,20,50,0.3)',
    },
  ];

  const setStepRef = (el, index) => {
    if (el) stepsRef.current[index] = el;
  };

  return (
    <>
      <GalaxyBackground />
      <ProgressRing />

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-32">
        <motion.header
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-28"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight hero-glow leading-tight">
            Universo<br />em Movimento
          </h1>
          <p className="text-2xl md:text-3xl text-gray-400 mt-6 font-light tracking-wider">
            Scrollytelling · Cinema &amp; Ciência
          </p>
          <motion.div
            className="mt-10 h-1.5 w-32 mx-auto bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-400 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 1 }}
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
              bgColor={step.bgColor}
            />
          ))}
        </section>

        <footer className="mt-32 pt-10 text-center text-xs text-gray-600 border-t border-white/5 tracking-widest">
          <p>CIÊNCIA · SCROLLYTELLING · 2026</p>
        </footer>
      </main>
    </>
  );
    }
