import { NextResponse } from 'next/server';

/**
 * Middleware для работы со встроенным i18n Next.js
 * 
 * Встроенный i18n автоматически управляет роутингом.
 * Middleware не вмешивается в процесс.
 */
export function middleware(request) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)',
  ],
};
