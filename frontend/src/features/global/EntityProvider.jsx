import { createContext, useContext, useEffect, useState } from "react";

const EntityContext = createContext(null);

export const EntityProvider = ({ children }) => {
    const [entities, setEntities] = useState({
        users: {},
        posts: {},
        chats: {},
        messages: {},
        comments: {},
    });

    return (
        <EntityContext.Provider value={{ entities, setEntities }}>
            {children}
        </EntityContext.Provider>
    );
};

export const useEntities = () => useContext(EntityContext);
