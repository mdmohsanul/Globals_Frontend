export interface FormField {
  type: 
    | "text"
    | "number"
    | "email"
    | "textarea"
    | "dropdown"
    | "checkbox"
    | "radio"
    | "date"
    | "file";

  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;

  options?: string[]; // dropdown, checkbox, radio

  accept?: string[]; // file types
  maxSizeMB?: number;

  showWhen?: {
    field: string;
    equals?: string;
    includes?: string;
  };
}

export interface FormSchemaType {
  _id: string;
  name: string;
  description: string;
  schema: {
    title: string;
    fields: FormField[];
  };
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}
