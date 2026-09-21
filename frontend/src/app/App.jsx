import { AuthProvider } from "../features/auth/context/AuthProvider.jsx";
import { FeedProvider } from "../features/feed/context/FeedProvider.jsx";
import { SocketProvider } from "../features/socket/SocketProvider.jsx";
import { EntityProvider } from "../features/global/EntityProvider.jsx";
import { RealtimeProvider } from "../features/global/RealtimeProvider.jsx";
import { ClanProvider } from "../features/clans/context/ClanProvider.jsx";
import { ExploreProvider } from "../features/explore/context/ExploreProvider.jsx";
import { UserProvider } from "../features/user/context/UserProvider.jsx";
import { ClanManagementProvider } from "../features/clans/context/ClanManagementProvider.jsx";
import { NotificationProvider } from "../features/notification/context/NotificationProvider.jsx";
import Paths from "./Paths.jsx";

export default function App() {
    return (
        <EntityProvider>
            <AuthProvider>
                <SocketProvider>
                    <ClanProvider>
                        <ClanManagementProvider>
                            <FeedProvider>
                                <ExploreProvider>
                                    <UserProvider>
                                        <NotificationProvider>
                                            <RealtimeProvider>
                                                <Paths />
                                            </RealtimeProvider>
                                        </NotificationProvider>
                                    </UserProvider>
                                </ExploreProvider>
                            </FeedProvider>
                        </ClanManagementProvider>
                    </ClanProvider>
                </SocketProvider>
            </AuthProvider>
        </EntityProvider>
    );
}
