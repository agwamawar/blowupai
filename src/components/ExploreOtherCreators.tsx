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
    <section className="h-96 bg-black relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        {/* Deep purple to soft blue gradient on the right */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-blue-900/20 via-[#8d4c55]/30 to-transparent opacity-70"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#8d4c55]/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="w-full overflow-hidden relative">
          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight text-center">
              Join Other Small Creators
            </h2>
          </div>
          
          <div className="flex animate-scroll-left">
            {/* Duplicate videos for seamless loop */}
            {[...videoUrls, ...videoUrls].map((url, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 h-96 overflow-hidden shadow-[0_0_20px_rgba(139,69,255,0.6)] relative"
              >
                <video
                  src={url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default ExploreOtherCreators;