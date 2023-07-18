import { AnimatePresence, motion } from "framer-motion";
import { useDashboardSidebar } from "@/contexts/dashboard-sidebar-context";

const DashboardNavbar = () => {
    const { isOpen, setIsOpen, isMobile } = useDashboardSidebar();

    return (
        <motion.div
            id="page-main-header"
            className={`fixed top-0 z-[9] h-20 px-6 shadow-sm flex items-center bg-white`}
            animate={isOpen ? "mount" : "unmount"}
            initial={isMobile ? "unmount" : "mount"}
            exit="unmount"
            variants={{
                unmount: {
                    width: "100%",
                    marginLeft: 0,
                    transition: { duration: 0.5 },
                },
                mount: {
                    width: isMobile ? "100%" : "calc(100%-280px)",
                    marginLeft: isMobile ? 0 : "280px",
                    transition: { duration: 0.5 },
                },
            }}
        >
            <div
                onClick={() => setIsOpen((prev) => !prev)}
                className={`inline-flex items-center font-medium text-black py-2 rounded-md hover:cursor-pointer transition-all ${
                    isOpen ? "" : "rotate-180"
                }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                    />
                </svg>
            </div>
        </motion.div>
    );
};

export default DashboardNavbar;
