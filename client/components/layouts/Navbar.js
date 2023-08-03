import { useSidebar } from "@/contexts/sidebar-context";
import { useUser } from "@/contexts/user-context";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
    const { status, user } = useUser();
    const { setIsOpen } = useSidebar();

    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const menuHandler = () => setShowMenu(false);

        window.addEventListener("click", menuHandler);

        return () => {
            window.removeEventListener("click", menuHandler);
        };
    }, []);

    const handleOnclick = (e) => {
        e.stopPropagation();

        setIsOpen((prev) => !prev);
    };

    const handleMenuClick = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    const AuthButton =
        status === "authenticated" ? (
            <div className="md:flex text-left items-center">
                <div className="flex items-center px-[1px]">
                    <div
                        className={`w-full md:hover:cursor-pointer flex justify-between items-center rounded-md md:px-3 py-2 text-gray-700 md:ring-1 md:hover:ring-primary/50 md:hover:bg-primary/5 ${
                            showMenu
                                ? "md:ring-primary/50 md:bg-primary/5"
                                : "md:ring-transparent"
                        } select-none transition-all`}
                        onClick={handleMenuClick}
                    >
                        <div className="flex flex-row items-center gap-2 md:mr-6">
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
                        <div className="inline-flex items-center md:mr-1">
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
                    {/* <div className="py-1">
                    <Link
                        scroll={false}
                        href={`#`}
                        className="text-gray-700 block px-4 py-2 text-sm hover:bg-primary/10"
                    >
                        โปรไฟล์
                    </Link>
                </div> */}
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
                            // onClick={logoutHandler}
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
                className="w-fit inline-flex items-center bg-[#BC1F1F] rounded-lg transition-all overflow-hidden"
            >
                <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                    <span className="block tracking-wide">
                        ลงทะเบียน/เข้าสู่ระบบ
                    </span>
                </div>
            </Link>
        );

    return (
        <nav className="relative w-full mx-auto px-4 md:px-4 py-4 md:py-4 bg-white border-b shadow">
            <div className="flex flex-row justify-between items-center">
                <div id="logo">
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
                        <h2 className="text-xl md:text-3xl font-semibold text-[#E32C2C]">
                            หจก.ลานทองเชียงใหม่
                        </h2>
                    </Link>
                </div>
                <div
                    id="nav-items-group"
                    className="hidden md:flex flex-row items-center space-x-6 font-medium"
                >
                    <Link href="/">หน้าหลัก</Link>
                    <Link href="/about">เกี่ยวกับ</Link>
                    <Link href="/products">สินค้าของเรา</Link>
                    <Link href="#">ลานทองรีวิว</Link>
                    <Link href="/contact">ติดต่อเรา</Link>
                    {AuthButton}
                </div>
                <div
                    id="hamburger"
                    className="flex md:hidden w-8 h-8"
                    onClick={handleOnclick}
                >
                    <svg
                        viewBox="0 -0.5 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6.5 11.75C6.08579 11.75 5.75 12.0858 5.75 12.5C5.75 12.9142 6.08579 13.25 6.5 13.25V11.75ZM18.5 13.25C18.9142 13.25 19.25 12.9142 19.25 12.5C19.25 12.0858 18.9142 11.75 18.5 11.75V13.25ZM6.5 15.75C6.08579 15.75 5.75 16.0858 5.75 16.5C5.75 16.9142 6.08579 17.25 6.5 17.25V15.75ZM18.5 17.25C18.9142 17.25 19.25 16.9142 19.25 16.5C19.25 16.0858 18.9142 15.75 18.5 15.75V17.25ZM6.5 7.75C6.08579 7.75 5.75 8.08579 5.75 8.5C5.75 8.91421 6.08579 9.25 6.5 9.25V7.75ZM18.5 9.25C18.9142 9.25 19.25 8.91421 19.25 8.5C19.25 8.08579 18.9142 7.75 18.5 7.75V9.25ZM6.5 13.25H18.5V11.75H6.5V13.25ZM6.5 17.25H18.5V15.75H6.5V17.25ZM6.5 9.25H18.5V7.75H6.5V9.25Z"
                            fill="#000000"
                        />
                    </svg>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
