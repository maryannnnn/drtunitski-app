import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSafeTranslation } from '../../shared/hooks/useSafeTranslation';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_MEDIA_ALL } from '../../entities/media/actions/mediaActions';
import { filterByLanguage } from '../../shared/utils/language-filter';
import './main-video-testimonials.scss';

// Импортируем изображения
import testimonial1 from '../../app/assets/images/testimonial/2.jpg';
import testimonial2 from '../../app/assets/images/testimonial/5.jpg';
import testimonial3 from '../../app/assets/images/testimonial/7.jpg';

const MainVideoTestimonials = () => {
    const { t } = useSafeTranslation('common');
    const router = useRouter();
    const { locale } = router;

    // Получаем реальные посты из WordPress
    const { loading, error, data } = useQuery(GET_MEDIA_ALL, {
        fetchPolicy: "cache-first",
        nextFetchPolicy: "cache-and-network"
    });

    // Теперь используем useSafeTranslation, поэтому safeT не нужен
    const safeT = t;

    const getLocalizedUrl = (slug) => {
        // Для английского языка URL остается без изменений
        if (locale === 'en') {
            return `/media/${slug}`;
        }
        
        // Для всех slug страниц добавляем языковой суффикс к концу URL
        return `/media/${slug}-${locale}`;
    };

    // Фильтруем посты по языку
    const filteredMedias = data?.AcfMedias?.edges ? filterByLanguage(data.AcfMedias.edges, locale) : [];
    
    // Отладочная информация
    console.log('MainVideoTestimonials - All AcfMedias:', data?.AcfMedias?.edges);
    console.log('MainVideoTestimonials - Filtered AcfMedias for locale', locale, ':', filteredMedias);
    console.log('MainVideoTestimonials - Loading:', loading, 'Error:', error);
    
    // Берем первые 3 поста или используем fallback
    const videoTestimonials = filteredMedias.slice(0, 3).map((item, index) => {
        const AcfMedia = item.node;
        const fallbackImages = [testimonial1, testimonial2, testimonial3];
        const fallbackTitles = [
            safeT('videoTestimonials.afterOperation.title'),
            safeT('videoTestimonials.whyChose.title'),
            safeT('videoTestimonials.wantShare.title')
        ];
        
        return {
            id: AcfMedia.id,
            image: AcfMedia.AcfMedia?.imageAnons?.sourceUrl || fallbackImages[index] || testimonial1,
            title: AcfMedia.AcfMedia?.titleLong || AcfMedia.title || fallbackTitles[index] || 'Video Testimonial',
            url: getLocalizedUrl(AcfMedia.slug)
        };
    });

    // Если нет постов, используем fallback данные
    const finalVideoTestimonials = videoTestimonials.length > 0 ? videoTestimonials : [
        {
            id: 1,
            image: testimonial1,
            title: safeT('videoTestimonials.afterOperation.title'),
            url: getLocalizedUrl('after-operation')
        },
        {
            id: 2,
            image: testimonial2,
            title: safeT('videoTestimonials.whyChose.title'),
            url: getLocalizedUrl('why-i-chose')
        },
        {
            id: 3,
            image: testimonial3,
            title: safeT('videoTestimonials.wantShare.title'),
            url: getLocalizedUrl('i-want')
        }
    ];

    // Determine text direction based on locale
    const isRTL = locale === 'he' || locale === 'ar';
    const dir = isRTL ? 'rtl' : 'ltr';

    // Показываем ошибку, если есть (но не блокируем рендеринг)
    if (error) {
        console.error('MainVideoTestimonials GraphQL error:', error);
    }

    return (
        <div className="main-video-testimonials" dir={dir}>
            <div className="container">
                <div className="main-video-testimonials__header">
                    <h2 className="main-video-testimonials__title">
                        {safeT('videoTestimonials.title')}
                    </h2>
                </div>
                
                <div className="main-video-testimonials__grid">
                    {finalVideoTestimonials.map((testimonial) => (
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
