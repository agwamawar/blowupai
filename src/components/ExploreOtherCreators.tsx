import React from 'react';
import ReactPlayer from 'react-player';

const ExploreOtherCreators: React.FC = () => {
  const videoUrls = [
    'https://youtube.com/shorts/eHQ1stu0cu0',
    'https://youtube.com/shorts/TpPVQ_IotVg',
    'https://youtube.com/shorts/VzBAe1Yuimg',
    'https://youtube.com/shorts/Bhhgux3-10Y',
    'https://youtube.com/shorts/1OF53QNbMrE',
    'https://youtube.com/shorts/BmHKdkuyCWM',
    'https://youtube.com/shorts/tOA8LDqE7oo',
    'https://youtube.com/shorts/sxmTTS4qros',
    'https://youtube.com/shorts/B2mSbRmCDrs',
    'https://youtube.com/shorts/prCIcoD-HN8',
    'https://youtube.com/shorts/8q-IA28Uz5U',
    'https://youtube.com/shorts/pjOqf1SUMy8',
    'https://youtube.com/shorts/gzcRnzwM7sc',
    'https://youtube.com/shorts/UE6J-XG6I4M',
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
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {videoUrls.map((url, index) => (
            <div
              key={index}
              className="aspect-[9/16] rounded-lg overflow-hidden bg-card border shadow-sm hover:shadow-md transition-shadow"
            >
              <ReactPlayer
                {...{
                  url,
                  width: '100%',
                  height: '100%',
                  playing: true,
                  loop: true,
                  muted: true,
                  controls: false,
                  style: { pointerEvents: 'none' }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreOtherCreators;