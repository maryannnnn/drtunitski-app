import {gql} from '@apollo/client';

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
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
      uri
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
            }
        }
      }  
      AcfPost {
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
        front
        groupInfoPost {
            speciality
            position
            fullName
            imageAuthor {
              altText
              sourceUrl
              uri
            }
        }
      }
    }
  }
`;

export const GET_POST_ALL = gql`
  query GetPostAll {
    postss {
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
          uri
          slug
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
                }
            }
          }  
          AcfPost {
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
            front
            groupInfoPost {
              speciality
              position
              fullName
              imageAuthor {
                altText
                sourceUrl
                uri
              }
            }
          }
        }
      }
    }
  }
`;

// Обратная совместимость - оставляем старые названия для постепенного перехода
export const GET_TESTIMONIAL_BY_SLUG = GET_POST_BY_SLUG;
export const GET_TESTIMONIAL_ALL = GET_POST_ALL;
