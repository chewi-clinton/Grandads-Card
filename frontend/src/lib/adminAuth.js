const SESSION_KEY = "admin_session";

// Placeholder credentials until the real backend issues auth tokens.
export const DEMO_ADMIN_EMAIL = "admin@grandadscards.shop";
export const DEMO_ADMIN_PASSWORD = "admin123";

export function login(email, password) {
  if (email === DEMO_ADMIN_EMAIL && password === DEMO_ADMIN_PASSWORD) {
    localStorage.setItem(SESSION_KEY, "1");
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SESSION_KEY) === "1";
}
