import React from 'react';

const ExploreOtherCreators: React.FC = () => {
  const videoUrls = [
    'https://www.blowupai.com/%40daveramsey%20STILL%20Hates%20Debt.mp4',
    'https://www.blowupai.com/A_thing_happened_last_night_Welcome_to_my_sis_%40jackiehillperry_to.mp4',
    'https://www.blowupai.com/Attachment_Style_Studios_Present_Anxious_and_Avoidant_Wedding_%40.mp4',
    'https://www.blowupai.com/I%E2%80%99m_taking_small_steps_on_this_journey_because_any_progress%2C_no.mp4',
    'https://www.blowupai.com/What_an_insane_saga_For_those_of_you_who_weren%E2%80%99t_refreshing_X_all.mp4',
    'https://www.blowupai.com/a8573291ac375a56863a0dbe2f12d387.mp4',
    'https://www.blowupai.com/videoplayback%20(4).mp4',
  ];

  return (
    <section className="py-16 px-4 bg-background/50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Other Creators
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover trending content from successful creators and get inspired for your next viral video
          </p>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-7 gap-4 md:gap-2">
          {videoUrls.map((url, index) => (
            <div
              key={index}
              className="aspect-[9/16] rounded-lg overflow-hidden bg-card border shadow-sm hover:shadow-md transition-shadow"
            >
              <video
                src={url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreOtherCreators;