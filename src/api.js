const API_URL = import.meta.env.VITE_API_URL || "";

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("ahg_token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",

      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),

      ...(options.headers || {}),
    },
  });

  const contentType = response.headers.get("content-type") || "";

  let data;

  if (contentType.includes("application/json")) {
    data = await response.json();
  } else {
    const text = await response.text();
    throw new Error(text || "Server returned an invalid response");
  }

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export async function loginUser(email, password) {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function registerUser(userData) {
  return apiRequest("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export function saveAuth(data) {
  if (data.token) {
    localStorage.setItem("ahg_token", data.token);
  }

  if (data.user) {
    localStorage.setItem("ahg_user", JSON.stringify(data.user));
  }
}

export function getCurrentUser() {
  try {
    const user = localStorage.getItem("ahg_user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem("ahg_token");
  localStorage.removeItem("ahg_user");
}
