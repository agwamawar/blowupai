
import { Separator } from "@/components/ui/separator";

interface TermsSectionProps {
  sectionNumber: string;
  title: string;
  children: React.ReactNode;
  showSeparator?: boolean;
}

export function TermsSection({ sectionNumber, title, children, showSeparator = true }: TermsSectionProps) {
  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-3">{sectionNumber}. {title}</h2>
        {children}
      </div>
      {showSeparator && <Separator />}
    </>
  );
}
