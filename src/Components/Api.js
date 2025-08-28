
import React from 'react';

const API_URL = "http://127.0.0.1:5000";

export async function registerUser(username, email, password) {
    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });
    return res.json();
}

export async function loginUser(username, password) {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    return res.json();
}
export const requestPasswordReset = async (email) => {
  const res = await fetch("http://localhost:5000/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return await res.json();
};
