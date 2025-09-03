import './footer-copyright.scss'
import './media.scss'
import {LiaCopyrightSolid} from "react-icons/lia";

const FooterCopyright = () => {
    return (
        <div className="footer-copyright">
            <div>Copyright</div>
            <LiaCopyrightSolid/>
            <div>2025  All Rights Reserved.</div>
        </div>
    )

}

export default FooterCopyright