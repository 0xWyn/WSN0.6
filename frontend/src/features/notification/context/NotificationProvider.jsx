import { createContext, useContext, useState } from "react";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
    // Separate Message notifications from others
    // Issue message notifications a separate state

    const [messageNotifications, setMessageNotifications] = useState([]);

    return (
        <NotificationContext.Provider>{children}</NotificationContext.Provider>
    );
};

const useNotification = () => useContext(NotificationContext);
