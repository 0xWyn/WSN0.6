import { useAuth } from "../context/AuthProvider";

export const useCurrentUser = () => {
    const { currentUser } = useAuth();

    return currentUser ?? null;
};
