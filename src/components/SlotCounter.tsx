
import { useState, useEffect } from 'react';

export function SlotCounter() {
  const [slotsLeft, setSlotsLeft] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlotsLeft((prev) => Math.max(0, prev - 1));
    }, 60000); // Updates every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary/10 px-3 py-1.5 rounded-full text-sm font-semibold text-primary border border-primary/20">
      {slotsLeft} Slots Left
    </div>
  );
}
