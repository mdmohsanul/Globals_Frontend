
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
  onLogout: () => void;
  isLogoutLoading: boolean;
}

export default function DashboardLayout({
  children,
  onLogout,
  isLogoutLoading,
}: Props) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      

      <div className="flex-1 flex flex-col">
        <Navbar onLogout={onLogout} isLoading={isLogoutLoading} />

        <main className="p-6 ">
          {children}
        </main>
      </div>
    </div>
  );
}
