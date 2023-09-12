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
                                ระบบจัดการหลังบ้าน
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
                                            className={`hover:bg-gray-100/90 hover:text-[#2D3648] ${
                                                isActive
                                                    ? "bg-[#E2E7F0] text-[#2D3648]"
                                                    : "text-[#9CA3B4]"
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
                                                    {menu.svg}
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
                                            className={`hover:bg-gray-100/90 hover:text-[#2D3648] ${
                                                isActive
                                                    ? "bg-[#E2E7F0] text-[#2D3648]"
                                                    : "text-[#9CA3B4]"
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
                                            className={`hover:bg-gray-100/90 hover:text-[#2D3648] ${
                                                isActive
                                                    ? "bg-[#E2E7F0] text-[#2D3648]"
                                                    : "text-[#9CA3B4]"
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
                                                    {menu.svg}
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
            svg: (
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
                        d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                    />
                </svg>
            ),
        },
        {
            name: "จัดการเว็บไซต์",
            href: `/dashboard/website-config`,
            svg: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-3"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 16h-8a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v7"></path>
                    <path d="M7 20h5"></path>
                    <path d="M9 16v4"></path>
                    <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M19.001 15.5v1.5"></path>
                    <path d="M19.001 21v1.5"></path>
                    <path d="M22.032 17.25l-1.299 .75"></path>
                    <path d="M17.27 20l-1.3 .75"></path>
                    <path d="M15.97 17.25l1.3 .75"></path>
                    <path d="M20.733 20l1.3 .75"></path>
                </svg>
            ),
        },
        {
            name: "จัดการแบนเนอร์",
            href: `/dashboard/banners`,
            svg: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-3"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M15 8h.01"></path>
                    <path d="M12 21h-6a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6"></path>
                    <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l3 3"></path>
                    <path d="M14 14l1 -1c.48 -.461 1.016 -.684 1.551 -.67"></path>
                    <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M19.001 15.5v1.5"></path>
                    <path d="M19.001 21v1.5"></path>
                    <path d="M22.032 17.25l-1.299 .75"></path>
                    <path d="M17.27 20l-1.3 .75"></path>
                    <path d="M15.97 17.25l1.3 .75"></path>
                    <path d="M20.733 20l1.3 .75"></path>
                </svg>
            ),
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
            href: `/dashboard/blogs/new-blog`,
            svg: "M12 4.5v15m7.5-7.5h-15",
        },
    ],
    manage: [
        {
            name: "หมวดหมู่ทั้งหมด",
            href: `/dashboard/categories`,
            svg: (
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
                        d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
                    />
                </svg>
            ),
        },
        {
            name: "สินค้าทั้งหมด",
            href: `/dashboard/products`,
            svg: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-3"
                >
                    <rect x="3" y="5" width="6" height="6" rx="1"></rect>
                    <path d="m3 17 2 2 4-4"></path>
                    <path d="M13 6h8"></path>
                    <path d="M13 12h8"></path>
                    <path d="M13 18h8"></path>
                </svg>
            ),
        },
        {
            name: "ผู้ใช้ทั้งหมด",
            href: `/dashboard/users`,
            svg: (
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
                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                </svg>
            ),
        },
        {
            name: "รีวิวทั้งหมด",
            href: `/dashboard/blogs`,
            svg: (
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
                        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                    />
                </svg>
            ),
        },
    ],
};
