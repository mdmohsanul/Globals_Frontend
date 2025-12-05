// src/pages/Dashboard.jsx

import { useActiveForm } from "@/api/formApi";
import DynamicForm from "@/components/Form/DynamicForm";
import { useSubmitApplication } from "@/features/useSubmitApplication";

export default function Dashboard() {
  const submitMutation = useSubmitApplication();
  const { data: activeForm, isLoading, isError } = useActiveForm();

  // 🔥 Handle Submit
  async function handleSubmit(data: any) {
    if (!activeForm?._id) {
      console.error("No active form found!");
      return;
    }

    const formSchemaId = activeForm._id;

    const resumeFile = data.resume || null;
    const photoFile = data.photo || null;

    const formDataValues = { ...data, formSchemaId };

    delete formDataValues.resume;
    delete formDataValues.photo;

    // IMPORTANT: return the Promise
    return submitMutation.mutateAsync({
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
