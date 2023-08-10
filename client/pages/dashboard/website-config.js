import Layout from "@/components/layouts/Layout";
import { ColorPicker } from "@/components/ui/ColorPicker";
import NoPermission from "@/components/ui/custom-pages/403";
import { useUser } from "@/contexts/user-context";
import Head from "next/head";
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const WebsiteConfigPage = () => {
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [facebookUrl, setFacebookUrl] = useState("");
    const [lineUrl, setLineUrl] = useState("");
    const [primaryColor, setPrimaryColor] = useState("");
    const [aboutBg, setAboutBg] = useState([]);
    const [aboutDetail, setAboutDetail] = useState("");

    const { user, isAuthenticated } = useUser();

    if (!user || user.role !== "admin" || !isAuthenticated) {
        return <NoPermission />;
    }

    return (
        <Layout isDashboard={true}>
            <Head>
                <title>จัดการเว็บไซต์ - หจก.ลานทองเชียงใหม่</title>
            </Head>
            {/* ชื่อหน้า */}
            <div className="w-full">
                <div
                    id="header"
                    className="flex flex-col md:flex-row gap-4 py-6 items-start md:items-center justify-between"
                >
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">จัดการเว็บไซต์</h2>
                    </div>
                </div>
            </div>
            {/* Form สร้างแบนเนอร์ */}
            <section
                id="create-banner"
                className="w-full mb-6 flex flex-col gap-4"
            >
                <div className="flex flex-col w-full bg-white border rounded-md gap-4 md:gap-6 p-4 md:p-6">
                    <div
                        tag="form-sections"
                        className="flex flex-col md:flex-row w-full gap-6"
                    >
                        <h3 className="font-semibold w-full md:w-1/3">
                            ข้อมูลทั่วไป
                        </h3>
                        <div className="grid grid-cols-4 gap-6 w-full md:w-2/3">
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    ชื่อเว็บไซต์
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    ชื่อร้านค้า
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    รายละเอียด
                                </label>
                                <input
                                    type="text"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    เกี่ยวกับร้าน
                                </label>
                                <ReactQuill
                                    value={aboutDetail}
                                    onChange={(value) => setAboutDetail(value)}
                                    className="mt-1"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    Facebook URL
                                </label>
                                <input
                                    type="text"
                                    value={facebookUrl}
                                    onChange={(e) => setFacebookUrl(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    Line URL
                                </label>
                                <input
                                    type="text"
                                    value={lineUrl}
                                    onChange={(e) => setLineUrl(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="w-full" />

                    <div
                        tag="form-sections"
                        className="flex flex-col md:flex-row w-full gap-6"
                    >
                        <h3 className="font-semibold w-full md:w-1/3">
                            การแสดงผล
                        </h3>
                        <div className="grid grid-cols-4 gap-6 w-full md:w-2/3">
                            <div className="col-span-4">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    สีหลัก ({primaryColor})
                                </label>
                                <div className="mt-1">
                                    <ColorPicker 
                                        color={primaryColor}
                                        onChange={setPrimaryColor}
                                        type="hex"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="w-full" />

                    <div className="col-span-12 flex items-center justify-end gap-x-4">
                        <button
                            // onClick={submitForm}
                            // disabled={loading ? true : false}
                            className="inline-flex items-center bg-[#12A53B] disabled:bg-gray-400 rounded-md transition-all overflow-hidden disabled:cursor-not-allowed"
                        >
                            <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>
                                <span className="block">
                                    {/* {loading ? "กำลังสร้าง" : "สร้างแบนเนอร์"} */}
                                    แก้ไข
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default WebsiteConfigPage;
