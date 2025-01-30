import { RegisterFormValues } from "../validations/register";
import { LoginFormValues } from "../validations/login";
import { apiClient } from "./apiClient";

export const tokenService = {
  getAccessToken(): string | null {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('accessToken='))
      ?.split('=')[1];
    return token || null;
  },

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  },

  clearTokens() {
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('refreshToken');
  }
};

export async function registerUser(data: RegisterFormValues) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error((await response.json()).message);
  }

  return response.json();
}

export async function loginUser(data: LoginFormValues) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error((await response.json()).message);
  }

  const res = await response.json();
  localStorage.setItem('refreshToken', res.refreshToken);
  return res;

}

export async function refreshTokens(): Promise<boolean> {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return false;

  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
      credentials: 'include'
    });
    return response.ok;
  } catch {
    return false;
  }
}

export const getUserInfo = async () => {
  const {data} = await apiClient.get('/auth/me');
  return data;
}
