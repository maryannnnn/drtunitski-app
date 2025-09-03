import './media.scss'
import './main-title.scss'
import {mainTitle} from "../../app/info/info";

const MainTitle = () => {
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