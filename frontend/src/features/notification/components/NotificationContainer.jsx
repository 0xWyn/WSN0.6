import { useEntities } from "../../global/EntityProvider";
import { useNotification } from "../context/NotificationProvider";
import DateSection from "./DateSection";

export default function NotificationContainer() {
    const { loadingNotifications } = useNotification();
    const { entities } = useEntities();

    if (loadingNotifications) return <div>Loading...</div>;

    const notifications = Object.values(entities?.notifications ?? {});

    const sections = notifications
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .reduce((dates, notification) => {
            const date = new Date(notification.createdAt).toDateString();

            if (!dates[date]) {
                dates[date] = [];
            }

            dates[date].push(notification);

            return dates;
        }, {});

    return (
        <section className="flex-1 min-h-0 relative rounded-2xl flex flex-col gap-2">
            {Object.entries(sections).map(([key, value]) => (
                <DateSection key={key} date={key} notifications={value} />
            ))}
        </section>
    );
}
