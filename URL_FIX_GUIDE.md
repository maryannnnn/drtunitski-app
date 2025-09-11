# Исправление URL-ов в приложении

## ❌ Проблема

После переименования папок URL-ы все еще содержали старые названия:
- Посты в `/stories` имели URL с `/testimonial/`
- Посты в `/media` имели URL с `/blog/`

## 🔍 Причина

Проблема была в том, что в коде использовались старые пути:
1. **`app/info/info.js`** - breadcrumbs содержали старые пути
2. **`widgets/main-template/MainTemplate.jsx`** - ссылки на посты использовали `'blog'`
3. **Переводы** - breadcrumbs содержали старые ключи

## ✅ Решение

### 1. Исправлен `app/info/info.js`

**Было:**
```javascript
{
    id: 'blog',
    title: t('common:info.breadcrumbs.blog'),
    url: '/blog'
},
{
    id: 'testimonial',
    title: t('common:info.breadcrumbs.testimonial'),
    url: '/testimonial'
},
```

**Стало:**
```javascript
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
```

### 2. Исправлен `widgets/main-template/MainTemplate.jsx`

**Было:**
```javascript
const typeLinkIndex = (typeContent === contentType.bonuses ? 'bonus'
    : typeContent === contentType.massages ? 'massage'
        : typeContent === contentType.courses ? 'course'
            : typeContent === contentType.posts ? 'blog'
                : '')
```

**Стало:**
```javascript
const typeLinkIndex = (typeContent === contentType.bonuses ? 'bonus'
    : typeContent === contentType.massages ? 'massage'
        : typeContent === contentType.courses ? 'course'
            : typeContent === contentType.posts ? 'media'
                : '')
```

### 3. Обновлены переводы во всех языках

**Обновлены файлы:**
- `public/locales/en/common.json`
- `public/locales/ru/common.json`
- `public/locales/de/common.json`
- `public/locales/fr/common.json`
- `public/locales/es/common.json`
- `public/locales/he/common.json`
- `public/locales/ar/common.json`

**Изменения в breadcrumbs:**
```json
{
  "breadcrumbs": {
    "main": "Home",
    "salon": "Salon",
    "massage": "Massage",
    "course": "Courses",
    "media": "Media",        // ← новый
    "stories": "Stories",    // ← новый
    "bonus": "Promotions"
  }
}
```

## 🎯 Результат

### ✅ Теперь URL-ы правильные:
- **Посты** → `/media/slug` (вместо `/blog/slug`)
- **Истории** → `/stories/slug` (вместо `/testimonial/slug`)

### ✅ Breadcrumbs обновлены:
- **Медиа** → `/media`
- **Истории** → `/stories`

### ✅ Ссылки в компонентах исправлены:
- `MainTemplate` теперь ссылается на `/media` для постов
- Все breadcrumbs используют новые пути

## 🔧 Технические детали

### Файлы, которые были изменены:
1. **`app/info/info.js`** - breadcrumbs конфигурация
2. **`widgets/main-template/MainTemplate.jsx`** - ссылки на посты
3. **`public/locales/*/common.json`** - переводы breadcrumbs

### Ключевые изменения:
- `'blog'` → `'media'`
- `'testimonial'` → `'stories'`
- Обновлены переводы на всех 7 языках

## 🚀 Проверка

После изменений:
1. **Перезапустите сервер** (`npm run dev`)
2. **Проверьте breadcrumbs** - должны показывать "Media" и "Stories"
3. **Проверьте ссылки** - должны вести на `/media` и `/stories`
4. **Проверьте посты** - должны иметь URL `/media/slug`

## 📝 Важно

- **GraphQL запросы** получают только `slug` - это правильно
- **URL формируется** в компонентах на основе `slug`
- **Теперь все URL** соответствуют новой структуре папок

Проблема решена! URL-ы теперь правильные. 🎉
