import { API_BASE_URL } from "./api";

// Cookie configuration
const COOKIE_OPTIONS = {
  httpOnly: false, // Set to true for server-side only cookies
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: "/",
};

// Helper function to get common headers (including ngrok bypass)
export function getCommonHeaders(includeAuth = false, token = null) {
  const headers = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true", // This bypasses ngrok warning page
  };

  if (includeAuth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

// Helper functions for cookie management
export function setAuthCookies(authData) {
  if (typeof window !== "undefined") {
    // Client-side cookie setting
    document.cookie = `auth_token=${authData.access_token}; max-age=${
      COOKIE_OPTIONS.maxAge
    }; path=${COOKIE_OPTIONS.path}; ${
      COOKIE_OPTIONS.secure ? "secure;" : ""
    } samesite=${COOKIE_OPTIONS.sameSite}`;

    // Assuming user_id, username, email, tier might be part of authData for convenience
    if (authData.user_id) {
      document.cookie = `user_id=${authData.user_id}; max-age=${
        COOKIE_OPTIONS.maxAge
      }; path=${COOKIE_OPTIONS.path}; ${
        COOKIE_OPTIONS.secure ? "secure;" : ""
      } samesite=${COOKIE_OPTIONS.sameSite}`;
    }
    if (authData.username) {
      document.cookie = `username=${authData.username}; max-age=${
        COOKIE_OPTIONS.maxAge
      }; path=${COOKIE_OPTIONS.path}; ${
        COOKIE_OPTIONS.secure ? "secure;" : ""
      } samesite=${COOKIE_OPTIONS.sameSite}`;
    }
    if (authData.email) {
      document.cookie = `email=${authData.email}; max-age=${
        COOKIE_OPTIONS.maxAge
      }; path=${COOKIE_OPTIONS.path}; ${
        COOKIE_OPTIONS.secure ? "secure;" : ""
      } samesite=${COOKIE_OPTIONS.sameSite}`;
    }
  }
}

export function getAuthCookies() {
  if (typeof window !== "undefined") {
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {});
    return {
      token: cookies.auth_token || null,
      userId: cookies.user_id || null,
      username: cookies.username || null,
      email: cookies.email || null,
    };
  }
  return { token: null, userId: null, username: null, email: null };
}

export function clearAuthCookies() {
  if (typeof window !== "undefined") {
    document.cookie = `auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${COOKIE_OPTIONS.path};`;
    document.cookie = `user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${COOKIE_OPTIONS.path};`;
    document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${COOKIE_OPTIONS.path};`;
    document.cookie = `email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${COOKIE_OPTIONS.path};`;
  }
}

// Helper function to get redirect path based on role (if you add roles later)
export function getRedirectPath(role) {
  if (role === "admin") {
    return "/admin/dashboard";
  }
  return "/";
}

// Register a new user
export async function registerUser(userData) {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: getCommonHeaders(),
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.detail || "Registration failed";
    throw new Error(errorMessage);
  }
  const authData = await response.json();
  setAuthCookies(authData);
  return authData;
}

// Login user
export async function loginUser(username, password) {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: getCommonHeaders(),
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.detail || "Login failed";
    throw new Error(errorMessage);
  }
  const authData = await response.json();
  setAuthCookies(authData);
  return authData;
}

// Get current user
export async function getCurrentUser(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
      headers: getCommonHeaders(true, token),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response body:", errorText);
      throw new Error(
        `Failed to fetch user data: ${response.status} ${response.statusText}`
      );
    }

    // Check if response is actually JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const responseText = await response.text();
      console.error("Non-JSON response:", responseText);
      throw new Error(`Expected JSON response but got: ${contentType}`);
    }

    const userData = await response.json();
    console.log("Successfully fetched user data:", userData);
    return userData;
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    throw error;
  }
}

// Logout user
export async function logoutUser(token) {
  if (token) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
        method: "POST",
        headers: getCommonHeaders(true, token),
      });
      if (!response.ok) {
        console.error("Server-side logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during server-side logout:", error);
    }
  }
  clearAuthCookies();
}
