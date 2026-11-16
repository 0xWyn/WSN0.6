import { createContext, useContext, useEffect, useState } from "react";
import { INTEREST_DOMAINS } from "../../../config/interestDomains";
import { upsertClans } from "../../clans/helpers/updateClanEntities";
import { useSetEntities } from "../../global/EntityProvider";
import { getExploreSections } from "../apis/exploreApis";
import { useNavigate } from "react-router-dom";

const ExploreContext = createContext(null);

export const ExploreProvider = ({ children }) => {
    const navigate = useNavigate();

    const [results, setResults] = useState(null);
    const [searching, setSearching] = useState(false);
    const [loadingExplore, setLoadingExplore] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeSection, setActiveSection] = useState("posts");
    const { setEntities } = useSetEntities();

    useEffect(() => {
        const fetchClansByCategory = async () => {
            try {
                console.log("Running useExplore");

                setLoadingExplore(true);
                const { data } = await getExploreSections();
                setEntities((prev) => upsertClans(data, prev));
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingExplore(false);
            }
        };

        fetchClansByCategory();
    }, []);

    useEffect(() => {
        searching && navigate("search");
    }, [searching]);

    return (
        <ExploreContext.Provider
            value={{
                results,
                setResults,
                searching,
                setSearching,
                loadingExplore,
                searchTerm,
                setSearchTerm,
                activeSection,
                setActiveSection,
            }}
        >
            {children}
        </ExploreContext.Provider>
    );
};

export const useExplore = () => useContext(ExploreContext);
