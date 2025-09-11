# Исправление переводов в мобильном меню

## Проблема
В мобильной версии меню не отображались переводы - все пункты меню показывались только на английском языке, независимо от выбранного языка.

## Решение

### 1. Обновлен компонент MenuMainMobile.jsx
- **Добавлен импорт**: `useTranslation` из `next-i18next`
- **Добавлены функции переводов**:
  - `getTranslatedLabel()` - для получения переведенных названий
  - `getTranslationKey()` - для сопоставления названий с ключами переводов
- **Обновлен рендеринг**: все `link.node.label` заменены на `getTranslatedLabel(link.node.label, link.node.id)`

### 2. Обновлены утилиты utils-menu.js
- **Обновлена функция** `getMenuItemsMobile()`:
  - Добавлен параметр `getTranslatedLabel = null`
  - Все `submenu.node.label` и `columnItem.label` заменены на условные переводы
- **Обратная совместимость**: если функция перевода не передана, используется оригинальное название

### 3. Структура изменений

#### MenuMainMobile.jsx
```javascript
// Добавлен импорт
import { useTranslation } from 'next-i18next';

// Добавлены функции переводов (копированы из MenuMain.jsx)
const getTranslatedLabel = (label, itemId) => { ... };
const getTranslationKey = (label, itemId) => { ... };

// Обновлен рендеринг
<ListItemText primary={getTranslatedLabel(link.node.label, link.node.id)} />
<Typography>{getTranslatedLabel(link.node.label, link.node.id)}</Typography>

// Передача функции в утилиты
{getMenuItemsMobile(link.node.id, data.menuItems.edges, isRTL, textAlign, getTranslatedLabel)}
```

#### utils-menu.js
```javascript
// Обновлена сигнатура функции
export const getMenuItemsMobile = (linkId, menuMain, isRTL = false, textAlign = 'left', getTranslatedLabel = null) => {

// Условные переводы
<ListItemText primary={getTranslatedLabel ? getTranslatedLabel(submenu.node.label, submenu.node.id) : submenu.node.label} />
```

## Результат

### ✅ Что исправлено:
1. **Основные пункты меню** теперь переводятся (Home, About, Gynecology, etc.)
2. **Подменю** переводятся корректно (все пункты About, Gynecology, Cancer, Surgery, Media)
3. **Заголовки колонок** в многоколоночных меню переводятся
4. **Элементы колонок** переводятся
5. **RTL поддержка** сохранена для иврита и арабского

### 🎯 Как проверить:
1. Откройте сайт на мобильном устройстве или в режиме мобильного просмотра
2. Откройте мобильное меню (гамбургер-меню)
3. Переключите язык через переключатель языков
4. Убедитесь, что все пункты меню отображаются на выбранном языке

### 📱 Поддерживаемые языки в мобильном меню:
- **English (EN)** - Английский
- **Русский (RU)** - Русский  
- **Deutsch (DE)** - Немецкий
- **Français (FR)** - Французский
- **Español (ES)** - Испанский
- **עברית (HE)** - Иврит (RTL)
- **العربية (AR)** - Арабский (RTL)

## Технические детали

### Файлы, которые были изменены:
1. `shared/menu-main-mobile/MenuMainMobile.jsx` - основной компонент мобильного меню
2. `shared/utils/utils-menu.js` - утилиты для рендеринга подменю

### Принцип работы:
1. Компонент получает функцию `getTranslatedLabel` из `useTranslation`
2. Функция сопоставляет оригинальные названия с ключами переводов
3. Переводы загружаются из файлов `public/locales/*/common.json`
4. Если перевод не найден, показывается оригинальное название

Мобильное меню теперь полностью поддерживает многоязычность!
