import { gql } from '@apollo/client';

export const GET_HOME_DATA = gql`
  query GetHomeData {
    abouts {
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
        }
      }
    }
    massages {
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
          language {
            code
            homeUrl
            id
            locale
            name
            slug
          }
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
          AcfStory {
            descriptionAnons
            front
            groupInfoPost {
              speciality
              position
              fullName
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
    medias {
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
          AcfMedia {
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

`;


