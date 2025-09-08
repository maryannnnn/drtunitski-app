import './breadcrumbs-page.scss'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {getBreadcrumbType} from "../../app/info/info";
import React from "react";
import Link from "next/link";
import { useTranslation } from 'next-i18next';

const BreadcrumbsPage = ({material, typeMaterial}) => {
    const { t } = useTranslation();
    const breadcrumbType = getBreadcrumbType(t);

    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumbs-page.');
    }

    const breadcrumb = breadcrumbType.find(item => item.id === typeMaterial);

    const breadcrumbMain = breadcrumbType.find(item => item.id === 'main');

     return (
         <div role="presentation" onClick={handleClick}>
             <Breadcrumbs aria-label="breadcrumb">
                 <Link
                     className="breadcrumb-link"
                     href={breadcrumbMain?.url}
                 >
                     {breadcrumbMain?.title}
                 </Link>
                 <Link
                     className="breadcrumb-link"
                     href={breadcrumb?.url}
                 >
                     {breadcrumb?.title}
                 </Link>
                 <div className="breadcrumb-title">{material?.title}</div>
             </Breadcrumbs>
         </div>
     )
}

export  default BreadcrumbsPage