import { createContext, useContext, useState } from "react";
import { useFeedSocket } from "../socket/useFeedSocket";

const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
    const [entities, setEntities] = useState({
        posts: {},
        users: {},
        comments: {},
    });

    const [queries, setQueries] = useState({
        homeFeed: [],
        usersPosts: {},
        commentsByPost: {},
    });

    const [loading, setLoading] = useState(true);

    return (
        <FeedContext.Provider
            value={{
                entities,
                setEntities,

                queries,
                setQueries,

                loading,
                setLoading,
            }}
        >
            {children}
        </FeedContext.Provider>
    );
};

export const useFeed = () => useContext(FeedContext);
