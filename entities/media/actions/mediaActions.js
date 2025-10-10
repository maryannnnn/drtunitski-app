import {gql} from '@apollo/client';

export const GET_MEDIA_BY_SLUG = gql`
  query GetMediaBySlug($slug: String!) {
    mediaBy(slug: $slug) {
      id
      language {
        code
        homeUrl
        id
        locale
        name
        slug
      }
      title
      content
      slug
      date
      featuredImage {
        node {
          altText
          sourceUrl
        }
      }
      seo {
          metaDesc
          title
      }
      AcfMedia {
        faqContent
        faqTitle
        videoTitle
        videoDescription
        video
        titleLong
        titleShort
        descriptionAnons
        titleCenter
        imageAnons {
          altText
          sourceUrl
        }
      }
    }
  }
`;

export const GET_MEDIA_ALL = gql`
  query GetMediaAll {
    medias(first: 1000) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          language {
            code
            homeUrl
            id
            locale
            name
            slug
          }
          title
          content
          slug
          date
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
          seo {
            metaDesc
            title
          }
          categories {
            edges {
                node {
                    id
                    name
                    slug
                }
            }
          }
          trees {
            edges {
                node {
                    id
                    name
                    slug
                    uri
                }
            }
          }  
          AcfMedia {
            faqContent
            faqTitle
            videoTitle
            videoDescription
            video
            titleLong
            titleShort
            descriptionAnons
            titleCenter
            imageAnons {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

