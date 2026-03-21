'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import StarryBackground from '@/components/StarryBackground';
import NebulaScene from '@/components/NebulaScene';

const ENCOURAGING_QUOTES = [
  { text: "We are all in the gutter, but some of us are looking at the stars.", author: "Oscar Wilde" },
  { text: "A supernova doesn't destroy itself to end; it explodes to seed the universe with new beginnings.", author: "Aljo Jaison" },
  { text: "The nitrogen in our DNA, the calcium in our teeth, the iron in our blood... we are made of starstuff.", author: "Carl Sagan" },
  { text: "Hope is being able to see that there is light despite all of the darkness.", author: "Desmond Tutu" },
  { text: "Out of the ashes of a dying star, a new world is born. Your setbacks are the brilliant explosions preceding your next chapter.", author: "Unknown" },
  { text: "For my part I know nothing with any certainty, but the sight of the stars makes me dream.", author: "Vincent van Gogh" },
  { text: "It is only in our darkest hours that we may discover the true strength of the brilliant light within ourselves.", author: "Doe Zantamata" },
  { text: "Every great dream begins with a dreamer. You have within you the strength, the patience, and the passion to reach for the stars.", author: "Harriet Tubman" },
  { text: "Even the darkest night will end and the sun will rise.", author: "Victor Hugo" },
  { text: "There is a crack in everything, that's how the light gets in.", author: "Leonard Cohen" }
];

export default function Page() {
  const [quote, setQuote] = useState<{text: string, author: string} | null>(null);
  const [searchMode, setSearchMode] = useState('Hybrid');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const searchModes = ['Hybrid', 'Lexical', 'Semantic'];

  useEffect(() => {
    const randomQuote = ENCOURAGING_QUOTES[Math.floor(Math.random() * ENCOURAGING_QUOTES.length)];
    setQuote(randomQuote);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans selection:bg-white/20 relative overflow-hidden">
      <NebulaScene />
      <StarryBackground />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-4 pb-20 relative z-10">
        {/* Logo & Greeting */}
        <div className="flex flex-col items-center text-center mb-12 mt-[-10vh]">
          <div className="mb-10 opacity-80 hover:opacity-100 transition-opacity flex justify-center">
            <div 
              className="h-8 aspect-[198/15] bg-white" 
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
          <div className="relative flex items-center gap-2 bg-gradient-to-br from-white/15 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-full p-2 shadow-[0_8px_32px_rgba(0,0,0,0.45)] after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] after:pointer-events-none">
            {/* Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.04] mix-blend-soft-light pointer-events-none bg-noise rounded-full overflow-hidden"></div>
            
            <input
              type="text"
              placeholder="Search the cosmos..."
              className="relative z-10 flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-500 px-3 text-[15px]"
            />
            <div className="relative z-10 flex items-center gap-2 pr-1">
              {/* Search Mode Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1.5 px-2 py-1.5 text-[13px] font-medium text-gray-300 hover:text-white transition-colors"
                >
                  {searchMode}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-32 bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden py-1">
                    {searchModes.map((mode) => (
                      <button
                        key={mode}
                        onClick={() => {
                          setSearchMode(mode);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-[13px] transition-colors ${
                          searchMode === mode ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="p-2.5 bg-white/10 text-white hover:bg-white/20 rounded-full transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
