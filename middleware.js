import { NextResponse } from 'next/server';

// ОТКЛЮЧЕНО для удобства разработки - сайт всегда открывается на английском
export function middleware(request) {
  // Get the pathname and search params
  const { pathname, searchParams } = request.nextUrl;
  
  // Skip redirect for static pages that don't need locale prefix
  const staticPages = ['/sitemap', '/privacy-policy', '/accessibility-statement', '/about', '/gynecology', '/surgery', '/story', '/media'];
  if (staticPages.includes(pathname) || 
      pathname.startsWith('/about/') || 
      pathname.startsWith('/gynecology/') || 
      pathname.startsWith('/surgery/') || 
      pathname.startsWith('/story/') || 
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

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
};
