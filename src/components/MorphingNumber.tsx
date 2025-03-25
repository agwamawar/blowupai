
import { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";

export function MorphingNumber() {
  const [number, setNumber] = useState(10420);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNumber(n => n + Math.floor(Math.random() * 5) + 1);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <span className="text-purple-500">
      <TextTransition springConfig={presets.wobbly} inline>
        {number.toLocaleString()}
      </TextTransition>
    </span>
  );
}
