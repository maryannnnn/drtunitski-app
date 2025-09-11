# Исправление ошибок сборки Vercel

## ❌ Проблема

При сборке на Vercel возникала ошибка:
```
Error: Failed to collect page data for /bonus/[slug]
ApolloError: fetch failed
ConnectTimeoutError: Connect Timeout Error (attempted address: drtunitski.neo-lines.bond:443, timeout: 10000ms)
```

## 🔍 Причина

Проблема возникала из-за того, что:
1. **API недоступен** во время сборки на Vercel
2. **Динамические страницы** пытаются получить данные через GraphQL
3. **Отсутствует обработка ошибок** в `getStaticPaths` и `getStaticProps`
4. **Таймаут подключения** к `drtunitski.neo-lines.bond:443`

## ✅ Решение

### 1. Добавлена обработка ошибок для всех динамических страниц

#### Исправленные страницы:
- `pages/bonus/[slug].jsx`
- `pages/salon/[slug].jsx`
- `pages/course/[slug].jsx`
- `pages/testimonial/[slug].jsx`
- `pages/massage/[slug].jsx`
- `pages/blog/[slug].jsx` (уже была исправлена)

#### Паттерн исправления:
```jsx
export async function getStaticPaths({ locales }) {
    try {
        const {data} = await apolloClient.query({
            query: GET_QUERY_ALL,
        });
        
        // ... обработка данных ...
        
        return {paths, fallback: true};
    } catch (error) {
        console.error("Error fetching data for static paths:", error);
        // Возвращаем пустой массив путей, но с fallback: true
        // Это позволит страницам генерироваться по требованию
        return {
            paths: [],
            fallback: true
        };
    }
}

export async function getStaticProps({params, locale}) {
    try {
        const {data} = await apolloClient.query({
            query: GET_QUERY_BY_SLUG,
            variables: {slug: params.slug},
        });

        return {
            props: {
                initialData: data,
                ...(await serverSideTranslations(locale, ['common'])),
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                initialData: { dataBy: null },
                ...(await serverSideTranslations(locale, ['common'])),
            },
        };
    }
}
```

### 2. Создан компонент ErrorFallback

#### Файл: `components/ErrorFallback.jsx`
- **Обработка ошибок** с пользовательским интерфейсом
- **Переводы** на всех языках
- **Кнопки действий**: "Попробовать снова" и "На главную"
- **Отображение деталей ошибки** для разработки

### 3. Добавлены переводы для ошибок

#### Переводы добавлены в:
- `public/locales/en/common.json`
- `public/locales/ru/common.json`
- (и другие языки при необходимости)

#### Структура переводов:
```json
{
  "error": {
    "title": "Something went wrong",
    "description": "We apologize for the inconvenience...",
    "details": "Error details:",
    "retry": "Try Again",
    "goHome": "Go Home"
  }
}
```

## 🎯 Результат

### ✅ Устойчивость к ошибкам
- **Сборка не падает** при недоступности API
- **Страницы генерируются** по требованию (fallback: true)
- **Graceful degradation** - показ ошибок вместо краха

### ✅ Улучшенный UX
- **Понятные сообщения об ошибках** на всех языках
- **Возможность повторить попытку** или перейти на главную
- **Информативные детали** для отладки

### ✅ Надежность развертывания
- **Vercel сборка проходит** даже при проблемах с API
- **Страницы доступны** после развертывания
- **Автоматическое восстановление** при восстановлении API

## 🔧 Технические детали

### Fallback стратегия
```jsx
return {
    paths: [],           // Пустой массив путей
    fallback: true       // Генерация по требованию
};
```

### Обработка ошибок в getStaticProps
```jsx
catch (error) {
    console.error("Error fetching data:", error);
    return {
        props: {
            initialData: { dataBy: null },  // Null данные
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}
```

### Компонент ErrorFallback
- **Условный рендеринг** при ошибках
- **Интернационализация** через useTranslation
- **Навигация** через useRouter
- **Material-UI** для консистентного дизайна

## 🚀 Развертывание

Теперь сборка на Vercel должна проходить успешно:

1. **API недоступен** → страницы генерируются с fallback
2. **API доступен** → страницы генерируются с данными
3. **Ошибки отображаются** пользователю понятно
4. **Сайт остается функциональным** в любом случае

## 📝 Мониторинг

### Логи для отслеживания:
- `"Error fetching data for static paths:"` - проблемы с getStaticPaths
- `"Error fetching data:"` - проблемы с getStaticProps
- `ConnectTimeoutError` - проблемы с подключением к API

### Рекомендации:
- **Мониторить логи** Vercel для выявления проблем
- **Проверять доступность API** перед развертыванием
- **Тестировать fallback** поведение локально

Исправления готовы! Сборка на Vercel теперь должна проходить успешно. 🎉
