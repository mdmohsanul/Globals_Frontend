// hooks/useSubmitApplication.ts
import api from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import { encryptHybrid } from "@/utils/encryptHybrid";

type SubmitPayload = {
  formDataValues: any;
  resumeFile?: File | null;
  photoFile?: File | null;
};

export function useSubmitApplication() {
  return useMutation({
    mutationFn: async ({ formDataValues, resumeFile, photoFile }: SubmitPayload) => {
      // 1️⃣ get public key
      const { data: keyRes } = await api.get("/encryption/public-key");
      const publicKey = keyRes?.data?.publicKey as string;

      if (!publicKey) {
        throw new Error("Public key missing");
      }

      // 2️⃣ remove files from payload before encryption
      const formDataWithoutFiles = { ...formDataValues };
      delete formDataWithoutFiles.resume;
      delete formDataWithoutFiles.photo;

      // 3️⃣ hybrid encrypt JSON
      const { encryptedKey, encryptedData, iv } = await encryptHybrid(
        publicKey,
        formDataWithoutFiles
      );

      // 4️⃣ build FormData
      const formData = new FormData();
      formData.append("encryptedKey", encryptedKey);
      formData.append("encryptedData", encryptedData);
      formData.append("iv", iv);
      formData.append("formSchemaId", formDataValues.formSchemaId);

      if (resumeFile) formData.append("resume", resumeFile);
      if (photoFile) formData.append("photo", photoFile);

      // 5️⃣ send
      const res = await api.post("/submission", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data;
    },
  });
}
