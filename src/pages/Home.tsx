import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";
import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function Home() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [time, setTime] = useState(new Date());
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});

  // ⏱️ Live time
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await API.get("/auth/me");
        setUser(userRes.data);
        setEditData(userRes.data);

        if (userRes.data.role === "Admin") {
          const statsRes = await API.get("/admin/stats");
          setStats(statsRes.data);
        }
      } catch (err: any) {
        if (err.response?.status === 401) {
          auth?.logout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔥 Update profile
  const updateProfile = async () => {
    try {
      await API.put(`/admin/users/${user.id}`, editData);
      setUser(editData);
      setEditing(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (loading) {
    return <p className="p-6 text-muted-foreground">Loading dashboard...</p>;
  }

  const chartData = [
    { value: 5 },
    { value: 10 },
    { value: 8 },
    { value: 15 },
    { value: stats?.totalUsers || 0 },
  ];

  return (
    <div className="min-h-screen bg-background px-6 py-8 space-y-6">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border rounded-2xl p-6 shadow-sm flex justify-between items-center flex-wrap gap-4"
      >
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome, {user?.fullName} 👋
          </h1>
          <p className="text-muted-foreground">{user?.email}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Role: {user?.role}
          </p>
        </div>

        <div className="flex gap-3">
          {user?.role === "Admin" && (
            <button
              onClick={() => navigate("/admin")}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground"
            >
              Admin Panel
            </button>
          )}

          {/* ✅ kept your red style */}
          <button
            onClick={auth?.logout}
            className="px-4 py-2 rounded-lg bg-destructive text-red-600"
          >
            Logout
          </button>
        </div>
      </motion.div>

      {/* ADMIN ONLY */}
      {user?.role === "Admin" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border rounded-xl p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-semibold mt-1">
                {stats?.totalUsers}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Admins</p>
              <p className="text-2xl font-semibold mt-1">
                {stats?.adminCount}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Current Time</p>
              <p className="text-xl font-mono mt-1">
                {time.toLocaleTimeString()}
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold mb-4">
              User Growth (Mock Trend)
            </h2>

            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <Line type="monotone" dataKey="value" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </>
      )}

      {/* PROFILE */}
      {user && (
        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Profile</h2>

            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="text-sm bg-primary text-yellow-500 px-3 py-1 rounded"
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={updateProfile}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {/* ✅ FIXED INPUT STYLE */}
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              {editing ? (
                <input
                  value={editData.fullName}
                  onChange={(e) =>
                    setEditData({ ...editData, fullName: e.target.value })
                  }
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              ) : (
                <p className="font-medium">{user.fullName}</p>
              )}
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              {editing ? (
                <input
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              ) : (
                <p className="font-medium">{user.email}</p>
              )}
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Last Login</p>
              <p className="font-medium">
                {user.lastLogin
                  ? new Date(user.lastLogin).toLocaleString()
                  : "First login"}
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}