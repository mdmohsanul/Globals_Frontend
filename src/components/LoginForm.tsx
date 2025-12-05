// src/components/LoginForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/utils/schema/login_schema";
import type { LoginData } from "@/utils/schema/login_schema";
import { useLocation, useNavigate } from "react-router-dom";

import { Loader2 } from "lucide-react";
import { useLogin } from "@/features/auth/useLogin";

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();

  // react-query mutation hook
  const { mutateAsync, isPending, error, isError } = useLogin();

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ||
    "/dashboard";

  async function onSubmit(values: LoginData) {
    try {
      const user = await mutateAsync(values);

      if (user) {
        navigate(from, { replace: true });
        return;
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email </FormLabel>
                <FormControl>
                  <Input placeholder="alex@gmail.com" {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••••" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="h-12 w-full rounded-full text-md cursor-pointer bg-gray-800 "
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin mr-2" /> Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>
      {isError && (
        <p className="text-red-500 text-sm mt-2">
          {(error as any)?.response?.data?.message || "Login failed"}
        </p>
      )}
    </div>
  );
}

export default LoginForm;
