'use client';

import { useEffect, useRef } from 'react';
import StarsCanvas from './components/StarsCanvas';
import Step from './components/Step';

export default function Home() {
  const stepsRef = useRef([]);
  const progressRef = useRef(null);

  const stepsData = [
    {
      emoji: '🌌',
      title: 'O Cosmos',
      text: 'O universo observável contém mais de <strong>2 trilhões de galáxias</strong>. Cada uma delas abriga bilhões de estrelas, planetas e mistérios ainda não decifrados.',
      tag: 'Astrofísica',
      quote: '“Estamos todos feitos de poeira estelar.”',
    },
    {
      emoji: '🧬',
      title: 'Evolução',
      text: 'A vida na Terra existe há cerca de <strong>3,8 bilhões de anos</strong>. A seleção natural molda cada espécie, adaptando‑a ao ambiente num processo contínuo e fascinante.',
      tag: 'Biologia',
      highlight: 'DNA · mutação · adaptação',
    },
    {
      emoji: '🧪',
      title: 'Genética',
      text: 'O <strong>DNA humano</strong> contém cerca de 3 bilhões de pares de bases. Pequenas variações no código genético são responsáveis por toda a diversidade que vemos ao redor.',
      tag: 'Genômica',
      quote: '“A informação está nos genes.”',
    },
    {
      emoji: '🌍',
      title: 'Clima & Futuro',
      text: 'A ciência climática mostra que a temperatura média global já aumentou <strong>1,1 °C</strong> desde a era pré‑industrial. O futuro depende das decisões que tomamos hoje.',
      tag: 'Ciência Ambiental',
      highlight: '+ sustentabilidade',
    },
    {
      emoji: '⚛️',
      title: 'Inovação',
      text: 'Da <strong>inteligência artificial</strong> à computação quântica, a tecnologia avança exponencialmente. A ciência nunca foi tão colaborativa e acessível como agora.',
      tag: 'Tecnociência',
      quote: '“O amanhã pertence a quem o constrói.”',
    },
  ];

  useEffect(() => {
    const steps = stepsRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-active');
          }
        });
      },
      { threshold: 0.25, rootMargin: '0px 0px -40px 0px' }
    );

    steps.forEach((step) => observer.observe(step));

    // Ativa o primeiro se já estiver visível
    setTimeout(() => {
      steps.forEach((step) => {
        const rect = step.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          step.classList.add('is-active');
        }
      });
    }, 400);

    return () => observer.disconnect();
  }, []);

  // Barra de progresso
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressRef.current) {
        progressRef.current.style.width = `${Math.min(progress, 100)}%`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const setStepRef = (el, index) => {
    if (el) stepsRef.current[index] = el;
  };

  return (
    <>
      <StarsCanvas />
      <div className="progress-bar" ref={progressRef} />
      <div className="container">
        <header className="hero">
          <h1>Universo<br />em Movimento</h1>
          <p>Scrollytelling · Ciência &amp; Descoberta</p>
        </header>
        <section className="scrolly-section">
          {stepsData.map((step, index) => (
            <Step
              key={index}
              ref={(el) => setStepRef(el, index)}
              emoji={step.emoji}
              title={step.title}
              text={step.text}
              tag={step.tag}
              highlight={step.highlight}
              quote={step.quote}
            />
          ))}
        </section>
        <footer className="footer">
          <p>Ciência · Scrollytelling cinematográfico</p>
        </footer>
      </div>
    </>
  );
}
