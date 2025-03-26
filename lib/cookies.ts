'use server';

import { cookies } from 'next/headers';
import type { CookieSerializeOptions } from 'cookie';

interface CookieOptions extends Omit<CookieSerializeOptions, 'sameSite'> {
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

const DEFAULT_OPTIONS: CookieOptions = {
  // 7 days by default
  maxAge: 7 * 24 * 60 * 60,
  path: '/',
  // Secure in production only
  secure: process.env.NODE_ENV === 'production',
  // HttpOnly for sensitive data
  httpOnly: true,
  // Strict SameSite by default
  sameSite: 'strict',
};

export async function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): Promise<void> {
  const cookieStore = await cookies();
  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
    // Convert maxAge to seconds if provided
    ...(options.maxAge && { maxAge: options.maxAge }),
  };

  cookieStore.set({
    name,
    value,
    ...mergedOptions,
  });
}

export async function getCookie(name: string): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}

export async function deleteCookie(name: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}

// Constants for cookie names
export const COOKIE_NAMES = {
  ACCESS_TOKEN: 'pathshala_access_token',
  REFRESH_TOKEN: 'pathshala_refresh_token',
  USER_DATA: 'pathshala_user_data',
} as const;

// Session management helpers
export async function setSessionCookies(
  accessToken: string,
  refreshToken: string,
  userData: any
): Promise<void> {
  // Access token - shorter lifetime, HttpOnly for security
  await setCookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
    maxAge: 1 * 60 * 60, // 1 hour
    httpOnly: true,
  });

  // Refresh token - longer lifetime, HttpOnly for security
  await setCookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  });

  // User data - accessible to client JS, non-sensitive info only
  await setCookie(COOKIE_NAMES.USER_DATA, JSON.stringify(userData), {
    httpOnly: false, // Allow JS access
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function clearSessionCookies(): Promise<void> {
  await deleteCookie(COOKIE_NAMES.ACCESS_TOKEN);
  await deleteCookie(COOKIE_NAMES.REFRESH_TOKEN);
  await deleteCookie(COOKIE_NAMES.USER_DATA);
} 