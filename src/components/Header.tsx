
import React from "react";

export function Header() {
  return (
    <div className="text-left space-y-4 py-8">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight font-[Alfa_Slab_One]">
        <span className="text-black">Hey, </span>
        <span className="bg-gradient-to-r from-purple-600 to-yellow-400 bg-clip-text text-transparent">Stranger</span>
      </h1>
      <p className="text-lg text-muted-foreground">
        Let's Make Your <span className="font-medium">'Morphing Text'</span> BlowUp
      </p>
    </div>
  );
}
