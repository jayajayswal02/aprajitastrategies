# Admin Panel Setup - SQL Queries & Instructions

## 🔐 Admin Table Setup

### Create Admin Users Table

Run this SQL query in your Supabase SQL Editor:

```sql
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

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Allow anyone to select (login check)
CREATE POLICY "Allow public to check credentials" ON admin_users
  FOR SELECT USING (true);
```

---

## 👤 Insert Admin Credentials

### Default Admin (Username: admin, Password: admin123)

```sql
INSERT INTO admin_users (username, password, email, full_name, role, is_active)
VALUES ('admin', 'admin123', 'admin@aprajita.com', 'Admin User', 'admin', true)
ON CONFLICT (username) DO NOTHING;
```

### Add Multiple Admins

```sql
INSERT INTO admin_users (username, password, email, full_name, role, is_active)
VALUES 
  ('manager', 'manager@123', 'manager@aprajita.com', 'Manager User', 'manager', true),
  ('supervisor', 'supervisor@456', 'supervisor@aprajita.com', 'Supervisor', 'admin', true),
  ('user2', 'user2password', 'user2@aprajita.com', 'User Two', 'admin', true)
ON CONFLICT (username) DO NOTHING;
```

---

## 🔑 Login Credentials (Demo)

| Username | Password | Role | Email |
|----------|----------|------|-------|
| admin | admin123 | admin | admin@aprajita.com |

**⚠️ IMPORTANT:** Change the default password immediately after first login!

---

## 📊 Admin Management Queries

### View All Admin Users

```sql
SELECT id, username, email, full_name, role, is_active, created_at 
FROM admin_users 
ORDER BY created_at DESC;
```

### Update Admin Password

```sql
UPDATE admin_users 
SET password = 'new_password_here', updated_at = NOW() 
WHERE username = 'admin';
```

### Deactivate Admin User

```sql
UPDATE admin_users 
SET is_active = false, updated_at = NOW() 
WHERE username = 'manager';
```

### Reactivate Admin User

```sql
UPDATE admin_users 
SET is_active = true, updated_at = NOW() 
WHERE username = 'manager';
```

### Delete Admin User

```sql
DELETE FROM admin_users 
WHERE username = 'old_admin';
```

### Update Admin Email & Full Name

```sql
UPDATE admin_users 
SET email = 'newemail@example.com', 
    full_name = 'Updated Name',
    updated_at = NOW() 
WHERE username = 'admin';
```

---

## 🚀 Access Admin Panel

### Login URL
```
/admin/login
```

### Dashboard URL
```
/admin/dashboard
```

### Demo Credentials
```
Username: admin
Password: admin123
```

---

## 🛠️ Admin Panel Features

### Contacts Management
- ✅ View all contact form submissions
- ✅ Change submission status (new → contacted → completed)
- ✅ Delete submissions
- ✅ View submission date, name, phone, message
- ✅ Filter by status

### Enquiries Management
- ✅ View all quick enquiry submissions
- ✅ Change submission status
- ✅ Delete submissions
- ✅ View project type and service requested
- ✅ Filter by status

### Dashboard Features
- ✅ View statistics (total contacts, enquiries, new submissions)
- ✅ Switch between Contacts and Enquiries tabs
- ✅ Inline status editing
- ✅ Refresh data button
- ✅ Logout functionality
- ✅ Authentication check (redirects if not logged in)

---

## 💾 Session Storage

Admin login is stored in browser's localStorage:

```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@aprajita.com",
  "full_name": "Admin User",
  "role": "admin",
  "loginTime": "2026-06-06T10:30:00.000Z"
}
```

Session is checked on page load. If not found, user is redirected to login page.

---

## 🔒 Security Recommendations

⚠️ **IMPORTANT SECURITY NOTES:**

1. **Change Default Password**: Update the password immediately after setup
   ```sql
   UPDATE admin_users 
   SET password = 'strong_password_here' 
   WHERE username = 'admin';
   ```

2. **Use Strong Passwords**: Use combination of uppercase, lowercase, numbers, and special characters
   
3. **HTTPS Only**: Always access admin panel over HTTPS in production
   
4. **Logout**: Always logout when done. Clearing cookies also helps
   
5. **Multiple Admins**: Create separate accounts for each admin instead of sharing

6. **Disable Inactive Admins**: Deactivate users who no longer need access
   ```sql
   UPDATE admin_users SET is_active = false WHERE username = 'old_admin';
   ```

7. **Monitor Submissions**: Regularly review contact submissions for suspicious activity

8. **Server-Side Auth (Optional)**: For enhanced security, implement server-side validation using middleware

---

## 📝 Useful Admin Queries

### Count Submissions by Status

```sql
SELECT 
  'contacts' as type,
  status,
  COUNT(*) as count
FROM contacts
GROUP BY status

UNION ALL

SELECT 
  'enquiries' as type,
  status,
  COUNT(*) as count
FROM enquiries
GROUP BY status
ORDER BY type, status;
```

### View Recent Submissions

```sql
-- Last 5 contacts
SELECT * FROM contacts 
ORDER BY created_at DESC 
LIMIT 5;

-- Last 5 enquiries
SELECT * FROM enquiries 
ORDER BY created_at DESC 
LIMIT 5;
```

### Get Unresponded Submissions

```sql
SELECT 'contact' as type, id, name, phone, created_at 
FROM contacts 
WHERE status = 'new' 
ORDER BY created_at ASC

UNION ALL

SELECT 'enquiry' as type, id, name, phone, created_at 
FROM enquiries 
WHERE status = 'new' 
ORDER BY created_at ASC;
```

---

## 🔄 Data Export

### Export Contacts to CSV (Supabase Dashboard)
1. Go to Supabase Dashboard
2. Select **Table Editor** → **contacts**
3. Click **Export** → **Download as CSV**

### Export Enquiries to CSV
1. Go to Supabase Dashboard
2. Select **Table Editor** → **enquiries**
3. Click **Export** → **Download as CSV**

---

## 📚 Files Created

### Admin Components
- `src/app/admin/layout.tsx` - Admin layout wrapper
- `src/app/admin/login/page.tsx` - Login page component
- `src/app/admin/login/login.module.css` - Login styling
- `src/app/admin/dashboard/page.tsx` - Dashboard component
- `src/app/admin/dashboard/dashboard.module.css` - Dashboard styling

### Database Migration
- `supabase/migrations/002_create_admin_users.sql` - Admin table creation

### Utility Functions (in `src/lib/supabase.ts`)
- `loginAdmin(username, password)` - Authenticate admin
- `getAdminSession()` - Get current session
- `logoutAdmin()` - Logout current admin
- `updateContactStatus(id, status)` - Update contact status
- `updateEnquiryStatus(id, status)` - Update enquiry status
- `deleteContact(id)` - Delete contact
- `deleteEnquiry(id)` - Delete enquiry

---

## ✅ Setup Checklist

- [ ] Run CREATE TABLE query in Supabase SQL Editor
- [ ] Insert default admin credentials
- [ ] Verify table created in Table Editor
- [ ] Test login at `/admin/login`
- [ ] Test dashboard at `/admin/dashboard`
- [ ] Change default admin password
- [ ] Create additional admin users if needed
- [ ] Test logout functionality
- [ ] Verify contacts appear in dashboard
- [ ] Verify enquiries appear in dashboard

---

## 🆘 Troubleshooting

**Issue**: Login fails with "Invalid username or password"
- **Solution**: Verify credentials exist in admin_users table using query above

**Issue**: Can't see submissions in dashboard
- **Solution**: Make sure contacts and enquiries tables exist (run migration 001)

**Issue**: Logout doesn't work
- **Solution**: Clear browser cookies and localStorage manually

**Issue**: Can't access /admin/login
- **Solution**: Verify routes are properly configured in Next.js

**Issue**: RLS policy error when logging in
- **Solution**: Verify RLS policy is created: `CREATE POLICY "Allow public to check credentials"...`

---

## 📞 Support

For Supabase issues: https://supabase.com/docs
For Next.js admin patterns: https://nextjs.org/docs
