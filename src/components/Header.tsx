
import { MorphingText } from "@/components/MorphingText";

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
        With 85% predictive accuracy, see how your content will perform before you post
      </p>
    </div>
  );
}
