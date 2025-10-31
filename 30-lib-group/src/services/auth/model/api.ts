import { NotAuthorizedError } from "@/shared/errors";
import { LoginPayload, RegisterPayload, User } from "./types";

const API_URL = "http://localhost:3001";
export const authApi = {
  fetchUser: async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      throw new NotAuthorizedError("User not logged in");
    }
    try {
      const response = await fetch(`${API_URL}/users/${userId}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();

      return data as User;
    } catch {
      localStorage.removeItem("userId");
      throw new NotAuthorizedError("User not logged in");
    }
  },
  login: async (formData: LoginPayload) => {
    const usersResponse = await fetch(
      `${API_URL}/users?email=${formData.email}`
    );
    const users = await usersResponse.json();

    if (users.length === 0 || users[0].password !== formData.password) {
      throw new Error("Invalid credentials");
    }

    const user = users[0];
    localStorage.setItem("userId", user.id.toString());
    return user;
  },
  register: async (formData: RegisterPayload) => {
    const checkResponse = await fetch(
      `${API_URL}/users?email=${formData.email}`
    );
    const existingUsers = await checkResponse.json();

    if (existingUsers.length > 0) {
      throw new Error("User already exists");
    }

    // Create new user
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const newUser = await response.json();
    localStorage.setItem("userId", newUser.id.toString());
    return newUser;
  },

  logout: () => {
    localStorage.removeItem("userId");
    window.location.reload();
  },
};
