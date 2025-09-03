import {gql} from '@apollo/client';

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