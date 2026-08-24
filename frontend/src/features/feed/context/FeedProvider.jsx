import { createContext, useContext, useState } from "react";
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

    return (
        <FeedContext.Provider
            value={{
                queries,
                setQueries,
            }}
        >
            {children}
        </FeedContext.Provider>
    );
};

export const useFeed = () => useContext(FeedContext);
