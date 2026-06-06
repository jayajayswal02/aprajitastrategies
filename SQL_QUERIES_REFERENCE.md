# Supabase SQL Quick Reference

## CREATE TABLES (Run Once)

```sql
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
  email VARCHAR(255),
  phone VARCHAR(20),
  project_type VARCHAR(100),
  budget VARCHAR(50),
  timeline VARCHAR(100),
  message TEXT,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON enquiries(email);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow anonymous submissions to contacts" ON contacts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous submissions to enquiries" ON enquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow users to read contacts" ON contacts
  FOR SELECT USING (true);

CREATE POLICY "Allow users to read enquiries" ON enquiries
  FOR SELECT USING (true);
```

---

## SELECT QUERIES

### View Recent Contacts (Last 10)
```sql
SELECT * FROM contacts 
ORDER BY created_at DESC 
LIMIT 10;
```

### View Recent Enquiries (Last 10)
```sql
SELECT * FROM enquiries 
ORDER BY created_at DESC 
LIMIT 10;
```

### View By Status
```sql
-- Contacts by status
SELECT * FROM contacts 
WHERE status = 'new' 
ORDER BY created_at DESC;

-- Enquiries by status
SELECT * FROM enquiries 
WHERE status = 'pending' 
ORDER BY created_at DESC;
```

### Count Submissions
```sql
-- Total contacts
SELECT COUNT(*) FROM contacts;

-- Total enquiries
SELECT COUNT(*) FROM enquiries;

-- Count by status
SELECT status, COUNT(*) as count 
FROM contacts 
GROUP BY status;
```

### Find Specific Entry
```sql
-- Find contact by email
SELECT * FROM contacts 
WHERE email = 'john@example.com';

-- Find enquiry by phone
SELECT * FROM enquiries 
WHERE phone = '(123) 456-7890';
```

### Export Data (within date range)
```sql
-- Contacts from last 30 days
SELECT * FROM contacts 
WHERE created_at >= NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

-- All enquiries from a specific date
SELECT * FROM enquiries 
WHERE DATE(created_at) = '2026-06-06'
ORDER BY created_at DESC;
```

---

## UPDATE QUERIES

### Update Status
```sql
-- Update single contact status
UPDATE contacts 
SET status = 'contacted' 
WHERE id = 1;

-- Update multiple enquiries
UPDATE enquiries 
SET status = 'completed' 
WHERE created_at < NOW() - INTERVAL '7 days' 
AND status = 'new';
```

### Bulk Status Update
```sql
-- Mark all old submissions as archived
UPDATE contacts 
SET status = 'archived' 
WHERE created_at < NOW() - INTERVAL '90 days';
```

---

## DELETE QUERIES

### Delete Old Data (Archive First!)
```sql
-- Delete contacts older than 1 year
DELETE FROM contacts 
WHERE created_at < NOW() - INTERVAL '365 days';

-- Delete specific enquiry
DELETE FROM enquiries 
WHERE id = 5;
```

---

## STATISTICS & REPORTING

### Daily Submissions
```sql
SELECT DATE(created_at) as date, COUNT(*) as submissions
FROM contacts 
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### Most Common Project Types
```sql
SELECT project_type, COUNT(*) as count
FROM enquiries
WHERE project_type IS NOT NULL
GROUP BY project_type
ORDER BY count DESC;
```

### Response Time Analysis
```sql
-- Average days to contact
SELECT status, AVG(EXTRACT(DAY FROM (NOW() - created_at))) as avg_days
FROM contacts
GROUP BY status;
```

---

## USEFUL ADMIN QUERIES

### Get Contacts Need Follow-up
```sql
SELECT * FROM contacts 
WHERE status = 'new' 
AND created_at < NOW() - INTERVAL '2 days'
ORDER BY created_at ASC;
```

### Dashboard Summary
```sql
SELECT 
  'contacts' as type,
  COUNT(*) as total,
  SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_count,
  SUM(CASE WHEN status = 'contacted' THEN 1 ELSE 0 END) as contacted_count
FROM contacts

UNION ALL

SELECT 
  'enquiries' as type,
  COUNT(*) as total,
  SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_count,
  SUM(CASE WHEN status = 'contacted' THEN 1 ELSE 0 END) as contacted_count
FROM enquiries;
```

---

## KEY FIELDS EXPLANATION

### Status Field Values
- `'new'` - Just received (default)
- `'pending'` - Under review
- `'contacted'` - Customer has been contacted
- `'completed'` - Inquiry completed/resolved
- `'archived'` - Old/no longer relevant

### Timestamp Fields
- `created_at` - When the submission was received (UTC)
- `updated_at` - When the record was last modified (UTC)

---

## HOW TO RUN QUERIES

1. Go to Supabase Dashboard
2. Click **SQL Editor** in left sidebar
3. Click **New Query**
4. Paste your SQL
5. Click **Run** (or Ctrl+Enter)

---

## IMPORTANT NOTES

⚠️ **Always backup before running DELETE queries**
⚠️ **Test SELECT first before UPDATE/DELETE**
⚠️ **RLS policies control who can access data**
⚠️ **Timestamps are in UTC timezone**

---

## COMMON FILTERS

```sql
-- Last 7 days
WHERE created_at > NOW() - INTERVAL '7 days'

-- Specific date
WHERE DATE(created_at) = '2026-06-06'

-- Not null
WHERE message IS NOT NULL

-- Contains text
WHERE message ILIKE '%keyword%'

-- No email
WHERE email IS NULL OR email = ''
```
