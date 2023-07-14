import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useSidebar } from "@/contexts/sidebar-context";
import { useEffect } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";

const Sidebar = () => {
    const { isOpen, setIsOpen } = useSidebar();

    // useEffect(() => {
    //     const menuHandler = () => setIsOpen(false);

    //     window.addEventListener("click", menuHandler);

    //     return () => {
    //         window.removeEventListener("click", menuHandler);
    //     };
    // }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                id="page-sidebar-wrapper"
                className="fixed md:hidden top-0 right-0 z-[90] h-screen overflow-auto w-[280px] bg-white shadow-md px-4 py-6"
                animate={isOpen ? "mount" : "unmount"}
                initial={"unmount"}
                exit="unmount"
                variants={{
                    unmount: {
                        translateX: "100%",
                        transition: { duration: 0.3 },
                    },
                    mount: {
                        translateX: 0,
                        transition: { duration: 0.3 },
                    },
                }}
            >
                <div
                    id="logo-wrap"
                    className="flex flex-row justify-between items-center"
                >
                    <Link
                        scroll={false}
                        href={`/`}
                        className="flex md:w-auto justify-center items-center"
                    >
                        <div className="relative h-8 w-8 mr-2">
                            <Image
                                alt="logo_img"
                                src={"/lantong_logo.png"}
                                draggable="false"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h2 className="text-lg font-semibold text-[#E32C2C]">หจก.ลานทองเชียงใหม่</h2>
                    </Link>
                    <IoMdClose
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-6 h-6"
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Sidebar;
