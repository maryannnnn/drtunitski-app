import {gql} from '@apollo/client';

export const GET_COURSE_BY_SLUG = gql`
  query GetCourseBySlug($slug: String!) {
    courseBy(slug: $slug) {
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
      AcfCourse {
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
        dataNachalaKursa
          dopolnitelnyeBonusy
          dopolnitelnyeProgrammy {
            ... on Massage {
              id
              uri
              title
            }
            ... on Procedure {
              id
              title
              uri
            }
            ... on Methodology {
              id
              uri
              title
            }
          }
          dovedyomRaboty
          formatObucheniya
          grafikZanyatij
          intensivno
          individualnyjPodhod
          kolichestvoZanyatij
          maksimalnoeUchastnikov
          materialyIOborudovanie
          prednaznachenKurs
          prepodavatel
          prepodavateli {
            ... on Master {
              id
              uri
              title
            }
          }
          prodolzhitelnostKursa
          sertifikacziya
          soderzhanieDopolnitelnye
          soderzhaniePrakticheskaya
          soderzhanieTeoreticheskaya
          tipyMassazha {
            ... on Massage {
              id
              uri
              title
            }
            ... on Methodology {
              id
              uri
              title
            }
            ... on Procedure {
              id
              uri
              title
            }
          }
          trebovaniyaUchastnikam
          czenaKursa
          czenaKursa2
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

export const GET_COURSE_ALL = gql`
query  GetCourseAll {
  courses {
    edges {
        node {
          id
          menuOrder
          AcfCourse {
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
            dataNachalaKursa
            dopolnitelnyeBonusy
            dopolnitelnyeProgrammy {
                ... on Massage {
                id
                uri
                title
                }
                ... on Procedure {
                id
                title
                uri
                }
                ... on Methodology {
                id
                uri
                title
                }
            }
            dovedyomRaboty
            formatObucheniya
            grafikZanyatij
            intensivno
            individualnyjPodhod
            kolichestvoZanyatij
            maksimalnoeUchastnikov
            materialyIOborudovanie
            prednaznachenKurs
            prepodavatel
            prepodavateli {
                ... on Master {
                id
                uri
                title
                }
            }
            prodolzhitelnostKursa
            sertifikacziya
            soderzhanieDopolnitelnye
            soderzhaniePrakticheskaya
            soderzhanieTeoreticheskaya
            tipyMassazha {
                ... on Massage {
                id
                uri
                title
                }
                ... on Methodology {
                id
                uri
                title
                }
                ... on Procedure {
                id
                uri
                title
                }
            }
            trebovaniyaUchastnikam
            czenaKursa
            czenaKursa2
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
  course(id: "cG9zdDo0NDkx") {
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
        AcfCourse {
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
