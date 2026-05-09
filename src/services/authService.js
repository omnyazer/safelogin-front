const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';
const REGISTERED_USERS_KEY = 'safelogin_registered_users';

function parseUsers(rawValue) {
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getRegisteredUsers() {
  return parseUsers(localStorage.getItem(REGISTERED_USERS_KEY));
}

export function isUsernameTaken(username) {
  const normalizedUsername = username.trim().toLowerCase();
  if (!normalizedUsername) {
    return false;
  }

  return getRegisteredUsers().some(
    (existingUser) => existingUser.toLowerCase() === normalizedUsername,
  );
}

export function rememberRegisteredUser(username) {
  const normalizedUsername = username.trim();
  if (!normalizedUsername) {
    return;
  }

  const users = getRegisteredUsers();
  if (!users.some((existingUser) => existingUser.toLowerCase() === normalizedUsername.toLowerCase())) {
    users.push(normalizedUsername);
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
  }
}

async function postAuth(endpoint, payload) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const contentType = response.headers.get('content-type') || '';
  let parsedMessage;
  let success = response.ok;

  if (contentType.includes('application/json')) {
    const body = await response.json();
    parsedMessage = body?.message || '';
    success = typeof body?.success === 'boolean' ? body.success : response.ok;
  } else {
    parsedMessage = await response.text();
  }
  const message = parsedMessage || '';

  if (!response.ok) {
    throw new Error(message || 'Une erreur serveur est survenue.');
  }

  return { success, message };
}

export async function loginRequest(credentials) {
  return postAuth('/login', credentials);
}

export async function registerRequest(credentials) {
  return postAuth('/register', credentials);
}
