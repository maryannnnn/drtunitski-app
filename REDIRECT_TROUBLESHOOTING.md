# Устранение проблем с редиректами

## ❌ Проблема

После переименования папок URL-ы все еще содержат старые названия:
- `/testimonial/some-story` → не перенаправляется на `/stories/some-story`
- `/blog/some-post` → не перенаправляется на `/media/some-post`

## 🔍 Причины

1. **Сервер не перезапущен** после изменения `next.config.mjs`
2. **Кэш браузера** сохраняет старые редиректы
3. **Кэш Next.js** не обновился

## ✅ Решение

### 1. Перезапустите сервер разработки

```bash
# Остановите сервер (Ctrl+C)
# Затем запустите заново
npm run dev
```

### 2. Очистите кэш браузера

- **Chrome/Edge**: Ctrl+Shift+R (жесткое обновление)
- **Firefox**: Ctrl+F5
- **Или откройте в режиме инкогнито**

### 3. Очистите кэш Next.js

```bash
# Удалите папку .next
rm -rf .next

# Или на Windows
rmdir /s /q .next

# Затем запустите сервер
npm run dev
```

### 4. Проверьте редиректы

Откройте в браузере:
- `http://localhost:3000/blog` → должно перенаправить на `/media`
- `http://localhost:3000/testimonial` → должно перенаправить на `/stories`
- `http://localhost:3000/blog/some-post` → должно перенаправить на `/media/some-post`
- `http://localhost:3000/testimonial/some-story` → должно перенаправить на `/stories/some-story`

## 🔧 Проверка редиректов

### В Network tab браузера:
1. Откройте DevTools (F12)
2. Перейдите на вкладку Network
3. Перейдите на старый URL (например, `/blog`)
4. Должен появиться запрос с статусом **301** или **302**
5. В заголовке `Location` должен быть новый URL

### Пример правильного редиректа:
```
Request URL: http://localhost:3000/blog
Status: 301 Moved Permanently
Location: http://localhost:3000/media
```

## 🚨 Если редиректы не работают

### 1. Проверьте синтаксис next.config.mjs

```javascript
async redirects() {
    return [
        {
            source: '/blog',
            destination: '/media',
            permanent: true,
        },
        {
            source: '/blog/:slug*',
            destination: '/media/:slug*',
            permanent: true,
        },
        // ... остальные редиректы
    ];
}
```

### 2. Проверьте, что сервер перезапущен

```bash
# Должно появиться сообщение:
# ✓ Ready in 2.3s
# ○ Local: http://localhost:3000
```

### 3. Проверьте логи сервера

В консоли должны появиться сообщения о загрузке конфигурации.

## 📝 Дополнительные редиректы

Если у вас есть специфичные подстраницы, добавьте их в `next.config.mjs`:

```javascript
{
    source: '/blog/specific-page',
    destination: '/media/specific-page',
    permanent: true,
}
```

## 🎯 Ожидаемый результат

После исправления:
- ✅ `/blog` → `/media` (301 редирект)
- ✅ `/blog/any-slug` → `/media/any-slug` (301 редирект)
- ✅ `/testimonial` → `/stories` (301 редирект)
- ✅ `/testimonial/any-slug` → `/stories/any-slug` (301 редирект)

## 🔄 Альтернативное решение

Если редиректы через `next.config.mjs` не работают, можно использовать middleware:

```javascript
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;
    
    if (pathname.startsWith('/blog')) {
        return NextResponse.redirect(new URL(pathname.replace('/blog', '/media'), request.url));
    }
    
    if (pathname.startsWith('/testimonial')) {
        return NextResponse.redirect(new URL(pathname.replace('/testimonial', '/stories'), request.url));
    }
}

export const config = {
    matcher: ['/blog/:path*', '/testimonial/:path*']
};
```

Попробуйте сначала перезапустить сервер и очистить кэш! 🚀
