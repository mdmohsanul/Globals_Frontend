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
import { signupSchema } from "@/utils/schema/signup_schema";
import type { SignupData } from "@/utils/schema/signup_schema";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRegister } from "@/features/auth/useSignup";

type SignUpProps = {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SignUpForm: React.FC<SignUpProps> = ({ setShowPopup }) => {
const {
  mutateAsync,
  isPending
} = useRegister();
  const [err, setErr] = useState<string | null>(null);


  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignupData) {
  setErr(null);

  try {
    // call the react-query mutation (mutateAsync throws on error)
    const response = await mutateAsync(values);

    // adapt this condition to match your API shape (token, success, user, etc.)
    if (response ) {
      setShowPopup(true);
      form.reset();
    } else {
      // backend returned 200 but payload not what we expect
      setErr("Signup failed. Please try again.");
    }
  } catch (error: any) {
    // axios error often contains response.data.message
    const serverMsg =
      error?.response?.data?.message ??
      error?.message ??
      "Something went wrong. Please try again.";
    console.error("Signup error:", error);
    setErr(serverMsg);
  }
}


  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username </FormLabel>
                <FormControl>
                  <Input placeholder="Alex" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
           disabled={isPending}
            className="h-12 w-full rounded-full text-md cursor-pointer bg-gray-800 text-white hover:bg-gray-900 transition-colors duration-300"
          >
            {isPending ? (
    <>
      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      Signing Up...
    </>
  ) : (
    "Sign Up"
  )}

            
          </Button>
        </form>
      </Form>
      {err && <p className="text-red-500 text-sm mt-2">{err}</p>}
    </div>
  );
};

export default SignUpForm;
