import { Outlet } from "react-router-dom";
import Navbar from "../dashboard/Navbar";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-black text-white">

            <Navbar />

            <main className="mx-auto max-w-7xl px-6 py-8">
                <Outlet />
            </main>

        </div>
    );
};

export default DashboardLayout;

