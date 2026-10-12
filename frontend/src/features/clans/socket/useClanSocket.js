import { useEffect } from "react";
import { useSocket } from "../../socket/SocketProvider";
import { useClanManagement } from "../context/ClanManagementProvider";
import { upsertMembers } from "../helpers/upsertMembers";

export const useClanSocket = (clanId) => {
    const { socket } = useSocket();
    const { setRequests, setMembers } = useClanManagement();

    useEffect(() => {
        if (!socket || !clanId) {
            console.log("Not joining clan:", {
                noSocket: !socket,
                noClanId: !clanId,
            });
            return;
        }
        console.log("Emitting join");
        socket.emit("join_clan", clanId);

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

        const handleRemovedMembership = (membership) => {
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

        // Admin
        socket.on("deleted_request", handleDeletedRequest);
        socket.on("kicked_member", handleRemovedMembership);
        socket.on("new_member", handleNewMember);
        socket.on("new_request", handleNewRequest);
        socket.on("exited_member", handleRemovedMembership);
        return () => {
            socket.off("deleted_request", handleDeletedRequest);
            socket.off("kicked_member", handleRemovedMembership);
            socket.off("new_member", handleNewMember);
            socket.off("new_request", handleNewRequest);
            socket.off("exited_member", handleRemovedMembership);

            socket.emit("leave_clan", clanId);
        };
    }, [socket, clanId, setMembers, setRequests]);
};
