import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useSidebar } from "@/contexts/sidebar-context";
import { useEffect } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/router";

const Menus = [
    {
        name: "หน้าหลัก",
        href: `/`,
    },
    {
        name: "เกี่ยวกับ",
        href: `/about`,
    },
    {
        name: "สินค้าของเรา",
        href: `/products`,
    },
    {
        name: "ลานทองพาเที่ยว",
        href: `/reviews`,
    },
    {
        name: "ติดต่อ",
        href: `/contact`,
    },
];

const Sidebar = () => {
    const { isOpen, setIsOpen } = useSidebar();
    const router = useRouter();

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
                        <h2 className="text-lg font-semibold text-[#E32C2C]">
                            หจก.ลานทองเชียงใหม่
                        </h2>
                    </Link>
                    <IoMdClose
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-6 h-6"
                    />
                </div>
                <ul id="sidebar-items" className="mt-6">
                    {Menus.map((menu, i) => {
                        const isActive = router.asPath === menu.href;
                        return (
                            <li
                                key={i}
                                className={`rounded hover:bg-zinc-100/80 text-zinc-900 ${
                                    isActive ? "bg-gray-100/80" : ""
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                <Link
                                    href={menu.href}
                                    className="flex items-center px-4 py-3"
                                >
                                    <div className="inline-flex items-center font-medium">
                                        {menu.name}
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </motion.div>
        </AnimatePresence>
    );
};

export default Sidebar;
