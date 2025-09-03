import {gql} from '@apollo/client';

export const GET_MASSAGE_BY_SLUG = gql`
  query GetMassageBySlug($slug: String!) {
    massageBy(slug: $slug) {
      id
      menuOrder
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
      AcfMassage {
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
         massazhist {
            ... on Master {
              id
              uri
              title
           }
         }
         aromaty
         czenaPaket
         czenaPaket2
         czenaSeans
         effekty
         metodikiMassage {
            ... on Methodology {
              id
              title
              uri
           }
         }
         muzyka
         pokazaniyaMassage {
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
         zonaMassage {
            ... on Zone {
              id
              uri
              title
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
  }
`;

export const GET_MASSAGE_ALL = gql`
query  GetMassageAll {
  massages {
    edges {
        node {
          id
          menuOrder
          AcfMassage {
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
            massazhist {
              ... on Master {
                id
                uri
                title
              }
            }
            aromaty
            czenaPaket
            czenaPaket2
            czenaSeans
            effekty
            metodikiMassage {
              ... on Methodology {
                id
                title
                uri
              }
            }
            muzyka
            pokazaniyaMassage {
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
            zonaMassage {
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
  massage(id: "cG9zdDo0MTEy") {
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
        AcfMassage {
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
      }
  }
  testimonials {
      edges {
        node {
          id
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
}
`;
