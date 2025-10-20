import './planned.scss';
import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import LeftLayout from '../../app/layouts/LeftLayout';

const GynecologyPlannedPage = () => {
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

    // Determine text direction based on locale
    const isRTL = locale === 'he' || locale === 'ar';
    const dir = isRTL ? 'rtl' : 'ltr';

    const PageProps = {
        title: safeT('gynecologyPlanned.seoTitle'),
        description: safeT('gynecologyPlanned.seoDescription')
    };

    // Planned Surgeries items
    const plannedItems = [
        { title: safeT('navigation.gynecologyItems.uterineFibroids') },
        { title: safeT('navigation.gynecologyItems.endometriosis') },
        { title: safeT('navigation.gynecologyItems.ovarianDiseases') },
        { title: safeT('navigation.gynecologyItems.rectoceleCystocele') },
        { title: safeT('navigation.gynecologyItems.cinIII') },
        { title: safeT('navigation.gynecologyItems.uterineProlapse') },
        { title: safeT('navigation.gynecologyItems.genitalProlapse') }
    ];

    // Moderate-Risk Surgeries items
    const moderateRiskItems = [
        { title: safeT('navigation.gynecologyItems.chronicHydrosalpinx') },
        { title: safeT('navigation.gynecologyItems.adhesiveDisease') },
        { title: safeT('navigation.gynecologyItems.vaginalSeptum') },
        { title: safeT('navigation.gynecologyItems.polyps') }
    ];

    // Emergency Surgeries items
    const emergencyItems = [
        { title: safeT('navigation.gynecologyItems.ovarianCyst') },
        { title: safeT('navigation.gynecologyItems.uterinePerforation') },
        { title: safeT('navigation.gynecologyItems.pyosalpinx') },
        { title: safeT('navigation.gynecologyItems.tuboOvarianAbscess') },
        { title: safeT('navigation.gynecologyItems.ectopicPregnancy') }
    ];

    return (
        <LeftLayout title={PageProps.title} description={PageProps.description}>
            <div className="gynecology-planned" dir={dir}>
                <div className="container">
                    {/* Main header */}
                    <div className="gynecology-planned__main-header">
                        <h1 className="gynecology-planned__main-title">
                            {safeT('gynecologyPlanned.mainTitle')}
                        </h1>
                        <p className="gynecology-planned__main-description">
                            {safeT('gynecologyPlanned.mainDescription')}
                        </p>
                    </div>
                </div>

                {/* Planned Surgeries Block */}
                <div className="gynecology-planned__section">
                        <div className="gynecology-planned__section-container">
                            <div className="gynecology-planned__section-header">
                                <h2 className="gynecology-planned__section-title">
                                    {safeT('gynecologyPlanned.plannedSurgeries.title')}
                                </h2>
                                <p className="gynecology-planned__section-description">
                                    {safeT('gynecologyPlanned.plannedSurgeries.description')}
                                </p>
                            </div>
                            <div className="gynecology-planned__grid">
                                {plannedItems.map((item, index) => (
                                    <div 
                                        key={index}
                                        className="gynecology-planned__item"
                                    >
                                        <h3 className="gynecology-planned__item-title">
                                            {item.title}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Moderate-Risk Surgeries Block */}
                    <div className="gynecology-planned__section">
                        <div className="gynecology-planned__section-container">
                            <div className="gynecology-planned__section-header">
                                <h2 className="gynecology-planned__section-title">
                                    {safeT('gynecologyPlanned.moderateRiskSurgeries.title')}
                                </h2>
                                <p className="gynecology-planned__section-description">
                                    {safeT('gynecologyPlanned.moderateRiskSurgeries.description')}
                                </p>
                            </div>
                            <div className="gynecology-planned__grid">
                                {moderateRiskItems.map((item, index) => (
                                    <div 
                                        key={index}
                                        className="gynecology-planned__item"
                                    >
                                        <h3 className="gynecology-planned__item-title">
                                            {item.title}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Emergency Surgeries Block */}
                    <div className="gynecology-planned__section">
                        <div className="gynecology-planned__section-container">
                            <div className="gynecology-planned__section-header">
                                <h2 className="gynecology-planned__section-title">
                                    {safeT('gynecologyPlanned.emergencySurgeries.title')}
                                </h2>
                                <p className="gynecology-planned__section-description">
                                    {safeT('gynecologyPlanned.emergencySurgeries.description')}
                                </p>
                            </div>
                            <div className="gynecology-planned__grid">
                                {emergencyItems.map((item, index) => (
                                    <div 
                                        key={index}
                                        className="gynecology-planned__item"
                                    >
                                        <h3 className="gynecology-planned__item-title">
                                            {item.title}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
            </div>
        </LeftLayout>
    );
};

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await import('next-i18next/serverSideTranslations').then(({ serverSideTranslations }) =>
                serverSideTranslations(locale, ['common'])
            )),
        },
    };
}

export default GynecologyPlannedPage;

