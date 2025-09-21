# Руководство по исправлению RTL макета для блоков Center, FAQ, Video

## Проблема
При включении иврита (RTL язык) блоки Center, FAQ, Video смещались влево, оставляя 30% пустого пространства справа, хотя текст выравнивался по правому краю как положено для семитских языков.

## Причина
1. **Неправильное позиционирование блоков**: Использование `margin-left: calc(-50vw + 50%)` для растягивания блоков на всю ширину экрана не учитывало RTL направление
2. **Неправильные float направления**: Изображения и видео элементы использовали `float: left` и `margin-right`, что не подходит для RTL
3. **Отсутствие RTL стилей**: Не было специальных стилей для `[dir="rtl"]` селектора
4. **Ошибка компиляции SCSS**: Использование `&` (parent selector) внутри `[dir="rtl"]` селектора вызывало ошибку компиляции

## Исправления

### 1. Исправленные файлы
- `pages/story/index.scss` - блоки story
- `pages/about/index.scss` - блоки about  
- `pages/course/index.scss` - блоки course
- `pages/massage/index.scss` - блоки massage
- `pages/bonus/index.scss` - блоки bonus
- `pages/media/index.scss` - блоки media/salon

### 2. Добавленные RTL стили

#### Для блоков Center и Bottom:
```scss
[dir="rtl"] {
  .{page}-block-center {
    margin-left: 0;
    margin-right: calc(-50vw + 50%);
    
    .{page}__title-main {
      text-align: right;
    }
  }
  
  .{page}-block-bottom {
    margin-left: 0;
    margin-right: calc(-50vw + 50%);
    
    .{page}__title-faq {
      text-align: right;
    }
  }
}
```

#### Для изображений и видео:
```scss
[dir="rtl"] {
  .{page}__anons-img {
    float: right;
    margin-right: 0;
    margin-left: 20px;
  }
  
  .{page}__description-img {
    float: left;
    margin-left: 0;
    margin-right: 20px;
  }
  
  .{page}__video-content {
    float: right !important;
    margin-right: 0 !important;
    margin-left: 20px !important;
  }
}
```

### 3. Ключевые изменения

1. **Позиционирование блоков**: 
   - `margin-left: calc(-50vw + 50%)` → `margin-right: calc(-50vw + 50%)`
   - `margin-left: 0` для сброса левого отступа

2. **Выравнивание текста**:
   - `text-align: left` → `text-align: right` для заголовков

3. **Float направления**:
   - `float: left` → `float: right` для anons изображений
   - `float: right` → `float: left` для description изображений
   - `float: left` → `float: right` для видео контента

4. **Отступы**:
   - `margin-right: 20px` → `margin-left: 20px`
   - `margin-left: 20px` → `margin-right: 20px`

5. **Исправление синтаксиса SCSS**:
   - Убрали `&` (parent selector) из `[dir="rtl"]` селектора
   - Заменили вложенные селекторы на полные имена классов
   - Пример: `.about__anons { &-img { ... } }` → `.about__anons-img { ... }`
   - Переместили блоки `&-block-video` и `&-block-top` из RTL селектора в основной блок `.about`
   - Исправили ошибку "Selector [dir=rtl] can't have a suffix"

## Результат
Теперь при переключении на иврит:
- Блоки Center, FAQ, Video правильно растягиваются на всю ширину экрана
- Текст выравнивается по правому краю
- Изображения и видео позиционируются корректно для RTL направления
- Нет пустого пространства справа

## Тестирование
Для проверки исправлений:
1. Переключите язык на иврит (HE)
2. Откройте любую страницу About, Story, Course, Massage, Bonus или Media
3. Проверьте, что блоки Center, FAQ, Video занимают всю ширину экрана
4. Убедитесь, что текст выравнивается по правому краю
5. Проверьте позиционирование изображений и видео
