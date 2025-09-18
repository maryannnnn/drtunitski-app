import React from 'react';
import VideoDisplay from './VideoDisplay';

const VideoDisplayTest = () => {
  const testUrls = [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'youtube.com/watch?v=dQw4w9WgXcQ',
    'https://www.facebook.com/watch/?v=123456789',
    'facebook.com/watch/?v=123456789',
    'https://www.tiktok.com/@user/video/123456789',
    'tiktok.com/@user/video/123456789',
    'https://www.instagram.com/p/ABC123/',
    'instagram.com/p/ABC123/',
    'invalid-url',
    ''
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Тест компонента VideoDisplay с обтеканием</h2>
      {testUrls.slice(0, 3).map((url, index) => (
        <div key={index} style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '20px' }}>
          <h3>Тест {index + 1}: {url || '(пустая строка)'}</h3>
          <div className="story__video">
            <div className="story__video-content">
              <VideoDisplay
                videoUrl={url}
                title={`Тестовое видео ${index + 1}`}
              />
            </div>
            <div className="story__video-text">
              <p>Это описание для тестового видео {index + 1}. Текст должен обтекать видео справа на десктопе. На мобильных устройствах видео должно быть сверху, а текст снизу. Это длинное описание, чтобы показать, как работает обтекание текста вокруг видео блока.</p>
              <p>Второй абзац для демонстрации обтекания. Видео должно быть слева с фиксированной шириной 300px, а весь этот текст должен красиво обтекать его справа.</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoDisplayTest;
