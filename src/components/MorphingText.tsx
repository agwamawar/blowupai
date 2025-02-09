
import { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";

const TEXTS = ["Reel", "TikTok", "Short", "Snap"];

export function MorphingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      2000
    );
    return () => clearInterval(intervalId);
  }, []);

  return (
    <TextTransition springConfig={presets.wobbly} inline>
      {TEXTS[index % TEXTS.length]}
    </TextTransition>
  );
}
