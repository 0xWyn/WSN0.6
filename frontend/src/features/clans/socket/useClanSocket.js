import { useEffect } from "react";
import { useSocket } from "../../socket/SocketProvider";
import { useEntities } from "../../global/EntityProvider";
import { upsertClans } from "../helpers/updateClanEntities";

export const useClanSocket = () => {
    const { socket } = useSocket();
    const { entities, setEntities } = useEntities();

    useEffect(() => {
        if (!socket) return;

        const handleNewClan = (clan) => {
            setEntities((prev) => upsertClans(clan, prev));
        };

        socket.on("updated_clan", handleNewClan);

        return () => {
            socket.off("updated_clan", handleNewClan);
        };
    }, [socket]);
};
