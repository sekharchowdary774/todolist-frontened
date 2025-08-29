
import React from 'react';

const API_URL = "https://todolist-backened-1-f47f.onrender.com";

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
  const res = await fetch("https://todolist-backened-1-f47f.onrender.com/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return await res.json();
};
