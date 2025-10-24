import React from 'react';
import Link from 'next/link';
import { useSafeTranslation } from '../../shared/hooks/useSafeTranslation';
import { useRouter } from 'next/router';
import './main-gynecology.scss';

const MainGynecology = () => {
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

    const gynecologyItems = [
        {
            title: safeT('gynecology.gynecologicalDiseases.title'),
            url: '/gynecology/planned',
            description: safeT('gynecology.gynecologicalDiseases.description')
        },
        {
            title: safeT('gynecology.gynecologicalSurgery.title'),
            url: '/surgery/important',
            description: safeT('gynecology.gynecologicalSurgery.description')
        },
        {
            title: safeT('gynecology.oncologicalSurgeries.title'),
            url: '/surgery/cancer',
            description: safeT('gynecology.oncologicalSurgeries.description')
        },
        {
            title: safeT('gynecology.plasticSurgery.title'),
            url: '/surgery/plastic-surgery',
            description: safeT('gynecology.plasticSurgery.description')
        },
        {
            title: safeT('gynecology.uterineFibroids.title'),
            url: getLocalizedUrl('/gynecology/uterine-fibroids'),
            description: safeT('gynecology.uterineFibroids.description')
        },
        {
            title: safeT('gynecology.endometriosis.title'),
            url: getLocalizedUrl('/gynecology/endometriosis'),
            description: safeT('gynecology.endometriosis.description')
        },
        {
            title: safeT('gynecology.ovarianDiseases.title'),
            url: getLocalizedUrl('/gynecology/ovarian-diseases'),
            description: safeT('gynecology.ovarianDiseases.description')
        },
        {
            title: safeT('gynecology.polyps.title'),
            url: getLocalizedUrl('/gynecology/polyps'),
            description: safeT('gynecology.polyps.description')
        }
    ];

    return (
        <div className="main-gynecology">
            <div className="container">
                <div className="main-gynecology__header">
                    <h2 className="main-gynecology__title">
                        {safeT('gynecology.title')}
                    </h2>
                    <p className="main-gynecology__description">
                        {safeT('gynecology.description')}
                    </p>
                </div>
                
                <div className="main-gynecology__grid">
                    {gynecologyItems.map((item, index) => (
                        <Link 
                            key={index} 
                            href={item.url}
                            className="main-gynecology__item"
                        >
                            <h3 className="main-gynecology__item-title">
                                {item.title}
                            </h3>
                            <p className="main-gynecology__item-description">
                                {item.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainGynecology;
