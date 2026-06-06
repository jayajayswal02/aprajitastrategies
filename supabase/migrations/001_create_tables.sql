-- SQL Migrations for Aprajita Strategies Database

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  project_type VARCHAR(100),
  budget VARCHAR(50),
  timeline VARCHAR(100),
  message TEXT,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON enquiries(email);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all users to insert (if you want public submissions)
CREATE POLICY "Allow anonymous submissions to contacts" ON contacts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous submissions to enquiries" ON enquiries
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read their own submissions
CREATE POLICY "Allow users to read contacts" ON contacts
  FOR SELECT USING (true);

CREATE POLICY "Allow users to read enquiries" ON enquiries
  FOR SELECT USING (true);
