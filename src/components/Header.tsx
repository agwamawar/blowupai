
import React from "react";

export function Header() {
  return (
    <div className="text-left space-y-4 py-8">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight font-[Alfa_Slab_One]">
        <span className="text-black">Hey, </span>
        <span className="text-transparent bg-clip-text bg-primary-gradient">Stranger</span>
      </h1>
      <p className="text-lg text-muted-foreground">
        Let's Make Your <span className="font-medium">content</span> BlowUp on your socials
      </p>
    </div>
  );
}
