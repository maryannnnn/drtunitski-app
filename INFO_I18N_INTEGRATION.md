# Интеграция переводов из info.js в мультиязычную систему

## Что было сделано

### 1. Создана структура переводов в JSON файлах

Добавлены переводы для всех поддерживаемых языков в секцию `info`:

- **Русский** (`public/locales/ru/common.json`)
- **Английский** (`public/locales/en/common.json`) 
- **Иврит** (`public/locales/he/common.json`)
- **Немецкий** (`public/locales/de/common.json`)
- **Французский** (`public/locales/fr/common.json`)
- **Испанский** (`public/locales/es/common.json`)
- **Арабский** (`public/locales/ar/common.json`)

### 2. Структура переводов

```json
{
  "info": {
    "contact": {
      "title": "Контакты",
      "address": "ул. Эли Ландау 7, Герцлия, Израиль"
    },
    "mainTitle": {
      "title": "Салон Массажа предлагает разные виды массажа...",
      "description": "Для нас массаж - это про любовь..."
    },
    "attributes": {
      "massageTitle": "Основные элементы массажа",
      "courseTitle": "Основные элементы курса",
      "massagePrice": "Цена массажа",
      "coursePrice": "Цена курса",
      "courseParameters": "Почему стоит учиться в центре Крыльях Ветра?"
    },
    "testimonials": {
      "massageTitle": "Отзывы наших клиентов о массаже",
      "courseTitle": "Отзывы наших клиентов о курсе обучения на массажиста",
      "types": {
        "main": "Отзывы",
        "massage": "Массаж",
        "course": "Курсы",
        "post": "Блог"
      },
      "options": {
        "reason": "Причина выбора",
        "process": "Что в процессе",
        "taste": "Послевкусие"
      }
    },
    "breadcrumbs": {
      "main": "Главная",
      "salon": "Салон",
      "massage": "Массаж",
      "course": "Курсы",
      "blog": "Блог",
      "testimonial": "Отзывы",
      "bonus": "Акции"
    }
  }
}
```

### 3. Обновлен файл info.js

Заменили статические константы на функции, которые принимают функцию перевода `t`:

**Было:**
```javascript
export const mainTitle = {
    title: 'Салон Массажа предлагает...',
    description: 'Для нас массаж - это про любовь...'
}
```

**Стало:**
```javascript
export const getMainTitle = (t) => ({
    title: t('info:mainTitle.title'),
    description: t('info:mainTitle.description')
})
```

### 4. Обновлены компоненты

Обновили все компоненты, которые используют данные из `info.js`:

- `widgets/main-title/MainTitle.jsx`
- `shared/breadcrumbs-page/BreadcrumbsPage.jsx`
- `pages/index.jsx`
- `widgets/attributes-massage/AtributesMassage.jsx`
- `widgets/attributes-course/AtributesCourse.jsx`

**Пример обновления:**
```javascript
// Было
import {mainTitle} from "../../app/info/info";
const MainTitle = () => {
    return <h1>{mainTitle.title}</h1>
}

// Стало
import {getMainTitle} from "../../app/info/info";
import { useTranslation } from 'next-i18next';

const MainTitle = () => {
    const { t } = useTranslation();
    const mainTitle = getMainTitle(t);
    return <h1>{mainTitle.title}</h1>
}
```

## Как использовать

### 1. В компонентах

```javascript
import { useTranslation } from 'next-i18next';
import { getMainTitle, getTestimonialType } from '../app/info/info';

const MyComponent = () => {
    const { t } = useTranslation();
    
    const mainTitle = getMainTitle(t);
    const testimonialTypes = getTestimonialType(t);
    
    return (
        <div>
            <h1>{mainTitle.title}</h1>
            <p>{testimonialTypes.main}</p>
        </div>
    );
};
```

### 2. Доступные функции

- `getMainTitle(t)` - главный заголовок и описание
- `getAttributeTitleMassage(t)` - заголовок атрибутов массажа
- `getAttributeTitleCourse(t)` - заголовок атрибутов курса
- `getAttributePriceMassage(t)` - заголовок цены массажа
- `getAttributePriceCourse(t)` - заголовок цены курса
- `getAttributeParametersCourse(t)` - параметры курса
- `getTestimonialTitleMassage(t)` - заголовок отзывов о массаже
- `getTestimonialTitleCourse(t)` - заголовок отзывов о курсе
- `getTestimonialType(t)` - типы отзывов
- `getTestimonialOptions(t)` - опции отзывов
- `getBreadcrumbType(t)` - хлебные крошки

### 3. Статические данные

Некоторые данные остались статическими (не требуют перевода):
- `contactSalon` - контактная информация (телефон, email, видео)
- `sizeText` - размеры текста
- `colorType` - типы цветов
- `numberItems` - числовые константы
- `contentType` - типы контента

## Тестирование

Создан тестовый компонент `test-translations.jsx` для проверки работы переводов на всех языках.

## Преимущества

1. **Централизованное управление** - все переводы в одном месте
2. **Автоматическое переключение** - переводы меняются при смене языка
3. **Поддержка RTL** - автоматическая поддержка для иврита и арабского
4. **Fallback** - если перевод отсутствует, используется английский
5. **Типизация** - функции обеспечивают правильную структуру данных

## Следующие шаги

1. Протестировать работу на всех языках
2. Добавить недостающие переводы при необходимости
3. Обновить остальные компоненты, которые могут использовать данные из info.js
4. Удалить тестовый файл `test-translations.jsx` после проверки
