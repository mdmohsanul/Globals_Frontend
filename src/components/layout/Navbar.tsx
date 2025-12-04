import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface NavbarProps {
  onLogout: () => void;
  isLoading: boolean;
}

export default function Navbar({ onLogout, isLoading }: NavbarProps) {
  return (
    <div className="w-full border-b bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="flex gap-4 items-center justify-center">
        <Link to={""}>Submissions</Link>
<Button variant="destructive" onClick={onLogout} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="animate-spin mr-2" size={18} /> Logging out...
          </>
        ) : (
          <>
            <LogOut className="mr-2" size={18} /> Logout
          </>
        )}
      </Button>
      </div>

      
    </div>
  );
}
