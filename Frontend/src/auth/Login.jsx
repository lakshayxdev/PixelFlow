import { Link } from "react-router-dom";
import { Mail,Eye, EyeOff,LockKeyhole} from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";

const Login = () => {
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword,setShowPassword]=useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.email.trim() || !formData.password.trim()) {
  toast.error("All Fields are required");
  return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(formData.email)) {
  toast.error("Please enter a valid email address");
  return;
}
    try {
      setLoading(true);
      const { data } = await api.post("/auth/login", formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-5">

      <div className="w-full max-w-md bg-[#111111] border border-white/10 rounded-2xl p-8">

        {/* Brand */}

        <div className="mb-8 flex flex-col items-center">
 
  <div className="flex items-center gap-3">

          <div
            className="flex h-10 w-10 items-center justify-center
            rounded-xl bg-gradient-to-r
            from-violet-600 to-cyan-500
            text-white shadow-lg"
          >
            <Zap size={20} />
          </div>

          <h1
            className="text-3xl font-bold tracking-tight
            bg-gradient-to-r
            from-white via-cyan-300 to-violet-400
            bg-clip-text text-transparent"
          >
            PixelFlow
          </h1>

        </div>

  <p className="text-zinc-400 mt-2 text-center">
    Login to your Account
  </p>
</div>

        <form onSubmit={handleSubmit}
        
        className="space-y-5">

          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Email
            </label>

            <div className="relative">
               <Mail
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-500
                "
              />

               <input
               onChange={handleChange}
               name="email"
              value={formData.email}
              type="email"
              placeholder="Enter your email"
              className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-violet-500
focus:ring-2
focus:ring-violet-500/20 transition"
            />
            </div>
           
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Password
            </label>

            <div className="relative">

               <LockKeyhole
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-500
                "
              />

               <input
               onChange={handleChange}
               name="password"
               value={formData.password}
               type={showPassword? "text": "password"}
              placeholder="Enter password"
              className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-violet-500
focus:ring-2
focus:ring-violet-500/20 transition"
            />
             <button type="button" onClick={()=> setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                {showPassword ? (
                  <EyeOff size={18}/>
                ) :
              (
                <Eye size={18}/>
              )
                }
              </button>
            </div>
           
          </div>

       <button
  type="submit"
  disabled={loading}
  className={`
    group w-full py-3 rounded-lg font-semibold transition-all duration-300
    flex items-center justify-center gap-2
    ${
  loading
    ? "bg-violet-600 text-white opacity-60 cursor-not-allowed"
    : "bg-violet-600 text-white hover:bg-violet-500 cursor-pointer"
}
  `}
>
  {loading ? (
    "Logging in..."
  ) : (
    <>
      Login
      <FaArrowRightLong className="transition-transform duration-300 group-hover:translate-x-1" />
    </>
  )}
</button>

        </form>

        <div className="flex items-center my-7">
          <div className="flex-1 h-px bg-white/10"></div>


          <div className="flex-1 h-px bg-white/10"></div>
        </div>


        <p className="text-center text-zinc-400 mt-8">
          New to PixelFlow ?{" "}
          <Link
            to="/signup"
            className="text-white hover:text-violet-500"
          >
            Create an account
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Login;



















// import { Link } from "react-router-dom";
// import { Mail, Lock } from "lucide-react";
// import { FaArrowRightLong } from "react-icons/fa6";


// const Login = () => {
//     return (
//         <div className="min-h-screen bg-black flex items-center justify-center px-6">

//             <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

//                 {/* Logo */}

//                 <div className="mb-10 text-center">

//                     <h1 className="text-4xl font-bold text-white tracking-tight">
//                         PixelFlow
//                     </h1>

//                     <p className="mt-2 text-lg text-zinc-500">
//                         Login to continue to your dashboard.
//                     </p>

//                 </div>

//                 <form className="space-y-5">

//                     {/* Email */}

//                     <div>

//                         <label className="block mb-2 text-sm text-zinc-300">
//                             Email
//                         </label>

//                         <div className="relative">

//                             <Mail
//                                 size={18}
//                                 className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
//                             />

//                             <input
//                                 type="email"
//                                 placeholder="Enter your email"
//                                 className="w-full rounded-xl border border-zinc-700 bg-black py-3 pl-11 pr-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-violet-500"
//                             />

//                         </div>

//                     </div>

//                     {/* Password */}

//                     <div>

//                         <label className="block mb-2 text-sm text-zinc-300">
//                             Password
//                         </label>

//                         <div className="relative">

//                             <Lock
//                                 size={18}
//                                 className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
//                             />

//                             <input
//     type="password"
//     placeholder="Enter your password"
//     className="w-full rounded-xl border border-zinc-700 bg-black py-3 pl-11 pr-4
//     text-white font-bold
//     placeholder:font-normal
//     placeholder:text-zinc-500
//     outline-none transition
//     focus:border-violet-500"
// />

//                         </div>

//                     </div>

//                     {/* Forgot Password */}

//                     <div className="flex justify-end">

//                         <button
//                             type="button"
//                             className="text-sm text-zinc-400 hover:text-violet-400 transition"
//                         >
//                             Forgot Password?
//                         </button>

//                     </div>

//                     {/* Login Button */}

//                     <button
//                         type="submit"
//                         className="w-full flex items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 font-medium text-white transition hover:bg-violet-500 transition-all duration-300"
//                     >
//                         Login
//                          <FaArrowRightLong className="transition-transform duration-300 group-hover:translate-x-1" />
//                     </button>

//                 </form>

//                 {/* Footer */}

//                 <p className="mt-8 text-center text-sm text-zinc-400">

//                     Don't have an account?{" "}

//                     <Link
//                         to="/signup"
//                         className="font-medium text-violet-400 hover:text-violet-300"
//                     >
//                         Create Account
//                     </Link>

//                 </p>

//             </div>

//         </div>
//     );
// };

// export default Login;