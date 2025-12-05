import { useState } from "react";
import { useMySubmissions } from "@/features/useMySubmissions";
import type { SubmissionType } from "@/utils/types/submission";

export default function SubmissionList() {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading } = useMySubmissions(page, limit);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No submissions found</p>;

  const { submissions, currentPage, totalPages } = data;

  return (
    <div className="space-y-4">
      {submissions.map((sub: SubmissionType) => (
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

      {/* Pagination */}
      <div className="flex gap-4 items-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
