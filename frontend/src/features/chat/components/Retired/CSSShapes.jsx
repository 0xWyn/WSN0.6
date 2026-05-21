export const Triangle = () => {
    return (
        <div className="border-50 border-t-green-500 border-b-blue-500 border-r-red-500 border-l-orange-500 h-0 w-0  border-t-transparent border-l-transparent border-r-transparent" />
    );
};

export const Trapezoid = () => {
    return (
        <div className="border-50 border-t-green-500 border-b-blue-500 border-r-red-500 border-l-orange-500 border-b-transparent border-l-transparent border-r-transparent h-0 w-50" />
    );
};

export const Quadrant = () => {
    return <div className="bg-blue-300 size-25 rounded-bl-full"></div>;
};

export const Cone = () => {
    return (
        <div className="size-0 border-50 border-y-100 border-t-orange-300 border-l-transparent border-b-transparent border-r-transparent rounded-t-full"></div>
    );
};

export const RightMessage = () => {
    return (
        <div
            className="relative w-50 h-25 bg-blue-300 rounded-l-3xl rounded-br-3xl 
        
        after:absolute after:content-[''] after:left-50  after:border-y-12 after:border-x-20 after:border-blue-300 after:border-b-transparent after:border-r-transparent"
        ></div>
    );
};

export const LeftMessage = () => {
    return (
        <div
            className="relative w-50 h-25 bg-green-300 rounded-r-3xl rounded-bl-3xl 
        
        before:absolute before:content-[''] before:right-50 before:border-y-12 before:border-x-20 before:border-green-300 before:border-b-transparent before:border-l-transparent"
        ></div>
    );
};

//  after:border-r-transparent after:border-b-transparent after:border-t-transparent
