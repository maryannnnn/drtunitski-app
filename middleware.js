import { NextResponse } from 'next/server';

// Middleware для дополнительных проверок
// Локализация обрабатывается автоматически через next.config.mjs i18n
export function middleware(request) {
  // Здесь можно добавить любую дополнительную логику
  // (аутентификация, редиректы, логирование и т.д.)
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip все внутренние пути и API
    '/((?!api|_next/static|_next/image|favicon.ico|images|locales).*)',
  ],
};
