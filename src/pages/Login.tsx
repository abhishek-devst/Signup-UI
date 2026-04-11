import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import type { LoginForm } from "../types/auth";
import AuthLayout from "../components/AuthLayout";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Login() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        Email: form.email,
        Password: form.password,
      });

      auth?.login(res.data.token);
      navigate("/home");
    } catch (err: any) {
      alert(err.response?.data || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card className="shadow-2xl rounded-2xl border-muted">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-semibold">
            Welcome back 👋
          </CardTitle>
          <CardDescription>
            Login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            {/* Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            {/* New Feature 👇 */}
            <div className="text-center text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-primary font-medium hover:underline"
              >
                Create account
              </Link>
            </div>

          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}