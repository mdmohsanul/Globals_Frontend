import { Link } from "react-router-dom"
import AnimatedTick from "../ui/AnimatedTick"


const Signup_Success = () => {
  return (
 <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/50 min-h-screen ">
      <div className="bg-white rounded-md w-1/3 py-5 flex flex-col items-center justify-center gap-4">
       <AnimatedTick/>
       <p className="text-2xl">Account Created Successfully!</p>
       <Link
            to="/login"
            className="text-blue-600 font-semibold cursor-pointer hover:underline hover:underline-offset-3 decoration-blue-500"
          >
            Log in now
          </Link>
      </div>
      </div>
  )
}

export default Signup_Success