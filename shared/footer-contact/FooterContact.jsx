import './footer-contact.scss'
import './media.scss'
import Link from "next/link";
import {contactClinic} from "@/app/info/info";

const FooterContact = () => {
    return (
        <div className="footer-contact">
            <div className="footer-contact__title">
                {contactClinic}.title}
            </div>
            <div className="footer-contact__mobile">
                <Link href={`tel:${contactClinic}.mobile}`} className="footer-contact__mobile-link">
                    {contactClinic}.mobile}
                </Link>
            </div>
            <div className="footer-contact__email">
                <Link href={`mailto:${contactClinic}.email}`} className="footer-contact__email-link">
                    {contactClinic}.email}
                </Link>
            </div>
            <div className="footer-contact__address">{contactClinic}.address_1}</div>
            <div className="footer-contact__address">{contactClinic}.address_2}</div>
        </div>
    )
}

export default FooterContact