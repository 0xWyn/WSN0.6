import { AuthProvider } from "../features/auth/context/AuthProvider.jsx";
import { FeedProvider } from "../features/feed/context/FeedProvider.jsx";
import { SocketProvider } from "../features/socket/SocketProvider.jsx";
import { EntityProvider } from "../features/global/EntityProvider.jsx";
import { RealtimeProvider } from "../features/global/RealtimeProvider.jsx";
import { ClanProvider } from "../features/clans/context/ClanProvider.jsx";

import Paths from "./Paths.jsx";

export default function App() {
    return (
        <AuthProvider>
            <SocketProvider>
                <EntityProvider>
                    <RealtimeProvider>
                        <ClanProvider>
                            <FeedProvider>
                                <Paths />
                            </FeedProvider>
                        </ClanProvider>
                    </RealtimeProvider>
                </EntityProvider>
            </SocketProvider>
        </AuthProvider>
    );
}
