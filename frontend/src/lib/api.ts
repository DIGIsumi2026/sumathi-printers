import type { FormStatus } from '../types/site';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function postForm(endpoint: string, payload: Record<string, FormDataEntryValue>) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.fromEntries(Object.entries(payload).map(([key, value]) => [key, String(value)])))
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export function formToPayload(form: HTMLFormElement) {
  return Object.fromEntries(new FormData(form).entries());
}

export type { FormStatus };
