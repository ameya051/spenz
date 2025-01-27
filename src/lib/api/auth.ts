import { RegisterFormValues } from "../validations/register";
import { LoginFormValues } from "../validations/login";

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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error((await response.json()).message);
  }
  
  return response.json();
}
