import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [loadingUser, setLoadingUser] = useState({
        followers: true,
        following: true,
    });
    const [connections, setConnections] = useState({
        followers: [],
        following: [],
    });

    return (
        <UserContext.Provider
            value={{
                isEditing,
                setIsEditing,
                loadingUser,
                setLoadingUser,
                connections,
                setConnections,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
