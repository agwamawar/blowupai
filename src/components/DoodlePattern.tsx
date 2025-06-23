
import React from 'react';
import { Camera, Smartphone, Video, Mic, Heart, Youtube, Laptop, Rocket, Lightbulb, Hash, ThumbsUp } from 'lucide-react';

export function DoodlePattern() {
  return (
    <div className="absolute inset-0 opacity-20 overflow-hidden pointer-events-none">
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 800 600" 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255, 248, 250, 0.1) 0%, rgba(240, 248, 255, 0.1) 100%)'
        }}
      >
        <defs>
          <pattern id="doodlePattern" x="0" y="0" width="200" height="150" patternUnits="userSpaceOnUse">
            {/* Camera */}
            <g transform="translate(20, 20)" stroke="#333" strokeWidth="1.5" fill="none">
              <Camera size={16} className="stroke-current opacity-60" />
            </g>
            
            {/* Smartphone */}
            <g transform="translate(160, 30)" stroke="#333" strokeWidth="1.5" fill="none">
              <Smartphone size={14} className="stroke-current opacity-60" />
            </g>
            
            {/* Video play button */}
            <g transform="translate(80, 15)" stroke="#333" strokeWidth="1.5" fill="none">
              <Video size={15} className="stroke-current opacity-60" />
            </g>
            
            {/* Ring light (circle with dots) */}
            <g transform="translate(140, 70)" stroke="#333" strokeWidth="1.5" fill="none">
              <circle cx="8" cy="8" r="6" opacity="0.6" />
              <circle cx="8" cy="2" r="1" fill="#333" opacity="0.6" />
              <circle cx="14" cy="8" r="1" fill="#333" opacity="0.6" />
              <circle cx="8" cy="14" r="1" fill="#333" opacity="0.6" />
              <circle cx="2" cy="8" r="1" fill="#333" opacity="0.6" />
            </g>
            
            {/* Microphone */}
            <g transform="translate(50, 80)" stroke="#333" strokeWidth="1.5" fill="none">
              <Mic size={14} className="stroke-current opacity-60" />
            </g>
            
            {/* Chat bubble */}
            <g transform="translate(10, 120)" stroke="#333" strokeWidth="1.5" fill="none">
              <path d="M2,2 L14,2 Q16,2 16,4 L16,10 Q16,12 14,12 L6,12 L2,16 L2,4 Q2,2 4,2" opacity="0.6" />
            </g>
            
            {/* Heart */}
            <g transform="translate(120, 25)" stroke="#333" strokeWidth="1.5" fill="none">
              <Heart size={12} className="stroke-current opacity-60" />
            </g>
            
            {/* YouTube icon */}
            <g transform="translate(170, 100)" stroke="#333" strokeWidth="1.5" fill="none">
              <Youtube size={16} className="stroke-current opacity-60" />
            </g>
            
            {/* TikTok symbol (musical note) */}
            <g transform="translate(30, 50)" stroke="#333" strokeWidth="1.5" fill="none">
              <path d="M6,2 Q8,2 8,4 L8,12 Q8,14 6,14 Q4,14 4,12 Q4,10 6,10 Q8,10 8,8 L8,4 Q10,6 12,6" opacity="0.6" />
            </g>
            
            {/* Laptop */}
            <g transform="translate(100, 110)" stroke="#333" strokeWidth="1.5" fill="none">
              <Laptop size={18} className="stroke-current opacity-60" />
            </g>
            
            {/* Sparkles */}
            <g transform="translate(180, 60)" stroke="#333" strokeWidth="1.5" fill="none">
              <path d="M8,2 L9,6 L13,7 L9,8 L8,12 L7,8 L3,7 L7,6 Z" opacity="0.6" />
            </g>
            
            {/* Sparkles small */}
            <g transform="translate(60, 40)" stroke="#333" strokeWidth="1.5" fill="none">
              <path d="M4,1 L4.5,3 L6.5,3.5 L4.5,4 L4,6 L3.5,4 L1.5,3.5 L3.5,3 Z" opacity="0.6" />
            </g>
            
            {/* Thumbs up */}
            <g transform="translate(150, 120)" stroke="#333" strokeWidth="1.5" fill="none">
              <ThumbsUp size={14} className="stroke-current opacity-60" />
            </g>
            
            {/* Rocket */}
            <g transform="translate(90, 70)" stroke="#333" strokeWidth="1.5" fill="none">
              <Rocket size={15} className="stroke-current opacity-60" />
            </g>
            
            {/* Lightbulb */}
            <g transform="translate(20, 90)" stroke="#333" strokeWidth="1.5" fill="none">
              <Lightbulb size={14} className="stroke-current opacity-60" />
            </g>
            
            {/* Hashtag */}
            <g transform="translate(130, 50)" stroke="#333" strokeWidth="1.5" fill="none">
              <Hash size={12} className="stroke-current opacity-60" />
            </g>
            
            {/* Additional decorative elements */}
            {/* Wavy lines */}
            <g transform="translate(40, 100)" stroke="#333" strokeWidth="1" fill="none" opacity="0.4">
              <path d="M0,0 Q5,3 10,0 Q15,3 20,0" />
            </g>
            
            {/* Dots */}
            <circle cx="70" cy="60" r="1.5" fill="#333" opacity="0.4" />
            <circle cx="110" cy="90" r="1" fill="#333" opacity="0.4" />
            <circle cx="160" cy="40" r="1.5" fill="#333" opacity="0.4" />
            
            {/* Small stars */}
            <g transform="translate(190, 20)" stroke="#333" strokeWidth="1" fill="none" opacity="0.5">
              <path d="M2,0 L2.5,1.5 L4,2 L2.5,2.5 L2,4 L1.5,2.5 L0,2 L1.5,1.5 Z" />
            </g>
            
            {/* Connection lines */}
            <g stroke="#333" strokeWidth="0.5" fill="none" opacity="0.3">
              <path d="M35,25 Q45,35 55,25" strokeDasharray="2,2" />
              <path d="M145,35 Q155,45 165,35" strokeDasharray="2,2" />
            </g>
          </pattern>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#doodlePattern)" />
      </svg>
    </div>
  );
}
