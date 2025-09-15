import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import './main-gynecology.scss';

const MainGynecology = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { locale } = router;

    const getLocalizedUrl = (url) => {
        return locale === 'en' ? url : `/${locale}${url}`;
    };

    const gynecologyItems = [
        {
            title: t('common:gynecology.gynecologicalDiseases.title'),
            url: getLocalizedUrl('/gynecology'),
            description: t('common:gynecology.gynecologicalDiseases.description')
        },
        {
            title: t('common:gynecology.gynecologicalSurgery.title'),
            url: getLocalizedUrl('/surgery'),
            description: t('common:gynecology.gynecologicalSurgery.description')
        },
        {
            title: t('common:gynecology.oncologicalSurgeries.title'),
            url: getLocalizedUrl('/surgery/cancer'),
            description: t('common:gynecology.oncologicalSurgeries.description')
        },
        {
            title: t('common:gynecology.plasticSurgery.title'),
            url: getLocalizedUrl('/surgery/plastic-surgery'),
            description: t('common:gynecology.plasticSurgery.description')
        },
        {
            title: t('common:gynecology.uterineFibroids.title'),
            url: getLocalizedUrl('/gynecology/uterine-fibroids'),
            description: t('common:gynecology.uterineFibroids.description')
        },
        {
            title: t('common:gynecology.endometriosis.title'),
            url: getLocalizedUrl('/gynecology/endometriosis'),
            description: t('common:gynecology.endometriosis.description')
        },
        {
            title: t('common:gynecology.ovarianDiseases.title'),
            url: getLocalizedUrl('/gynecology/ovarian-diseases'),
            description: t('common:gynecology.ovarianDiseases.description')
        },
        {
            title: t('common:gynecology.polyps.title'),
            url: getLocalizedUrl('/gynecology/polyps'),
            description: t('common:gynecology.polyps.description')
        }
    ];

    return (
        <div className="main-gynecology">
            <div className="container">
                <div className="main-gynecology__header">
                    <h2 className="main-gynecology__title">
                        {t('common:gynecology.title')}
                    </h2>
                    <p className="main-gynecology__description">
                        {t('common:gynecology.description')}
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
