import { useSetEntities } from "../../global/EntityProvider";

export const useUpdateUser = () => {
    const { setEntities } = useSetEntities();

    const updateUser = (user) => {
        setEntities((prev) => ({
            ...prev,
            users: { ...prev.users, [user._id]: user },
        }));
    };

    return { updateUser };
};
