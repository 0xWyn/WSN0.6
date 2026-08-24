import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <UserContext.Provider value={{ isEditing, setIsEditing }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
