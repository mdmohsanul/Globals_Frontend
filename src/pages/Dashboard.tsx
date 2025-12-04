import DashboardLayout from "@/components/layout/DashboardLayout";
import { useLogout } from "@/features/auth/useLogout";
import { useNavigate } from "react-router-dom";
import { useActiveForm } from "@/api/formApi";
import DynamicForm from "@/components/Form/DynamicForm";
import { useSubmitApplication } from "@/features/auth/useSubmitApplication";

export default function Dashboard() {
  const logoutMutation = useLogout();
  const navigate = useNavigate();
  const submitMutation = useSubmitApplication();

  function handleSubmit(data: any) {
    console.log(data);
    submitMutation.mutate(data);
  }

  const { data: form, isLoading, isError } = useActiveForm();

  async function handleLogout() {
    await logoutMutation.mutateAsync();
    navigate("/login", { replace: true });
  }

  return (
    <DashboardLayout
      onLogout={handleLogout}
      isLogoutLoading={logoutMutation.isPending}
    >
      {isLoading && <p>Loading form...</p>}
      {isError && <p>Failed to load form</p>}

      {form && (
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">{form.schema.title}</h2>

          {/* ⭐ Dynamic Form */}
          <DynamicForm fields={form.schema.fields} onSubmit={handleSubmit} />
        </div>
      )}
    </DashboardLayout>
  );
}
