import React, {useEffect, useState} from 'react';
import './menu-nain-mobile.scss'
import './media.scss'
import {Typography} from '@mui/material';
import Link from "next/link";
import {checkMenuItem, getMenuItems, getMenuItemsMobile} from "../utils/utils-menu";
import menuMainMobile from '../menu-main/menuMain.json';
import theme from "../../material.config";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useI18n } from "../hooks/useI18n";
import { useSafeTranslation } from '../hooks/useSafeTranslation';
import { useRouter } from 'next/router';

const MenuMainMobile = ({ initialData }) => {
    const { data } = menuMainMobile;
    const { isRTL, textAlign } = useI18n();
    const { t, isLoading } = useSafeTranslation();
    const router = useRouter();
    const [forceUpdate, setForceUpdate] = useState(0);

    const [openSubmenu, setOpenSubmenu] = useState(null); // Состояние для подменю (только одно может быть открыто)

    // Принудительное обновление при изменении языка
    useEffect(() => {
        setForceUpdate(prev => prev + 1);
    }, [router.locale]);

    // Показываем скелетон, пока переводы загружаются
    if (isLoading) {
        return (
            <List>
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <ListItem key={i}>
                        <div style={{ 
                            width: '100%', 
                            height: '40px', 
                            background: 'rgba(139, 69, 19, 0.1)',
                            borderRadius: '4px',
                            animation: 'pulse 1.5s ease-in-out infinite'
                        }} />
                    </ListItem>
                ))}
            </List>
        );
    }

    // Функция для получения переведенного названия меню
    const getTranslatedLabel = (label, itemId) => {
        const translationKey = getTranslationKey(label, itemId);
        return t(translationKey, { defaultValue: label });
    };

    // Функция для получения ключа перевода (копируем из MenuMain.jsx)
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

    // Открытие/закрытие подменю (accordion поведение)
    const handleSubmenuToggle = (id) => (event) => {
        event.stopPropagation(); // Предотвращает закрытие Drawer или аккордеона
        setOpenSubmenu(openSubmenu === id ? null : id); // Если уже открыто - закрываем, иначе открываем
    };

    return (
        <ul className="menu-main-mobile" key={forceUpdate}>
            {data.menuItems.edges.length > 0 ? (
                data.menuItems.edges
                    .filter((link) => link.node.parentId === null)
                    .sort((a, b) => a.node.order - b.node.order)
                    .map((link) => {
                        // Проверяем, есть ли у пункта подменю
                        const hasSubmenu = checkMenuItem(link.node.id, data.menuItems.edges);

                        return !hasSubmenu ? (
                                <ListItem
                                    key={link.node.id}
                                    button
                                    component="a"
                                    href={link.node.path}
                                    sx={{
                                        display: 'block',
                                        color: theme.palette.primary.dark,
                                        textDecoration: 'none',
                                        direction: isRTL ? 'rtl' : 'ltr', // Направление текста
                                        '&:hover': {
                                            textDecoration: 'none',
                                            color: theme.palette.primary.light,
                                        },
                                        padding: '1px 16px',
                                        '& .MuiListItemText-primary': {
                                            textAlign: textAlign, // Выравнивание текста
                                        },
                                    }}
                                >
                                    <ListItemText primary={getTranslatedLabel(link.node.label, link.node.id)} />
                                </ListItem>

                        ) : (
                            <Accordion
                                key={link.node.id}
                                expanded={openSubmenu === link.node.id} // Управление состоянием аккордеона (только один открыт)
                                onChange={handleSubmenuToggle(link.node.id)} // Открытие/закрытие подменю
                                sx={{
                                    color: theme.palette.primary.dark,
                                    textDecoration: 'none',
                                    direction: isRTL ? 'rtl' : 'ltr', // Направление текста
                                    '&:hover': {
                                        textDecoration: 'none',
                                        color: theme.palette.primary.light,
                                    },
                                    padding: '1px 16px',
                                    '& .MuiAccordionSummary-content': {
                                        textAlign: textAlign, // Выравнивание текста
                                    },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel-${link.node.id}-content`}
                                    id={`panel-${link.node.id}-header`}
                                >
                                    <Typography>{getTranslatedLabel(link.node.label, link.node.id)}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {checkMenuItem(link.node.id, data.menuItems.edges) ? (
                                        <div>
                                            {/* Рендеринг подменю */}
                                            {getMenuItemsMobile(link.node.id, data.menuItems.edges, isRTL, textAlign, getTranslatedLabel)}
                                        </div>
                                    ) : (
                                        <Typography>Нет подменю</Typography>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        );
                    })
            ) : (
                <div className="">Нет ссылок</div>
            )}
        </ul>
    );
};

export async function getStaticProps() {
    // const { data } = await client.query({
    //     query: GET_MENU_MAIN
    // });

    const {data} = menuMainMobile

    return {
        props: {
            initialData: data
        }
    };
}

export default MenuMainMobile;

