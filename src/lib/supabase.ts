import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Contact submission function
export async function submitContact(data: {
  name: string;
  phone?: string;
  message: string;
}) {
  try {
    const { data: result, error } = await supabase
      .from('contacts')
      .insert([
        {
          name: data.name,
          phone: data.phone || null,
          message: data.message,
          status: 'new'
        }
      ])
      .select();

    if (error) {
      console.error('Error submitting contact:', error);
      throw new Error(error.message);
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Error in submitContact:', error);
    throw error;
  }
}

// Enquiry submission function
export async function submitEnquiry(data: {
  name: string;
  phone?: string;
  projectType?: string;
}) {
  try {
    const { data: result, error } = await supabase
      .from('enquiries')
      .insert([
        {
          name: data.name,
          phone: data.phone || null,
          project_type: data.projectType || null,
          status: 'new'
        }
      ])
      .select();

    if (error) {
      console.error('Error submitting enquiry:', error);
      throw new Error(error.message);
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Error in submitEnquiry:', error);
    throw error;
  }
}

// Get all contacts (admin only - requires proper auth)
export async function getContacts() {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}

// Get all enquiries (admin only - requires proper auth)
export async function getEnquiries() {
  try {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    throw error;
  }
}

// Admin authentication - login function
export async function loginAdmin(username: string, password: string) {
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('id, username, email, full_name, role, is_active')
      .eq('username', username)
      .eq('password', password)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      throw new Error('Invalid username or password');
    }

    // Store admin session in localStorage
    const sessionData = {
      id: data.id,
      username: data.username,
      email: data.email,
      full_name: data.full_name,
      role: data.role,
      loginTime: new Date().toISOString()
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_session', JSON.stringify(sessionData));
    }

    return { success: true, data: sessionData };
  } catch (error) {
    console.error('Error during admin login:', error);
    throw error;
  }
}

// Get admin session
export function getAdminSession() {
  if (typeof window === 'undefined') return null;
  const session = localStorage.getItem('admin_session');
  return session ? JSON.parse(session) : null;
}

// Logout admin
export function logoutAdmin() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_session');
  }
}

// Update contact status
export async function updateContactStatus(id: number, status: string) {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select();

    if (error) throw new Error(error.message);
    return { success: true, data };
  } catch (error) {
    console.error('Error updating contact status:', error);
    throw error;
  }
}

// Update enquiry status
export async function updateEnquiryStatus(id: number, status: string) {
  try {
    const { data, error } = await supabase
      .from('enquiries')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select();

    if (error) throw new Error(error.message);
    return { success: true, data };
  } catch (error) {
    console.error('Error updating enquiry status:', error);
    throw error;
  }
}

// Delete contact
export async function deleteContact(id: number) {
  try {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return { success: true };
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
}

// Delete enquiry
export async function deleteEnquiry(id: number) {
  try {
    const { error } = await supabase
      .from('enquiries')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return { success: true };
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    throw error;
  }
}
