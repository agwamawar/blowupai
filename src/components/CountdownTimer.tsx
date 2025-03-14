
import { useState, useEffect } from "react";

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 16,
    hours: Math.floor(Math.random() * 24),
    minutes: Math.floor(Math.random() * 60),
    seconds: Math.floor(Math.random() * 60)
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
              days--;
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-6 md:py-12 text-center">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Launching In</h2>
      <div className="flex flex-wrap justify-center gap-2 md:gap-6">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div 
            key={unit} 
            className="bg-white/30 backdrop-blur-md rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[100px] shadow-xl border border-white/20"
          >
            <div className="text-xl md:text-3xl font-bold">{value}</div>
            <div className="text-xs md:text-sm text-muted-foreground capitalize">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
