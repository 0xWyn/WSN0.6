import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resolveChat } from "../hooks/resolveChat";
import ErrorState from "../../../components/ui/ErrorState";
import FullscreenLoader from "../../../components/ui/FullscreenLoader";

export default function ChatResolver() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState(false);

    useEffect(() => {
        const resolve = async () => {
            try {
                const data = await resolveChat(id);

                setTimeout(() => {
                    navigate(`/chats/${data._id}`);
                }, 2500);
            } catch (error) {
                setTimeout(() => {
                    setError(true);
                }, 2500);
            }
        };

        resolve();
    }, [id]);

    if (error) {
        return (
            <ErrorState
                title="Chat unavailable"
                description="We couldn't initialise this conversation"
                action={() => window.location.reload()}
            />
        );
    }

    return (
        <FullscreenLoader
            title="Opening Chat"
            subtitle="Preparing your conversation..."
        />
    );
}
