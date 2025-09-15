
// Контактная информация - статичные данные, не требующие перевода
export const contactSalon = {
    mobile: '0507377870',
    email: 'drtunitski@gmail.com',
    address_2: '',
    map: '',
    video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/PY2Lf5WWI4U?si=B94JWsgKpzcpXpl1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
}

// Функции для получения переводов
export const getMainTitle = (t) => ({
    title: t('common:info.mainTitle.title'),
    description: t('common:info.mainTitle.description'),
    subtitle: t('common:info.mainTitle.subtitle'),
    biography: t('common:info.mainTitle.biography'),
    biographyText: t('common:info.mainTitle.biographyText'),
    learnMore: t('common:info.mainTitle.learnMore')
})

export const getAttributeTitleMassage = (t) => t('common:info.attributes.massageTitle')

export const getAttributeTitleCourse = (t) => t('common:info.attributes.courseTitle')

export const getAttributePriceMassage = (t) => t('common:info.attributes.massagePrice')

export const getAttributePriceCourse = (t) => t('common:info.attributes.coursePrice')

export const getAttributeParametersCourse = (t) => t('common:info.attributes.courseParameters')

export const getTestimonialTitleMassage = (t) => t('common:info.testimonials.massageTitle')

export const getTestimonialTitleCourse = (t) => t('common:info.testimonials.courseTitle')

export const sizeText = {
    xa: 10,
    xb: 25,
    xt: 60,
    xs: 100,
    s: 150,
    m: 200,
    ma: 230,
    xm: 250,
    xp: 350,
    l: 400,
    xl: 500
}

export const colorType = {
    white: 1,
    brawn: 2
}

export const numberItems = {
    numberTwo: 2,
    numberThree: 3,
    numberFour: 4,
    numberFive: 5,
    numberSix: 6,
    numberSeven: 7,
    numberEight: 8
}

export const contentType = {
    salons: 'salons',
    bonuses: 'bonuses',
    massages: 'massages',
    courses: 'courses',
    testimonials: 'testimonials',
    posts: 'posts',
    category: 'category',
    methodology: 'methodology',
    procedure: 'procedure'
}

export const getTestimonialType = (t) => ({
    main: t('common:info.testimonials.types.main'),
    massage: t('common:info.testimonials.types.massage'),
    course: t('common:info.testimonials.types.course'),
    post: t('common:info.testimonials.types.post'),
})

export const getTestimonialOptions = (t) => ({
    reason: t('common:info.testimonials.options.reason'),
    process: t('common:info.testimonials.options.process'),
    taste: t('common:info.testimonials.options.taste')
})

export const getBreadcrumbType = (t) => [
    {
        id: 'main',
        title: t('common:info.breadcrumbs.main'),
        url: '/'
    },
    {
        id: 'salon',
        title: t('common:info.breadcrumbs.salon'),
        url: '/salon'
    },
    {
        id: 'massage',
        title: t('common:info.breadcrumbs.massage'),
        url: '/massage'
    },
    {
        id: 'course',
        title: t('common:info.breadcrumbs.course'),
        url: '/course'
    },
    {
        id: 'media',
        title: t('common:info.breadcrumbs.media'),
        url: '/media'
    },
    {
        id: 'stories',
        title: t('common:info.breadcrumbs.stories'),
        url: '/stories'
    },
    {
        id: 'bonus',
        title: t('common:info.breadcrumbs.bonus'),
        url: '/bonus'
    },
]

// Алиасы для обратной совместимости (старые имена экспортов)
export const attributeTitleCourse = getAttributeTitleCourse
export const testimonialTitleCourse = getTestimonialTitleCourse
export const testimonialType = getTestimonialType
export const attributeTitleMassage = getAttributeTitleMassage
export const testimonialTitleMassage = getTestimonialTitleMassage

