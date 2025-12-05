import DashboardLayout from "@/components/layout/DashboardLayout";
import { Outlet, useNavigate } from "react-router-dom";
import { useLogout } from "@/features/auth/useLogout";

export default function DashboardWrapper() {
  const logoutMutation = useLogout();
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutMutation.mutateAsync();
    navigate("/login", { replace: true });
  }

  return (
    <DashboardLayout
      onLogout={handleLogout}
      isLogoutLoading={logoutMutation.isPending}
    >
      <Outlet />
    </DashboardLayout>
  );
}
