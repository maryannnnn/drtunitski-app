import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import './main-video-testimonials.scss';

// Импортируем изображения
import testimonial1 from '../../app/assets/images/testimonial/2.jpg';
import testimonial2 from '../../app/assets/images/testimonial/5.jpg';
import testimonial3 from '../../app/assets/images/testimonial/7.jpg';

const MainVideoTestimonials = () => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const { locale } = router;

    // Fallback function if translation is not available
    const safeT = (key) => {
        try {
            return t(key) || key;
        } catch (error) {
            console.warn('Translation error:', error);
            return key;
        }
    };

    const getLocalizedUrl = (url) => {
        // Для английского языка URL остается без изменений
        if (locale === 'en') {
            return url;
        }
        
        // Для всех slug страниц добавляем языковой суффикс к концу URL
        return `${url}-${locale}`;
    };

    const videoTestimonials = [
        {
            id: 1,
            image: testimonial1,
            title: safeT('videoTestimonials.afterOperation.title'),
            url: getLocalizedUrl('/media/after-operation')
        },
        {
            id: 2,
            image: testimonial2,
            title: safeT('videoTestimonials.whyChose.title'),
            url: getLocalizedUrl('/media/why-i-chose')
        },
        {
            id: 3,
            image: testimonial3,
            title: safeT('videoTestimonials.wantShare.title'),
            url: getLocalizedUrl('/media/i-want')
        }
    ];

    // Determine text direction based on locale
    const isRTL = locale === 'he' || locale === 'ar';
    const dir = isRTL ? 'rtl' : 'ltr';

    return (
        <div className="main-video-testimonials" dir={dir}>
            <div className="container">
                <div className="main-video-testimonials__header">
                    <h2 className="main-video-testimonials__title">
                        {safeT('videoTestimonials.title')}
                    </h2>
                </div>
                
                <div className="main-video-testimonials__grid">
                    {videoTestimonials.map((testimonial) => (
                        <Link 
                            key={testimonial.id} 
                            href={testimonial.url}
                            className="main-video-testimonials__card"
                        >
                            <div className="main-video-testimonials__card-image">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.title}
                                    width={300}
                                    height={200}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                                <div className="main-video-testimonials__play-overlay">
                                    <div className="main-video-testimonials__play-button">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                            <path d="M8 5V19L19 12L8 5Z" fill="#A43A4E"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="main-video-testimonials__card-content">
                                <h3 className="main-video-testimonials__card-title">
                                    {testimonial.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainVideoTestimonials;
