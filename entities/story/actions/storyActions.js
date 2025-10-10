import {gql} from '@apollo/client';

export const GET_STORY_BY_SLUG = gql`
  query GetStoryBySlug($slug: String!) {
    storyBy(slug: $slug) {
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
      AcfStory {
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
        groupInfoPost {
          speciality
          position
          fullName
        }
      }
    }
  }
`;

export const GET_STORY_ALL = gql`
  query GetStoryAll {
    stories {
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
          AcfStory {
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
            groupInfoPost {
              speciality
              position
              fullName
            }
          }
        }
      }
    }
  }
`;


