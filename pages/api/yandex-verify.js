// pages/api/yandex-verify.js
export default function handler(req, res) {
    // ✅ Замените на ВАШ код из Яндекс.Вебмастер
    const yandexCode = '2fb6a14af61a8c12';

    res.setHeader('Content-Type', 'text/html');
    res.send(`yandex_verification_${yandexCode}`);
}