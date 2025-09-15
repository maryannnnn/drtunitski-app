import './media.scss'
import './main-title.scss'
import {getMainTitle} from "../../app/info/info";
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import ButtonBrown from '../../shared/button-brown/ButtonBrown';
import Image from 'next/image';
import React, { useState, useEffect } from "react";
import Modal from '../../shared/modal/Modal';
import doctorImage from "../../app/assets/images/doctor/dr_serge_tunitski_2.jpg";

const MainTitle = () => {
    const {t} = useTranslation();
    const router = useRouter();
    const {locale} = router;
    const mainTitle = getMainTitle(t);
    const [isModalActive, setIsModalActive] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Определяем URL для кнопки в зависимости от языка
    const getAboutUrl = () => {
        const baseUrl = '/about/dr-serge-tunitski';
        return locale === 'en' ? baseUrl : `/${locale}${baseUrl}`;
    };

    return (
        <div className='main-title'>
            <div className="container">
                <h1 className="main-title__title">{mainTitle.title}</h1>
                <div className="main-title__content">
                    <div className="main-title__image">
                        <Image
                            src={doctorImage}
                            alt={mainTitle.title}
                            width={600}
                            height={900}
                            priority
                            className="main-title__photo"
                            style={{ width: '600px', height: '900px', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="main-title__text">
                        <h2 className="main-title__subtitle">{mainTitle.subtitle}</h2>
                        <div className="main-title__description">{mainTitle.description}</div>
                        {!isMobile && (
                            <>
                                <h3 className="main-title__biography-title">{mainTitle.biography}</h3>
                                <div className="main-title__biography-text">{mainTitle.biographyText}</div>
                            </>
                        )}
                        <div className="main-title__buttons">
                            <a
                                href={getAboutUrl()}
                                className="main-title__learn-more-btn"
                            >
                                <ButtonBrown
                                    variant="primary"
                                    className="main-title__button-inner"
                                >
                                    {mainTitle.learnMore}
                                </ButtonBrown>
                            </a>
                            <ButtonBrown 
                                onClick={() => setIsModalActive(true)}
                                className="main-title__button-inner"
                            >
                                {t('common:buttons.bookAppointment')}
                            </ButtonBrown>
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
    )
}

export default MainTitle