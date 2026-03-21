'use client';

import { useState, useEffect } from 'react';
import { PanelLeft, Plus, Mic, ArrowUp } from 'lucide-react';
import Image from 'next/image';
import StarryBackground from '@/components/StarryBackground';

const ENCOURAGING_QUOTES = [
  { text: "Turn wounds into wisdom.", author: "Oprah Winfrey" },
  { text: "Fortune favors the bold.", author: "Virgil" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "Keep moving forward.", author: "Walt Disney" },
  { text: "Do it with passion.", author: "Christian Dior" },
  { text: "Follow your bliss.", author: "Joseph Campbell" },
  { text: "Nothing endures but change.", author: "Heraclitus" },
  { text: "Less is more.", author: "Ludwig Mies van der Rohe" },
  { text: "Knowledge is power.", author: "Sir Francis Bacon" },
  { text: "Begin anywhere.", author: "John Cage" },
  { text: "Leave no stone unturned.", author: "Euripides" },
  { text: "Be the change.", author: "Mahatma Gandhi" }
];

export default function Page() {
  const [quote, setQuote] = useState<{text: string, author: string} | null>(null);

  useEffect(() => {
    const randomQuote = ENCOURAGING_QUOTES[Math.floor(Math.random() * ENCOURAGING_QUOTES.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans selection:bg-white/20 relative overflow-hidden">
      <StarryBackground />
      
      {/* Header */}
      <header className="flex justify-between items-center p-4 w-full relative z-10">
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
          <PanelLeft className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-4 pb-20 relative z-10">
        {/* Logo & Greeting */}
        <div className="flex flex-col items-center text-center mb-12 mt-[-10vh]">
          <div className="mb-10 opacity-80 hover:opacity-100 transition-opacity flex justify-center">
            <div 
              className="h-5 aspect-[198/15] bg-white" 
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
            />
          </div>
          <div className={`transition-opacity duration-700 ${quote ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-[22px] font-normal text-gray-300 mb-1 text-center">
              {quote?.text || "Good to See You!"}
            </h1>
            {quote && (
              <div className="text-right">
                <span className="text-[13px] italic text-gray-500">
                  ~ {quote.author}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="w-full flex flex-col gap-3 relative group">
          {/* Input Box */}
          <div className="relative flex items-center gap-2 bg-gradient-to-br from-white/15 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-2 shadow-[0_8px_32px_rgba(0,0,0,0.45)] overflow-hidden after:absolute after:inset-0 after:rounded-xl after:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] after:pointer-events-none">
            {/* Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.04] mix-blend-soft-light pointer-events-none bg-noise"></div>
            
            <button className="relative z-10 p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
            </button>
            <input
              type="text"
              placeholder="Ask anything..."
              className="relative z-10 flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-500 px-1 text-[15px]"
            />
            <div className="relative z-10 flex items-center gap-1 pr-1">
              <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <Mic className="w-5 h-5" />
              </button>
              <button className="p-2.5 bg-white/10 text-white hover:bg-white/20 rounded-lg transition-colors">
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
