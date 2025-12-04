import SignUpForm from "@/components/Signup/Signup_Form";
import { Link } from "react-router-dom";
import { useState } from "react";


import SignUpSuccess from "@/components/Signup/Signup_Success";

const SignUp = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  return (
    <>
      <div className="max-w-6xl mx-auto">
      <p>GLOBALS</p>
        <div className="max-w-md mx-auto  border border-gray-200 rounded-md p-7 shadow-[0_3px_10px_rgb(0,0,0,0.2)] my-5">
          <h1 className="text-3xl text-gray-900 text-start pb-5 font-medium">
            Sign up
          </h1>
          <SignUpForm setShowPopup={setShowPopup} />
        </div>
        <p className="text-center">
          <span>Already Registered? </span>
          <Link
            to="/login"
            className="text-blue-600 font-semibold cursor-pointer hover:underline hover:underline-offset-3 decoration-blue-500"
          >
            Log in now
          </Link>
        </p>
      </div>
      {showPopup && <SignUpSuccess/>}
    </>
  );
};

export default SignUp;
