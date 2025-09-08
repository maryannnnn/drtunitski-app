import './media.scss'
import './main-title.scss'
import {getMainTitle} from "../../app/info/info";
import { useTranslation } from 'next-i18next';

const MainTitle = () => {
    const { t } = useTranslation();
    const mainTitle = getMainTitle(t);
    
    return (
        <div className='main-title'>
            <div className="container">
                <h1 className="main-title__title">{mainTitle.title}</h1>
                <div className="main-title__description">{mainTitle.description}</div>
            </div>
        </div>
    )
}

export default MainTitle