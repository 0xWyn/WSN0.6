import { createContext, useContext, useRef, useState } from "react";
import { useFeedSocket } from "../socket/useFeedSocket";
import { useEntities } from "../../global/EntityProvider";
const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
    const [queries, setQueries] = useState({
        postsByClan: {},
        postsByUser: {},
        commentsByPost: {},
        commentsByUser: {},
        repliesByComment: {},
    });

    const [feedLoad, setFeedLoad] = useState({
        clan: true,
        user: true,
        single: true,
    });

    return (
        <FeedContext.Provider
            value={{
                queries,
                setQueries,
                feedLoad,
                setFeedLoad,
            }}
        >
            {children}
        </FeedContext.Provider>
    );
};

export const useFeed = () => useContext(FeedContext);
