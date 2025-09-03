import './header-contact.scss'
import './media.scss'
import {contactSalon} from "@/app/info/info";
import Link from 'next/link';

const HeaderContact = () => {
    return (
        <div className="header-contact">
            <div className="header-contact__mobile">
                <Link href={`tel:${contactSalon.mobile}`} className="header-contact__mobile-link">
                    {contactSalon.mobile}
                </Link>
            </div>
            <div className="header-contact__email">
                <Link href={`mailto:${contactSalon.email}`} className="header-contact__email-link">
                    {contactSalon.email}
                </Link>
            </div>
            <div className="header-contact__address">{contactSalon.address_1}</div>
        </div>
    )
}

export default HeaderContact