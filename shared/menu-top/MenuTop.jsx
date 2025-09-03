import React, {useState} from 'react';
import './menu-top.scss'
import './media.scss'
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
//import {useQuery} from '@apollo/client';
//import {GET_MENU_TOP} from "@/entities/menu/actions/menuActions";
//import client from '@/app/graphql/apollo-client';
import menuTop from './menuTop.json'

const MenuTop = ({ initialData }) => {

    const {data} = menuTop

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // const { loading, error, data } = useQuery(GET_MENU_TOP, {
    //     initialData: initialData
    // });

    return (
        <ul className="menu-top">
            {loading ? (
                <div>...</div>
            ) : error ? (
                <Stack sx={{ width: '100%' }} spacing={2}>
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
                            <Link href={link.node.path} className='menu-top__item'>
                                {link.node.label}
                            </Link>
                        </li>
                    )
            ) : (
                <div className="">no links</div>
            )
            }
        </ul>
    );
};

export async function getStaticProps() {
    // const { data } = await client.query({
    //     query: GET_MENU_TOP
    // });

    const {data} = menuTop

    return {
        props: {
            initialData: data // Put data to component initialData
        }
    };
}

export default MenuTop;



