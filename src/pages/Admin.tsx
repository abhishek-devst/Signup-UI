import { useEffect, useState } from "react";
import API from "../api/api";
import { motion } from "framer-motion";

export default function Admin() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  const fetchData = async () => {
    try {
      const [usersRes, statsRes] = await Promise.all([
        API.get("/admin/users"),
        API.get("/admin/stats"),
      ]);

      setUsers(usersRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changeRole = async (id: number, newRole: string) => {
    await API.put(`/admin/users/${id}/role`, newRole);
    fetchData();
  };

  const updateUser = async () => {
    await API.put(`/admin/users/${editingUser.id}`, editingUser);
    setEditingUser(null);
    fetchData();
  };

  const filteredUsers = users.filter((u) =>
    u.fullName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background px-6 py-8 space-y-6">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-card border rounded-2xl p-6 shadow-sm"
      >
        <h1 className="text-2xl font-semibold">Admin Panel 👑</h1>
        <p className="text-muted-foreground text-sm">
          Manage users, roles and system data
        </p>
      </motion.div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-2xl font-semibold">{stats?.totalUsers}</p>
        </div>

        <div className="bg-card border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Admins</p>
          <p className="text-2xl font-semibold">{stats?.adminCount}</p>
        </div>

        <div className="bg-card border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Active</p>
          <p className="text-2xl font-semibold text-green-600">
            {stats?.activeUsers}
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="bg-card border rounded-xl p-4 shadow-sm">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-card border rounded-2xl shadow-sm overflow-hidden"
      >
        <table className="w-full text-left">
          <thead className="border-b bg-muted/40">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-muted/20">

                {/* NAME */}
                <td className="p-3">
                  {editingUser?.id === user.id ? (
                    <input
                      value={editingUser.fullName}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          fullName: e.target.value,
                        })
                      }
                      className="w-full rounded-md border bg-background px-2 py-1 text-sm"
                    />
                  ) : (
                    user.fullName
                  )}
                </td>

                {/* EMAIL */}
                <td>
                  {editingUser?.id === user.id ? (
                    <input
                      value={editingUser.email}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          email: e.target.value,
                        })
                      }
                      className="w-full rounded-md border bg-background px-2 py-1 text-sm"
                    />
                  ) : (
                    user.email
                  )}
                </td>

                {/* ROLE */}
                <td className="font-medium">{user.role}</td>

                {/* ACTIONS */}
                <td className="flex gap-2 p-2">

                  {editingUser?.id === user.id ? (
                    <>
                      <button
                        onClick={updateUser}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>

                      <button
                        onClick={() => setEditingUser(null)}
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {/* ✅ kept your yellow */}
                      <button
                        onClick={() => setEditingUser(user)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          changeRole(
                            user.id,
                            user.role === "User" ? "Admin" : "User"
                          )
                        }
                        className="bg-primary text-white px-2 py-1 rounded"
                      >
                        Toggle Role
                      </button>
                    </>
                  )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}