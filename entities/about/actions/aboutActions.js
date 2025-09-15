import {gql} from '@apollo/client';

export const GET_ABOUT_BY_SLUG = gql`
  query GetAboutBySlug($slug: String!) {
    aboutBy(slug: $slug) {
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
      AcfAbout {
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

export const GET_ABOUT_ALL = gql`
query  GetAboutAll {
  abouts {
    edges {
        node {
          id
          menuOrder
          language {
            code
            homeUrl
            id
            locale
            name
            slug
          }
          AcfAbout{
            titleLong
            titleShort
            imageAnons {
              uri
              title
              altText
              sourceUrl
            }
          }
          title
          uri
          slug
        }
    }
  }
  about(id: "cG9zdDozNjk2") {
        id
        menuOrder
        title
        content(format: RENDERED)
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
      AcfAbout {
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


