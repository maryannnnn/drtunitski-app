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

    // ✅ ОПТИМИЗИРОВАНО: изображения рендерятся сразу, текст показывается когда готов
    // Это улучшает LCP — изображения не ждут загрузки переводов

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
                                sizes="(max-width: 768px) 280px, 400px"
                            />
                        </div>
                        <div className="trust-care-banner__title">
                            {/* Показываем текст или пустую строку пока загружается */}
                            {isLoading ? '\u00A0' : t('common:trustCareBanner.title')}
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
                                sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 518px"
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
