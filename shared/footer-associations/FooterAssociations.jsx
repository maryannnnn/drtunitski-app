import React from 'react';
import AssociationIcons from '../association-icons/AssociationIcons';
import './footer-associations.scss';

const FooterAssociations = () => {
    return (
        <div className="footer-associations">
            <div className="container">
                <div className="footer-associations__content">
                    <AssociationIcons variant="footer" />
                </div>
            </div>
        </div>
    );
};

export default FooterAssociations;
