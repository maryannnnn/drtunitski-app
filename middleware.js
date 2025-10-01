import { NextResponse } from 'next/server';

/**
 * Middleware для работы со встроенным i18n Next.js
 * 
 * Встроенный i18n Next.js автоматически управляет роутингом:
 * - / → главная на английском (defaultLocale без префикса)
 * - /ru → главная на русском
 * - /he → главная на иврите
 * - и т.д.
 * 
 * Middleware НЕ должен создавать редиректы на /en, 
 * так как встроенный i18n использует / для дефолтной локали.
 */
export function middleware(request) {
  // Позволяем встроенному i18n Next.js управлять всем роутингом
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!_next|api|favicon.ico|.*\\..*|_next/static|_next/image).*)',
  ],
};
