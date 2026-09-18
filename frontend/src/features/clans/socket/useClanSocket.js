import { useEffect } from "react";
import { useSetEntities } from "../../global/EntityProvider";
import { useSocket } from "../../socket/SocketProvider";
import { upsertClans } from "../helpers/updateClanEntities";
import { useClanManagement } from "../context/ClanManagementProvider";
import { upsertMembers } from "../helpers/upsertMembers";

export const useClanSocket = (clanId) => {
    const { socket } = useSocket();
    const { setEntities } = useSetEntities();
    const { setRequests, setMembers } = useClanManagement();

    useEffect(() => {
        console.log("Using clan socket");
        if (!socket || !clanId) {
            console.log("Returning early");
            return;
        }

        console.log("Emitting join");
        socket.emit("join_clan", clanId);

        const handleNewClan = (clan) => {
            setEntities((prev) => upsertClans([clan], prev));
        };

        const handleClanUpdate = (clan) => {
            console.log("Handling updated clan");
            setEntities((prev) => upsertClans([clan], prev));
        };

        // Admin
        const handleDeletedRequest = (req) => {
            console.log("handling deleted requst");
            console.log(req);
            setRequests((prev) => prev.filter((preq) => preq._id !== req._id));
        };

        const handleNewRequest = (req) => {
            console.log("Handling new request");
            setRequests((prev) => ({ ...prev, [req._id]: req }));
        };

        const handleKickedMember = (membership) => {
            const { _id } = membership;
            console.log("Using removed member in clan Socket");
            setMembers((prev) => {
                const map = { ...prev };
                delete map[_id];
                return map;
            });
        };

        const handleNewMember = (membership) => {
            console.log("handling new member: line 36, useClanSocket");
            setMembers((prev) => upsertMembers([membership], prev));
        };

        socket.on("new_clan", handleNewClan);
        socket.on("updated_clan", handleClanUpdate);

        // Admin
        socket.on("deleted_request", handleDeletedRequest);
        socket.on("kicked_member", handleKickedMember);
        socket.on("new_member", handleNewMember);
        socket.on("new_request", handleNewRequest);
        return () => {
            socket.off("new_clan", handleNewClan);
            socket.off("updated_clan", handleClanUpdate);
            socket.off("deleted_request", handleDeletedRequest);
            socket.off("kicked_member", handleKickedMember);
            socket.off("new_member", handleNewMember);
            socket.off("new_request", handleNewRequest);

            socket.emit("leave_clan", clanId);
        };
    }, [socket, clanId, setMembers, setRequests]);
};
