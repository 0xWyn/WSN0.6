import { createContext, useContext, useEffect, useRef, useState } from "react";

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

    const [myClanIds, setMyClanIds] = useState([]);

    const myClans = myClanIds.map((id) => entities.clans[id]);

    return (
        <EntityStateContext.Provider value={{ entities, myClanIds, myClans }}>
            <EntityActionsContext.Provider
                value={{ setEntities, setMyClanIds }}
            >
                {children}
            </EntityActionsContext.Provider>
        </EntityStateContext.Provider>
    );
};

export const useEntities = () => useContext(EntityStateContext);
export const useSetEntities = () => useContext(EntityActionsContext);
