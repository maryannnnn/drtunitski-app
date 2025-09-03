import React, { useState } from 'react';
import './youtube-video.scss'
import dynamic from 'next/dynamic';
import Image from 'next/image';

const DynamicYouTubeVideo = dynamic(() => import('./YouTubeVideo.jsx'), {
    ssr: false,
});

const YouTubeVideoWithCover = () => {
    const [showVideo, setShowVideo] = useState(false);

    const handleShowVideo = () => {
        setShowVideo(true);
    };

    return (
        <div className="youtube-video-wrapper">
            {showVideo ? (
                <DynamicYouTubeVideo  />
            ) : (
                <DynamicYouTubeVideo  />
                // <div onClick={handleShowVideo} className="youtube-video-wrapper__cover">
                //     <Image src='/images/video/tovman.jpg' alt="YouTube cover" width={560} height={315} />
                //     <div className="youtube-video-wrapper__cover-play">▶</div>
                // </div>
            )}
        </div>
    );
};

export default YouTubeVideoWithCover;

