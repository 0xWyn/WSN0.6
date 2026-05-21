import { AuthProvider } from "../features/auth/context/AuthProvider.jsx";
import { FeedProvider } from "../features/feed/context/FeedProvider.jsx";
import { SocketProvider } from "../features/socket/SocketProvider.jsx";
import Paths from "./Paths.jsx";

export default function App() {
    return (
        <AuthProvider>
            <SocketProvider>
                <FeedProvider>
                    <Paths />
                </FeedProvider>
            </SocketProvider>
        </AuthProvider>
    );
}
