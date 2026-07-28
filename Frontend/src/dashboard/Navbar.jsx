import { LogOut, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logout Successfully");

    navigate("/");
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b border-zinc-800
      bg-black/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

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

        {/* Right Side */}

        <div className="flex items-center gap-5">

          <div className="flex items-center gap-3">

            <div
              className="flex h-11 w-11 items-center justify-center
              rounded-full
              bg-gradient-to-r
              from-violet-600 to-cyan-500
              text-base font-bold text-white"
            >
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="hidden sm:block">

              <p className="text-xs uppercase tracking-wider text-zinc-500">
                Logged in as
              </p>

              <p className="font-semibold text-white">
                {user.name}
              </p>

            </div>

          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl
            border border-violet-500/30
            bg-violet-500/10
            px-4 py-2
            font-medium
            text-violet-300
            transition-all duration-300
            hover:-translate-y-0.5
            hover:border-violet-500
            hover:bg-violet-600
            hover:text-white
            hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;