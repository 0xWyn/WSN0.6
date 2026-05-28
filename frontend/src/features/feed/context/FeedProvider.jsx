import { createContext, useContext, useState } from "react";
import { useFeedSocket } from "../socket/useFeedSocket";
import { useEntities } from "../../global/EntityProvider";
const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
    const [queries, setQueries] = useState({
        homeFeedIds: [],
        usersPostsIds: {},
        commentsByPost: {},
    });

    const [loading, setLoading] = useState(true);

    return (
        <FeedContext.Provider
            value={{
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
