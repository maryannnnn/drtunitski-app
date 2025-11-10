import {gql} from '@apollo/client';

export const GET_GYNECOLOGY_BY_SLUG = gql`
  query GetGynecologyBySlug($slug: String!) {
    gynecologyBy(slug: $slug) {
      id
      slug
      menuOrder
      uri
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
      galleryImages {
        title
        altText
        description
        id
        sourceUrl
      }
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
      AcfGynecology {
        faqContent
        faqTitle
        videoTitle
        videoDescription
        video
        titleLong
        titleShort
        descriptionAnons
        titleCenter
        titleGallery
        imageAnonsPage {
          altText
          sourceUrl
        }
        imageAnons {
          altText
          sourceUrl
        }
        dopolnitelnyeUslugi {
            ... on Procedure {
              id
              title
              uri
           }
         }
         doctor {
            ... on Master {
              id
              uri
              title
           }
         }
         medicationTherapy
         czena1
         czena2
         czena3
         effekty
         metodiki {
            ... on Methodology {
              id
              title
              uri
           }
         }
         anesthesia
         pokazaniya {
            ... on Pokazaniya {
              id
              uri
              title
           }
         }
         preimushhestva
         prodolzhitelnostSeansa
         protivopokazaniya
         rekomenduemayaChastota
         sostavlyayushhieProczedury {
            ... on Procedure {
              id
              uri
              title
           }
         }
         zona {
            ... on Zone {
              id
              uri
              title
           }
         }
      }
    }
  }
`;

export const GET_GYNECOLOGY_ALL = gql`
query  GetGynecologyAll {
  gynecologies(first: 1000, where: { status: PUBLISH }) {
    edges {
        node {
          id
          slug
          menuOrder
          uri
          language {
            code
            homeUrl
            id
            locale
            name
            slug
          }
          AcfGynecology {
            titleLong
            titleShort
            descriptionAnons
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
            dopolnitelnyeUslugi {
              ... on Procedure {
                id
                title
                uri
              }
            }
            doctor {
              ... on Master {
                id
                uri
                title
              }
            }
            medicationTherapy
            czena1
            czena2
            czena3
            effekty
            metodiki {
              ... on Methodology {
                id
                title
                uri
              }
            }
            anesthesia
            pokazaniya {
              ... on Pokazaniya {
                id
                uri
                title
              }
            }
            preimushhestva
            prodolzhitelnostSeansa
            protivopokazaniya
            rekomenduemayaChastota
            sostavlyayushhieProczedury {
              ... on Procedure {
                id
                uri
                title
              }
            }
            zona {
              ... on Zone {
                id
                uri
                title
              }
            }
          }
          title
          uri
          slug
          galleryImages {
            title
            altText
            description
            id
            sourceUrl
          }
        }
    }
  }
}
`;
