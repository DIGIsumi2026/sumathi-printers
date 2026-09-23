import type { FormStatus } from '../types/site';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT ||
  (import.meta.env.DEV ? `${API_URL}/contact` : '/contact.php');

function serializePayload(payload: Record<string, FormDataEntryValue>) {
  return JSON.stringify(
    Object.fromEntries(
      Object.entries(payload).map(([key, value]) => [key, String(value)])
    )
  );
}

async function postJson(url: string, payload: Record<string, FormDataEntryValue>) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: serializePayload(payload)
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function postForm(endpoint: string, payload: Record<string, FormDataEntryValue>) {
  return postJson(`${API_URL}${endpoint}`, payload);
}

export async function postContactForm(payload: Record<string, FormDataEntryValue>) {
  return postJson(CONTACT_ENDPOINT, payload);
}

export function formToPayload(form: HTMLFormElement) {
  return Object.fromEntries(new FormData(form).entries());
}

export type { FormStatus };
