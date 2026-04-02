import { useState } from "react";
import API from "../api/api";
import type { AuthForm } from "../types/auth";

export default function Register() {
  const [form, setForm] = useState<AuthForm>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const validatePassword = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Sending:", form);

    // ✅ Confirm password check
    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    // ✅ Strong password validation
    if (!validatePassword(form.password)) {
      return alert(
        "Password must be 8+ chars with uppercase, lowercase, number & symbol"
      );
    }

    try {
      await API.post("/auth/register", {
        FullName: form.fullName,
        Email: form.email,
        Password: form.password,
        ConfirmPassword: form.confirmPassword,
        PhoneNumber: form.phoneNumber,
      });

      alert("Registered successfully");
      window.location.href = "/";
    } catch (err: any) {
      console.log(err.response?.data);
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        placeholder="Full Name"
        value={form.fullName}
        onChange={(e) =>
          setForm({ ...form, fullName: e.target.value })
        }
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={(e) =>
          setForm({ ...form, confirmPassword: e.target.value })
        }
      />

      <input
        placeholder="Phone Number (optional)"
        value={form.phoneNumber}
        onChange={(e) =>
          setForm({ ...form, phoneNumber: e.target.value })
        }
      />

      <button type="submit">Register</button>
    </form>
  );
}