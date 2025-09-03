import {gql} from '@apollo/client';

export const GET_MENU_TOP = gql`
  query GetMenuTop {
      menuItems(where: {location: SECONDARY}) {
        edges {
            node {
                id
                path
                parentId
                order
                label
            }
        }
     }
  }
`;

export const GET_MENU_MAIN = gql`
query GetMenuMain {
    menuItems(where: {location: PRIMARY}) {
        edges {
            node {
                id
                path
                parentId
                order
                label
            }
        }
    }
    menu(id: "dGVybTo1MQ==") {
        name
    }
}
`;

export const GET_MENU_COMPANY = gql`
query GetMenuMain {
    menuItems(where: {location: MOBILE}) {
        edges {
            node {
                id
                path
                parentId
                order
                label
            }
        }
    }
    menu(id: "dGVybToxMzM5") {
        name
    }
}
`;

export const GET_MENU_BLOG = gql`
query GetMenuMain {
    menuItems(where: {location: FOOTER}) {
        edges {
            node {
                id
                path
                parentId
                order
                label
            }
        }
    }
    menu(id: "dGVybToxMzM4") {
        name
    }
}
`;
