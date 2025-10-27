import React from 'react';
import Link from 'next/link';
import { useSafeTranslation } from '../../shared/hooks/useSafeTranslation';
import { useRouter } from 'next/router';
import './main-consultation.scss';

const MainConsultation = () => {
    const { t } = useSafeTranslation('common');
    const router = useRouter();
    const { locale } = router;

    // Теперь используем useSafeTranslation, поэтому safeT не нужен
    const safeT = t;

    const getLocalizedUrl = (url) => {
        // Для английского языка URL остается без изменений
        if (locale === 'en') {
            return url;
        }
        
        // Для всех slug страниц добавляем языковой суффикс к концу URL
        return `${url}-${locale}`;
    };

    const consultationItems = [
        {
            title: safeT('consultation.inPersonConsultation.title'),
            url: getLocalizedUrl('/about/in-person-consultation'),
        },
        {
            title: safeT('consultation.onlineConsultation.title'),
            url: getLocalizedUrl('/about/online-consultation'),
        },
        {
            title: safeT('consultation.secondOpinion.title'),
            url: getLocalizedUrl('/about/second-opinion'),
        }
    ];

    return (
        <div className="main-consultation">
            <div className="container">
                <div className="main-consultation__grid">
                    {consultationItems.map((item, index) => (
                        <Link 
                            key={index} 
                            href={item.url}
                            className="main-consultation__item"
                        >
                            <h4 className="main-consultation__item-title">
                                {item.title}
                            </h4>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainConsultation;
