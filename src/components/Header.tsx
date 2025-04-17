
import React from "react";

export function Header() {
  return (
    <div className="text-center space-y-4 py-8">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
        Hey, <span className="bg-gradient-to-r from-purple-600 to-yellow-400 bg-clip-text text-transparent">Stranger</span>
      </h1>
      <p className="text-lg text-muted-foreground max-w-xl mx-auto">
        Let's Make Your <span className="font-medium">'Morphing Text'</span> BlowUp
      </p>
    </div>
  );
}
