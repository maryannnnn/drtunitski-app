import {gql} from '@apollo/client';

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      AcfPost {
        titleCenter
        titleLong
        titleShort
        descriptionAnons
      }
      content
      title
      slug
      language {
        slug
        name
        locale
        id
        homeUrl
        code
      }
    }
  }
`;

export const GET_POST_ALL = gql`
  query GetPostAll {
    posts {
      edges {
        node {
          AcfPost {
            titleCenter
            titleLong
            titleShort
            descriptionAnons
          }
          content
          title
          slug
          language {
            slug
            name
            locale
            id
            homeUrl
            code
          }
        }
      }
    }
  }
`;
