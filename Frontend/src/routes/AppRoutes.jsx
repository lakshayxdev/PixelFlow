import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import DashboardLayout from "../Layout/DashboardLayout";
import ProtectedRoute from "../dashboard/ProtectedRoute";
import DashboardPage from "../dashboard/DashboardPage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="/dashboard"
                        element={<DashboardPage />}
                    />
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;