import { MorphingText } from "@/components/MorphingText";

export function Header() {
  return (
    <div className="text-left space-y-4">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">
        How viral is your{" "}
        <span className="text-primary">
          <MorphingText />
        </span>
        ?
      </h1>
      <p className="text-lg text-gray-300 max-w-xl">
        Run your video through a real social media algorithm simulator. 
        See how your video will perform before you post.
      </p>
    </div>
  );
}