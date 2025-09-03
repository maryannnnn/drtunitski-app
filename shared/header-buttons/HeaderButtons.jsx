import './header-buttons.scss'
import './media.scss'
import ButtonRed from "@/shared/button-red/ButtonRed";
import ButtonBrown from "@/shared/button-brown/ButtonBrown";
import {buttonOptions} from "../button-options/button-options";

const HeaderButtons = () => {


    const massageHandler = () => {
        window.open('https://wa.me/972504246045', '_blank');
    }

    const courseHandler = () => {
        window.open('https://wa.me/972504246045', '_blank');
    }

    return (
        <div className="header-buttons">
            <ButtonRed name={buttonOptions.massage} type="submit" onClick={massageHandler} />
            <ButtonBrown name={buttonOptions.course} type="submit" onClick={courseHandler} />
        </div>
    )
}

export default HeaderButtons