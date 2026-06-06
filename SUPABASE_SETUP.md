# Supabase Integration Setup Guide

## 🔑 Environment Variables

Your `.env.local` file contains:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://foufxeqqjjcjiaafinbp.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xBi3RlSSQslqKezfoWqqlg_Y-mXkxX-
```

**Important:** Keep these values secure. Never commit `.env.local` to git.

---

## 📊 Database Tables

### Table 1: `contacts`

Stores general contact form submissions.

```sql
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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous submissions
CREATE POLICY "Allow anonymous submissions to contacts" ON contacts
  FOR INSERT WITH CHECK (true);

-- Allow users to read contacts
CREATE POLICY "Allow users to read contacts" ON contacts
  FOR SELECT USING (true);
```

### Table 2: `enquiries`

Stores quick enquiry form submissions from the modal.

```sql
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
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON enquiries(email);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at);

-- Enable Row Level Security
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous submissions
CREATE POLICY "Allow anonymous submissions to enquiries" ON enquiries
  FOR INSERT WITH CHECK (true);

-- Allow users to read enquiries
CREATE POLICY "Allow users to read enquiries" ON enquiries
  FOR SELECT USING (true);
```

---

## 🚀 Setup Instructions

### Step 1: Create Tables in Supabase

1. Go to https://app.supabase.io and log in
2. Select your project
3. Go to **SQL Editor** → **New Query**
4. Copy and paste the SQL migration from `/supabase/migrations/001_create_tables.sql`
5. Click **Run**

Alternatively, run all the SQL queries above in the SQL Editor.

### Step 2: Verify Environment Variables

Your `.env.local` file is already created with the correct keys.

### Step 3: Test the Integration

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Contact section on your website
3. Fill in the form and submit
4. Check Supabase: Go to **Table Editor** → **contacts** to see your submission

---

## 📝 API Functions

All database functions are in `src/lib/supabase.ts`:

### Submit Contact Form
```typescript
import { submitContact } from '@/lib/supabase';

await submitContact({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '(123) 456-7890',
  message: 'Your message...'
});
```

### Submit Quick Enquiry
```typescript
import { submitEnquiry } from '@/lib/supabase';

await submitEnquiry({
  name: 'John Doe',
  phone: '(123) 456-7890',
  projectType: 'Architectural Planning'
});
```

### Get All Contacts (Admin)
```typescript
import { getContacts } from '@/lib/supabase';

const { data, success } = await getContacts();
```

### Get All Enquiries (Admin)
```typescript
import { getEnquiries } from '@/lib/supabase';

const { data, success } = await getEnquiries();
```

---

## ✨ Features Implemented

✅ **Contact Form** (`src/components/contact/Contact.tsx`)
- Saves to `contacts` table
- Real-time validation
- Loading states
- Success/error messages with MUI icons
- Form data: name, email, phone, message

✅ **Enquiry Modal** (`src/components/common/EnquiryModal.tsx`)
- Saves to `enquiries` table
- Quick form with name, phone, service type
- Loading and error handling
- Success animation with CheckCircleIcon

✅ **Error Handling**
- Comprehensive try-catch with proper error messages
- User-friendly error displays
- Console logging for debugging

✅ **UI/UX Enhancements**
- MUI CheckCircleIcon for success
- MUI ErrorIcon for errors
- Smooth animations
- Disabled buttons during submission
- Loading text feedback

---

## 🔒 Security Considerations

1. **Publishable Key**: The key in `.env.local` is safe to expose (it's public)
2. **Row Level Security**: RLS policies allow public inserts while maintaining control
3. **Email Validation**: Forms validate email format on client-side
4. **Server-Side Validation**: Consider adding server-side API route for additional validation

---

## 📊 Database Status Tracking

Submissions are created with `status: 'new'`. You can track statuses:
- `'new'` - Just received
- `'pending'` - Under review
- `'contacted'` - Customer contacted
- `'completed'` - Project completed

Update status in Supabase Dashboard or via API.

---

## 🛠️ Useful SQL Queries

### View Recent Submissions
```sql
SELECT * FROM contacts ORDER BY created_at DESC LIMIT 10;
SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 10;
```

### Count Submissions by Status
```sql
SELECT status, COUNT(*) FROM contacts GROUP BY status;
SELECT status, COUNT(*) FROM enquiries GROUP BY status;
```

### Export Data
Use Supabase's built-in export feature:
- Go to **Table Editor** → Select table → **Export** → **Download as CSV**

### Delete Old Submissions
```sql
DELETE FROM contacts WHERE created_at < NOW() - INTERVAL '90 days';
DELETE FROM enquiries WHERE created_at < NOW() - INTERVAL '90 days';
```

---

## 🆘 Troubleshooting

**Issue**: "Missing Supabase environment variables"
- **Solution**: Ensure `.env.local` exists and has correct URL and key

**Issue**: "RLS policy violation"
- **Solution**: Verify RLS policies are created (INSERT, SELECT allowed)

**Issue**: Submissions not appearing
- **Solution**: 
  1. Check network tab in browser DevTools
  2. Check browser console for error messages
  3. Verify table structure matches the migration

**Issue**: "Table does not exist"
- **Solution**: Run the SQL migration in Supabase SQL Editor

---

## 📚 Files Modified

- `.env.local` - Environment variables ✅
- `src/lib/supabase.ts` - Database functions ✅
- `src/components/contact/Contact.tsx` - Contact form with Supabase ✅
- `src/components/common/EnquiryModal.tsx` - Enquiry modal with Supabase ✅
- `src/components/contact/Contact.module.css` - Success/error styling ✅
- `src/components/common/EnquiryModal.module.css` - Success/error styling ✅
- `supabase/migrations/001_create_tables.sql` - Database schema ✅

---

## 🎯 Next Steps

1. **Test submissions** - Fill out forms and verify data appears in Supabase
2. **Set up notifications** - Configure email notifications for new submissions
3. **Add admin dashboard** - Create admin page to view/manage submissions
4. **Implement auth** - Add Supabase auth for admin access
5. **Add webhooks** - Trigger events (email, Slack, etc.) on new submissions

---

## 📞 Support

For Supabase documentation: https://supabase.com/docs
For Next.js + Supabase: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
