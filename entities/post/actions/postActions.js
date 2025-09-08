import {gql} from '@apollo/client';

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!, $language: LanguageCodeEnum) {
    postBy(slug: $slug) {
      id
      menuOrder
      title
      content
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
      }
      categories {
        edges {
          node {
            id
            uri
            name
          }
        }
      }
    }
  }
`;

export const GET_POST_ALL = gql`
  query GetPostAll {
    posts {
      edges {
        node {
          id
          menuOrder
          title
          uri
          slug
          date
          AcfPost {
            titleLong
            titleShort
            descriptionAnons
            imageAnons {
              uri
              title
              altText
              sourceUrl
            }
          }
          categories {
            edges {
              node {
                id
                uri
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_BONUS = gql`
  query GetBonus {
    category(id: "dGVybToxMzQx") {
      id
      name
      uri
      AcfCategory {
        categoryTitleLong1
        categoryDescriptionAnons
      }
      seo {
        title
        metaKeywords
        metaDesc
      }
    }   
  }
`;

export const GET_BONUS_ALL = gql`
  query GetBonusAll {
    bonuses {
      edges {
        node {
          id
          AcfBonus {
            titleLong
            titleShort
            imageAnons {
              uri
              title
              altText
            }
            banner
          }
          uri
          title
        }
      }
    }
  }
`;