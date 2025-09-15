// Импорты изображений ассоциаций
import americanAssociationImage from '../../app/assets/images/association/American_association_Gynecologic_laparoscopy.svg';
import americanCollegeImage from '../../app/assets/images/association/american-college-obstetricians-gynecologists.png';
import israelEndometriosisImage from '../../app/assets/images/association/Israel Endometriosis Association.jpeg';
import israelColposcopyImage from '../../app/assets/images/association/Israel_Association_Colposcopy_Cervical_Diseases.png';
import israelOncologyImage from '../../app/assets/images/association/Israel_Association_Gynecologic_Oncology_mini.png';
import israelEndoscopyImage from '../../app/assets/images/association/Israel_Association_Gynecological_Endoscopy_mini.png';

// Данные иконок ассоциаций (перемешанный порядок)
export const associationImages = [
    { 
        src: israelEndometriosisImage, 
        alt: 'Israel Endometriosis Association',
        name: 'IEA'
    },
    { 
        src: americanCollegeImage, 
        alt: 'American College of Obstetricians and Gynecologists',
        name: 'ACOG'
    },
    { 
        src: israelOncologyImage, 
        alt: 'Israel Association of Gynecologic Oncology',
        name: 'IAGO'
    },
    { 
        src: americanAssociationImage, 
        alt: 'American Association of Gynecologic Laparoscopy',
        name: 'AAGL'
    },
    { 
        src: israelEndoscopyImage, 
        alt: 'Israel Association of Gynecological Endoscopy',
        name: 'IAGE'
    },
    { 
        src: israelColposcopyImage, 
        alt: 'Israel Association of Colposcopy and Cervical Diseases',
        name: 'IACCD'
    }
];
