# Компонент MainTitle - Руководство по использованию

## Обзор
Обновленный компонент `MainTitle` теперь включает фото доктора, структурированный текст и кнопку "Узнать больше" с поддержкой всех языков.

## Что было реализовано

### 1. Новый дизайн компонента
- **Фото доктора** слева с красивой тенью и скругленными углами
- **Текст справа** с заголовком, подзаголовком и описанием
- **Кнопка "Узнать больше"** внизу текста
- **Адаптивный дизайн** для мобильных устройств

### 2. Обновленная кнопка ButtonBrown
**Файл:** `shared/button-brown/ButtonBrown.jsx`

**Новые возможности:**
- Вариант `--primary` с цветом `$primary: #1d1d6d`
- Поддержка навигации через `href` prop
- Анимации при наведении
- Адаптивные размеры

**Использование:**
```jsx
<ButtonBrown 
    variant="primary"
    href="/about/dr-serge-tunitski"
    className="custom-class"
>
    Learn More
</ButtonBrown>
```

### 3. Многоязычная поддержка
**Добавлены переводы для всех языков:**

#### Английский (en)
```json
{
  "info": {
    "mainTitle": {
      "title": "Doctor Sergey Tunitsky - Modern Gynecology and Surgical Treatment",
      "description": "Dr. Sergey Tonitsky is a specialist in women's medicine...",
      "subtitle": "Expert in Women's Health",
      "learnMore": "Learn More"
    }
  }
}
```

#### Русский (ru)
```json
{
  "info": {
    "mainTitle": {
      "title": "Доктор Сергей Туницкий - Современная гинекология и хирургическое лечение",
      "description": "Доктор Сергей Туницкий - специалист по женской медицине...",
      "subtitle": "Эксперт в области женского здоровья",
      "learnMore": "Узнать больше"
    }
  }
}
```

#### Другие языки
- **Немецкий (de)**: "Experte für Frauengesundheit" / "Mehr erfahren"
- **Французский (fr)**: "Expert en santé féminine" / "En savoir plus"
- **Испанский (es)**: "Experto en salud femenina" / "Saber más"
- **Иврит (he)**: "מומחה לבריאות נשים" / "למד עוד"
- **Арабский (ar)**: "خبير في صحة المرأة" / "اعرف المزيد"

### 4. Адаптивный дизайн

#### Desktop (1200px+)
- Фото слева (400px ширина)
- Текст справа (flex: 1)
- Горизонтальная компоновка

#### Tablet (768px - 1199px)
- Фото сверху
- Текст снизу
- Центрированное выравнивание

#### Mobile (до 767px)
- Вертикальная компоновка
- Уменьшенные размеры фото
- Адаптивные размеры шрифтов

### 5. RTL поддержка
- Автоматическое переключение направления для иврита и арабского
- Фото справа, текст слева для RTL языков

## Структура файлов

```
widgets/main-title/
├── MainTitle.jsx          # Основной компонент
├── main-title.scss        # Стили компонента
└── media.scss            # Медиа-запросы

shared/button-brown/
├── ButtonBrown.jsx        # Обновленная кнопка
├── button-brown.scss      # Стили с новым вариантом
└── media.scss            # Медиа-запросы

app/info/
└── info.js               # Обновленная функция getMainTitle

public/locales/
├── en/common.json        # Английские переводы
├── ru/common.json        # Русские переводы
├── de/common.json        # Немецкие переводы
├── fr/common.json        # Французские переводы
├── es/common.json        # Испанские переводы
├── he/common.json        # Переводы на иврит
└── ar/common.json        # Арабские переводы
```

## Использование

### Базовое использование
```jsx
import MainTitle from '@/widgets/main-title/MainTitle';

const HomePage = () => {
    return (
        <div>
            <MainTitle />
            {/* Другие компоненты */}
        </div>
    );
};
```

### Кастомизация стилей
```scss
.main-title {
    // Переопределение отступов
    padding: 80px 0;
    
    // Изменение цвета заголовка
    &__title {
        color: $custom-color;
    }
    
    // Кастомизация кнопки
    &__learn-more-btn {
        background: linear-gradient(45deg, $primary, $secondary);
    }
}
```

## Технические детали

### Next.js Image
- Оптимизированная загрузка изображений
- Автоматическое сжатие и WebP конвертация
- Lazy loading (отключен для главного изображения)

### Производительность
- CSS Grid/Flexbox для эффективной компоновки
- Минимальные перерисовки при изменении языка
- Оптимизированные изображения

### Accessibility
- Семантическая разметка (h1, h2)
- Alt-текст для изображений
- Поддержка скрин-ридеров
- Keyboard navigation

## Настройка

### Изменение фото доктора
1. Замените файл `/public/images/doctor/dr_serge_tunitski_2.jpg`
2. Обновите alt-текст в компоненте при необходимости

### Изменение URL кнопки
```jsx
const getAboutUrl = () => {
    // Кастомная логика для URL
    return '/custom-about-page';
};
```

### Добавление новых языков
1. Создайте файл `public/locales/{lang}/common.json`
2. Добавьте переводы в секцию `info.mainTitle`
3. Обновите `next-i18next.config.js`

## Примеры использования

### С кастомными стилями
```jsx
<MainTitle className="custom-main-title" />
```

```scss
.custom-main-title {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    
    .main-title__photo {
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
}
```

### С дополнительным контентом
```jsx
<div className="main-title">
    <div className="container">
        <MainTitle />
        <div className="additional-content">
            {/* Дополнительный контент */}
        </div>
    </div>
</div>
```

## Устранение неполадок

### Проблема: Изображение не загружается
**Решение:** Проверьте путь к файлу и права доступа

### Проблема: Переводы не отображаются
**Решение:** Убедитесь, что ключи переводов добавлены во все языковые файлы

### Проблема: Кнопка не работает
**Решение:** Проверьте, что страница `/about/dr-serge-tunitski` существует

### Проблема: Неправильное отображение на мобильных
**Решение:** Проверьте медиа-запросы в `main-title.scss`

## Дальнейшее развитие

1. **Анимации** - добавление плавных переходов
2. **Интерактивность** - hover-эффекты для фото
3. **Видео** - возможность добавления видео вместо фото
4. **Аналитика** - отслеживание кликов по кнопке
5. **A/B тестирование** - тестирование разных вариантов текста
