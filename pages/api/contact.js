import fs from 'fs';
import path from 'path';

// Функция для загрузки переводов
function loadTranslations(locale) {
  try {
    const localesPath = path.join(process.cwd(), 'public', 'locales', locale, 'common.json');
    const translations = JSON.parse(fs.readFileSync(localesPath, 'utf8'));
    return translations.contact;
  } catch (error) {
    console.error(`Error loading translations for locale ${locale}:`, error);
    // Fallback to English
    const localesPath = path.join(process.cwd(), 'public', 'locales', 'en', 'common.json');
    const translations = JSON.parse(fs.readFileSync(localesPath, 'utf8'));
    return translations.contact;
  }
}

export default async function handler(req, res) {
  console.log('=== API /api/contact вызван ===');
  console.log('Method:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, phone, email, consultationType, message, locale = 'en' } = req.body;
  
  console.log('Получены данные:', { name, phone, email, consultationType, locale });

  // Загружаем переводы для выбранного языка
  let t;
  try {
    t = loadTranslations(locale);
    console.log('Переводы загружены для языка:', locale);
  } catch (error) {
    console.error('Ошибка загрузки переводов:', error);
    return res.status(500).json({ 
      error: 'Translation loading error',
      details: error.message
    });
  }

  // Валидация обязательных полей
  if (!name || !phone || !email || !consultationType) {
    console.log('Ошибка валидации: не все обязательные поля заполнены');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Проверяем переменные окружения
  const envCheck = {
    SMTP_HOST: !!process.env.SMTP_HOST,
    SMTP_PORT: !!process.env.SMTP_PORT,
    EMAIL_USER: !!process.env.EMAIL_USER,
    EMAIL_PASS: !!process.env.EMAIL_PASS,
    ADMIN_EMAIL: !!process.env.ADMIN_EMAIL
  };
  
  console.log('Проверка переменных окружения:', envCheck);

  // ВРЕМЕННО ОТКЛЮЧАЕМ EMAIL до решения проблемы с nodemailer
  const emailEnabled = false; // Принудительно отключено
  
  console.warn('⚠️ Email отправка ВРЕМЕННО ОТКЛЮЧЕНА (проблема с nodemailer в Next.js)');

  try {
    console.log('📝 Данные формы сохранены:');
    console.log({
      Имя: name,
      Телефон: phone,
      Email: email,
      'Тип консультации': consultationType,
      Сообщение: message || '(нет)',
      Язык: locale
    });
    
    // Здесь позже можно добавить сохранение в базу данных или файл
    
    console.log('✅ Форма успешно обработана (данные логированы)');
    res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully (email temporarily disabled)',
      emailSent: false,
      note: 'Data logged to server console'
    });

  } catch (error) {
    console.error('❌ ОШИБКА при обработке формы:', error);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ 
      error: 'Error submitting form',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

// Создание транспорта для отправки email
function createTransporter() {
  // Используем require для надежного импорта в Next.js API routes
  const nodemailer = require('nodemailer');
  
  console.log('nodemailer объект:', Object.keys(nodemailer));
  console.log('nodemailer.default?', typeof nodemailer.default);
  console.log('nodemailer.createTransporter?', typeof nodemailer.createTransporter);
  
  // Пробуем разные варианты доступа
  const mailer = nodemailer.default || nodemailer;
  
  if (typeof mailer.createTransporter !== 'function') {
    throw new Error(`createTransporter не найден! Доступные методы: ${Object.keys(mailer).join(', ')}`);
  }
  
  return mailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

// 1. Отправка email администратору
async function sendEmailToAdmin(data) {
  const transporter = createTransporter();
  const { t } = data;

  const consultationTypeLabels = {
    'in-person': t.inPersonConsultation,
    'online': t.onlineConsultation,
    'second-opinion': t.secondOpinion
  };

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    replyTo: data.email,
    subject: `🏥 ${t.email.adminSubject} ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1d1d6d; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
          .field { margin-bottom: 15px; padding: 12px; background: white; border-left: 4px solid #1d1d6d; }
          .label { font-weight: bold; color: #1d1d6d; margin-bottom: 5px; }
          .value { color: #333; font-size: 16px; }
          .footer { background: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
          .urgent { background: #fff3cd; border-left-color: #E57900; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">📩 ${t.email.adminTitle}</h1>
            <p style="margin: 10px 0 0 0;">${t.email.clinicName}</p>
          </div>
          
          <div class="content">
            <div class="field urgent">
              <div class="label">🔔 ${t.email.consultationType}:</div>
              <div class="value">${consultationTypeLabels[data.consultationType] || data.consultationType}</div>
            </div>

            <div class="field">
              <div class="label">👤 ${t.email.patientName}:</div>
              <div class="value">${data.name}</div>
            </div>

            <div class="field">
              <div class="label">📱 ${t.phone}:</div>
              <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
            </div>

            <div class="field">
              <div class="label">📧 ${t.email}:</div>
              <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>

            ${data.message ? `
            <div class="field">
              <div class="label">💬 ${t.message}:</div>
              <div class="value">${data.message}</div>
            </div>
            ` : ''}
          </div>

          <div class="footer">
            <p>${t.email.sentTime}: ${new Date().toLocaleString(data.locale, { timeZone: 'Asia/Jerusalem' })}</p>
            <p>${t.email.addressValue} | <a href="https://www.drtunitski.com">www.drtunitski.com</a></p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  await transporter.sendMail(mailOptions);
}

// 2. Отправка автоответа пациенту
async function sendConfirmationToPatient(data) {
  const transporter = createTransporter();
  const { t } = data;

  const consultationTypeLabels = {
    'in-person': t.inPersonConsultation,
    'online': t.onlineConsultation,
    'second-opinion': t.secondOpinion
  };

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: `✅ ${t.email.patientSubject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1d1d6d 0%, #4a4a9f 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .content { background: white; padding: 30px; border: 1px solid #ddd; }
          .success-icon { font-size: 48px; text-align: center; margin: 20px 0; }
          .message { background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1d1d6d; }
          .info-box { background: #fff9f0; padding: 15px; border-radius: 8px; margin: 15px 0; }
          .contact-info { background: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px; }
          .contact-item { margin: 10px 0; }
          .footer { background: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
          .btn { display: inline-block; padding: 12px 30px; background: #E57900; color: white; text-decoration: none; border-radius: 5px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🏥 Dr. Serge Tunitski</div>
            <p style="margin: 0; font-size: 16px;">${t.email.tagline}</p>
          </div>
          
          <div class="content">
            <div class="success-icon">✅</div>
            
            <h2 style="color: #1d1d6d; text-align: center;">${t.email.thankYou}</h2>
            
            <p>${t.email.dear} <strong>${data.name}</strong>,</p>
            
            <div class="message">
              <p style="margin: 0;"><strong>${t.email.requestReceived}</strong></p>
              <p style="margin: 10px 0 0 0;">${t.email.contactSoon}</p>
            </div>

            <div class="info-box">
              <p style="margin: 0 0 10px 0;"><strong>${t.email.requestDetails}</strong></p>
              <p style="margin: 5px 0;">📋 <strong>${t.email.consultationType}:</strong> ${consultationTypeLabels[data.consultationType] || data.consultationType}</p>
              <p style="margin: 5px 0;">📧 <strong>${t.email} ${t.email.forContact}:</strong> ${data.email}</p>
            </div>

            <p><strong>${t.email.whatNext}</strong></p>
            <ol style="padding-left: 20px;">
              <li>${t.email.step1}</li>
              <li>${t.email.step2}</li>
              <li>${t.email.step3}</li>
            </ol>

            <div class="contact-info">
              <p style="margin: 0 0 15px 0; font-weight: bold; color: #1d1d6d;">📞 ${t.email.clinicContacts}</p>
              <div class="contact-item">
                <strong>${t.email.address}:</strong> ${t.email.addressValue}
              </div>
              <div class="contact-item">
                <strong>${t.phone}:</strong> <a href="tel:+972507377870">+972 50-737-7870</a>
              </div>
              <div class="contact-item">
                <strong>${t.email}:</strong> <a href="mailto:${process.env.ADMIN_EMAIL}">${process.env.ADMIN_EMAIL}</a>
              </div>
              <div class="contact-item">
                <strong>Website:</strong> <a href="https://www.drtunitski.com">www.drtunitski.com</a>
              </div>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="https://www.drtunitski.com" class="btn">${t.email.returnToSite || 'Back to site'}</a>
            </div>

            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              <em>${t.email.urgentQuestions}</em>
            </p>
          </div>

          <div class="footer">
            <p style="margin: 5px 0;"><strong>${t.email.clinicName}</strong></p>
            <p style="margin: 5px 0;">${t.email.tagline}</p>
            <p style="margin: 5px 0;">${t.email.addressValue}</p>
            <p style="margin: 15px 0 5px 0; font-size: 10px;">
              ${t.email.autoMessage}<br>
              ${process.env.ADMIN_EMAIL}
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  await transporter.sendMail(mailOptions);
}

// 3. Отправка уведомления в Telegram (опционально)
async function sendToTelegram(data) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log('Telegram not configured, skipping...');
    return;
  }

  const { t } = data;

  const consultationTypeLabels = {
    'in-person': t.inPersonConsultation,
    'online': t.onlineConsultation,
    'second-opinion': t.secondOpinion
  };

  const message = `
🏥 <b>${t.email.adminTitle}</b>

👤 <b>${t.email.patientName}:</b> ${data.name}
📱 <b>${t.phone}:</b> ${data.phone}
📧 <b>${t.email}:</b> ${data.email}
🔔 <b>${t.email.consultationType}:</b> ${consultationTypeLabels[data.consultationType] || data.consultationType}
${data.message ? `💬 <b>${t.message}:</b> ${data.message}` : ''}

🕐 <b>${t.email.sentTime}:</b> ${new Date().toLocaleString(data.locale, { timeZone: 'Asia/Jerusalem' })}
🌐 <b>Language:</b> ${data.locale.toUpperCase()}

<i>${t.email.clinicName}</i>
  `.trim();

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    });

    if (!response.ok) {
      throw new Error('Telegram API error');
    }
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    // Не прерываем выполнение, если Telegram недоступен
  }
}

