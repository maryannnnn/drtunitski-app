import React, { useState } from 'react';
import Image from 'next/image';
import { useSafeTranslation } from '../hooks/useSafeTranslation';
import ButtonBrown from '../button-brown/ButtonBrown';
import Modal from '../modal/Modal';
import AssociationIcons from '../association-icons/AssociationIcons';
import './trust-care-banner.scss';
import logoBigImage from '../../app/assets/images/logo/logo_3_big.png';
import doctorTopImage from '../../app/assets/images/doctor/dr_serge_tunitski_top.png';

const TrustCareBanner = () => {
    const { t, isLoading } = useSafeTranslation();
    const [isModalActive, setIsModalActive] = useState(false);

    // Показываем скелетон во время загрузки переводов
    if (isLoading) {
        return (
            <div className="trust-care-banner">
                <div className="container">
                    <div className="trust-care-banner__content">
                        <div className="trust-care-banner__left">
                            <div className="trust-care-banner__logo">
                                <Image
                                    src={logoBigImage}
                                    alt="Dr. Serge Tunitski Logo"
                                    width={400}
                                    height={160}
                                    priority
                                />
                            </div>
                            <div style={{ width: '100%', height: '60px', background: 'rgba(139, 69, 19, 0.1)', borderRadius: '4px' }} />
                        </div>
                        <div className="trust-care-banner__right">
                            <div className="trust-care-banner__doctor-image">
                                <Image
                                    src={doctorTopImage}
                                    alt="Dr. Serge Tunitski"
                                    width={518}
                                    height={700}
                                    style={{ objectFit: 'cover' }}
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="trust-care-banner">
            <div className="container">
                <div className="trust-care-banner__content">
                    <div className="trust-care-banner__left">
                        <div className="trust-care-banner__logo">
                            <Image
                                src={logoBigImage}
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
                            <AssociationIcons variant="banner" />
                        </div>
                        <div className="trust-care-banner__button">
                            <ButtonBrown 
                                onClick={() => setIsModalActive(true)}
                            />
                        </div>
                    </div>
                    <div className="trust-care-banner__right">
                        <div className="trust-care-banner__doctor-image">
                            <Image
                                src={doctorTopImage}
                                alt="Dr. Serge Tunitski"
                                width={518}
                                height={700}
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Modal 
                active={isModalActive} 
                setActive={setIsModalActive}
                title={t('common:buttons.bookAppointment')}
            />
        </div>
    );
};

export default TrustCareBanner;
