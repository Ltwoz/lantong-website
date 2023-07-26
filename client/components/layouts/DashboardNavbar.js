import { motion } from "framer-motion";
import { useDashboardSidebar } from "@/contexts/dashboard-sidebar-context";
import { FaBars } from "react-icons/fa"

const DashboardNavbar = () => {
    const { isOpen, setIsOpen, isMobile } = useDashboardSidebar();

    return (
        <motion.div
            id="page-main-navbar"
            className={`fixed top-0 z-[9] h-20 px-6 shadow-sm flex items-center bg-white w-full`}
            animate={isOpen ? "mount" : "unmount"}
            initial={isMobile ? "unmount" : "mount"}
            exit="unmount"
            variants={{
                unmount: {
                    marginLeft: 0,
                    transition: { duration: 0.5 },
                },
                mount: {
                    marginLeft: isMobile ? 0 : "280px",
                    transition: { duration: 0.5 },
                },
            }}
        >
            <div
                onClick={() => setIsOpen((prev) => !prev)}
                className={`xl:hidden inline-flex items-center font-medium text-black py-2 rounded-md hover:cursor-pointer transition-all`}
            >
                <FaBars />
            </div>
        </motion.div>
    );
};

export default DashboardNavbar;
