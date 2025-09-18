import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import ButtonBrown from '../../shared/button-brown/ButtonBrown';
import Modal from '../../shared/modal/Modal';
import './main-stories.scss';

// Импортируем изображения
import story1 from '../../app/assets/images/main_stories/story_1.jpg';
import story2 from '../../app/assets/images/main_stories/story_2.jpg';
import story3 from '../../app/assets/images/main_stories/story_3.jpg';

const MainStories = () => {
    const { t } = useTranslation('common');
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

    const getLocalizedUrl = (url) => {
        // Для английского языка URL остается без изменений
        if (locale === 'en') {
            return url;
        }
        
        // Для всех slug страниц добавляем языковой суффикс к концу URL
        return `${url}-${locale}`;
    };

    const stories = [
        {
            id: 1,
            image: story1,
            title: safeT('stories.fertility.title'),
            url: getLocalizedUrl('/story/laparoscopic-ovarian-cystectomy')
        },
        {
            id: 2,
            image: story2,
            title: safeT('stories.myomectomy.title'),
            url: getLocalizedUrl('/story/laparoscopic-myomectomy')
        },
        {
            id: 3,
            image: story3,
            title: safeT('stories.polyp.title'),
            url: getLocalizedUrl('/story/hysteroscopy-polyp-removal')
        }
    ];

    return (
        <div className="main-stories">
            <div className="container">
                <div className="main-stories__header">
                    <h2 className="main-stories__title">
                        {safeT('stories.title')}
                    </h2>
                </div>
                
                <div className="main-stories__grid">
                    {stories.map((story) => (
                        <Link 
                            key={story.id} 
                            href={story.url}
                            className="main-stories__card"
                        >
                            <div className="main-stories__card-image">
                                <Image
                                    src={story.image}
                                    alt={story.title}
                                    width={300}
                                    height={200}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </div>
                            <div className="main-stories__card-content">
                                <h3 className="main-stories__card-title">
                                    {story.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
                
                <div className="main-stories__button">
                    <ButtonBrown
                        onClick={() => setIsModalActive(true)}
                        className="main-stories__appointment-btn"
                    >
                        {safeT('buttons.bookAppointment')}
                    </ButtonBrown>
                </div>
            </div>
            <Modal 
                active={isModalActive} 
                setActive={setIsModalActive}
                title={safeT('buttons.bookAppointment')}
            />
        </div>
    );
};

export default MainStories;
