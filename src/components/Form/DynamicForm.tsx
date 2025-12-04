"use client";

import React from "react";
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

interface Props {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
}

const DynamicForm: React.FC<Props> = ({ fields, onSubmit }) => {
  const validationSchema = formSchema(fields);

  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {},
  });

  const { register, handleSubmit, setValue, getValues, control, formState } =
    form;

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
      return Array.isArray(depValue) &&
        depValue.includes(field.showWhen.includes);
    }

    return true;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 bg-white p-8 rounded-xl shadow"
    >
      {fields.map((field) => {
        if (!shouldShow(field)) return null;

        const error = formState.errors[field.name]?.message as string | undefined;

        switch (field.type) {
          /* ---------------- TEXT / EMAIL / NUMBER / DATE ---------------- */
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

          /* ---------------- TEXTAREA ---------------- */
          case "textarea":
            return (
              <div key={field.name} className="space-y-2">
                <Label>{field.label}</Label>
                <Textarea placeholder={field.placeholder} {...register(field.name)} />
                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>
            );

          /* ---------------- SELECT / DROPDOWN ---------------- */
          case "dropdown":
            return (
              <div key={field.name} className="space-y-2">
                <Label>{field.label}</Label>

                {/* Hidden input so RHF controls the value */}
                <input type="hidden" {...register(field.name)} />

                <Select
                  onValueChange={(v) =>
                    setValue(field.name, v, { shouldValidate: true })
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

          /* ---------------- RADIO GROUP ---------------- */
          case "radio":
            return (
              <div key={field.name} className="space-y-2">
                <Label>{field.label}</Label>

                {/* Hidden input */}
                <input type="hidden" {...register(field.name)} />

                <RadioGroup
                  onValueChange={(v) =>
                    setValue(field.name, v, { shouldValidate: true })
                  }
                >
                  {field.options?.map((opt) => (
                    <div key={opt} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt} id={opt} />
                      <Label htmlFor={opt}>{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>

                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>
            );

          /* ---------------- CHECKBOX GROUP ---------------- */
          case "checkbox":
            return (
              <div key={field.name} className="space-y-2">
                <Label>{field.label}</Label>

                {/* Hidden input */}
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

          /* ---------------- FILE ---------------- */
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

      <Button type="submit" className="w-full">Submit Application</Button>
    </form>
  );
};

export default DynamicForm;
