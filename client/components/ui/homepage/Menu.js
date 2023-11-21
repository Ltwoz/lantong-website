import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { MdMail, MdPhone } from "react-icons/md";
import { HiChatBubbleOvalLeft } from "react-icons/hi2";
import { useConfig } from "@/contexts/config-context";
import { useState } from "react";

const Menu = () => {
    const { config } = useConfig();

    const [keyword, setKeyword] = useState("");

    return (
        <div className="flex flex-col xl:flex-row w-full md:w-[60%] xl:w-[1200px] p-4 xl:p-6 gap-[10px] bg-white md:rounded-xl shadow-md mx-auto">
            {/* Filter */}
            <div className="flex flex-col gap-4 w-full h-fit">
                {/* Search Bar */}
                <div className="flex flex-row w-full gap-[10px]">
                    <div className="relative w-full">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none z-10">
                            <svg
                                className="w-5 h-5 text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="ค้นหาสินค้า"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="pl-10 pr-24 p-3 block w-full rounded-md border focus:outline-none bg-white/80 backdrop-blur-sm border-gray-300 focus:border-blue-600 shadow-sm text-base"
                        />
                    </div>
                    <Link
                        href={`/products?keyword=${keyword}`}
                        className="inline-flex items-center bg-[#FF5A60] rounded-md transition-all overflow-hidden flex-shrink-0 xl:w-[120px]"
                    >
                        <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                            <span className="block">ค้นหา</span>
                        </div>
                    </Link>
                </div>
                <div className="flex flex-row xl:flex-wrap gap-3 overflow-auto">
                    <Link
                        href={`/products?category=มอเตอร์ไซค์ใหม่`}
                        className="p-3 flex-shrink-0 xl:flex-grow w-[150px] h-[90px] xl:w-[190px] xl:h-[100px] relative rounded-lg gap-[10px] bg-[#173559]"
                    >
                        <p className="text-sm xl:text-base text-white font-semibold max-w-[70px]">
                            มอเตอร์ไซค์ ใหม่
                        </p>
                        <div className="absolute right-1 bottom-1">
                            <div className="w-[70px] h-[65px] xl:w-[96px] xl:h-[80px] relative flex flex-shrink-0 items-center overflow-hidden">
                                <Image
                                    alt="property-image"
                                    src={`/menu-c1.png`}
                                    unoptimized
                                    draggable="false"
                                    fill
                                    className="select-none object-scale-down"
                                />
                            </div>
                        </div>
                    </Link>
                    <Link
                        href={`/products?category=มอเตอร์ไซค์มีพ่วงข้าง`}
                        className="p-3 flex-shrink-0 xl:flex-grow w-[150px] h-[90px] xl:w-[190px] xl:h-[100px] relative rounded-lg gap-[10px] bg-[#173559]"
                    >
                        <p className="text-sm xl:text-base text-white font-semibold max-w-[70px]">
                            มอเตอร์ไซค์ มีพ่วงข้าง
                        </p>
                        <div className="absolute right-1 bottom-1">
                            <div className="w-[70px] h-[65px] xl:w-[96px] xl:h-[80px] relative flex flex-shrink-0 items-center overflow-hidden">
                                <Image
                                    alt="property-image"
                                    src={`/menu-c2.png`}
                                    unoptimized
                                    draggable="false"
                                    fill
                                    className="select-none object-scale-down"
                                />
                            </div>
                        </div>
                    </Link>
                    <Link
                        href={`/products?category=พ่วงข้างขายของ`}
                        className="p-3 flex-shrink-0 xl:flex-grow w-[150px] h-[90px] xl:w-[190px] xl:h-[100px] relative rounded-lg gap-[10px] bg-[#173559]"
                    >
                        <p className="text-sm xl:text-base text-white font-semibold max-w-[70px]">
                            พ่วงข้าง ขายของ
                        </p>
                        <div className="absolute right-1 bottom-1">
                            <div className="w-[70px] h-[65px] xl:w-[96px] xl:h-[80px] relative flex flex-shrink-0 items-center overflow-hidden">
                                <Image
                                    alt="property-image"
                                    src={`/menu-c3.png`}
                                    unoptimized
                                    draggable="false"
                                    fill
                                    className="select-none object-scale-down"
                                />
                            </div>
                        </div>
                    </Link>
                    <Link
                        href={`/products?category=พ่วงข้างวินเทจ`}
                        className="p-3 flex-shrink-0 xl:flex-grow w-[150px] h-[90px] xl:w-[190px] xl:h-[100px] relative rounded-lg gap-[10px] bg-[#173559]"
                    >
                        <p className="text-sm xl:text-base text-white font-semibold max-w-[70px]">
                            พ่วงข้าง วินเทจ
                        </p>
                        <div className="absolute right-1 bottom-1">
                            <div className="w-[70px] h-[65px] xl:w-[96px] xl:h-[80px] relative flex flex-shrink-0 items-center overflow-hidden">
                                <Image
                                    alt="property-image"
                                    src={`/menu-c4.png`}
                                    unoptimized
                                    draggable="false"
                                    fill
                                    className="select-none object-scale-down"
                                />
                            </div>
                        </div>
                    </Link>
                    <Link
                        href={`/products?category=เทรลเลอร์ลากท้าย`}
                        className="p-3 flex-shrink-0 xl:flex-grow w-[150px] h-[90px] xl:w-[190px] xl:h-[100px] relative rounded-lg gap-[10px] bg-[#173559]"
                    >
                        <p className="text-sm xl:text-base text-white font-semibold max-w-[70px]">
                            เทรลเลอร์ ลากท้าย
                        </p>
                        <div className="absolute right-1 bottom-1">
                            <div className="w-[70px] h-[65px] xl:w-[96px] xl:h-[80px] relative flex flex-shrink-0 items-center overflow-hidden">
                                <Image
                                    alt="property-image"
                                    src={`/menu-c5.png`}
                                    unoptimized
                                    draggable="false"
                                    fill
                                    className="select-none object-scale-down"
                                />
                            </div>
                        </div>
                    </Link>
                    <Link
                        href={`/products?category=รถเข็น`}
                        className="p-3 flex-shrink-0 xl:flex-grow w-[150px] h-[90px] xl:w-[190px] xl:h-[100px] relative rounded-lg gap-[10px] bg-[#173559]"
                    >
                        <p className="text-sm xl:text-base text-white font-semibold max-w-[70px]">
                            รถเข็น
                        </p>
                        <div className="absolute right-1 bottom-1">
                            <div className="w-[70px] h-[65px] xl:w-[96px] xl:h-[80px] relative flex flex-shrink-0 items-center overflow-hidden">
                                <Image
                                    alt="property-image"
                                    src={`/menu-c6.png`}
                                    unoptimized
                                    draggable="false"
                                    fill
                                    className="select-none object-scale-down"
                                />
                            </div>
                        </div>
                    </Link>
                    <Link
                        href={`/products?category=Sidecar`}
                        className="p-3 flex-shrink-0 xl:flex-grow w-[150px] h-[90px] xl:w-[190px] xl:h-[100px] relative rounded-lg gap-[10px] bg-[#173559]"
                    >
                        <p className="text-sm xl:text-base text-white font-semibold max-w-[70px]">
                            ไซด์คาร์
                        </p>
                        <div className="absolute right-1 bottom-1">
                            <div className="w-[70px] h-[65px] xl:w-[96px] xl:h-[80px] relative flex flex-shrink-0 items-center overflow-hidden">
                                <Image
                                    alt="property-image"
                                    src={`/menu-c7.png`}
                                    unoptimized
                                    draggable="false"
                                    fill
                                    className="select-none object-scale-down"
                                />
                            </div>
                        </div>
                    </Link>
                    {/* Default */}
                    <Link
                        href={"/products"}
                        className="p-3 flex-shrink-0 xl:flex-grow w-[140px] h-[90px] xl:w-[190px] xl:h-[100px] flex justify-center items-center relative rounded-lg gap-[10px] bg-[#4E4E4E]"
                    >
                        <p className="text-sm xl:text-base text-white font-semibold">
                            หมวดหมู่ทั้งหมด
                        </p>
                    </Link>
                </div>
            </div>
            <div className="hidden xl:block border-l border-[#D3D3D3]"></div>
            {/* Social */}
            <div className="flex flex-col xl:w-[320px] flex-shrink-0 gap-[10px]">
                <Link
                    href={config?.social.facebook_url}
                    target="_blank"
                    className="h-[50px] inline-flex items-center bg-[#4267B2] disabled:bg-gray-400 rounded-md transition-all overflow-hidden disabled:cursor-not-allowed"
                >
                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                        <FaFacebook className="mr-2" />
                        <span className="block">{"พ่วงข้างลานทอง"}</span>
                    </div>
                </Link>
                <Link
                    href={`https://line.me/ti/p/~${config?.social.line_url}`}
                    target="_blank"
                    className="h-[50px] inline-flex items-center bg-[#06C755] disabled:bg-gray-400 rounded-md transition-all overflow-hidden disabled:cursor-not-allowed"
                >
                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                        <HiChatBubbleOvalLeft className="mr-2" />
                        <span className="block">{"lantongshop"}</span>
                    </div>
                </Link>
                <Link
                    href={"mailto:lantongshop@gmail.com"}
                    className="h-[50px] inline-flex items-center bg-[#FF5A60] disabled:bg-gray-400 rounded-md transition-all overflow-hidden disabled:cursor-not-allowed"
                >
                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                        <MdMail className="mr-2" />
                        <span className="block">{"lantongshop@gmail.com"}</span>
                    </div>
                </Link>
                <div className="h-[50px] inline-flex items-center bg-[#4E4E4E] disabled:bg-gray-400 rounded-md transition-all overflow-hidden disabled:cursor-not-allowed">
                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                        <MdPhone className="mr-2" />
                        <span className="block">{"081 952 1342"}</span>
                    </div>
                </div>
                <div className="h-[50px] inline-flex items-center bg-[#4E4E4E] disabled:bg-gray-400 rounded-md transition-all overflow-hidden disabled:cursor-not-allowed">
                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                        <MdPhone className="mr-2" />
                        <span className="block">{"053 876 109"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
