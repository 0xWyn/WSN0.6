import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useClan } from "../context/ClanProvider";
import { useClanAccess } from "../hooks/useClanAccess";
import { useClanResolver } from "../hooks/useClanResolver";
import { useClanSocket } from "../socket/useClanSocket";

export default function ClanPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    useClanSocket(id);
    useClanResolver(id);

    const { activeClan } = useClan();
    const { isMember } = useClanAccess(activeClan);

    useEffect(() => {
        if (!activeClan) return;

        if (activeClan.access === "private" && !isMember) {
            navigate("..", { replace: true });
        }
    }, [activeClan, isMember, navigate]);

    return <Outlet />;
}
