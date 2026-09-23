import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useClanSocket } from "../socket/useClanSocket";
import { useClanResolver } from "../hooks/useClanResolver";
import { useClan } from "../context/ClanProvider";
import { useEffect } from "react";
import { useClanAccess } from "../hooks/useClanAccess";
import ClanExitModal from "./ClanExitModal";

export default function ClanPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    useClanSocket(id);
    useClanResolver(id);

    const { activeClan } = useClan();
    const { isMember } = useClanAccess(activeClan);

    useEffect(() => {
        if (!activeClan) return;

        if (activeClan.visibility === "private" && !isMember) {
            navigate("..", { replace: true });
        }
    }, [activeClan, isMember, navigate]);

    return <Outlet />;
}
