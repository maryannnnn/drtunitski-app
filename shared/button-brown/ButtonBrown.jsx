import './button-brown.scss'
import './media.scss'
import { useSafeTranslation } from '../hooks/useSafeTranslation';
import { useRouter } from 'next/router';

const ButtonBrown = ({type, onClick, children, variant = 'default', href, className = ''}) => {
    const { t } = useSafeTranslation();
    const router = useRouter();
    
    const handleClick = () => {
        if (href) {
            router.push(href);
        } else if (onClick) {
            onClick();
        }
    };
    
    const buttonClass = `button-brown ${variant === 'primary' ? 'button-brown--primary' : ''} ${className}`.trim();
    
    return (
        <button
            className={buttonClass}
            type={type}
            onClick={handleClick}
        >
            {children || t('common:buttons.bookAppointment')}
        </button>
    )
}

export default ButtonBrown