'use server';

import { cookies } from 'next/headers';

// Verify the admin password
export async function verifyAdminPassword(password: string) {
  try {
    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (password === expectedPassword) {
      // Set a session cookie
      const cookieStore = await cookies();
      cookieStore.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/'
      });
      return { success: true };
    }
    
    return { success: false, error: 'Incorrect administrator password.' };
  } catch (error) {
    console.error('Admin password verification failed:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

// Check if currently authenticated
export async function checkAdminSession() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    return session?.value === 'authenticated';
  } catch (error) {
    return false;
  }
}

// Log out admin
export async function logoutAdmin() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
