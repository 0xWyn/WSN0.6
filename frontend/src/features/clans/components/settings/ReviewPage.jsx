import { useState } from "react";
import UserPage from "../../../user/components/UserPage";
import RequestControls from "./RequestControls";

export default function ReviewPage() {
    const [isReviewing, setIsReviewing] = useState(true);

    return (
        <div className="min-h-screen w-full relative">
            {isReviewing && (
                <RequestControls onClose={() => setIsReviewing(false)} />
            )}
            <UserPage />
        </div>
    );
}
