// src/pages/Dashboard.tsx
import { useLogout } from "@/features/auth/useLogout";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const logoutMutation = useLogout();
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutMutation.mutateAsync();
    navigate("/login", { replace: true });
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <button
        onClick={handleLogout}
        disabled={logoutMutation.isPending}
      >
        {logoutMutation.isPending ? <><Loader2 className="animate-spin" /> Logging out...</> : "Logout"}
      </button>
    </div>
  );
}
