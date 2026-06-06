-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);

-- Insert default admin user
-- Username: admin
-- Password: admin123 (CHANGE THIS IN PRODUCTION!)
INSERT INTO admin_users (username, password, email, full_name, role)
VALUES ('admin', 'admin123', 'admin@aprajita.com', 'Admin User', 'admin')
ON CONFLICT (username) DO NOTHING;

-- You can also insert additional admins:
-- INSERT INTO admin_users (username, password, email, full_name, role)
-- VALUES ('manager', 'manager@123', 'manager@aprajita.com', 'Manager', 'manager')
-- ON CONFLICT (username) DO NOTHING;

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Allow anyone to select (login check)
CREATE POLICY "Allow public to check credentials" ON admin_users
  FOR SELECT USING (true);
