import './footer-contact.scss'
import './media.scss'
import Link from "next/link";
import {contactSalon} from "@/app/info/info";

const FooterContact = () => {
    return (
        <div className="footer-contact">
            <div className="footer-contact__title">
                {contactSalon.title}
            </div>
            <div className="footer-contact__mobile">
                <Link href={`tel:${contactSalon.mobile}`} className="footer-contact__mobile-link">
                    {contactSalon.mobile}
                </Link>
            </div>
            <div className="footer-contact__email">
                <Link href={`mailto:${contactSalon.email}`} className="footer-contact__email-link">
                    {contactSalon.email}
                </Link>
            </div>
            <div className="footer-contact__address">{contactSalon.address_1}</div>
            <div className="footer-contact__address">{contactSalon.address_2}</div>
        </div>
    )
}

export default FooterContact