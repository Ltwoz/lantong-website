import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useSidebar } from "@/contexts/sidebar-context";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/router";
import { useUser } from "@/contexts/user-context";

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
        href: `/blogs`,
    },
    {
        name: "ติดต่อ",
        href: `/contact`,
    },
];

const Sidebar = () => {
    const { status, user, logout } = useUser();
    const { isOpen, setIsOpen } = useSidebar();
    const router = useRouter();
    const sidebarRef = useRef(null);

    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setIsOpen]);

    useEffect(() => {
        const menuHandler = () => setShowMenu(false);

        window.addEventListener("click", menuHandler);

        return () => {
            window.removeEventListener("click", menuHandler);
        };
    }, []);

    const handleMenuClick = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    const logoutHandler = (e) => {
        e.preventDefault();

        logout();
    }

    const AuthButton =
        status === "authenticated" ? (
            <div className="relative xl:flex text-left items-center">
                <div className="flex items-center px-[1px]">
                    <div
                        className={`w-full xl:hover:cursor-pointer flex justify-between items-center rounded-md px-3 py-2 text-gray-700 xl:ring-1 xl:hover:ring-primary/50 xl:hover:bg-primary/5 ${
                            showMenu
                                ? "xl:ring-primary/50 xl:bg-primary/5"
                                : "xl:ring-transparent"
                        } select-none transition-all`}
                        onClick={handleMenuClick}
                    >
                        <div className="flex flex-row items-center gap-2 xl:mr-6">
                            <div className="aspect-square w-7 h-7 relative overflow-hidden rounded-full">
                                <Image
                                    alt="avatar"
                                    src={`https://alumni.engineering.utoronto.ca/files/2022/05/Avatar-Placeholder-400x400-1.jpg`}
                                    draggable="false"
                                    fill
                                    unoptimized
                                    className="select-none object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <div className="text-sm leading-4 font-medium">
                                    {user?.name}
                                </div>
                            </div>
                        </div>
                        <div className="inline-flex items-center xl:mr-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className={
                                    "h-5 md:h-3 w-5 md:w-3 transition duration-200" +
                                    (showMenu ? " -rotate-180" : "")
                                }
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div
                    id="menu"
                    className={`absolute right-4 md:right-6 top-[calc(100%-10px)] md:top-[calc(100%+4px)] z-[99] mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
                    style={{ display: showMenu ? "" : "none" }}
                >
                    {user?.role === "admin" && (
                        <div className="py-1">
                            <Link
                                scroll={false}
                                href={`/dashboard`}
                                className="text-blue-700 block px-4 py-2 text-sm hover:bg-primary/10"
                            >
                                จัดการหลังบ้าน
                            </Link>
                        </div>
                    )}
                    <div className="py-1">
                        <button
                            onClick={logoutHandler}
                            className="text-red-600 w-full text-left px-4 py-2 text-sm hover:bg-primary/10"
                        >
                            ออกจากระบบ
                        </button>
                    </div>
                </div>
            </div>
        ) : status === "loading" ? (
            <div className="relative flex items-center">
                <div className="w-6 h-6 border-[3px] border-gray-300/80 border-t-[3px] border-t-gray-800/80 rounded-[50%] animate-spin"></div>
            </div>
        ) : (
            <Link
                href="/auth/login"
                className="w-fit inline-flex items-center bg-[#BC1F1F] rounded-lg transition-all overflow-hidden mx-3"
            >
                <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                    <span className="block tracking-wide">
                        ลงทะเบียน/เข้าสู่ระบบ
                    </span>
                </div>
            </Link>
        );

    return (
        <AnimatePresence mode="wait">
            <motion.div
                id="page-sidebar-wrapper"
                ref={sidebarRef}
                className="fixed xl:hidden top-0 right-0 z-[90] h-screen overflow-auto w-[280px] bg-white shadow-md px-4 py-6"
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
                {AuthButton}
            </motion.div>
        </AnimatePresence>
    );
};

export default Sidebar;
