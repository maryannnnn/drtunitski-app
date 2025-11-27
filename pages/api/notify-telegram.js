// API для отправки уведомлений в Telegram при открытии WhatsApp/Telegram
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type, source, url, timestamp } = req.body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.warn('Telegram bot not configured');
      return res.status(200).json({ success: false, message: 'Telegram bot not configured' });
    }

    // Формируем сообщение
    let message = '';
    const emoji = type === 'whatsapp_opened' ? '💬' : '📱';
    
    if (type === 'whatsapp_opened') {
      message = `${emoji} <b>WhatsApp открыт!</b>\n\n`;
      message += `📍 Источник: <code>${source}</code>\n`;
      message += `🌐 Страница: <code>${url}</code>\n`;
      message += `⏰ Время: ${new Date(timestamp).toLocaleString('ru-RU', { timeZone: 'Asia/Jerusalem' })}`;
    } else if (type === 'telegram_opened') {
      message = `${emoji} <b>Telegram открыт!</b>\n\n`;
      message += `📍 Источник: <code>${source}</code>\n`;
      message += `🌐 Страница: <code>${url}</code>\n`;
      message += `⏰ Время: ${new Date(timestamp).toLocaleString('ru-RU', { timeZone: 'Asia/Jerusalem' })}`;
    } else if (type === 'modal_opened') {
      message = `📋 <b>Модальное окно открыто</b>\n\n`;
      message += `📍 Форма: <code>${source}</code>\n`;
      message += `🌐 Страница: <code>${url}</code>\n`;
      message += `⏰ Время: ${new Date(timestamp).toLocaleString('ru-RU', { timeZone: 'Asia/Jerusalem' })}`;
    }

    // Отправка в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      }
    );

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error('Telegram API error:', errorData);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to send Telegram notification',
        details: errorData
      });
    }

    return res.status(200).json({ success: true, message: 'Notification sent' });

  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}

