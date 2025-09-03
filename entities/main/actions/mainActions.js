import { gql } from '@apollo/client';

export const GET_HOME_DATA = gql`
  query GetHomeData {
    category1: category(id: "dGVybToxMzQx") {
      ...CategoryFields
    }
    category2: category(id: "dGVybToxMzM3") {
      ...CategoryFields
    }
    category3: category(id: "dGVybToxMzQy") {
      ...CategoryFields
    }
    category4: category(id: "dGVybToxODA=") {
      ...CategoryFields
    }
    category5: category(id: "dGVybToxMzM1") {
      ...CategoryFields
    }
    salon(id: "cG9zdDozNjk2") {
      id
      title
      content(format: RENDERED)
      AcfSalon {
            titleShort
            descriptionAnons
      }
    }
    salons {
      edges {
        node {
          id
          menuOrder
          AcfSalon{
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
        }
      }
    }
    bonuses {
      edges {
        node {
          id
          menuOrder
          AcfBonus {
            titleLong
            titleShort
            imageAnons {
              uri
              title
              altText
              sourceUrl
            }
            banner
          }
          uri
          title
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
    massages {
      edges {
        node {
          id
          menuOrder
          AcfMassage {
            titleLong
            descriptionAnons
            imageAnons {
              uri
              title
              altText
              sourceUrl
            }
          }
          uri
          title
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
    courses {
      edges {
        node {
          id
          menuOrder
          AcfCourse {
            titleLong
            descriptionAnons
            imageAnons {
              uri
              title
              altText
              sourceUrl
            }
          }
          uri
          title
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
    testimonials {
      edges {
        node {
          id
          menuOrder
          AcfTestimonial {
            descriptionAnons
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
          title
          uri
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
    posts {
      edges {
        node {
          id
          menuOrder
          AcfPost {
            titleLong
            descriptionAnons
            imageAnons {
              uri
              title
              altText
              sourceUrl
            }
          }
          uri
          title
          date
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

  fragment CategoryFields on Category {
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
`;


