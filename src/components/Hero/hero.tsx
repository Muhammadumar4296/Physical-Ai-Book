// src/components/Hero/Hero.tsx
import React from 'react';
import Link from '@docusaurus/Link';

interface HeroProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title = "Physical AI & Humanoid Robotics",
  subtitle = "Master the Future of Embodied Intelligence",
  buttonText = "Start Learning Physical AI →",
  buttonLink = "/docs/intro"
}) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image + Dark Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1625314887428-35c4d3e3c8f7?w=1920&q=85&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight">
          {title}
        </h1>
        <p className="text-xl md:text-3xl text-cyan-200 mb-10 font-light">
          {subtitle}
        </p>
        <Link
          to={buttonLink}
          className="inline-block bg-cyan-400 text-black font-bold text-xl px-10 py-5 rounded-full hover:bg-cyan-300 transform hover:scale-105 transition-all duration-300 shadow-2xl"
        >
          {buttonText}
        </Link>
      </div>

      {/* Floating particles effect (optional pro touch) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </div>
  );
};