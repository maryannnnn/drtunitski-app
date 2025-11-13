
// Контактная информация - статичные данные, не требующие перевода
export const contactClinic = {
    mobile: '0507377870',
    email: 'mirpaaherzliya@gmail.com',
    address_2: 'HaNadiv str 71, Herzliya, Israel',
    map: 'https://maps.app.goo.gl/BDxbYR6hJEHDeZXi6',
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
    abouts: 'abouts',
    bonuses: 'bonuses',
    massages: 'gynecology',
    courses: 'surgery',
    stories: 'story',
    medias: 'medias',
    category: 'category',
    methodology: 'methodology',
    procedure: 'procedure'
}

export const getTestimonialType = (t) => ({
    main: t('common:info.testimonials.types.main'),
    massage: t('common:info.testimonials.types.gynecology'),
    course: t('common:info.testimonials.types.surgery'),
    media: t('common:info.testimonials.types.media'),
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
        id: 'about',
        title: t('common:info.breadcrumbs.about'),
        url: '/about/clinic'
    },
    {
        id: 'gynecology',
        title: t('common:info.breadcrumbs.gynecology'),
        url: '/gynecology/planned'
    },
    {
        id: 'surgery',
        title: t('common:info.breadcrumbs.surgery'),
        url: '/surgery/important'
    },
    {
        id: 'media',
        title: t('common:info.breadcrumbs.media'),
        url: '/media/blog'
    },
    {
        id: 'story',
        title: t('common:info.breadcrumbs.story'),
        url: '/story/main'
    },
    {
        id: 'bonus',
        title: t('common:info.breadcrumbs.bonus'),
        url: '/bonus/promotions'
    },
]

// Алиасы для обратной совместимости (старые имена экспортов)
export const contactSalon = contactClinic; // Алиас для старого кода
export const attributeTitleCourse = getAttributeTitleCourse
export const testimonialTitleCourse = getTestimonialTitleCourse
export const testimonialType = getTestimonialType
export const attributeTitleMassage = getAttributeTitleMassage
export const testimonialTitleMassage = getTestimonialTitleMassage

