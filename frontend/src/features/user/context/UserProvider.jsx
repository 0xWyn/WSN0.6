import { createContext, useContext, useState } from "react";
import { useUserSocket } from "../web/useUserSocket";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [isEditing, setIsEditing] = useState(false);

    useUserSocket();
    return (
        <UserContext.Provider value={{ isEditing, setIsEditing }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
