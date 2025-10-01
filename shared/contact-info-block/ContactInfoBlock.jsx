import './contact-info-block.scss';
import './media.scss';
import Link from 'next/link';
import Image from 'next/image';
import { contactClinic } from '@/app/info/info';
import logo3 from '@/app/assets/images/logo/logo_3.png';
import mapImage from '@/app/assets/images/form/map.jpg';
import { FiPhone, FiMapPin } from 'react-icons/fi';

const ContactInfoBlock = () => {
    return (
        <div className="contact-info-block">
            <div className="contact-info-block__logo">
                <Image
                    src={logo3}
                    alt="Dr. Serge Tunitski Logo"
                    width={300}
                    height={120}
                    className="contact-info-block__logo-image"
                />
            </div>
            
            <div className="contact-info-block__item">
                <div className="contact-info-block__icon">
                    <FiPhone />
                </div>
                <Link href={`tel:${contactClinic.mobile}`} className="contact-info-block__link contact-info-block__link--phone">
                    {contactClinic.mobile}
                </Link>
            </div>

            <div className="contact-info-block__item">
                <div className="contact-info-block__icon">
                    <FiMapPin />
                </div>
                <div className="contact-info-block__address-wrapper">
                    <Link 
                        href={contactClinic.map} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-info-block__link contact-info-block__link--address"
                    >
                        {contactClinic.address_2}
                    </Link>
                    <Link 
                        href={contactClinic.map} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-info-block__map-link"
                    >
                        <Image
                            src={mapImage}
                            alt="Clinic Location Map"
                            width={120}
                            height={80}
                            className="contact-info-block__map-image"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContactInfoBlock;


