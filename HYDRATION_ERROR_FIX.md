# Исправление ошибки гидратации Next.js

## Проблема

Ошибка гидратации возникала из-за неправильного использования `NextLink` с `passHref` и Material-UI `Link`, что создавало вложенные `<a>` теги:

```jsx
// ❌ Неправильно - создает вложенные <a> теги
<NextLink href="/privacy-policy" passHref>
    <Link sx={{...}}>
        {t('common:footer.privacyPolicy')}
    </Link>
</NextLink>
```

## Решение

### 1. Упрощение импортов
```jsx
// ✅ Правильно - используем только Next.js Link
import Link from 'next/link';
```

### 2. Использование CSS классов вместо Material-UI
```jsx
// ✅ Правильно - используем CSS классы
<Link href="/privacy-policy" className="footer-link">
    {t('common:footer.privacyPolicy')}
</Link>
```

### 3. Добавление стилей в SCSS
```scss
.footer-link {
  color: $grey-2;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: $primary;
    text-decoration: underline;
  }
}
```

## Почему это работает

### ✅ Избегаем вложенных тегов
- Next.js `Link` создает только один `<a>` тег
- Нет конфликта между серверным и клиентским рендерингом

### ✅ Консистентность
- Одинаковый HTML на сервере и клиенте
- Нет различий в структуре DOM

### ✅ Производительность
- Меньше JavaScript для гидратации
- Быстрее загрузка страницы

## Альтернативные решения

### 1. Использование Material-UI с Next.js
```jsx
import { Link as MuiLink } from '@mui/material';
import NextLink from 'next/link';

<MuiLink component={NextLink} href="/privacy-policy">
    {t('common:footer.privacyPolicy')}
</MuiLink>
```

### 2. Использование styled-components
```jsx
import styled from 'styled-components';
import Link from 'next/link';

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;
```

## Проверка исправления

### 1. Консоль браузера
- Нет ошибок гидратации
- Нет предупреждений о несоответствии HTML

### 2. DevTools
- Одинаковая структура DOM на сервере и клиенте
- Корректная работа ссылок

### 3. Функциональность
- Ссылки работают корректно
- Hover эффекты применяются
- Переводы отображаются правильно

## Рекомендации

### ✅ Лучшие практики
- Используйте Next.js `Link` для внутренних ссылок
- Применяйте CSS классы для стилизации
- Избегайте вложенных `<a>` тегов
- Тестируйте гидратацию в development режиме

### ❌ Чего избегать
- Смешивания `NextLink` с `passHref` и Material-UI `Link`
- Создания вложенных тегов `<a>`
- Использования `sx` пропсов в компонентах, которые рендерятся на сервере

Ошибка гидратации исправлена! Теперь футер работает корректно на всех языках.
