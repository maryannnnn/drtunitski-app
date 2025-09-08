# Мультиязычная настройка проекта

## Что было сделано

### 1. Установлены пакеты
- `next-i18next` - для интеграции i18n с Next.js
- `react-i18next` - React интеграция для i18next
- `i18next` - основная библиотека интернационализации

### 2. Создана структура переводов
```
locales/
├── en/common.json (английский - основной язык)
├── ru/common.json (русский)
├── he/common.json (иврит - RTL)
├── ar/common.json (арабский - RTL)
├── de/common.json (немецкий)
├── fr/common.json (французский)
└── es/common.json (испанский)
```

### 3. Настроена конфигурация
- `next-i18next.config.js` - основная конфигурация i18n
- `next.config.mjs` - обновлен для поддержки i18n
- `pages/_app.js` - добавлен `appWithTranslation`

### 4. Обновлен Apollo Client
- Добавлена поддержка заголовка `Accept-Language` для GraphQL запросов
- Автоматическое определение языка из localStorage

### 5. Добавлена поддержка RTL
- Утилиты для определения RTL языков (`shared/utils/rtl-utils.js`)
- Хук `useI18n` для работы с i18n и RTL (`shared/hooks/useI18n.js`)
- Обновлены глобальные стили для поддержки RTL

### 6. Создан компонент переключения языков
- `LanguageSwitcher` - компонент с двумя вариантами (select и dropdown)
- Поддержка флагов и названий языков
- Адаптивный дизайн

### 7. Обновлены layouts
- `MainLayout` и `LeftLayout` поддерживают RTL
- Автоматическое определение направления текста

## Как использовать

### 1. В компонентах
```jsx
import { useTranslation } from 'next-i18next';
import { useI18n } from '../../shared/hooks/useI18n';

const MyComponent = () => {
    const { t } = useTranslation();
    const { locale, isRTL, direction } = useI18n();
    
    return (
        <div dir={direction}>
            <h1>{t('common:navigation.home')}</h1>
        </div>
    );
};
```

### 2. В getStaticProps/getServerSideProps
```jsx
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}
```

### 3. Добавление переключателя языков
```jsx
import LanguageSwitcher from '../../shared/language-switcher/LanguageSwitcher';

// Вариант 1: Select
<LanguageSwitcher variant="select" showLabel={true} />

// Вариант 2: Dropdown
<LanguageSwitcher variant="dropdown" showLabel={false} />
```

### 4. Добавление новых переводов
1. Добавьте ключи в `locales/en/common.json`
2. Добавьте переводы во все остальные языковые файлы
3. Используйте в компонентах: `t('common:your.key')`

## RTL языки
- Иврит (he)
- Арабский (ar)

Для RTL языков автоматически:
- Меняется направление текста (`dir="rtl"`)
- Применяются RTL стили
- Переворачиваются flexbox направления

## GraphQL интеграция
Apollo Client автоматически отправляет заголовок `Accept-Language` с текущим языком. Убедитесь, что ваш WordPress с плагином GraphQL Polylang правильно обрабатывает этот заголовок.

## Следующие шаги
1. Добавьте переводы для всех текстов в приложении
2. Обновите все страницы для использования `getStaticProps` с `serverSideTranslations`
3. Добавьте переключатель языков в header
4. Настройте SEO для разных языков
5. Добавьте hreflang теги для поисковых систем
