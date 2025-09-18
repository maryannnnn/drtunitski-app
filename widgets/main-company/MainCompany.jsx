import './main-company.scss'
import './media.scss'
import React from "react";
import Link from 'next/link';
import ButtonRed from "../../shared/button-red/ButtonRed";
import {useRouter} from 'next/router';
import {buttonOptions} from "../../shared/button-options/button-options";
import {contactSalon, sizeText} from "../../app/info/info";
import {trimTextFullCleanedHTML} from "../../shared/utils/utils-content";
import {BsArrowRightShort} from "react-icons/bs";
import YouTubeVideoWithCover from "../../shared/youtube-video/YouTubeVideoWithCover";

const MainCompany = ({data}) => {

    console.log("MainCompany data: ", data)

    const router = useRouter();
    const { locale } = router;

    const handleClick = () => {
        // Для английского языка URL остается без изменений
        // Для других языков добавляем языковой суффикс
        const aboutUrl = locale === 'en' ? '/about' : `/about-${locale}`;
        router.push(aboutUrl);
    };

    return (
        <div className='main-company'>
            <div className="container">
                <div className="main-company__block">
                    <h2 className="main-company__title">{data?.about?.AcfAbout?.titleShort}</h2>
                    <div className="main-company__content">
                        <div className="main-company__content-info">
                            <div className="main-company__content-info-description">
                                {trimTextFullCleanedHTML(data?.about?.AcfAbout?.descriptionAnons, sizeText.l)}
                            </div>
                            <ul className="main-company__content-info-options">
                                {data?.abouts?.edges.length > 0 && data?.abouts?.edges
                                    .filter(el => el?.node?.id !== 'cG9zdDozNjk2')
                                    .map(item =>
                                        <li key={item?.node?.id}>
                                            <Link className="main-company__content-info-options__link" href={item?.node?.uri}>
                                                <BsArrowRightShort/>{item?.node?.title}
                                            </Link>
                                        </li>
                                    )
                                }
                            </ul>
                            <ButtonRed name={buttonOptions.read} type="button" onClick={handleClick}/>
                        </div>
                        <div className="main-company__content-video">
                            <YouTubeVideoWithCover/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainCompany

