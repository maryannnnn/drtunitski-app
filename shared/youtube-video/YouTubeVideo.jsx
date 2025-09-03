import React from 'react';

const YouTubeVideo = () => {
    return (
        <div className="youtube-video">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/gq6MtTzdw2g?si=uUb_s6kJ5eyY-W2i"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
            </iframe>
        </div>
    );
};

export default YouTubeVideo;