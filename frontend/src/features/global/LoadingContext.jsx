import { createContext, useContext, useState } from "react";

const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

const useLoading = () => useContext(LoadingContext);

export default useLoading;
