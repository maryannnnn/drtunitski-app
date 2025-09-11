# Удаление дублирующихся пунктов из меню "Операции"

## Проблема
В подменю "Операции" в третьей колонке "Specialized Surgeries" были дублирующиеся пункты:
- `Labiaplasty` 
- `Hymenoplasty (restoration of the hymen)`

Эти же пункты уже присутствовали в четвертой колонке "Plastic Surgery" с более подробными названиями:
- `Labiaplasty (surgery of the labia minora)`
- `Hymenoplasty (restoration of the hymen)`

## Решение

### 1. Удалены из JSON структуры меню
**Файл**: `shared/menu-main/menuMain.json`

Удалены элементы из третьей колонки "Specialized Surgeries":
- `cG9zdDozNjc55c3` - "Labiaplasty"
- `cG9zdDozNjc55c5` - "Hymenoplasty (restoration of the hymen)"

### 2. Удалены переводы из всех языковых файлов
Удалены ключи `labiaplasty` и `hymenoplasty` из секции `surgeryItems` во всех файлах:

- `public/locales/en/common.json` - английский
- `public/locales/ru/common.json` - русский  
- `public/locales/de/common.json` - немецкий
- `public/locales/fr/common.json` - французский
- `public/locales/es/common.json` - испанский
- `public/locales/he/common.json` - иврит
- `public/locales/ar/common.json` - арабский

### 3. Обновлены компоненты меню
**Файлы**:
- `shared/menu-main/MenuMain.jsx` - основное меню
- `shared/menu-main-mobile/MenuMainMobile.jsx` - мобильное меню

Удалены соответствующие ключи из функций `getTranslationKey()`.

## Результат

### ✅ Что изменилось:

**Третья колонка "Specialized Surgeries" теперь содержит только:**
1. Radical hysterectomy
2. Lymphadenectomy  
3. Removal of large endometriotic cysts (>5 cm)
4. Excision of vaginal scar strictures
5. Radical vulvectomy

**Четвертая колонка "Plastic Surgery" содержит:**
1. Plastic Surgery
2. Labiaplasty (surgery of the labia minora)
3. Hymenoplasty (restoration of the hymen)

### 🎯 Преимущества:

1. **Устранено дублирование** - каждый пункт теперь присутствует только в одной колонке
2. **Улучшена логика** - пластические операции теперь только в колонке "Plastic Surgery"
3. **Сохранена функциональность** - все пункты остались доступными, но в правильных местах
4. **Обновлены переводы** - все языки синхронизированы

### 📱 Проверка:

1. Откройте меню "Операции" (Surgery)
2. Проверьте третью колонку "Specialized Surgeries" - дублирующиеся пункты должны отсутствовать
3. Проверьте четвертую колонку "Plastic Surgery" - все пластические операции должны быть там
4. Переключите язык и убедитесь, что изменения применились на всех языках

## Технические детали

### Удаленные элементы:
- **JSON**: `cG9zdDozNjc55c3` и `cG9zdDozNjc55c5`
- **Переводы**: `labiaplasty` и `hymenoplasty` из `surgeryItems`
- **Компоненты**: соответствующие ключи из функций перевода

### Сохраненные элементы:
- **JSON**: `cG9zdDozNjc55d2` и `cG9zdDozNjc55d3` (в колонке Plastic Surgery)
- **Переводы**: `labiaplastySurgery` и `hymenoplastyRestoration` в `surgeryItems`
- **Компоненты**: соответствующие ключи остались

Дублирование устранено, структура меню стала более логичной!
