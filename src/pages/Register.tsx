import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import type { AuthForm } from "../types/auth";
import AuthLayout from "../components/AuthLayout";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState<AuthForm>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<any>({});

  const validatePassword = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const newErrors: any = {};

    if (!form.fullName) newErrors.fullName = "Full name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (!form.confirmPassword)
      newErrors.confirmPassword = "Confirm your password";

    if (form.password && !validatePassword(form.password)) {
      newErrors.password =
        "Password must be 8+ chars with uppercase, lowercase, number & symbol";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      setLoading(true);

      await API.post("/auth/register", {
        FullName: form.fullName,
        Email: form.email,
        Password: form.password,
        ConfirmPassword: form.confirmPassword,
        PhoneNumber: form.phoneNumber,
      });

      navigate("/");
    } catch (err: any) {
      setError(err.response?.data || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card className="shadow-2xl rounded-2xl border-muted">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-semibold">
            Create your account 🚀
          </CardTitle>
          <CardDescription>
            Start your journey with us
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Global Error */}
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            {/* Full Name */}
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                className={errors.fullName ? "border-red-500" : ""}
                placeholder="Abhishek Kumar"
                value={form.fullName}
                onChange={(e) =>
                  setForm({ ...form, fullName: e.target.value })
                }
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                className={errors.email ? "border-red-500" : ""}
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                className={errors.password ? "border-red-500" : ""}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                className={errors.confirmPassword ? "border-red-500" : ""}
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label>Phone Number (optional)</Label>
              <Input
                placeholder="9876543210"
                value={form.phoneNumber}
                onChange={(e) =>
                  setForm({ ...form, phoneNumber: e.target.value })
                }
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </Button>

            {/* Login Redirect */}
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-primary font-medium hover:underline"
              >
                Login
              </Link>
            </div>

          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}