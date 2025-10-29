import './footer-copyright.scss'
import './media.scss'
import {LiaCopyrightSolid} from "react-icons/lia";
import { useSafeTranslation } from '../hooks/useSafeTranslation';
import Link from 'next/link';

const FooterCopyright = () => {
    const { t } = useSafeTranslation();

    return (
        <div className="footer-copyright">
            <div className="footer-copyright-row">
                <div>{t('common:footer.copyright')}</div>
                <LiaCopyrightSolid/>
                <div>2025 Dr. Serge Tunitski. {t('common:footer.allRightsReserved')}</div>
            </div>
            <div className="footer-copyright-row">
                <Link href="/privacy-policy" className="footer-link">
                    {t('common:footer.privacyPolicy')}
                </Link>
                <span> | </span>
                <Link href="/accessibility-statement" className="footer-link">
                    {t('common:footer.accessibilityStatement')}
                </Link>
                {/*<span> | </span>*/}
                {/*<Link href="/sitemap" className="footer-link">*/}
                {/*    {t('common:footer.sitemap')}*/}
                {/*</Link>*/}
            </div>
            <div className="footer-copyright-row">
                <div>
                    <Link href="https://neolines.co.il" target="_blank" className="footer-link">
                        {t('common:footer.designBy')} Neolines
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FooterCopyright