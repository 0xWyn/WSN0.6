import { createContext, useContext, useState } from "react";
import { useFeedSocket } from "../socket/useFeedSocket";
import { useEntities } from "../../global/EntityProvider";
const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
    const [queries, setQueries] = useState({
        homeFeedIds: [],
        clanPostsIds: {},
        usersPostsIds: {},
        commentsByPost: {},
    });

    const [postEntities, setPostEntities] = useState({});

    const [postsByClan, setPostsByClan] = useState({});
    const [postsByAuthorId, setPostsByAuthorId] = useState({});

    const [loading, setLoading] = useState(true);

    return (
        <FeedContext.Provider
            value={{
                queries,
                setQueries,

                postsByClan,
                setPostsByClan,

                postEntities,
                setPostEntities,

                postsByAuthorId,
                setPostsByAuthorId,

                loading,
                setLoading,
            }}
        >
            {children}
        </FeedContext.Provider>
    );
};

export const useFeed = () => useContext(FeedContext);
