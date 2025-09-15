import React from 'react';
import Image from 'next/image';
import { associationImages } from '../utils/association-icons';
import './association-icons.scss';

const AssociationIcons = ({ variant = 'banner' }) => {
    return (
        <div className={`association-icons association-icons--${variant}`}>
            {associationImages.map((association, index) => (
                <div key={index} className="association-icons__item">
                    <Image
                        src={association.src}
                        alt={association.alt}
                        width={variant === 'footer' ? 120 : 80}
                        height={variant === 'footer' ? 100 : 80}
                        className="association-icons__image"
                        style={{ 
                            objectFit: 'contain',
                            height: variant === 'footer' ? '100px' : '80px',
                            width: 'auto'
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default AssociationIcons;
