import { createContext, useContext, useEffect, useState } from "react";

const EntityStateContext = createContext(null);
const EntityActionsContext = createContext(null);

export const EntityProvider = ({ children }) => {
    const [entities, setEntities] = useState({
        users: {},
        chats: {},
        messages: {},
        comments: {},
        posts: {},
        clans: {},
        notifications: {},
    });

    return (
        <EntityStateContext.Provider value={{ entities }}>
            <EntityActionsContext.Provider value={{ setEntities }}>
                {children}
            </EntityActionsContext.Provider>
        </EntityStateContext.Provider>
    );
};

export const useEntities = () => useContext(EntityStateContext);
export const useSetEntities = () => useContext(EntityActionsContext);
