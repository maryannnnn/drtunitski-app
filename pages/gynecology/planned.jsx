import './planned.scss';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import {useSafeTranslation} from '../../shared/hooks/useSafeTranslation';
import LeftLayout from '../../app/layouts/LeftLayout';
import ButtonBrown from '../../shared/button-brown/ButtonBrown';
import Modal from '../../shared/modal/Modal';
import MainConsultation from "../../widgets/main-consultation";
import Link from "next/link";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// ✅ Ленивая загрузка (не критичны для первого экрана)
const MedreviewsBlock = dynamic(
    () => import("../../shared/medreviews-block/MedreviewsBlock"),
    { ssr: false }
);
const MainStories = dynamic(
    () => import("../../widgets/main-stories/MainStories"),
    { ssr: false }
);
import MainLayout from "../../app/layouts/MainLayout";
import { getSeoData } from '../../shared/utils/seo-translations';

const GynecologyPlannedPage = ({ seoData }) => {
    const {t} = useSafeTranslation('common');
    const router = useRouter();
    const {locale} = router;
    const [isModalActive, setIsModalActive] = useState(false);

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

    // ✅ SEO данные из getStaticProps (SSR-safe)
    const PageProps = {
        title: seoData?.title || safeT('gynecologyPlanned.seoTitle'),
        description: seoData?.description || safeT('gynecologyPlanned.seoDescription')
    };

    const getLocalizedUrl = (url) => {
        // Для английского языка URL остается без изменений
        if (locale === 'en') {
            return url;
        }

        // Для всех slug страниц добавляем языковой суффикс к концу URL
        return `${url}-${locale}`;
    };

    // Planned Surgeries items
    const plannedItems = [
        {title: safeT('navigation.gynecologyItems.uterineFibroids'),
            url: getLocalizedUrl('/gynecology/uterine-fibroids')},
        {title: safeT('navigation.gynecologyItems.endometriosis'),
            url: getLocalizedUrl('/gynecology/endometriosis')},
        {title: safeT('navigation.gynecologyItems.ovarianDiseases'),
            url: getLocalizedUrl('/gynecology/ovarian-diseases')},
        {title: safeT('navigation.gynecologyItems.rectoceleCystocele'),
            url: getLocalizedUrl('/gynecology/rectocele-cystocele')},
        {title: safeT('navigation.gynecologyItems.cinIII'),
            url: getLocalizedUrl('/gynecology/cin-iii')},
        {title: safeT('navigation.gynecologyItems.uterineProlapse'),
            url: getLocalizedUrl('/gynecology/uterine-prolapse')},
        {title: safeT('navigation.gynecologyItems.genitalProlapse'),
            url: getLocalizedUrl('/gynecology/genital-prolapse')}
    ];

    // Moderate-Risk Surgeries items
    const moderateRiskItems = [
        {title: safeT('navigation.gynecologyItems.chronicHydrosalpinx')},
        {title: safeT('navigation.gynecologyItems.adhesiveDisease')},
        {title: safeT('navigation.gynecologyItems.vaginalSeptum')},
        {title: safeT('navigation.gynecologyItems.polyps')}
    ];

    // Emergency Surgeries items
    const emergencyItems = [
        {title: safeT('navigation.gynecologyItems.ovarianCyst')},
        {title: safeT('navigation.gynecologyItems.uterinePerforation')},
        {title: safeT('navigation.gynecologyItems.pyosalpinx')},
        {title: safeT('navigation.gynecologyItems.tuboOvarianAbscess')},
        {title: safeT('navigation.gynecologyItems.ectopicPregnancy')}
    ];

    return (
        <MainLayout title={PageProps.title} description={PageProps.description}>
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
                    {/* Appointment Button */}
                    <div className="gynecology-planned__appointment-btn">
                        <ButtonBrown
                            onClick={() => setIsModalActive(true)}
                            className="gynecology-planned__appointment-button"
                        >
                            {safeT('buttons.bookAppointment')}
                        </ButtonBrown>
                    </div>
                </div>
                <MainConsultation />
                <MedreviewsBlock />
                <MainStories />

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
                                <Link
                                    key={index}
                                    href={item.url}
                                    className="gynecology-planned__item"
                                >
                                    <h3 className="gynecology-planned__item-title">
                                        {item.title}
                                    </h3>
                                </Link>
                            ))}
                        </div>

                        {/* Appointment Button */}
                        <div className="gynecology-planned__appointment-btn">
                            <ButtonBrown
                                onClick={() => setIsModalActive(true)}
                                className="gynecology-planned__appointment-button"
                            >
                                {safeT('buttons.bookAppointment')}
                            </ButtonBrown>
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

                        {/* Appointment Button */}
                        <div className="gynecology-planned__appointment-btn">
                            <ButtonBrown
                                onClick={() => setIsModalActive(true)}
                                className="gynecology-planned__appointment-button"
                            >
                                {safeT('buttons.bookAppointment')}
                            </ButtonBrown>
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

                        {/* Appointment Button */}
                        <div className="gynecology-planned__appointment-btn">
                            <ButtonBrown
                                onClick={() => setIsModalActive(true)}
                                className="gynecology-planned__appointment-button"
                            >
                                {safeT('buttons.bookAppointment')}
                            </ButtonBrown>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal
                active={isModalActive}
                setActive={setIsModalActive}
                title={safeT('buttons.bookAppointment')}
            />
        </MainLayout>

    );
};

export async function getStaticProps({locale}) {
    // ✅ SEO данные на сервере (для Googlebot)
    const seoData = getSeoData('gynecologyPlanned', locale);
    
    return {
        props: {
            seoData,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default GynecologyPlannedPage;

