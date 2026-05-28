import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";

export default function ProtectedRoute() {
    const location = useLocation();

    const { user, loading } = useAuth();

    useEffect(() => {
        window.addEventListener("auth:logout", () => {
            return <Navigate to="/login" state={{ from: location }} />;
        });
    });

    if (loading) {
        return (
            <div className="w-full h-full rounded-2xl border border-dashed border slate 300 p-10 text-center text-slate 500">
                Loading...
            </div>
        );
    }

    if (!loading && !user) {
        console.log("Redirecting from ProtectedRoute");
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return <Outlet />;
}
