export interface SubmissionType {
  _id: string;
  userId: string;
  formSchemaId: string;
  encryptedData: string;
  pdfUrl: string | null;
  resumeUrl: string | null;
  photoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedSubmissionResponse {
  submissions: SubmissionType[];
  totalSubmissions: number;
  totalPages: number;
  currentPage: number;
}
