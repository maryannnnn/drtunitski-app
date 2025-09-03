import './attributes-massage.scss'
import './madia.scss'
import {attributePriceMassage, contentType, testimonialTitleMassage} from "../../app/info/info";
import React from "react";
import AttributesContent from "../../shared/attributes-content/AttributesContent";
import AttributesPrice from "../../shared/attributes-price/AttributesPrice";

const AttributesMassage = ({massage}) => {

    const attributesArray = [
        {
            id: 0,
            title: 'Преимущества',
            value: massage?.AcfMassage?.preimushhestva
        },
        {
            id: 1,
            title: 'Эффекты',
            value: massage?.AcfMassage?.effekty
        },
        {
            id: 2,
            title: 'Показания для массажа',
            value: massage?.AcfMassage?.pokazaniyaMassage
        },
        {
            id: 3,
            title: 'Противопоказания',
            value: massage?.AcfMassage?.protivopokazaniya
        },
        {
            id: 4,
            title: 'Методики массажа',
            value: massage?.AcfMassage?.metodikiMassage
        },
        {
            id: 5,
            title: 'Зоны массажа',
            value: massage?.AcfMassage?.zonaMassage
        },
        {
            id: 7,
            title: 'Составляющие процедуры',
            value: massage?.AcfMassage?.sostavlyayushhieProczedury
        },
        {
            id: 8,
            title: 'Дополнительные услуги',
            value: massage?.AcfMassage?.dopolnitelnyeUslugi
        },
        {
            id: 9,
            title: 'Музыка',
            value: massage?.AcfMassage?.muzyka
        },
        {
            id: 10,
            title: 'Ароматы',
            value: massage?.AcfMassage?.aromaty
        },
        {
            id: 11,
            title: 'Массажист, выполняющий массаж',
            value: massage?.AcfMassage?.massazhist
        },
        {
            id: 12,
            title: 'Рекомендуемая частота посещений',
            value: massage?.AcfMassage?.rekomenduemayaChastota
        },
        {
            id: 13,
            title: 'Продолжительность сеанса, мин.',
            value: massage?.AcfMassage?.prodolzhitelnostSeansa
        },

    ];

    const attributesArrayPrice = [
        {
            id: 0,
            title: 'Цена за сеанс, шекель',
            value: massage?.AcfMassage?.czenaSeans
        },
        {
            id: 1,
            title: 'Цена за пакет из 5-и сеансов, шекель',
            value: massage?.AcfMassage?.czenaPaket
        },
        {
            id: 2,
            title: 'Цена за пакет из 10-и сеансов, шекель',
            value: massage?.AcfMassage?.czenaPaket2
        }
    ]

    return (
        <div className="attributes">
            <div className="container">
                <AttributesContent attributesArray={attributesArray}/>
                <h2 className="attributes__price-title">{attributePriceMassage}</h2>
                <AttributesPrice attributesArrayPrice={attributesArrayPrice} contentType={contentType.massages}/>
            </div>
        </div>
    );
};

export default AttributesMassage;
