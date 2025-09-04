import './footer-copyright.scss'
import './media.scss'
import {LiaCopyrightSolid} from "react-icons/lia";
import Link from "@mui/material/Link";

const FooterCopyright = () => {
    return (
        <div className="footer-copyright">
            <div className="footer-copyright-row">
                <div>Copyright</div>
                <LiaCopyrightSolid/>
                <div>2025 Dr. Serge Tunitski. All Rights Reserved.</div>
            </div>
            <div className="footer-copyright-row">
                <div>Privacy Policy |</div>
                <div>Accessibility Statement |</div>
                <div>Sitemap</div>
            </div>
            <div className="footer-copyright-row">
                <div>
                    <Link href="https://neolines.co.il"  target="_blank">
                    Design and Promotion by Neolines
                    </Link>
                </div>
            </div>

        </div>
    )

}

export default FooterCopyright