import React, { useState, useEffect } from 'react';
import { processVideoUrl, isValidUrl } from '../utils/video-utils';
import './video-display.scss';

const VideoDisplay = ({ videoUrl, title, description, className = '', style = {}, mobileStyle = {} }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  if (!videoUrl) {
    return null;
  }

  if (!isValidUrl(videoUrl)) {
    return (
      <div className={`video-display ${className}`}>
        <div className="video-display__error">
          <p>Неверная ссылка на видео: {videoUrl}</p>
        </div>
      </div>
    );
  }

  const videoInfo = processVideoUrl(videoUrl);

  // Если нет видео, не показываем ничего
  if (!videoUrl) {
    return null;
  }

  // Если не YouTube, показываем ссылку
  if (videoInfo.type !== 'youtube' || !videoInfo.embedUrl) {
    return (
      <a 
        href={videoInfo.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="video-display__link-button"
      >
        <span className="video-display__link-icon">▶</span>
        <span className="video-display__link-text">
          {videoInfo.type === 'youtube' ? 'Смотреть на YouTube' :
           videoInfo.type === 'facebook' ? 'Смотреть на Facebook' :
           videoInfo.type === 'tiktok' ? 'Смотреть на TikTok' :
           videoInfo.type === 'instagram' ? 'Смотреть в Instagram' :
           'Смотреть видео'}
        </span>
      </a>
    );
  }

  // Для YouTube показываем iframe
  const currentStyle = isMobile ? { ...style, ...mobileStyle } : style;
  
  return (
    <iframe
      src={videoInfo.embedUrl}
      title={title || 'Video'}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={currentStyle}
    />
  );
};

export default VideoDisplay;
