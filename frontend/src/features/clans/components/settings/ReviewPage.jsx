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
            <div className="relative">
                <div className="z-50 w-full h-full inset-0 absolute"></div>
                <UserPage readOnly />
            </div>
        </div>
    );
}
