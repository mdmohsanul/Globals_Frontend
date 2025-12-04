import { z } from "zod";
import type { FormField } from "@/utils/types/form";

export function formSchema(fields: FormField[]) {
  const shape: Record<string, any> = {};

  fields.forEach((field) => {
    let rule: z.ZodTypeAny;
    const isConditional = !!field.showWhen;

    // 1️⃣ Base rule by type
    switch (field.type) {
      case "text":
      case "email":
      case "number":
      case "date":
      case "textarea":
      case "dropdown":
      case "radio":
        rule = z.string();
        break;

      case "checkbox":
        rule = z.array(z.string());
        break;

      case "file":
        // keep flexible; validate presence later
        rule = z.any();
        break;

      default:
        rule = z.any();
    }

    // 2️⃣ Conditional fields → always optional
    if (isConditional) {
      rule = rule.optional();
    } else {
      // 3️⃣ Required / optional handling
      if (field.required) {
        switch (field.type) {
          case "checkbox":
            rule = (rule as z.ZodArray<z.ZodString>).min(
              1,
              `Select at least one ${field.label}`
            );
            break;

          case "file":
            rule = rule.refine((v) => !!v, {
              message: `${field.label} is required`,
            });
            break;

          // string-like fields (text, email, date, dropdown, radio, etc.)
          case "text":
          case "email":
          case "number":
          case "date":
          case "textarea":
          case "dropdown":
          case "radio":
            rule = (rule as z.ZodString).min(
              1,
              `${field.label} is required`
            );
            break;

          default:
            // leave other types as-is if needed
            break;
        }
      } else {
        // not required → allow empty/undefined
        rule = rule.optional();
      }
    }

    shape[field.name] = rule;
  });

  return z.object(shape);
}
