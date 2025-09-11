import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import './trust-care-banner.scss';

const TrustCareBanner = () => {
    const { t } = useTranslation();

    const associationImages = [
        {
            src: '/images/association/American_association_Gynecologic_laparoscopy.svg',
            alt: 'American Association of Gynecologic Laparoscopy'
        },
        {
            src: '/images/association/american-college-obstetricians-gynecologists.png',
            alt: 'American College of Obstetricians and Gynecologists'
        },
        {
            src: '/images/association/Israel Endometriosis Association.jpeg',
            alt: 'Israel Endometriosis Association'
        },
        {
            src: '/images/association/Israel_Association_Colposcopy_Cervical_Diseases.png',
            alt: 'Israel Association of Colposcopy and Cervical Diseases'
        },
        {
            src: '/images/association/Israel_Association_Gynecologic_Oncology_mini.png',
            alt: 'Israel Association of Gynecologic Oncology'
        },
        {
            src: '/images/association/Israel_Association_Gynecological_Endoscopy_mini.png',
            alt: 'Israel Association of Gynecological Endoscopy'
        }
    ];

    return (
        <div className="trust-care-banner">
            <div className="container">
                <div className="trust-care-banner__content">
                    <div className="trust-care-banner__left">
                        <div className="trust-care-banner__logo">
                            <Image
                                src="/images/logo/logo_3_big.png"
                                alt="Dr. Serge Tunitski Logo"
                                width={400}
                                height={160}
                                priority
                            />
                        </div>
                        <div className="trust-care-banner__title">
                            {t('common:trustCareBanner.title')}
                        </div>
                        <div className="trust-care-banner__associations">
                            {associationImages.map((image, index) => (
                                <div key={index} className="trust-care-banner__association-item">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        width={100}
                                        height={100}
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="trust-care-banner__right">
                        <div className="trust-care-banner__doctor-image">
                            <Image
                                src="/images/doctor/dr_serge_tunitski_top.png"
                                alt="Dr. Serge Tunitski"
                                width={400}
                                height={500}
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrustCareBanner;
