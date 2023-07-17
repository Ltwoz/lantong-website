import Image from "next/image";
import Link from "next/link";
import { FaFacebookMessenger } from "react-icons/fa";
import { MdMail, MdPhone } from "react-icons/md";
import { HiChatBubbleOvalLeft } from "react-icons/hi2";

const Menu = () => {
    return (
        <div className="flex flex-col md:flex-row w-full md:w-[1200px] p-6 gap-[10px] bg-white rounded-xl shadow-md mx-auto">
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
                            className="pl-10 pr-24 p-3 block w-full rounded-md border focus:outline-none bg-white/80 backdrop-blur-sm border-gray-300 focus:border-blue-600 shadow-sm text-base"
                        />
                    </div>
                    <button className="inline-flex items-center bg-[#FF5A60] rounded-md transition-all overflow-hidden flex-shrink-0 md:w-[120px]">
                        <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                            <span className="block">ค้นหา</span>
                        </div>
                    </button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                    <div
                        alt="grid-items"
                        className="col-span-4 md:col-span-1 flex justify-between p-3 rounded-lg gap-[10px] bg-[#173559]"
                    >
                        <p className="text-white font-semibold">
                            มอเตอร์ไซค์ใหม่
                        </p>
                        <div className="w-[76px] h-[76px] relative flex flex-shrink-0 items-center rounded-lg overflow-hidden">
                            <Image
                                alt="property-image"
                                src={`https://dummyimage.com/100x100`}
                                unoptimized
                                draggable="false"
                                fill
                                className="select-none object-cover"
                            />
                        </div>
                    </div>
                    <div
                        alt="grid-items"
                        className="col-span-4 md:col-span-1 flex justify-between p-3 rounded-lg gap-[10px] bg-[#173559]"
                    >
                        <p className="text-white font-semibold">
                            มอเตอร์ไซค์มีพ่วงข้าง
                        </p>
                        <div className="w-[76px] h-[76px] relative flex flex-shrink-0 items-center rounded-lg overflow-hidden">
                            <Image
                                alt="property-image"
                                src={`https://dummyimage.com/100x100`}
                                unoptimized
                                draggable="false"
                                fill
                                className="select-none object-cover"
                            />
                        </div>
                    </div>
                    <div
                        alt="grid-items"
                        className="col-span-4 md:col-span-1 flex justify-between p-3 rounded-lg gap-[10px] bg-[#173559]"
                    >
                        <p className="text-white font-semibold">
                            พ่วงข้าง ขายของ
                        </p>
                        <div className="w-[76px] h-[76px] relative flex flex-shrink-0 items-center rounded-lg overflow-hidden">
                            <Image
                                alt="property-image"
                                src={`https://dummyimage.com/100x100`}
                                unoptimized
                                draggable="false"
                                fill
                                className="select-none object-cover"
                            />
                        </div>
                    </div>
                    <div
                        alt="grid-items"
                        className="col-span-4 md:col-span-1 flex justify-between p-3 rounded-lg gap-[10px] bg-[#173559]"
                    >
                        <p className="text-white font-semibold">
                            พ่วงข้าง วินเทจ
                        </p>
                        <div className="w-[76px] h-[76px] relative flex flex-shrink-0 items-center rounded-lg overflow-hidden">
                            <Image
                                alt="property-image"
                                src={`https://dummyimage.com/100x100`}
                                unoptimized
                                draggable="false"
                                fill
                                className="select-none object-cover"
                            />
                        </div>
                    </div>
                    <div
                        alt="grid-items"
                        className="col-span-4 md:col-span-1 flex justify-between p-3 rounded-lg gap-[10px] bg-[#173559]"
                    >
                        <p className="text-white font-semibold">
                            พ่วงข้าง รถบรรทุก
                        </p>
                        <div className="w-[76px] h-[76px] relative flex flex-shrink-0 items-center rounded-lg overflow-hidden">
                            <Image
                                alt="property-image"
                                src={`https://dummyimage.com/100x100`}
                                unoptimized
                                draggable="false"
                                fill
                                className="select-none object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-l border-[#D3D3D3]"></div>
            {/* Social */}
            <div className="flex flex-col md:w-[320px] flex-shrink-0 gap-[10px]">
                <Link
                    href={"#"}
                    className="h-[50px] inline-flex items-center bg-[#4267B2] disabled:bg-gray-400 rounded-md transition-all overflow-hidden disabled:cursor-not-allowed"
                >
                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                        <FaFacebookMessenger className="mr-2" />
                        <span className="block">{"พ่วงข้างลานทอง"}</span>
                    </div>
                </Link>
                <Link
                    href={"#"}
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
                <Link
                    href={"#"}
                    className="h-[50px] inline-flex items-center bg-[#4E4E4E] disabled:bg-gray-400 rounded-md transition-all overflow-hidden disabled:cursor-not-allowed"
                >
                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                        <MdPhone className="mr-2" />
                        <span className="block">{"081 952 1342"}</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Menu;
