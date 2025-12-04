import { BsPatchCheckFill } from "react-icons/bs";

const AnimatedTick = () => {
  return (
    <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center animate-pulse">
      <BsPatchCheckFill className="w-8 h-8 text-white" />
    </div>
  );
};

export default AnimatedTick;