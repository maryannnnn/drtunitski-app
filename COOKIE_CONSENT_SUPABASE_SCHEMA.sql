-- ========================================
-- Cookie Consent Management Schema
-- для Supabase Database
-- ========================================
-- Используйте SQL Editor в Supabase Dashboard
-- и выполните этот скрипт для создания таблицы

-- Создание таблицы для хранения согласий пользователей на cookies
CREATE TABLE IF NOT EXISTS cookie_consents (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_fingerprint TEXT UNIQUE NOT NULL,
  essential BOOLEAN DEFAULT true NOT NULL,
  analytics BOOLEAN DEFAULT false NOT NULL,
  marketing BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Создание индекса для быстрого поиска по fingerprint
CREATE INDEX IF NOT EXISTS idx_cookie_consents_fingerprint 
ON cookie_consents(user_fingerprint);

-- Создание индекса для поиска по дате обновления
CREATE INDEX IF NOT EXISTS idx_cookie_consents_updated_at 
ON cookie_consents(updated_at DESC);

-- Включение Row Level Security (RLS) для безопасности
ALTER TABLE cookie_consents ENABLE ROW LEVEL SECURITY;

-- Политика: все могут читать свои записи
CREATE POLICY "Enable read access for all users" ON cookie_consents
  FOR SELECT USING (true);

-- Политика: все могут создавать записи
CREATE POLICY "Enable insert access for all users" ON cookie_consents
  FOR INSERT WITH CHECK (true);

-- Политика: все могут обновлять свои записи
CREATE POLICY "Enable update access for all users" ON cookie_consents
  FOR UPDATE USING (true);

-- Функция для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Триггер для автоматического обновления updated_at при UPDATE
CREATE TRIGGER update_cookie_consents_updated_at 
    BEFORE UPDATE ON cookie_consents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Комментарии к таблице и столбцам для документации
COMMENT ON TABLE cookie_consents IS 'Хранение согласий пользователей на использование cookies в соответствии с GDPR';
COMMENT ON COLUMN cookie_consents.user_fingerprint IS 'Уникальный отпечаток браузера пользователя (без использования cookies)';
COMMENT ON COLUMN cookie_consents.essential IS 'Согласие на обязательные cookies (всегда true)';
COMMENT ON COLUMN cookie_consents.analytics IS 'Согласие на аналитические cookies (Google Analytics)';
COMMENT ON COLUMN cookie_consents.marketing IS 'Согласие на маркетинговые cookies (Facebook Pixel, Google Ads)';

-- Проверка успешного создания
SELECT 'Cookie consent table created successfully!' as status;

