import React, {useState} from 'react';
import './footer-menu-blog.scss'
import './media.scss'
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// import {useQuery} from '@apollo/client';
// import {GET_MENU_BLOG, GET_MENU_TOP} from "@/entities/menu/actions/menuActions";
// import client from "@/app/graphql/apollo-client";
import menuBlog from "./menuBlog.json";

const FooterMenuBlog = ({ initialData }) => {

    const {data} = menuBlog

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // const {loading, error, data} = useQuery(GET_MENU_BLOG, {
    //     initialData: initialData
    // });

    return (
        <div className="footer-blog">
            <div className="footer-blog__title">
                {data && data.menu && data.menu.name}
            </div>
            <ul className="footer-blog__menu">
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
                                <Link href={link.node.path} className='footer-blog__menu-item'>
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
    //     query: GET_MENU_BLOG
    // });

    const {data} = menuBlog

    return {
        props: {
            initialData: data
        }
    };
}

export default FooterMenuBlog;