# Инструкция по настройке отправки Email

## Быстрый старт

### 1. Создайте файл `.env.local` в корне проекта

```bash
# Скопируйте шаблон
cp .env.local.example .env.local
```

### 2. Выберите провайдера и настройте

---

## Вариант 1: Gmail (ПРОЩЕ ВСЕГО для тестирования)

### Шаги:

1. **Включите двухфакторную аутентификацию:**
   - Зайдите в [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → Включите

2. **Создайте App Password:**
   - В Security найдите "App passwords" (внизу страницы)
   - Выберите "Mail" и "Other" (введите "Next.js App")
   - Скопируйте 16-значный пароль (без пробелов)

3. **Заполните `.env.local`:**

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop  # Вставьте App Password БЕЗ пробелов
ADMIN_EMAIL=admin@drtunitski.com
NODE_ENV=development
```

---

## Вариант 2: SendGrid (РЕКОМЕНДУЕТСЯ для продакшена)

### Преимущества:
- ✅ Бесплатно 100 писем/день
- ✅ Отличная доставляемость
- ✅ Подробная статистика
- ✅ Не требует Gmail

### Шаги:

1. **Регистрация:**
   - Зайдите на [SendGrid](https://signup.sendgrid.com/)
   - Создайте аккаунт (бесплатный план)

2. **Создайте API Key:**
   - Settings → API Keys → Create API Key
   - Name: "drtunitski-app"
   - Permissions: Full Access
   - Скопируйте API Key (показывается ОДИН РАЗ!)

3. **Верифицируйте отправителя:**
   - Settings → Sender Authentication
   - Verify a Single Sender
   - Введите ваш email и подтвердите

4. **Заполните `.env.local`:**

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=465
EMAIL_USER=apikey
EMAIL_PASS=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  # Ваш API Key
ADMIN_EMAIL=your-verified-email@gmail.com
NODE_ENV=development
```

---

## Вариант 3: Mailgun

### Шаги:

1. Зарегистрируйтесь на [Mailgun](https://www.mailgun.com/)
2. Получите SMTP credentials
3. Заполните `.env.local`:

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=465
EMAIL_USER=postmaster@your-domain.mailgun.org
EMAIL_PASS=your-mailgun-password
ADMIN_EMAIL=admin@drtunitski.com
NODE_ENV=development
```

---

## Опционально: Telegram уведомления

### Шаги:

1. **Создайте бота:**
   - Напишите [@BotFather](https://t.me/botfather) в Telegram
   - Отправьте `/newbot`
   - Следуйте инструкциям
   - Получите **Bot Token** (например: `123456:ABC-DEF...`)

2. **Получите Chat ID:**
   - Напишите вашему боту любое сообщение
   - Откройте в браузере: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Найдите `"chat":{"id":123456789}`
   - Это ваш **Chat ID**

3. **Добавьте в `.env.local`:**

```env
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
TELEGRAM_CHAT_ID=123456789
```

---

## Тестирование

### 1. Перезапустите dev сервер:

```bash
npm run dev
```

### 2. Откройте сайт и заполните форму:

```
http://localhost:3000
```

### 3. Проверьте логи в консоли:

Вы должны увидеть:
```
=== API /api/contact вызван ===
Получены данные: { name: 'Test', ... }
Переводы загружены для языка: ru
Проверка переменных окружения: { SMTP_HOST: true, ... }
1. Отправка email администратору...
✅ Email администратору отправлен
...
```

### 4. Проверьте браузерную консоль (F12):

```
Отправка формы... {name: 'Test', ...}
Статус ответа: 200
Ответ сервера: {success: true, ...}
```

---

## Распространенные ошибки

### ❌ "Email configuration missing"
**Решение:** Убедитесь, что файл `.env.local` существует и заполнен

### ❌ "Invalid login: 535-5.7.8 Username and Password not accepted"
**Решение:** 
- Gmail: используйте App Password, НЕ обычный пароль
- SendGrid: убедитесь, что EMAIL_USER="apikey" (буквально слово "apikey")

### ❌ "Connection timeout"
**Решение:** Проверьте firewall, попробуйте порт 587 вместо 465

### ❌ "ENOTFOUND" или "ECONNREFUSED"
**Решение:** Проверьте SMTP_HOST и интернет-соединение

---

## Развертывание на Vercel

1. **Зайдите в Vercel Dashboard**
2. **Выберите ваш проект**
3. **Settings → Environment Variables**
4. **Добавьте все переменные из `.env.local`:**
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `ADMIN_EMAIL`
   - (опционально) `TELEGRAM_BOT_TOKEN`
   - (опционально) `TELEGRAM_CHAT_ID`

5. **Redeploy проект**

---

## Безопасность

⚠️ **ВАЖНО:**

1. ❌ **НИКОГДА** не коммитьте `.env.local` в Git!
2. ✅ Убедитесь, что `.env.local` в `.gitignore`
3. ✅ Используйте разные пароли для dev и production
4. ✅ Храните API ключи в безопасности

---

## Поддержка

Если возникли проблемы:

1. Проверьте серверные логи в терминале
2. Проверьте браузерную консоль (F12)
3. Убедитесь, что все переменные окружения установлены
4. Попробуйте другого провайдера (SendGrid обычно работает надежнее Gmail)

---

**Готово!** 🎉 Теперь ваша форма отправляет красивые письма на нужном языке!

