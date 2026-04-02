import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserRole } from "../utils/auth";

export default function Home() {
  const auth = useContext(AuthContext);
  const role = getUserRole();

  return (
    <div>
      <h1>Welcome</h1>

      <p>Your Role: {role}</p>

      {role === "Admin" && <button>Admin Panel</button>}

      <button onClick={auth?.logout}>Logout</button>
    </div>
  );
}