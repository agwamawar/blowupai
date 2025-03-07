
import { MorphingText } from "@/components/MorphingText";

export function Header() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        How viral is your{" "}
        <span className="text-primary">
          <MorphingText />
        </span>
        ?
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        With 85% predictive accuracy, see how your content will perform based on your Number of Followers.
      </p>
    </div>
  );
}
