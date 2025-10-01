# 📧 Настройка формы обратной связи

## ✅ Что уже сделано:

1. ✅ API endpoint: `/pages/api/contact.js`
2. ✅ Валидация формы с Yup
3. ✅ Отправка email администратору
4. ✅ Автоответ пациенту
5. ✅ Telegram уведомления

---

## 🔧 Инструкция по настройке:

### 1. Создайте файл `.env.local` в корне проекта:

```env
# ===================================
# EMAIL НАСТРОЙКИ
# ===================================

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here
ADMIN_EMAIL=clinic@example.com

# ===================================
# TELEGRAM BOT
# ===================================

TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

---

## 📧 Настройка Gmail:

### Шаг 1: Включите двухфакторную аутентификацию
1. Перейдите: https://myaccount.google.com/security
2. Включите "2-Step Verification"

### Шаг 2: Создайте пароль приложения
1. Перейдите: https://myaccount.google.com/apppasswords
2. Выберите "Mail" и "Other (Custom name)"
3. Назовите: "Dr Tunitski Website"
4. Скопируйте 16-значный пароль
5. Вставьте в `EMAIL_PASS` (без пробелов!)

### Пример настройки:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
EMAIL_USER=drtunitski@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop  # Ваш пароль приложения
ADMIN_EMAIL=drtunitski@gmail.com  # Куда приходят заявки
```

---

## 🤖 Настройка Telegram бота:

### Шаг 1: Создайте бота
1. Откройте Telegram
2. Найдите @BotFather
3. Отправьте: `/newbot`
4. Следуйте инструкциям
5. **Скопируйте токен** (например: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Шаг 2: Получите Chat ID
1. Найдите @userinfobot
2. Нажмите "Start"
3. **Скопируйте ваш ID** (например: `123456789`)

### Шаг 3: Активируйте бота
1. Найдите вашего бота по имени
2. Нажмите "Start"
3. Отправьте любое сообщение

### Пример настройки:
```env
TELEGRAM_BOT_TOKEN=6789012345:ABCdefGHIjklMNOpqrsTUVwxyz123456
TELEGRAM_CHAT_ID=987654321
```

---

## 🔄 Альтернативные SMTP серверы:

### Yandex Mail:
```env
SMTP_HOST=smtp.yandex.com
SMTP_PORT=465
```

### Mail.ru:
```env
SMTP_HOST=smtp.mail.ru
SMTP_PORT=465
```

### Outlook/Hotmail:
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
# В contact.js измените secure: false для порта 587
```

---

## 📝 Пример заполненного `.env.local`:

```env
# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
EMAIL_USER=drtunitski@gmail.com
EMAIL_PASS=abcdefghijklmnop
ADMIN_EMAIL=drtunitski@gmail.com

# Telegram
TELEGRAM_BOT_TOKEN=6123456789:AAEaBcDefGHijKlmnOPqrsTUvwXyz123456
TELEGRAM_CHAT_ID=987654321
```

---

## 🧪 Тестирование:

### 1. Проверьте email:
```bash
# Запустите dev сервер
npm run dev

# Откройте форму и отправьте тестовую заявку
# Проверьте:
# - Пришло ли письмо вам (ADMIN_EMAIL)
# - Пришел ли автоответ пациенту
```

### 2. Проверьте Telegram:
- Отправьте заявку
- Проверьте, пришло ли уведомление в Telegram

---

## ⚠️ Важные замечания:

1. **НЕ используйте обычный пароль Gmail** - только App Password!
2. **НЕ коммитьте `.env.local`** - он уже в `.gitignore`
3. **Проверьте спам** - первое письмо может попасть туда
4. **Telegram бот** - работает только после первого сообщения боту

---

## 🚀 Что делать после настройки:

1. Перезапустите dev сервер: `npm run dev`
2. Отправьте тестовую заявку
3. Проверьте все 3 канала:
   - ✉️ Email вам
   - ✉️ Автоответ пациенту
   - 📱 Telegram уведомление

---

## 🔮 Будущие улучшения:

- [ ] Интеграция с CRM (AmoCRM/Bitrix24)
- [ ] Сохранение заявок в базу данных
- [ ] SMS уведомления
- [ ] Дашборд для просмотра заявок
- [ ] Экспорт в Excel

---

## 📞 Поддержка:

Если что-то не работает:
1. Проверьте консоль браузера (F12)
2. Проверьте логи сервера
3. Проверьте правильность всех настроек в `.env.local`

