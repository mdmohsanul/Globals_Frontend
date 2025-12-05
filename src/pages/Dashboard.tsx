// src/pages/Dashboard.jsx

import { useActiveForm } from "@/api/formApi";
import DynamicForm from "@/components/Form/DynamicForm";
import { useSubmitApplication } from "@/features/useSubmitApplication";

export default function Dashboard() {
  const submitMutation = useSubmitApplication();
  const { data: activeForm, isLoading, isError } = useActiveForm();

  // 🔥 Handle Submit
  function handleSubmit(data: any) {
    if (!activeForm?._id) {
      console.error("No active form found!");
      return;
    }

    const formSchemaId = activeForm._id;

    // Extract files
    const resumeFile = data.resume || null;
    const photoFile = data.photo || null;

    // Add schema ID for backend
    const formDataValues = { ...data, formSchemaId };

    // Remove files from encryption
    delete formDataValues.resume;
    delete formDataValues.photo;

    submitMutation.mutateAsync({
      formDataValues,
      resumeFile,
      photoFile,
    });
  }

  return (
    <div className="max-w-3xl mx-auto">
      {isLoading && <p>Loading form...</p>}
      {isError && <p>Failed to load form</p>}

      {activeForm && (
        <>
          <h2 className="text-2xl font-bold mb-6">{activeForm.schema.title}</h2>

          <DynamicForm
            fields={activeForm.schema.fields}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
}
