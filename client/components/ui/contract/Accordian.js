import { useState } from "react";

const Accordian = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded((current) => !current);

  return (
    <div className="cursor-pointer py-2" onClick={toggleExpanded}>
      <div className="px-6 text-left items-center h-10 select-none flex justify-between flex-row bg-pink-100 w-[250px]">
        <h5 className={`flex-1`}>{title}</h5>
        <div
          className={`flex-none transition-all duration-300 ${
            expanded ? "-rotate-180" : "rotate-0"
          }`}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="48"
              d="M112 184l144 144 144-144"
            />
          </svg>
        </div>
      </div>
      <div
        className={`px-6 pt-0 overflow-y-scroll md:overflow-hidden transition-[max-height] duration-300 ease-in ${
          expanded ? "max-h-50" : "max-h-0"
        }`}
      >
        <p className="pb-2 text-left w-[250px]">{content}</p>
      </div>
    </div>
  );
};

export default Accordian;
