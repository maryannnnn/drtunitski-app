import {gql} from '@apollo/client';

export const GET_TESTIMONIAL_BY_SLUG = gql`
  query GetTestimonialBySlug($slug: String!, $language: LanguageCodeEnum) {
    testimonialBy(slug: $slug) {
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
            }
        }
      }
      AcfTestimonial {
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
    }
  }
`;

export const GET_TESTIMONIAL_ALL = gql`
  query GetTestimonialAll($language: LanguageCodeEnum) {
    testimonials {
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
                }
            }
          }
          AcfTestimonial {
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
        }
      }
    }
    testimonial(id: "cG9zdDo0NDM4") {
      id
      title
      content
      uri
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
      AcfTestimonial {
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
    }
  }
`;
