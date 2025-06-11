
import * as React from "react";

interface CopySection {
  heading: string;
  content: string;
}

interface CopyContent {
  title: string;
  subtitle: string;
  sections: CopySection[];
}

interface FormCopySectionProps {
  content: CopyContent;
}

export function FormCopySection({ content }: FormCopySectionProps) {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 flex flex-col justify-center">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            {content.title}
          </h2>
          <p className="text-muted-foreground">
            {content.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {content.sections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                {section.heading}
              </h4>
              {section.content && (
                <div className="text-muted-foreground whitespace-pre-line">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="pt-6 border-t border-primary/20">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-green-500">🔒</span>
            <span>Your information is encrypted and secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}
