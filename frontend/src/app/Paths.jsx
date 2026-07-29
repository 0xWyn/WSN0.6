import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../features/auth/components/ProtectedRoute.jsx";
//
const LoginForm = lazy(
    () => import("../features/auth/components/LoginForm.jsx")
);
const SignupForm = lazy(
    () => import("../features/auth/components/RegistrationForm.jsx")
);
const Feed = lazy(() => import("../features/feed/components/Feed.jsx"));
const Layout = lazy(() => import("../app/Layout.jsx"));
const Settings = lazy(
    () => import("../features/settings/components/Settings.jsx")
);
const SetProfile = lazy(
    () => import("../features/settings/components/ProfileSettings.jsx")
);
const PostPage = lazy(
    () => import("../features/post/main/components/PostPage.jsx")
);
const Chats = lazy(() => import("../features/chat/components/ChatList.jsx"));
const ChatInterface = lazy(
    () => import("../features/messages/components/MessageInterface.jsx")
);
const ChatManager = lazy(
    () => import("../features/chat/components/ChatResolver.jsx")
);
const UserPage = lazy(() => import("../features/user/components/UserPage.jsx"));
const Homepage = lazy(
    () => import("../features/clans/components/Homepage.jsx")
);
const ClanPage = lazy(
    () => import("../features/clans/components/ClanPage.jsx")
);
const Explore = lazy(
    () => import("../features/explore/components/ExplorePage.jsx")
);
const ClanResolver = lazy(
    () => import("../features/clans/components/ClanResolver.jsx")
);

export default function Paths() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/register" element={<SignupForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Homepage />} />
                        <Route path="home" element={<Homepage />}></Route>

                        <Route path="c/:id" element={<ClanPage />} />

                        <Route path="posts/:id" element={<PostPage />} />
                        <Route path="settings" element={<Settings />}>
                            <Route index element={<SetProfile />} />
                            <Route path="profile" element={<SetProfile />} />
                        </Route>
                        <Route path="chats">
                            <Route index element={<Chats />} />
                            <Route path=":id" element={<ChatInterface />} />
                            <Route path="user/:id" element={<ChatManager />} />
                        </Route>
                        <Route path="user/:id" element={<UserPage />} />
                        <Route path="explore" element={<Explore />} />
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    );
}
