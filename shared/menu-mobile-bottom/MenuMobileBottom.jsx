import React, {useState} from 'react';
import './menu-mobile-bottom.scss'
import './media.scss'
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
//import {useQuery} from '@apollo/client';
//import {GET_MENU_TOP} from "@/entities/menu/actions/menuActions";
//import client from '@/app/graphql/apollo-client';
import menuMobileBottom from '../menu-top/menuTop.json'
import theme from "../../material.config";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

const MenuMobileBottom = ({ initialData }) => {

    const {data} = menuMobileBottom

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // const { loading, error, data } = useQuery(GET_MENU_TOP, {
    //     initialData: initialData
    // });

    return (
        <ul className="menu-mobile-bottom">
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
                        <ListItem
                            key={link.node.id}
                            button
                            component="a"
                            href={link.node.path}
                            sx={{
                                display: 'block',
                                color: theme.palette.primary.dark,
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'none',
                                    color: theme.palette.primary.light,
                                },
                                padding: '1px 16px',
                            }}
                        >
                            <ListItemText primary={link.node.label} />
                        </ListItem>
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

    const {data} = menuMobileBottom

    return {
        props: {
            initialData: data // Put data to component initialData
        }
    };
}

export default MenuMobileBottom;



