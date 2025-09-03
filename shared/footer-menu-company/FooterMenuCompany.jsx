import React, {useState} from 'react';
import './footer-menu-company.scss'
import './media.scss'
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// import {useQuery} from '@apollo/client';
// import {GET_MENU_COMPANY} from "@/entities/menu/actions/menuActions";
// import client from "@/app/graphql/apollo-client";
import menuCompany from "./menuCompany.json";


const FooterMenuCompany = ({ initialData }) => {

    const {data} = menuCompany

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // const {loading, error, data} = useQuery(GET_MENU_COMPANY, {
    //     initialData: initialData
    // });

    return (
        <div className="footer-client">
            <div className="footer-client__title">
                {data && data.menu && data.menu.name}
            </div>
            <ul className="footer-client__menu">
                {loading ? (
                    <div>...</div>
                ) : error ? (
                    <Stack sx={{width: '100%'}} spacing={2}>
                        <Alert severity="error">
                            {error.graphQLErrors.map((err, index) => (
                                <div key={index}>{err.message}</div>
                            ))}
                        </Alert>
                    </Stack>
                ) : data.menuItems.edges.length > 0 ? (
                    data.menuItems.edges
                        // .sort((a, b) => a.node.order - b.node.order)
                        .map((link) =>
                            <li key={link.node.id}>
                                <Link href={link.node.path} className='footer-client__menu-item'>
                                    {link.node.label}
                                </Link>
                            </li>
                        )
                ) : (
                    <div className="">no links</div>
                )
                }
            </ul>
        </div>
    );
};

export async function getStaticProps() {
    // const { data } = await client.query({
    //     query: GET_MENU_COMPANY
    // });

    const {data} = menuCompany

    return {
        props: {
            initialData: data
        }
    };
}

export default FooterMenuCompany;