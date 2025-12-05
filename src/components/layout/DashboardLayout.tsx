import { Outlet } from "react-router-dom";



import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
  onLogout: () => void;
  isLogoutLoading: boolean;
}

export default function DashboardLayout({
  onLogout,
  isLogoutLoading,
}: Props) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      

      <div className="flex-1 flex flex-col">
        <Navbar onLogout={onLogout} isLoading={isLogoutLoading} />

       <main className="p-6">
  <Outlet />
</main>
      </div>
    </div>
  );
}
