import './cancer.scss';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSafeTranslation } from '../../shared/hooks/useSafeTranslation';
import LeftLayout from '../../app/layouts/LeftLayout';
import ButtonBrown from '../../shared/button-brown/ButtonBrown';
import Modal from '../../shared/modal/Modal';
import MainConsultation from "../../widgets/main-consultation";
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

const SurgeryCancerPage = ({ seoData }) => {
    const { t } = useSafeTranslation('common');
    const router = useRouter();
    const { locale } = router;
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
        title: seoData?.title || safeT('surgeryCancer.seoTitle'),
        description: seoData?.description || safeT('surgeryCancer.seoDescription')
    };

    // Cancer types items
    const cancerItems = [
        { title: safeT('surgeryCancer.cancerTypes.endometrialCancer') },
        { title: safeT('surgeryCancer.cancerTypes.cervicalCancer') },
        { title: safeT('surgeryCancer.cancerTypes.uterineSarcoma') },
        { title: safeT('surgeryCancer.cancerTypes.fallopianTubeCancer') },
        { title: safeT('surgeryCancer.cancerTypes.vaginalCancer') },
        { title: safeT('surgeryCancer.cancerTypes.vulvarCancer') },
        { title: safeT('surgeryCancer.cancerTypes.choriocarcinoma') },
        { title: safeT('surgeryCancer.cancerTypes.metastaticTumors') },
        { title: safeT('surgeryCancer.cancerTypes.molarPregnancy') }
    ];

    return (
        <MainLayout title={PageProps.title} description={PageProps.description}>
            <div className="surgery-cancer" dir={dir}>
                {/* Main header */}
                <div className="surgery-cancer__main-header">
                    <div className="container">
                        <h1 className="surgery-cancer__main-title">
                            {safeT('surgeryCancer.mainTitle')}
                        </h1>
                        <p className="surgery-cancer__main-description">
                            {safeT('surgeryCancer.mainDescription')}
                        </p>
                    </div>
                    {/* Appointment Button */}
                    <div className="surgery-cancer__appointment-btn">
                        <ButtonBrown
                            onClick={() => setIsModalActive(true)}
                            className="surgery-cancer__appointment-button"
                        >
                            {safeT('buttons.bookAppointment')}
                        </ButtonBrown>
                    </div>
                </div>
                <MainConsultation />
                <MedreviewsBlock />
                <MainStories />

                {/* Cancer Types Block */}
                <div className="surgery-cancer__section">
                    <div className="surgery-cancer__section-container">
                        <div className="surgery-cancer__grid">
                            {cancerItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="surgery-cancer__item"
                                >
                                    <h3 className="surgery-cancer__item-title">
                                        {item.title}
                                    </h3>
                                </div>
                            ))}
                        </div>

                        {/* Appointment Button */}
                        <div className="surgery-cancer__appointment-btn">
                            <ButtonBrown
                                onClick={() => setIsModalActive(true)}
                                className="surgery-cancer__appointment-button"
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

export async function getStaticProps({ locale }) {
    // ✅ SEO данные на сервере (для Googlebot)
    const seoData = getSeoData('surgeryCancer', locale);
    
    return {
        props: {
            seoData,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default SurgeryCancerPage;

