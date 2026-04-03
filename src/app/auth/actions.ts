'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function verifyPincode(formData: FormData) {
  const pincode = formData.get('pincode');
  const storedPincode = process.env.AUTH_PINCODE;

  if (pincode === storedPincode) {
    const cookieStore = await cookies();
    cookieStore.set('auth-token', 'true', {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    return { success: true };
  } else {
    return { success: false, message: 'Invalid Pincode' };
  }
}
