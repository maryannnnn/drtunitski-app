import './plastic-surgery.scss';
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

const SurgeryPlasticPage = ({ seoData }) => {
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
        title: seoData?.title || safeT('surgeryPlastic.seoTitle'),
        description: seoData?.description || safeT('surgeryPlastic.seoDescription')
    };

    // Plastic Surgery items
    const plasticItems = [
        { title: safeT('surgeryPlastic.plasticSurgeries.labiaplasty') },
        { title: safeT('surgeryPlastic.plasticSurgeries.hymenoplasty') }
    ];

    return (
        <MainLayout title={PageProps.title} description={PageProps.description}>
            <div className="surgery-plastic" dir={dir}>
                {/* Main header */}
                <div className="surgery-plastic__main-header">
                    <div className="container">
                        <h1 className="surgery-plastic__main-title">
                            {safeT('surgeryPlastic.mainTitle')}
                        </h1>
                        <p className="surgery-plastic__main-description">
                            {safeT('surgeryPlastic.mainDescription')}
                        </p>
                    </div>
                    {/* Appointment Button */}
                    <div className="surgery-plastic__appointment-btn">
                        <ButtonBrown
                            onClick={() => setIsModalActive(true)}
                            className="surgery-plastic__appointment-button"
                        >
                            {safeT('buttons.bookAppointment')}
                        </ButtonBrown>
                    </div>
                </div>
                <MainConsultation />
                <MedreviewsBlock />
                <MainStories />

                {/* Plastic Surgeries Block */}
                <div className="surgery-plastic__section">
                    <div className="surgery-plastic__section-container">
                        <div className="surgery-plastic__section-header">
                            <h2 className="surgery-plastic__section-title">
                                {safeT('surgeryPlastic.plasticSurgeries.title')}
                            </h2>
                            <p className="surgery-plastic__section-description">
                                {safeT('surgeryPlastic.plasticSurgeries.description')}
                            </p>
                        </div>
                        <div className="surgery-plastic__grid">
                            {plasticItems.map((item, index) => (
                                <div 
                                    key={index}
                                    className="surgery-plastic__item"
                                >
                                    <h3 className="surgery-plastic__item-title">
                                        {item.title}
                                    </h3>
                                </div>
                            ))}
                        </div>

                        {/* Appointment Button */}
                        <div className="surgery-plastic__appointment-btn">
                            <ButtonBrown
                                onClick={() => setIsModalActive(true)}
                                className="surgery-plastic__appointment-button"
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
    const seoData = getSeoData('surgeryPlastic', locale);
    
    return {
        props: {
            seoData,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default SurgeryPlasticPage;

