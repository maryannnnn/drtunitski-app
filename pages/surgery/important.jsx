import './important.scss';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSafeTranslation } from '../../shared/hooks/useSafeTranslation';
import LeftLayout from '../../app/layouts/LeftLayout';
import ButtonBrown from '../../shared/button-brown/ButtonBrown';
import Modal from '../../shared/modal/Modal';
import MainConsultation from "../../widgets/main-consultation";
import MedreviewsBlock from "../../shared/medreviews-block/MedreviewsBlock";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MainStories from "../../widgets/main-stories/MainStories";

const SurgeryImportantPage = () => {
    const { t } = useSafeTranslation('common');
    const router = useRouter();
    const { locale } = router;
    const [isModalActive, setIsModalActive] = useState(false);

    // Теперь используем useSafeTranslation, поэтому safeT не нужен
    const safeT = t;

    // Determine text direction based on locale
    const isRTL = locale === 'he' || locale === 'ar';
    const dir = isRTL ? 'rtl' : 'ltr';

    const PageProps = {
        title: safeT('surgeryImportant.seoTitle'),
        description: safeT('surgeryImportant.seoDescription')
    };

    // Important Surgeries items
    const importantItems = [
        { title: safeT('surgeryImportant.importantSurgeries.laparoscopicCystectomy') },
        { title: safeT('surgeryImportant.importantSurgeries.hysteroscopyPolyp') },
        { title: safeT('surgeryImportant.importantSurgeries.laparoscopicMyomectomy') },
        { title: safeT('surgeryImportant.importantSurgeries.hysteroscopicResection') },
        { title: safeT('surgeryImportant.importantSurgeries.laparoscopicSalpingectomy') },
        { title: safeT('surgeryImportant.importantSurgeries.laparoscopicAdhesiolysis') },
        { title: safeT('surgeryImportant.importantSurgeries.diagnosticLaparoscopy') },
        { title: safeT('surgeryImportant.importantSurgeries.vacuumAspiration') },
        { title: safeT('surgeryImportant.importantSurgeries.medicalTermination') },
        { title: safeT('surgeryImportant.importantSurgeries.cervicalConization') }
    ];

    // Complex Surgeries items
    const complexItems = [
        { title: safeT('surgeryImportant.complexSurgeries.hysterectomy') },
        { title: safeT('surgeryImportant.complexSurgeries.ovarianResection') },
        { title: safeT('surgeryImportant.complexSurgeries.endometriosisExcision') },
        { title: safeT('surgeryImportant.complexSurgeries.sacrocolpopexy') },
        { title: safeT('surgeryImportant.complexSurgeries.colporrhaphy') },
        { title: safeT('surgeryImportant.complexSurgeries.tvtoProcedure') },
        { title: safeT('surgeryImportant.complexSurgeries.cervicalLaser') }
    ];

    // Specialized Surgeries items
    const specializedItems = [
        { title: safeT('surgeryImportant.specializedSurgeries.radicalHysterectomy') },
        { title: safeT('surgeryImportant.specializedSurgeries.lymphadenectomy') },
        { title: safeT('surgeryImportant.specializedSurgeries.largeCysts') },
        { title: safeT('surgeryImportant.specializedSurgeries.vaginalStrictures') },
        { title: safeT('surgeryImportant.specializedSurgeries.radicalVulvectomy') }
    ];

    // Plastic Surgery items
    const plasticItems = [
        { title: safeT('surgeryImportant.plasticSurgery.labiaplasty') },
        { title: safeT('surgeryImportant.plasticSurgery.hymenoplasty') }
    ];

    return (
        <LeftLayout title={PageProps.title} description={PageProps.description}>
            <div className="surgery-important" dir={dir}>
                {/* Main header */}
                <div className="surgery-important__main-header">
                    <div className="container">
                        <h1 className="surgery-important__main-title">
                            {safeT('surgeryImportant.mainTitle')}
                        </h1>
                        <p className="surgery-important__main-description">
                            {safeT('surgeryImportant.mainDescription')}
                        </p>
                    </div>
                    {/* Appointment Button */}
                    <div className="surgery-important__appointment-btn">
                        <ButtonBrown
                            onClick={() => setIsModalActive(true)}
                            className="surgery-important__appointment-button"
                        >
                            {safeT('buttons.bookAppointment')}
                        </ButtonBrown>
                    </div>
                </div>
                <MainConsultation />
                <MedreviewsBlock />
                <MainStories />

                {/* Important Surgeries Block */}
                <div className="surgery-important__section surgery-important__section--white">
                    <div className="surgery-important__section-container">
                        <div className="surgery-important__section-header">
                            <h2 className="surgery-important__section-title">
                                {safeT('surgeryImportant.importantSurgeries.title')}
                            </h2>
                            <p className="surgery-important__section-description">
                                {safeT('surgeryImportant.importantSurgeries.description')}
                            </p>
                        </div>
                        <div className="surgery-important__grid">
                            {importantItems.map((item, index) => (
                                <div 
                                    key={index}
                                    className="surgery-important__item"
                                >
                                    <h3 className="surgery-important__item-title">
                                        {item.title}
                                    </h3>
                                </div>
                            ))}
                        </div>

                        {/* Appointment Button */}
                        <div className="surgery-important__appointment-btn">
                            <ButtonBrown
                                onClick={() => setIsModalActive(true)}
                                className="surgery-important__appointment-button"
                            >
                                {safeT('buttons.bookAppointment')}
                            </ButtonBrown>
                        </div>
                    </div>
                </div>

                {/* Complex Surgeries Block */}
                <div className="surgery-important__section surgery-important__section--grey">
                    <div className="surgery-important__section-container">
                        <div className="surgery-important__section-header">
                            <h2 className="surgery-important__section-title">
                                {safeT('surgeryImportant.complexSurgeries.title')}
                            </h2>
                            <p className="surgery-important__section-description">
                                {safeT('surgeryImportant.complexSurgeries.description')}
                            </p>
                        </div>
                        <div className="surgery-important__grid">
                            {complexItems.map((item, index) => (
                                <div 
                                    key={index}
                                    className="surgery-important__item"
                                >
                                    <h3 className="surgery-important__item-title">
                                        {item.title}
                                    </h3>
                                </div>
                            ))}
                        </div>

                        {/* Appointment Button */}
                        <div className="surgery-important__appointment-btn">
                            <ButtonBrown
                                onClick={() => setIsModalActive(true)}
                                className="surgery-important__appointment-button"
                            >
                                {safeT('buttons.bookAppointment')}
                            </ButtonBrown>
                        </div>
                    </div>
                </div>

                {/* Specialized Surgeries Block */}
                <div className="surgery-important__section surgery-important__section--white">
                    <div className="surgery-important__section-container">
                        <div className="surgery-important__section-header">
                            <h2 className="surgery-important__section-title">
                                {safeT('surgeryImportant.specializedSurgeries.title')}
                            </h2>
                            <p className="surgery-important__section-description">
                                {safeT('surgeryImportant.specializedSurgeries.description')}
                            </p>
                        </div>
                        <div className="surgery-important__grid">
                            {specializedItems.map((item, index) => (
                                <div 
                                    key={index}
                                    className="surgery-important__item"
                                >
                                    <h3 className="surgery-important__item-title">
                                        {item.title}
                                    </h3>
                                </div>
                            ))}
                        </div>

                        {/* Appointment Button */}
                        <div className="surgery-important__appointment-btn">
                            <ButtonBrown
                                onClick={() => setIsModalActive(true)}
                                className="surgery-important__appointment-button"
                            >
                                {safeT('buttons.bookAppointment')}
                            </ButtonBrown>
                        </div>
                    </div>
                </div>

                {/* Plastic Surgery Block */}
                <div className="surgery-important__section surgery-important__section--beige">
                    <div className="surgery-important__section-container">
                        <div className="surgery-important__section-header">
                            <h2 className="surgery-important__section-title">
                                {safeT('surgeryImportant.plasticSurgery.title')}
                            </h2>
                            <p className="surgery-important__section-description">
                                {safeT('surgeryImportant.plasticSurgery.description')}
                            </p>
                        </div>
                        <div className="surgery-important__grid">
                            {plasticItems.map((item, index) => (
                                <div 
                                    key={index}
                                    className="surgery-important__item"
                                >
                                    <h3 className="surgery-important__item-title">
                                        {item.title}
                                    </h3>
                                </div>
                            ))}
                        </div>

                        {/* Appointment Button */}
                        <div className="surgery-important__appointment-btn">
                            <ButtonBrown
                                onClick={() => setIsModalActive(true)}
                                className="surgery-important__appointment-button"
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
        </LeftLayout>

    );
};

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default SurgeryImportantPage;

