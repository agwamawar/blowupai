
import { MorphingText } from "@/components/MorphingText";
import { MorphingNumber } from "@/components/MorphingNumber";

export function Header() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Make your{" "}
        <span className="text-primary">
          <MorphingText />
        </span>
        {" "}go viral
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Based on <MorphingNumber /> viral content
      </p>
    </div>
  );
}
