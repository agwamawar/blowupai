
import { useEffect, useState } from "react";

export function MorphingNumber() {
  const [number, setNumber] = useState(10420);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNumber(n => n + Math.floor(Math.random() * 5) + 1);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <span className="text-purple-600">
      {number.toLocaleString()}
    </span>
  );
}
