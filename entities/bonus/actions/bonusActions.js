import {gql} from '@apollo/client';

export const GET_BONUS_BY_SLUG = gql`
  query GetBonusBySlug($slug: String!) {
    bonusBy(slug: $slug) {
      id
      menuOrder
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
      AcfBonus {
        faqContent
        faqTitle
        videoTitle
        videoDescription
        video
        titleLong
        titleShort
        descriptionAnons
        titleCenter
        imageAnonsPage {
          altText
          sourceUrl
        }
        imageAnons {
          altText
          sourceUrl
        }
      }
    }
  }
`;

export const GET_BONUS_ALL = gql`
query  GetBonusAll {
  bonuses {
    edges {
        node {
          id
          menuOrder
          AcfBonus{
            titleLong
            titleShort
            imageAnonsPage {
              uri
              title
              altText
              sourceUrl
            }
            imageAnons {
              uri
              title
              altText
              sourceUrl
            }
            banner
          }
          title
          uri
          slug
        }
    }
  }
  bonus(id: "cG9zdDo0MDg0") {
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
        AcfBonus {
         faqContent
         faqTitle
         videoTitle
         videoDescription
         video
         titleLong
         titleShort
         descriptionAnons
         titleCenter
         imageAnonsPage {
          altText
          sourceUrl
        }
      }
  }
}
`;
