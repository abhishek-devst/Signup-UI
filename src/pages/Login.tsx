import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import type { LoginForm } from "../types/auth";

export default function Login() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Sending:", form);

    try {
      const res = await API.post("/auth/login", {
        Email: form.email,
        Password: form.password,
      });

      auth?.login(res.data.token);
      navigate("/home");
    } catch (err: any) {
      console.log(err.response?.data);
      alert(err.response?.data || "Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        value={form.email} // ✅ controlled
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        value={form.password} // ✅ controlled
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button type="submit">Login</button>
    </form>
  );
}