import { useDashboardSidebar } from "@/contexts/dashboard-sidebar-context";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { IoMdClose, IoMdReturnLeft } from "react-icons/io";

const DashboardSidebar = () => {
    const { isOpen, setIsOpen, isMobile } = useDashboardSidebar();
    const router = useRouter();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                id="page-dashboard-sidebar-wrapper"
                className="fixed top-0 z-[90] h-screen overflow-auto w-[280px] bg-[#18181B] shadow-md flex flex-col justify-between"
                animate={isOpen ? "mount" : "unmount"}
                initial={isMobile ? "unmount" : "mount"}
                exit="unmount"
                variants={{
                    unmount: {
                        translateX: "-100%",
                        transition: { duration: 0.5 },
                    },
                    mount: {
                        translateX: 0,
                        transition: { duration: 0.5 },
                    },
                }}
            >
                <div className="flex flex-col">
                    <div
                        id="logo-wrap"
                        className="px-4 py-6 flex flex-row justify-between items-center bg-[#E2E7F0]"
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
                                ระบบจัดการ
                            </h2>
                        </Link>
                        <IoMdClose
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-6 h-6 cursor-pointer xl:hidden"
                        />
                    </div>
                    <ul id="main-sidebar">
                        <li className="mt-6">
                            <span className="block pl-4 mb-2 font-semibold text-[#717D96]">
                                ทั่วไป
                            </span>
                            <ul>
                                {Menus.general.map((menu, i) => {
                                    const isActive =
                                        router.asPath === menu.href;
                                    return (
                                        <li
                                            key={i}
                                            className={`hover:bg-gray-100/90 text-[#9CA3B4] hover:text-[#2D3648] ${
                                                isActive
                                                    ? "bg-[#E2E7F0] text-[#2D3648]"
                                                    : ""
                                            }`}
                                            onClick={(e) =>
                                                isMobile
                                                    ? setIsOpen(false)
                                                    : e.preventDefault()
                                            }
                                        >
                                            <Link
                                                href={menu.href}
                                                className="flex items-center px-4 py-3 text-sm"
                                            >
                                                <div className="inline-flex items-center font-medium">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-5 h-5 mr-3"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d={menu.svg}
                                                        />
                                                    </svg>
                                                    <span>{menu.name}</span>
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                        <li className="mt-6">
                            <span className="block pl-4 mb-2 font-semibold text-[#717D96]">
                                สร้างใหม่
                            </span>
                            <ul>
                                {Menus.create.map((menu, i) => {
                                    const isActive =
                                        router.asPath === menu.href;
                                    return (
                                        <li
                                            key={i}
                                            className={`hover:bg-gray-100/90 text-[#9CA3B4] hover:text-[#2D3648] ${
                                                isActive
                                                    ? "bg-[#E2E7F0] text-[#2D3648]"
                                                    : ""
                                            }`}
                                            onClick={(e) =>
                                                isMobile
                                                    ? setIsOpen(false)
                                                    : e.preventDefault()
                                            }
                                        >
                                            <Link
                                                href={menu.href}
                                                className="flex items-center px-4 py-3 text-sm"
                                            >
                                                <div className="inline-flex items-center font-medium">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-5 h-5 mr-3"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d={menu.svg}
                                                        />
                                                    </svg>
                                                    <span>{menu.name}</span>
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                        <li className="mt-6">
                            <span className="block pl-4 mb-2 font-medium text-[#717D96]">
                                การจัดการ
                            </span>
                            <ul>
                                {Menus.manage.map((menu, i) => {
                                    const isActive =
                                        router.asPath === menu.href;
                                    return (
                                        <li
                                            key={i}
                                            className={`hover:bg-gray-100/90 text-[#9CA3B4] hover:text-[#2D3648] ${
                                                isActive
                                                    ? "bg-[#E2E7F0] text-[#2D3648]"
                                                    : ""
                                            }`}
                                            onClick={(e) =>
                                                isMobile
                                                    ? setIsOpen(false)
                                                    : e.preventDefault()
                                            }
                                        >
                                            <Link
                                                href={menu.href}
                                                className="flex items-center px-4 py-3 text-sm"
                                            >
                                                <div className="inline-flex items-center font-medium">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-5 h-5 mr-3"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d={menu.svg}
                                                        />
                                                    </svg>
                                                    <span>{menu.name}</span>
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    </ul>
                </div>
                <div
                    id="exit-menu"
                    className="p-4 bg-[#E2E7F0] flex justify-center"
                >
                    <Link
                        scroll={false}
                        href={`/`}
                        className="flex md:w-fit flex-row items-center "
                    >
                        <IoMdReturnLeft className="w-6 h-6 mr-2" />
                        <h2 className="text-lg font-semibold">กลับหน้าแรก</h2>
                    </Link>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DashboardSidebar;

const Menus = {
    general: [
        {
            name: "ภาพรวม",
            href: `/dashboard`,
            svg: "M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3",
        },
        {
            name: "จัดการเว็บไซต์",
            href: `/dashboard/config`,
            svg: "M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3",
        },
    ],
    create: [
        {
            name: "สร้างหมวดหมู่",
            href: `/dashboard/categories/new-category`,
            svg: "M12 4.5v15m7.5-7.5h-15",
        },
        {
            name: "สร้างสินค้า",
            href: `/dashboard/products/new-product`,
            svg: "M12 4.5v15m7.5-7.5h-15",
        },
        {
            name: "สร้างรีวิว",
            href: `/dashboard/`,
            svg: "M12 4.5v15m7.5-7.5h-15",
        },
    ],
    manage: [
        {
            name: "หมวดหมู่ทั้งหมด",
            href: `/dashboard/categories`,
            svg: "M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z",
        },
        {
            name: "สินค้าทั้งหมด",
            href: `/dashboard/products`,
            svg: "M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z",
        },
        {
            name: "ผู้ใช้ทั้งหมด",
            href: `/dashboard/users`,
            svg: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
        },
        {
            name: "รีวิวทั้งหมด",
            href: `/dashboard/reviews`,
            svg: "M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z",
        },
    ],
};
