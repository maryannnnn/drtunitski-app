import { NextResponse } from 'next/server';

/**
 * Middleware для работы со встроенным i18n Next.js
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Блокируем прямой доступ к /en (дефолтная локаль должна быть на /)
  if (pathname === '/en') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Блокируем доступ к путям начинающимся с /en/
  if (pathname.startsWith('/en/')) {
    const newPath = pathname.replace('/en/', '/');
    return NextResponse.redirect(new URL(newPath, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Применяем middleware ко всем путям кроме статических ресурсов
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)',
  ],
};
