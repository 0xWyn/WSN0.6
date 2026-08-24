import { createContext, useContext, useEffect, useState } from "react";

const EntityContext = createContext(null);

export const EntityProvider = ({ children }) => {
    const [entities, setEntities] = useState({
        users: {},
        chats: {},
        messages: {},
        comments: {},
        posts: {},
        clans: {},
    });

    return (
        <EntityContext.Provider value={{ entities, setEntities }}>
            {children}
        </EntityContext.Provider>
    );
};

export const useEntities = () => useContext(EntityContext);
