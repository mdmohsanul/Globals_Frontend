"use client";

import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FormField } from "@/utils/types/form";
import { formSchema } from "@/utils/schema/formSchema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react"; // for spinner icon

interface Props {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => Promise<any>;
}

const DynamicForm: React.FC<Props> = ({ fields, onSubmit }) => {
  const validationSchema = formSchema(fields);

  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {},
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState,
    reset,
  } = form;

  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  /* =========================================================
      CONDITIONAL FIELD WATCHING
  ========================================================== */
  const dependencyFields = fields
    .filter((f) => f.showWhen)
    .map((f) => f.showWhen!.field);

  const watchedValues = useWatch({
    control,
    name: dependencyFields,
  });

  const shouldShow = (field: FormField) => {
    if (!field.showWhen) return true;

    const depField = field.showWhen.field;
    const index = dependencyFields.indexOf(depField);
    const depValue = watchedValues[index];

    if (field.showWhen.equals !== undefined) {
      return depValue === field.showWhen.equals;
    }

    if (field.showWhen.includes !== undefined) {
      return (
        Array.isArray(depValue) && depValue.includes(field.showWhen.includes)
      );
    }

    return true;
  };

  /* =========================================================
      SUCCESSFUL SUBMISSION → CLEAR FORM
  ========================================================== */
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(); // clears all fields
    }
  }, [isSubmitSuccessful, reset]);

  /* =========================================================
      SUBMIT HANDLER WRAPPER → CATCH SERVER ERRORS
  ========================================================== */
  async function handleFormSubmit(data: any) {
    try {
      await onSubmit(data); // you already return promise from mutation
    } catch (err: any) {
      console.log("Server error:", err);
      form.setError("root.serverError", {
        message:
          err?.response?.data?.message || "Something went wrong. Try again.",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-8 bg-white p-8 rounded-xl shadow"
    >
      {/* ---- SERVER ERROR BANNER ---- */}
      {errors.root?.serverError?.message && (
        <p className="p-3 rounded bg-red-100 text-red-700 text-sm">
          {errors.root.serverError.message}
        </p>
      )}

      {/* ---------------------- FORM FIELDS ---------------------- */}
      {fields.map((field) => {
        if (!shouldShow(field)) return null;

        const error = errors[field.name]?.message as string | undefined;

        switch (field.type) {
          case "text":
          case "email":
          case "number":
          case "date":
            return (
              <div key={field.name} className="space-y-2">
                <Label>{field.label}</Label>
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  {...register(field.name)}
                />
                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>
            );

          case "textarea":
            return (
              <div key={field.name} className="space-y-2">
                <Label>{field.label}</Label>
                <Textarea
                  placeholder={field.placeholder}
                  {...register(field.name)}
                />
                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>
            );

          case "dropdown":
            return (
              <div key={field.name} className="space-y-2">
                <Label>{field.label}</Label>

                <input type="hidden" {...register(field.name)} />

                <Select
                  onValueChange={(value) =>
                    setValue(field.name, value, { shouldValidate: true })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>
            );

          case "radio":
            return (
              <div key={field.name} className="space-y-2">
                <Label>{field.label}</Label>

                <input type="hidden" {...register(field.name)} />

                <RadioGroup
                  onValueChange={(value) =>
                    setValue(field.name, value, { shouldValidate: true })
                  }
                >
                  {field.options?.map((opt) => (
                    <div key={opt} className="flex items-center space-x-2">
                      <RadioGroupItem id={opt} value={opt} />
                      <Label htmlFor={opt}>{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>

                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>
            );

          case "checkbox":
            return (
              <div key={field.name} className="space-y-2">
                <Label>{field.label}</Label>

                <input type="hidden" {...register(field.name)} />

                {field.options?.map((opt) => {
                  const current = (getValues(field.name) as string[]) || [];

                  return (
                    <div key={opt} className="flex items-center space-x-2">
                      <Checkbox
                        checked={current.includes(opt)}
                        onCheckedChange={(checked) => {
                          const updated = checked
                            ? [...current, opt]
                            : current.filter((x) => x !== opt);
                          setValue(field.name, updated, {
                            shouldValidate: true,
                          });
                        }}
                      />
                      <Label>{opt}</Label>
                    </div>
                  );
                })}

                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>
            );

          case "file":
            return (
              <div key={field.name} className="space-y-2">
                <Label>{field.label}</Label>

                <Input
                  type="file"
                  accept={field.accept?.join(",")}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    setValue(field.name, file, { shouldValidate: true });
                  }}
                />

                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>
            );

          default:
            return null;
        }
      })}

      {/* ---------------------- SUBMIT BUTTON ---------------------- */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2"
      >
        {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
};

export default DynamicForm;
