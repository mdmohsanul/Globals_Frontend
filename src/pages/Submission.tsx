import { useMySubmissions } from "@/features/useMySubmissions";
import type { SubmissionType } from "@/utils/types/submission";

export default function SubmissionList() {
  const { data: submissions, isLoading } = useMySubmissions();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      {submissions?.map((sub: SubmissionType) => (
        <div key={sub._id} className="p-4 border rounded-lg shadow">
          <p>
            <strong>Submitted on:</strong>{" "}
            {new Date(sub.createdAt).toLocaleString()}
          </p>

          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => window.open(sub.pdfUrl ?? "", "_blank")}
          >
            Download PDF
          </button>
        </div>
      ))}
    </div>
  );
}
