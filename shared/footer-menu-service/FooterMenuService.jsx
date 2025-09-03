import React, {useState} from 'react';
import './fooetr-menu-service.scss'
import './media.scss'
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// import {useQuery} from '@apollo/client';
// import {GET_MENU_MAIN, GET_MENU_TOP} from "@/entities/menu/actions/menuActions";
// import client from "@/app/graphql/apollo-client";
import menuMain from "../../shared/menu-main/menuMain.json";

const FooterMenuService = ({ initialData }) => {

    const {data} = menuMain

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // const {loading, error, data} = useQuery(GET_MENU_MAIN, {
    //     initialData: initialData
    // });

    return (
        <div className="footer-service">
            <div className="footer-service__title">
                {data && data.menu && data.menu.name}
            </div>
            <ul className="footer-service__menu">
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
                        .filter((link) => link.node.parentId === null)
                        .sort((a, b) => a.node.order - b.node.order)
                        .map((link) =>
                            <li key={link.node.id}>
                                <Link href={link.node.path} className='footer-service__menu-item'>
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
    //     query: GET_MENU_MAIN
    // });

    const {data} = menuMain

    return {
        props: {
            initialData: data
        }
    };
}

export default FooterMenuService;