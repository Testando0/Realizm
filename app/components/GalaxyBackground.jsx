'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GalaxyBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 768;

    // Cena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05080f);

    // Câmera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, isMobile ? 1 : 2, isMobile ? 10 : 8);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    // ==================== GALÁXIA ====================
    const galaxyGroup = new THREE.Group();

    // Partículas da galáxia (menos partículas no mobile)
    const particleCount = isMobile ? 3000 : 8000;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x8b5cf6);
    const color2 = new THREE.Color(0x3b82f6);
    const color3 = new THREE.Color(0x34d399);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi) * 0.4;
      const z = radius * Math.cos(theta);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const mixColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixColor.r;
      colors[i * 3 + 1] = mixColor.g;
      colors[i * 3 + 2] = mixColor.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.06 : 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    galaxyGroup.add(particles);

    // ==================== ESTRELAS DE FUNDO ====================
    const starCount = isMobile ? 1500 : 3000;
    const starsGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 200;
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: isMobile ? 0.1 : 0.15,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // ==================== ANEL DE BRILHO ====================
    const ringGeometry = new THREE.TorusGeometry(2.2, 0.02, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.15,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.rotation.z = 0.3;
    galaxyGroup.add(ring);

    scene.add(galaxyGroup);

    // ==================== MOUSE / TOUCH PARALLAX ====================
    let mouseX = 0,
      mouseY = 0;
    const handleMove = (x, y) => {
      const nx = (x / width - 0.5) * 2;
      const ny = (y / height - 0.5) * 2;
      mouseX = nx;
      mouseY = ny;
    };

    const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      const touch = e.touches[0];
      if (touch) handleMove(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // ==================== ANIMAÇÃO ====================
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Rotação da galáxia
      galaxyGroup.rotation.y = elapsed * 0.05;
      galaxyGroup.rotation.x = Math.sin(elapsed * 0.02) * 0.05;
      galaxyGroup.rotation.z = Math.sin(elapsed * 0.01) * 0.03;

      // Paralaxe
      galaxyGroup.rotation.y += mouseX * 0.03;
      galaxyGroup.rotation.x += mouseY * 0.02;

      // Estrelas
      stars.rotation.y += 0.0002;

      // Anel pulsante
      ring.material.opacity = 0.1 + Math.sin(elapsed * 0.5) * 0.05;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // ==================== RESPONSIVIDADE ====================
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mobile = w < 768;
      camera.aspect = w / h;
      camera.position.set(0, mobile ? 1 : 2, mobile ? 10 : 8);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
  }
