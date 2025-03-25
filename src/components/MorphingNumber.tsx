import { useEffect, useState } from "react";

export function MorphingNumber() {
  const [number, setNumber] = useState(2402300);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNumber(n => n + Math.floor(Math.random() * 5) + 1);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <span className="text-red-600">
      {number.toLocaleString()}
    </span>
  );
}