import { useAuth } from "../../auth/context/AuthProvider";
import { useEntities } from "../../global/EntityProvider";

export const useUpdateUser = () => {
    const { setEntities } = useEntities();

    const updateUser = (user) => {
        setEntities((prev) => ({
            ...prev,
            users: { ...prev.users, [user._id]: user },
        }));
    };

    return { updateUser };
};
