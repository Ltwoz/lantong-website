import { useState } from "react";

const Accordian = ({ title, content }) => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => setExpanded((current) => !current);

    const minusIcon = "-";
    const plusIcon = "+";

    return (
        <div
            className="cursor-pointer border-b border-[#CBD5E0] py-2"
            onClick={toggleExpanded}
        >
            <div className="px-6 text-left items-center h-10 select-none flex justify-between flex-row">
                <h5 className="flex-1">{title}</h5>
                <div className="flex-none pl-2">
                    {expanded ? minusIcon : plusIcon}
                </div>
            </div>
            <div
                className={`px-6 pt-0 overflow-y-scroll md:overflow-hidden transition-[max-height] duration-300 ease-in ${
                    expanded ? "max-h-40" : "max-h-0"
                }`}
            >
                <p className="pb-2 text-left">{content}</p>
            </div>
        </div>
    );
};

export default Accordian;
