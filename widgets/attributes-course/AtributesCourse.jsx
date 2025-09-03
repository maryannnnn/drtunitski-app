import './attributes-course.scss'
import './madia.scss'
import {
    attributeParametersCourse,
    attributePriceCourse,
    contentType,
} from "../../app/info/info";
import React from "react";
import AttributesContent from "../../shared/attributes-content/AttributesContent";
import AttributesPrice from "../../shared/attributes-price/AttributesPrice";

const AttributesCourse = ({course}) => {

    const attributesArray = [
        {
            id: 0,
            title: 'Типы массажа в учебном курсе',
            value: course?.AcfCourse?.tipyMassazha
        },
        {
            id: 1,
            title: 'Содержание курса. Теоретическая часть',
            value: course?.AcfCourse?.soderzhanieTeoreticheskaya
        },
        {
            id: 2,
            title: 'Содержание курса. Практическая часть',
            value: course?.AcfCourse?.soderzhaniePrakticheskaya
        },
        {
            id: 3,
            title: 'Содержание курса. Дополнительные модули',
            value: course?.AcfCourse?.soderzhanieDopolnitelnye
        },
        {
            id: 4,
            title: 'Продолжительность курса',
            value: course?.AcfCourse?.prodolzhitelnostKursa
        },
        {
            id: 5,
            title: 'Для кого предназначен курс',
            value: course?.AcfCourse?.prednaznachenKurs
        },
        {
            id: 7,
            title: 'Требования к участникам',
            value: course?.AcfCourse?.trebovaniyaUchastnikam
        },
        {
            id: 8,
            title: 'Материалы и оборудование',
            value: course?.AcfCourse?.materialyIOborudovanie
        },
        {
            id: 9,
            title: 'Количество занятий',
            value: course?.AcfCourse?.kolichestvoZanyatij
        },
        {
            id: 10,
            title: 'Формат обучения',
            value: course?.AcfCourse?.formatObucheniya
        },
        {
            id: 11,
            title: 'График занятий',
            value: course?.AcfCourse?.grafikZanyatij
        },
        {
            id: 12,
            title: 'Дата начала курса',
            value: course?.AcfCourse?.dataNachalaKursa
        },
        {
            id: 13,
            title: 'Сертификация',
            value: course?.AcfCourse?.sertifikacziya
        },
        {
            id: 14,
            title: 'Преподаватели',
            value: course?.AcfCourse?.prepodavateli
        },
        {
            id: 15,
            title: 'Дополнительные бонусы',
            value: course?.AcfCourse?.dopolnitelnyeBonusy
        },
        {
            id: 16,
            title: 'Дополнительные программы',
            value: course?.AcfCourse?.dopolnitelnyeProgrammy
        },
        {
            id: 12,
            title: 'Максимальное количество участников',
            value: course?.AcfCourse?.maksimalnoeUchastnikov
        },

    ];

    const attributesArrayParameters = [
        {
            id: 0,
            title: 'Интенсивно',
            value: course?.AcfCourse?.intensivno
        },
        {
            id: 1,
            title: 'Индивидуальный подход',
            value: course?.AcfCourse?.individualnyjPodhod
        },
        {
            id: 2,
            title: 'Доведём вас до вашей первой работы',
            value: course?.AcfCourse?.dovedyomRaboty
        },
        {
            id: 3,
            title: 'Преподаватель',
            value: course?.AcfCourse?.prepodavatel
        }
    ]

    const attributesArrayPrice = [
        {
            id: 0,
            title: 'Цена учебного курса, шекель',
            value: course?.AcfCourse?.czenaKursa
        },
        {
            id: 1,
            title: 'Цена курса за двоих участников, шекель',
            value: course?.AcfCourse?.czenaKursa2
        }
    ]

    return (
        <div className="attributes">
            <div className="container">
                <AttributesContent attributesArray={attributesArray}/>
                <h2 className="attributes__price-title">{attributePriceCourse}</h2>
                <AttributesPrice attributesArrayPrice={attributesArrayPrice} contentType={contentType.courses}/>
                <h2 className="attributes__price-title">{attributeParametersCourse}</h2>
                <AttributesContent attributesArray={attributesArrayParameters}/>
            </div>
        </div>
    );
};


export default AttributesCourse;
