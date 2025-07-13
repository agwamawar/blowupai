import React from 'react';
import ReactPlayer from 'react-player';

const ExploreOtherCreators: React.FC = () => {
  // Convert YouTube Shorts URLs to regular YouTube URLs for better compatibility
  const videoUrls = [
    'https://www.youtube.com/watch?v=eHQ1stu0cu0',
    'https://www.youtube.com/watch?v=TpPVQ_IotVg',
    'https://www.youtube.com/watch?v=VzBAe1Yuimg',
    'https://www.youtube.com/watch?v=Bhhgux3-10Y',
    'https://www.youtube.com/watch?v=1OF53QNbMrE',
    'https://www.youtube.com/watch?v=BmHKdkuyCWM',
    'https://www.youtube.com/watch?v=tOA8LDqE7oo',
    'https://www.youtube.com/watch?v=sxmTTS4qros',
    'https://www.youtube.com/watch?v=B2mSbRmCDrs',
    'https://www.youtube.com/watch?v=prCIcoD-HN8',
    'https://www.youtube.com/watch?v=8q-IA28Uz5U',
    'https://www.youtube.com/watch?v=pjOqf1SUMy8',
    'https://www.youtube.com/watch?v=gzcRnzwM7sc',
    'https://www.youtube.com/watch?v=UE6J-XG6I4M',
  ];

  const [playingIndex, setPlayingIndex] = React.useState<number | null>(null);

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
              className="aspect-[9/16] rounded-lg overflow-hidden bg-card border shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
              onClick={() => setPlayingIndex(playingIndex === index ? null : index)}
            >
              <ReactPlayer
                {...{
                  url,
                  width: '100%',
                  height: '100%',
                  playing: playingIndex === index,
                  loop: true,
                  muted: true,
                  controls: false,
                  style: { pointerEvents: 'none' }
                }}
              />
              {playingIndex !== index && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                    <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreOtherCreators;