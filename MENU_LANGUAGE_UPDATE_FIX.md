# Исправление обновления меню при смене языка

## Проблема
При переключении языка на странице меню не обновлялось в реальном времени. Меню оставалось на предыдущем языке до следующего перехода на другую страницу.

## Причина
Компоненты меню (`MenuMain` и `MenuMainMobile`) не реагировали на изменения языка в реальном времени. Они получали `currentLocale` из `router.locale`, но не подписывались на изменения этого значения.

## Решение

### 1. Desktop меню (`shared/menu-main/MenuMain.jsx`)

**Добавлено:**
- Импорт `useEffect` из React
- Состояние `forceUpdate` для принудительного обновления
- `useEffect` для отслеживания изменений `currentLocale`
- Ключ `key={forceUpdate}` для принудительного перерендеринга

```jsx
import React, { useState, useEffect } from 'react';

const MenuMain = () => {
    const [forceUpdate, setForceUpdate] = useState(0);
    const currentLocale = router.locale || 'en';

    // Принудительное обновление при изменении языка
    useEffect(() => {
        setForceUpdate(prev => prev + 1);
    }, [currentLocale]);

    return (
        <nav className="navigation-menu" key={forceUpdate}>
            {/* ... */}
        </nav>
    );
};
```

### 2. Mobile меню (`shared/menu-main-mobile/MenuMainMobile.jsx`)

**Добавлено:**
- Импорт `useRouter` из Next.js
- Состояние `forceUpdate` для принудительного обновления
- `useEffect` для отслеживания изменений `router.locale`
- Ключ `key={forceUpdate}` для принудительного перерендеринга

```jsx
import { useRouter } from 'next/router';

const MenuMainMobile = ({ initialData }) => {
    const router = useRouter();
    const [forceUpdate, setForceUpdate] = useState(0);

    // Принудительное обновление при изменении языка
    useEffect(() => {
        setForceUpdate(prev => prev + 1);
    }, [router.locale]);

    return (
        <ul className="menu-main-mobile" key={forceUpdate}>
            {/* ... */}
        </ul>
    );
};
```

## Как это работает

1. **Отслеживание изменений**: `useEffect` следит за изменениями `router.locale`
2. **Принудительное обновление**: При изменении языка увеличивается `forceUpdate`
3. **Перерендеринг**: Ключ `key={forceUpdate}` заставляет React полностью перерендерить компонент
4. **Обновление переводов**: `useTranslation` получает новые переводы для текущего языка

## Результат

Теперь при переключении языка:
- ✅ Desktop меню обновляется мгновенно
- ✅ Mobile меню обновляется мгновенно
- ✅ Все переводы применяются сразу
- ✅ RTL/LTR направление обновляется корректно
- ✅ Не требуется переход на другую страницу

## Тестирование

1. Откройте любую страницу сайта
2. Переключите язык через LanguageSwitcher
3. Проверьте, что меню обновилось сразу
4. Повторите для разных языков (включая RTL)
5. Проверьте как desktop, так и mobile версии меню
