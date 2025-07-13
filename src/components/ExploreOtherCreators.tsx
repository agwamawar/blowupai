import React, { useState } from 'react';

const ExploreOtherCreators: React.FC = () => {
  const [loadErrors, setLoadErrors] = useState<Set<number>>(new Set());
  
  const videoUrls = [
    'https://github.com/agwamawar/blowupai/raw/refs/heads/main/videos/VID_20250424_162625_848.mp4',
    'https://github.com/agwamawar/blowupai/raw/refs/heads/main/videos/VID_20250424_163638_600.mp4',
    'https://github.com/agwamawar/blowupai/raw/refs/heads/main/videos/VID_20250424_164925_356.mp4',
    'https://github.com/agwamawar/blowupai/raw/refs/heads/main/videos/VID_20250504_110233_300.mp4',
    'https://github.com/agwamawar/blowupai/raw/refs/heads/main/videos/VID_20250506_042708_608.mp4',
    'https://github.com/agwamawar/blowupai/raw/refs/heads/main/videos/VID_20250510_130012_998.mp4',
    'https://github.com/agwamawar/blowupai/raw/refs/heads/main/videos/VID_20250524_063257_625.mp4',
    'https://github.com/agwamawar/blowupai/raw/refs/heads/main/videos/VID_20250601_144914_602.mp4',
    'https://github.com/agwamawar/blowupai/raw/refs/heads/main/videos/VID_20250605_024058_558.mp4',
    'https://github.com/agwamawar/blowupai/raw/refs/heads/main/videos/VID_20250607_173051_461.mp4',
    'https://github.com/agwamawar/blowupai/raw/refs/heads/main/videos/VID_20480405_110639_160.mp4',
    'https://github.com/agwamawar/blowupai/raw/refs/heads/main/videos/VID_31731030_000244_570.mp4',
    'https://github.com/agwamawar/blowupai/raw/refs/heads/main/videos/VID_77050320_100834_603.mp4',
  ];

  const handleVideoError = (index: number, error: any) => {
    console.error(`Video ${index} failed to load:`, error);
    setLoadErrors(prev => new Set([...prev, index]));
  };

  const handleVideoLoad = (index: number) => {
    console.log(`Video ${index} loaded successfully`);
  };

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
              className="aspect-[9/16] rounded-lg overflow-hidden bg-card border shadow-sm hover:shadow-md transition-shadow relative"
            >
              {loadErrors.has(index) ? (
                <div className="w-full h-full bg-muted flex flex-col items-center justify-center text-muted-foreground p-4">
                  <div className="w-12 h-12 rounded-full bg-muted-foreground/20 flex items-center justify-center mb-2">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-center">Video Preview</span>
                </div>
              ) : (
                <video
                  src={url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  onError={(e) => handleVideoError(index, e)}
                  onLoadedData={() => handleVideoLoad(index)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreOtherCreators;