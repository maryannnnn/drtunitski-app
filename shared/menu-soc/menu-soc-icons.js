import {FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiMail, FiPhone} from "react-icons/fi";
import {FaPinterest, FaWhatsapp, FaTelegram, FaBlogger, FaTumblr, FaFacebookMessenger, FaTiktok, FaLinkedin} from "react-icons/fa";

export const menuSocIcons = [
    // Социальные сети для постов (левая группа)
    {label: 1, value: 'Facebook', url: 'https://facebook.com', component: <FiFacebook />},
    {label: 2, value: 'Instagram', url: 'https://instagram.com', component: <FiInstagram />},
    {label: 3, value: 'Twitter', url: 'https://twitter.com', component: <FiTwitter />},
    {label: 4, value: 'YouTube', url: 'https://youtube.com', component: <FiYoutube />},
    {label: 5, value: 'Pinterest', url: 'https://pinterest.com', component: <FaPinterest />},
    {label: 6, value: 'Blogger', url: 'https://blogger.com', component: <FaBlogger />},
    {label: 7, value: 'Tumblr', url: 'https://tumblr.com', component: <FaTumblr />},
    
    // TikTok и LinkedIn (средняя группа, левее мессенджеров)
    {label: 8, value: 'TikTok', url: 'https://tiktok.com', component: <FaTiktok />},
    {label: 9, value: 'LinkedIn', url: 'https://linkedin.com', component: <FaLinkedin />},
    
    // Мессенджеры для связи (правая группа)
    {label: 10, value: 'WhatsApp', url: 'https://wa.me/', component: <FaWhatsapp />},
    {label: 11, value: 'Telegram', url: 'https://t.me/', component: <FaTelegram />},
    {label: 12, value: 'Messenger', url: 'https://m.me/', component: <FaFacebookMessenger />},
    {label: 13, value: 'Email', url: 'mailto:', component: <FiMail />},
    {label: 14, value: 'Mobile', url: 'tel:', component: <FiPhone />},
]

