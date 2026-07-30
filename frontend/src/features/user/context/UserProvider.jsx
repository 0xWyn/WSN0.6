import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [userEntities, setUserEntities] = useState({});

    return <UserContext.Provider>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
