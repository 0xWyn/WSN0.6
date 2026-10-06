import { Navigate, Outlet, useLocation } from "react-router-dom";
import FullscreenLoader from "../../../components/ui/FullscreenLoader.jsx";
import { useAuth } from "../context/AuthProvider.jsx";

export default function ProtectedRoute() {
    const location = useLocation();

    const { loadingAuth, currentUser } = useAuth();

    if (loadingAuth) {
        return <FullscreenLoader />;
    }

    if (!loadingAuth && !currentUser) {
        console.log("Redirecting from ProtectedRoute");
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return <Outlet />;
}
