import { useEntities } from "../../global/EntityProvider";
import { useAuth } from "../context/AuthProvider";

export const useCurrentUser = () => {
    const { authId } = useAuth();
    const { entities } = useEntities();

    return authId ? (entities.users[authId] ?? null) : null;
};
