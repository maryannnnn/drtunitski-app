import { NextResponse } from 'next/server';

// ОТКЛЮЧЕНО для удобства разработки - сайт всегда открывается на английском
export function middleware(request) {
  // Get the pathname and search params
  const { pathname, searchParams } = request.nextUrl;
  
  // Skip redirect for static pages that don't need locale prefix
  const staticPages = ['/sitemap', '/privacy-policy', '/accessibility-statement', '/about', '/gynecology', '/surgery', '/stories', '/media'];
  if (staticPages.includes(pathname) || 
      pathname.startsWith('/about/') || 
      pathname.startsWith('/gynecology/') || 
      pathname.startsWith('/surgery/') || 
      pathname.startsWith('/stories/') || 
      pathname.startsWith('/media/')) {
    return NextResponse.next();
  }
  
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = ['en', 'ru', 'he', 'de', 'fr', 'es', 'ar'].every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale - всегда редиректим на английский
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/en${pathname}`, request.url)
    );
  }
}

function getPreferredLocale(acceptLanguage) {
  const supportedLocales = ['en', 'ru', 'he', 'de', 'fr', 'es', 'ar'];
  
  // Parse Accept-Language header
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [locale, qValue] = lang.trim().split(';q=');
      return {
        locale: locale.split('-')[0].toLowerCase(),
        quality: qValue ? parseFloat(qValue) : 1.0
      };
    })
    .sort((a, b) => b.quality - a.quality);
  
  // Find first supported locale
  for (const { locale } of languages) {
    if (supportedLocales.includes(locale)) {
      return locale;
    }
  }
  
  return 'en'; // Default fallback
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
};
