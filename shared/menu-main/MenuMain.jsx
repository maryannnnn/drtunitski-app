import React, { useState, useEffect } from 'react';
import './menu-nain.scss';
import './media.scss';
import Link from "next/link";
import { useSafeTranslation } from '../hooks/useSafeTranslation';
import { useRouter } from 'next/router';
import {checkMenuItem} from "../utils/utils-menu";
import { processMenuUrl } from "../utils/utils-url";
import menuMain from './menuMain.json';

const MenuMain = () => {
    const {data} = menuMain;
    const [activeMenu, setActiveMenu] = useState(null);
    const [forceUpdate, setForceUpdate] = useState(0);
    const { t, isLoading } = useSafeTranslation();
    const router = useRouter();
    const currentLocale = router.locale || 'en';

    // Принудительное обновление при изменении языка
    useEffect(() => {
        setForceUpdate(prev => prev + 1);
    }, [currentLocale]);

    // Показываем скелетон, пока переводы загружаются
    if (isLoading) {
        return (
            <nav className="navigation-menu">
                <ul className="navigation-menu-list">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <li key={i} className="navigation-menu-item">
                            <div style={{ 
                                width: '80px', 
                                height: '20px', 
                                background: 'rgba(139, 69, 19, 0.1)',
                                borderRadius: '4px',
                                animation: 'pulse 1.5s ease-in-out infinite'
                            }} />
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }

    // Функция для получения переведенного названия меню
    const getTranslatedLabel = (label, itemId) => {
        const translationKey = getTranslationKey(label, itemId);
        return t(translationKey, { defaultValue: label });
    };

    // Функция для получения ключа перевода
    const getTranslationKey = (label, itemId) => {
        // Основные пункты меню
        const mainMenuKeys = {
            'Home': 'navigation.home',
            'About': 'navigation.about',
            'Gynecology': 'navigation.gynecology',
            'Cancer': 'navigation.cancer',
            'Surgery': 'navigation.surgery',
            'Success Stories': 'navigation.stories',
            'Media': 'navigation.media',
            'Contact': 'navigation.contact'
        };

        if (mainMenuKeys[label]) {
            return mainMenuKeys[label];
        }

        // Пункты подменю About
        const aboutKeys = {
            'Dr. Serge Tunitski': 'navigation.aboutItems.drSergeTunitski',
            'Clinic & Our Team': 'navigation.aboutItems.clinicTeam',
            'Request Appointment': 'navigation.aboutItems.requestAppointment',
            'Preparation': 'navigation.aboutItems.preparation',
            'Prices & Payment': 'navigation.aboutItems.pricesPayment',
            'Medical tourism': 'navigation.aboutItems.medicalTourism',
            'Reviews & Testimonials': 'navigation.aboutItems.reviewsTestimonials'
        };

        if (aboutKeys[label]) {
            return aboutKeys[label];
        }

        // Пункты подменю Gynecology
        const gynecologyKeys = {
            'Planned surgeries': 'navigation.gynecologyItems.plannedSurgeries',
            'Moderate-risk surgeries': 'navigation.gynecologyItems.moderateRiskSurgeries',
            'Emergency surgeries': 'navigation.gynecologyItems.emergencySurgeries',
            'Gynecological diseases': 'navigation.gynecologyItems.gynecologicalDiseases',
            'Uterine fibroids': 'navigation.gynecologyItems.uterineFibroids',
            'Endometriosis': 'navigation.gynecologyItems.endometriosis',
            'Ovarian diseases': 'navigation.gynecologyItems.ovarianDiseases',
            'Rectocele and cystocele grade III': 'navigation.gynecologyItems.rectoceleCystocele',
            'CIN III (severe cervical dysplasia)': 'navigation.gynecologyItems.cinIII',
            'Complete uterine prolapse': 'navigation.gynecologyItems.uterineProlapse',
            'Genital prolapse (severe forms)': 'navigation.gynecologyItems.genitalProlapse',
            'Chronic hydrosalpinx in infertility': 'navigation.gynecologyItems.chronicHydrosalpinx',
            'Adhesive disease of the pelvic organs with infertility': 'navigation.gynecologyItems.adhesiveDisease',
            'Vaginal septum (excision)': 'navigation.gynecologyItems.vaginalSeptum',
            'Polyps': 'navigation.gynecologyItems.polyps',
            'Ovarian cyst': 'navigation.gynecologyItems.ovarianCyst',
            'Uterine perforation': 'navigation.gynecologyItems.uterinePerforation',
            'Pyosalpinx': 'navigation.gynecologyItems.pyosalpinx',
            'Tubo-ovarian abscess': 'navigation.gynecologyItems.tuboOvarianAbscess',
            'Ectopic pregnancy': 'navigation.gynecologyItems.ectopicPregnancy'
        };

        if (gynecologyKeys[label]) {
            return gynecologyKeys[label];
        }

        // Пункты подменю Cancer
        const cancerKeys = {
            'Oncological surgeries': 'navigation.cancerItems.oncologicalSurgeries',
            'Ovarian cancer': 'navigation.cancerItems.ovarianCancer',
            'Endometrial cancer': 'navigation.cancerItems.endometrialCancer',
            'Cervical cancer': 'navigation.cancerItems.cervicalCancer',
            'Uterine sarcoma': 'navigation.cancerItems.uterineSarcoma',
            'Fallopian tube cancer': 'navigation.cancerItems.fallopianTubeCancer',
            'Vaginal cancer': 'navigation.cancerItems.vaginalCancer',
            'Vulvar cancer': 'navigation.cancerItems.vulvarCancer',
            'Choriocarcinoma': 'navigation.cancerItems.choriocarcinoma',
            'Metastatic tumors': 'navigation.cancerItems.metastaticTumors',
            'Molar pregnancy': 'navigation.cancerItems.molarPregnancy'
        };

        if (cancerKeys[label]) {
            return cancerKeys[label];
        }

        // Пункты подменю Surgery
        const surgeryKeys = {
            'Important Surgeries': 'navigation.surgeryItems.importantSurgeries',
            'Complex Surgeries': 'navigation.surgeryItems.complexSurgeries',
            'Specialized Surgeries': 'navigation.surgeryItems.specializedSurgeries',
            'Plastic Surgery': 'navigation.surgeryItems.plasticSurgery',
            'Gynecological Surgery': 'navigation.surgeryItems.gynecologicalSurgery',
            'Laparoscopic ovarian cystectomy': 'navigation.surgeryItems.laparoscopicOvarianCystectomy',
            'Hysteroscopy with endometrial polyp removal': 'navigation.surgeryItems.hysteroscopyPolypRemoval',
            'Laparoscopic myomectomy': 'navigation.surgeryItems.laparoscopicMyomectomy',
            'Hysteroscopic resection of submucous myoma': 'navigation.surgeryItems.hysteroscopicResection',
            'Laparoscopic salpingectomy for ectopic pregnancy': 'navigation.surgeryItems.laparoscopicSalpingectomy',
            'Laparoscopic adhesiolysis': 'navigation.surgeryItems.laparoscopicAdhesiolysis',
            'Diagnostic laparoscopy': 'navigation.surgeryItems.diagnosticLaparoscopy',
            'Vacuum aspiration of the uterine cavity': 'navigation.surgeryItems.vacuumAspiration',
            'Medical termination of pregnancy': 'navigation.surgeryItems.medicalTermination',
            'Cervical conization': 'navigation.surgeryItems.cervicalConization',
            'Hysterectomy': 'navigation.surgeryItems.hysterectomy',
            'Ovarian resection for PCOS': 'navigation.surgeryItems.ovarianResectionPcos',
            'Laparoscopic excision of endometriosis foci': 'navigation.surgeryItems.laparoscopicEndometriosis',
            'Sacrocolpopexy': 'navigation.surgeryItems.sacrocolpopexy',
            'Anterior/posterior colporrhaphy': 'navigation.surgeryItems.colporrhaphy',
            'TVT-O procedure': 'navigation.surgeryItems.tvtOProcedure',
            'Cervical laser vaporization': 'navigation.surgeryItems.cervicalLaserVaporization',
            'Radical hysterectomy': 'navigation.surgeryItems.radicalHysterectomy',
            'Lymphadenectomy': 'navigation.surgeryItems.lymphadenectomy',
            'Removal of large endometriotic cysts (>5 cm)': 'navigation.surgeryItems.endometrioticCysts',
            'Excision of vaginal scar strictures': 'navigation.surgeryItems.vaginalScarStrictures',
            'Radical vulvectomy': 'navigation.surgeryItems.radicalVulvectomy',
            'Plastic Surgery': 'navigation.surgeryItems.plasticSurgeryGeneral',
            'Labiaplasty (surgery of the labia minora)': 'navigation.surgeryItems.labiaplastySurgery',
            'Hymenoplasty (restoration of the hymen)': 'navigation.surgeryItems.hymenoplastyRestoration'
        };

        if (surgeryKeys[label]) {
            return surgeryKeys[label];
        }

        // Пункты подменю Media
        const mediaKeys = {
            'Clinic Blog': 'navigation.mediaItems.clinicBlog',
            'News': 'navigation.mediaItems.news',
            'Expert Articles': 'navigation.mediaItems.expertArticles',
            'Success Stories': 'navigation.mediaItems.successStories',
            'Reviews & Testimonials': 'navigation.mediaItems.reviewsTestimonials',
            'FAQ': 'navigation.mediaItems.faq'
        };

        if (mediaKeys[label]) {
            return mediaKeys[label];
        }

        // Если не найдено, возвращаем оригинальное название
        return label;
    };

    // Функция для получения дочерних элементов меню
    const getChildItems = (parentId) => {
        return data.menuItems.edges
            .filter((item) => item.node.parentId === parentId)
            .sort((a, b) => a.node.order - b.node.order);
    };

    const handleMouseEnter = (menuId) => {
        setActiveMenu(menuId);
    };

    const handleMouseLeave = () => {
        setActiveMenu(null);
    };

    return (
        <nav className="navigation-menu" key={forceUpdate}>
            <ul className="navigation-menu-list">
                {data.menuItems.edges
                    .filter((link) => link.node.parentId === null)
                    .sort((a, b) => a.node.order - b.node.order)
                    .map((link) => {
                        const hasChildren = checkMenuItem(link.node.id, data.menuItems.edges);
                        const childItems = hasChildren ? getChildItems(link.node.id) : [];
                        const isActive = activeMenu === link.node.id;

                        // Определяем, нужно ли многоколоночное меню
                        const isThreeColumnMenu = link.node.label === "Gynecology";
                        const isFourColumnMenu = link.node.label === "Surgery";
                        const isTwoColumnMenu = false; // Убираем двухколоночное меню
                        
                        return (
                            <li 
                                key={link.node.id} 
                                className="navigation-menu-item"
                                onMouseEnter={() => hasChildren && handleMouseEnter(link.node.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {hasChildren ? (
                                    <>
                                        <button className="navigation-menu-trigger">
                                            {getTranslatedLabel(link.node.label, link.node.id)}
                                        </button>
                                        {isActive && (
                                            <div className={`navigation-menu-content ${isThreeColumnMenu ? 'navigation-menu-content--three-column' : isFourColumnMenu ? 'navigation-menu-content--four-column' : ''}`}>
                                                {(isThreeColumnMenu || isFourColumnMenu) ? (
                                                    // Новая структура для Gynecology с заголовками колонок
                                                    <div className="navigation-menu-columns">
                                                        {childItems.map((column) => (
                                                            <div key={column.node.id} className="navigation-menu-column">
                                                                <h3 className="navigation-menu-column-header">
                                                                    {getTranslatedLabel(column.node.label, column.node.id)}
                                                                </h3>
                                                                <ul className="navigation-menu-column-list">
                                                                    {column.node.columnItems.map((item) => (
                                                                        <li key={item.id} className="navigation-menu-column-item">
                                                                            <Link 
                                                                                href={processMenuUrl(item.path, currentLocale)} 
                                                                                className="navigation-menu-link"
                                                                            >
                                                                                {getTranslatedLabel(item.label, item.id)}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    // Стандартная структура для других меню
                                                    <ul className={`navigation-menu-content-list ${isTwoColumnMenu ? 'navigation-menu-content-list--two-column' : ''}`}>
                                                        {childItems.map((child) => (
                                                            <li key={child.node.id} className="navigation-menu-content-item">
                                                                <Link 
                                                                    href={processMenuUrl(child.node.path, currentLocale)} 
                                                                    className="navigation-menu-link"
                                                                >
                                                                    {getTranslatedLabel(child.node.label, child.node.id)}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link 
                                        href={processMenuUrl(link.node.path, currentLocale)} 
                                        className="navigation-menu-link"
                                    >
                                        {getTranslatedLabel(link.node.label, link.node.id)}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
            </ul>
        </nav>
    );
};


export default MenuMain;




