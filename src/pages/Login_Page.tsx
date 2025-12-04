

import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import LoginForm from "@/components/LoginForm";

import { useMe } from "@/features/auth/useMe";

const Login_Page = () => {
 const navigate = useNavigate();
  const { data: user, isLoading } = useMe();
console.log(user)
  useEffect(() => {
    if (!isLoading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, isLoading, navigate]);

 
  return (
    <>
      <div className="max-w-6xl mx-auto">
        <p>Global</p>

        <div className="max-w-md mx-auto  border border-gray-200 rounded-md p-7  shadow-[0_3px_10px_rgb(0,0,0,0.2)] my-5">
          <h1 className="text-3xl text-gray-900 text-start pb-5 font-medium">
            Sign in
          </h1>
          <LoginForm />
         
          
        </div>
        <p className="text-center pb-5">
          <span>New to Globals? </span>
          <Link
            to="/signup"
            className="text-blue-600 font-semibold cursor-pointer hover:underline hover:underline-offset-3 decoration-blue-500"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login_Page;


