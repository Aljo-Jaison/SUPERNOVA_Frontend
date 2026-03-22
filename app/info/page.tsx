'use client';

import StarryBackground from '@/components/StarryBackground';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

export default function InfoPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-[200vh] bg-[#0a0a0a] text-white flex flex-col font-sans selection:bg-white/20 relative overflow-x-hidden">
      <StarryBackground />

      {/* Fixed Logo */}
      <Link 
        href="/"
        className={`fixed z-50 transition-all duration-700 ease-in-out origin-top-right cursor-pointer ${
          isScrolled 
            ? 'top-8 right-8 translate-x-0 translate-y-0 scale-[0.25]' 
            : 'top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 scale-100'
        }`}
      >
        <div 
          className="relative h-11 aspect-[198/15] overflow-hidden"
          style={{
            WebkitMaskImage: 'url(/logowhite.svg)',
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskImage: 'url(/logowhite.svg)',
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
          }}
          aria-label="Logo"
        >
          {/* Base Background */}
          <div className="absolute inset-0 bg-white/80"></div>
          
          {/* Shiny Effect Overlay */}
          <div className="absolute top-0 left-0 w-[50%] h-full bg-gradient-to-r from-transparent via-[#252525] to-transparent animate-shine [animation-duration:7s]"></div>
        </div>
      </Link>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-between w-full max-w-3xl mx-auto px-4 relative z-10 h-screen">
        
        {/* Top Spacer */}
        <div className="flex-1"></div>

        {/* Center Content Placeholder */}
        <div className="flex flex-col items-center justify-center w-full h-11">
        </div>

        {/* Bottom Content: Scroll Down Indicator */}
        <div className={`flex-1 flex flex-col items-center justify-end pb-12 transition-opacity duration-500 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm mb-3">
            <ArrowDown className="w-5 h-5 text-white/80 animate-bounce" />
          </div>
          <span className="text-[11px] uppercase tracking-widest text-white/50 font-medium">
            Scroll Down
          </span>
        </div>
      </main>

      {/* Additional Content Section to allow scrolling */}
      <section className="w-full max-w-3xl mx-auto px-4 py-24 relative z-10 min-h-screen flex flex-col items-start justify-center">
        <ScrollReveal 
          containerClassName="w-full !m-0 mb-6"
          textClassName="text-4xl md:text-5xl font-clash font-bold tracking-wide text-left text-white !m-0"
        >
          What is SUPERNOVA?
        </ScrollReveal>
        <ScrollReveal
          containerClassName="w-full !m-0"
          textClassName="text-white/60 text-left max-w-lg leading-relaxed text-base font-normal !m-0"
        >
          SUPERNOVA is an Agentic RAG-based system that integrates multi-retrieval techniques, intelligent fusion, and iterative reasoning to deliver highly accurate and context-aware responses.
        </ScrollReveal>
      </section>
      <section className="w-full max-w-3xl mx-auto px-4 py-24 relative z-10 min-h-screen flex flex-col items-start justify-center">
        <ScrollReveal 
          containerClassName="w-full !m-0 mb-12"
          textClassName="text-4xl md:text-5xl font-clash font-bold tracking-wide text-left text-white !m-0"
        >
          How SUPERNOVA works?
        </ScrollReveal>
        
        <div className="flex flex-col gap-12 text-left w-full">
          {/* Step 1 */}
          <div className="flex flex-col gap-4">
            <ScrollReveal 
              containerClassName="w-full !m-0"
              textClassName="text-2xl font-clash font-semibold text-white !m-0"
            >
              1. Multi-Retrieval System
            </ScrollReveal>
            <div className="text-white/60 leading-relaxed space-y-2">
              <ScrollReveal containerClassName="!m-0" textClassName="text-base font-normal !m-0">Instead of a single retriever, it uses:</ScrollReveal>
              <ul className="list-disc list-inside pl-2 space-y-1">
                <li><strong className="text-white/80 font-medium">Dense Retrieval</strong> → understands meaning (semantic)</li>
                <li><strong className="text-white/80 font-medium">Sparse Retrieval (BM25)</strong> → keyword matching</li>
                <li><strong className="text-white/80 font-medium">Multi-vector Retrieval</strong> → deep contextual matching</li>
              </ul>
              <ScrollReveal containerClassName="pt-2 !m-0" textClassName="text-white/80 text-base font-normal !m-0">This ensures no important information is missed</ScrollReveal>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col gap-4">
            <ScrollReveal 
              containerClassName="w-full !m-0"
              textClassName="text-2xl font-clash font-semibold text-white !m-0"
            >
              2. Fusion & Ranking Layer
            </ScrollReveal>
            <div className="text-white/60 leading-relaxed space-y-2">
              <ul className="list-disc list-inside pl-2 space-y-1">
                <li>Combines results from all retrievers</li>
                <li>Removes duplicates</li>
                <li>Ranks the most relevant content</li>
              </ul>
              <ScrollReveal containerClassName="pt-2 !m-0" textClassName="text-white/80 text-base font-normal !m-0">Like a filter that picks only the best knowledge</ScrollReveal>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col gap-4">
            <ScrollReveal 
              containerClassName="w-full !m-0"
              textClassName="text-2xl font-clash font-semibold text-white !m-0"
            >
              3. Agentic Reasoning Layer
            </ScrollReveal>
            <div className="text-white/60 leading-relaxed space-y-2">
              <ul className="list-disc list-inside pl-2 space-y-1">
                <li>Breaks down the query</li>
                <li>Decides if more retrieval is needed</li>
                <li>Refines search iteratively</li>
              </ul>
              <ScrollReveal containerClassName="pt-2 !m-0" textClassName="text-white/80 text-base font-normal !m-0">This is where it becomes intelligent, not just reactive</ScrollReveal>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col gap-4">
            <ScrollReveal 
              containerClassName="w-full !m-0"
              textClassName="text-2xl font-clash font-semibold text-white !m-0"
            >
              4. Response Generation
            </ScrollReveal>
            <div className="text-white/60 leading-relaxed space-y-2">
              <ul className="list-disc list-inside pl-2 space-y-1">
                <li>Uses the refined, high-quality context</li>
                <li>Produces accurate, grounded answers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  );
}
